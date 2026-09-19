/**
 * Centralized Fee Calculation Engine
 * Single source of truth for tuition months and other fees (Admission, Diary, Fee Card, Transport)
 */
const FeeEngine = {
  /**
   * Determine the month index (1-12) for a given date in April-March session.
   * April = 1, May = 2, ..., August = 5, ..., March = 12
   */
  getMonthIndexFromDate(dateStr) {
    if (!dateStr) return 1;
    const date = new Date(dateStr);
    const month = date.getMonth(); // 0-11 (Jan=0, Apr=3, Aug=7, Dec=11)
    if (month >= 3) return month - 2;
    return month + 10;
  },

  /**
   * Calculate effective monthly base fee considering class default & overrides
   */
  getBaseMonthlyFee(student, classOverrides = [], studentOverrides = []) {
    // 1. Check active student-specific fee override from store
    const studentOverride = studentOverrides.find(o => o.studentId === student.id && o.active);
    if (studentOverride && studentOverride.amount) {
      return studentOverride.amount;
    }

    // 2. Check class-level preset override
    const classOverride = classOverrides.find(c => c.className === student.className && c.active);
    if (classOverride && classOverride.monthlyFee) {
      return classOverride.monthlyFee;
    }

    // 3. Fallback to default class fee config
    const classObj = CONFIG.classes.find(c => c.name === student.className);
    return classObj ? classObj.defaultMonthlyFee : 800;
  },

  /**
   * Calculate monthly concession discount for a given primary concession type & custom override
   */
  calculateMonthlyDiscount(student, baseFee) {
    if (student.customMonthlyFee !== undefined && student.customMonthlyFee !== null && student.customMonthlyFee !== '') {
      const customPayable = Math.max(0, Number(student.customMonthlyFee));
      return Math.max(0, baseFee - customPayable);
    }

    const concession = CONFIG.primaryConcessions[student.concessionType] || CONFIG.primaryConcessions.NONE;
    const percent = concession.monthlyDiscountPercent || 0;
    
    if (percent === 0) return 0;
    if (percent === 100) return baseFee;
    
    const rawDiscount = (baseFee * percent) / 100;
    return Math.round(rawDiscount);
  },

  /**
   * Determine if admission fee is waived based on concessions & rules
   */
  isAdmissionFeeWaived(student) {
    // 1. Promoted / Old Student (Previous session student promoted in same school) -> 100% Admission Fee Exempt
    if (student.isPromoted || student.studentType === 'PROMOTED' || student.promotedStudent || student.admissionFeeExempt) {
      return { waived: true, reason: 'Promoted / Old Student (पुन: प्रवेश)' };
    }

    const primaryConcession = CONFIG.primaryConcessions[student.concessionType] || CONFIG.primaryConcessions.NONE;
    if (primaryConcession.waivesAdmission) {
      return { waived: true, reason: primaryConcession.label };
    }

    // Check income certificate admission fee waiver for after-July admission
    if (student.incomeCertificateSubmitted && student.incomeCertificateApproved) {
      const admissionMonthIdx = this.getMonthIndexFromDate(student.admissionDate);
      if (admissionMonthIdx >= 5) {
        return { waived: true, reason: 'Income Certificate (After-July Waiver)' };
      }
    }

    return { waived: false, reason: null };
  },

  /**
   * Main calculation function to generate complete fee ledger and outstanding summary
   */
  calculateStudentFee(student, payments = [], classOverrides = [], studentOverrides = [], targetMonthIdx = 12) {
    const baseMonthlyFee = this.getBaseMonthlyFee(student, classOverrides, studentOverrides);
    const monthlyDiscount = this.calculateMonthlyDiscount(student, baseMonthlyFee);
    const finalMonthlyPayable = Math.max(0, baseMonthlyFee - monthlyDiscount);

    // Admission Date Month Index
    let admissionMonthIdx = 1;
    if (student.lateAdmissionMonthlyWaiver && student.lateAdmissionStartMonth) {
      const mObj = CONFIG.months.find(m => m.key === student.lateAdmissionStartMonth);
      if (mObj) admissionMonthIdx = mObj.index;
    } else if (student.admissionDate) {
      admissionMonthIdx = this.getMonthIndexFromDate(student.admissionDate);
    }
    
    // Late Admission Previous Months Monthly Fee Waiver:
    // Only previous months prior to admission month are 100% OFF/Exempted
    const isLateAdmission = Boolean(
      (student.lateAdmissionMonthlyWaiver && admissionMonthIdx > 1) ||
      (student.exemptPreviousMonths && admissionMonthIdx >= 5) ||
      (admissionMonthIdx >= 5 && student.admissionDate && student.admissionDate >= '2026-08-01')
    );

    // 1. Build Monthly Tuition Ledger (12 Months)
    const monthlyLedger = CONFIG.months.map(m => {
      const isExempt = isLateAdmission && (m.index < admissionMonthIdx);
      const monthBase = isExempt ? 0 : baseMonthlyFee;
      const monthDiscount = isExempt ? 0 : monthlyDiscount;
      const monthPayable = isExempt ? 0 : finalMonthlyPayable;

      // Find payments for this month
      const monthPayments = payments.filter(p => {
        if (p.studentId !== student.id || p.status === 'REVERSED') return false;
        if (p.feeType && p.feeType !== 'MONTHLY') return false;
        const pKey = String(p.monthKey || p.month || p.rawMonth || '').trim().toLowerCase();
        const mKey = m.key.toLowerCase();
        const mName = m.name.toLowerCase();
        return pKey === mKey || pKey === mName;
      });

      const totalPaid = monthPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

      let status = 'Pending';
      if (isExempt) {
        status = 'Exempt';
      } else if (totalPaid >= monthPayable && monthPayable > 0) {
        status = 'Paid';
      } else if (totalPaid > 0) {
        status = 'Partially Paid';
      } else if (monthPayable === 0) {
        status = 'Waived';
      }

      return {
        monthKey: m.key,
        monthName: m.name,
        monthIndex: m.index,
        isExempt,
        baseFee: monthBase,
        discount: monthDiscount,
        payable: monthPayable,
        paid: totalPaid,
        balance: Math.max(0, monthPayable - totalPaid),
        status,
        payments: monthPayments
      };
    });

    // 2. Admission Fee Calculation
    const admissionFeeWaiver = this.isAdmissionFeeWaived(student);
    const baseAdmissionFee = CONFIG.defaultCharges.admissionFee || 2000;
    const admissionFeePayable = admissionFeeWaiver.waived ? 0 : baseAdmissionFee;

    const admissionPayments = payments.filter(p => {
      if (p.studentId !== student.id || p.status === 'REVERSED') return false;
      const feeType = (p.feeType || '').toUpperCase();
      const monthKey = (p.monthKey || p.month || '').toUpperCase();
      return feeType === 'ADMISSION' || monthKey === 'ADMISSION';
    });
    const admissionPaid = admissionPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const admissionBalance = Math.max(0, admissionFeePayable - admissionPaid);
    let admissionStatus = 'Pending';
    if (admissionFeeWaiver.waived) {
      admissionStatus = 'Waived';
    } else if (admissionPaid >= admissionFeePayable && admissionFeePayable > 0) {
      admissionStatus = 'Paid';
    } else if (admissionPaid > 0) {
      admissionStatus = 'Partially Paid';
    }

    // 3. School Diary Fee Calculation
    const baseDiaryFee = CONFIG.defaultCharges.diaryFee || 100;
    const diaryPayments = payments.filter(p => {
      if (p.studentId !== student.id || p.status === 'REVERSED') return false;
      const feeType = (p.feeType || '').toUpperCase();
      const monthKey = (p.monthKey || p.month || '').toUpperCase();
      return feeType === 'DIARY' || monthKey === 'DIARY';
    });
    const diaryPaid = diaryPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const diaryBalance = Math.max(0, baseDiaryFee - diaryPaid);
    let diaryStatus = diaryPaid >= baseDiaryFee ? 'Paid' : (diaryPaid > 0 ? 'Partially Paid' : 'Pending');

    // 4. Fee Card Calculation
    const baseFeeCardFee = CONFIG.defaultCharges.feeCardFee || 20;
    const feeCardPayments = payments.filter(p => {
      if (p.studentId !== student.id || p.status === 'REVERSED') return false;
      const feeType = (p.feeType || '').toUpperCase();
      const monthKey = (p.monthKey || p.month || '').toUpperCase();
      return feeType === 'FEE_CARD' || feeType === 'FEECARD' || monthKey === 'FEE_CARD' || monthKey === 'FEECARD';
    });
    const feeCardPaid = feeCardPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const feeCardBalance = Math.max(0, baseFeeCardFee - feeCardPaid);
    let feeCardStatus = feeCardPaid >= baseFeeCardFee ? 'Paid' : (feeCardPaid > 0 ? 'Partially Paid' : 'Pending');

    // 5. Transport Service Calculation (For Students Availing Transport)
    const isTransportAvailed = Boolean(student.transportRequired || student.isTransportAvailed || student.transportService);
    const monthlyTransportRate = isTransportAvailed ? (Number(student.transportMonthlyFee) || CONFIG.defaultCharges.transportFee || 300) : 0;

    const transportLedger = CONFIG.months.map(m => {
      const isExempt = !isTransportAvailed || (isLateAdmission && m.index < admissionMonthIdx);
      const payable = isExempt ? 0 : monthlyTransportRate;

      // Find transport payments for this month
      const monthTransPayments = payments.filter(p => {
        if (p.studentId !== student.id || p.status === 'REVERSED') return false;
        const feeType = (p.feeType || '').toUpperCase();
        if (feeType !== 'TRANSPORT') return false;
        const pKey = String(p.monthKey || p.month || p.rawMonth || '').trim().toLowerCase();
        const mKey = m.key.toLowerCase();
        const mName = m.name.toLowerCase();
        return pKey === mKey || pKey === mName;
      });

      const totalPaid = monthTransPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

      let status = 'Pending';
      if (!isTransportAvailed || isExempt) {
        status = 'Not Applicable';
      } else if (totalPaid >= payable && payable > 0) {
        status = 'Paid';
      } else if (totalPaid > 0) {
        status = 'Partially Paid';
      } else if (payable === 0) {
        status = 'Waived';
      }

      return {
        monthKey: m.key,
        monthName: m.name,
        monthIndex: m.index,
        payable,
        paid: totalPaid,
        balance: Math.max(0, payable - totalPaid),
        status,
        payments: monthTransPayments
      };
    });

    const pendingTransportList = transportLedger.filter(m => m.monthIndex <= targetMonthIdx && m.status !== 'Not Applicable' && (m.status === 'Pending' || m.status === 'Partially Paid'));
    const transportFeePendingTotal = pendingTransportList.reduce((sum, m) => sum + m.balance, 0);
    const transportTotalPaid = transportLedger.reduce((sum, m) => sum + m.paid, 0);

    // Outstanding Monthly Dues up to Target Month Index
    const applicableMonthsUpToTarget = monthlyLedger.filter(m => m.monthIndex <= targetMonthIdx && !m.isExempt);
    const pendingMonthlyList = applicableMonthsUpToTarget.filter(m => m.status === 'Pending' || m.status === 'Partially Paid');
    const monthlyFeePendingTotal = pendingMonthlyList.reduce((sum, m) => sum + m.balance, 0);
    
    const totalPendingAmount = monthlyFeePendingTotal + transportFeePendingTotal + admissionBalance + diaryBalance + feeCardBalance;

    return {
      student,
      baseMonthlyFee,
      monthlyDiscount,
      finalMonthlyPayable,
      admissionFee: {
        baseAmount: baseAdmissionFee,
        isWaived: admissionFeeWaiver.waived,
        waiverReason: admissionFeeWaiver.reason,
        payable: admissionFeePayable,
        paid: admissionPaid,
        balance: admissionBalance,
        status: admissionStatus,
        payments: admissionPayments
      },
      diaryFee: {
        baseAmount: baseDiaryFee,
        payable: baseDiaryFee,
        paid: diaryPaid,
        balance: diaryBalance,
        status: diaryStatus,
        payments: diaryPayments
      },
      feeCard: {
        baseAmount: baseFeeCardFee,
        payable: baseFeeCardFee,
        paid: feeCardPaid,
        balance: feeCardBalance,
        status: feeCardStatus,
        payments: feeCardPayments
      },
      transport: {
        isAvailed: isTransportAvailed,
        monthlyRate: monthlyTransportRate,
        ledger: transportLedger,
        paid: transportTotalPaid || 0,
        totalPaid: transportTotalPaid || 0,
        pendingTotal: transportFeePendingTotal || 0,
        totalPending: transportFeePendingTotal || 0,
        pendingMonthsList: pendingTransportList.map(m => m.monthName)
      },
      transportMonthly: monthlyTransportRate,
      monthlyLedger,
      applicableMonthsCount: monthlyLedger.filter(m => !m.isExempt).length,
      paidMonthsCount: monthlyLedger.filter(m => m.status === 'Paid').length,
      pendingMonthsList: pendingMonthlyList.map(m => m.monthName),
      monthlyFeePendingTotal,
      transportFeePendingTotal,
      admissionFeePendingTotal: admissionBalance,
      diaryFeePendingTotal: diaryBalance,
      feeCardPendingTotal: feeCardBalance,
      totalPendingAmount
    };
  }
};
