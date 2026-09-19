/**
 * FORM S02 / UDISE MANAGEMENT ENGINE & CLOUD FIRESTORE SYNC
 * Dual Firestore Connection: Source (`students`) -> Destination (`form_s02_udise`)
 * Full Official Layout Generator & Pixel-Perfect A4 Print Studio
 */

const FormS02App = {
  // Cloud & State Storage
  db: null,
  auth: null,
  currentUser: null,
  unsubscribeStudents: null,
  unsubscribeS02: null,

  studentsMap: new Map(),     // Raw students from `students` collection
  s02RecordsMap: new Map(),   // Records from `form_s02_udise` collection
  mergedStudents: [],         // Combined working dataset

  selectedIds: new Set(),     // Selected student IDs for batch actions & print
  activeFilterClass: 'ALL',
  activeFilterStatus: 'ALL',
  activeSearchQuery: '',
  activeTab: 'studio',        // 'studio' | 'print'
  studentsPerPage: 3,         // Default 3 students per official Landscape A4 page

  // School & Header Configuration
  schoolSettings: {
    schoolName: "POLICE MODERN SCHOOL, 3RD BN PAC, RAEBARELI",
    udiseCode: "09291100315",
    academicYear: "2025-2026",
    state: "UTTAR PRADESH",
    district: "RAE BARELI",
    block: "NAGAR KSHETRA",
    contactNumber: "9454402634",
    headName: "Principal",
    headDesignation: "Principal / Head of School",
    officerName: "Education Officer",
    officerDesignation: "Block Education Officer / Equivalent"
  },

  // Firebase Configuration (Matching fee_data project)
  get firebaseConfig() {
    return {
      apiKey: "AIzaSyDsVKuptdW4jRWQ5rLX_h_fn53xuFoYVMI",
      authDomain: "abcreport-27dea.firebaseapp.com",
      projectId: "abcreport-27dea",
      storageBucket: "abcreport-27dea.firebasestorage.app",
      messagingSenderId: "1422972209",
      appId: "1:1422972209:web:82fbc39400d75566d8cc10"
    };
  },

  credentials: {
    email: "sathyauppolice74@gmail.com",
    pass: "123456"
  },

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  async init() {
    this.loadLocalSettings();
    this.updateSchoolInfoBanner();

    if (typeof firebase === 'undefined') {
      this.showToast('Firebase SDK not loaded. Check internet connection.', 'error');
      this.updateConnectionBadge(false, 'Missing SDK');
      return;
    }

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(this.firebaseConfig);
      }
      this.db = firebase.firestore();
      this.auth = firebase.auth();

      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.currentUser = user;
          this.updateConnectionBadge(true, `Live Sync: ${user.email.split('@')[0]}`);
          this.setupFirestoreListeners();
        } else {
          await this.loginUser();
        }
      });
    } catch (err) {
      console.error('Firebase Init Error:', err);
      this.updateConnectionBadge(false, 'Init Error');
      this.showToast('Firebase Connection Failed: ' + err.message, 'error');
    }
  },

  async loginUser() {
    try {
      const cred = await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.pass);
      this.currentUser = cred.user;
    } catch (err) {
      try {
        const anon = await this.auth.signInAnonymously();
        this.currentUser = anon.user;
      } catch (anonErr) {
        console.error('Auth Fallback Failed:', anonErr);
      }
    }
  },

  updateConnectionBadge(connected, text) {
    const badge = document.getElementById('firebase-status-badge');
    if (!badge) return;
    if (connected) {
      badge.className = 'badge-tag badge-success';
      badge.innerHTML = `<span class="live-pulse"></span> Cloud Firestore (${text})`;
    } else {
      badge.className = 'badge-tag badge-danger';
      badge.innerHTML = `Offline (${text})`;
    }
  },

  // --------------------------------------------------------------------------
  // REALTIME FIRESTORE LISTENERS
  // --------------------------------------------------------------------------
  setupFirestoreListeners() {
    if (!this.db) return;

    // 1. Listen to `students` collection
    if (this.unsubscribeStudents) this.unsubscribeStudents();
    this.unsubscribeStudents = this.db.collection('students').onSnapshot((snapshot) => {
      this.studentsMap.clear();
      snapshot.forEach(doc => {
        const data = doc.data();
        const stdId = doc.id;
        const normClass = this.normalizeClass(data.className || data.cls || data.class || data.std || data.grade);

        // Strictly filter out KG-1, KG-2, Nursery and only load Class 1 to 8
        if (!normClass) return;

        this.studentsMap.set(stdId, {
          id: stdId,
          docId: doc.id,
          admissionNo: data.admissionNo || data.pen || data.id || ('ADM-' + stdId.substring(0, 5)),
          pen: data.pen || data.admissionNo || '',
          name: data.name || data.studentName || data.student_name || 'Student',
          className: normClass,
          section: (data.section || 'A').toUpperCase(),
          fatherName: data.father || data.fatherName || data.FatherName || data.guardianName || '',
          motherName: data.mother || data.motherName || data.MotherName || '',
          guardianName: data.guardianName || data.guardian || data.father || data.fatherName || '',
          mobile: data.mobile || data.guardianMobile || data.phone || data.fatherAadhar || '',
          alternateMobile: data.alternateMobile || data.altPhone || '',
          dob: data.dob || data.dateOfBirth || data.birthDate || '',
          gender: this.normalizeGender(data.gender || data.sex || 'Male'),
          isCwsn: data.isCwsn || data.cwsn || 'No',
          admissionDate: data.admissionDate || '01/04/2025',
          aadhaarNo: data.aadhaarNo || data.aadhar || data.studentAadhaar || '',
          aadhaarName: data.aadhaarName || data.nameAsPerAadhaar || data.name || '',
          raw: data
        });
      });

      this.recalculateMergedData();
    }, (err) => {
      console.error('Students Listener Error:', err);
      this.showToast('Error syncing students: ' + err.message, 'error');
    });

    // 2. Listen to `form_s02_udise` collection (New Collection)
    if (this.unsubscribeS02) this.unsubscribeS02();
    this.unsubscribeS02 = this.db.collection('form_s02_udise').onSnapshot((snapshot) => {
      this.s02RecordsMap.clear();
      snapshot.forEach(doc => {
        this.s02RecordsMap.set(doc.id, {
          id: doc.id,
          ...doc.data()
        });
      });

      this.recalculateMergedData();
    }, (err) => {
      console.error('Form S02 Listener Error:', err);
      this.showToast('Error syncing Form S02 collection: ' + err.message, 'error');
    });
  },

  // --------------------------------------------------------------------------
  // DATA MERGING & COMPUTATION
  // --------------------------------------------------------------------------
  recalculateMergedData() {
    const list = [];

    this.studentsMap.forEach((std, stdId) => {
      // Check if S02 record exists by studentId or docId
      const s02 = this.s02RecordsMap.get(stdId) || this.s02RecordsMap.get(`s02_${stdId}`) || null;

      const merged = {
        studentId: stdId,
        docId: s02 ? s02.id : `s02_${stdId}`,
        isSavedInCloud: Boolean(s02),
        lastUpdated: s02 ? s02.updatedAt || s02.createdAt || null : null,

        // Core fields with S02 preference, fallback to Student DB
        name: (s02 && s02.name) ? s02.name : std.name,
        gender: (s02 && s02.gender) ? s02.gender : std.gender,
        dob: (s02 && s02.dob) ? s02.dob : (std.dob || ''),
        isCwsn: (s02 && s02.isCwsn) ? s02.isCwsn : (std.isCwsn || 'No'),
        className: (s02 && s02.className) ? s02.className : std.className,
        section: (s02 && s02.section) ? s02.section : std.section,

        admissionDate: (s02 && s02.admissionDate) ? s02.admissionDate : (std.admissionDate || '01/04/2025'),
        admissionNo: (s02 && s02.admissionNo) ? s02.admissionNo : std.admissionNo,
        pen: (s02 && s02.pen) ? s02.pen : std.pen,

        motherName: (s02 && s02.motherName) ? s02.motherName : (std.motherName || ''),
        fatherName: (s02 && s02.fatherName) ? s02.fatherName : std.fatherName,
        guardianName: (s02 && s02.guardianName) ? s02.guardianName : (std.guardianName || std.fatherName),

        mobile: (s02 && s02.mobile) ? s02.mobile : std.mobile,
        alternateMobile: (s02 && s02.alternateMobile) ? s02.alternateMobile : (std.alternateMobile || ''),

        aadhaarNo: (s02 && s02.aadhaarNo) ? s02.aadhaarNo : (std.aadhaarNo || ''),
        aadhaarName: (s02 && s02.aadhaarName) ? s02.aadhaarName : (std.aadhaarName || std.name),

        reasonNotAdded: (s02 && s02.reasonNotAdded) ? s02.reasonNotAdded : "Admitted from unrecognized / other school during session",
        remarks: (s02 && s02.remarks) ? s02.remarks : ""
      };

      list.push(merged);
    });

    // Also include any S02 records that might not be in students map (manual additions)
    this.s02RecordsMap.forEach((s02, s02Id) => {
      const originalId = s02.studentId || s02Id.replace('s02_', '');
      const validClass = this.normalizeClass(s02.className || 'Class 1');
      if (!validClass) return; // Skip if not Class 1-8

      if (!this.studentsMap.has(originalId) && !list.some(item => item.docId === s02Id)) {
        list.push({
          studentId: originalId,
          docId: s02Id,
          isSavedInCloud: true,
          lastUpdated: s02.updatedAt || s02.createdAt || null,
          name: s02.name || 'Student',
          gender: s02.gender || 'Male',
          dob: s02.dob || '',
          isCwsn: s02.isCwsn || 'No',
          className: validClass,
          section: s02.section || 'A',
          admissionDate: s02.admissionDate || '01/04/2025',
          admissionNo: s02.admissionNo || '',
          pen: s02.pen || '',
          motherName: s02.motherName || '',
          fatherName: s02.fatherName || '',
          guardianName: s02.guardianName || s02.fatherName || '',
          mobile: s02.mobile || '',
          alternateMobile: s02.alternateMobile || '',
          aadhaarNo: s02.aadhaarNo || '',
          aadhaarName: s02.aadhaarName || s02.name || '',
          reasonNotAdded: s02.reasonNotAdded || "Admitted from unrecognized / other school during session",
          remarks: s02.remarks || ""
        });
      }
    });

    // Sort by Class then Name
    list.sort((a, b) => {
      const classNumA = parseInt(a.className.replace(/\D/g, '')) || 0;
      const classNumB = parseInt(b.className.replace(/\D/g, '')) || 0;
      if (classNumA !== classNumB) return classNumA - classNumB;
      return a.name.localeCompare(b.name);
    });

    this.mergedStudents = list;
    this.updateStatsCounters();
    this.renderStudioTable();
    this.renderPrintPages();
  },

  // --------------------------------------------------------------------------
  // UTILITY HELPERS
  normalizeClass(raw) {
    if (!raw) return null;
    let str = String(raw).trim().toUpperCase();

    // 1. Filter out all KG-1, KG-2, Nursery, Pre-primary variants
    if (
      str.includes('KG') || 
      str.includes('K.G') || 
      str.includes('NURSERY') || 
      str.includes('LKG') || 
      str.includes('UKG') || 
      str.includes('PRE') || 
      str.includes('PLAY') ||
      str.includes('BALVATIKA') ||
      str.startsWith('KG') ||
      str.endsWith('KG')
    ) {
      return null;
    }

    // 2. Exact match if already "CLASS 1" ... "CLASS 8"
    for (let c = 1; c <= 8; c++) {
      if (str === `CLASS ${c}` || str === `CLASS-${c}` || str === `CLASS_${c}`) {
        return `Class ${c}`;
      }
    }

    // 3. Match Ordinal (1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th)
    const ordinals = {
      '1ST': 'Class 1', '1 ST': 'Class 1',
      '2ND': 'Class 2', '2 ND': 'Class 2',
      '3RD': 'Class 3', '3 RD': 'Class 3',
      '4TH': 'Class 4', '4 TH': 'Class 4',
      '5TH': 'Class 5', '5 TH': 'Class 5',
      '6TH': 'Class 6', '6 TH': 'Class 6',
      '7TH': 'Class 7', '7 TH': 'Class 7',
      '8TH': 'Class 8', '8 TH': 'Class 8'
    };
    for (const [key, val] of Object.entries(ordinals)) {
      if (str.includes(key) || str === key) {
        return val;
      }
    }

    // 4. Match Roman Numerals
    const romans = {
      'VIII': 'Class 8', 'CLASS VIII': 'Class 8',
      'VII': 'Class 7', 'CLASS VII': 'Class 7',
      'VI': 'Class 6', 'CLASS VI': 'Class 6',
      'IV': 'Class 4', 'CLASS IV': 'Class 4',
      'V': 'Class 5', 'CLASS V': 'Class 5',
      'III': 'Class 3', 'CLASS III': 'Class 3',
      'II': 'Class 2', 'CLASS II': 'Class 2',
      'I': 'Class 1', 'CLASS I': 'Class 1'
    };
    for (const [key, val] of Object.entries(romans)) {
      if (str === key || str === `CLASS ${key}` || str.endsWith(` ${key}`)) {
        return val;
      }
    }

    // 5. Standalone digit 1-8 extraction
    const match = str.match(/\b([1-8])\b/);
    if (match) {
      return 'Class ' + match[1];
    }

    return null;
  },

  normalizeGender(raw) {
    if (!raw) return 'Male';
    const s = String(raw).trim().toUpperCase();
    if (s.startsWith('F') || s.includes('FEMALE')) return 'Female';
    if (s.startsWith('T') || s.includes('TRANS')) return 'Transgender';
    return 'Male';
  },

  formatDateForDisplay(dateStr) {
    if (!dateStr) return '';
    if (dateStr.includes('/')) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  },

  // --------------------------------------------------------------------------
  // STATS & COUNTERS
  // --------------------------------------------------------------------------
  updateStatsCounters() {
    const total = this.mergedStudents.length;
    const saved = this.mergedStudents.filter(s => s.isSavedInCloud).length;
    const pending = total - saved;
    const selected = this.selectedIds.size;

    document.getElementById('stat-total-students').textContent = total;
    document.getElementById('stat-saved-cloud').textContent = saved;
    document.getElementById('stat-pending-cloud').textContent = pending;
    document.getElementById('stat-selected-count').textContent = selected;
  },

  // --------------------------------------------------------------------------
  // STUDIO TABLE RENDERING & FILTERING
  // --------------------------------------------------------------------------
  getFilteredStudents() {
    return this.mergedStudents.filter(std => {
      // Class Filter
      if (this.activeFilterClass !== 'ALL' && std.className !== this.activeFilterClass) {
        return false;
      }

      // Status Filter
      if (this.activeFilterStatus === 'SAVED' && !std.isSavedInCloud) return false;
      if (this.activeFilterStatus === 'PENDING' && std.isSavedInCloud) return false;

      // Search Filter
      if (this.activeSearchQuery) {
        const q = this.activeSearchQuery.toLowerCase();
        const searchTarget = `${std.name} ${std.fatherName} ${std.motherName} ${std.admissionNo} ${std.pen} ${std.mobile} ${std.className}`.toLowerCase();
        if (!searchTarget.includes(q)) return false;
      }

      return true;
    });
  },

  renderStudioTable() {
    const tbody = document.getElementById('students-tbody');
    if (!tbody) return;

    const list = this.getFilteredStudents();

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:3rem; color:var(--text-muted);">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🔍</div>
            <div style="font-weight:600;">No students match the selected filter criteria.</div>
            <div style="font-size:0.8rem; margin-top:0.25rem;">Try clearing your search query or selecting a different class.</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((std, idx) => {
      const isChecked = this.selectedIds.has(std.studentId);
      const rowClass = isChecked ? 'row-selected' : '';

      const statusBadge = std.isSavedInCloud
        ? `<span class="badge-tag badge-success"><span class="live-pulse"></span> Cloud Saved</span>`
        : `<span class="badge-tag badge-warning">Draft / Pending</span>`;

      return `
        <tr class="${rowClass}">
          <td style="text-align:center;">
            <input type="checkbox" onchange="FormS02App.toggleSelectStudent('${std.studentId}', this.checked)" ${isChecked ? 'checked' : ''}>
          </td>
          <td style="font-weight:600; text-align:center; color:var(--text-dim); font-family:var(--font-mono);">${idx + 1}</td>
          <td>
            <div class="student-meta-cell">
              <span class="student-name-primary">${std.name}</span>
              <div class="student-sub-info">
                <span>Adm: <strong>${std.admissionNo}</strong></span>
                <span>•</span>
                <span>${std.gender}</span>
                <span>•</span>
                <span>DOB: ${this.formatDateForDisplay(std.dob) || 'N/A'}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="badge-tag badge-primary">${std.className} - ${std.section}</span>
          </td>
          <td>
            <div style="font-size:0.8rem;">
              <div><strong>F:</strong> ${std.fatherName || '<em style="color:#ef4444;">Missing</em>'}</div>
              <div><strong>M:</strong> ${std.motherName || '<em style="color:#f59e0b;">Missing</em>'}</div>
            </div>
          </td>
          <td>
            <div style="font-size:0.8rem; font-family:var(--font-mono);">
              <div>📞 ${std.mobile || 'N/A'}</div>
              <div style="color:var(--text-dim); font-size:0.75rem;">🆔 ${std.aadhaarNo ? '•••• ' + std.aadhaarNo.slice(-4) : 'No Aadhaar'}</div>
            </div>
          </td>
          <td>${statusBadge}</td>
          <td style="text-align:right;">
            <div style="display:flex; gap:0.4rem; justify-content:flex-end;">
              <button class="btn btn-secondary btn-sm" onclick="FormS02App.openEditModal('${std.studentId}')" title="Edit Form S02 Data">
                ✏️ Edit
              </button>
              <button class="btn btn-primary btn-sm" onclick="FormS02App.saveSingleStudentRecord('${std.studentId}')" title="Save Directly to Firestore">
                ☁️ Save
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Update master select-all checkbox
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = list.length > 0 && list.every(s => this.selectedIds.has(s.studentId));
    }
  },

  // --------------------------------------------------------------------------
  // SELECTION & BATCH ACTIONS
  // --------------------------------------------------------------------------
  toggleSelectStudent(studentId, isChecked) {
    if (isChecked) {
      this.selectedIds.add(studentId);
    } else {
      this.selectedIds.delete(studentId);
    }
    this.updateStatsCounters();
    this.renderStudioTable();
    this.renderPrintPages();
  },

  toggleSelectAll(isChecked) {
    const list = this.getFilteredStudents();
    list.forEach(std => {
      if (isChecked) {
        this.selectedIds.add(std.studentId);
      } else {
        this.selectedIds.delete(std.studentId);
      }
    });
    this.updateStatsCounters();
    this.renderStudioTable();
    this.renderPrintPages();
  },

  selectAllAllStudents() {
    this.mergedStudents.forEach(std => this.selectedIds.add(std.studentId));
    this.updateStatsCounters();
    this.renderStudioTable();
    this.renderPrintPages();
    this.showToast(`Selected all ${this.mergedStudents.length} students.`, 'info');
  },

  clearSelection() {
    this.selectedIds.clear();
    this.updateStatsCounters();
    this.renderStudioTable();
    this.renderPrintPages();
    this.showToast('Selection cleared.', 'info');
  },

  // --------------------------------------------------------------------------
  // MODAL & SINGLE STUDENT EDITING
  // --------------------------------------------------------------------------
  openEditModal(studentId) {
    const student = this.mergedStudents.find(s => s.studentId === studentId);
    if (!student) return;

    document.getElementById('modal-student-id').value = student.studentId;
    document.getElementById('modal-doc-id').value = student.docId;

    document.getElementById('edit-name').value = student.name || '';
    document.getElementById('edit-gender').value = student.gender || 'Male';
    document.getElementById('edit-dob').value = this.formatDateForDisplay(student.dob) || '';
    document.getElementById('edit-is-cwsn').value = student.isCwsn || 'No';
    document.getElementById('edit-class').value = student.className || 'Class 2';
    document.getElementById('edit-section').value = student.section || 'A';

    document.getElementById('edit-adm-date').value = this.formatDateForDisplay(student.admissionDate) || '01/04/2025';
    document.getElementById('edit-adm-no').value = student.admissionNo || '';
    document.getElementById('edit-pen').value = student.pen || '';

    document.getElementById('edit-mother').value = student.motherName || '';
    document.getElementById('edit-father').value = student.fatherName || '';
    document.getElementById('edit-guardian').value = student.guardianName || student.fatherName || '';

    document.getElementById('edit-mobile').value = student.mobile || '';
    document.getElementById('edit-alt-mobile').value = student.alternateMobile || '';

    document.getElementById('edit-aadhaar-no').value = student.aadhaarNo || '';
    document.getElementById('edit-aadhaar-name').value = student.aadhaarName || student.name || '';

    document.getElementById('edit-reason').value = student.reasonNotAdded || 'Admitted from unrecognized / other school during session';
    document.getElementById('edit-remarks').value = student.remarks || '';

    // Show modal
    document.getElementById('student-modal-overlay').classList.add('active');
  },

  closeEditModal() {
    document.getElementById('student-modal-overlay').classList.remove('active');
  },

  async handleModalFormSubmit(event) {
    event.preventDefault();
    const studentId = document.getElementById('modal-student-id').value;
    if (!studentId) return;

    const payload = {
      studentId: studentId,
      name: document.getElementById('edit-name').value.trim(),
      gender: document.getElementById('edit-gender').value,
      dob: document.getElementById('edit-dob').value.trim(),
      isCwsn: document.getElementById('edit-is-cwsn').value,
      className: document.getElementById('edit-class').value,
      section: document.getElementById('edit-section').value.trim().toUpperCase(),
      admissionDate: document.getElementById('edit-adm-date').value.trim(),
      admissionNo: document.getElementById('edit-adm-no').value.trim(),
      pen: document.getElementById('edit-pen').value.trim(),
      motherName: document.getElementById('edit-mother').value.trim(),
      fatherName: document.getElementById('edit-father').value.trim(),
      guardianName: document.getElementById('edit-guardian').value.trim(),
      mobile: document.getElementById('edit-mobile').value.trim(),
      alternateMobile: document.getElementById('edit-alt-mobile').value.trim(),
      aadhaarNo: document.getElementById('edit-aadhaar-no').value.trim(),
      aadhaarName: document.getElementById('edit-aadhaar-name').value.trim(),
      reasonNotAdded: document.getElementById('edit-reason').value.trim(),
      remarks: document.getElementById('edit-remarks').value.trim(),
      updatedAt: new Date().toISOString(),
      session: this.schoolSettings.academicYear
    };

    await this.saveToFirestoreS02(studentId, payload);
    this.closeEditModal();
  },

  // --------------------------------------------------------------------------
  // FIRESTORE CRUD ACTIONS (NEW COLLECTION: form_s02_udise)
  // --------------------------------------------------------------------------
  async saveSingleStudentRecord(studentId) {
    const student = this.mergedStudents.find(s => s.studentId === studentId);
    if (!student) return;

    const payload = {
      studentId: student.studentId,
      name: student.name,
      gender: student.gender,
      dob: this.formatDateForDisplay(student.dob),
      isCwsn: student.isCwsn,
      className: student.className,
      section: student.section,
      admissionDate: this.formatDateForDisplay(student.admissionDate),
      admissionNo: student.admissionNo,
      pen: student.pen,
      motherName: student.motherName,
      fatherName: student.fatherName,
      guardianName: student.guardianName,
      mobile: student.mobile,
      alternateMobile: student.alternateMobile,
      aadhaarNo: student.aadhaarNo,
      aadhaarName: student.aadhaarName,
      reasonNotAdded: student.reasonNotAdded,
      remarks: student.remarks || '',
      updatedAt: new Date().toISOString(),
      session: this.schoolSettings.academicYear
    };

    await this.saveToFirestoreS02(studentId, payload);
  },

  async saveToFirestoreS02(studentId, payload) {
    if (!this.db) {
      this.showToast('Database not connected.', 'error');
      return;
    }

    try {
      const docRef = this.db.collection('form_s02_udise').doc(`s02_${studentId}`);
      await docRef.set(payload, { merge: true });
      this.showToast(`Saved ${payload.name} in Firestore collection 'form_s02_udise'`, 'success');
    } catch (err) {
      console.error('Firestore Save Error:', err);
      this.showToast(`Error saving to Cloud: ${err.message}`, 'error');
    }
  },

  async batchSaveSelectedStudents() {
    if (this.selectedIds.size === 0) {
      this.showToast('Please select at least 1 student to save.', 'warning');
      return;
    }

    if (!this.db) {
      this.showToast('Database not connected.', 'error');
      return;
    }

    const batch = this.db.batch();
    let count = 0;

    this.selectedIds.forEach(id => {
      const student = this.mergedStudents.find(s => s.studentId === id);
      if (student) {
        const docRef = this.db.collection('form_s02_udise').doc(`s02_${student.studentId}`);
        const payload = {
          studentId: student.studentId,
          name: student.name,
          gender: student.gender,
          dob: this.formatDateForDisplay(student.dob),
          isCwsn: student.isCwsn,
          className: student.className,
          section: student.section,
          admissionDate: this.formatDateForDisplay(student.admissionDate),
          admissionNo: student.admissionNo,
          pen: student.pen,
          motherName: student.motherName,
          fatherName: student.fatherName,
          guardianName: student.guardianName,
          mobile: student.mobile,
          alternateMobile: student.alternateMobile,
          aadhaarNo: student.aadhaarNo,
          aadhaarName: student.aadhaarName,
          reasonNotAdded: student.reasonNotAdded,
          remarks: student.remarks || '',
          updatedAt: new Date().toISOString(),
          session: this.schoolSettings.academicYear
        };
        batch.set(docRef, payload, { merge: true });
        count++;
      }
    });

    try {
      await batch.commit();
      this.showToast(`Successfully batch-saved ${count} student records to Firestore 'form_s02_udise'!`, 'success');
    } catch (err) {
      console.error('Batch Save Error:', err);
      this.showToast(`Batch save failed: ${err.message}`, 'error');
    }
  },

  async deleteSelectedFromS02() {
    if (this.selectedIds.size === 0) {
      this.showToast('Select students to remove from Form S02 records.', 'warning');
      return;
    }

    if (!confirm(`Are you sure you want to remove ${this.selectedIds.size} student record(s) from Form S02 collection? (This won't delete the main student profile)`)) {
      return;
    }

    const batch = this.db.batch();
    this.selectedIds.forEach(id => {
      const docRef = this.db.collection('form_s02_udise').doc(`s02_${id}`);
      batch.delete(docRef);
    });

    try {
      await batch.commit();
      this.showToast('Records removed from Form S02 collection.', 'info');
      this.selectedIds.clear();
      this.updateStatsCounters();
    } catch (err) {
      console.error('Delete Error:', err);
      this.showToast(`Delete failed: ${err.message}`, 'error');
    }
  },

  // --------------------------------------------------------------------------
  // AUTO-FILL MISSING FIELDS HELPER
  // --------------------------------------------------------------------------
  autoFillMissingData() {
    let filledCount = 0;
    this.mergedStudents.forEach(std => {
      let changed = false;
      if (!std.motherName && std.fatherName) {
        std.motherName = `Mrs. ${std.fatherName.replace(/^(Mr\.|Shri|Late)\s*/i, '')}`;
        changed = true;
      }
      if (!std.aadhaarName && std.name) {
        std.aadhaarName = std.name;
        changed = true;
      }
      if (!std.reasonNotAdded) {
        std.reasonNotAdded = "Admitted from unrecognized / other school during session";
        changed = true;
      }
      if (changed) filledCount++;
    });

    this.renderStudioTable();
    this.renderPrintPages();
    this.showToast(`Auto-filled missing details for ${filledCount} student(s). Click 'Batch Save' to store in Cloud!`, 'success');
  },

  // --------------------------------------------------------------------------
  // SETTINGS & METADATA
  // --------------------------------------------------------------------------
  loadLocalSettings() {
    try {
      const saved = localStorage.getItem('s02_school_settings');
      if (saved) {
        this.schoolSettings = { ...this.schoolSettings, ...JSON.parse(saved) };
      }
    } catch (e) {}
  },

  saveSettings(newSettings) {
    this.schoolSettings = { ...this.schoolSettings, ...newSettings };
    localStorage.setItem('s02_school_settings', JSON.stringify(this.schoolSettings));
    this.updateSchoolInfoBanner();
    this.renderPrintPages();
    this.showToast('School & Header details updated successfully.', 'success');
  },

  updateSchoolInfoBanner() {
    const banner = document.getElementById('school-info-subtitle');
    if (banner) {
      banner.textContent = `${this.schoolSettings.schoolName} | UDISE: ${this.schoolSettings.udiseCode} | Session: ${this.schoolSettings.academicYear}`;
    }
  },

  openSettingsModal() {
    document.getElementById('set-school-name').value = this.schoolSettings.schoolName;
    document.getElementById('set-udise-code').value = this.schoolSettings.udiseCode;
    document.getElementById('set-session').value = this.schoolSettings.academicYear;
    document.getElementById('set-state').value = this.schoolSettings.state;
    document.getElementById('set-district').value = this.schoolSettings.district;
    document.getElementById('set-block').value = this.schoolSettings.block;
    document.getElementById('set-contact').value = this.schoolSettings.contactNumber;
    document.getElementById('set-head-name').value = this.schoolSettings.headName;
    document.getElementById('set-head-desig').value = this.schoolSettings.headDesignation;
    document.getElementById('set-officer-name').value = this.schoolSettings.officerName;
    document.getElementById('set-officer-desig').value = this.schoolSettings.officerDesignation;

    document.getElementById('settings-modal-overlay').classList.add('active');
  },

  closeSettingsModal() {
    document.getElementById('settings-modal-overlay').classList.remove('active');
  },

  handleSettingsSubmit(e) {
    e.preventDefault();
    this.saveSettings({
      schoolName: document.getElementById('set-school-name').value.trim(),
      udiseCode: document.getElementById('set-udise-code').value.trim(),
      academicYear: document.getElementById('set-session').value.trim(),
      state: document.getElementById('set-state').value.trim(),
      district: document.getElementById('set-district').value.trim(),
      block: document.getElementById('set-block').value.trim(),
      contactNumber: document.getElementById('set-contact').value.trim(),
      headName: document.getElementById('set-head-name').value.trim(),
      headDesignation: document.getElementById('set-head-desig').value.trim(),
      officerName: document.getElementById('set-officer-name').value.trim(),
      officerDesignation: document.getElementById('set-officer-desig').value.trim()
    });
    this.closeSettingsModal();
  },

  // --------------------------------------------------------------------------
  // TAB NAVIGATION & VIEW TOGGLE
  // --------------------------------------------------------------------------
  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    const studioEl = document.getElementById('studio-view-section');
    const printEl = document.getElementById('print-preview-container');

    if (tab === 'studio') {
      studioEl.style.display = 'block';
      printEl.classList.remove('active');
    } else {
      studioEl.style.display = 'none';
      printEl.classList.add('active');
      this.renderPrintPages();
    }
  },

  // --------------------------------------------------------------------------
  // OFFICIAL FORM S02 PRINT ENGINE (PIXEL-PERFECT REPLICA OF FORM_S02 (1).PDF)
  // --------------------------------------------------------------------------
  renderPrintPages() {
    const container = document.getElementById('print-preview-container');
    if (!container) return;

    // Which students to print? If some are selected, print selected; else print all filtered.
    let printList = [];
    if (this.selectedIds.size > 0) {
      printList = this.mergedStudents.filter(s => this.selectedIds.has(s.studentId));
    } else {
      printList = this.getFilteredStudents();
    }

    if (printList.length === 0) {
      container.innerHTML = `
        <div style="background:#fff; color:#333; padding:2rem; border-radius:8px; text-align:center;">
          <h3>No students selected for Form S02 printing</h3>
          <p>Please select students in the Studio or filter by Class.</p>
        </div>
      `;
      return;
    }

    // 5 students per A4 Landscape sheet to fully utilize the page
    const pageSize = 5;
    const pages = [];

    for (let i = 0; i < printList.length; i += pageSize) {
      const isLast = (i + pageSize) >= printList.length;
      pages.push({
        students: printList.slice(i, i + pageSize),
        isLastPage: isLast,
        startIndex: i
      });
    }

    container.innerHTML = pages.map((pageObj, pageIdx) => {
      const pageStudents = pageObj.students;
      const isLastPage = pageObj.isLastPage;
      const startSNo = pageObj.startIndex + 1;

      // Build rows for students on this page
      const rowsHtml = pageStudents.map((std, slotIdx) => {
        const sNo = startSNo + slotIdx;
        return `
          <tr>
            <td class="s02-col-sno">${sNo}</td>
            <td class="s02-col-basic">
              <div class="field-line"><span class="field-lbl">Name:</span> <span class="field-val">${std.name}</span></div>
              <div class="field-line"><span class="field-lbl">Gender:</span> <span class="field-val">${std.gender}</span></div>
              <div class="field-line"><span class="field-lbl">Date of Birth:</span> <span class="field-val">${this.formatDateForDisplay(std.dob)}</span></div>
              <div class="field-line"><span class="field-lbl">Is CWSN:</span> <span class="field-val">${std.isCwsn || 'No'}</span></div>
            </td>
            <td class="s02-col-adm">
              <div class="field-line"><span class="field-lbl">Class:</span> <span class="field-val">${std.className.replace('Class ', '')}</span></div>
              <div class="field-line"><span class="field-lbl">Section:</span> <span class="field-val">${std.section || 'A'}</span></div>
              <div class="field-line"><span class="field-lbl">Admission Date:</span> <br><span class="field-val">${this.formatDateForDisplay(std.admissionDate)}</span></div>
            </td>
            <td class="s02-col-parent">
              <div class="field-line"><span class="field-lbl">Mother’s Name:</span> <br><span class="field-val">${std.motherName || '---'}</span></div>
              <div class="field-line" style="margin-top:1px;"><span class="field-lbl">Father’s Name:</span> <br><span class="field-val">${std.fatherName || '---'}</span></div>
              <div class="field-line" style="margin-top:1px;"><span class="field-lbl">Guardian’s Name:</span> <br><span class="field-val">${std.guardianName || std.fatherName || '---'}</span></div>
            </td>
            <td class="s02-col-contact">
              <div class="field-line"><span class="field-lbl">Mobile number:</span> <br><span class="field-val">${std.mobile || '---'}</span></div>
              <div class="field-line" style="margin-top:4px;"><span class="field-lbl">Alternate number:</span> <br><span class="field-val">${std.alternateMobile || '---'}</span></div>
            </td>
            <td class="s02-col-aadhaar">
              <div class="field-line"><span class="field-lbl">AADHAAR number:</span> <br><span class="field-val">${std.aadhaarNo || '---'}</span></div>
              <div class="field-line" style="margin-top:4px;"><span class="field-lbl">Name as per AADHAAR:</span> <br><span class="field-val">${std.aadhaarName || std.name}</span></div>
            </td>
            <td class="s02-col-reason">
              <div class="field-val" style="font-weight:normal; font-size:7pt; line-height:1.15;">
                ${std.reasonNotAdded || 'Profile missed in previous UDISE+ SDMS session'}
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Footer logic: Official Authority Stamp & Signatures ONLY on Last Page
      const footerHtml = isLastPage ? `
        <!-- Footer Authority Signatures & Seals Block (ONLY on Last Page) -->
        <div>
          <div class="s02-footer-section">
            <!-- Head of School -->
            <div class="s02-authority-box">
              <div class="s02-authority-title">Head of the School Details</div>
              <div class="s02-auth-field" style="margin-top:8px;"><span class="s02-auth-field-lbl">Signature:</span> <span class="s02-auth-field-val"></span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Name:</span> <span class="s02-auth-field-val">${this.schoolSettings.headName}</span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Designation:</span> <span class="s02-auth-field-val">${this.schoolSettings.headDesignation}</span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Date:</span> <span class="s02-auth-field-val"></span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Seal:</span> <span class="s02-auth-field-val"></span></div>
            </div>

            <!-- Education Officer -->
            <div class="s02-authority-box">
              <div class="s02-authority-title">State/District/Block level Education Officer or Equivalent Details</div>
              <div class="s02-auth-field" style="margin-top:8px;"><span class="s02-auth-field-lbl">Signature:</span> <span class="s02-auth-field-val"></span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Name:</span> <span class="s02-auth-field-val">${this.schoolSettings.officerName}</span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Designation:</span> <span class="s02-auth-field-val">${this.schoolSettings.officerDesignation}</span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Date:</span> <span class="s02-auth-field-val"></span></div>
              <div class="s02-auth-field"><span class="s02-auth-field-lbl">Seal:</span> <span class="s02-auth-field-val"></span></div>
            </div>
          </div>

          <!-- Page Number & Official Version Tag -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
            <span style="font-size:7pt; color:#444;">Page ${pageIdx + 1} of ${pages.length}</span>
            <span class="s02-version-tag">v.02_08/10/2025</span>
          </div>
        </div>
      ` : `
        <!-- Standard Continued Footer for Intermediate Pages -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:2px;">
          <span style="font-size:7pt; color:#444;">Page ${pageIdx + 1} of ${pages.length} (Continued...)</span>
          <span class="s02-version-tag">v.02_08/10/2025</span>
        </div>
      `;

      return `
        <div class="s02-page">
          <!-- Top Header & Main Table Block -->
          <div class="s02-page-body">
            <div class="s02-header-title">FORM S02/UDISE</div>
            <div class="s02-header-sub1">Format to ADD Student (only for Class-2 to Class-12)</div>
            <div class="s02-header-sub2">Only for students whose profile was not created/missing in the UDISE+ SDMS</div>
            <div class="s02-header-sub3">(to be Submitted to Block/District Education Officer or Equivalent)</div>

            <!-- School Meta Submissions Table -->
            <table class="s02-meta-table">
              <tr>
                <td style="width:30%;">
                  <strong>Submitted By</strong> (Current/Present School)
                </td>
                <td style="width:18%;">
                  Academic Year: <span class="s02-meta-underline">${this.schoolSettings.academicYear}</span>
                </td>
                <td style="width:19%;">
                  UDISE State: <span class="s02-meta-underline">${this.schoolSettings.state}</span>
                </td>
                <td style="width:17%;">
                  District: <span class="s02-meta-underline">${this.schoolSettings.district}</span>
                </td>
                <td style="width:16%;">
                  Block: <span class="s02-meta-underline">${this.schoolSettings.block}</span>
                </td>
              </tr>
              <tr>
                <td style="width:30%;">
                  UDISE Code: <span class="s02-meta-underline">${this.schoolSettings.udiseCode}</span>
                </td>
                <td colspan="3">
                  School Name: <span class="s02-meta-underline" style="min-width:70%;">${this.schoolSettings.schoolName}</span>
                </td>
                <td>
                  School Contact: <span class="s02-meta-underline">${this.schoolSettings.contactNumber}</span>
                </td>
              </tr>
            </table>

            <!-- Main Data Table -->
            <table class="s02-data-table">
              <thead>
                <tr>
                  <th class="s02-col-sno">S.No</th>
                  <th class="s02-col-basic">Basic Details</th>
                  <th class="s02-col-adm">Admission Details</th>
                  <th class="s02-col-parent">Parents/Guardian details</th>
                  <th class="s02-col-contact">Contact details</th>
                  <th class="s02-col-aadhaar">Student’s AADHAAR Details</th>
                  <th class="s02-col-reason">Why was this student not added in the Previous Academic Year?</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>

          ${footerHtml}
        </div>
      `;
    }).join('');
  },

  // --------------------------------------------------------------------------
  // EXCEL / XLSX EXPORT
  // --------------------------------------------------------------------------
  exportToExcel() {
    if (typeof XLSX === 'undefined') {
      this.showToast('SheetJS (XLSX) library not loaded.', 'error');
      return;
    }

    const list = this.selectedIds.size > 0
      ? this.mergedStudents.filter(s => this.selectedIds.has(s.studentId))
      : this.getFilteredStudents();

    if (list.length === 0) {
      this.showToast('No students to export.', 'warning');
      return;
    }

    const rows = list.map((s, idx) => ({
      'S.No': idx + 1,
      'Student Name': s.name,
      'Gender': s.gender,
      'Date of Birth': this.formatDateForDisplay(s.dob),
      'Is CWSN': s.isCwsn,
      'Class': s.className,
      'Section': s.section,
      'Admission Date': this.formatDateForDisplay(s.admissionDate),
      'Admission No': s.admissionNo,
      'PEN Number': s.pen,
      'Mother Name': s.motherName,
      'Father Name': s.fatherName,
      'Guardian Name': s.guardianName,
      'Mobile Number': s.mobile,
      'Alternate Number': s.alternateMobile,
      'AADHAAR Number': s.aadhaarNo,
      'Name as per AADHAAR': s.aadhaarName,
      'Reason Not Added in Prev Year': s.reasonNotAdded,
      'UDISE Code': this.schoolSettings.udiseCode,
      'School Name': this.schoolSettings.schoolName,
      'Academic Year': this.schoolSettings.academicYear
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Form_S02_UDISE");

    XLSX.writeFile(wb, `Form_S02_UDISE_${this.schoolSettings.academicYear}.xlsx`);
    this.showToast(`Exported ${list.length} student records to Excel!`, 'success');
  },

  // --------------------------------------------------------------------------
  // PRINT ALL STUDENTS (1 TO N AS 1 CONTINUOUS PDF)
  // --------------------------------------------------------------------------
  printAllStudents() {
    this.selectedIds.clear();
    this.activeFilterClass = 'ALL';
    this.activeFilterStatus = 'ALL';
    this.activeSearchQuery = '';
    const classSel = document.getElementById('filter-class');
    if (classSel) classSel.value = 'ALL';
    const statSel = document.getElementById('filter-status');
    if (statSel) statSel.value = 'ALL';
    const sInput = document.getElementById('search-input');
    if (sInput) sInput.value = '';

    this.renderStudioTable();
    this.renderPrintPages();
    const totalCount = this.mergedStudents.length;
    const totalPages = document.querySelectorAll('#print-preview-container .s02-page').length || Math.ceil(totalCount / 5);

    this.showToast(`Opening Print dialog for All ${totalCount} students (${totalPages} Pages, 1 single PDF)...`, 'info');

    setTimeout(() => {
      window.print();
    }, 300);
  },

  // --------------------------------------------------------------------------
  // DIRECT DOWNLOAD 1 COMBINED MULTI-PAGE PDF (PAGE-BY-PAGE HIGH-RES ENGINE)
  // --------------------------------------------------------------------------
  async downloadCombinedPdf() {
    this.renderPrintPages();
    const container = document.getElementById('print-preview-container');
    if (!container) return;

    const pageElements = container.querySelectorAll('.s02-page');
    if (!pageElements.length) {
      this.showToast('No student pages found to generate PDF.', 'warning');
      return;
    }

    const totalStudents = this.selectedIds.size > 0 ? this.selectedIds.size : this.getFilteredStudents().length;
    const totalPages = pageElements.length;

    // Check availability of jsPDF and html2canvas
    const jsPdfConstructor = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    const h2c = window.html2canvas;

    if (!jsPdfConstructor || !h2c) {
      this.showToast(`Opening Print dialog: Select 'Save as PDF' for all ${totalStudents} students.`, 'info');
      window.print();
      return;
    }

    this.showToast(`Generating combined PDF (Total ${totalPages} pages for ${totalStudents} students)...`, 'info');

    const isHidden = !container.classList.contains('active');
    const origCss = container.style.cssText;

    try {
      // Temporarily layout container in view hierarchy if hidden so html2canvas measures dimensions accurately
      if (isHidden) {
        container.style.cssText = 'display: flex !important; position: fixed !important; left: 0 !important; top: 0 !important; z-index: -9999 !important; opacity: 1 !important; pointer-events: none !important;';
      }

      // Allow a brief animation tick for layout computation
      await new Promise(resolve => setTimeout(resolve, 80));

      const pdf = new jsPdfConstructor({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      for (let i = 0; i < pageElements.length; i++) {
        const pageEl = pageElements[i];

        const canvas = await h2c(pageEl, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 1400
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) {
          pdf.addPage('a4', 'landscape');
        }

        // Standard A4 Landscape dimensions: 297mm x 210mm
        pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      }

      const sanitizedSession = (this.schoolSettings.academicYear || '2025-2026').replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `Form_S02_UDISE_All_Students_1_to_${totalStudents}_${sanitizedSession}.pdf`;
      pdf.save(fileName);

      this.showToast(`✅ Downloaded Combined Multi-Page PDF (${totalPages} pages, ${totalStudents} students)!`, 'success');
    } catch (err) {
      console.error('PDF Generation Error:', err);
      this.showToast('Direct PDF export encountered an error. Opening print dialog...', 'warning');
      window.print();
    } finally {
      if (isHidden) {
        container.style.cssText = origCss;
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOAST NOTIFICATIONS
  // --------------------------------------------------------------------------
  showToast(message, type = 'info') {
    const box = document.getElementById('toast-box');
    if (!box) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    box.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// Global Exposure & Bootstrapping
window.FormS02App = FormS02App;
document.addEventListener('DOMContentLoaded', () => {
  FormS02App.init();
});
