/**
 * POLICE MODERN SCHOOL, 25th BN PAC RAEBARELI
 * Medical Stock Register & Student Distribution Management System
 * Cloud Firestore Live Sync (Using Authorized Students Collection Store)
 * Received from: 25th Bn PAC Battalion Hospital
 * Incharge / Receiver: Sanjeev Kumar (190511502) PMS
 */

// Initial Default Medicine Inventory from PAC Hospital Receipt (77 Pcs)
const DEFAULT_MEDICINES = [
    {
        id: "med_1",
        num: 1,
        nameHi: "टूथ पेस्ट",
        nameEn: "Toothpaste (Oral Hygiene)",
        purpose: "दांतों की सफाई के लिए",
        unit: "पीस",
        initialStock: 35,
        receivedFrom: "25वीं वाहिनी पीएसी चिकित्सालय",
        receivedDate: "2026-08-27",
        icon: "fa-tooth"
    },
    {
        id: "med_2",
        num: 2,
        nameHi: "कैल्सीज्वाइट ड्राप",
        nameEn: "Calcijoint Drops (Pediatric)",
        purpose: "हड्डियों को मजबूत करने के लिए",
        unit: "पीस",
        initialStock: 7,
        receivedFrom: "25वीं वाहिनी पीएसी चिकित्सालय",
        receivedDate: "2026-08-27",
        icon: "fa-bone"
    },
    {
        id: "med_3",
        num: 3,
        nameHi: "एपटीबूस्ट ड्राप",
        nameEn: "Aptiboost Appetite Drops",
        purpose: "भूख बढ़ाने के लिए",
        unit: "पीस",
        initialStock: 7,
        receivedFrom: "25वीं वाहिनी पीएसी चिकित्सालय",
        receivedDate: "2026-08-27",
        icon: "fa-utensils"
    },
    {
        id: "med_4",
        num: 4,
        nameHi: "एच०बी० फोर्ट ड्राप",
        nameEn: "HB Forte Drops (Iron & Energy)",
        purpose: "ताकत एवं हीमोग्लोबिन के लिए",
        unit: "पीस",
        initialStock: 5,
        receivedFrom: "25वीं वाहिनी पीएसी चिकित्सालय",
        receivedDate: "2026-08-27",
        icon: "fa-heart-pulse"
    },
    {
        id: "med_5",
        num: 5,
        nameHi: "कैल्शियम का सिरप",
        nameEn: "Calcium Suspension / Syrup",
        purpose: "हड्डियों व शारीरिक विकास के लिए",
        unit: "पीस",
        initialStock: 23,
        receivedFrom: "25वीं वाहिनी पीएसी चिकित्सालय",
        receivedDate: "2026-08-27",
        icon: "fa-prescription-bottle-medical"
    }
];

// Standard Class Order
const ORDERED_CLASSES = [
    'Nursery', 'LKG', 'UKG', 'KG-1', 'KG-2',
    'Class 1', 'Class 2', 'Class 3', 'Class 4',
    'Class 5', 'Class 6', 'Class 7', 'Class 8',
    'Staff'
];

// App State
let medicines = JSON.parse(JSON.stringify(DEFAULT_MEDICINES));
let distributionLog = [];
let studentsList = [];
let selectedStudent = null;
let currentViewMode = "dashboard"; // "dashboard", "matrix", or "voucher"
let matrixClassFilter = "ALL";
let selectedStudentIds = new Set();

// Firebase Service State
const MedFirebase = {
    db: null,
    auth: null,
    currentUser: null,
    isInitialized: false,
    unsubscribeStudents: null,

    credentials: {
        email: "sathyauppolice74@gmail.com",
        pass: "123456"
    },

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

    normalizeClassName(rawClass) {
        if (!rawClass) return 'Class 1';
        let str = String(rawClass).trim().toUpperCase();
        if (str.includes('NURSERY')) return 'Nursery';
        if (str.includes('LKG')) return 'LKG';
        if (str.includes('UKG')) return 'UKG';
        if (str.includes('KG-1') || str.includes('KG 1') || str.includes('KG1') || str.includes('KG-I') || str === 'KGI') return 'KG-1';
        if (str.includes('KG-2') || str.includes('KG 2') || str.includes('KG2') || str.includes('KG-II') || str === 'KGII') return 'KG-2';
        if (str.includes('1ST') || str.includes('CLASS 1') || str.includes('CLASS-1') || str === '1' || str === 'I') return 'Class 1';
        if (str.includes('2ND') || str.includes('CLASS 2') || str.includes('CLASS-2') || str === '2' || str === 'II') return 'Class 2';
        if (str.includes('3RD') || str.includes('CLASS 3') || str.includes('CLASS-3') || str === '3' || str === 'III') return 'Class 3';
        if (str.includes('4TH') || str.includes('CLASS 4') || str.includes('CLASS-4') || str === '4' || str === 'IV') return 'Class 4';
        if (str.includes('5TH') || str.includes('CLASS 5') || str.includes('CLASS-5') || str === '5' || str === 'V') return 'Class 5';
        if (str.includes('6TH') || str.includes('CLASS 6') || str.includes('CLASS-6') || str === '6' || str === 'VI') return 'Class 6';
        if (str.includes('7TH') || str.includes('CLASS 7') || str.includes('CLASS-7') || str === '7' || str === 'VII') return 'Class 7';
        if (str.includes('8TH') || str.includes('CLASS 8') || str.includes('CLASS-8') || str === '8' || str === 'VIII') return 'Class 8';
        if (str.includes('STAFF')) return 'Staff';

        const anyDigit = str.match(/[1-8]/);
        if (anyDigit) return 'Class ' + anyDigit[0];
        return String(rawClass).trim();
    },

    updateStatusBadge(status, text) {
        const badge = document.getElementById("firebase-status-badge");
        const syncText = document.getElementById("cloud-sync-text");
        if (!badge) return;

        badge.className = `status-badge-cloud ${status}`;
        badge.innerHTML = `<span class="live-dot"></span> ${text}`;
        if (syncText) {
            syncText.textContent = status === 'connected' ? `Firestore Live Sync (${studentsList.length} Students)` : text;
        }
    },

    async init() {
        if (typeof firebase === 'undefined') {
            console.warn("Firebase SDK not loaded, running in local mode.");
            this.updateStatusBadge("error", "Offline Mode (Local Storage)");
            loadLocalFallback();
            renderAll();
            return;
        }

        try {
            this.updateStatusBadge("connecting", "Connecting to Cloud Firestore...");
            if (!firebase.apps.length) {
                firebase.initializeApp(this.config);
            }

            this.db = firebase.firestore();
            this.auth = firebase.auth();

            this.auth.onAuthStateChanged(async (user) => {
                if (user && user.email === this.credentials.email) {
                    this.currentUser = user;
                    await this.setupListeners();
                } else {
                    await this.autoLogin();
                }
            });

            this.isInitialized = true;
        } catch (e) {
            console.error("Firebase init failed:", e);
            this.updateStatusBadge("error", "Local Mode");
            loadLocalFallback();
            renderAll();
        }
    },

    async autoLogin() {
        try {
            const res = await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.pass);
            this.currentUser = res.user;
            await this.setupListeners();
        } catch (err) {
            try {
                const anon = await this.auth.signInAnonymously();
                this.currentUser = anon.user;
                await this.setupListeners();
            } catch (anonErr) {
                console.warn("Anonymous auth fallback:", anonErr.message);
                this.updateStatusBadge("error", "Local Mode");
                loadLocalFallback();
                renderAll();
            }
        }
    },

    async setupListeners() {
        if (!this.db) return;

        // Listen to the authorized 'students' collection (pure READ)
        if (this.unsubscribeStudents) this.unsubscribeStudents();
        this.unsubscribeStudents = this.db.collection("students").onSnapshot((snapshot) => {
            const studentItems = [];
            const allDisps = [];

            snapshot.forEach(doc => {
                const data = doc.data();

                // Skip special system documents if any
                if (doc.id.startsWith("SYSTEM_") || doc.id.startsWith("PMS_MEDICINE")) {
                    return;
                }

                const rawClass = data.cls || data.className || data.class || data.std || data.standard || data.grade || 'Class 1';
                const formattedClass = this.normalizeClassName(rawClass);
                const fatherName = data.father || data.fatherName || data.FatherName || data.guardianName || '';
                const admNo = data.pen || data.admissionNo || data.id || ('ADM-' + doc.id.substring(0, 6));

                let studentName = data.name || data.studentName || data.student_name;
                if (!studentName || studentName.trim() === '') {
                    studentName = fatherName ? `Ward of ${fatherName}` : `Student (${admNo})`;
                }

                const studentDists = Array.isArray(data.medicineDists) ? data.medicineDists : [];
                studentDists.forEach(d => allDisps.push(d));

                studentItems.push({
                    id: doc.id,
                    admissionNo: String(admNo),
                    name: String(studentName).trim(),
                    className: formattedClass,
                    section: data.section || 'A',
                    fatherName: String(fatherName).trim(),
                    mobile: data.mobile || data.guardianMobile || data.phone || '',
                    medicineDists: studentDists
                });
            });

            // Also load any local dispensations stored in localStorage
            try {
                const localExtra = JSON.parse(localStorage.getItem("PMS_MEDICINE_EXTRA_LOGS") || "[]");
                localExtra.forEach(d => {
                    if (!allDisps.some(x => x.id === d.id)) {
                        allDisps.push(d);
                    }
                });
            } catch (e) {}

            // Sort students by class order then name
            studentItems.sort((a, b) => {
                const idxA = ORDERED_CLASSES.indexOf(a.className);
                const idxB = ORDERED_CLASSES.indexOf(b.className);
                if (idxA !== -idxB) {
                    if (idxA === -1) return 1;
                    if (idxB === -1) return -1;
                    if (idxA !== idxB) return idxA - idxB;
                }
                return a.name.localeCompare(b.name);
            });

            // Sort distributions chronologically descending
            allDisps.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

            studentsList = studentItems;
            distributionLog = allDisps;

            saveLocalCache();

            const statStudents = document.getElementById("stat-students-synced");
            if (statStudents) statStudents.textContent = `${studentsList.length} छात्र पंजीकृत (Firestore Live)`;
            this.updateStatusBadge("connected", `Live Firestore (${studentsList.length} Students)`);

            renderAll();
        }, (err) => {
            console.warn("Students live listener warning:", err.message);
            this.updateStatusBadge("error", "Local Mode");
            loadLocalFallback();
            renderAll();
        });
    }
};

// Initialize App on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    loadLocalFallback();
    renderAll();
    setupEventListeners();
    setupStudentAutocomplete();
    MedFirebase.init();
});

// LocalStorage Handlers
function loadLocalFallback() {
    try {
        const savedMeds = localStorage.getItem("PMS_MEDICINES_STOCK");
        const savedLogs = localStorage.getItem("PMS_MEDICINE_DISTRIBUTION_LOG");
        medicines = savedMeds ? JSON.parse(savedMeds) : JSON.parse(JSON.stringify(DEFAULT_MEDICINES));
        distributionLog = savedLogs ? JSON.parse(savedLogs) : [];
    } catch (e) {
        medicines = JSON.parse(JSON.stringify(DEFAULT_MEDICINES));
        distributionLog = [];
    }
}

function saveLocalCache() {
    try {
        localStorage.setItem("PMS_MEDICINES_STOCK", JSON.stringify(medicines));
        localStorage.setItem("PMS_MEDICINE_DISTRIBUTION_LOG", JSON.stringify(distributionLog));
    } catch (e) { }
}

// Calculate Total Stats
function getStats() {
    let totalReceived = 0;
    let totalDistributed = 0;
    let totalAvailable = 0;

    medicines.forEach(m => {
        totalReceived += (Number(m.initialStock) || 0);
    });

    distributionLog.forEach(log => {
        totalDistributed += (Number(log.quantity) || 0);
    });

    totalAvailable = Math.max(0, totalReceived - totalDistributed);

    return {
        totalReceived,
        totalDistributed,
        totalAvailable,
        totalItems: medicines.length
    };
}

// Calculate available quantity for a single medicine
function getMedicineStock(medId) {
    const med = medicines.find(m => m.id === medId);
    if (!med) return { received: 0, distributed: 0, available: 0 };

    let distributed = 0;
    distributionLog.forEach(log => {
        if (log.medicineId === medId) {
            distributed += (Number(log.quantity) || 0);
        }
    });

    const received = Number(med.initialStock) || 0;
    const available = Math.max(0, received - distributed);

    return { received, distributed, available };
}

// View Switcher (Dashboard vs Student Matrix vs Official Stock Voucher vs Student Distribution Report)
window.switchViewMode = function (mode) {
    currentViewMode = mode;
    const dashContainer = document.getElementById("dashboard-view-container");
    const matrixContainer = document.getElementById("matrix-view-container");
    const voucherContainer = document.getElementById("voucher-view-container");
    const distReportContainer = document.getElementById("dist-report-view-container");

    const btnDash = document.getElementById("btn-tab-dashboard");
    const btnMatrix = document.getElementById("btn-tab-matrix");
    const btnVoucher = document.getElementById("btn-tab-voucher");
    const btnDistReport = document.getElementById("btn-tab-dist-report");

    if (dashContainer) dashContainer.style.display = mode === "dashboard" ? "block" : "none";
    if (matrixContainer) matrixContainer.style.display = mode === "matrix" ? "block" : "none";
    if (voucherContainer) voucherContainer.style.display = mode === "voucher" ? "block" : "none";
    if (distReportContainer) distReportContainer.style.display = mode === "dist-report" ? "block" : "none";

    if (btnDash) btnDash.classList.toggle("active", mode === "dashboard");
    if (btnMatrix) btnMatrix.classList.toggle("active", mode === "matrix");
    if (btnVoucher) btnVoucher.classList.toggle("active", mode === "voucher");
    if (btnDistReport) btnDistReport.classList.toggle("active", mode === "dist-report");

    if (mode === "voucher") {
        renderVoucherTable();
    } else if (mode === "matrix") {
        renderMatrixView();
    } else if (mode === "dist-report") {
        populateReportFilters();
        renderDistributionReport();
    }
};

// Render Everything
function renderAll() {
    renderStats();
    renderMedicineCards();
    renderDistributionTable();
    renderMatrixView();
    renderVoucherTable();
    renderDistributionReport();
    populateMedicineSelect();
    populateStockExistingSelect();
    populateMatrixMedicineFilters();
    populateReportFilters();
}

// Render Top Stat Cards
function renderStats() {
    const stats = getStats();
    const statTotal = document.getElementById("stat-total-stock");
    const statAvail = document.getElementById("stat-available-stock");
    const statDist = document.getElementById("stat-distributed-stock");
    const statCategories = document.getElementById("stat-medicine-types");
    const voucherPcs = document.getElementById("voucher-total-stock-pcs");

    if (statTotal) statTotal.textContent = `${stats.totalReceived} पीस`;
    if (statAvail) statAvail.textContent = `${stats.totalAvailable} पीस`;
    if (statDist) statDist.textContent = `${stats.totalDistributed} पीस`;
    if (statCategories) statCategories.textContent = `${stats.totalItems} औषधियां`;
    if (voucherPcs) voucherPcs.textContent = `${stats.totalReceived} पीस`;
}

// Render Medicine Stock Cards
function renderMedicineCards() {
    const grid = document.getElementById("medicines-grid");
    if (!grid) return;

    grid.innerHTML = "";

    medicines.forEach(med => {
        const stock = getMedicineStock(med.id);
        const percent = stock.received > 0 ? Math.round((stock.available / stock.received) * 100) : 0;
        const stockState = stock.available === 0 ? 'out' : (stock.available <= 2 ? 'low' : (stock.available <= 5 ? 'warning' : 'healthy'));

        const card = document.createElement("div");
        card.className = `med-card stock-${stockState}`;
        card.innerHTML = `
            <div>
                <div class="med-card-header">
                    <div>
                        <div class="med-name-hi">${med.nameHi}</div>
                        <div class="med-name-en">${med.nameEn || ''}</div>
                    </div>
                    <div class="med-num-badge">${med.num || '#'}</div>
                </div>

                <div class="med-purpose-tag">
                    <i class="fas fa-notes-medical text-sky-600"></i> ${med.purpose || 'सामान्य उपयोग'}
                </div>

                <div class="stock-meter">
                    <div class="stock-meter-top">
                        <span>उपलब्ध स्टॉक</span>
                        <strong>${stock.available} / ${stock.received} ${med.unit || 'पीस'}</strong>
                    </div>
                    <div class="stock-track">
                        <div class="stock-fill stock-${stockState}" style="width: ${Math.min(percent, 100)}%;"></div>
                    </div>
                </div>

                <div class="med-stock-numbers">
                    <div>
                        <div class="mini-stat-label">कुल आवक</div>
                        <div class="mini-stat-val text-slate-800">${stock.received}</div>
                    </div>
                    <div>
                        <div class="mini-stat-label">कुल वितरित</div>
                        <div class="mini-stat-val text-blue-600">${stock.distributed}</div>
                    </div>
                    <div>
                        <div class="mini-stat-label">शेष स्टॉक</div>
                        <div class="mini-stat-val ${stock.available === 0 ? 'text-red-600' : (stock.available <= 2 ? 'text-amber-600' : 'text-emerald-600')}">${stock.available}</div>
                    </div>
                </div>
            </div>

            <div class="flex gap-2 mt-3 no-print">
                <button class="btn-dispense-card flex-1" onclick="openDispenseModal('${med.id}')" ${stock.available === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                    <i class="fas fa-hand-holding-medical"></i> ${stock.available === 0 ? 'स्टॉक समाप्त' : 'दवाई वितरण करें'}
                </button>
                <button class="btn btn-white text-xs p-2" onclick="openAddStockModal('${med.id}')" title="आवक स्टॉक बढ़ाएं">
                    <i class="fas fa-plus text-sky-600"></i>
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// =========================================================================
// STUDENT DISPENSING MATRIX & BULK MARKING LOGIC
// =========================================================================

function renderMatrixView() {
    renderMatrixClassPills();
    renderMatrixTable();
    updateBulkToolbar();
}

// Render Class Filter Pills Bar
function renderMatrixClassPills() {
    const bar = document.getElementById("matrix-class-pills");
    if (!bar) return;

    // Collect distinct classes
    const classCountMap = {};
    studentsList.forEach(st => {
        classCountMap[st.className] = (classCountMap[st.className] || 0) + 1;
    });

    const activeClasses = ORDERED_CLASSES.filter(c => classCountMap[c] !== undefined);
    Object.keys(classCountMap).forEach(c => {
        if (!activeClasses.includes(c)) activeClasses.push(c);
    });

    let html = `
        <button class="class-pill-btn ${matrixClassFilter === 'ALL' ? 'active' : ''}" onclick="setMatrixClassFilter('ALL')">
            <i class="fas fa-users"></i> सभी कक्षाएं <span class="class-pill-count">${studentsList.length}</span>
        </button>
    `;

    activeClasses.forEach(cls => {
        const count = classCountMap[cls] || 0;
        html += `
            <button class="class-pill-btn ${matrixClassFilter === cls ? 'active' : ''}" onclick="setMatrixClassFilter('${cls}')">
                ${cls} <span class="class-pill-count">${count}</span>
            </button>
        `;
    });

    bar.innerHTML = html;
}

window.setMatrixClassFilter = function (cls) {
    matrixClassFilter = cls;
    selectedStudentIds.clear();
    renderMatrixClassPills();
    renderMatrixTable();
    updateBulkToolbar();
};

// Render Matrix Student Table
function renderMatrixTable() {
    const tbody = document.getElementById("matrix-tbody");
    const countBadge = document.getElementById("matrix-student-count");
    const thSelectAll = document.getElementById("matrix-th-select-all");
    const topSelectAll = document.getElementById("matrix-select-all");

    if (!tbody) return;

    const searchTerm = (document.getElementById("matrix-search-input")?.value || "").toLowerCase().trim();
    const statusFilter = document.getElementById("matrix-status-filter")?.value || "ALL";
    const medFilter = document.getElementById("matrix-medicine-filter")?.value || "";

    // Filter students
    const filteredStudents = studentsList.filter(st => {
        // Class filter
        const matchClass = matrixClassFilter === "ALL" || st.className === matrixClassFilter;
        if (!matchClass) return false;

        // Search filter
        const matchSearch = !searchTerm ||
            (st.name || '').toLowerCase().includes(searchTerm) ||
            (st.admissionNo || '').toLowerCase().includes(searchTerm) ||
            (st.fatherName || '').toLowerCase().includes(searchTerm) ||
            (st.className || '').toLowerCase().includes(searchTerm);
        if (!matchSearch) return false;

        // Find distributions for this student
        const studentDists = st.medicineDists || [];

        // Status Filter
        if (statusFilter === "PENDING" && studentDists.length > 0) return false;
        if (statusFilter === "DONE" && studentDists.length === 0) return false;

        // Medicine Filter
        if (medFilter && !studentDists.some(d => d.medicineId === medFilter)) return false;

        return true;
    });

    if (countBadge) {
        countBadge.textContent = `${filteredStudents.length} छात्र`;
    }

    if (filteredStudents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state py-8">
                        <i class="fas fa-user-slash text-3xl text-slate-400 mb-2"></i>
                        <p class="font-bold text-slate-700">कोई छात्र नहीं मिला।</p>
                        <p class="text-xs text-slate-500">कृपया खोज फ़िल्टर या कक्षा चयन बदलकर देखें।</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let html = "";
    filteredStudents.forEach((st, idx) => {
        const isChecked = selectedStudentIds.has(st.id);
        const studentDists = st.medicineDists || [];

        // Render past dispensed medicine tags
        let distTagsHtml = "";
        if (studentDists.length > 0) {
            studentDists.forEach(dist => {
                const med = medicines.find(m => m.id === dist.medicineId) || { nameHi: dist.medicineName || "दवाई" };
                distTagsHtml += `
                    <span class="med-given-tag" title="दिनांक: ${dist.dispensedDate} | कारण: ${dist.reason || '-'}">
                        <i class="fas fa-pills text-emerald-600"></i> ${med.nameHi} <strong>(x${dist.quantity})</strong>
                        <span class="del-btn" onclick="deleteDistributionRecord('${dist.id}')" title="वितरण हटाएं">&times;</span>
                    </span>
                `;
            });
        } else {
            distTagsHtml = `<span class="text-xs text-slate-400 italic">लंबित (कोई दवाई नहीं दी गई)</span>`;
        }

        // Inline Quick Dispense Select Options
        let inlineSelectHtml = `<select id="inline-med-${st.id}" class="inline-dispense-select"><option value="">-- दवाई चुनें --</option>`;
        medicines.forEach(m => {
            const stock = getMedicineStock(m.id);
            const disabled = stock.available === 0 ? 'disabled' : '';
            inlineSelectHtml += `<option value="${m.id}" ${disabled}>${m.nameHi} (शेष: ${stock.available})</option>`;
        });
        inlineSelectHtml += `</select>`;

        // Status Badge
        const statusHtml = studentDists.length > 0
            ? `<span class="status-pill-done"><i class="fas fa-check-circle"></i> प्रदत्त (${studentDists.length})</span>`
            : `<span class="status-pill-pending"><i class="fas fa-clock"></i> लंबित</span>`;

        html += `
            <tr style="${isChecked ? 'background: #eff6ff;' : ''}">
                <td style="text-align: center;">
                    <input type="checkbox" class="cursor-pointer student-row-cb" onchange="toggleSelectStudent('${st.id}', this.checked)" ${isChecked ? 'checked' : ''}>
                </td>
                <td style="text-align: center; font-weight: bold; color: #64748b; font-size: 0.85rem;">
                    ${idx + 1}.
                </td>
                <td>
                    <div class="student-cell">
                        <div class="student-avatar">
                            ${(st.name || 'S').trim().charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div class="student-name">${st.name}</div>
                            <div class="student-meta">
                                PEN: <span class="font-semibold text-slate-700">${st.admissionNo || '-'}</span>
                                ${st.fatherName ? ' | पिता: ' + st.fatherName : ''}
                                ${st.mobile ? ' | 📞 ' + st.mobile : ''}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge-class">${st.className}</span>
                </td>
                <td>
                    <div class="flex flex-wrap items-center gap-1">${distTagsHtml}</div>
                </td>
                <td>
                    <div class="inline-dispense-box">
                        ${inlineSelectHtml}
                        <button type="button" class="btn-inline-give" onclick="executeInlineDispense('${st.id}')">
                            <i class="fas fa-check"></i> दें
                        </button>
                    </div>
                </td>
                <td style="text-align: center;">
                    ${statusHtml}
                </td>
                <td class="no-print text-center">
                    <button type="button" class="btn btn-white text-xs p-1 px-2" onclick="openDispenseForStudent('${st.id}')" title="विस्तृत फॉर्म में दवाई वितरण करें">
                        <i class="fas fa-hand-holding-medical text-sky-600"></i> प्रविष्टि
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;

    // Check all state
    const allChecked = filteredStudents.length > 0 && filteredStudents.every(st => selectedStudentIds.has(st.id));
    if (thSelectAll) thSelectAll.checked = allChecked;
    if (topSelectAll) topSelectAll.checked = allChecked;
}

// Single student checkbox toggle
window.toggleSelectStudent = function (studentId, isChecked) {
    if (isChecked) {
        selectedStudentIds.add(studentId);
    } else {
        selectedStudentIds.delete(studentId);
    }
    updateBulkToolbar();
    renderMatrixTable();
};

// Select all visible students in matrix
window.toggleSelectAllMatrixStudents = function (isChecked) {
    const searchTerm = (document.getElementById("matrix-search-input")?.value || "").toLowerCase().trim();
    const statusFilter = document.getElementById("matrix-status-filter")?.value || "ALL";
    const medFilter = document.getElementById("matrix-medicine-filter")?.value || "";

    const visibleStudents = studentsList.filter(st => {
        const matchClass = matrixClassFilter === "ALL" || st.className === matrixClassFilter;
        if (!matchClass) return false;

        const matchSearch = !searchTerm ||
            (st.name || '').toLowerCase().includes(searchTerm) ||
            (st.admissionNo || '').toLowerCase().includes(searchTerm) ||
            (st.fatherName || '').toLowerCase().includes(searchTerm);
        if (!matchSearch) return false;

        const studentDists = st.medicineDists || [];

        if (statusFilter === "PENDING" && studentDists.length > 0) return false;
        if (statusFilter === "DONE" && studentDists.length === 0) return false;
        if (medFilter && !studentDists.some(d => d.medicineId === medFilter)) return false;

        return true;
    });

    if (isChecked) {
        visibleStudents.forEach(st => selectedStudentIds.add(st.id));
    } else {
        visibleStudents.forEach(st => selectedStudentIds.delete(st.id));
    }

    updateBulkToolbar();
    renderMatrixTable();
};

// Update Bulk Toolbar Badge
function updateBulkToolbar() {
    const badge = document.getElementById("bulk-selected-count");
    if (badge) {
        badge.innerHTML = `<i class="fas fa-check-double"></i> ${selectedStudentIds.size} छात्र चयनित`;
    }
}

// Quick Inline Dispense from Table Row
window.executeInlineDispense = async function (studentId) {
    const selectElem = document.getElementById(`inline-med-${studentId}`);
    if (!selectElem) return;

    const medId = selectElem.value;
    if (!medId) {
        showToast("कृपया पहले दवाई का चयन करें।", "warning");
        return;
    }

    const st = studentsList.find(s => s.id === studentId);
    if (!st) return;

    const med = medicines.find(m => m.id === medId);
    if (!med) return;

    const stock = getMedicineStock(medId);
    if (stock.available < 1) {
        showToast(`त्रुटि: ${med.nameHi} का स्टॉक समाप्त हो चुका है।`, "error");
        return;
    }

    const newDist = {
        id: "dist_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
        studentId: st.id,
        studentName: st.name,
        studentClass: st.className,
        rollNo: st.admissionNo,
        fatherName: st.fatherName || '',
        medicineId: med.id,
        medicineName: med.nameHi,
        quantity: 1,
        reason: med.purpose || 'प्राथमिक चिकित्सा',
        dispensedBy: "संजीव कुमार (190511502)",
        dispensedDate: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
    };

    const existing = st.medicineDists || [];
    const updatedDists = [newDist, ...existing];

    // Optimistically update memory and localStorage first
    st.medicineDists = updatedDists;
    distributionLog.unshift(newDist);
    saveLocalCache();
    renderAll();

    // Persist to Firestore
    if (MedFirebase.db) {
        try {
            await MedFirebase.db.collection("students").doc(st.id).set({
                id: st.id,
                name: st.name,
                className: st.className,
                admissionNo: st.admissionNo,
                fatherName: st.fatherName || '',
                medicineDists: updatedDists,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.warn("Firestore sync warning (data kept locally):", err.message);
        }
    }

    showToast(`सफलता: ${st.name} (${st.className}) को ${med.nameHi} (1 पीस) प्रदान कर दी गई!`, "success");
};

// Open Dispense Modal with Pre-selected Student
window.openDispenseForStudent = function (studentId) {
    openDispenseModal();
    selectStudent(studentId);
};

// Execute Bulk / Batch Dispense
window.executeBulkDispense = async function () {
    const selectedCount = selectedStudentIds.size;
    if (selectedCount === 0) {
        showToast("कृपया पहले कम से कम एक छात्र को चुनें।", "warning");
        return;
    }

    const medId = document.getElementById("bulk-medicine-select")?.value;
    const qty = parseInt(document.getElementById("bulk-quantity-input")?.value || "1", 10);
    const reason = document.getElementById("bulk-reason-input")?.value.trim();
    const btn = document.getElementById("btn-execute-bulk");

    if (!medId) {
        showToast("कृपया वितरित की जाने वाली दवाई चुनें।", "warning");
        return;
    }

    const med = medicines.find(m => m.id === medId);
    if (!med) return;

    const totalRequired = selectedCount * qty;
    const stock = getMedicineStock(medId);

    if (totalRequired > stock.available) {
        showToast(`स्टॉक अपर्याप्त: ${selectedCount} छात्रों के लिए कुल ${totalRequired} पीस चाहिए, जबकि केवल ${stock.available} पीस उपलब्ध हैं।`, "error");
        return;
    }

    const confirmMsg = `क्या आप चयनित ${selectedCount} छात्रों को "${med.nameHi}" (${qty} पीस प्रति छात्र, कुल: ${totalRequired} पीस) एक साथ वितरित करना चाहते हैं?`;
    if (!confirm(confirmMsg)) return;

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> सेविंग (${selectedCount} छात्र)...`;
    }

    const today = new Date().toISOString().split('T')[0];
    const nowTs = Date.now();
    const batchUpdates = [];

    selectedStudentIds.forEach(stId => {
        const st = studentsList.find(s => s.id === stId);
        if (st) {
            const newDist = {
                id: "dist_" + nowTs + "_" + Math.random().toString(36).substr(2, 5),
                studentId: st.id,
                studentName: st.name,
                studentClass: st.className,
                rollNo: st.admissionNo,
                fatherName: st.fatherName || '',
                medicineId: med.id,
                medicineName: med.nameHi,
                quantity: qty,
                reason: reason || med.purpose || 'सामूहिक स्वास्थ्य संवर्धन',
                dispensedBy: "संजीव कुमार (190511502)",
                dispensedDate: today,
                timestamp: nowTs
            };

            const updatedDists = [newDist, ...(st.medicineDists || [])];
            st.medicineDists = updatedDists;
            distributionLog.unshift(newDist);

            batchUpdates.push({
                student: st,
                updatedDists: updatedDists
            });
        }
    });

    saveLocalCache();
    selectedStudentIds.clear();
    updateBulkToolbar();
    renderAll();

    // Firestore Sync in background
    if (MedFirebase.db && batchUpdates.length > 0) {
        try {
            const batch = MedFirebase.db.batch();
            batchUpdates.forEach(item => {
                const docRef = MedFirebase.db.collection("students").doc(item.student.id);
                batch.set(docRef, {
                    id: item.student.id,
                    name: item.student.name,
                    className: item.student.className,
                    admissionNo: item.student.admissionNo,
                    fatherName: item.student.fatherName || '',
                    medicineDists: item.updatedDists,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            });
            await batch.commit();
        } catch (err) {
            console.warn("Bulk Firestore sync warning (kept locally):", err.message);
        }
    }

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-bolt"></i> चयनित छात्रों को दवाई वितरित करें`;
    }

    showToast(`सफलता: ${selectedCount} छात्रों को ${med.nameHi} (कुल ${totalRequired} पीस) सफलतापूर्वक वितरित कर दिया गया!`, "success");
};

// Populate Matrix Medicine Filter Dropdowns
function populateMatrixMedicineFilters() {
    const matrixMedFilter = document.getElementById("matrix-medicine-filter");
    const bulkMedSelect = document.getElementById("bulk-medicine-select");

    if (matrixMedFilter) {
        matrixMedFilter.innerHTML = `<option value="">सभी औषधियां (Any Medicine)</option>`;
        medicines.forEach(m => {
            matrixMedFilter.innerHTML += `<option value="${m.id}">${m.nameHi}</option>`;
        });
    }

    if (bulkMedSelect) {
        bulkMedSelect.innerHTML = `<option value="">-- दवाई चुनें (Select Medicine) --</option>`;
        medicines.forEach(m => {
            const stock = getMedicineStock(m.id);
            bulkMedSelect.innerHTML += `<option value="${m.id}">${m.nameHi} [उपलब्ध: ${stock.available} ${m.unit || 'पीस'}]</option>`;
        });
    }
}

// Render Dedicated Stock Voucher Table
function renderVoucherTable() {
    const tbody = document.getElementById("voucher-tbody");
    if (!tbody) return;

    let html = "";
    let totalInward = 0;
    let totalDist = 0;
    let totalAvail = 0;

    medicines.forEach((med, idx) => {
        const stock = getMedicineStock(med.id);
        totalInward += stock.received;
        totalDist += stock.distributed;
        totalAvail += stock.available;

        const isLow = stock.available <= 2;
        const statusBadge = stock.available === 0
            ? `<span style="color:#b91c1c; font-weight:700;">● समाप्त</span>`
            : (isLow ? `<span style="color:#b45309; font-weight:700;">● न्यून स्टॉक</span>` : `<span style="color:#15803d; font-weight:700;">✓ उपलब्ध</span>`);

        html += `
            <tr style="border-bottom: 1px solid #cbd5e1;">
                <td style="text-align:center; font-weight:700; background:#f8fafc; font-size:10pt;">${idx + 1}.</td>
                <td style="padding: 9px 12px;">
                    <div style="font-weight:800; font-size:10.5pt; color:#0f172a;">${med.nameHi}</div>
                    <div style="font-size:8pt; color:#475569; font-weight:500;">${med.nameEn || ''}</div>
                </td>
                <td style="padding: 9px 12px; font-size:9pt; color:#334155;">
                    <span style="display:inline-block; background:#f1f5f9; padding:2px 8px; border-radius:4px; border:1px solid #e2e8f0; font-weight:500;">
                        ${med.purpose || '-'}
                    </span>
                </td>
                <td style="text-align:center; font-weight:800; font-size:10.5pt; background:#f8fafc; color:#0f172a;">
                    ${stock.received} <span style="font-size:8pt; font-weight:normal; color:#64748b;">${med.unit || 'पीस'}</span>
                </td>
                <td style="text-align:center; font-weight:700; font-size:9.5pt; color:#2563eb;">
                    ${stock.distributed} <span style="font-size:8pt; font-weight:normal; color:#64748b;">${med.unit || 'पीस'}</span>
                </td>
                <td style="text-align:center; font-weight:800; font-size:11pt; color:#047857; background:#f0fdf4;">
                    ${stock.available} <span style="font-size:8.5pt; font-weight:bold; color:#047857;">${med.unit || 'पीस'}</span>
                </td>
                <td style="text-align:center; font-size:8.5pt;">
                    ${statusBadge}
                </td>
            </tr>
        `;
    });

    html += `
        <tr style="background:#e2e8f0; font-weight:800; border-top:2px solid #0f172a;">
            <td colspan="3" style="text-align:right; padding: 10px 14px; font-size:10pt; text-transform:uppercase; letter-spacing:0.04em;">
                कुल योग (Total Stock Summary):
            </td>
            <td style="text-align:center; font-size:11.5pt; font-weight:800; color:#000; background:#cbd5e1;">
                ${totalInward} पीस
            </td>
            <td style="text-align:center; font-size:10.5pt; font-weight:800; color:#1d4ed8;">
                ${totalDist} पीस
            </td>
            <td style="text-align:center; font-size:12pt; font-weight:800; color:#047857; background:#dcfce7;">
                ${totalAvail} पीस
            </td>
            <td style="text-align:center; font-size:9pt; font-weight:700; color:#0f172a;">
                ${medicines.length} श्रेणियां
            </td>
        </tr>
    `;

    tbody.innerHTML = html;
}

// Populate Medicine Dropdowns
function populateMedicineSelect() {
    const medSelect = document.getElementById("modal-medicine-select");
    const filterMedSelect = document.getElementById("filter-medicine");

    if (medSelect) {
        medSelect.innerHTML = `<option value="">-- दवाई चुनें (Select Medicine) --</option>`;
        medicines.forEach(med => {
            const stock = getMedicineStock(med.id);
            const disabled = stock.available === 0 ? 'disabled' : '';
            medSelect.innerHTML += `
                <option value="${med.id}" ${disabled}>
                    ${med.nameHi} • ${stock.available} ${med.unit || 'पीस'} उपलब्ध ${stock.available === 0 ? '(स्टॉक समाप्त)' : ''}
                </option>
            `;
        });
    }

    if (filterMedSelect) {
        filterMedSelect.innerHTML = `<option value="">सभी औषधियां (All Medicines)</option>`;
        medicines.forEach(med => {
            filterMedSelect.innerHTML += `<option value="${med.id}">${med.nameHi}</option>`;
        });
    }
}

function populateStockExistingSelect() {
    const sel = document.getElementById("stock-existing-med-id");
    if (!sel) return;
    sel.innerHTML = "";
    medicines.forEach(med => {
        sel.innerHTML += `<option value="${med.id}">${med.nameHi} (${med.nameEn || ''}) - वर्तमान आवक: ${med.initialStock} ${med.unit || 'पीस'}</option>`;
    });
}

// Render Distribution Table
function renderDistributionTable() {
    const tbody = document.getElementById("distribution-tbody");
    const countBadge = document.getElementById("distribution-count-badge");
    if (!tbody) return;

    const searchTerm = (document.getElementById("search-student")?.value || "").toLowerCase().trim();
    const classFilter = document.getElementById("filter-class")?.value || "";
    const medFilter = document.getElementById("filter-medicine")?.value || "";

    const filteredLogs = distributionLog.filter(log => {
        const matchSearch = (log.studentName || '').toLowerCase().includes(searchTerm)
            || (log.rollNo || "").toLowerCase().includes(searchTerm)
            || (log.fatherName || "").toLowerCase().includes(searchTerm)
            || (log.reason || "").toLowerCase().includes(searchTerm);

        const matchClass = !classFilter || log.studentClass === classFilter || (classFilter === 'Staff' && log.studentClass === 'Staff');
        const matchMed = !medFilter || log.medicineId === medFilter;
        return matchSearch && matchClass && matchMed;
    });

    if (countBadge) countBadge.textContent = `${filteredLogs.length} रिकॉर्ड`;

    if (filteredLogs.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state enhanced-empty">
                        <div class="empty-icon">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <h3>अभी कोई वितरण रिकॉर्ड नहीं है</h3>
                        <p>छात्र को दवाई देने के बाद रिकॉर्ड यहां दिखाई देगा।</p>
                        <button type="button" class="btn btn-emerald text-xs no-print" onclick="openDispenseModal()">
                            <i class="fas fa-plus"></i> नई वितरण प्रविष्टि
                        </button>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let html = "";
    filteredLogs.forEach((log, index) => {
        const med = medicines.find(m => m.id === log.medicineId) || { nameHi: log.medicineName || "दवाई", unit: "पीस" };
        html += `
            <tr>
                <td><strong>${index + 1}.</strong></td>
                <td>
                    <div class="font-bold text-slate-900">${log.studentName}</div>
                    <div class="text-xs text-slate-500">
                        ${log.rollNo ? 'PEN/अनुक्रमांक: ' + log.rollNo : ''}
                        ${log.fatherName ? ' | पिता: ' + log.fatherName : ''}
                    </div>
                </td>
                <td><span class="badge-class">${log.studentClass}</span></td>
                <td>
                    <span class="badge-med"><i class="fas fa-pills mr-1"></i> ${med.nameHi}</span>
                </td>
                <td><strong>${log.quantity} ${med.unit || 'पीस'}</strong></td>
                <td><span class="text-xs text-slate-700 font-medium">${log.reason || med.purpose || '-'}</span></td>
                <td>
                    <div class="text-xs font-semibold text-slate-800">${log.dispensedDate}</div>
                    <div class="text-xs text-slate-500">प्रभारी: ${log.dispensedBy || "संजीव कुमार"}</div>
                </td>
                <td class="no-print text-center">
                    <button onclick="deleteDistributionRecord('${log.id}')" class="btn text-red-600 hover:text-red-800 p-1" title="डिलीट करें एवं स्टॉक वापस जोड़ें">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// Student Autocomplete Search in Dispense Modal
function setupStudentAutocomplete() {
    const searchInput = document.getElementById("modal-student-search");
    const resultsBox = document.getElementById("student-autocomplete-results");

    if (!searchInput || !resultsBox) return;

    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase().trim();
        if (!term || term.length < 1) {
            resultsBox.style.display = "none";
            return;
        }

        const matches = studentsList.filter(st => {
            const nameMatch = (st.name || '').toLowerCase().includes(term);
            const penMatch = (st.admissionNo || '').toLowerCase().includes(term);
            const fatherMatch = (st.fatherName || '').toLowerCase().includes(term);
            const classMatch = (st.className || '').toLowerCase().includes(term);
            return nameMatch || penMatch || fatherMatch || classMatch;
        }).slice(0, 15);

        if (matches.length === 0) {
            resultsBox.innerHTML = `
                <div class="p-3 text-xs text-slate-500 text-center">
                    कोई छात्र नहीं मिला। आप नीचे सीधे नाम और कक्षा मैन्युअल दर्ज कर सकते हैं।
                </div>
            `;
            resultsBox.style.display = "block";
            return;
        }

        let html = "";
        matches.forEach(st => {
            html += `
                <div class="student-autocomplete-item" onclick="selectStudent('${st.id}')">
                    <div>
                        <div class="st-name">${st.name}</div>
                        <div class="st-sub">कक्षा: <strong>${st.className}</strong> | PEN: ${st.admissionNo} ${st.fatherName ? '| पिता: ' + st.fatherName : ''}</div>
                    </div>
                    <span class="badge-class text-xs">${st.className}</span>
                </div>
            `;
        });

        resultsBox.innerHTML = html;
        resultsBox.style.display = "block";
    });

    // Close autocomplete on outside click
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
            resultsBox.style.display = "none";
        }
    });
}

// Select Student from Autocomplete List
window.selectStudent = function (studentId) {
    const st = studentsList.find(s => s.id === studentId);
    if (!st) return;

    selectedStudent = st;

    // Fill form fields
    const nameInput = document.getElementById("modal-student-name");
    const classSelect = document.getElementById("modal-student-class");
    const rollInput = document.getElementById("modal-roll-no");
    const fatherInput = document.getElementById("modal-father-name");
    const searchInput = document.getElementById("modal-student-search");
    const resultsBox = document.getElementById("student-autocomplete-results");

    if (nameInput) nameInput.value = st.name;
    if (classSelect) classSelect.value = st.className;
    if (rollInput) rollInput.value = st.admissionNo;
    if (fatherInput) fatherInput.value = st.fatherName;
    if (searchInput) searchInput.value = st.name;
    if (resultsBox) resultsBox.style.display = "none";

    // Show Selected Student Box & Previous Medical History
    const selectedBox = document.getElementById("selected-student-box");
    const selName = document.getElementById("sel-st-name");
    const selMeta = document.getElementById("sel-st-meta");
    const selHistory = document.getElementById("sel-st-history");

    if (selectedBox) {
        selectedBox.style.display = "flex";
        if (selName) selName.textContent = st.name;
        if (selMeta) selMeta.textContent = `कक्षा: ${st.className} | PEN/अनुक्रमांक: ${st.admissionNo} ${st.fatherName ? '| पिता: ' + st.fatherName : ''} ${st.mobile ? '| मो: ' + st.mobile : ''}`;

        // Find past dispensations for this student
        const pastLogs = st.medicineDists || [];

        if (selHistory) {
            if (pastLogs.length > 0) {
                const last = pastLogs[0];
                const med = medicines.find(m => m.id === last.medicineId) || { nameHi: "दवाई" };
                selHistory.textContent = `⚠️ पूर्व वितरण: ${pastLogs.length} बार प्राप्त (अंतिम: ${med.nameHi} x${last.quantity} दिनांक ${last.dispensedDate})`;
                selHistory.className = "text-xs text-amber-700 font-bold";
            } else {
                selHistory.textContent = `✓ पूर्व औषधि वितरण: कोई रिकॉर्ड नहीं (प्रथम बार)`;
                selHistory.className = "text-xs text-emerald-700 font-semibold";
            }
        }
    }
};

window.clearSelectedStudent = function () {
    selectedStudent = null;
    const selectedBox = document.getElementById("selected-student-box");
    const searchInput = document.getElementById("modal-student-search");
    if (selectedBox) selectedBox.style.display = "none";
    if (searchInput) searchInput.value = "";
};

window.setQuickReason = function (reasonText) {
    const reasonInput = document.getElementById("modal-reason");
    if (reasonInput) {
        reasonInput.value = reasonText;
    }
};

// Quantity Stepper Control
window.changeQty = function (delta) {
    const input = document.getElementById("modal-quantity");
    if (!input) return;
    const current = parseInt(input.value || "1", 10);
    const next = Math.max(1, Math.min(50, current + delta));
    input.value = next;
};

// Open Dispense Modal
window.openDispenseModal = function (preSelectMedId) {
    const modal = document.getElementById("dispense-modal");
    if (!modal) return;

    // Reset Form
    document.getElementById("dispense-form").reset();
    clearSelectedStudent();

    // Set Today's Date
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById("modal-date");
    if (dateInput) dateInput.value = today;

    // Pre-select medicine if passed
    if (preSelectMedId) {
        const medSelect = document.getElementById("modal-medicine-select");
        if (medSelect) medSelect.value = preSelectMedId;
        updateStockHint(preSelectMedId);
    } else {
        updateStockHint("");
    }

    modal.classList.add("active");
};

// Open Add Inward Stock Modal
window.openAddStockModal = function (preSelectMedId) {
    const modal = document.getElementById("add-stock-modal");
    if (!modal) return;

    document.getElementById("add-stock-form").reset();
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById("stock-inward-date");
    if (dateInput) dateInput.value = today;

    populateStockExistingSelect();
    if (preSelectMedId) {
        const sel = document.getElementById("stock-existing-med-id");
        if (sel) sel.value = preSelectMedId;
        toggleStockMode('existing');
    }

    modal.classList.add("active");
};

window.toggleStockMode = function (mode) {
    const grpExisting = document.getElementById("group-existing-med");
    const grpNew = document.getElementById("group-new-med");
    if (mode === "new") {
        if (grpExisting) grpExisting.style.display = "none";
        if (grpNew) grpNew.style.display = "block";
    } else {
        if (grpExisting) grpExisting.style.display = "block";
        if (grpNew) grpNew.style.display = "none";
    }
};

// Close Modal
window.closeModal = function (modalId) {
    const target = modalId ? document.getElementById(modalId) : document.querySelector(".modal-overlay.active");
    if (target) target.classList.remove("active");
};

// Update stock hint text inside modal
function updateStockHint(medId) {
    const hint = document.getElementById("modal-stock-hint");
    if (!hint) return;

    if (!medId) {
        hint.textContent = "";
        return;
    }

    const stock = getMedicineStock(medId);
    hint.textContent = `(वर्तमान उपलब्ध: ${stock.available} पीस)`;
    hint.className = stock.available > 0 ? "text-emerald-600 text-xs font-bold" : "text-red-600 text-xs font-bold";
}

// Setup Event Listeners
function setupEventListeners() {
    // Search & Filters for Log Table
    document.getElementById("search-student")?.addEventListener("input", renderDistributionTable);
    document.getElementById("filter-class")?.addEventListener("change", renderDistributionTable);
    document.getElementById("filter-medicine")?.addEventListener("change", renderDistributionTable);

    // Search & Filters for Student Matrix
    document.getElementById("matrix-search-input")?.addEventListener("input", renderMatrixTable);
    document.getElementById("matrix-status-filter")?.addEventListener("change", renderMatrixTable);
    document.getElementById("matrix-medicine-filter")?.addEventListener("change", renderMatrixTable);

    // Matrix Select All Checkboxes
    document.getElementById("matrix-select-all")?.addEventListener("change", (e) => {
        toggleSelectAllMatrixStudents(e.target.checked);
    });
    document.getElementById("matrix-th-select-all")?.addEventListener("change", (e) => {
        toggleSelectAllMatrixStudents(e.target.checked);
    });

    // Modal Medicine Select change
    document.getElementById("modal-medicine-select")?.addEventListener("change", (e) => {
        updateStockHint(e.target.value);
    });

    // Dispense Form Submit
    document.getElementById("dispense-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById("btn-submit-dispense");
        const studentName = document.getElementById("modal-student-name").value.trim();
        const studentClass = document.getElementById("modal-student-class").value;
        const rollNo = document.getElementById("modal-roll-no").value.trim();
        const fatherName = document.getElementById("modal-father-name").value.trim();
        const medicineId = document.getElementById("modal-medicine-select").value;
        const quantity = parseInt(document.getElementById("modal-quantity").value, 10);
        const reason = document.getElementById("modal-reason").value.trim();
        const dispensedBy = document.getElementById("modal-dispensed-by").value.trim();
        const dispensedDate = document.getElementById("modal-date").value;

        if (!studentName || !studentClass || !medicineId || !quantity || quantity < 1) {
            showToast("कृपया सभी आवश्यक विवरण सही से भरें।", "error");
            return;
        }

        const stock = getMedicineStock(medicineId);
        if (quantity > stock.available) {
            showToast(`त्रुटि: केवल ${stock.available} पीस उपलब्ध हैं। आप ${quantity} वितरित नहीं कर सकते।`, "error");
            return;
        }

        const medObj = medicines.find(m => m.id === medicineId) || {};
        const nowTs = Date.now();

        const newDist = {
            id: "dist_" + nowTs + "_" + Math.random().toString(36).substr(2, 5),
            studentId: selectedStudent ? selectedStudent.id : '',
            studentName,
            studentClass,
            rollNo,
            fatherName,
            medicineId,
            medicineName: medObj.nameHi || '',
            quantity,
            reason: reason || medObj.purpose || 'प्राथमिक चिकित्सा',
            dispensedBy: dispensedBy || "संजीव कुमार (190511502)",
            dispensedDate: dispensedDate || new Date().toISOString().split('T')[0],
            timestamp: nowTs
        };

        if (selectedStudent && selectedStudent.id) {
            const existing = selectedStudent.medicineDists || [];
            const updatedDists = [newDist, ...existing];
            selectedStudent.medicineDists = updatedDists;

            // Sync to Firestore
            if (MedFirebase.db) {
                MedFirebase.db.collection("students").doc(selectedStudent.id).set({
                    id: selectedStudent.id,
                    name: selectedStudent.name,
                    className: selectedStudent.className,
                    admissionNo: selectedStudent.admissionNo,
                    fatherName: selectedStudent.fatherName || '',
                    medicineDists: updatedDists,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true }).catch(err => console.warn("Firestore sync:", err.message));
            }
        } else {
            // Non-listed / manual entry
            try {
                const localExtra = JSON.parse(localStorage.getItem("PMS_MEDICINE_EXTRA_LOGS") || "[]");
                localExtra.unshift(newDist);
                localStorage.setItem("PMS_MEDICINE_EXTRA_LOGS", JSON.stringify(localExtra));
            } catch (e) {}
        }

        distributionLog.unshift(newDist);
        saveLocalCache();
        renderAll();

        closeModal('dispense-modal');
        showToast(`सफलता: ${studentName} (${studentClass}) को ${quantity} ${medObj.unit || 'पीस'} दवाई वितरित कर दी गई!`, "success");
    });

    // Add Inward Stock Form Submit
    document.getElementById("add-stock-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const mode = document.getElementById("stock-mode-select").value;
        const qty = parseInt(document.getElementById("stock-inward-qty").value, 10);
        const inwardDate = document.getElementById("stock-inward-date").value;
        const receivedFrom = document.getElementById("stock-received-from").value.trim();

        if (!qty || qty < 1) {
            showToast("कृपया वैध मात्रा दर्ज करें।", "error");
            return;
        }

        if (mode === "existing") {
            const medId = document.getElementById("stock-existing-med-id").value;
            const med = medicines.find(m => m.id === medId);
            if (!med) return;

            med.initialStock = (Number(med.initialStock) || 0) + qty;
            med.lastInwardDate = inwardDate;
            med.lastInwardQty = qty;
            med.receivedFrom = receivedFrom || med.receivedFrom;

            saveLocalCache();
            renderAll();
            showToast(`सफलता: ${med.nameHi} में +${qty} पीस स्टॉक जोड़ दिया गया। (कुल: ${med.initialStock})`, "success");
        } else {
            const nameHi = document.getElementById("stock-new-name-hi").value.trim();
            const nameEn = document.getElementById("stock-new-name-en").value.trim();
            const purpose = document.getElementById("stock-new-purpose").value.trim();

            if (!nameHi) {
                showToast("कृपया औषधि का नाम दर्ज करें।", "error");
                return;
            }

            const newMed = {
                id: "med_" + Date.now(),
                num: medicines.length + 1,
                nameHi,
                nameEn,
                purpose: purpose || "प्राथमिक चिकित्सा",
                unit: "पीस",
                initialStock: qty,
                receivedFrom: receivedFrom || "25वीं वाहिनी पीएसी चिकित्सालय",
                receivedDate: inwardDate,
                icon: "fa-pills"
            };

            medicines.push(newMed);
            saveLocalCache();
            renderAll();
            showToast(`सफलता: नई औषधि "${nameHi}" (${qty} पीस) स्टॉक में दर्ज की गई!`, "success");
        }

        closeModal('add-stock-modal');
    });
}

// Delete Record
window.deleteDistributionRecord = async function (logId) {
    const record = distributionLog.find(l => l.id === logId);
    if (!record) return;

    if (!confirm(`क्या आप ${record.studentName} का यह वितरण रिकॉर्ड हटाना चाहते हैं? ऐसा करने पर ${record.quantity} पीस स्टॉक में पुनः जुड़ जाएगा।`)) {
        return;
    }

    if (record.studentId) {
        const st = studentsList.find(s => s.id === record.studentId);
        if (st) {
            const updated = (st.medicineDists || []).filter(d => d.id !== logId);
            st.medicineDists = updated;

            if (MedFirebase.db) {
                MedFirebase.db.collection("students").doc(st.id).set({
                    id: st.id,
                    name: st.name,
                    className: st.className,
                    admissionNo: st.admissionNo,
                    medicineDists: updated,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true }).catch(err => console.warn("Firestore delete sync:", err.message));
            }
        }
    } else {
        try {
            let localExtra = JSON.parse(localStorage.getItem("PMS_MEDICINE_EXTRA_LOGS") || "[]");
            localExtra = localExtra.filter(d => d.id !== logId);
            localStorage.setItem("PMS_MEDICINE_EXTRA_LOGS", JSON.stringify(localExtra));
        } catch (e) {}
    }

    distributionLog = distributionLog.filter(l => l.id !== logId);
    saveLocalCache();
    renderAll();
    showToast("रिकॉर्ड सफलतापूर्वक हटा दिया गया एवं स्टॉक पुनः जुड़ गया।", "info");
};

// Force Sync from Cloud
window.syncNowWithCloud = function () {
    showToast("क्लाउड से डेटा सिंक हो रहा है...", "info");
    MedFirebase.setupListeners();
};

// Toast Notifications
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) {
        alert(message);
        return;
    }

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    const icon = type === "success" ? "fa-check-circle text-emerald-500" :
        (type === "error" ? "fa-exclamation-circle text-red-500" :
            (type === "warning" ? "fa-triangle-exclamation text-amber-500" : "fa-info-circle text-sky-500"));

    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Export to CSV
window.exportDistributionCSV = function () {
    if (distributionLog.length === 0) {
        showToast("डाउनलोड करने के लिए कोई वितरण रिकॉर्ड नहीं है।", "warning");
        return;
    }

    let csv = "क्र.सं.,छात्र का नाम,कक्षा,PEN/अनुक्रमांक,पिता का नाम,दवाई का नाम,मात्रा,प्रयोजन/कारण,वितरण दिनांक,वितरणकर्ता\n";

    distributionLog.forEach((log, i) => {
        const med = medicines.find(m => m.id === log.medicineId) || { nameHi: log.medicineName || "दवाई" };
        csv += `"${i + 1}","${log.studentName}","${log.studentClass}","${log.rollNo || ''}","${log.fatherName || ''}","${med.nameHi}","${log.quantity}","${log.reason || ''}","${log.dispensedDate}","${log.dispensedBy || ''}"\n`;
    });

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `PMS_Medicine_Distribution_Register_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("एक्सेल (CSV) फाइल डाउनलोड हो गई है।", "success");
};

// Populate Report Filter Dropdowns
function populateReportFilters() {
    const classSelect = document.getElementById("report-class-filter");
    const medSelect = document.getElementById("report-med-filter");

    if (classSelect) {
        const curVal = classSelect.value;
        const classes = [...new Set(distributionLog.map(d => d.studentClass).filter(Boolean))];
        let opts = `<option value="">समस्त कक्षाएं (All Classes)</option>`;
        ORDERED_CLASSES.forEach(cls => {
            if (classes.includes(cls)) {
                opts += `<option value="${cls}" ${curVal === cls ? 'selected' : ''}>${cls}</option>`;
            }
        });
        classes.forEach(cls => {
            if (!ORDERED_CLASSES.includes(cls)) {
                opts += `<option value="${cls}" ${curVal === cls ? 'selected' : ''}>${cls}</option>`;
            }
        });
        classSelect.innerHTML = opts;
    }

    if (medSelect) {
        const curMed = medSelect.value;
        let mOpts = `<option value="">सभी औषधियां (All Medicines)</option>`;
        medicines.forEach(m => {
            mOpts += `<option value="${m.id}" ${curMed === m.id ? 'selected' : ''}>${m.nameHi}</option>`;
        });
        medSelect.innerHTML = mOpts;
    }
}

// Render Dedicated Student Distribution Printable Report
window.renderDistributionReport = function () {
    const tbody = document.getElementById("dist-report-tbody");
    const totalStudentsEl = document.getElementById("report-total-students-count");
    const totalQtyEl = document.getElementById("report-total-qty-count");
    const curDateEl = document.getElementById("report-current-date");

    if (!tbody) return;

    if (curDateEl) {
        const d = new Date();
        curDateEl.textContent = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }

    const classFilter = document.getElementById("report-class-filter")?.value || "";
    const medFilter = document.getElementById("report-med-filter")?.value || "";

    const filtered = distributionLog.filter(log => {
        const matchClass = !classFilter || log.studentClass === classFilter;
        const matchMed = !medFilter || log.medicineId === medFilter;
        return matchClass && matchMed;
    });

    let totalQty = 0;
    filtered.forEach(log => {
        totalQty += (Number(log.quantity) || 1);
    });

    if (totalStudentsEl) totalStudentsEl.textContent = `${filtered.length} छात्र/प्राप्तकर्ता`;
    if (totalQtyEl) totalQtyEl.textContent = `${totalQty} पीस`;

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center; padding:25px; color:#64748b; font-weight:600;">
                    चयनित फ़िल्टर के अनुसार कोई वितरण रिकॉर्ड उपलब्ध नहीं है।
                </td>
            </tr>
        `;
        return;
    }

    let html = "";
    filtered.forEach((log, idx) => {
        const med = medicines.find(m => m.id === log.medicineId) || { nameHi: log.medicineName || "दवाई", unit: "पीस" };
        html += `
            <tr style="border-bottom: 1px solid #cbd5e1; font-size: 8.5pt;">
                <td style="text-align:center; font-weight:700; background:#f8fafc;">${idx + 1}.</td>
                <td style="padding: 7px 10px;">
                    <div style="font-weight:800; color:#0f172a; font-size:9pt;">${log.studentName}</div>
                    ${log.fatherName ? `<div style="font-size:7.5pt; color:#475569;">पिता: ${log.fatherName}</div>` : ''}
                </td>
                <td style="text-align:center; font-weight:700;">${log.studentClass}</td>
                <td style="text-align:center; font-weight:600; color:#334155;">${log.rollNo || '-'}</td>
                <td style="padding: 7px 10px; font-weight:700; color:#0369a1;">
                    ${med.nameHi}
                </td>
                <td style="text-align:center; font-weight:800; color:#047857; background:#f0fdf4;">
                    ${log.quantity} ${med.unit || 'पीस'}
                </td>
                <td style="padding: 7px 10px; color:#334155; font-size:8pt;">
                    ${log.reason || med.purpose || 'प्राथमिक चिकित्सा'}
                </td>
                <td style="text-align:center; font-weight:600; color:#475569; font-size:8pt;">
                    ${log.dispensedDate || '-'}
                </td>
                <td style="text-align:center; color:#94a3b8; font-size:7.5pt;">
                    ✓ प्राप्त (ह०)
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
};

// Print Student Distribution Report Function
window.printDistributionReport = function () {
    document.body.classList.remove("print-stock-only");
    document.body.classList.add("print-dist-only");
    populateReportFilters();
    renderDistributionReport();
    window.print();
    setTimeout(() => {
        if (currentViewMode !== "dist-report") {
            document.body.classList.remove("print-dist-only");
        }
    }, 1000);
};

// Print Stock Inward List / Receipt Only
window.printStockListOnly = function () {
    document.body.classList.remove("print-dist-only");
    document.body.classList.add("print-stock-only");
    renderVoucherTable();
    window.print();
    setTimeout(() => {
        if (currentViewMode !== "voucher") {
            document.body.classList.remove("print-stock-only");
        }
    }, 1000);
};

// Print Full Register (Stock + Student Distribution Log)
window.printFullRegister = function () {
    document.body.classList.remove("print-stock-only");
    document.body.classList.remove("print-dist-only");
    window.print();
};

// Automatic Print Hook for Browser Shortcuts (Ctrl+P)
window.addEventListener("beforeprint", () => {
    if (currentViewMode === "voucher") {
        document.body.classList.add("print-stock-only");
    } else if (currentViewMode === "dist-report") {
        document.body.classList.add("print-dist-only");
    }
});

window.addEventListener("afterprint", () => {
    if (currentViewMode !== "voucher") {
        document.body.classList.remove("print-stock-only");
    }
    if (currentViewMode !== "dist-report") {
        document.body.classList.remove("print-dist-only");
    }
});

