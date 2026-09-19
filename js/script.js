import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
    import { initializeFirestore, getFirestore, collection, doc, getDocs, setDoc, deleteDoc, writeBatch } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
    import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

    // ===== FIREBASE CONFIG =====
    const firebaseConfig = {
      apiKey: "AIzaSyDsVKuptdW4jRWQ5rLX_h_fn53xuFoYVMI",
      authDomain: "abcreport-27dea.firebaseapp.com",
      projectId: "abcreport-27dea",
      storageBucket: "abcreport-27dea.firebasestorage.app",
      messagingSenderId: "1422972209",
      appId: "1:1422972209:web:82fbc39400d75566d8cc10"
    };

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
    const auth = getAuth(app);

    // ===== CONSTANTS =====
    const FEE_CHART = { 'KG-I': 600, 'KG-II': 600, 'LKG': 600, 'UKG': 600, 'KG-1': 600, 'KG-2': 600, '1st': 700, '2nd': 700, '3rd': 800, '4th': 800, '5th': 800, '6th': 1000, '7th': 1000, '8th': 1000 };
    const DAIRY = 120, BUS_FEE = 300;
    const SCHOOL_MONTHS = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
    const ALL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // ===== AUTO CORRECT CLASS NAMES =====
    function normalizeClassName(cls) {
      if (!cls || typeof cls !== 'string') return cls || '';
      const trimmed = cls.trim();
      if (/^(l\.?k\.?g\.?|kg-?1|kg-?i)$/i.test(trimmed)) return 'KG-I';
      if (/^(u\.?k\.?g\.?|kg-?2|kg-?ii)$/i.test(trimmed)) return 'KG-II';
      return trimmed.replace(/\bLKG\b/gi, 'KG-I').replace(/\bUKG\b/gi, 'KG-II');
    }

    // ===== IN-MEMORY STATE =====
    let _students = [];
    let _fees = [];
    let _trashStudents = [];
    let _gatepasses = [];

    // ===== AUTH / LOGIN =====
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const em = document.getElementById('loginEmail').value;
      const pwd = document.getElementById('loginPwd').value;
      const btn = document.getElementById('loginBtn');
      const err = document.getElementById('loginErr');
      btn.textContent = 'Authenticating...';
      btn.disabled = true;
      err.style.display = 'none';
      try {
        await signInWithEmailAndPassword(auth, em, pwd);
      } catch (error) {
        if (error.code === 'auth/network-request-failed') { err.textContent = 'Network error. Check your connection.'; }
        else { err.textContent = 'Invalid credentials. Please try again.'; }
        err.style.display = 'block';
        btn.textContent = 'Login securely';
        btn.disabled = false;
      }
    });

    function logout() {
      signOut(auth).then(() => window.location.reload()).catch(err => toast('Logout failed: ' + err.message, 'error'));
    }

    onAuthStateChanged(auth, user => {
      if (user) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appWrapper').style.display = 'block';
        setFbStatus(true);
        loadData();
      } else {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('appWrapper').style.display = 'none';
        showLoader(false);
      }
    });

    // ===== FIRESTORE HELPERS =====
    function showSaving(v) { const el = document.getElementById('saveIndicator'); el.classList.toggle('show', v) }

    async function fsAddStudent(s) {
      showSaving(true);
      try { await setDoc(doc(db, 'students', s.id), sanitize(s)); }
      finally { showSaving(false); }
    }
    async function fsDeleteStudent(id) {
      showSaving(true);
      try {
        await deleteDoc(doc(db, 'students', id));
        const feesToDel = _fees.filter(f => f.studentId === id);
        if (feesToDel.length) {
          const batch = writeBatch(db);
          feesToDel.forEach(f => batch.delete(doc(db, 'fees', f.id)));
          await batch.commit();
        }
      } finally { showSaving(false); }
    }
    async function fsAddFee(f) {
      showSaving(true);
      try { await setDoc(doc(db, 'fees', f.id), sanitize(f)); }
      finally { showSaving(false); }
    }
    async function fsDeleteFee(id) {
      showSaving(true);
      try { await deleteDoc(doc(db, 'fees', id)); }
      finally { showSaving(false); }
    }
    async function fsAddGatePass(gp) {
      showSaving(true);
      try { await setDoc(doc(db, 'gatepasses', gp.id), sanitize(gp)); }
      finally { showSaving(false); }
    }
    async function fsDeleteGatePass(id) {
      showSaving(true);
      try { await deleteDoc(doc(db, 'gatepasses', id)); }
      finally { showSaving(false); }
    }
    function sanitize(obj) {
      const clean = {};
      for (const [k, v] of Object.entries(obj)) {
        if (v !== undefined) {
          if (k === 'cls' || k === 'class') {
            clean[k] = normalizeClassName(v);
          } else {
            clean[k] = (v === null ? null : v);
          }
        }
      }
      return clean;
    }

    // ===== CACHE ACCESSORS =====
    function gs() { return [..._students] }
    function gf() { return [..._fees] }

    // ===== UTILS =====
    function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7) }
    function nextSn() {
      const serials = _students.map(x => (typeof x.serial === 'number' && !isNaN(x.serial) && x.serial > 0 ? x.serial : 0));
      return serials.length ? Math.max(0, ...serials) + 1 : 1;
    }
    function calcFee(st) {
      const base = FEE_CHART[st.cls] || 0;
      const bus = st.bus ? BUS_FEE : 0;
      const disc = Math.max(parseInt(st.siblingDisc) || 0, parseInt(st.pacDisc) || 0);
      const discAmt = Math.round(base * disc / 100);
      return { base, dairy: DAIRY, bus, disc, discAmt, net: base - discAmt + bus };
    }

    // ===== TOAST =====
    function toast(msg, type) {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'show' + (type ? ' ' + type : '');
      clearTimeout(t._t); t._t = setTimeout(() => t.className = '', 3200);
    }

    // ===== LOADER =====
    function showLoader(v, msg) {
      const el = document.getElementById('appLoader');
      el.style.display = v ? 'flex' : 'none';
      if (msg) document.querySelector('#appLoader .lm').textContent = msg;
    }
    function setFbStatus(connected) {
      document.getElementById('fbDot').className = 'fb-dot' + (connected ? ' connected' : '');
      document.getElementById('fbStatus').textContent = connected ? 'Firebase Connected' : 'Offline';
    }

    // ===== NAV =====
    function showPanel(id) {
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
      document.getElementById('panel-' + id).classList.add('active');
      document.getElementById('tab-' + id).classList.add('active');
      if (id === 'dashboard') renderDash();
      if (id === 'students') renderStudents();
      if (id === 'fee-collect') { fcReset(); renderFcStudents(''); }
      if (id === 'fee-history') renderFeeHistory();
      if (id === 'print') renderPrint();
      if (id === 'fee-chart') renderFeeChart();
      if (id === 'gate-pass') renderGatePasses();
      if (id === 'trash') renderTrash();
    }

    // ===== DASHBOARD =====
    function renderDash() {
      const students = gs(), fees = gf();
      const recentItems = [];
      fees.forEach(f => {
        if (f.ts && f.receipt) recentItems.push({ ts: f.ts, receipt: f.receipt, type: 'Tuition', studentId: f.studentId || f.pen || f.pen, month: f.month, year: f.year, amount: f.amount || 0 });
        if (f.busPaid && f.busPaidTs) recentItems.push({ ts: f.busPaidTs, receipt: f.busReceipt, type: 'Bus Fee', studentId: f.studentId, month: f.month, year: f.year, amount: f.busAmount || 0 });
        if (f.otherPaid && f.otherPaidTs) recentItems.push({ ts: f.otherPaidTs, receipt: f.otherReceipt, type: 'Other', studentId: f.studentId, month: f.month, year: f.year, amount: f.otherAmount || 0 });
        if (f.admPaid && f.admPaidTs) recentItems.push({ ts: f.admPaidTs, receipt: f.admReceipt, type: 'Admission', studentId: f.studentId, month: f.month, year: f.year, amount: f.admAmount || 0 });
      });
      recentItems.sort((a, b) => (b.ts || 0) - (a.ts || 0));
      const totTuition = fees.reduce((s, f) => s + (f.amount || 0), 0);
      const totBus = fees.filter(f => f.busPaid).reduce((s, f) => s + (f.busAmount || 0), 0);
      const totOther = fees.filter(f => f.otherPaid).reduce((s, f) => s + (f.otherAmount || 0), 0);
      const totAdm = fees.filter(f => f.admPaid).reduce((s, f) => s + (f.admAmount || 0), 0);
      const now = new Date();
      const cm = ALL_MONTHS[now.getMonth()], cy = now.getFullYear();
      const mf = fees.filter(f => f.month === cm && String(f.year) === String(cy));
      const mAmt = mf.reduce((s, f) => s + (f.amount || 0) + (f.busPaid ? f.busAmount || 0 : 0) + (f.otherPaid ? f.otherAmount || 0 : 0) + (f.admPaid ? f.admAmount || 0 : 0), 0);
      document.getElementById('dashStats').innerHTML =
        '<div class="stat-card"><div class="sv">' + students.length + '</div><div class="sk">Students</div></div>' +
        '<div class="stat-card green"><div class="sv">Rs.' + (totTuition + totBus + totOther + totAdm).toLocaleString('en-IN') + '</div><div class="sk">Total Collected</div></div>' +
        '<div class="stat-card gold"><div class="sv">Rs.' + mAmt.toLocaleString('en-IN') + '</div><div class="sk">' + cm + ' ' + cy + '</div></div>' +
        '<div class="stat-card teal"><div class="sv">' + students.filter(s => s.bus).length + '</div><div class="sk">Bus Students</div></div>' +
        '<div class="stat-card purple"><div class="sv">' + fees.length + '</div><div class="sk">Fee Entries</div></div>';
      document.getElementById('recentFeeBody').innerHTML = recentItems.slice(0, 10).map(r => {
        const s = students.find(x => String(x.id) === String(r.studentId) || String(x.pen) === String(r.studentId));
        const ib = r.type === 'Bus Fee';
        const io = r.type === 'Other';
        const ia = r.type === 'Admission';
        let badgeColor = '';
        if (ib) badgeColor = 'background:#dbeafe;color:#1e40af';
        else if (io) badgeColor = 'background:#ffedd5;color:#c2410c';
        else if (ia) badgeColor = 'background:#f3e8ff;color:#6b21a8';
        else badgeColor = 'background:#d1fae5;color:#065f46';

        return '<tr>' +
          '<td style="white-space:nowrap;font-size:.76rem">' + (r.ts ? new Date(r.ts).toLocaleString('en-IN') : '-') + '</td>' +
          '<td><b>' + (r.receipt || '-') + '</b></td>' +
          '<td><span style="' + badgeColor + ';padding:2px 7px;border-radius:20px;font-size:.7rem;font-weight:700">' + r.type + '</span></td>' +
          '<td>' + (s ? '<b>' + s.name + '</b>' : '?') + '</td>' +
          '<td style="font-family:monospace;font-size:.74rem">' + (s ? s.pen : '') + '</td>' +
          '<td>' + (s ? '<span class="badge-cls">' + s.cls + '</span>' : '') + '</td>' +
          '<td>' + r.month + '</td><td>' + r.year + '</td>' +
          '<td style="font-weight:700;color:' + (ib ? 'var(--teal)' : (io ? '#c2410c' : (ia ? '#6b21a8' : 'var(--green)'))) + '">Rs.' + r.amount + '</td>' +
          '</tr>';
      }).join('') || '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:22px">No fee entries yet.</td></tr>';
      const nb = students.filter(s => !s.bus);
      document.getElementById('busSummary').innerHTML =
        '<b style="color:var(--teal)">Availing Bus: </b>' + students.filter(s => s.bus).length + ' &nbsp;|&nbsp; <b>Not Availing: </b>' + nb.length +
        (students.filter(s => s.bus).length ? '<br/><b>Bus Students: </b>' + students.filter(s => s.bus).map(s => s.name + ' (' + s.cls + ')').join(', ') : '');
    }

    // ===== FEE HISTORY =====
    function renderFeeHistory() {
      const students = gs(), fees = gf();
      const items = [];
      fees.forEach(f => {
        if (f.ts && f.receipt) items.push({ ts: f.ts, receipt: f.receipt, type: 'Tuition', studentId: f.studentId || f.pen, month: f.month, year: f.year, amount: f.amount || 0 });
        if (f.busPaid && f.busPaidTs) items.push({ ts: f.busPaidTs, receipt: f.busReceipt, type: 'Bus Fee', studentId: f.studentId || f.pen, month: f.month, year: f.year, amount: f.busAmount || 0 });
        if (f.otherPaid && f.otherPaidTs) items.push({ ts: f.otherPaidTs, receipt: f.otherReceipt, type: 'Other', studentId: f.studentId || f.pen, month: f.month, year: f.year, amount: f.otherAmount || 0 });
        if (f.admPaid && f.admPaidTs) items.push({ ts: f.admPaidTs, receipt: f.admReceipt, type: 'Admission', studentId: f.studentId || f.pen, month: f.month, year: f.year, amount: f.admAmount || 0 });
      });
      items.sort((a, b) => (b.ts || 0) - (a.ts || 0));

      const q = (document.getElementById('fhSearch')?.value || '').toLowerCase();
      const typeFilter = document.getElementById('fhType')?.value || '';
      const monthFilter = document.getElementById('fhMonth')?.value || '';

      const filtered = items.filter(r => {
        const s = students.find(x => String(x.id) === String(r.studentId) || String(x.pen) === String(r.studentId));
        const sName = s ? s.name.toLowerCase() : '';
        const sPen = s ? (s.pen || '').toLowerCase() : '';
        const rcpt = (r.receipt || '').toLowerCase();

        const mq = !q || sName.includes(q) || sPen.includes(q) || rcpt.includes(q);
        const mt = !typeFilter || r.type === typeFilter;
        const mm = !monthFilter || r.month === monthFilter;
        return mq && mt && mm;
      });

      document.getElementById('feeHistoryBody').innerHTML = filtered.map(r => {
        const s = students.find(x => String(x.id) === String(r.studentId) || String(x.pen) === String(r.studentId));
        const ib = r.type === 'Bus Fee';
        const io = r.type === 'Other';
        const ia = r.type === 'Admission';
        let badgeColor = '';
        if (ib) badgeColor = 'background:#dbeafe;color:#1e40af';
        else if (io) badgeColor = 'background:#ffedd5;color:#c2410c';
        else if (ia) badgeColor = 'background:#f3e8ff;color:#6b21a8';
        else badgeColor = 'background:#d1fae5;color:#065f46';

        return '<tr>' +
          '<td style="white-space:nowrap;font-size:.76rem">' + (r.ts ? new Date(r.ts).toLocaleString('en-IN') : '-') + '</td>' +
          '<td><b>' + (r.receipt || '-') + '</b></td>' +
          '<td><span style="' + badgeColor + ';padding:2px 7px;border-radius:20px;font-size:.7rem;font-weight:700">' + r.type + '</span></td>' +
          '<td>' + (s ? '<b>' + s.name + '</b>' : '?') + '</td>' +
          '<td style="font-family:monospace;font-size:.74rem">' + (s ? s.pen : '') + '</td>' +
          '<td>' + (s ? '<span class="badge-cls">' + s.cls + '</span>' : '') + '</td>' +
          '<td>' + r.month + '</td><td>' + r.year + '</td>' +
          '<td style="font-weight:700;color:' + (ib ? 'var(--teal)' : (io ? '#c2410c' : (ia ? '#6b21a8' : 'var(--green)'))) + '">Rs.' + r.amount + '</td>' +
          '</tr>';
      }).join('') || '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:22px">No fee history found.</td></tr>';
    }

    // ===== SIBLING VERIFICATION =====
    function checkSiblingDisc(val) {
      if (val === '10' || val === '20') {
        const father = document.getElementById('fFather').value.trim();
        document.getElementById('siblingSearchInput').value = father;
        openModal('siblingModal');
        renderSiblingList();
      }
    }

    function renderSiblingList() {
      const q = (document.getElementById('siblingSearchInput').value || '').toLowerCase();
      const students = gs();
      const filtered = students.filter(s => {
        if (!q) return false;
        return (s.father || '').toLowerCase().includes(q);
      });
      document.getElementById('siblingListBody').innerHTML = filtered.map(s => '<tr>' +
        '<td style="font-family:monospace;font-size:.76rem">' + (s.pen || '-') + '</td>' +
        '<td><b>' + s.name + '</b></td>' +
        '<td><span class="badge-cls">' + (s.cls || '-') + '</span></td>' +
        '<td>' + (s.father || '-') + '</td>' +
        '</tr>').join('') || '<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:22px">No siblings found with this Father\'s Name.</td></tr>';
    }

    // ===== STUDENTS LIST =====
    function getSiblingDisplay(s) {
      let sib = null;
      if (s.siblingId) {
        sib = _students.find(x => x.id === s.siblingId);
      } else if (s.father) {
        sib = _students.find(x => x.id !== s.id && x.father && x.father.toLowerCase() === s.father.toLowerCase());
      }
      return sib ? sib.name + ' (' + sib.cls + ')' : '-';
    }
    function renderStudents() {
      const students = gs();
      const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
      const cls = document.getElementById('filterClass')?.value || '';
      const bus = document.getElementById('filterBus')?.value || '';
      const normFilterCls = normalizeClassName(cls);
      const filtered = students.filter(s => {
        const normSCls = normalizeClassName(s.cls || '');
        const mq = !q || s.name.toLowerCase().includes(q) || (s.pen || '').toLowerCase().includes(q) || normSCls.toLowerCase().includes(q) || (s.cls || '').toLowerCase().includes(q) || (s.father || '').toLowerCase().includes(q);
        return mq && (!cls || normSCls === normFilterCls || s.cls === cls) && (!bus || (bus === 'yes' ? s.bus : !s.bus));
      }).sort((a, b) => (Number(a.serial) || 0) - (Number(b.serial) || 0));
      document.getElementById('studentsBody').innerHTML = filtered.map((s, idx) => {
        const f = calcFee(s);
        const srVal = typeof s.serial === 'number' && s.serial > 0 ? s.serial : (idx + 1);
        return '<tr>' +
          '<td style="text-align:center"><input type="number" value="' + srVal + '" min="1" max="' + students.length + '" style="width:48px;text-align:center;font-weight:bold;padding:3px;border:1px solid #cbd5e1;border-radius:6px;outline:none;" onkeydown="if(event.key===\'Enter\'){this.blur();}" onchange="changeStudentSr(\'' + s.id + '\', this.value)" title="Sr. No. edit करें और Enter दबाएं" /></td>' +
          '<td>' +
          '<div style="font-size:1.1em;font-weight:700;color:#000;margin-bottom:4px;">' + s.name + '</div>' +
          '<div style="font-family:monospace;font-size:0.85rem;color:#555;">PEN: ' + (s.pen || '-') + ' | DOB: ' + (s.dob ? new Date(s.dob).toLocaleDateString('en-IN') : '-') + '</div>' +
          '</td>' +
          '<td>' +
          '<div style="font-size:1.1em;font-weight:700;color:#000;margin-bottom:4px;">' + (s.father || '-') + '</div>' +
          '<div style="font-size:0.85rem;color:#555;">Mob: ' + (s.mobile || '-') + ' | Sib: ' + getSiblingDisplay(s) + '</div>' +
          '</td>' +
          '<td>' +
          '<div style="margin-bottom:6px;"><span class="badge-cls">' + (s.cls || '-') + '</span></div>' +
          '<div>' + (s.bus ? '<span class="badge-bus yes">Bus: Yes</span>' : ((s.isSelfTransport || s.vehicle === 'self') ? '<span class="badge-bus" style="background:#ffe4e6;color:#be123c;border:1px solid #fecdd3;">🚶 पैदल/निजी (बटालियन बाहर)</span>' : '<span class="badge-bus no">Bus: No</span>')) + '</div>' +
          '</td>' +
          '<td>' +
          '<div style="font-weight:700;color:var(--green);margin-bottom:6px;">Monthly Fee: Rs.' + f.net + '</div>' +
          '<div style="display:flex;gap:4px;">' +
          '<input type="number" value="' + (s.totalAdv || '') + '" onchange="saveField(\'' + s.id + '\', \'totalAdv\', this.value ? Number(this.value) : null)" style="width:75px;padding:4px;font-size:0.9rem;font-weight:bold;color:#0f5132;background-color:#d1e7dd;border:2px solid #198754;border-radius:6px;outline:none;" placeholder="Adv." />' +
          '<input type="number" value="' + (s.dueShort || '') + '" onchange="saveField(\'' + s.id + '\', \'dueShort\', this.value ? Number(this.value) : null)" style="width:75px;padding:4px;font-size:0.9rem;font-weight:bold;color:#842029;background-color:#f8d7da;border:2px solid #dc3545;border-radius:6px;outline:none;" placeholder="Due" />' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div style="margin-bottom:6px;display:flex;align-items:center;gap:6px;font-size:0.9rem;font-weight:600;color:#444;">' +
          '<input type="checkbox" ' + (s.feeCard ? 'checked' : '') + ' onchange="saveField(\'' + s.id + '\', \'feeCard\', this.checked)" style="width:16px;height:16px;cursor:pointer;" /> <label style="cursor:pointer" onclick="this.previousElementSibling.click()">Fee Card Submitted</label>' +
          '</div>' +
          '<div style="display:flex;gap:4px;align-items:center;">' +
          '<input type="text" id="rem_' + s.id + '" value="' + (s.remark || '').replace(/"/g, '&quot;') + '" onchange="saveField(\'' + s.id + '\', \'remark\', this.value)" style="width:120px;padding:4px;font-size:0.9rem;font-weight:bold;color:#856404;background-color:#fff3cd;border:2px solid #ffc107;border-radius:6px;outline:none;" placeholder="Remark..." />' +
          '<button class="btn btn-sm btn-outline" style="padding:4px 8px;font-size:0.75rem;line-height:1" onclick="saveField(\'' + s.id + '\', \'remark\', document.getElementById(\'rem_' + s.id + '\').value)">Save</button>' +
          '</div>' +
          '</td>' +
          '<td class="no-print"><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">' +
          '<button class="btn btn-sm btn-outline" style="width:65px;" onclick="viewStudent(\'' + s.id + '\')">View</button>' +
          '<button class="btn btn-sm btn-gold" style="width:65px;" onclick="openFeeFor(\'' + s.id + '\')">Fee</button>' +
          '<button class="btn btn-sm btn-primary" style="width:65px;" onclick="editStudent(\'' + s.id + '\')">Edit</button>' +
          '<button class="btn btn-sm btn-danger" style="width:65px;" onclick="delStudent(\'' + s.id + '\')">Del</button>' +
          '<button class="btn btn-sm btn-success" style="grid-column:1/-1;" onclick="openGatePassModal(\'' + s.id + '\')">Gate Pass</button>' +
          '</div></td></tr>';
      }).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:22px">No students found.</td></tr>';
    }

    async function changeStudentSr(id, newSrStr) {
      const newSr = parseInt(newSrStr, 10);
      if (isNaN(newSr) || newSr < 1) { renderStudents(); return; }
      const sIdx = _students.findIndex(s => s.id === id);
      if (sIdx === -1) return;
      if (_students[sIdx].serial === newSr) return;

      const targetIdx = Math.max(0, Math.min(_students.length - 1, newSr - 1));
      const [moved] = _students.splice(sIdx, 1);
      _students.splice(targetIdx, 0, moved);

      _students.forEach((s, idx) => { s.serial = idx + 1; });
      renderStudents();

      try {
        const batch = writeBatch(db);
        _students.forEach((s) => {
          batch.set(doc(db, 'students', s.id), { serial: s.serial }, { merge: true });
        });
        await batch.commit();
        toast('Student Sr. No. updated!');
      } catch (err) {
        console.error('Error updating serial:', err);
        toast('Error updating Sr. No.: ' + err.message, 'error');
      }
    }

    async function saveField(id, field, val) {
      const idx = _students.findIndex(s => s.id === id);
      if (idx >= 0) {
        _students[idx][field] = val;
        try {
          await setDoc(doc(db, 'students', id), { [field]: val }, { merge: true });
        } catch (e) {
          toast('Error saving ' + field + ': ' + e.message, 'error');
        }
      }
    }

    // ===== STUDENT FORM =====
    document.getElementById('studentForm').addEventListener('submit', async function (e) {
      e.preventDefault();
      let ok = true;
      const pen = document.getElementById('fPen').value.trim();
      const name = document.getElementById('fName').value.trim();
      if (!pen) { showErr('fPen'); ok = false; }
      if (!name) { showErr('fName'); ok = false; }
      if (!ok) return;
      const editId = document.getElementById('editId').value;
      if (!editId && _students.find(s => s.pen === pen)) { toast('PEN Number already exists!', 'error'); return; }
      const ex = editId ? _students.find(s => s.id === editId) : null;
      const rec = {
        id: editId || uid(), serial: ex ? ex.serial : nextSn(), pen, name,
        dob: document.getElementById('fDob').value, cls: document.getElementById('fClass').value,
        father: document.getElementById('fFather').value.trim(), mother: document.getElementById('fMother').value.trim(),
        address: document.getElementById('fAddress').value.trim(), mobile: document.getElementById('fMobile').value.trim(),
        aadhar: document.getElementById('fAadhar').value.trim(), birthCert: document.getElementById('fBirthCert').value.trim(),
        fatherAadhar: document.getElementById('fFatherAadhar').value.trim(), motherAadhar: document.getElementById('fMotherAadhar').value.trim(),
        siblingId: document.getElementById('fSibling').value || null,
        bus: document.getElementById('fBus').checked,
        isSelfTransport: document.getElementById('fSelfTransport') ? document.getElementById('fSelfTransport').checked : false,
        vehicle: (document.getElementById('fSelfTransport') && document.getElementById('fSelfTransport').checked) ? 'self' : (document.getElementById('fBus').checked ? 'v1' : 'none'),
        siblingDisc: document.getElementById('fSiblingDisc').value, pacDisc: document.getElementById('fPacDisc').value,
        admYear: document.getElementById('fAdmYear').value,
        createdAt: ex ? ex.createdAt : Date.now(), updatedAt: Date.now()
      };
      const btn = document.getElementById('submitBtn');
      btn.disabled = true; btn.textContent = 'Saving...';
      try {
        if (editId) { const i = _students.findIndex(s => s.id === editId); if (i >= 0) _students[i] = rec; }
        else _students.push(rec);
        await fsAddStudent(rec);
        toast(editId ? 'Student updated!' : 'Student added!');
        resetForm(); showPanel('students');
      } catch (err) {
        toast('Error: ' + err.message, 'error');
      } finally {
        btn.disabled = false; btn.textContent = 'ðŸ’¾ Save Student';
      }
    });

    function showErr(id) { document.getElementById(id).classList.add('error'); document.getElementById('err-' + id).classList.add('show') }
    function clearErr(id) { document.getElementById(id).classList.remove('error'); document.getElementById('err-' + id).classList.remove('show') }
    function populateSiblingDropdown(editId) {
      const sel = document.getElementById('fSibling');
      sel.innerHTML = '<option value="">None / Auto (By Father\'s Name)</option>';
      const others = _students.filter(s => s.id !== editId).sort((a, b) => a.name.localeCompare(b.name));
      others.forEach(s => {
        sel.innerHTML += '<option value="' + s.id + '">' + s.name + ' (' + s.cls + ')</option>';
      });
    }

    function resetForm() {
      document.getElementById('studentForm').reset();
      document.getElementById('editId').value = '';
      document.getElementById('formTitle').textContent = 'Add New Student';
      document.getElementById('feePreviewBox').style.display = 'none';
      document.getElementById('busLabel').textContent = 'Not Availing';
      if (document.getElementById('fSelfTransport')) document.getElementById('fSelfTransport').checked = false;
      populateSiblingDropdown('');
    }
    function fmtAadhar(el) {
      let v = el.value.replace(/\D/g, '');
      if (v.length > 4) v = v.slice(0, 4) + ' ' + v.slice(4);
      if (v.length > 9) v = v.slice(0, 9) + ' ' + v.slice(9);
      el.value = v.slice(0, 14);
    }
    function selfTransportToggle() {
      const el = document.getElementById('fSelfTransport');
      if (el && el.checked) {
        document.getElementById('fBus').checked = false;
        document.getElementById('busLabel').textContent = 'Not Availing';
        updateFeePreview();
      }
    }
    function busToggle() {
      const isBus = document.getElementById('fBus').checked;
      document.getElementById('busLabel').textContent = isBus ? 'Availing Bus Service' : 'Not Availing';
      if (isBus && document.getElementById('fSelfTransport')) {
        document.getElementById('fSelfTransport').checked = false;
      }
      updateFeePreview();
    }
    function updateFeePreview() {
      const cls = document.getElementById('fClass').value;
      if (!cls) { document.getElementById('feePreviewBox').style.display = 'none'; return; }
      const tmp = { cls, bus: document.getElementById('fBus').checked, siblingDisc: document.getElementById('fSiblingDisc').value, pacDisc: document.getElementById('fPacDisc').value };
      const f = calcFee(tmp);
      document.getElementById('feePreviewBox').style.display = 'block';
      document.getElementById('feePreviewContent').innerHTML =
        'Base Tuition (' + cls + '): <b>Rs.' + f.base + '</b><br/>' +
        'Bus Fee: <b>Rs.' + f.bus + '</b>' + (tmp.bus ? '' : ' (not availing)') + '<br/>' +
        (f.disc ? 'Discount (' + f.disc + '%): <b style="color:var(--red)">- Rs.' + f.discAmt + '</b><br/>' : '') +
        '<hr style="margin:5px 0;border-color:#7dd3fc"/>' +
        '<b style="font-size:.95rem;color:var(--teal)">Total Monthly Fee: Rs.' + f.net + '</b>';
    }
    function editStudent(id) {
      const s = _students.find(x => x.id === id); if (!s) return;
      const m = { editId: 'id', fPen: 'pen', fName: 'name', fDob: 'dob', fClass: 'cls', fFather: 'father', fMother: 'mother', fAddress: 'address', fMobile: 'mobile', fAadhar: 'aadhar', fBirthCert: 'birthCert', fFatherAadhar: 'fatherAadhar', fMotherAadhar: 'motherAadhar', fAdmYear: 'admYear' };
      Object.keys(m).forEach(fid => { document.getElementById(fid).value = s[m[fid]] || ''; });
      document.getElementById('fBus').checked = s.bus || false;
      document.getElementById('busLabel').textContent = s.bus ? 'Availing Bus Service' : 'Not Availing';
      if (document.getElementById('fSelfTransport')) document.getElementById('fSelfTransport').checked = s.isSelfTransport || s.vehicle === 'self' || false;
      document.getElementById('fSiblingDisc').value = s.siblingDisc || '0';
      document.getElementById('fPacDisc').value = s.pacDisc || '0';
      document.getElementById('formTitle').textContent = 'Edit: ' + s.name;
      populateSiblingDropdown(s.id);
      document.getElementById('fSibling').value = s.siblingId || '';
      updateFeePreview(); showPanel('add-student');
    }
    async function delStudent(id) {
      if (!confirm('Are you sure you want to move this student to the Recycle Bin? (They can be recovered within 30 days)')) return;
      const sIndex = _students.findIndex(s => s.id === id);
      if (sIndex >= 0) {
        const student = _students[sIndex];
        student.deleted = true;
        student.deletedAt = Date.now();
        showSaving(true);
        try {
          await setDoc(doc(db, 'students', id), sanitize(student));
          _trashStudents.push(student);
          _students.splice(sIndex, 1);

          _fees = _fees.filter(f => f.studentId !== id);

          const countNav = document.getElementById('trashCountNav');
          const countStudents = document.getElementById('trashCountStudents');
          if (countNav) countNav.textContent = _trashStudents.length;
          if (countStudents) countStudents.textContent = _trashStudents.length;

          toast('Student moved to Recycle Bin.');
          renderStudents();
          renderDash();
        } catch (e) {
          toast('Error: ' + e.message, 'error');
        } finally {
          showSaving(false);
        }
      }
    }

    // ===== VIEW STUDENT =====
    function viewStudent(id) {
      const s = _students.find(x => x.id === id); if (!s) return;
      const f = calcFee(s);
      const fees = _fees.filter(x => x.studentId === id).sort((a, b) => (b.ts || 0) - (a.ts || 0));
      const totPaid = fees.reduce((x, fe) => x + (fe.amount || 0) + (fe.busPaid ? fe.busAmount || 0 : 0) + (fe.otherPaid ? fe.otherAmount || 0 : 0) + (fe.admPaid ? fe.admAmount || 0 : 0), 0);
      document.getElementById('studentModalBody').innerHTML =
        '<table class="detail-table">' +
        '<tr><td class="dt-key">Serial No.</td><td><b>' + s.serial + '</b></td></tr>' +
        '<tr><td class="dt-key">PEN Number</td><td><b style="font-family:monospace">' + s.pen + '</b></td></tr>' +
        '<tr><td class="dt-key">Student Name</td><td><b>' + s.name + '</b></td></tr>' +
        '<tr><td class="dt-key">Date of Birth</td><td>' + (s.dob ? new Date(s.dob).toLocaleDateString('en-IN') : '-') + '</td></tr>' +
        '<tr><td class="dt-key">Class</td><td><span class="badge-cls">' + (s.cls || '-') + '</span></td></tr>' +
        '<tr><td class="dt-key">Father Name</td><td>' + (s.father || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Mother Name</td><td>' + (s.mother || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Address</td><td>' + (s.address || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Mobile</td><td>' + (s.mobile || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Student Aadhar</td><td style="font-family:monospace">' + (s.aadhar || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Birth Cert No.</td><td style="font-family:monospace">' + (s.birthCert || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Father Aadhar</td><td style="font-family:monospace">' + (s.fatherAadhar || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Mother Aadhar</td><td style="font-family:monospace">' + (s.motherAadhar || '-') + '</td></tr>' +
        '<tr><td class="dt-key">Bus / Transport</td><td>' + (s.bus ? '<span class="badge-bus yes">Availing Bus</span>' : ((s.isSelfTransport || s.vehicle === 'self') ? '<span class="badge-bus" style="background:#ffe4e6;color:#be123c;">🚶 पैदल / निजी (बटालियन बाहर)</span>' : '<span class="badge-bus no">Not Availing Bus</span>')) + '</td></tr>' +
        '<tr><td class="dt-key">Monthly Fee</td><td><b style="color:var(--green)">Rs.' + f.net + '</b></td></tr>' +
        '<tr><td class="dt-key">Total Paid</td><td><b style="color:var(--teal)">Rs.' + totPaid.toLocaleString('en-IN') + '</b> (' + fees.length + ' months)</td></tr>' +
        '<tr><td class="dt-key">Admission Year</td><td>' + (s.admYear || '-') + '</td></tr>' +
        '</table>' +
        '<div style="margin-top:16px"><div style="font-weight:700;color:var(--blue);margin-bottom:8px">Fee History</div>' +
        '<div style="max-height:260px;overflow-y:auto"><table style="width:100%;border-collapse:collapse;font-size:.79rem">' +
        '<thead><tr>' +
        '<th style="background:var(--navy);color:#fff;padding:7px;text-align:left">Month</th>' +
        '<th style="background:var(--navy);color:#fff;padding:7px;text-align:left">Year</th>' +
        '<th style="background:var(--navy);color:#fff;padding:7px">Tuition</th>' +
        '<th style="background:var(--navy);color:#fff;padding:7px">T.Rec#</th>' +
        '<th style="background:var(--navy);color:#fff;padding:7px">T.Time</th>' +
        (s.bus ? '<th style="background:#1e40af;color:#fff;padding:7px">Bus Amt</th>' +
          '<th style="background:#1e40af;color:#fff;padding:7px">B.Rec#</th>' +
          '<th style="background:#1e40af;color:#fff;padding:7px">B.Time</th>' : '') +
        '</tr></thead><tbody>' +
        (fees.length ? fees.map(fe => '<tr style="border-bottom:1px solid var(--border)">' +
          '<td style="padding:5px 7px">' + fe.month + '</td><td style="padding:5px 7px">' + fe.year + '</td>' +
          '<td style="padding:5px 7px;font-weight:700;color:var(--green)">Rs.' + (fe.amount || 0) + '</td>' +
          '<td style="padding:5px 7px;font-family:monospace">' + (fe.receipt || '-') + '</td>' +
          '<td style="padding:5px 7px;font-size:.72rem;white-space:nowrap">' + (fe.ts ? new Date(fe.ts).toLocaleString('en-IN') : '-') + '</td>' +
          (s.bus ? '<td style="padding:5px 7px;font-weight:700;color:var(--teal)">' + (fe.busPaid ? 'Rs.' + (fe.busAmount || 0) : '-') + '</td>' +
            '<td style="padding:5px 7px;font-family:monospace">' + (fe.busReceipt || '-') + '</td>' +
            '<td style="padding:5px 7px;font-size:.72rem;white-space:nowrap">' + (fe.busPaidTs ? new Date(fe.busPaidTs).toLocaleString('en-IN') : '-') + '</td>' : '') +
          '</tr>').join('') : '<tr><td colspan="8" style="padding:14px;text-align:center;color:var(--muted)">No fee collected yet.</td></tr>') +
        '</tbody></table></div></div>' +
        '<div class="btn-row">' +
        '<button class="btn btn-success" onclick="closeModal(\'studentModal\');openGatePassModal(\'' + s.id + '\')">Gate Pass</button>' +
        '<button class="btn btn-gold" onclick="closeModal(\'studentModal\');openFeeFor(\'' + s.id + '\')">Mark Fee</button>' +
        '<button class="btn btn-primary" onclick="closeModal(\'studentModal\');editStudent(\'' + s.id + '\')">Edit</button></div>';
      openModal('studentModal');
    }

    // ===== FEE COLLECTION =====
    let fcSelectedId = null;
    let fcSelectedYear = new Date().getFullYear();

    function fcReset() {
      fcSelectedId = null;
      document.getElementById('fcSearch').value = '';
      document.getElementById('fcStudentList').innerHTML = '';
      document.getElementById('fcFeeArea').style.display = 'none';
    }
    function fcFilter() { renderFcStudents(document.getElementById('fcSearch').value.trim().toLowerCase()); }
    function renderFcStudents(q) {
      const students = _students.filter(s => !q || s.name.toLowerCase().includes(q) || (s.pen || '').toLowerCase().includes(q));
      if (!students.length) { document.getElementById('fcStudentList').innerHTML = q ? '<p style="color:var(--muted);padding:8px">No students found.</p>' : ''; return; }
      document.getElementById('fcStudentList').innerHTML = '<div class="stu-search-result">' +
        students.sort((a, b) => a.serial - b.serial).map(s => {
          const f = calcFee(s);
          return '<div class="stu-row' + (fcSelectedId === s.id ? ' selected' : '') + '" onclick="selectStudent(\'' + s.id + '\')">' +
            '<div><div class="sr-name">' + s.name + (s.bus ? ' <span style="background:#dbeafe;color:#1e40af;font-size:.68rem;padding:1px 6px;border-radius:10px;font-weight:700">&#128652; Bus</span>' : '') + '</div>' +
            '<div class="sr-meta">PEN: ' + s.pen + ' | Class: ' + (s.cls || '-') + ' | Sr: ' + s.serial + '</div></div>' +
            '<div class="sr-fee">Rs.' + f.net + '/mo</div></div>';
        }).join('') + '</div>';
    }
    function selectStudent(id) {
      fcSelectedId = id; fcSelectedYear = new Date().getFullYear();
      document.getElementById('fcSearch').value = ''; document.getElementById('fcStudentList').innerHTML = '';
      renderFcArea();
    }
    function renderFcArea() {
      const s = _students.find(x => x.id === fcSelectedId); if (!s) return;
      const f = calcFee(s);
      document.getElementById('fcFeeArea').style.display = 'block';
      document.getElementById('fcStudentInfo').innerHTML =
        '<b style="font-size:1rem">' + s.name + '</b>&nbsp;<span class="badge-cls">' + s.cls + '</span>&nbsp;' +
        '<span style="color:var(--muted);font-size:.82rem">PEN: ' + s.pen + '</span>&nbsp;' +
        '<span style="color:var(--green);font-weight:700">Tuition: Rs.' + (f.net - f.bus) + '/mo</span>&nbsp;' +
        (s.bus ? '<span style="color:var(--teal);font-weight:700">Bus: Rs.' + BUS_FEE + '/mo</span>&nbsp;' : '') +
        '<span class="badge-bus ' + (s.bus ? 'yes' : 'no') + '">' + (s.bus ? '&#128652; Bus' : 'No Bus') + '</span>&nbsp;' +
        '<button class="btn btn-sm btn-outline" onclick="fcReset();renderFcStudents(\'\')">&#8592; Change</button>';
      const curY = new Date().getFullYear();
      document.getElementById('fcYearTabs').innerHTML = [curY - 1, curY, curY + 1].map(y =>
        '<div class="year-tab' + (fcSelectedYear === y ? ' active' : '') + '" onclick="fcSelectedYear=' + y + ';renderFcArea()">' + y + '</div>'
      ).join('');
      renderAdmFeeCard();
      renderOtherChargesCard();
      renderMonthGrid();
    }

    function renderMonthGrid() {
      const s = _students.find(x => x.id === fcSelectedId); if (!s) return;
      const fees = _fees;
      const f = calcFee(s);
      const tuitionAmt = f.net - f.bus;
      document.getElementById('fcMonthGrid').innerHTML = SCHOOL_MONTHS.map(month => {
        const ex = fees.find(fe => fe.studentId === fcSelectedId && fe.month === month && String(fe.year) === String(fcSelectedYear));
        const paid = ex && ex.amount > 0 && ex.receipt;
        const busPaid = s.bus && ex && ex.busPaid;
        const cid = 'mc_' + month + '_' + fcSelectedYear;
        let html = '<div class="month-card' + (paid ? ' paid' : '') + '" id="' + cid + '">';
        html += '<div class="month-card-header" onclick="toggleTuition(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">' +
          '<input type="checkbox" class="month-cb"' + (paid ? ' checked' : '') + ' onclick="event.stopPropagation();toggleTuition(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')" id="cb_' + cid + '"/>' +
          '<span class="month-name">' + month + ' ' + fcSelectedYear + '</span>' +
          '<span class="month-status ' + (paid ? 'paid' : 'unpaid') + '">' + (paid ? '&#9989; Tuition Paid' : '&#9744; Tuition Unpaid') + '</span></div>';
        if (s.bus) {
          html += '<div class="bus-fee-row" onclick="toggleBus(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">' +
            '<input type="checkbox" class="bus-cb"' + (busPaid ? ' checked' : '') + ' onclick="event.stopPropagation();toggleBus(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')" id="buscb_' + cid + '"/>' +
            '<span class="bus-row-label">&#128652; Bus Fee (Rs.' + BUS_FEE + ')</span>' +
            '<span class="bus-status ' + (busPaid ? 'paid' : 'unpaid') + '">' + (busPaid ? '&#9989; Bus Paid' : '&#9744; Bus Unpaid') + '</span></div>';
        }
        html += '<div class="month-details" id="det_' + cid + '" style="display:' + (paid || busPaid ? 'block' : 'none') + '">';
        if (paid) {
          html += '<div class="fee-section tuition-sec"><div class="sec-title t">&#127891; Tuition + Dairy</div>' +
            '<div class="md-row">' +
            '<div class="md-field"><span class="md-label">Amount</span><span class="md-value" style="color:var(--green)">Rs.' + (ex.amount || 0) + '</span></div>' +
            '<div class="md-field"><span class="md-label">Receipt #</span><span class="md-value" style="font-family:monospace">' + (ex.receipt || '-') + '</span></div>' +
            '<div class="md-ts">&#128197; ' + new Date(ex.ts).toLocaleString('en-IN') + '</div></div>' +
            '<div class="action-row">' +
            '<button class="btn btn-sm btn-danger" onclick="unmarkTuition(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">&#128465; Remove</button>' +
            '<button class="btn btn-sm btn-primary" onclick="editTuition(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">&#9998; Edit</button>' +
            '</div></div>';
        }
        if (!paid) {
          html += '<div class="fee-section tuition-form" id="tform_' + cid + '" style="display:none">' +
            '<div class="sec-title t">&#127891; Tuition + Dairy</div>' +
            '<div class="md-row" style="gap:8px">' +
            '<div class="form-group"><label>Amount (Rs.)</label><input type="number" id="tamt_' + cid + '" value="' + tuitionAmt + '" min="0"/></div>' +
            '<div class="form-group"><label>Receipt Number</label><input type="text" id="trec_' + cid + '" placeholder="Enter receipt no."/></div>' +
            '</div>' +
            '<button class="btn btn-success btn-sm" style="margin-top:8px;width:100%" onclick="saveTuition(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">&#9989; Save Tuition</button></div>';
        }
        if (s.bus && busPaid) {
          html += '<div class="fee-section bus-sec"><div class="sec-title b">&#128652; Bus Fee</div>' +
            '<div class="md-row">' +
            '<div class="md-field"><span class="md-label">Amount</span><span class="md-value" style="color:var(--teal)">Rs.' + (ex.busAmount || BUS_FEE) + '</span></div>' +
            '<div class="md-field"><span class="md-label">Receipt #</span><span class="md-value" style="font-family:monospace">' + (ex.busReceipt || '-') + '</span></div>' +
            '<div class="md-ts">&#128197; ' + new Date(ex.busPaidTs).toLocaleString('en-IN') + '</div></div>' +
            '<div class="action-row">' +
            '<button class="btn btn-sm btn-danger" onclick="unmarkBus(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">&#128465; Remove Bus</button>' +
            '<button class="btn btn-sm btn-primary" onclick="editBus(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">&#9998; Edit Bus</button>' +
            '</div></div>';
        }
        if (s.bus && !busPaid) {
          html += '<div class="fee-section bus-form" id="bform_' + cid + '" style="display:none">' +
            '<div class="sec-title b">&#128652; Bus Fee</div>' +
            '<div class="md-row" style="gap:8px">' +
            '<div class="form-group"><label>Amount (Rs.)</label><input type="number" id="bamt_' + cid + '" value="' + BUS_FEE + '" min="0"/></div>' +
            '<div class="form-group"><label>Receipt Number</label><input type="text" id="brec_' + cid + '" placeholder="Bus receipt no."/></div>' +
            '</div>' +
            '<button class="btn btn-success btn-sm" style="margin-top:8px;width:100%;background:linear-gradient(135deg,var(--teal),#0891b2)" onclick="saveBus(\'' + month + '\',' + fcSelectedYear + ',\'' + cid + '\')">&#9989; Save Bus Fee</button></div>';
        }
        html += '</div></div>';
        return html;
      }).join('');
    }

    // --- TUITION ---
    function toggleTuition(month, year, cid) {
      const ex = _fees.find(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      if (ex && ex.amount && ex.receipt) return;
      const det = document.getElementById('det_' + cid), tform = document.getElementById('tform_' + cid), cb = document.getElementById('cb_' + cid);
      if (!tform) return;
      const shown = tform.style.display !== 'none';
      tform.style.display = shown ? 'none' : 'block';
      if (det) det.style.display = tform.style.display;
      if (cb) cb.checked = !shown;
    }
    async function saveTuition(month, year, cid) {
      const amtEl = document.getElementById('tamt_' + cid), recEl = document.getElementById('trec_' + cid);
      const amount = parseFloat(amtEl?.value) || 0, receipt = (recEl?.value || '').trim();
      if (!receipt) { toast('Tuition receipt number required!', 'error'); return; }
      if (amount <= 0) { toast('Amount must be > 0', 'error'); return; }
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      let feeRec;
      if (idx >= 0) { _fees[idx].amount = amount; _fees[idx].receipt = receipt; _fees[idx].ts = Date.now(); feeRec = _fees[idx]; }
      else { feeRec = { id: uid(), studentId: fcSelectedId, month, year: String(year), amount, receipt, ts: Date.now(), busPaid: false, busAmount: 0, busReceipt: '', busPaidTs: null }; _fees.push(feeRec); }
      await fsAddFee(feeRec);
      toast('Tuition marked for ' + month + ' ' + year + '! Rec: ' + receipt); renderMonthGrid(); renderDash();
    }
    async function unmarkTuition(month, year, cid) {
      if (!confirm('Remove tuition entry for ' + month + ' ' + year + '?')) return;
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      if (idx >= 0) {
        if (_fees[idx].busPaid) {
          const fCopy = { ..._fees[idx], amount: 0, receipt: '', ts: null };
          await fsAddFee(fCopy);
          _fees[idx] = fCopy;
        } else {
          const id = _fees[idx].id;
          _fees.splice(idx, 1);
          await fsDeleteFee(id);
        }
      }
      toast('Tuition removed', 'warn'); renderMonthGrid(); renderDash();
    }
    async function editTuition(month, year, cid) {
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      const oldAmt = idx >= 0 ? _fees[idx].amount : 0, oldRec = idx >= 0 ? _fees[idx].receipt : '';
      if (idx >= 0) { _fees[idx].amount = 0; _fees[idx].receipt = ''; _fees[idx].ts = null; await fsAddFee(_fees[idx]); }
      renderMonthGrid();
      setTimeout(() => {
        const tf = document.getElementById('tform_' + cid), det = document.getElementById('det_' + cid);
        if (tf) { tf.style.display = 'block'; } if (det) { det.style.display = 'block'; }
        const a = document.getElementById('tamt_' + cid), r = document.getElementById('trec_' + cid);
        if (a) a.value = oldAmt; if (r) r.value = oldRec;
        const cb = document.getElementById('cb_' + cid); if (cb) cb.checked = true;
      }, 60);
    }

    // --- BUS ---
    function toggleBus(month, year, cid) {
      const ex = _fees.find(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      if (ex && ex.busPaid) return;
      const det = document.getElementById('det_' + cid), bform = document.getElementById('bform_' + cid), cb = document.getElementById('buscb_' + cid);
      if (!bform) return;
      const shown = bform.style.display !== 'none';
      bform.style.display = shown ? 'none' : 'block';
      if (det) det.style.display = bform.style.display === 'block' ? 'block' : (document.getElementById('tform_' + cid)?.style.display === 'block' ? 'block' : 'none');
      if (cb) cb.checked = !shown;
    }
    async function saveBus(month, year, cid) {
      const amtEl = document.getElementById('bamt_' + cid), recEl = document.getElementById('brec_' + cid);
      const busAmount = amtEl?.value !== '' ? parseFloat(amtEl.value) : BUS_FEE, busReceipt = (recEl?.value || '').trim();
      if (!busReceipt) { toast('Bus receipt number required!', 'error'); return; }
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      let feeRec;
      if (idx >= 0) { _fees[idx].busPaid = true; _fees[idx].busAmount = busAmount; _fees[idx].busReceipt = busReceipt; _fees[idx].busPaidTs = Date.now(); feeRec = _fees[idx]; }
      else { feeRec = { id: uid(), studentId: fcSelectedId, month, year: String(year), amount: 0, receipt: '', ts: null, busPaid: true, busAmount, busReceipt, busPaidTs: Date.now() }; _fees.push(feeRec); }
      await fsAddFee(feeRec);
      toast('Bus fee marked for ' + month + ' ' + year + '! Rec: ' + busReceipt); renderMonthGrid(); renderDash();
    }
    async function unmarkBus(month, year, cid) {
      if (!confirm('Remove bus fee for ' + month + ' ' + year + '?')) return;
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      if (idx >= 0) {
        if (_fees[idx].amount && _fees[idx].receipt) { _fees[idx].busPaid = false; _fees[idx].busAmount = 0; _fees[idx].busReceipt = ''; _fees[idx].busPaidTs = null; await fsAddFee(_fees[idx]); }
        else { const id = _fees[idx].id; _fees.splice(idx, 1); await fsDeleteFee(id); }
      }
      toast('Bus fee removed', 'warn'); renderMonthGrid(); renderDash();
    }
    async function editBus(month, year, cid) {
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(year));
      const oldAmt = idx >= 0 ? _fees[idx].busAmount : BUS_FEE, oldRec = idx >= 0 ? _fees[idx].busReceipt : '';
      if (idx >= 0) { _fees[idx].busPaid = false; _fees[idx].busAmount = 0; _fees[idx].busReceipt = ''; _fees[idx].busPaidTs = null; await fsAddFee(_fees[idx]); }
      renderMonthGrid();
      setTimeout(() => {
        const bf = document.getElementById('bform_' + cid), det = document.getElementById('det_' + cid);
        if (bf) { bf.style.display = 'block'; } if (det) { det.style.display = 'block'; }
        const a = document.getElementById('bamt_' + cid), r = document.getElementById('brec_' + cid);
        if (a) a.value = oldAmt; if (r) r.value = oldRec;
        const cb = document.getElementById('buscb_' + cid); if (cb) cb.checked = true;
      }, 60);
    }

    // --- ADMISSION FEE (ANNUAL SESSION CARD) ---
    function renderAdmFeeCard() {
      const s = _students.find(x => x.id === fcSelectedId); if (!s) return;
      const fees = _fees;
      const ex = fees.find(fe => fe.studentId === fcSelectedId && String(fe.year) === String(fcSelectedYear) && fe.admPaid);
      const paid = !!ex;

      let html = '<div class="card' + (paid ? ' paid' : '') + '" style="margin-bottom:16px;border-left:5px solid #1a3a7c;padding:0;overflow:hidden">';
      html += '<div class="month-card-header" onclick="toggleAdmCard()" style="background:#eff6ff;display:flex;justify-content:space-between;padding:12px 16px">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
        '<input type="checkbox" class="other-cb" id="adm_card_cb"' + (paid ? ' checked' : '') + ' onclick="event.stopPropagation();toggleAdmCard()" style="accent-color:#1a3a7c"/>' +
        '<span style="font-weight:700;color:#1a3a7c;font-size:.95rem">&#127985; Admission Fee for Session ' + fcSelectedYear + '</span>' +
        '</div>' +
        '<span class="bus-status ' + (paid ? 'paid' : 'unpaid') + '">' + (paid ? '&#9989; Paid' : '&#9744; Unpaid') + '</span></div>';

      html += '<div class="month-details" id="adm_card_det" style="display:' + (paid ? 'block' : 'none') + ';padding:14px 16px;background:#fff">';
      if (paid) {
        html += '<div class="fee-section bus-sec" style="margin:0;border-left:4px solid #1a3a7c;background:#f0f5ff"><div class="sec-title b" style="color:#1a3a7c">&#127985; Admission Fee Paid</div>' +
          '<div class="md-row" style="margin-bottom:8px">' +
          '<div class="md-field"><span class="md-label">Amount</span><span class="md-value" style="color:#1a3a7c">Rs.' + (ex.admAmount || 2000) + '</span></div>' +
          '<div class="md-field"><span class="md-label">Receipt #</span><span class="md-value" style="font-family:monospace">' + (ex.admReceipt || '-') + '</span></div>' +
          '<div class="md-field"><span class="md-label">Paid Month</span><span class="md-value" style="font-weight:600">' + ex.month + '</span></div>' +
          '<div class="md-ts" style="grid-column:1/-1;margin-top:6px">&#128197; Paid on: ' + new Date(ex.admPaidTs).toLocaleString('en-IN') + '</div></div>' +
          '<div class="action-row">' +
          '<button class="btn btn-sm btn-danger" onclick="unmarkAdmCard(\'' + ex.month + '\')">&#128465; Remove</button>' +
          '<button class="btn btn-sm btn-primary" onclick="editAdmCard(\'' + ex.month + '\')">&#9998; Edit</button>' +
          '</div></div>';
      } else {
        html += '<div class="fee-section bus-form" id="adm_card_form" style="display:none;margin:0;border-left:4px solid #1a3a7c;background:#f0f5ff">' +
          '<div class="sec-title b" style="color:#1a3a7c">&#127985; Collect Admission Fee</div>' +
          '<div class="md-row" style="gap:8px;margin-bottom:10px">' +
          '<div class="form-group"><label>Amount (Rs.)</label><input type="number" id="adm_card_amt" value="2000" min="0"/></div>' +
          '<div class="form-group"><label>Receipt Number</label><input type="text" id="adm_card_rec" placeholder="Enter receipt no."/></div>' +
          '<div class="form-group" style="grid-column:1/-1"><label>Paid In Month</label>' +
          '<select id="adm_card_month">' +
          SCHOOL_MONTHS.map(m => '<option' + (m === 'April' ? ' selected' : '') + '>' + m + '</option>').join('') +
          '</select></div>' +
          '</div>' +
          '<button class="btn btn-success btn-sm" style="width:100%;background:linear-gradient(135deg,#1a3a7c,#0d1b3e)" onclick="saveAdmCard()">&#9989; Save Admission Fee</button></div>';
      }
      html += '</div></div>';
      document.getElementById('fcAdmFeeCard').innerHTML = html;
    }
    function toggleAdmCard() {
      const ex = _fees.find(fe => fe.studentId === fcSelectedId && String(fe.year) === String(fcSelectedYear) && fe.admPaid);
      if (ex) return;
      const det = document.getElementById('adm_card_det'), form = document.getElementById('adm_card_form'), cb = document.getElementById('adm_card_cb');
      if (!form) return;
      const shown = form.style.display !== 'none';
      form.style.display = shown ? 'none' : 'block';
      if (det) det.style.display = form.style.display;
      if (cb) cb.checked = !shown;
    }
    async function saveAdmCard() {
      const amtEl = document.getElementById('adm_card_amt'), recEl = document.getElementById('adm_card_rec'), monthEl = document.getElementById('adm_card_month');
      const admAmount = amtEl?.value !== '' ? parseFloat(amtEl.value) : 2000, admReceipt = (recEl?.value || '').trim();
      const month = monthEl ? monthEl.value : 'April';
      if (!admReceipt) { toast('Admission fee receipt number required!', 'error'); return; }
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(fcSelectedYear));
      let feeRec;
      if (idx >= 0) {
        _fees[idx].admPaid = true;
        _fees[idx].admAmount = admAmount;
        _fees[idx].admReceipt = admReceipt;
        _fees[idx].admPaidTs = Date.now();
        feeRec = _fees[idx];
      } else {
        feeRec = {
          id: uid(),
          studentId: fcSelectedId,
          month,
          year: String(fcSelectedYear),
          amount: 0,
          receipt: '',
          ts: null,
          busPaid: false,
          busAmount: 0,
          busReceipt: '',
          busPaidTs: null,
          otherPaid: false,
          otherAmount: 0,
          otherReceipt: '',
          otherPaidTs: null,
          admPaid: true,
          admAmount,
          admReceipt,
          admPaidTs: Date.now()
        };
        _fees.push(feeRec);
      }
      await fsAddFee(feeRec);
      toast('Admission fee marked for ' + month + ' ' + fcSelectedYear + '! Rec: ' + admReceipt);
      renderFcArea();
      renderDash();
    }
    async function unmarkAdmCard(month) {
      if (!confirm('Remove admission fee paid in ' + month + ' ' + fcSelectedYear + '?')) return;
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(fcSelectedYear));
      if (idx >= 0) {
        if ((_fees[idx].amount && _fees[idx].receipt) || _fees[idx].busPaid || _fees[idx].otherPaid) {
          _fees[idx].admPaid = false;
          _fees[idx].admAmount = 0;
          _fees[idx].admReceipt = '';
          _fees[idx].admPaidTs = null;
          await fsAddFee(_fees[idx]);
        } else {
          const id = _fees[idx].id;
          _fees.splice(idx, 1);
          await fsDeleteFee(id);
        }
      }
      toast('Admission fee removed', 'warn');
      renderFcArea();
      renderDash();
    }
    async function editAdmCard(month) {
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(fcSelectedYear));
      const oldAmt = idx >= 0 ? _fees[idx].admAmount : 2000, oldRec = idx >= 0 ? _fees[idx].admReceipt : '';
      if (idx >= 0) {
        _fees[idx].admPaid = false;
        _fees[idx].admAmount = 0;
        _fees[idx].admReceipt = '';
        _fees[idx].admPaidTs = null;
        await fsAddFee(_fees[idx]);
      }
      renderFcArea();
      setTimeout(() => {
        const form = document.getElementById('adm_card_form'), det = document.getElementById('adm_card_det');
        if (form) { form.style.display = 'block'; }
        if (det) { det.style.display = 'block'; }
        const a = document.getElementById('adm_card_amt'), r = document.getElementById('adm_card_rec'), m = document.getElementById('adm_card_month');
        if (a) a.value = oldAmt;
        if (r) r.value = oldRec;
        if (m) m.value = month;
        const cb = document.getElementById('adm_card_cb');
        if (cb) cb.checked = true;
      }, 60);
    }

    // --- OTHER CHARGES (ANNUAL SESSION CARD) ---
    function renderOtherChargesCard() {
      const s = _students.find(x => x.id === fcSelectedId); if (!s) return;
      const fees = _fees;
      const ex = fees.find(fe => fe.studentId === fcSelectedId && String(fe.year) === String(fcSelectedYear) && fe.otherPaid);
      const paid = !!ex;

      let html = '<div class="card' + (paid ? ' paid' : '') + '" style="margin-bottom:16px;border-left:5px solid #c2410c;padding:0;overflow:hidden">';
      html += '<div class="month-card-header" onclick="toggleOtherCard()" style="background:#fff7ed;display:flex;justify-content:space-between;padding:12px 16px">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
        '<input type="checkbox" class="other-cb" id="other_card_cb"' + (paid ? ' checked' : '') + ' onclick="event.stopPropagation();toggleOtherCard()"/>' +
        '<span style="font-weight:700;color:#c2410c;font-size:.95rem">&#128212; Other Charges (Diary + Fee Card) for Session ' + fcSelectedYear + '</span>' +
        '</div>' +
        '<span class="bus-status ' + (paid ? 'paid' : 'unpaid') + '">' + (paid ? '&#9989; Paid' : '&#9744; Unpaid') + '</span></div>';

      html += '<div class="month-details" id="other_card_det" style="display:' + (paid ? 'block' : 'none') + ';padding:14px 16px;background:#fff">';
      if (paid) {
        html += '<div class="fee-section other-sec" style="margin:0"><div class="sec-title o">&#128212; Other Charges Paid</div>' +
          '<div class="md-row" style="margin-bottom:8px">' +
          '<div class="md-field"><span class="md-label">Amount</span><span class="md-value" style="color:#c2410c">Rs.' + (ex.otherAmount || DAIRY) + '</span></div>' +
          '<div class="md-field"><span class="md-label">Receipt #</span><span class="md-value" style="font-family:monospace">' + (ex.otherReceipt || '-') + '</span></div>' +
          '<div class="md-field"><span class="md-label">Paid Month</span><span class="md-value" style="font-weight:600">' + ex.month + '</span></div>' +
          '<div class="md-ts" style="grid-column:1/-1;margin-top:6px">&#128197; Paid on: ' + new Date(ex.otherPaidTs).toLocaleString('en-IN') + '</div></div>' +
          '<div class="action-row">' +
          '<button class="btn btn-sm btn-danger" onclick="unmarkOtherCard(\'' + ex.month + '\')">&#128465; Remove</button>' +
          '<button class="btn btn-sm btn-primary" onclick="editOtherCard(\'' + ex.month + '\')">&#9998; Edit</button>' +
          '</div></div>';
      } else {
        html += '<div class="fee-section other-form" id="other_card_form" style="display:none;margin:0">' +
          '<div class="sec-title o">&#128212; Collect Other Charges</div>' +
          '<div class="md-row" style="gap:8px;margin-bottom:10px">' +
          '<div class="form-group"><label>Amount (Rs.)</label><input type="number" id="other_card_amt" value="' + DAIRY + '" min="0"/></div>' +
          '<div class="form-group"><label>Receipt Number</label><input type="text" id="other_card_rec" placeholder="Enter receipt no."/></div>' +
          '<div class="form-group" style="grid-column:1/-1"><label>Paid In Month</label>' +
          '<select id="other_card_month">' +
          SCHOOL_MONTHS.map(m => '<option' + (m === 'April' ? ' selected' : '') + '>' + m + '</option>').join('') +
          '</select></div>' +
          '</div>' +
          '<button class="btn btn-success btn-sm" style="width:100%;background:linear-gradient(135deg,#c2410c,#9a3412)" onclick="saveOtherCard()">&#9989; Save Other Charges</button></div>';
      }
      html += '</div></div>';
      document.getElementById('fcOtherChargesCard').innerHTML = html;
    }
    function toggleOtherCard() {
      const ex = _fees.find(fe => fe.studentId === fcSelectedId && String(fe.year) === String(fcSelectedYear) && fe.otherPaid);
      if (ex) return;
      const det = document.getElementById('other_card_det'), form = document.getElementById('other_card_form'), cb = document.getElementById('other_card_cb');
      if (!form) return;
      const shown = form.style.display !== 'none';
      form.style.display = shown ? 'none' : 'block';
      if (det) det.style.display = form.style.display;
      if (cb) cb.checked = !shown;
    }
    async function saveOtherCard() {
      const amtEl = document.getElementById('other_card_amt'), recEl = document.getElementById('other_card_rec'), monthEl = document.getElementById('other_card_month');
      const otherAmount = amtEl?.value !== '' ? parseFloat(amtEl.value) : DAIRY, otherReceipt = (recEl?.value || '').trim();
      const month = monthEl ? monthEl.value : 'April';
      if (!otherReceipt) { toast('Other charges receipt number required!', 'error'); return; }
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(fcSelectedYear));
      let feeRec;
      if (idx >= 0) {
        _fees[idx].otherPaid = true;
        _fees[idx].otherAmount = otherAmount;
        _fees[idx].otherReceipt = otherReceipt;
        _fees[idx].otherPaidTs = Date.now();
        feeRec = _fees[idx];
      } else {
        feeRec = {
          id: uid(),
          studentId: fcSelectedId,
          month,
          year: String(fcSelectedYear),
          amount: 0,
          receipt: '',
          ts: null,
          busPaid: false,
          busAmount: 0,
          busReceipt: '',
          busPaidTs: null,
          otherPaid: true,
          otherAmount,
          otherReceipt,
          otherPaidTs: Date.now()
        };
        _fees.push(feeRec);
      }
      await fsAddFee(feeRec);
      toast('Other charges marked for ' + month + ' ' + fcSelectedYear + '! Rec: ' + otherReceipt);
      renderFcArea();
      renderDash();
    }
    async function unmarkOtherCard(month) {
      if (!confirm('Remove other charges paid in ' + month + ' ' + fcSelectedYear + '?')) return;
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(fcSelectedYear));
      if (idx >= 0) {
        if ((_fees[idx].amount && _fees[idx].receipt) || _fees[idx].busPaid) {
          _fees[idx].otherPaid = false;
          _fees[idx].otherAmount = 0;
          _fees[idx].otherReceipt = '';
          _fees[idx].otherPaidTs = null;
          await fsAddFee(_fees[idx]);
        } else {
          const id = _fees[idx].id;
          _fees.splice(idx, 1);
          await fsDeleteFee(id);
        }
      }
      toast('Other charges removed', 'warn');
      renderFcArea();
      renderDash();
    }
    async function editOtherCard(month) {
      const idx = _fees.findIndex(f => f.studentId === fcSelectedId && f.month === month && String(f.year) === String(fcSelectedYear));
      const oldAmt = idx >= 0 ? _fees[idx].otherAmount : DAIRY, oldRec = idx >= 0 ? _fees[idx].otherReceipt : '';
      if (idx >= 0) {
        _fees[idx].otherPaid = false;
        _fees[idx].otherAmount = 0;
        _fees[idx].otherReceipt = '';
        _fees[idx].otherPaidTs = null;
        await fsAddFee(_fees[idx]);
      }
      renderFcArea();
      setTimeout(() => {
        const form = document.getElementById('other_card_form'), det = document.getElementById('other_card_det');
        if (form) { form.style.display = 'block'; }
        if (det) { det.style.display = 'block'; }
        const a = document.getElementById('other_card_amt'), r = document.getElementById('other_card_rec'), m = document.getElementById('other_card_month');
        if (a) a.value = oldAmt;
        if (r) r.value = oldRec;
        if (m) m.value = month;
        const cb = document.getElementById('other_card_cb');
        if (cb) cb.checked = true;
      }, 60);
    }
    function openFeeFor(id) {
      showPanel('fee-collect');
      fcSelectedId = id; fcSelectedYear = new Date().getFullYear();
      document.getElementById('fcSearch').value = ''; document.getElementById('fcStudentList').innerHTML = '';
      renderFcArea();
    }

    // ===== FEE CHART =====
    function renderFeeChart() {
      document.getElementById('feeChartDisplay').innerHTML = [
        { l: 'KG-I', a: '600/month' }, { l: 'KG-II', a: '600/month' },
        { l: '1st &amp; 2nd', a: '700/month' }, { l: '3rd, 4th &amp; 5th', a: '800/month' },
        { l: '6th, 7th &amp; 8th', a: '1000/month' },
        { l: 'Dairy + Fee Card', a: '100 + 20 = 120/month' }, { l: 'Bus Fee', a: '300/month' },
        { l: 'Registration Fee', a: '2000 (one-time)' }
      ].map(i => '<div class="fee-item"><span class="fi-cls">' + i.l + '</span><span class="fi-amt">Rs.' + i.a + '</span></div>').join('');
    }

    // ===== PRINT =====
    const PRINT_FIELD_DEFS = {
      sr: { label: 'Sr. No.', align: 'center', getVal: (s, idx) => s.serial || (idx + 1) },
      pen: { label: 'PEN Number', align: 'left', getVal: (s) => s.pen || '-' },
      name: { label: 'Student Name', align: 'left', getVal: (s) => '<b>' + (s.name || '-') + '</b>' },
      father: { label: "Father's Name", align: 'left', getVal: (s) => s.father || '-' },
      mother: { label: "Mother's Name", align: 'left', getVal: (s) => s.mother || '-' },
      cls: { label: 'Class', align: 'center', getVal: (s) => s.cls || '-' },
      mobile: { label: 'Mobile Number', align: 'left', getVal: (s) => s.mobile || '-' },
      dob: { label: 'Date of Birth', align: 'center', getVal: (s) => (s.dob ? new Date(s.dob).toLocaleDateString('en-IN') : '-') },
      address: { label: 'Address', align: 'left', getVal: (s) => s.address || '-' },
      bus: { label: 'Bus Service', align: 'center', getVal: (s) => (s.bus ? 'YES' : 'NO') },
      fee: { label: 'Monthly Fee', align: 'right', getVal: (s) => 'Rs.' + calcFee(s).net },
      aadhar: { label: 'Student Aadhar', align: 'center', getVal: (s) => s.aadhar || '-' },
      birthCert: { label: 'Birth Cert No.', align: 'left', getVal: (s) => s.birthCert || '-' },
      fatherAadhar: { label: 'Father Aadhar', align: 'center', getVal: (s) => s.fatherAadhar || '-' },
      motherAadhar: { label: 'Mother Aadhar', align: 'center', getVal: (s) => s.motherAadhar || '-' },
      admYear: { label: 'Admission Year', align: 'center', getVal: (s) => s.admYear || '-' },
      remark: { label: 'Remark', align: 'left', getVal: (s) => s.remark || '-' }
    };

    function togglePrintFieldsBox() {
      const box = document.getElementById('printFieldsBox');
      if (box) {
        box.style.display = box.style.display === 'block' ? 'none' : 'block';
      }
    }

    function setPrintFields(mode) {
      const cbs = document.querySelectorAll('.pr-field-cb');
      const defaults = ['sr', 'name', 'father', 'cls', 'mobile', 'pen', 'fee'];
      cbs.forEach(cb => {
        if (mode === 'all') cb.checked = true;
        else if (mode === 'none') cb.checked = false;
        else if (mode === 'default') cb.checked = defaults.includes(cb.value);
      });
      renderPrint();
    }

    function resetPrintFilters() {
      document.getElementById('prClass').value = '';
      document.getElementById('prMonth').value = '';
      if (document.getElementById('prSortClass')) document.getElementById('prSortClass').value = '';
      if (document.getElementById('prSortName')) document.getElementById('prSortName').value = '';
      document.getElementById('prView').value = 'register';
      document.getElementById('prYear').value = new Date().getFullYear();
      setPrintFields('default');
      renderPrint();
    }

    function renderPrint() {
      const view = document.getElementById('prView').value, cls = document.getElementById('prClass').value;
      const month = document.getElementById('prMonth').value, year = document.getElementById('prYear').value;
      const sortClass = document.getElementById('prSortClass')?.value;
      const sortName = document.getElementById('prSortName')?.value;

      let students = [..._students].sort((a, b) => (Number(a.serial) || 0) - (Number(b.serial) || 0));
      if (cls) {
        const normFilterCls = normalizeClassName(cls);
        students = students.filter(s => s.cls === cls || normalizeClassName(s.cls) === normFilterCls);
      }

      if (sortClass || sortName) {
        const clsOrder = { 'KG-I': 1, 'KG-II': 2, '1st': 3, '2nd': 4, '3rd': 5, '4th': 6, '5th': 7, '6th': 8, '7th': 9, '8th': 10 };
        students.sort((a, b) => {
          if (sortClass) {
            const vA = clsOrder[a.cls] || 99;
            const vB = clsOrder[b.cls] || 99;
            if (vA !== vB) return sortClass === 'asc' ? vA - vB : vB - vA;
          }
          if (sortName) {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            if (nameA < nameB) return sortName === 'asc' ? -1 : 1;
            if (nameA > nameB) return sortName === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      const hdr = '<div class="pr-school-head"><img src="logo1.png" class="pr-logo" onerror="this.style.display=\'none\'"/>' +
        '<div style="text-align:center"><div style="font-family:Poppins,sans-serif;font-size:1.2rem;font-weight:800;color:#0d1b3e">POLICE MODERN SCHOOL</div>' +
        '<div style="font-size:.8rem;color:#555;font-weight:600">25th BN P.A.C., Raebareli</div></div></div>';
      if (view === 'register') {
        const checkedCbs = Array.from(document.querySelectorAll('.pr-field-cb:checked'));
        const checkedKeys = checkedCbs.map(cb => cb.value);

        let selectedDefs = checkedKeys.map(k => ({ key: k, ...PRINT_FIELD_DEFS[k] })).filter(d => d.label);
        if (selectedDefs.length === 0) {
          selectedDefs = ['sr', 'name', 'father', 'cls', 'mobile', 'pen', 'fee'].map(k => ({ key: k, ...PRINT_FIELD_DEFS[k] }));
        }

        const thsHtml = selectedDefs.map(d => '<th style="text-align:' + d.align + '">' + d.label + '</th>').join('');

        const rowsHtml = students.map((s, idx) => {
          const tds = selectedDefs.map(d => {
            const val = d.getVal ? d.getVal(s, idx) : (s[d.key] || '-');
            return '<td style="text-align:' + d.align + '">' + val + '</td>';
          }).join('');
          return '<tr>' + tds + '</tr>';
        }).join('');

        document.getElementById('printArea').innerHTML = '<div class="print-card">' +
          '<div class="pr-hdr">' + hdr + '<h2>STUDENT REGISTER' + (cls ? ' – Class ' + cls : '') + '</h2>' +
          '<p>Generated: ' + new Date().toLocaleString('en-IN') + ' | Total: ' + students.length + '</p></div>' +
          '<div style="overflow-x:auto"><table class="pr-table"><thead><tr>' + thsHtml + '</tr></thead><tbody>' +
          rowsHtml +
          '</tbody></table></div></div>';
      } else if (view === 'monthly-register') {
        const fees = [..._fees].filter(f => String(f.year) === String(year));
        const gt = fees.reduce((s, f) => s + (f.amount || 0) + (f.busPaid ? f.busAmount || 0 : 0), 0);

        const q1 = [0, 1, 2];
        const q2 = [3, 4, 5];
        const q3 = [6, 7, 8];
        const q4 = [9, 10, 11];

        const ADM_FEE = 2000; // Set admission fee amount here if needed

        document.getElementById('printArea').innerHTML = '<link rel="stylesheet" href="css/style.css" /><div class="print-card">' +
          '<div class="pr-hdr">' + hdr + '<h2>MONTHLY FEE REGISTER &ndash; ' + year + (cls ? ' | Class ' + cls : '') + '</h2>' +
          '<p>Generated: ' + new Date().toLocaleString('en-IN') + ' | Students: ' + students.length + '</p></div>' +
          '<div class="reg-wrap"><table class="reg-table"><thead>' +
          '<tr><th rowspan="2" style="width:2%">Sr.</th><th rowspan="2" style="width:6%">PEN</th><th rowspan="2" style="width:12%">Student Name</th><th rowspan="2" style="width:4%">Cls</th><th rowspan="2" style="width:2%">Bus</th>' +
          q1.map(i => '<th colspan="2" style="font-size:0.68rem;width:18%">' + SCHOOL_MONTHS[i] + ' / ' + SCHOOL_MONTHS[i + 3] + ' / ' + SCHOOL_MONTHS[i + 6] + ' / ' + SCHOOL_MONTHS[i + 9] + '</th>').join('') + '<th rowspan="2" style="width:10%">Total<br>Paid / Balance</th>' +
          '<th rowspan="2" style="width:10%;background:#1a3a7c;color:#fff;font-size:0.65rem">Qtr<br>Total</th></tr>' +
          '<tr>' + q1.map(() => '<th style="background:#1a3a7c;line-height:1.2;padding:3px 2px;font-size:0.60rem">Fee / Rec#</th><th style="background:#0e7490;line-height:1.2;padding:3px 2px;font-size:0.60rem">Bus / Rec#</th>').join('') + '</tr>' +
          '</thead><tbody>' +
          students.map((s, index) => {
            const sf = fees.filter(f => f.studentId === s.id);
            const tot = sf.reduce((x, f) => x + (f.amount || 0) + (f.busPaid ? f.busAmount || 0 : 0) + (f.otherPaid ? f.otherAmount || 0 : 0) + (f.admPaid ? f.admAmount || 0 : 0), 0);

            // Calculate annual balance (Tracking Tuition, Dairy, and Admission to prevent optional Bus Fee from inflating liability)
            const totTuition = sf.reduce((x, f) => x + (f.amount || 0) + (f.otherPaid ? f.otherAmount || 0 : 0) + (f.admPaid ? f.admAmount || 0 : 0), 0);
            const monthlyFee = calcFee(s);
            const tuitionNet = monthlyFee.net - monthlyFee.bus;
            const isAdm = String(s.admYear) === String(year);
            const annualLiability = (tuitionNet * 12) + DAIRY + (isAdm ? ADM_FEE : 0);
            const balance = annualLiability - totTuition;

            const renderRow = (rowMonths, isFirst, isLast) => {
              let row = '<tr style="' + (isFirst ? 'border-top: 2px solid #0d1b3e' : '') + (isLast ? '; border-bottom: 2px solid #0d1b3e' : '') + '">';
              if (isFirst) {
                row += '<td class="stu-info" style="text-align:center;vertical-align:top;padding-top:5px" rowspan="4">' + s.serial + '</td>' +
                  '<td class="stu-info" style="font-family:monospace;font-size:.67rem;text-align:center;vertical-align:top;padding-top:5px" rowspan="4">' + (s.pen || '') + '</td>' +
                  '<td class="stu-info" style="text-align:center;vertical-align:top;padding-top:5px" rowspan="4"><b>' + s.name + '</b></td>' +
                  '<td class="stu-info" style="text-align:center;vertical-align:top;padding-top:5px" rowspan="4">' + (s.cls || '') + '</td>' +
                  '<td class="stu-info" style="text-align:center;vertical-align:top;padding-top:5px" rowspan="4">' + (s.bus ? 'Y' : '') + '</td>';
              }

              let rowTot = 0;
              row += rowMonths.map(i => {
                const m = SCHOOL_MONTHS[i];
                const fe = sf.find(f => f.month === m);
                if (fe) {
                  rowTot += (fe.amount || 0) + (fe.busPaid ? (fe.busAmount || 0) : 0) + (fe.otherPaid ? (fe.otherAmount || 0) : 0);
                }
                const tc = fe && fe.amount ? '<td class="paid-cell" style="padding:4px;line-height:1.3;text-align:center"><b style="font-size:0.75rem">' + fe.amount + '</b><br><span style="font-family:monospace;font-size:0.65rem;color:#444">' + (fe.receipt || '-') + '</span></td>' : '<td class="unpaid-cell">-</td>';
                const bc = s.bus ? (fe && fe.busPaid ? '<td class="bus-paid-cell" style="padding:4px;line-height:1.3;text-align:center"><b style="font-size:0.75rem">' + (fe.busAmount || 0) + '</b><br><span style="font-family:monospace;font-size:0.65rem;color:#444">' + (fe.busReceipt || '-') + '</span></td>' : '<td class="unpaid-cell">-</td>') : '<td style="text-align:center;color:#bbb">-</td>';
                return tc + bc;
              }).join('');

              if (isFirst) {
                row += '<td style="font-weight:700;text-align:right;line-height:1.6;vertical-align:top;padding-top:5px" rowspan="4">' +
                  '<div style="font-size:0.8rem;color:#166534">T: ' + (tot ? 'Rs.' + tot : '0') + '</div>' +
                  '<div style="font-size:0.75rem;color:#991b1b;margin-top:4px">B: Rs.' + balance + '</div>' +
                  '<div style="font-size:0.65rem;color:#475569;margin-top:4px">+Rs.' + DAIRY + ' (Other)</div>' +
                  (isAdm && ADM_FEE ? '<div style="font-size:0.65rem;color:#475569">+Rs.' + ADM_FEE + ' (Adm)</div>' : '') +
                  '</td>';
              }

              // New column: row total for this specific student and these specific 3 months
              row += '<td style="vertical-align:middle;text-align:center;font-weight:700;font-size:0.75rem;color:#0d1b3e">' + (rowTot ? 'Rs. ' + rowTot : '-') + '</td>';

              row += '</tr>';
              return row;
            };

            return renderRow(q1, true, false) + renderRow(q2, false, false) + renderRow(q3, false, false) + renderRow(q4, false, true);
          }).join('') +
          '</tbody><tfoot><tr>' +
          '<td colspan="13" style="background:#0d1b3e;color:#fff;font-weight:800;padding:12px;text-align:right;font-size:1.1rem">Total collected cash from class - Rs. ' + gt.toLocaleString('en-IN') + '</td>' +
          '</tr></tfoot></table></div></div>';
      } else if (view === 'monthly-report') {
        if (!month) { document.getElementById('printArea').innerHTML = '<p style="color:var(--muted);padding:20px">Please select a month.</p>'; return; }
        const fees = [..._fees].filter(f => f.month === month && String(f.year) === String(year));
        const grouped = {}; fees.forEach(f => { grouped[f.studentId] = f; });
        const gt = fees.reduce((s, f) => s + (f.amount || 0) + (f.busPaid ? f.busAmount || 0 : 0) + (f.otherPaid ? f.otherAmount || 0 : 0) + (f.admPaid ? f.admAmount || 0 : 0), 0);
        const paidCount = students.filter(s => grouped[s.id] && grouped[s.id].amount).length;
        document.getElementById('printArea').innerHTML = '<div class="print-card">' +
          '<div class="pr-hdr">' + hdr + '<h2>FEE REPORT: ' + month.toUpperCase() + ' ' + year + (cls ? ' | Class ' + cls : '') + '</h2>' +
          '<p>Generated: ' + new Date().toLocaleString('en-IN') + ' | Total: ' + students.length + ' | Tuition Paid: ' + paidCount + '</p></div>' +
          '<table class="pr-table"><thead><tr>' +
          '<th>Sr.</th><th>PEN</th><th>Student Name</th><th>Class</th><th>Father</th><th>Mobile</th><th>Bus</th>' +
          '<th>Tuition</th><th>T.Rec#</th><th>T.Time</th><th>Bus Amt</th><th>B.Rec#</th><th>B.Time</th>' +
          '<th>Other Amt</th><th>O.Rec#</th><th>O.Time</th>' +
          '</tr></thead><tbody>' +
          students.map(s => {
            const fe = grouped[s.id];
            return '<tr>' +
              '<td style="text-align:center">' + s.serial + '</td><td style="font-family:monospace;font-size:.68rem">' + (s.pen || '') + '</td>' +
              '<td><b>' + s.name + '</b></td><td style="text-align:center">' + (s.cls || '') + '</td>' +
              '<td>' + (s.father || '') + '</td><td>' + (s.mobile || '') + '</td><td style="text-align:center">' + (s.bus ? 'Y' : 'N') + '</td>' +
              '<td style="font-weight:700;color:' + (fe && fe.amount ? 'green' : 'red') + '">' + (fe && fe.amount ? 'Rs.' + fe.amount : 'UNPAID') + '</td>' +
              '<td style="font-family:monospace">' + (fe ? fe.receipt || '-' : '') + '</td>' +
              '<td style="font-size:.68rem;white-space:nowrap">' + (fe && fe.ts ? new Date(fe.ts).toLocaleString('en-IN') : '') + '</td>' +
              '<td style="font-weight:700;color:' + (fe && fe.busPaid ? '#1e40af' : '#aaa') + '">' + (s.bus ? (fe && fe.busPaid ? 'Rs.' + (fe.busAmount || 0) : 'UNPAID') : 'N/A') + '</td>' +
              '<td style="font-family:monospace">' + (fe && fe.busReceipt ? fe.busReceipt : '') + '</td>' +
              '<td style="font-size:.68rem;white-space:nowrap">' + (fe && fe.busPaidTs ? new Date(fe.busPaidTs).toLocaleString('en-IN') : '') + '</td>' +
              '<td style="font-weight:700;color:' + (fe && fe.otherPaid ? '#c2410c' : '#aaa') + '">' + (fe && fe.otherPaid ? 'Rs.' + fe.otherAmount : 'UNPAID') + '</td>' +
              '<td style="font-family:monospace">' + (fe && fe.otherReceipt ? fe.otherReceipt : '') + '</td>' +
              '<td style="font-size:.68rem;white-space:nowrap">' + (fe && fe.otherPaidTs ? new Date(fe.otherPaidTs).toLocaleString('en-IN') : '') + '</td>' +
              '</tr>';
          }).join('') +
          '</tbody><tfoot><tr><td colspan="7" style="text-align:right;font-weight:700;padding:8px">GRAND TOTAL</td>' +
          '<td colspan="9" style="font-weight:800;padding:8px">Rs.' + gt.toLocaleString('en-IN') + '</td></tr></tfoot></table></div>';
      } else {
        const fees = [..._fees];
        document.getElementById('printArea').innerHTML = students.map(s => {
          const f = calcFee(s);
          const sf = fees.filter(x => x.studentId === s.id);
          const tp = sf.reduce((x, fe) => x + (fe.amount || 0) + (fe.busPaid ? fe.busAmount || 0 : 0) + (fe.otherPaid ? fe.otherAmount || 0 : 0) + (fe.admPaid ? fe.admAmount || 0 : 0), 0);
          return '<div class="print-card" style="margin-bottom:18px">' + hdr +
            '<div style="display:flex;justify-content:space-between;padding:9px;background:#f8faff;border-radius:6px;margin:8px 0;border:1px solid #e2e8f0">' +
            '<div><div style="font-weight:800;font-size:.98rem">' + s.name + '</div>' +
            '<div style="font-size:.75rem;color:#555;margin-top:2px">PEN: ' + s.pen + ' | Class: ' + (s.cls || '-') + ' | Sr: ' + s.serial + '</div>' +
            '<div style="font-size:.75rem;color:#555">Father: ' + (s.father || '-') + ' | Mobile: ' + (s.mobile || '-') + '</div></div>' +
            '<div style="text-align:right">' +
            '<div style="font-size:1.25rem;font-weight:800;color:#1a7c4f">Rs.' + f.net + '</div>' +
            '<div style="font-size:.7rem;color:#888">' + (s.bus ? '&#128652; Bus Student' : '') + '</div>' +
            '<div style="font-size:.73rem;color:var(--teal);font-weight:700">Total Paid: Rs.' + tp.toLocaleString('en-IN') + '</div></div></div>' +
            '<table class="pr-table"><thead><tr>' +
            '<th>Month</th><th>Tuition Amt</th><th>T.Receipt</th><th>T.Date &amp; Time</th>' +
            (s.bus ? '<th style="background:#0e7490">Bus Amt</th><th style="background:#0e7490">B.Receipt</th><th style="background:#0e7490">B.Date &amp; Time</th>' : '') +
            '<th style="background:#c2410c">Other Amt</th><th style="background:#c2410c">O.Receipt</th><th style="background:#c2410c">O.Date &amp; Time</th>' +
            '<th style="background:#1a3a7c">Adm Amt</th><th style="background:#1a3a7c">A.Receipt</th><th style="background:#1a3a7c">A.Date &amp; Time</th>' +
            '</tr></thead><tbody>' +
            SCHOOL_MONTHS.map(m => {
              const fe = sf.find(x => x.month === m);
              return '<tr>' +
                '<td><b>' + m + '</b></td>' +
                '<td style="font-weight:700;color:' + (fe && fe.amount ? 'green' : '#ccc') + ';text-align:right">' + (fe && fe.amount ? 'Rs.' + fe.amount : '') + '</td>' +
                '<td style="font-family:monospace">' + (fe && fe.receipt ? fe.receipt : '') + '</td>' +
                '<td style="font-size:.69rem;white-space:nowrap">' + (fe && fe.ts ? new Date(fe.ts).toLocaleString('en-IN') : '') + '</td>' +
                (s.bus ? '<td style="font-weight:700;color:' + (fe && fe.busPaid ? '#1e40af' : '#ccc') + ';text-align:right">' + (fe && fe.busPaid ? 'Rs.' + (fe.busAmount || 0) : '') + '</td>' +
                  '<td style="font-family:monospace">' + (fe && fe.busReceipt ? fe.busReceipt : '') + '</td>' +
                  '<td style="font-size:.69rem;white-space:nowrap">' + (fe && fe.busPaidTs ? new Date(fe.busPaidTs).toLocaleString('en-IN') : '') + '</td>' : '') +
                '<td style="font-weight:700;color:' + (fe && fe.otherPaid ? '#c2410c' : '#ccc') + ';text-align:right">' + (fe && fe.otherPaid ? 'Rs.' + (fe.otherAmount || 0) : '') + '</td>' +
                '<td style="font-family:monospace">' + (fe && fe.otherReceipt ? fe.otherReceipt : '') + '</td>' +
                '<td style="font-size:.69rem;white-space:nowrap">' + (fe && fe.otherPaidTs ? new Date(fe.otherPaidTs).toLocaleString('en-IN') : '') + '</td>' +
                '<td style="font-weight:700;color:' + (fe && fe.admPaid ? '#1a3a7c' : '#ccc') + ';text-align:right">' + (fe && fe.admPaid ? 'Rs.' + (fe.admAmount || 0) : '') + '</td>' +
                '<td style="font-family:monospace">' + (fe && fe.admPaid ? fe.admReceipt : '') + '</td>' +
                '<td style="font-size:.69rem;white-space:nowrap">' + (fe && fe.admPaidTs ? new Date(fe.admPaidTs).toLocaleString('en-IN') : '') + '</td>' +
                '</tr>';
            }).join('') +
            '</tbody></table></div>';
        }).join('') || '<p style="color:var(--muted);padding:20px">No students to display.</p>';
      }
    }

    // ===== EXPORT CSV =====
    function exportCSV() {
      const students = [..._students].sort((a, b) => (Number(a.serial) || 0) - (Number(b.serial) || 0)), fees = [..._fees];
      const checkedCbs = Array.from(document.querySelectorAll('.pr-field-cb:checked'));
      const checkedKeys = checkedCbs.map(cb => cb.value);

      if (checkedKeys.length > 0 && checkedKeys.length < 17) {
        const selectedDefs = checkedKeys.map(k => ({ key: k, ...PRINT_FIELD_DEFS[k] })).filter(d => d.label);
        const hdr = selectedDefs.map(d => d.label);
        const rows = students.map((s, idx) => {
          return selectedDefs.map(d => {
            let val = d.getVal ? d.getVal(s, idx) : (s[d.key] || '');
            val = String(val).replace(/<[^>]*>?/gm, '');
            return '"' + val.replace(/"/g, '""') + '"';
          }).join(',');
        });
        const csv = [hdr.join(','), ...rows].join('\r\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'custom_students_' + new Date().toISOString().slice(0, 10) + '.csv'; a.click();
        URL.revokeObjectURL(url); toast('Custom CSV exported!');
        return;
      }

      const hdr = ['Sr', 'PEN', 'Name', 'Father', 'Mother', 'DOB', 'Class', 'Address', 'Mobile', 'Stu.Aadhar', 'Birth Cert', 'Father Aadhar', 'Mother Aadhar', 'Bus', 'Fee/mo', 'Adm.Yr', 'Tuition Months', 'Total Tuition', 'Bus Months', 'Total Bus', 'Other Months', 'Total Other', 'Admission Paid', 'Total Admission'];
      const rows = students.map(s => {
        const f = calcFee(s), sf = fees.filter(x => x.studentId === s.id);
        const tP = sf.filter(x => x.amount && x.receipt).length, tA = sf.reduce((x, fe) => x + (fe.amount || 0), 0);
        const bP = sf.filter(x => x.busPaid).length, bA = sf.filter(x => x.busPaid).reduce((x, fe) => x + (fe.busAmount || 0), 0);
        const oP = sf.filter(x => x.otherPaid).length, oA = sf.filter(x => x.otherPaid).reduce((x, fe) => x + (fe.otherAmount || 0), 0);
        const aP = sf.filter(x => x.admPaid).length ? 'Yes' : 'No', aA = sf.filter(x => x.admPaid).reduce((x, fe) => x + (fe.admAmount || 0), 0);
        return [s.serial, s.pen, s.name, s.father, s.mother, s.dob ? new Date(s.dob).toLocaleDateString('en-IN') : '',
        s.cls, s.address, s.mobile, s.aadhar, s.birthCert, s.fatherAadhar, s.motherAadhar,
        s.bus ? 'Yes' : 'No', f.net, s.admYear, tP, tA, bP, bA, oP, oA, aP, aA
        ].map(v => '"' + (v || '').toString().replace(/"/g, '""') + '"').join(',');
      });
      const csv = [hdr.join(','), ...rows].join('\r\n');
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'students_' + new Date().toISOString().slice(0, 10) + '.csv'; a.click();
      URL.revokeObjectURL(url); toast('CSV exported!');
    }


    function downloadPDF(forcedOrientation = 'portrait') {
      const element = document.getElementById("printArea");
      if (!element || !element.innerHTML.trim()) { toast("Nothing to download!"); return; }

      toast("Generating PDF... Please wait.");

      // --- Step 1: Clone the element completely ---
      const clone = element.cloneNode(true);

      // Place clone securely behind other elements but at 0,0 so html2canvas captures it perfectly
      Object.assign(clone.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: Math.max(element.scrollWidth, 800) + 'px',
        height: 'auto',
        overflow: 'visible',
        background: '#fff',
        margin: '0',
        padding: '16px',
        boxSizing: 'border-box',
        zIndex: '-9999'
      });
      document.body.appendChild(clone);

      // --- Step 2: Measure the clone AFTER it is in the DOM ---
      // (scrollWidth/Height are accurate only when the element is attached)
      const captureW = clone.scrollWidth;
      const captureH = clone.scrollHeight;

      // --- Step 3: Allow a small delay so images / fonts finish rendering ---
      setTimeout(() => {
        html2canvas(clone, {
          scale: 2,        // 2Ã— for crisp text
          useCORS: true,
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          width: captureW,
          height: captureH,
          windowWidth: captureW,
          windowHeight: captureH,
          logging: false,
          backgroundColor: '#ffffff'
        }).then(canvas => {
          // Safe cleanup
          if (clone.parentNode) clone.parentNode.removeChild(clone);

          const imgData = canvas.toDataURL('image/jpeg', 0.98);
          const { jsPDF } = window.jspdf;

          const SCALE = 2;
          const pdfW = (canvas.width / SCALE);
          const pdfH = (canvas.height / SCALE);

          const pdf = new jsPDF({
            orientation: forcedOrientation,
            unit: 'pt',
            format: 'a4'
          });

          const a4Width = pdf.internal.pageSize.getWidth();
          const a4Height = pdf.internal.pageSize.getHeight();

          const margin = 20; // 20pt margin
          const maxWidth = a4Width - (margin * 2);
          const maxHeight = a4Height - (margin * 2);

          const ratio = Math.min(maxWidth / pdfW, maxHeight / pdfH);
          const scaledW = pdfW * ratio;
          const scaledH = pdfH * ratio;

          // Center horizontally, stick to top margin
          const x = (a4Width - scaledW) / 2;
          const y = margin;

          pdf.addImage(imgData, 'JPEG', x, y, scaledW, scaledH);
          
          const prView = document.getElementById('prView').value;
          const fileName = prView === 'gate-pass' ? 'Gate_Pass.pdf' : 'PMS_Fee_Report.pdf';
          
          pdf.save(fileName);
          toast('PDF Downloaded!', 'success');

        }).catch(err => {
          if (clone.parentNode) clone.parentNode.removeChild(clone);
          toast('PDF Error: ' + err.message, 'error');
        });

      }, 500); // 500 ms â€” gives complex rowspan tables time to fully paint
    }


    // ===== MODAL =====

    function openModal(id) { document.getElementById(id).classList.add('open') }
    function closeModal(id) { document.getElementById(id).classList.remove('open') }
    document.querySelectorAll('.modal-overlay').forEach(el => {
      el.addEventListener('click', function (e) { if (e.target === this) closeModal(this.id); });
    });

    // ===== GATE PASS =====
    function openGatePassModal(id) {
      const s = _students.find(x => x.id === id);
      if (!s) return;
      document.getElementById('gpStudentId').value = s.id;
      document.getElementById('gpStudentName').textContent = s.name;
      document.getElementById('gpPickup').value = '';
      document.getElementById('gpDrop').value = '';
      document.getElementById('gpDriver').value = '';
      document.getElementById('gpVehicle').value = '';
      openModal('gatePassModal');
    }

    async function generateGatePass() {
      const id = document.getElementById('gpStudentId').value;
      const s = _students.find(x => x.id === id);
      if (!s) return;

      const pickup = document.getElementById('gpPickup').value.trim() || '-';
      const drop = document.getElementById('gpDrop').value.trim() || '-';
      const driver = document.getElementById('gpDriver').value.trim() || '-';
      const vehicle = document.getElementById('gpVehicle').value.trim() || '-';

      closeModal('gatePassModal');
      
      const passNo = 'PMS-' + (s.pen || Date.now().toString().slice(-7));

      const gp = {
        id: uid(),
        studentId: s.id,
        studentName: s.name,
        pen: s.pen,
        cls: s.cls,
        father: s.father,
        pickup,
        drop,
        driver,
        vehicle,
        passNo,
        ts: Date.now()
      };
      
      try {
        await fsAddGatePass(gp);
        _gatepasses.push(gp);
        toast('Gate Pass generated & saved!');
        renderGatePasses();
        printOldGatePass(gp.id);
      } catch(err) {
        toast('Error saving gate pass: ' + err.message, 'error');
      }
    }

    function renderGatePasses() {
      const q = (document.getElementById('gpSearch')?.value || '').toLowerCase();
      const filtered = _gatepasses.filter(gp => {
        return !q || gp.passNo.toLowerCase().includes(q) || gp.studentName.toLowerCase().includes(q) || (gp.pen && gp.pen.toLowerCase().includes(q));
      }).sort((a, b) => b.ts - a.ts);
      
      document.getElementById('gatePassBody').innerHTML = filtered.map(gp => {
        return '<tr>' +
          '<td style="white-space:nowrap;font-size:.76rem">' + new Date(gp.ts).toLocaleString('en-IN') + '</td>' +
          '<td><b>' + gp.passNo + '</b></td>' +
          '<td><b>' + gp.studentName + '</b><br><span style="font-size:.7rem;color:var(--muted)">PEN: ' + (gp.pen || '-') + '</span></td>' +
          '<td><span class="badge-cls">' + (gp.cls || '-') + '</span></td>' +
          '<td>' + gp.pickup + '</td>' +
          '<td>' + gp.drop + '</td>' +
          '<td>' + gp.driver + '</td>' +
          '<td>' + gp.vehicle + '</td>' +
          '<td><div style="display:flex;gap:4px">' +
          '<button class="btn btn-sm btn-gold" onclick="printOldGatePass(\'' + gp.id + '\')">Print</button>' +
          '<button class="btn btn-sm btn-danger" onclick="deleteGatePass(\'' + gp.id + '\')">Del</button>' +
          '</div></td>' +
          '</tr>';
      }).join('') || '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:22px">No gate passes found.</td></tr>';
    }

    async function deleteGatePass(id) {
      if (!confirm('Are you sure you want to delete this gate pass history?')) return;
      try {
        await fsDeleteGatePass(id);
        _gatepasses = _gatepasses.filter(g => g.id !== id);
        toast('Gate Pass deleted.');
        renderGatePasses();
      } catch (err) {
        toast('Error deleting gate pass: ' + err.message, 'error');
      }
    }

    function printOldGatePass(id) {
      const gp = _gatepasses.find(g => g.id === id);
      if (!gp) return;
      showPanel('print');
      
      const copies = ['Office Copy', 'Gate Copy', 'Parent Copy'];
      // Use flex row, gap 10px, to fit exactly 3 in a row
      let html = '<div class="print-card" style="display:flex;flex-wrap:wrap;justify-content:center;gap:15px;padding:10px 0;">';
      
      copies.forEach(copyName => {
        html += '<div style="width:31%;max-width:250px;border:1px solid #000;padding:8px;font-family:Arial,sans-serif;background:#fff;position:relative;box-sizing:border-box;">' +
          '<div style="text-align:center;font-size:0.6rem;font-weight:bold;margin-bottom:4px;border:1px solid #000;display:inline-block;padding:1px 6px;border-radius:3px;">' + copyName + '</div>' +
          '<div style="text-align:center;border-bottom:1px solid #000;padding-bottom:4px;margin-bottom:8px;">' +
          '<h2 style="margin:0;font-size:0.85rem;font-weight:800;color:#000;">POLICE MODERN SCHOOL</h2>' +
          '<p style="margin:2px 0 0;font-size:.65rem;font-weight:600;color:#333;">25th BN PAC, Raebareli</p>' +
          '<h3 style="margin:6px 0 0;text-decoration:underline;font-size:0.75rem;color:#000;">GATE PASS</h3>' +
          '</div>' +
          '<table style="width:100%;border-collapse:collapse;font-size:.65rem;color:#000;line-height:1.3;">' +
          '<tr><td style="padding:2px 0;font-weight:bold;width:40%;">Student Name</td><td style="padding:2px 0;">: ' + gp.studentName + '</td></tr>' +
          '<tr><td style="padding:2px 0;font-weight:bold;">Class & Sec</td><td style="padding:2px 0;">: ' + (gp.cls || '-') + '</td></tr>' +
          '<tr><td style="padding:2px 0;font-weight:bold;">Father\'s Name</td><td style="padding:2px 0;">: ' + (gp.father || '-') + '</td></tr>' +
          '<tr><td style="padding:2px 0;font-weight:bold;">Pickup Point</td><td style="padding:2px 0;">: ' + gp.pickup + '</td></tr>' +
          '<tr><td style="padding:2px 0;font-weight:bold;">Drop Point</td><td style="padding:2px 0;">: ' + gp.drop + '</td></tr>' +
          '<tr><td style="padding:2px 0;font-weight:bold;">Driver Name</td><td style="padding:2px 0;">: ' + gp.driver + '</td></tr>' +
          '<tr><td style="padding:2px 0;font-weight:bold;">Vehicle No.</td><td style="padding:2px 0;">: ' + gp.vehicle + '</td></tr>' +
          '</table>' +
          '<div style="margin-top:15px;display:flex;justify-content:space-between;align-items:flex-end;font-size:.6rem;color:#000;">' +
          '<span style="font-weight:bold;">Pass No: ' + gp.passNo + '</span>' +
          '<span style="border-top:1px solid #000;padding-top:2px;width:70px;text-align:center;">Auth. Sign.</span>' +
          '</div>' +
          '</div>';
      });
      
      html += '</div>';
      
      document.getElementById('prView').value = 'gate-pass';
      document.getElementById('printArea').innerHTML = html;
    }

    // ===== RECYCLE BIN / TRASH =====
    function renderTrash() {
      const body = document.getElementById('trashTableBody');
      const countNav = document.getElementById('trashCountNav');
      const countStudents = document.getElementById('trashCountStudents');
      const count = _trashStudents.length;
      if (countNav) countNav.textContent = count;
      if (countStudents) countStudents.textContent = count;

      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const now = Date.now();

      body.innerHTML = _trashStudents.map((s, idx) => {
        const elapsed = now - s.deletedAt;
        const daysLeft = Math.max(0, Math.ceil((thirtyDays - elapsed) / (24 * 60 * 60 * 1000)));
        const delDate = new Date(s.deletedAt).toLocaleDateString('en-IN') + ' ' + new Date(s.deletedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        return '<tr>' +
          '<td>' + (idx + 1) + '</td>' +
          '<td>' + (s.pen || '-') + '</td>' +
          '<td><b>' + s.name + '</b></td>' +
          '<td><span class="badge-cls">' + (s.cls || '-') + '</span></td>' +
          '<td>' + delDate + '</td>' +
          '<td style="color:var(--red);font-weight:600">' + daysLeft + ' days</td>' +
          '<td><div style="display:flex;gap:6px">' +
          '<button class="btn btn-sm btn-outline" onclick="restoreStudent(\'' + s.id + '\')" style="color:var(--green);border-color:var(--green)">Restore</button>' +
          '<button class="btn btn-sm btn-danger" onclick="hardDeleteStudent(\'' + s.id + '\')">Delete Permanently</button>' +
          '</div></td>' +
          '</tr>';
      }).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:22px">Recycle Bin is empty.</td></tr>';
    }
    async function restoreStudent(id) {
      if (!confirm('Are you sure you want to restore this student?')) return;
      const idx = _trashStudents.findIndex(s => s.id === id);
      if (idx >= 0) {
        const student = _trashStudents[idx];
        delete student.deleted;
        delete student.deletedAt;
        showSaving(true);
        try {
          await setDoc(doc(db, 'students', id), sanitize(student));
          toast('Student restored successfully!');
          await loadData();
          showPanel('students');
        } catch (e) {
          toast('Error restoring student: ' + e.message, 'error');
        } finally {
          showSaving(false);
        }
      }
    }
    async function hardDeleteStudent(id) {
      if (!confirm('This will permanently delete the student and ALL their fee records. This action CANNOT be undone. Are you sure?')) return;
      try {
        await fsDeleteStudent(id);
        toast('Student permanently deleted.');
        await loadData();
        renderTrash();
      } catch (e) {
        toast('Error deleting student: ' + e.message, 'error');
      }
    }

    // ===== DATA LOAD =====
    async function loadData() {
      showLoader(true, 'Loading student data...');
      try {
        const [stuSnap, feeSnap, gpSnap] = await Promise.all([
          getDocs(collection(db, 'students')),
          getDocs(collection(db, 'fees')),
          getDocs(collection(db, 'gatepasses'))
        ]);
        const allStu = stuSnap.docs.map(d => {
          const data = d.data();
          const rawCls = data.cls || data.class || '';
          const cls = normalizeClassName(rawCls);
          return { ...data, cls, id: d.id };
        });
        const allFees = feeSnap.docs.map(d => ({ ...d.data(), id: d.id }));
        _gatepasses = gpSnap ? gpSnap.docs.map(d => ({ ...d.data(), id: d.id })) : [];

        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const now = Date.now();

        _students = allStu.filter(s => !s.deleted);

        // Sort students by existing numeric serial, fallback to creation time
        _students.sort((a, b) => {
          const sA = typeof a.serial === 'number' && !isNaN(a.serial) && a.serial > 0 ? a.serial : Infinity;
          const sB = typeof b.serial === 'number' && !isNaN(b.serial) && b.serial > 0 ? b.serial : Infinity;
          if (sA !== sB) return sA - sB;
          return (a.createdAt || 0) - (b.createdAt || 0);
        });

        // Auto-fix missing, invalid, or duplicate serial numbers
        const usedSerials = new Set();
        let needsFix = false;
        for (let s of _students) {
          if (typeof s.serial !== 'number' || isNaN(s.serial) || s.serial <= 0 || usedSerials.has(s.serial)) {
            needsFix = true;
            break;
          }
          usedSerials.add(s.serial);
        }

        if (needsFix && _students.length > 0) {
          const batch = writeBatch(db);
          _students.forEach((s, idx) => {
            const correctSn = idx + 1;
            if (s.serial !== correctSn) {
              s.serial = correctSn;
              batch.set(doc(db, 'students', s.id), { serial: correctSn }, { merge: true });
            }
          });
          batch.commit().catch(e => console.error('Auto serial update error:', e));
        }

        _fees = allFees.filter(f => _students.some(s => s.id === f.studentId));
        _trashStudents = allStu.filter(s => s.deleted && (now - s.deletedAt) <= thirtyDays);

        const countNav = document.getElementById('trashCountNav');
        const countStudents = document.getElementById('trashCountStudents');
        if (countNav) countNav.textContent = _trashStudents.length;
        if (countStudents) countStudents.textContent = _trashStudents.length;

        // Auto-delete expired trash in background
        const expired = allStu.filter(s => s.deleted && (now - s.deletedAt) > thirtyDays);
        if (expired.length > 0) {
          const batch = writeBatch(db);
          expired.forEach(s => {
            batch.delete(doc(db, 'students', s.id));
            const sFees = allFees.filter(f => f.studentId === s.id);
            sFees.forEach(f => batch.delete(doc(db, 'fees', f.id)));
          });
          batch.commit().then(() => console.log('Permanently deleted ' + expired.length + ' expired student records.'));
        }

        showLoader(false);
        renderDash();
        renderFeeChart();
        document.getElementById('prYear').value = new Date().getFullYear();
      } catch (err) {
        document.querySelector('#appLoader .lm').innerHTML = 'Error: ' + err.message + '<br><button class="btn btn-sm btn-outline" style="margin-top:10px" onclick="window.location.reload()">Retry</button>';
        document.querySelector('#appLoader .lm').style.color = '#fca5a5';
      }
    }

    // ===== EXPOSE TO WINDOW (for HTML onclick) =====
    window.showPanel = showPanel; window.renderStudents = renderStudents; window.exportCSV = exportCSV; window.renderFeeHistory = renderFeeHistory;
    window.openModal = openModal; window.closeModal = closeModal; window.viewStudent = viewStudent;
    window.editStudent = editStudent; window.delStudent = delStudent; window.openFeeFor = openFeeFor;
    window.fcFilter = fcFilter; window.selectStudent = selectStudent; window.renderFcStudents = renderFcStudents;
    window.toggleTuition = toggleTuition; window.saveTuition = saveTuition; window.unmarkTuition = unmarkTuition; window.editTuition = editTuition;
    window.toggleBus = toggleBus; window.saveBus = saveBus; window.unmarkBus = unmarkBus; window.editBus = editBus;
    window.renderPrint = renderPrint; window.downloadPDF = downloadPDF; window.fmtAadhar = fmtAadhar; window.busToggle = busToggle; window.selfTransportToggle = selfTransportToggle;
    window.togglePrintFieldsBox = togglePrintFieldsBox; window.setPrintFields = setPrintFields;
    window.updateFeePreview = updateFeePreview; window.resetForm = resetForm; window.clearErr = clearErr;
    window.logout = logout; window.checkSiblingDisc = checkSiblingDisc; window.renderSiblingList = renderSiblingList;
    window.resetPrintFilters = resetPrintFilters; window.saveField = saveField; window.saveRemark = (id, val) => saveField(id, 'remark', val);
    window.openTrashModal = function () { showPanel('trash'); }; window.renderTrash = renderTrash;
    window.restoreStudent = restoreStudent; window.hardDeleteStudent = hardDeleteStudent;
    window.renderOtherChargesCard = renderOtherChargesCard; window.toggleOtherCard = toggleOtherCard; window.saveOtherCard = saveOtherCard; window.unmarkOtherCard = unmarkOtherCard; window.editOtherCard = editOtherCard;
    window.renderAdmFeeCard = renderAdmFeeCard; window.toggleAdmCard = toggleAdmCard; window.saveAdmCard = saveAdmCard; window.unmarkAdmCard = unmarkAdmCard; window.editAdmCard = editAdmCard;
    window.openGatePassModal = openGatePassModal; window.generateGatePass = generateGatePass;
    window.renderGatePasses = renderGatePasses; window.printOldGatePass = printOldGatePass; window.deleteGatePass = deleteGatePass;
