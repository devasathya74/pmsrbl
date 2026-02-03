// Admin Dashboard JavaScript
// Handles all CRUD operations for students, teachers, admissions, and notifications

import { authHelper, firestoreHelper, analyticsHelper, storageHelper, collection, query, where, getDocs, orderBy, db } from './firebase-config.js';

// Global state
let allAdmissions = [];
let allStudents = [];
let allTeachers = [];
let allMessages = [];
let allNotifications = [];
let currentEditingStudent = null;
let currentEditingTeacher = null;

// Initialize dashboard
export async function initDashboard() {
    // Check authentication
    authHelper.onAuthChange(async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const userDoc = await firestoreHelper.getDocument('users', user.uid);
        if (userDoc.success) {
            const userData = userDoc.data;
            const role = userData.role;

            if (role !== 'admin' && role !== 'principal') {
                alert('Access Denied! आपके पास इस पेज को देखने की अनुमति नहीं है।');
                window.location.href = '../index.html';
                return;
            }

            document.getElementById('user-name').textContent = userData.name || user.email;
            document.getElementById('admin-name').textContent = userData.name || 'Admin';

            await loadAllData();
        } else {
            alert('User data not found!');
            await authHelper.logout();
            window.location.href = 'login.html';
        }
    });

    // Setup event listeners
    setupEventListeners();
}

// Setup all event listeners
function setupEventListeners() {
    // Logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
        if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
            await authHelper.logout();
            window.location.href = '../index.html';
        }
    });


    // Form Listeners - Use arrow functions to ensure the handler is resolved at call time or ensure defined.
    // Ideally, functions should be defined before this runs, or we rely on window.functionName if defined earlier.
    // Since setupEventListeners is called at the end (inside initDashboard), all window.* assignments should have run by then?
    // Wait, initDashboard is called at the end. Top level assignments run immediately.
    // 'window.handleTeacherSubmit = ...' is at line 572 (top level). So it will be defined when initDashboard runs.

    // Form Listeners - EXPLICITLY REMOVED to prevent double submission.
    // The forms already have onsubmit="handle...Submit(event)" in the HTML.
    // adding addEventListener here causes the handler to run TWICE.

    document.getElementById('notification-form').addEventListener('submit', (e) => handleNotificationSubmit(e));
    // handleNotificationSubmit was async function handleNotificationSubmit... which is hoisted in module scope? 
    // Wait, modules invoke rigorous mode.
    // function decls are hoisted to top of module.
    // So handleNotificationSubmit is available.
    // But handleStudentSubmit and handleTeacherSubmit are window assignments, so they are available after execution reaches their lines.

    // Monitoring Sub-tabs
    window.switchMonitorTab = function (type) {
        const attBtn = document.getElementById('tab-monitor-attendance');
        const resBtn = document.getElementById('tab-monitor-results');
        const attView = document.getElementById('monitor-view-attendance');
        const resView = document.getElementById('monitor-view-results');

        if (type === 'attendance') {
            attBtn.className = "px-4 py-2 rounded-md bg-blue-100 text-blue-700 font-medium";
            resBtn.className = "px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50";
            attView.classList.remove('hidden');
            resView.classList.add('hidden');
            loadClassAttendance();
        } else {
            resBtn.className = "px-4 py-2 rounded-md bg-blue-100 text-blue-700 font-medium";
            attBtn.className = "px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50";
            resView.classList.remove('hidden');
            attView.classList.add('hidden');
            loadClassResults();
        }
    }

    // Quick Navigation
    window.quickNav = function (destination) {
        if (destination === 'attendance') {
            switchTab('monitoring');
            switchMonitorTab('attendance');
            const el = document.getElementById('monitoring-tab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (destination === 'academics') {
            switchTab('monitoring');
            switchMonitorTab('results');
            const el = document.getElementById('monitoring-tab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (destination === 'reports') {
            switchTab('teacher-reports');
            const el = document.getElementById('teacher-reports-tab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// Global state for monitoring
let monitoringData = { students: [] };

// 1. Teacher Reports
async function loadTeacherReports() {
    console.log("Loading teacher reports...");
    const tbody = document.getElementById('teacher-reports-body');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center">Loading...</td></tr>';

    try {
        const msgsRef = collection(db, 'messages');
        // Removed orderBy to avoid needing a composite index. Sorting in client-side instead.
        const q = query(msgsRef, where('type', '==', 'teacher_report'));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No reports found.</td></tr>';
            return;
        }

        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by date descending (newest first)
        reports.sort((a, b) => new Date(b.date) - new Date(a.date));

        tbody.innerHTML = reports.map(data => {
            return `
                <tr class="border-b hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm">${new Date(data.date).toLocaleDateString()}</td>
                    <td class="px-6 py-4 text-sm font-semibold">${data.fromName || 'Unknown'}</td>
                    <td class="px-6 py-4 text-sm">${data.fromClass ? 'Class ' + data.fromClass : '-'}</td>
                    <td class="px-6 py-4 text-sm">${data.subject || '-'}</td>
                    <td class="px-6 py-4 text-sm max-w-xs truncate" title="${data.message}">${data.message || '-'}</td>
                    <td class="px-6 py-4 text-center">
                        <button onclick="deleteTeacherReport('${data.id}')" class="text-red-600 hover:text-red-800 transition-colors" title="Delete Report">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (error) {
        console.error("Error loading teacher reports:", error);
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Error: ${error.message}</td></tr>`;
    }
}

window.deleteTeacherReport = async function (id) {
    if (confirm('Are you sure you want to delete this report?')) {
        const result = await firestoreHelper.deleteDocument('messages', id);
        if (result.success) {
            alert('Report deleted successfully');
            loadTeacherReports();
        } else {
            alert('Error deleting report: ' + result.error);
        }
    }
};

// 2. Class Monitoring
window.loadClassMonitoringData = async function () {
    const className = document.getElementById('monitor-class-select').value;
    if (!className) return;

    // Fetch students for this class once
    const result = await firestoreHelper.getDocuments('students', [where('class', '==', className)]);
    if (result.success) {
        monitoringData.students = result.data;
        // Trigger reload of active view
        const attView = document.getElementById('monitor-view-attendance');
        if (attView && !attView.classList.contains('hidden')) {
            loadClassAttendance();
        } else {
            loadClassResults();
        }
    }
};

window.loadClassAttendance = async function () {
    const className = document.getElementById('monitor-class-select').value;
    const date = document.getElementById('monitor-attendance-date').value;
    const tbody = document.getElementById('monitor-attendance-body');

    if (!className || !date) {
        if (tbody) tbody.innerHTML = '<tr><td colspan="2" class="px-6 py-4 text-center text-gray-500">Please select class and date.</td></tr>';
        return;
    }

    if (monitoringData.students.length === 0) {
        if (tbody) tbody.innerHTML = '<tr><td colspan="2" class="px-6 py-4 text-center text-gray-500">No students in this class.</td></tr>';
        return;
    }

    if (tbody) tbody.innerHTML = '<tr><td colspan="2" class="px-6 py-4 text-center">Loading attendance...</td></tr>';

    try {
        const docId = `${className}_${date}`;
        const attDoc = await firestoreHelper.getDocument('attendance', docId);

        let records = {};
        if (attDoc.success) {
            records = attDoc.data.records || {};
            const pCount = document.getElementById('monitor-present-count');
            const aCount = document.getElementById('monitor-absent-count');
            if (pCount) pCount.textContent = attDoc.data.presentCount || 0;
            if (aCount) aCount.textContent = (monitoringData.students.length - (attDoc.data.presentCount || 0));
        } else {
            const pCount = document.getElementById('monitor-present-count');
            const aCount = document.getElementById('monitor-absent-count');
            if (pCount) pCount.textContent = '0';
            if (aCount) aCount.textContent = '0';
        }

        if (tbody) {
            tbody.innerHTML = monitoringData.students.map(student => {
                const status = records[student.id] || 'absent';
                const statusDisplay = attDoc.success
                    ? (status === 'present'
                        ? '<span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Present</span>'
                        : '<span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Absent</span>')
                    : '<span class="text-gray-400 text-xs italic">Not Marked</span>';

                return `
                    <tr class="border-b">
                        <td class="px-6 py-4">${student.studentName || student.name}</td>
                        <td class="px-6 py-4">${statusDisplay}</td>
                    </tr>
                `;
            }).join('');
        }

    } catch (e) {
        console.error(e);
    }
};

window.loadClassResults = function () {
    const className = document.getElementById('monitor-class-select').value;
    const examName = document.getElementById('monitor-exam-select').value;
    const examKey = examName.replace(/\s+/g, '_');
    const tbody = document.getElementById('monitor-results-body');

    if (!className) {
        if (tbody) tbody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-gray-500">Please select a class.</td></tr>';
        return;
    }

    if (tbody) {
        tbody.innerHTML = monitoringData.students.map(student => {
            let marks = '-';
            let details = '-';
            if (student.examMarks && student.examMarks[examKey]) {
                marks = `<span class="font-bold text-blue-700">${student.examMarks[examKey].percentage}%</span>`;
                details = `<span class="text-xs text-gray-500">Updated: ${new Date(student.examMarks[examKey].updatedAt).toLocaleDateString()}</span>`;
            }

            return `
                <tr class="border-b hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium">${student.studentName || student.name}</td>
                    <td class="px-6 py-4">${marks}</td>
                    <td class="px-6 py-4">${details}</td>
                </tr>
            `;
        }).join('');
    }
};


// Load all data
async function loadAllData() {
    await Promise.all([
        loadAdmissions(),
        loadStudents(),
        loadTeachers(),
        loadMessages(),
        loadNotifications()
    ]);
    updateStats();
}

// ========== STUDENTS MANAGEMENT ==========

async function loadStudents() {
    const result = await firestoreHelper.getDocuments('students');
    if (result.success) {
        allStudents = result.data;
        displayStudents(allStudents);
    } else {
        allStudents = [];
        displayStudents([]);
    }
}

function displayStudents(students) {
    const tbody = document.getElementById('students-table-body');

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">No students found</td></tr>';
        return;
    }

    tbody.innerHTML = students.map(student => `
        <tr class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">
                <img src="${student.photo || '../assets/images/logo.png'}" alt="Student" 
                     class="w-10 h-10 rounded-full object-cover border border-gray-200">
            </td>
            <td class="px-6 py-4">${student.rollNumber || 'N/A'}</td>
            <td class="px-6 py-4 font-semibold">${student.studentName || 'N/A'}</td>
            <td class="px-6 py-4">${formatClass(student.class)}</td>
            <td class="px-6 py-4">${student.fatherName || 'N/A'}</td>
            <td class="px-6 py-4">${student.mobile || 'N/A'}</td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${student.status || 'active'}
                </span>
            </td>
            <td class="px-6 py-4 text-center">
                <button onclick="editStudent('${student.id}')" class="text-blue-600 hover:text-blue-800 mr-3" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteStudent('${student.id}')" class="text-red-600 hover:text-red-800" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

window.openAddStudentModal = function () {
    currentEditingStudent = null;
    document.getElementById('student-modal-title').textContent = 'Add Student';
    document.getElementById('student-form').reset();
    document.getElementById('student-id').value = '';
    document.getElementById('student-preview').src = '../assets/images/logo.png'; // Reset preview
    document.getElementById('student-modal').classList.remove('hidden');
};

window.closeStudentModal = function () {
    document.getElementById('student-modal').classList.add('hidden');
    currentEditingStudent = null;
};

window.editStudent = async function (id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;

    currentEditingStudent = student;
    document.getElementById('student-modal-title').textContent = 'Edit Student';
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-name').value = student.studentName || student.name || '';
    document.getElementById('student-roll').value = student.rollNumber || '';
    document.getElementById('student-class').value = student.class || '';
    document.getElementById('student-dob').value = student.dob || '';
    document.getElementById('student-gender').value = student.gender || '';
    document.getElementById('student-father').value = student.fatherName || '';
    document.getElementById('student-mother').value = student.motherName || '';
    document.getElementById('student-mobile').value = student.mobile || '';
    document.getElementById('student-email').value = student.email || '';
    document.getElementById('student-address').value = student.address || '';
    document.getElementById('student-preview').src = student.photo || '../assets/images/logo.png'; // Set preview

    document.getElementById('student-modal').classList.remove('hidden');
};

window.handleStudentSubmit = async function (e) {
    e.preventDefault();

    const studentData = {
        studentName: document.getElementById('student-name').value,
        rollNumber: document.getElementById('student-roll').value,
        class: document.getElementById('student-class').value,
        dob: document.getElementById('student-dob').value,
        gender: document.getElementById('student-gender').value,
        fatherName: document.getElementById('student-father').value,
        motherName: document.getElementById('student-mother').value,
        mobile: document.getElementById('student-mobile').value,
        email: document.getElementById('student-email').value,
        address: document.getElementById('student-address').value,
        updatedAt: new Date().toISOString()
    };

    // Handle File Upload
    const photoFile = document.getElementById('student-photo').files[0];
    if (photoFile) {
        const uploadResult = await storageHelper.uploadFile(photoFile, `students/${Date.now()}_${photoFile.name}`);
        if (uploadResult.success) {
            studentData.photo = uploadResult.url;
        } else {
            alert('Failed to upload photo: ' + uploadResult.error);
            return;
        }
    }

    const studentId = document.getElementById('student-id').value;

    if (studentId) {
        // Update existing student
        const result = await firestoreHelper.updateDocument('students', studentId, studentData);
        if (result.success) {
            alert('Student updated successfully!');
            closeStudentModal();
            await loadStudents();
        } else {
            alert('Error updating student: ' + result.error);
        }
    } else {
        // Add new student
        studentData.createdAt = new Date().toISOString();
        const result = await firestoreHelper.addDocument('students', studentData);
        if (result.success) {
            alert('Student added successfully!');
            closeStudentModal();
            await loadStudents();
        } else {
            alert('Error adding student: ' + result.error);
        }
    }
}

window.deleteStudent = async function (id) {
    if (!confirm('Are you sure you want to delete this student?')) return;

    const result = await firestoreHelper.deleteDocument('students', id);
    if (result.success) {
        alert('Student deleted successfully!');
        await loadStudents();
    } else {
        alert('Error deleting student: ' + result.error);
    }
};

window.searchStudents = function () {
    const query = document.getElementById('student-search').value.toLowerCase();
    const classFilter = document.getElementById('class-filter').value;

    let filtered = allStudents;

    if (classFilter !== 'all') {
        filtered = filtered.filter(s => s.class === classFilter);
    }

    if (query) {
        filtered = filtered.filter(s =>
            (s.studentName && s.studentName.toLowerCase().includes(query)) ||
            (s.rollNumber && s.rollNumber.toLowerCase().includes(query)) ||
            (s.mobile && s.mobile.includes(query))
        );
    }

    displayStudents(filtered);
};

window.filterStudents = function () {
    searchStudents(); // Reuse search function
};

window.exportStudents = function () {
    if (allStudents.length === 0) {
        alert('No students to export!');
        return;
    }

    // Create CSV
    const headers = ['Roll No', 'Name', 'Class', 'DOB', 'Gender', 'Father Name', 'Mother Name', 'Mobile', 'Email', 'Address', 'Status'];
    const rows = allStudents.map(s => [
        s.rollNumber || '',
        s.studentName || '',
        s.class || '',
        s.dob || '',
        s.gender || '',
        s.fatherName || '',
        s.motherName || '',
        s.mobile || '',
        s.email || '',
        s.address || '',
        s.status || ''
    ]);

    let csv = headers.join(',') + '\\n';
    rows.forEach(row => {
        csv += row.map(field => `"${field}"`).join(',') + '\\n';
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
};

// ========== TEACHERS MANAGEMENT ==========

async function loadTeachers() {
    const result = await firestoreHelper.getDocuments('teachers');
    if (result.success) {
        allTeachers = result.data;
        displayTeachers(allTeachers);
    } else {
        allTeachers = [];
        displayTeachers([]);
    }
}

function displayTeachers(teachers) {
    const tbody = document.getElementById('teachers-table-body');

    if (teachers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">No teachers found</td></tr>';
        return;
    }

    tbody.innerHTML = teachers.map(teacher => `
        <tr class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">
                <img src="${teacher.photo || '../assets/images/logo.png'}" alt="Teacher" 
                     class="w-10 h-10 rounded-full object-cover border border-gray-200">
            </td>
            <td class="px-6 py-4 font-semibold">${teacher.name || 'N/A'}</td>
            <td class="px-6 py-4">${teacher.email || 'N/A'}</td>
            <td class="px-6 py-4">${teacher.mobile || 'N/A'}</td>
            <td class="px-6 py-4">${teacher.subject || 'N/A'}</td>
            <td class="px-6 py-4">
                ${teacher.assignedClass ? `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">${formatClass(teacher.assignedClass)}</span>` : '-'}
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${teacher.status || 'active'}
                </span>
            </td>
            <td class="px-6 py-4 text-center">
                <button onclick="editTeacher('${teacher.id}')" class="text-blue-600 hover:text-blue-800 mr-3" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteTeacher('${teacher.id}')" class="text-red-600 hover:text-red-800" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Global Preview Function
window.previewImage = function (input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(previewId).src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
};


window.openAddStudentModal = function () {
    currentEditingStudent = null;
    document.getElementById('student-modal-title').textContent = 'Add Student';
    document.getElementById('student-form').reset();
    document.getElementById('student-id').value = '';
    document.getElementById('student-preview').src = '../assets/images/logo/logo.png';
    document.getElementById('student-modal').classList.remove('hidden');
};

window.editStudent = function (id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;

    currentEditingStudent = student;
    document.getElementById('student-modal-title').textContent = 'Edit Student';
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-roll').value = student.rollNumber || '';
    document.getElementById('student-name').value = student.studentName || '';
    document.getElementById('student-class').value = student.class || '';
    document.getElementById('student-father').value = student.fatherName || '';
    document.getElementById('student-mother').value = student.motherName || '';
    document.getElementById('student-mobile').value = student.mobile || '';
    document.getElementById('student-admission-date').value = student.admissionDate || '';
    document.getElementById('student-preview').src = student.photo || '../assets/images/logo/logo.png';

    document.getElementById('student-modal').classList.remove('hidden');
};

window.handleStudentSubmit = async function (e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';

    try {
        const studentData = {
            rollNumber: document.getElementById('student-roll').value,
            studentName: document.getElementById('student-name').value,
            class: document.getElementById('student-class').value,
            fatherName: document.getElementById('student-father').value,
            motherName: document.getElementById('student-mother').value,
            mobile: document.getElementById('student-mobile').value,
            admissionDate: document.getElementById('student-admission-date').value,
            updatedAt: new Date().toISOString()
        };

        const studentId = document.getElementById('student-id').value;
        const photoFile = document.getElementById('student-photo').files[0];

        // Handle File Upload
        if (photoFile) {
            const uploadResult = await storageHelper.uploadFile(photoFile, `students/${Date.now()}_${photoFile.name}`);
            if (uploadResult.success) {
                studentData.photo = uploadResult.url;
            } else {
                throw new Error('Failed to upload photo: ' + uploadResult.error);
            }
        }

        let result;
        if (studentId) {
            result = await firestoreHelper.updateDocument('students', studentId, studentData);
        } else {
            studentData.createdAt = new Date().toISOString();
            result = await firestoreHelper.addDocument('students', studentData);
        }

        if (result.success) {
            // Show success UI immediately without alert blocking
            const successMsg = document.createElement('div');
            successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce';
            successMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Saved Successfully!';
            document.body.appendChild(successMsg);

            setTimeout(() => successMsg.remove(), 3000);

            document.getElementById('student-modal').classList.add('hidden');
            loadStudents();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
};

window.openAddTeacherModal = function () {
    currentEditingTeacher = null;
    document.getElementById('teacher-modal-title').textContent = 'Add Teacher';
    document.getElementById('teacher-form').reset();
    document.getElementById('teacher-id').value = '';
    document.getElementById('teacher-preview').src = '../assets/images/logo.png'; // Reset preview
    document.getElementById('teacher-modal').classList.remove('hidden');
};

window.editTeacher = async function (id) {
    const teacher = allTeachers.find(t => t.id === id);
    if (!teacher) return;

    currentEditingTeacher = teacher;
    document.getElementById('teacher-modal-title').textContent = 'Edit Teacher';
    document.getElementById('teacher-id').value = teacher.id;
    document.getElementById('teacher-name').value = teacher.name || '';
    document.getElementById('teacher-email').value = teacher.email || '';
    document.getElementById('teacher-mobile').value = teacher.mobile || '';
    document.getElementById('teacher-qualification').value = teacher.qualification || '';
    document.getElementById('teacher-subject').value = teacher.subject || '';
    document.getElementById('teacher-assigned-class').value = teacher.assignedClass || '';
    document.getElementById('teacher-joining-date').value = teacher.joiningDate || '';
    document.getElementById('teacher-preview').src = teacher.photo || '../assets/images/logo.png'; // Set preview

    document.getElementById('teacher-modal').classList.remove('hidden');
};

window.handleTeacherSubmit = async function (e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';

    try {
        const teacherData = {
            name: document.getElementById('teacher-name').value,
            email: document.getElementById('teacher-email').value,
            mobile: document.getElementById('teacher-mobile').value,
            qualification: document.getElementById('teacher-qualification').value,
            subject: document.getElementById('teacher-subject').value,
            assignedClass: document.getElementById('teacher-assigned-class').value,
            joiningDate: document.getElementById('teacher-joining-date').value,
            status: 'active',
            updatedAt: new Date().toISOString()
        };

        const password = document.getElementById('teacher-password').value;
        const teacherId = document.getElementById('teacher-id').value;
        const photoFile = document.getElementById('teacher-photo').files[0];

        // Handle File Upload
        if (photoFile) {
            const uploadResult = await storageHelper.uploadFile(photoFile, `teachers/${Date.now()}_${photoFile.name}`);
            if (uploadResult.success) {
                teacherData.photo = uploadResult.url;
            } else {
                throw new Error('Failed to upload photo: ' + uploadResult.error);
            }
        }

        if (teacherId) {
            // Update existing teacher
            const result = await firestoreHelper.updateDocument('teachers', teacherId, teacherData);
            if (result.success) {
                showSuccessToast('Teacher updated successfully!');
                closeTeacherModal();
                loadTeachers(); // Don't await, let it load in background
            } else {
                throw new Error('Error updating teacher: ' + result.error);
            }
        } else {
            // Add new teacher AND Create Auth Account
            if (!password) {
                throw new Error('Password is required for new teachers!');
            }

            teacherData.createdAt = new Date().toISOString();

            // 1. Create Auth Account
            const authResult = await authHelper.createSecondaryAccount(teacherData.email, password, {
                name: teacherData.name,
                role: 'teacher'
            });

            if (authResult.success) {
                // 2. Add to 'teachers' collection with the real UID
                teacherData.uid = authResult.uid;
                const result = await firestoreHelper.addDocument('teachers', teacherData);

                if (result.success) {
                    showSuccessToast('Teacher Account Created!');
                    closeTeacherModal();
                    loadTeachers();
                } else {
                    throw new Error('Account created but failed to save profile: ' + result.error);
                }
            } else {
                throw new Error('Error creating login account: ' + authResult.error);
            }
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// Helper for consistency
function showSuccessToast(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce';
    successMsg.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
}

window.deleteTeacher = async function (id) {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    const result = await firestoreHelper.deleteDocument('teachers', id);
    if (result.success) {
        alert('Teacher deleted successfully!');
        await loadTeachers();
    } else {
        alert('Error deleting teacher: ' + result.error);
    }
};

window.searchTeachers = function () {
    const query = document.getElementById('teacher-search').value.toLowerCase();

    const filtered = allTeachers.filter(t =>
        (t.name && t.name.toLowerCase().includes(query)) ||
        (t.email && t.email.toLowerCase().includes(query)) ||
        (t.mobile && t.mobile.includes(query)) ||
        (t.subject && t.subject.toLowerCase().includes(query))
    );

    displayTeachers(filtered);
};

// ========== ADMISSIONS MANAGEMENT ==========

async function loadAdmissions() {
    const result = await firestoreHelper.getDocuments('admissions');
    if (result.success) {
        allAdmissions = result.data;
        displayAdmissions(allAdmissions);
        displayRecentActivity();
    }
}

function displayAdmissions(admissions) {
    const container = document.getElementById('admissions-list');

    if (admissions.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No admissions found</p>';
        return;
    }

    container.innerHTML = admissions.map(admission => `
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-800">${admission.student_name || 'N/A'}</h4>
                    <div class="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                        <p><i class="fas fa-graduation-cap mr-2"></i>Class: ${admission.class || 'N/A'}</p>
                        <p><i class="fas fa-calendar mr-2"></i>DOB: ${admission.dob || 'N/A'}</p>
                        <p><i class="fas fa-phone mr-2"></i>${admission.mobile || 'N/A'}</p>
                        <p><i class="fas fa-envelope mr-2"></i>${admission.email || 'N/A'}</p>
                    </div>
                    <p class="text-sm text-gray-600 mt-2"><i class="fas fa-user mr-2"></i>Father: ${admission.father_name || 'N/A'}</p>
                </div>
                <div class="text-right ml-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${admission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            admission.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
        }">
                        ${admission.status || 'pending'}
                    </span>
                    <p class="text-xs text-gray-500 mt-2">
                        ${new Date(admission.submittedAt || admission.createdAt).toLocaleDateString('hi-IN')}
                    </p>
                </div>
            </div>
            <div class="flex gap-2">
                ${admission.status === 'pending' ? `
                    <button onclick="updateAdmissionStatus('${admission.id}', 'approved')" 
                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                        <i class="fas fa-check mr-1"></i>Approve
                    </button>
                    <button onclick="updateAdmissionStatus('${admission.id}', 'rejected')" 
                        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
                        <i class="fas fa-times mr-1"></i>Reject
                    </button>
                ` : ''}
                <button onclick="viewAdmissionDetails('${admission.id}')" 
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    <i class="fas fa-eye mr-1"></i>View Details
                </button>
            </div>
        </div>
    `).join('');
}

window.updateAdmissionStatus = async function (id, status) {
    if (!confirm(`Are you sure you want to ${status} this application?`)) return;

    const result = await firestoreHelper.updateDocument('admissions', id, { status });
    if (result.success) {
        // If approved, create student record
        if (status === 'approved') {
            const admission = allAdmissions.find(a => a.id === id);
            if (admission) {
                await createStudentFromAdmission(admission);
            }
        }
        alert(`Application ${status} successfully!`);
        await loadAdmissions();
        await loadStudents();
    } else {
        alert('Error updating status: ' + result.error);
    }
};

async function createStudentFromAdmission(admission) {
    const studentData = {
        studentName: admission.student_name,
        rollNumber: '', // Will be assigned manually
        class: admission.class,
        dob: admission.dob,
        gender: admission.gender || '',
        fatherName: admission.father_name,
        motherName: admission.mother_name,
        mobile: admission.mobile,
        email: admission.email,
        address: admission.address,
        status: 'active',
        createdAt: new Date().toISOString()
    };

    await firestoreHelper.addDocument('students', studentData);
}

// Admission Modal Functions
window.closeAdmissionModal = function () {
    document.getElementById('admission-modal').classList.add('hidden');
};

window.viewAdmissionDetails = function (id) {
    const admission = allAdmissions.find(a => a.id === id);
    if (!admission) return;

    // Populate Text Fields
    const fields = {
        'modal-name': admission.student_name,
        'modal-class': admission.class,
        'modal-dob': admission.dob,
        'modal-gender': admission.gender,
        'modal-aadhar': admission.aadhar,
        'modal-father': admission.father_name,
        'modal-mother': admission.mother_name,
        'modal-mobile': admission.mobile,
        'modal-email': admission.email,
        'modal-address': admission.address,
        'modal-prev-school': admission.previous_school || '-',
        'modal-prev-class': admission.previous_class || '-',
        'modal-prev-marks': admission.previous_marks ? admission.previous_marks + '%' : '-',
        'modal-status': admission.status
    };

    for (const [id, value] of Object.entries(fields)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value || 'N/A';
    }

    // Status Banner Styling
    const banner = document.getElementById('modal-status-banner');
    const statusText = document.getElementById('modal-status');
    banner.className = `p-4 rounded-lg border-l-4 mb-6 ${admission.status === 'approved' ? 'bg-green-100 border-green-500 text-green-800' :
        admission.status === 'rejected' ? 'bg-red-100 border-red-500 text-red-800' :
            'bg-yellow-100 border-yellow-500 text-yellow-800'
        }`;

    // Action Buttons
    const actionContainer = document.getElementById('modal-actions');
    // preserve the close button
    actionContainer.innerHTML = '<button onclick="closeAdmissionModal()" class="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-bold text-gray-700">Close</button>';

    if (admission.status === 'pending') {
        actionContainer.innerHTML = `
            <button onclick="updateAdmissionStatus('${admission.id}', 'approved'); closeAdmissionModal()" class="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-bold text-white">Approve</button>
            <button onclick="updateAdmissionStatus('${admission.id}', 'rejected'); closeAdmissionModal()" class="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-bold text-white">Reject</button>
            <button onclick="closeAdmissionModal()" class="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-bold text-gray-700">Close</button>
        `;
    }

    // Populate Images
    const docs = admission.documents || {};

    const setupImage = (imgId, linkId, url, placeholder) => {
        const img = document.getElementById(imgId);
        const link = document.getElementById(linkId);

        if (url) {
            img.src = url;
            link.href = url;
            img.parentElement.style.display = 'block';
        } else {
            img.src = 'https://via.placeholder.com/300?text=No+Document'; // Or a local placeholder
            link.href = '#';
            link.onclick = (e) => e.preventDefault();
        }
    };

    setupImage('img-photo', 'link-photo', docs.photo);
    setupImage('img-aadhar', 'link-aadhar', docs.aadharCard);
    setupImage('img-birth', 'link-birth', docs.birthCertificate);

    // Show Modal
    document.getElementById('admission-modal').classList.remove('hidden');
};

window.filterAdmissions = function () {
    const filter = document.getElementById('admission-filter').value;
    const filtered = filter === 'all' ? allAdmissions : allAdmissions.filter(a => a.status === filter);
    displayAdmissions(filtered);
};

function displayRecentActivity() {
    const container = document.getElementById('recent-activity');
    const recent = allAdmissions.slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No recent activity</p>';
        return;
    }

    container.innerHTML = recent.map(admission => `
        <div class="border-b pb-3">
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-semibold text-gray-800">${admission.student_name || 'N/A'}</p>
                    <p class="text-sm text-gray-600">Applied for Class ${admission.class || 'N/A'}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${admission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            admission.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
        }">
                    ${admission.status || 'pending'}
                </span>
            </div>
        </div>
    `).join('');
}

// ========== MESSAGES MANAGEMENT ==========

async function loadMessages() {
    const result = await firestoreHelper.getDocuments('contacts');
    if (result.success) {
        allMessages = result.data;
        displayMessages(allMessages);
    }
}

function displayMessages(messages) {
    const container = document.getElementById('messages-list');

    if (messages.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No messages yet</p>';
        return;
    }

    container.innerHTML = messages.map(msg => `
        <div class="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow ${!msg.read ? 'border-l-4 border-l-blue-600' : ''}">
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800">${msg.name || 'Anonymous'}</h4>
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-envelope mr-2"></i>${msg.email || 'N/A'}
                        <i class="fas fa-phone ml-4 mr-2"></i>${msg.phone || 'N/A'}
                    </p>
                </div>
                <div class="text-right">
                    ${!msg.read ? '<span class="bg-blue-600 text-white px-2 py-1 rounded text-xs">New</span>' : ''}
                    <p class="text-xs text-gray-500 mt-1">
                        ${new Date(msg.createdAt).toLocaleDateString('hi-IN')}
                    </p>
                </div>
            </div>
            <p class="text-gray-700 mb-3">${msg.message || 'No message'}</p>
            <div class="flex gap-2">
                ${!msg.read ? `
                    <button onclick="markAsRead('${msg.id}')" 
                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                        <i class="fas fa-check mr-1"></i>Mark as Read
                    </button>
                ` : ''}
                <button onclick="deleteMessage('${msg.id}')" 
                    class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
                    <i class="fas fa-trash mr-1"></i>Delete
                </button>
            </div>
        </div>
    `).join('');
}

window.markAsRead = async function (id) {
    const result = await firestoreHelper.updateDocument('contacts', id, { read: true });
    if (result.success) {
        await loadMessages();
    }
};

window.deleteMessage = async function (id) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const result = await firestoreHelper.deleteDocument('contacts', id);
    if (result.success) {
        alert('Message deleted successfully!');
        await loadMessages();
    }
};

window.filterMessages = function () {
    const filter = document.getElementById('message-filter').value;
    const filtered = filter === 'all' ? allMessages :
        filter === 'new' ? allMessages.filter(m => !m.read) :
            allMessages.filter(m => m.read);
    displayMessages(filtered);
};

// ========== NOTIFICATIONS MANAGEMENT ==========

async function loadNotifications() {
    const result = await firestoreHelper.getDocuments('notifications');
    if (result.success) {
        allNotifications = result.data;
        displayNotifications(allNotifications);
    } else {
        document.getElementById('notifications-list').innerHTML = '<p class="text-gray-500 text-center py-4">No notifications yet</p>';
    }
}

function displayNotifications(notifications) {
    const container = document.getElementById('notifications-list');

    if (notifications.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">No notifications yet. Add one above!</p>';
        return;
    }

    container.innerHTML = notifications.map(notif => `
        <div class="bg-white border-2 border-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <i class="fas ${notif.icon} text-yellow-500 text-xl"></i>
                <p class="text-gray-800">${notif.message}</p>
            </div>
            <button onclick="deleteNotification('${notif.id}')" 
                class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

async function handleNotificationSubmit(e) {
    e.preventDefault();

    const icon = document.getElementById('notif-icon').value;
    const message = document.getElementById('notif-message').value;

    const result = await firestoreHelper.addDocument('notifications', {
        icon: icon,
        message: message,
        active: true
    });

    if (result.success) {
        alert('Notification added successfully!');
        e.target.reset();
        await loadNotifications();
    } else {
        alert('Error adding notification: ' + result.error);
    }
}

window.deleteNotification = async function (id) {
    if (!confirm('Are you sure you want to delete this notification?')) return;

    const result = await firestoreHelper.deleteDocument('notifications', id);
    if (result.success) {
        alert('Notification deleted successfully!');
        await loadNotifications();
    }
};

// ========== UTILITY FUNCTIONS ==========

function formatClass(cls) {
    const classMap = {
        'pre-nursery': 'Pre-Nursery',
        'nursery': 'Nursery',
        'lkg': 'LKG',
        'ukg': 'UKG',
        '1': 'Class 1',
        '2': 'Class 2',
        '3': 'Class 3',
        '4': 'Class 4',
        '5': 'Class 5'
    };
    return classMap[cls] || cls;
}

function updateStats() {
    document.getElementById('total-admissions').textContent = allAdmissions.length;
    document.getElementById('pending-admissions').textContent = allAdmissions.filter(a => a.status === 'pending').length;
    document.getElementById('total-contacts').textContent = allMessages.length;
    document.getElementById('total-students').textContent = allStudents.length;
}

// Tab switching
window.switchTab = function (tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const content = document.getElementById(`${tab}-tab`);
    if (content) content.classList.add('active');

    // Support finding button by onclick attribute (for sidebar) or ID if added
    const btn = document.querySelector(`button[onclick="switchTab('${tab}')"]`);
    if (btn) btn.classList.add('active');

    // Load data specific to tabs
    if (tab === 'teacher-reports') {
        loadTeacherReports();
    }
};

// Initialize on load
initDashboard();


// Monitoring Sub-tabs
// Log page view
analyticsHelper.logPageView('admin_dashboard');

// ========== GLOBAL MODAL FUNCTIONS ==========
window.closeTeacherModal = function () {
    const modal = document.getElementById('teacher-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.getElementById('teacher-form').reset();
        document.getElementById('teacher-preview').src = '../assets/images/logo/logo.png';
        currentEditingTeacher = null;
    }
};

window.openAddTeacherModal = function () {
    const modal = document.getElementById('teacher-modal');
    if (modal) {
        document.getElementById('teacher-form').reset();
        document.getElementById('teacher-id').value = '';
        document.getElementById('teacher-preview').src = '../assets/images/logo/logo.png';
        document.getElementById('teacher-modal-title').textContent = 'Add Teacher';
        // Reset specific fields
        document.getElementById('teacher-password').placeholder = 'Set login password';

        modal.classList.remove('hidden');
    }
};

// Ensure other modals also have their close functions if not defined
if (!window.closeStudentModal) {
    window.closeStudentModal = function () {
        document.getElementById('student-modal').classList.add('hidden');
        document.getElementById('student-form').reset();
        document.getElementById('student-preview').src = '../assets/images/logo/logo.png';
        currentEditingStudent = null;
        document.getElementById('student-modal-title').textContent = 'Add Student';
    };
}
