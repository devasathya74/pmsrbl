/**
 * WhatsApp Business API & Fee Reminder Module
 * Integrated fee reminder generator, preview modal controller, wa.me deep link launcher, and Cloud API handler.
 */
const WhatsAppModule = {
  /**
   * Normalize guardian phone number to international +91 standard
   */
  normalizePhoneNumber(mobile) {
    if (!mobile) return null;
    // Strip non-digits
    let cleaned = String(mobile).replace(/\D/g, '');
    if (cleaned.length === 10) {
      cleaned = '91' + cleaned;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
      // already includes 91
    } else {
      return null; // invalid
    }
    return '+' + cleaned;
  },

  /**
   * Check duplicate reminder protection threshold
   */
  isDuplicateReminder(studentId, thresholdHours = CONFIG.whatsapp.duplicateProtectionHours) {
    const logs = Store.getWhatsAppLogs();
    const recentLog = logs.find(l => l.studentId === studentId);
    if (!recentLog) return false;

    const lastSentTime = new Date(recentLog.sentAt).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - lastSentTime) / (1000 * 60 * 60);

    return hoursPassed < thresholdHours ? { isDuplicate: true, hoursAgo: hoursPassed.toFixed(1) } : { isDuplicate: false };
  },

  currentLanguage: 'hi',
  activeFeeSummary: null,

  hindiMonthMap: {
    'April': 'अप्रैल', 'May': 'मई', 'June': 'जून', 'July': 'जुलाई',
    'August': 'अगस्त', 'September': 'सितंबर', 'October': 'अक्टूबर',
    'November': 'नवंबर', 'December': 'दिसंबर', 'January': 'जनवरी',
    'February': 'फरवरी', 'March': 'मार्च'
  },

  /**
   * Generate message content specifically for Tuition & Transport Fee (Supports 'hi', 'en', 'dual')
   */
  generateMessage(feeSummary, lang = this.currentLanguage) {
    const s = feeSummary.student;
    const isHindi = lang === 'hi';
    const isDual = lang === 'dual';
    const currentMonthName = isHindi ? 'अगस्त 2026' : (isDual ? 'अगस्त / August 2026' : 'August 2026');

    const hasTransport = Boolean(feeSummary.transport && feeSummary.transport.isAvailed && feeSummary.transportFeePendingTotal > 0);

    // Format Tuition Months
    let tuitionMonthsList = feeSummary.pendingMonthsList || [];
    if (isHindi && tuitionMonthsList.length > 0) {
      tuitionMonthsList = tuitionMonthsList.map(m => this.hindiMonthMap[m] || m);
    } else if (isDual && tuitionMonthsList.length > 0) {
      tuitionMonthsList = tuitionMonthsList.map(m => `${this.hindiMonthMap[m] || m} (${m.slice(0,3)})`);
    }
    const tuitionMonthsStr = tuitionMonthsList.length > 0 ? tuitionMonthsList.join(', ') : (isHindi ? 'कोई नहीं (अद्यतन)' : 'None / Paid');

    // Format Transport Months
    let transMonthsList = (feeSummary.transport && feeSummary.transport.pendingMonthsList) || [];
    if (isHindi && transMonthsList.length > 0) {
      transMonthsList = transMonthsList.map(m => this.hindiMonthMap[m] || m);
    } else if (isDual && transMonthsList.length > 0) {
      transMonthsList = transMonthsList.map(m => `${this.hindiMonthMap[m] || m} (${m.slice(0,3)})`);
    }
    const transMonthsStr = transMonthsList.length > 0 ? transMonthsList.join(', ') : (isHindi ? 'कोई नहीं' : 'None / Paid');

    // Choose appropriate template
    let templateText;
    if (isDual) {
      templateText = hasTransport
        ? CONFIG.whatsapp.dualTemplateWithTransport
        : CONFIG.whatsapp.dualTemplateTuitionOnly;
    } else if (isHindi) {
      templateText = hasTransport
        ? CONFIG.whatsapp.hindiTemplateWithTransport
        : CONFIG.whatsapp.hindiTemplateTuitionOnly;
    } else {
      templateText = hasTransport
        ? CONFIG.whatsapp.englishTemplateWithTransport
        : CONFIG.whatsapp.englishTemplateTuitionOnly;
    }

    const tuitionPendingStr = (feeSummary.monthlyFeePendingTotal || 0).toLocaleString('en-IN');
    const transportPendingStr = (feeSummary.transportFeePendingTotal || 0).toLocaleString('en-IN');
    const totalPendingStr = (feeSummary.monthlyFeePendingTotal + (hasTransport ? feeSummary.transportFeePendingTotal : 0)).toLocaleString('en-IN');

    let message = templateText
      .replace(/{{student_name}}/g, s.name)
      .replace(/{{class_name}}/g, s.className)
      .replace(/{{current_month}}/g, currentMonthName)
      .replace(/{{tuition_pending}}/g, tuitionPendingStr)
      .replace(/{{tuition_months}}/g, tuitionMonthsStr)
      .replace(/{{transport_pending}}/g, transportPendingStr)
      .replace(/{{transport_months}}/g, transMonthsStr)
      .replace(/{{total_pending}}/g, totalPendingStr)
      .replace(/{{school_name}}/g, CONFIG.school.name)
      .replace(/{{school_phone}}/g, CONFIG.school.phone);

    return message;
  },

  /**
   * Switch message language in modal ('dual', 'hi', 'en')
   */
  setReminderLanguage(lang) {
    this.currentLanguage = lang;
    document.querySelectorAll('.wa-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    if (this.activeFeeSummary) {
      const newMsg = this.generateMessage(this.activeFeeSummary, lang);
      const textarea = document.getElementById('wa-message-text');
      if (textarea) {
        textarea.value = newMsg;
      }
    }
  },

  /**
   * Generate WhatsApp wa.me direct chat link
   */
  generateWaMeLink(phoneFormatted, messageText) {
    const digitsOnly = phoneFormatted.replace(/\D/g, '');
    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${digitsOnly}?text=${encodedText}`;
  },

  /**
   * Open WhatsApp preview modal for operator review
   */
  openReminderPreview(studentId, targetMonthIdx = 5) { // August = 5
    const student = Store.getStudentById(studentId);
    if (!student) {
      alert('Student record not found.');
      return;
    }

    const phoneFormatted = this.normalizePhoneNumber(student.guardianMobile);
    if (!phoneFormatted) {
      alert(`Guardian WhatsApp number (${student.guardianMobile || 'Empty'}) is missing or invalid.`);
      return;
    }

    // 1. Live Real-Time Fee Engine Calculation
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const feeSummary = FeeEngine.calculateStudentFee(student, payments, classOverrides, [], targetMonthIdx);

    if (feeSummary.totalPendingAmount === 0) {
      alert(`${student.name} has no outstanding dues for the current period.`);
      return;
    }

    this.activeFeeSummary = feeSummary;

    // 2. Check Duplicate Protection
    const duplicateCheck = this.isDuplicateReminder(student.id);
    let duplicateWarning = '';
    if (duplicateCheck.isDuplicate) {
      duplicateWarning = `⚠️ Notice: A WhatsApp reminder was sent to this student ${duplicateCheck.hoursAgo} hours ago.`;
    }

    // 3. Render Modal Preview UI with Bilingual / Dual Language Switcher
    const initialLang = this.currentLanguage || 'dual';
    const messageText = this.generateMessage(feeSummary, initialLang);

    const modalBody = document.getElementById('whatsapp-modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        ${duplicateWarning ? `<div style="background:var(--warning-bg); color:var(--warning); padding:0.75rem; border-radius:var(--radius-md); font-size:0.85rem; margin-bottom:1rem; font-weight:600;">${duplicateWarning}</div>` : ''}
        
        <!-- Student Info Header -->
        <div style="background:var(--surface-2); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border); margin-bottom:1rem;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.88rem; margin-bottom:0.75rem;">
            <div><span style="color:var(--muted);">Student:</span> <strong>${student.name}</strong></div>
            <div><span style="color:var(--muted);">Class:</span> <strong>${student.className}</strong></div>
            <div><span style="color:var(--muted);">Father:</span> <strong>${student.fatherName || student.guardianName || '—'}</strong></div>
            <div><span style="color:var(--muted);">WhatsApp:</span> <strong>${phoneFormatted}</strong></div>
            <div><span style="color:var(--muted);">Transport:</span> <strong>${feeSummary.transport?.isAvailed ? `🚌 Yes (₹${feeSummary.transport.monthlyRate}/mo)` : '❌ No'}</strong></div>
          </div>
          <div style="background:var(--primary-light); padding:0.6rem 0.85rem; border-radius:var(--radius-sm); font-size:0.85rem; color:var(--primary); font-weight:700; display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
            <div>Tuition Due: ₹${feeSummary.monthlyFeePendingTotal.toLocaleString('en-IN')} (${feeSummary.pendingMonthsList.length} mos)</div>
            ${feeSummary.transport?.isAvailed ? `<div>Transport Due: ₹${feeSummary.transportFeePendingTotal.toLocaleString('en-IN')}</div>` : ''}
            <div>Total: ₹${(feeSummary.monthlyFeePendingTotal + (feeSummary.transportFeePendingTotal || 0)).toLocaleString('en-IN')}</div>
          </div>
        </div>

        <!-- Language Switcher Tabs -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.5rem;">
          <label class="form-label" style="margin-bottom:0; font-weight:700;">Template Language / भाषा चुनें:</label>
          <div style="display:flex; gap:0.35rem; background:var(--surface); border:1px solid var(--border); padding:3px; border-radius:9999px;">
            <button type="button" class="btn btn-xs wa-lang-btn ${initialLang === 'dual' ? 'active' : ''}" data-lang="dual" onclick="WhatsAppModule.setReminderLanguage('dual')" style="border-radius:9999px; font-weight:700; padding:0.25rem 0.65rem;">
              🌐 Dual (हिंदी + Eng)
            </button>
            <button type="button" class="btn btn-xs wa-lang-btn ${initialLang === 'hi' ? 'active' : ''}" data-lang="hi" onclick="WhatsAppModule.setReminderLanguage('hi')" style="border-radius:9999px; font-weight:700; padding:0.25rem 0.65rem;">
              🇮🇳 हिंदी
            </button>
            <button type="button" class="btn btn-xs wa-lang-btn ${initialLang === 'en' ? 'active' : ''}" data-lang="en" onclick="WhatsAppModule.setReminderLanguage('en')" style="border-radius:9999px; font-weight:700; padding:0.25rem 0.65rem;">
              🇬🇧 English
            </button>
          </div>
        </div>

        <!-- Message Preview Textarea -->
        <div class="form-group">
          <textarea id="wa-message-text" rows="10" class="form-control" style="font-family:var(--font-sans); font-size:0.86rem; line-height:1.5; background:var(--surface-2); border:1px solid var(--border); border-radius:10px; color:var(--text);">${messageText}</textarea>
        </div>
      `;
    }

    // Setup action buttons
    const confirmBtn = document.getElementById('wa-confirm-send-btn');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const editedMessage = document.getElementById('wa-message-text').value;
        const finalWaUrl = this.generateWaMeLink(phoneFormatted, editedMessage);

        // Record WhatsApp Message Log
        Store.recordWhatsAppLog({
          studentId: student.id,
          studentName: student.name,
          guardianMobile: phoneFormatted,
          pendingAmount: feeSummary.totalPendingAmount,
          pendingMonths: feeSummary.pendingMonthsList.join(', '),
          currentMonth: 'August',
          status: 'SENT',
          sentBy: 'Fee Manager',
          apiMessageId: 'wa-api-' + Date.now()
        });

        // Close Modal & Launch WhatsApp Link
        document.getElementById('whatsapp-modal').classList.remove('active');
        window.open(finalWaUrl, '_blank');
      };
    }

    document.getElementById('whatsapp-modal').classList.add('active');
  },

  openBulkReminderModal() {
    const selectedIds = Array.from(App.selectedStudentIds || []);
    if (selectedIds.length === 0) {
      App.toast('No students selected for WhatsApp reminders.', 'warning');
      return;
    }

    if (selectedIds.length === 1) {
      this.openReminderPreview(selectedIds[0]);
      return;
    }

    // Open first student from batch with notification
    App.toast(`Starting WhatsApp reminder batch for ${selectedIds.length} students.`, 'info', 2000);
    this.openReminderPreview(selectedIds[0]);
  }
};
