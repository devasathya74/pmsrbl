/**
 * School Fee Management System - Data Store Module
 * Direct Cloud Firestore Integration - No LocalStorage for Student / Fee Records
 */
const Store = {
  // In-memory live store
  students: [],
  payments: [],
  classOverrides: [],
  auditLogs: [],
  whatsappLogs: [],

  init() {
    // Clear any obsolete localStorage items
    ['fee_app_students', 'fee_app_payments', 'fee_app_cloud_imported'].forEach(k => {
      try { localStorage.removeItem(k); } catch (e) {}
    });

    // Initialize Firebase Realtime Cloud Connection
    if (typeof FirebaseService !== 'undefined') {
      FirebaseService.init();
    }
  },

  // Setters for In-Memory State from Realtime Firestore Listeners
  setStudentsInMemory(studentsList) {
    this.students = studentsList || [];
  },

  setPaymentsInMemory(paymentsList) {
    this.payments = paymentsList || [];
  },

  setClassOverridesInMemory(overridesList) {
    this.classOverrides = overridesList || [];
  },

  // Students Getters (Active vs Deleted / Recycle Bin)
  getStudents() {
    return this.students.filter(s => !s.isDeleted && s.status !== 'DELETED');
  },

  getAllStudentsRaw() {
    return this.students;
  },

  getDeletedStudents() {
    return this.students.filter(s => s.isDeleted === true || s.status === 'DELETED');
  },

  getStudentById(id) {
    return this.students.find(s => s.id === id || s.admissionNo === id);
  },

  // Move Student to Recycle Bin (Soft Delete)
  async moveToRecycleBin(studentId, currentUser = 'Admin') {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return;
    const updated = {
      ...student,
      isDeleted: true,
      status: 'DELETED',
      deletedAt: new Date().toISOString()
    };
    await FirebaseService.saveStudentToFirestore(updated);
    const idx = this.students.findIndex(s => s.id === studentId);
    if (idx !== -1) this.students[idx] = updated;
    this.addAuditLog({
      user: currentUser,
      action: 'STUDENT_MOVED_TO_TRASH',
      entity: 'Student',
      entityId: studentId,
      oldValue: student.name,
      newValue: 'DELETED',
      reason: 'Moved to Recycle Bin'
    });
    return updated;
  },

  // Restore Student from Recycle Bin
  async restoreFromRecycleBin(studentId, currentUser = 'Admin') {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return;
    const updated = {
      ...student,
      isDeleted: false,
      status: 'Active',
      deletedAt: null
    };
    await FirebaseService.saveStudentToFirestore(updated);
    const idx = this.students.findIndex(s => s.id === studentId);
    if (idx !== -1) this.students[idx] = updated;
    this.addAuditLog({
      user: currentUser,
      action: 'STUDENT_RESTORED',
      entity: 'Student',
      entityId: studentId,
      oldValue: 'DELETED',
      newValue: 'Active',
      reason: 'Restored from Recycle Bin'
    });
    return updated;
  },

  // Direct Async Student Save to Cloud Firestore
  async saveStudent(studentData, currentUser = 'Admin') {
    let isEdit = false;
    let oldStudent = null;

    if (studentData.id) {
      const existing = this.getStudentById(studentData.id);
      if (existing) {
        isEdit = true;
        oldStudent = { ...existing };
      }
    }

    if (!isEdit && !studentData.admissionNo) {
      const count = this.getStudents().length + 1;
      studentData.admissionNo = 'ADM-2026-' + String(count).padStart(3, '0');
    }

    const payload = {
      status: 'Active',
      isDeleted: false,
      academicSession: CONFIG.defaultAcademicSession,
      concessionType: 'NONE',
      transportRequired: false,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      ...studentData
    };

    // Save directly to Firestore
    const saved = await FirebaseService.saveStudentToFirestore(payload);

    // Optimistically update memory
    if (isEdit) {
      const idx = this.students.findIndex(s => s.id === saved.id);
      if (idx !== -1) this.students[idx] = { ...this.students[idx], ...saved };
    } else {
      this.students.push(saved);
    }

    // Record Audit Log in Cloud Firestore
    this.addAuditLog({
      user: currentUser,
      action: isEdit ? 'STUDENT_UPDATED' : 'STUDENT_CREATED',
      entity: 'Student',
      entityId: saved.id,
      oldValue: oldStudent ? JSON.stringify(oldStudent) : null,
      newValue: JSON.stringify(saved),
      reason: isEdit ? 'Updated student profile' : 'Created new student profile'
    });

    return saved;
  },

  async deleteStudent(studentId, currentUser = 'Admin') {
    await FirebaseService.deleteStudentFromFirestore(studentId);
    this.students = this.students.filter(s => s.id !== studentId);
    this.addAuditLog({
      user: currentUser,
      action: 'STUDENT_PERMANENTLY_DELETED',
      entity: 'Student',
      entityId: studentId,
      oldValue: null,
      newValue: null,
      reason: 'Permanently deleted student profile from Cloud Firestore'
    });
  },

  // Payments & Ledger
  getPayments() {
    return this.payments;
  },

  getPaymentsForStudent(studentId) {
    return this.payments.filter(p => p.studentId === studentId && p.status !== 'REVERSED');
  },

  /**
   * Record a Fee Payment directly in Cloud Firestore
   */
  async recordPayment(paymentData, currentUser = 'Fee Manager') {
    const receiptNo = paymentData.receiptNo || ('RCP-2026-' + String(this.payments.length + 5001));
    const newPayment = {
      id: paymentData.id || ('PAY-' + Date.now() + '-' + Math.floor(Math.random() * 1000)),
      receiptNo,
      studentId: paymentData.studentId,
      monthKey: paymentData.monthKey || null,
      feeType: (paymentData.feeType || 'MONTHLY').toUpperCase(),
      amount: Number(paymentData.amount || 0),
      paymentMode: paymentData.paymentMode || 'Cash',
      transactionId: paymentData.transactionId || null,
      notes: paymentData.notes || '',
      status: 'SUCCESS',
      createdBy: currentUser,
      createdAt: new Date().toISOString()
    };

    // Save directly to Firestore
    const saved = await FirebaseService.saveFeeToFirestore(newPayment);

    // Optimistically update memory
    this.payments.push(saved);

    // Record Audit Log
    this.addAuditLog({
      user: currentUser,
      action: 'PAYMENT_COLLECTED',
      entity: 'Payment',
      entityId: saved.id,
      oldValue: null,
      newValue: JSON.stringify(saved),
      reason: `Collected ₹${saved.amount} for ${saved.feeType} ${saved.monthKey || ''} via ${saved.paymentMode}`
    });

    return saved;
  },

  /**
   * Unmark Month Fee (Deletes month payment from Firestore)
   */
  async unmarkMonthFee(studentId, monthKey, currentUser = 'Fee Manager') {
    await FirebaseService.deleteFeesForMonthFromFirestore(studentId, monthKey);
    this.payments = this.payments.filter(p => {
      if (p.studentId !== studentId || p.feeType !== 'MONTHLY') return true;
      const pKey = String(p.monthKey || p.month || '').trim().toUpperCase();
      return pKey !== String(monthKey).trim().toUpperCase();
    });

    this.addAuditLog({
      user: currentUser,
      action: 'FEE_UNMARKED_MONTH',
      entity: 'Payment',
      entityId: `${studentId}_${monthKey}`,
      oldValue: 'Paid',
      newValue: 'Pending',
      reason: `Unmarked fee for month ${monthKey}`
    });
  },

  /**
   * Unmark Other Fee (e.g. ADMISSION, DIARY, FEE_CARD)
   */
  async unmarkOtherFee(studentId, feeType, currentUser = 'Fee Manager') {
    const targetType = String(feeType).trim().toUpperCase();
    await FirebaseService.deleteFeesForOtherTypeFromFirestore(studentId, targetType);
    this.payments = this.payments.filter(p => {
      if (p.studentId !== studentId) return true;
      const pType = String(p.feeType || '').trim().toUpperCase();
      return pType !== targetType;
    });

    this.addAuditLog({
      user: currentUser,
      action: 'FEE_UNMARKED_OTHER',
      entity: 'Payment',
      entityId: `${studentId}_${targetType}`,
      oldValue: 'Paid',
      newValue: 'Pending',
      reason: `Unmarked ${targetType} fee`
    });
  },

  /**
   * Single Fee Record Delete / Unmark
   */
  async deletePayment(feeId, currentUser = 'Fee Manager') {
    await FirebaseService.deleteFeeFromFirestore(feeId);
    this.payments = this.payments.filter(p => p.id !== feeId);
    this.addAuditLog({
      user: currentUser,
      action: 'PAYMENT_DELETED',
      entity: 'Payment',
      entityId: feeId,
      oldValue: null,
      newValue: null,
      reason: 'Deleted payment record from Firestore'
    });
  },

  // Fee Overrides
  getClassOverrides() {
    return this.classOverrides;
  },

  async saveClassOverride(className, monthlyFee, currentUser = 'Admin', reason = '') {
    await FirebaseService.saveClassOverrideToFirestore(className, monthlyFee, reason);
    const existingIdx = this.classOverrides.findIndex(o => o.className === className);
    const overrideObj = {
      id: className.replace(/[\/\s]/g, '_'),
      className,
      monthlyFee: Number(monthlyFee),
      active: true,
      reason
    };
    if (existingIdx !== -1) {
      this.classOverrides[existingIdx] = overrideObj;
    } else {
      this.classOverrides.push(overrideObj);
    }

    this.addAuditLog({
      user: currentUser,
      action: 'CLASS_FEE_OVERRIDE',
      entity: 'FeeStructure',
      entityId: className,
      oldValue: null,
      newValue: JSON.stringify(overrideObj),
      reason: reason || `Updated base fee for ${className} to ₹${monthlyFee}`
    });
  },

  // WhatsApp Logs
  getWhatsAppLogs() {
    return this.whatsappLogs;
  },

  async recordWhatsAppLog(logEntry) {
    const newLog = {
      id: 'WA-' + Date.now(),
      status: 'SENT',
      sentAt: new Date().toISOString(),
      ...logEntry
    };
    this.whatsappLogs.unshift(newLog);
    await FirebaseService.saveWhatsAppLogToFirestore(newLog);
    return newLog;
  },

  // Audit Logs
  getAuditLogs() {
    return this.auditLogs;
  },

  async addAuditLog(entry) {
    const newEntry = {
      id: 'AUD-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      ...entry
    };
    this.auditLogs.unshift(newEntry);
    await FirebaseService.saveAuditLogToFirestore(newEntry);
  }
};
