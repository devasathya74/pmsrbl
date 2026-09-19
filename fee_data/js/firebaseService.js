/**
 * Firebase Cloud Firestore Integration Module
 * Pure Firestore Sync: Realtime Load & Direct Save to Cloud Firestore (NO LocalStorage Data Cache)
 */
const FirebaseService = {
  db: null,
  auth: null,
  currentUser: null,
  isInitialized: false,
  unsubscribeStudents: null,
  unsubscribeFees: null,
  unsubscribeOverrides: null,

  get config() {
    const env = window.__ENV__ || {};
    return {
      apiKey: env.FIREBASE_API_KEY || "AIzaSyDsVKuptdW4jRWQ5rLX_h_fn53xuFoYVMI",
      authDomain: env.FIREBASE_AUTH_DOMAIN || "abcreport-27dea.firebaseapp.com",
      projectId: env.FIREBASE_PROJECT_ID || "abcreport-27dea",
      storageBucket: env.FIREBASE_STORAGE_BUCKET || "abcreport-27dea.firebasestorage.app",
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || "1422972209",
      appId: env.FIREBASE_APP_ID || "1:1422972209:web:82fbc39400d75566d8cc10"
    };
  },

  monthMap: {
    'april': 'APR', 'may': 'MAY', 'june': 'JUN', 'july': 'JUL',
    'august': 'AUG', 'september': 'SEP', 'october': 'OCT', 'november': 'NOV',
    'december': 'DEC', 'january': 'JAN', 'february': 'FEB', 'march': 'MAR',
    'apr': 'APR', 'may': 'MAY', 'jun': 'JUN', 'jul': 'JUL',
    'aug': 'AUG', 'sep': 'SEP', 'oct': 'OCT', 'nov': 'NOV',
    'dec': 'DEC', 'jan': 'JAN', 'feb': 'FEB', 'mar': 'MAR'
  },

  /**
   * Universal Class Name Normalizer
   */
  normalizeClassName(rawClass) {
    if (!rawClass) return 'Class 1';
    let str = String(rawClass).trim().toUpperCase();

    // 1. Check KG classes
    if (str.includes('KG-1') || str.includes('KG 1') || str.includes('KG1') || str.includes('KG-I') || str === 'KGI') return 'KG-1';
    if (str.includes('KG-2') || str.includes('KG 2') || str.includes('KG2') || str.includes('KG-II') || str === 'KGII') return 'KG-2';

    // 2. Direct Ordinal Matching ('5TH', '1ST', '2ND', etc.)
    if (str.includes('1ST') || str.includes('CLASS 1') || str.includes('CLASS-1') || str === '1' || str === 'I') return 'Class 1';
    if (str.includes('2ND') || str.includes('CLASS 2') || str.includes('CLASS-2') || str === '2' || str === 'II') return 'Class 2';
    if (str.includes('3RD') || str.includes('CLASS 3') || str.includes('CLASS-3') || str === '3' || str === 'III') return 'Class 3';
    if (str.includes('4TH') || str.includes('CLASS 4') || str.includes('CLASS-4') || str === '4' || str === 'IV') return 'Class 4';
    if (str.includes('5TH') || str.includes('CLASS 5') || str.includes('CLASS-5') || str === '5' || str === 'V') return 'Class 5';
    if (str.includes('6TH') || str.includes('CLASS 6') || str.includes('CLASS-6') || str === '6' || str === 'VI') return 'Class 6';
    if (str.includes('7TH') || str.includes('CLASS 7') || str.includes('CLASS-7') || str === '7' || str === 'VII') return 'Class 7';
    if (str.includes('8TH') || str.includes('CLASS 8') || str.includes('CLASS-8') || str === '8' || str === 'VIII') return 'Class 8';

    // 3. Fallback: extract any digit 1 to 8 in the string
    const anyDigit = str.match(/[1-8]/);
    if (anyDigit) {
      return 'Class ' + anyDigit[0];
    }

    return 'Class 1';
  },

  credentials: {
    email: "sathyauppolice74@gmail.com",
    pass: "123456"
  },

  async init() {
    if (typeof firebase === 'undefined') {
      console.error('Firebase SDK not loaded.');
      this.updateConnectionStatusBadge(false, 'Offline / Missing SDK');
      if (typeof App !== 'undefined' && App.hideLoading) App.hideLoading();
      return false;
    }

    try {
      if (typeof App !== 'undefined' && App.showLoading) {
        App.showLoading('Connecting to Cloud Firestore...');
      }

      if (!firebase.apps.length) {
        firebase.initializeApp(this.config);
      }

      this.db = firebase.firestore();
      this.auth = firebase.auth();

      // Automatic Authentication with User Credentials
      this.auth.onAuthStateChanged(async (user) => {
        if (user && user.email === this.credentials.email) {
          this.currentUser = user;
          await this.setupRealtimeListeners();
        } else {
          await this.autoLoginWithCredentials();
        }
      });

      this.isInitialized = true;
      return true;
    } catch (err) {
      console.error('Firebase initialization error:', err);
      this.updateConnectionStatusBadge(false, 'Connection Failed');
      if (typeof App !== 'undefined' && App.hideLoading) App.hideLoading();
      return false;
    }
  },

  async autoLoginWithCredentials() {
    try {
      const userCred = await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.pass);
      this.currentUser = userCred.user;
      await this.setupRealtimeListeners();
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        try {
          const createCred = await this.auth.createUserWithEmailAndPassword(this.credentials.email, this.credentials.pass);
          this.currentUser = createCred.user;
          await this.setupRealtimeListeners();
        } catch (createErr) {
          console.error('User creation fallback failed:', createErr);
        }
      } else {
        console.error('Auto login with credentials error:', err);
        // Fallback to anonymous if credentials fail
        try {
          const anon = await this.auth.signInAnonymously();
          this.currentUser = anon.user;
          await this.setupRealtimeListeners();
        } catch (anonErr) {
          console.error('Anonymous fallback failed:', anonErr);
        }
      }
    }
  },

  updateConnectionStatusBadge(connected, text) {
    const badge = document.getElementById('firebase-status-badge');
    if (badge) {
      if (connected) {
        const userTag = this.currentUser && this.currentUser.email ? this.currentUser.email.split('@')[0] : 'Auth';
        badge.className = 'badge badge-success';
        badge.innerHTML = `<span class="live-pulse-dot"></span> Cloud Firestore (${userTag} | Auto-Sync 2.5s)`;
      } else {
        badge.className = 'badge badge-danger';
        badge.innerHTML = `<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#ef4444; margin-right:4px;"></span> ${text}`;
      }
    }
  },

  /**
   * Setup Realtime Firestore Listeners (Pure Firestore Sync - No LocalStorage)
   */
  async setupRealtimeListeners() {
    if (!this.db) return;

    let studentsLoaded = false;
    let feesLoaded = false;

    const checkInitialLoadDone = () => {
      if (studentsLoaded && feesLoaded) {
        if (typeof App !== 'undefined' && App.hideLoading) {
          App.hideLoading();
        }
        this.updateConnectionStatusBadge(true, `${Store.getStudents().length} Students Live`);
        if (typeof App !== 'undefined') {
          App.refreshActiveView();
        }
      }
    };

    // 1. Listen to Students collection in Firestore
    if (this.unsubscribeStudents) this.unsubscribeStudents();
    this.unsubscribeStudents = this.db.collection('students').onSnapshot((snapshot) => {
      const liveStudents = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const rawClass = data.cls || data.className || data.class || data.std || data.standard || data.grade || '1';
        const formattedClass = this.normalizeClassName(rawClass);
        const fatherName = data.father || data.fatherName || data.FatherName || data.guardianName || '';
        const admNo = data.pen || data.admissionNo || data.id || ('ADM-' + doc.id.substring(0, 6));

        let studentName = data.name || data.studentName || data.student_name;
        if (!studentName || studentName.trim() === '') {
          studentName = fatherName ? `Ward of ${fatherName}` : `Student (${admNo})`;
        }

        liveStudents.push({
          id: doc.id,
          admissionNo: admNo,
          name: studentName,
          className: formattedClass,
          section: data.section || 'A',
          fatherName: fatherName,
          guardianName: fatherName,
          guardianMobile: data.mobile || data.guardianMobile || data.phone || data.fatherAadhar || '9876543210',
          concessionType: data.concessionType || 'NONE',
          customMonthlyFee: data.customMonthlyFee !== undefined ? data.customMonthlyFee : null,
          transportRequired: Boolean(data.transportRequired || data.bus),
          status: data.status || 'Active',
          admissionDate: data.admissionDate || '2026-04-01',
          academicSession: data.academicSession || CONFIG.defaultAcademicSession,
          incomeCertificateSubmitted: Boolean(data.incomeCertificateSubmitted),
          incomeCertificateApproved: Boolean(data.incomeCertificateApproved),
          ...data
        });
      });

      Store.setStudentsInMemory(liveStudents);
      studentsLoaded = true;
      checkInitialLoadDone();
    }, (err) => {
      console.error('Error in students live listener:', err);
      this.updateConnectionStatusBadge(false, 'Students Sync Error');
      studentsLoaded = true;
      checkInitialLoadDone();
    });

    // 2. Listen to Fees collection in Firestore
    if (this.unsubscribeFees) this.unsubscribeFees();
    this.unsubscribeFees = this.db.collection('fees').onSnapshot((snapshot) => {
      const liveFees = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        let monthKey = null;
        if (data.month || data.monthKey) {
          const mLower = String(data.monthKey || data.month).trim().toLowerCase();
          monthKey = this.monthMap[mLower] || data.monthKey || data.month;
        }

        let createdAtStr = new Date().toISOString();
        if (data.createdAt) {
          if (typeof data.createdAt === 'string') {
            createdAtStr = data.createdAt;
          } else if (typeof data.createdAt.toDate === 'function') {
            createdAtStr = data.createdAt.toDate().toISOString();
          } else if (data.createdAt.seconds) {
            createdAtStr = new Date(data.createdAt.seconds * 1000).toISOString();
          }
        }

        // Determine normalized feeType
        let rawFeeType = (data.feeType || '').toUpperCase();
        if (!rawFeeType) {
          if (data.month === 'ADMISSION' || monthKey === 'ADMISSION') rawFeeType = 'ADMISSION';
          else if (data.month === 'DIARY' || monthKey === 'DIARY') rawFeeType = 'DIARY';
          else if (data.month === 'FEE_CARD' || monthKey === 'FEE_CARD' || data.month === 'FEECARD') rawFeeType = 'FEE_CARD';
          else rawFeeType = 'MONTHLY';
        }

        liveFees.push({
          ...data,
          id: doc.id,
          receiptNo: data.receiptNo || data.receipt || ('RCP-' + doc.id.substring(0, 6)),
          studentId: data.studentId,
          monthKey: (rawFeeType === 'MONTHLY' && monthKey !== 'ADMISSION') ? monthKey : (monthKey || null),
          feeType: rawFeeType,
          amount: Number(data.amount || data.feeAmount || 0),
          paymentMode: data.paymentMode || 'Cash',
          createdBy: data.createdBy || 'Fee Manager',
          createdAt: createdAtStr,
          status: data.status || 'SUCCESS'
        });
      });

      Store.setPaymentsInMemory(liveFees);
      feesLoaded = true;
      checkInitialLoadDone();
    }, (err) => {
      console.error('Error in fees live listener:', err);
      this.updateConnectionStatusBadge(false, 'Fees Sync Error');
      feesLoaded = true;
      checkInitialLoadDone();
    });

    // 3. Listen to Class Overrides (Gracefully handle permission errors)
    if (this.unsubscribeOverrides) this.unsubscribeOverrides();
    try {
      this.unsubscribeOverrides = this.db.collection('class_overrides').onSnapshot((snapshot) => {
        const overrides = [];
        snapshot.forEach(doc => {
          overrides.push({ id: doc.id, ...doc.data() });
        });
        Store.setClassOverridesInMemory(overrides);
        if (studentsLoaded && feesLoaded && typeof App !== 'undefined') {
          App.refreshActiveView(true);
        }
      }, (err) => {
        console.info('Class overrides info:', err.message);
      });
    } catch (e) {
      console.info('Class overrides listener catch:', e);
    }

    // 4. Start 2.5-Second Periodic Database Polling & Auto-Refresh Heartbeat
    this.startAutoSyncPolling(2500);
  },

  syncIntervalTimer: null,

  startAutoSyncPolling(intervalMs = 2500) {
    if (this.syncIntervalTimer) clearInterval(this.syncIntervalTimer);
    
    this.syncIntervalTimer = setInterval(async () => {
      if (!this.db || !this.currentUser) return;
      try {
        // Fast parallel fetch to guarantee fresh Firestore data every 2-3 seconds
        const [stuSnap, feeSnap] = await Promise.all([
          this.db.collection('students').get(),
          this.db.collection('fees').get()
        ]);

        const freshStudents = [];
        stuSnap.forEach(doc => {
          const data = doc.data();
          const rawClass = data.cls || data.className || data.class || data.std || data.standard || data.grade || '1';
          const formattedClass = this.normalizeClassName(rawClass);
          const fatherName = data.father || data.fatherName || data.FatherName || data.guardianName || '';
          const admNo = data.pen || data.admissionNo || data.id || ('ADM-' + doc.id.substring(0, 6));

          let studentName = data.name || data.studentName || data.student_name;
          if (!studentName || studentName.trim() === '') {
            studentName = fatherName ? `Ward of ${fatherName}` : `Student (${admNo})`;
          }

          freshStudents.push({
            id: doc.id,
            admissionNo: admNo,
            name: studentName,
            className: formattedClass,
            section: data.section || 'A',
            fatherName: fatherName,
            guardianName: fatherName,
            guardianMobile: data.mobile || data.guardianMobile || data.phone || data.fatherAadhar || '9876543210',
            concessionType: data.concessionType || 'NONE',
            customMonthlyFee: data.customMonthlyFee !== undefined ? data.customMonthlyFee : null,
            transportRequired: Boolean(data.transportRequired || data.bus),
            status: data.status || 'Active',
            admissionDate: data.admissionDate || '2026-04-01',
            academicSession: data.academicSession || CONFIG.defaultAcademicSession,
            incomeCertificateSubmitted: Boolean(data.incomeCertificateSubmitted),
            incomeCertificateApproved: Boolean(data.incomeCertificateApproved),
            ...data
          });
        });

        const freshFees = [];
        feeSnap.forEach(doc => {
          const data = doc.data();
          let monthKey = null;
          if (data.month || data.monthKey) {
            const mLower = String(data.monthKey || data.month).trim().toLowerCase();
            monthKey = this.monthMap[mLower] || data.monthKey || data.month;
          }

          let createdAtStr = new Date().toISOString();
          if (data.createdAt) {
            if (typeof data.createdAt === 'string') {
              createdAtStr = data.createdAt;
            } else if (typeof data.createdAt.toDate === 'function') {
              createdAtStr = data.createdAt.toDate().toISOString();
            } else if (data.createdAt.seconds) {
              createdAtStr = new Date(data.createdAt.seconds * 1000).toISOString();
            }
          }

          let rawFeeType = (data.feeType || '').toUpperCase();
          if (!rawFeeType) {
            if (data.month === 'ADMISSION' || monthKey === 'ADMISSION') rawFeeType = 'ADMISSION';
            else if (data.month === 'DIARY' || monthKey === 'DIARY') rawFeeType = 'DIARY';
            else if (data.month === 'FEE_CARD' || monthKey === 'FEE_CARD' || data.month === 'FEECARD') rawFeeType = 'FEE_CARD';
            else rawFeeType = 'MONTHLY';
          }

          freshFees.push({
            ...data,
            id: doc.id,
            receiptNo: data.receiptNo || data.receipt || ('RCP-' + doc.id.substring(0, 6)),
            studentId: data.studentId,
            monthKey: (rawFeeType === 'MONTHLY' && monthKey !== 'ADMISSION') ? monthKey : (monthKey || null),
            feeType: rawFeeType,
            amount: Number(data.amount || data.feeAmount || 0),
            paymentMode: data.paymentMode || 'Cash',
            createdBy: data.createdBy || 'Fee Manager',
            createdAt: createdAtStr,
            status: data.status || 'SUCCESS'
          });
        });

        Store.setStudentsInMemory(freshStudents);
        Store.setPaymentsInMemory(freshFees);

        // Auto-refresh the current active screen seamlessly
        if (typeof App !== 'undefined' && App.silentAutoRefresh) {
          App.silentAutoRefresh();
        }
      } catch (pollErr) {
        console.debug('Polling check:', pollErr.message);
      }
    }, intervalMs);
  },

  // ===== DIRECT FIRESTORE CRUD OPERATIONS =====

  async saveStudentToFirestore(studentData) {
    if (!this.db) throw new Error('Firestore not initialized');
    const docId = studentData.id || ('STU-' + Date.now());
    const cleanData = {
      ...studentData,
      id: docId,
      name: String(studentData.name || '').trim(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (!studentData.id) {
      cleanData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    await this.db.collection('students').doc(docId).set(cleanData, { merge: true });
    return { ...studentData, id: docId };
  },

  async deleteStudentFromFirestore(studentId) {
    if (!this.db) throw new Error('Firestore not initialized');
    await this.db.collection('students').doc(studentId).delete();
  },

  async saveFeeToFirestore(feeData) {
    if (!this.db) throw new Error('Firestore not initialized');
    const docId = feeData.id || ('PAY-' + Date.now() + '-' + Math.floor(Math.random() * 1000));
    
    // Strict compliance with Firestore rule: validFee requires studentId (string > 0), month (string), year (string)
    const monthVal = String(feeData.month || feeData.monthKey || feeData.feeType || 'APR').toUpperCase();
    const yearVal = String(feeData.year || '2026-27');

    const cleanFee = {
      ...feeData,
      id: docId,
      studentId: String(feeData.studentId),
      month: monthVal,
      year: yearVal,
      monthKey: feeData.monthKey || (feeData.feeType === 'MONTHLY' ? monthVal : null),
      feeType: String(feeData.feeType || 'MONTHLY').toUpperCase(),
      amount: Number(feeData.amount || 0),
      paymentMode: String(feeData.paymentMode || 'Cash'),
      receiptNo: String(feeData.receiptNo || ('RCP-' + docId.substring(0, 6))),
      status: 'SUCCESS',
      createdAt: feeData.createdAt ? new Date(feeData.createdAt) : firebase.firestore.FieldValue.serverTimestamp()
    };
    await this.db.collection('fees').doc(docId).set(cleanFee, { merge: true });
    return { ...cleanFee, id: docId };
  },

  async deleteFeeFromFirestore(feeId) {
    if (!this.db) throw new Error('Firestore not initialized');
    await this.db.collection('fees').doc(feeId).delete();
  },

  async deleteFeesForMonthFromFirestore(studentId, monthKey) {
    if (!this.db) throw new Error('Firestore not initialized');
    const payments = Store.getPayments().filter(p => {
      if (p.studentId !== studentId || p.feeType !== 'MONTHLY') return false;
      const pKey = String(p.monthKey || p.month || '').trim().toUpperCase();
      return pKey === String(monthKey).trim().toUpperCase();
    });

    const batch = this.db.batch();
    payments.forEach(p => {
      const ref = this.db.collection('fees').doc(p.id);
      batch.delete(ref);
    });
    await batch.commit();
    return payments.length;
  },

  async deleteFeesForOtherTypeFromFirestore(studentId, feeType) {
    if (!this.db) throw new Error('Firestore not initialized');
    const targetType = String(feeType).trim().toUpperCase();
    const payments = Store.getPayments().filter(p => {
      if (p.studentId !== studentId) return false;
      const pType = String(p.feeType || '').trim().toUpperCase();
      return pType === targetType;
    });

    const batch = this.db.batch();
    payments.forEach(p => {
      const ref = this.db.collection('fees').doc(p.id);
      batch.delete(ref);
    });
    await batch.commit();
    return payments.length;
  },

  async saveClassOverrideToFirestore(className, monthlyFee, reason = '') {
    if (!this.db) throw new Error('Firestore not initialized');
    const docId = className.replace(/[\/\s]/g, '_');
    await this.db.collection('class_overrides').doc(docId).set({
      className,
      monthlyFee: Number(monthlyFee),
      active: true,
      reason,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  },

  async saveAuditLogToFirestore(entry) {
    if (!this.db) return;
    try {
      await this.db.collection('audit_logs').add({
        ...entry,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.warn('Audit log write error:', e);
    }
  },

  async saveWhatsAppLogToFirestore(logEntry) {
    if (!this.db) return;
    try {
      await this.db.collection('whatsapp_logs').add({
        ...logEntry,
        sentAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.warn('WhatsApp log write error:', e);
    }
  }
};
