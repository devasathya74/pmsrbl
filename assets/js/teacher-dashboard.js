import { auth, db, authHelper, firestoreHelper, onAuthStateChanged, collection, query, where, getDocs, doc, setDoc, addDoc } from './firebase-config.js';

let currentUser = null;
let currentTeacherProfile = null;
let myStudents = [];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', async () => {
    // Set default date for attendance
    document.getElementById('attendance-date').valueAsDate = new Date();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            await loadTeacherProfile(user.email);
        } else {
            window.location.href = 'login.html';
        }
    });
});

async function loadTeacherProfile(email) {
    try {
        // Find teacher document by email
        // Note: Ideally, 'teachers' collection should key by uid, but if created by admin as a simple doc, we query by email.
        const teachersRef = collection(db, 'teachers');
        const q = query(teachersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            currentTeacherProfile = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };

            // UI Updates
            document.getElementById('teacher-name-sidebar').textContent = currentTeacherProfile.name;
            const headerName = document.getElementById('teacher-name-header');
            if (headerName) headerName.textContent = currentTeacherProfile.name;

            // Update Date
            const dateElement = document.getElementById('current-date');
            if (dateElement) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateElement.textContent = new Date().toLocaleDateString('en-US', options);
            }

            // Update Profile Photo
            const photoUrl = currentTeacherProfile.photo || '../assets/images/logo/logo.png';
            const headerImg = document.getElementById('teacher-profile-img');
            const sidebarImg = document.getElementById('sidebar-profile-img');

            if (headerImg) headerImg.src = photoUrl;
            if (sidebarImg) sidebarImg.src = photoUrl;

            document.getElementById('class-name-header').textContent = `Class ${currentTeacherProfile.assignedClass || 'Unassigned'}`;

            if (currentTeacherProfile.assignedClass) {
                await loadStudents(currentTeacherProfile.assignedClass);
            } else {
                alert('You have not been assigned a class yet. Please contact the administrator.');
            }
        } else {
            console.error('Teacher profile not found for email:', email);
            // Fallback if testing with admin login
            if (email === 'admin@pms.com') { // Mock for testing
                currentTeacherProfile = { name: "Admin Teacher", assignedClass: "5" };
                await loadStudents("5");
            } else {
                alert('Access Denied. Teacher profile not found.');
                authHelper.logout();
            }
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

async function loadStudents(className) {
    const tableBody = document.getElementById('students-table-body');
    const progressBody = document.getElementById('progress-table-body');
    tableBody.innerHTML = '<tr><td colspan="5" class="p-4 text-center">Loading...</td></tr>';

    // 1. Get students for this class
    // Note: Assuming 'students' collection has a 'class' field.
    const result = await firestoreHelper.getDocuments('students', [where('class', '==', className)]);

    if (result.success) {
        myStudents = result.data;
        // Sort by Roll Number (Numeric)
        myStudents.sort((a, b) => {
            const r1 = parseInt(a.rollNumber) || 999999;
            const r2 = parseInt(b.rollNumber) || 999999;
            return r1 - r2;
        });

        document.getElementById('stat-total-students').textContent = myStudents.length;

        // Render Students List
        renderStudentList(myStudents);

        // Render Progress List
        renderProgressList(myStudents);

        // Render Attendance List (Initial)
        renderAttendanceList(myStudents);
    } else {
        tableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-red-500">Error: ${result.error}</td></tr>`;
    }
}

function renderStudentList(students) {
    const tbody = document.getElementById('students-table-body');
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-gray-500">No students found in this class.</td></tr>';
        return;
    }

    tbody.innerHTML = students.map(student => `
        <tr class="hover:bg-gray-50 border-b last:border-0 transition">
            <td class="p-4 font-medium text-gray-800">${student.studentName || student.name}</td>
            <td class="p-4 text-gray-600">${student.rollNumber || '-'}</td>
            <td class="p-4 text-gray-600">${student.fatherName || '-'}</td>
            <td class="p-4 text-gray-600">${student.mobile || '-'}</td>
            <td class="p-4">
                <button onclick="viewStudentDetails('${student.id}')" class="text-blue-600 hover:text-blue-800 text-sm font-semibold">View Details</button>
            </td>
        </tr>
    `).join('');
}

// NEW: Render Progress List with Filter
function renderProgressList(students) {
    const tbody = document.getElementById('progress-table-body');
    const filter = document.getElementById('progress-exam-filter').value;
    const examKey = filter.replace(/\s+/g, '_'); // "Unit Test 1" -> "Unit_Test_1"

    tbody.innerHTML = students.map(student => {
        let displayMarks = '-';
        if (student.examMarks && student.examMarks[examKey]) {
            displayMarks = student.examMarks[examKey].percentage + '%';
        }

        return `
        <tr class="hover:bg-gray-50 border-b">
            <td class="p-4 font-medium">${student.studentName || student.name}</td>
            <td class="p-4 text-gray-600 font-semibold">${displayMarks}</td>
            <td class="p-4">
                <button onclick="openMarksModal('${student.id}', '${student.studentName || student.name}')" 
                    class="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm">
                    Update
                </button>
            </td>
        </tr>
    `}).join('');
}

// Global Filter Function
window.filterProgress = function () {
    renderProgressList(myStudents);
};

// Re-added renderAttendanceList
function renderAttendanceList(students) {
    const container = document.getElementById('attendance-list');
    container.innerHTML = students.map(student => `
        <div class="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm bg-gray-50">
            <span class="font-medium text-gray-700">${student.studentName || student.name}</span>
            <div class="flex gap-4">
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" value="${student.id}" class="attendance-present w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" checked>
                    <span class="ml-2 text-sm font-medium text-green-700">Present</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" value="${student.id}" class="attendance-absent w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500">
                    <span class="ml-2 text-sm font-medium text-red-700">Absent</span>
                </label>
            </div>
        </div>
    `).join('');

    // Add listeners to ensure only one checkbox is selected at a time (radio-like behavior)
    document.querySelectorAll('.attendance-present, .attendance-absent').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                const studentId = e.target.value;
                const isPresent = e.target.classList.contains('attendance-present');

                // Find the other checkbox for this student and uncheck it
                const otherClass = isPresent ? 'attendance-absent' : 'attendance-present';
                const otherCheckbox = document.querySelector(`.${otherClass}[value="${studentId}"]`);
                if (otherCheckbox) {
                    otherCheckbox.checked = false;
                }
            } else {
                // Prevent unchecking - at least one must be selected
                // If user tries to uncheck, check the other one
                const studentId = e.target.value;
                const isPresent = e.target.classList.contains('attendance-present');
                const otherClass = isPresent ? 'attendance-absent' : 'attendance-present';
                const otherCheckbox = document.querySelector(`.${otherClass}[value="${studentId}"]`);
                if (otherCheckbox && !otherCheckbox.checked) {
                    e.target.checked = true; // Keep current checked
                }
            }
        });
    });
}

// Global functions for HTML interaction
// NEW: View Student Details
window.viewStudentDetails = function (id) {
    const student = myStudents.find(s => s.id === id);
    if (!student) return;

    document.getElementById('detail-name').textContent = student.studentName || student.name;
    document.getElementById('detail-roll').textContent = "Roll No: " + (student.rollNumber || 'N/A');
    document.getElementById('detail-photo').src = student.photo || '../assets/images/logo.png';

    document.getElementById('detail-dob').textContent = student.dob || '-';
    document.getElementById('detail-gender').textContent = student.gender || '-';
    document.getElementById('detail-address').textContent = student.address || '-';

    document.getElementById('detail-father').textContent = student.fatherName || '-';
    document.getElementById('detail-mother').textContent = student.motherName || '-';
    document.getElementById('detail-mobile').textContent = student.mobile || '-';

    document.getElementById('student-modal').classList.remove('hidden');
};

// NEW: Load Attendance History
window.loadAttendanceHistory = async function () {
    if (!currentTeacherProfile) return;
    const date = document.getElementById('attendance-date').value;
    if (!date) { alert('Please select a date first.'); return; }

    const docId = `${currentTeacherProfile.assignedClass}_${date}`;
    const result = await firestoreHelper.getDocument('attendance', docId);

    if (result.success && result.data) {
        const records = result.data.records || {};
        // Update checkboxes based on history
        Object.keys(records).forEach(studentId => {
            const status = records[studentId];
            const presentCheckbox = document.querySelector(`.attendance-present[value="${studentId}"]`);
            const absentCheckbox = document.querySelector(`.attendance-absent[value="${studentId}"]`);

            if (presentCheckbox && absentCheckbox) {
                if (status === 'present') {
                    presentCheckbox.checked = true;
                    absentCheckbox.checked = false;
                } else {
                    presentCheckbox.checked = false;
                    absentCheckbox.checked = true;
                }
            }
        });
        alert(`Loaded attendance for ${date}.`);
    } else {
        alert(`No attendance record found for ${date}.`);
    }
};

window.saveAttendance = async function () {
    if (!currentTeacherProfile || !myStudents.length) return;

    const date = document.getElementById('attendance-date').value;
    if (!date) { alert('Please select a date'); return; }

    const records = {};
    let presentCount = 0;

    // Collect attendance from present checkboxes
    document.querySelectorAll('.attendance-present').forEach(checkbox => {
        const studentId = checkbox.value;
        const isPresent = checkbox.checked;
        records[studentId] = isPresent ? 'present' : 'absent';
        if (isPresent) presentCount++;
    });

    const attendanceData = {
        date: date,
        class: currentTeacherProfile.assignedClass,
        teacherId: currentTeacherProfile.id,
        teacherName: currentTeacherProfile.name,
        totalStudents: myStudents.length,
        presentCount: presentCount,
        records: records,
        timestamp: new Date().toISOString()
    };

    // Save to 'attendance' collection. ID format: class_date (e.g., 5_2023-10-27) to prevent duplicates/easy fetch
    const docId = `${currentTeacherProfile.assignedClass}_${date}`;

    try {
        await setDoc(doc(db, 'attendance', docId), attendanceData);
        alert('Attendance saved successfully!');
        document.getElementById('stat-present-today').textContent = presentCount; // Simple client update
    } catch (error) {
        console.error('Error saving attendance:', error);
        alert('Failed to save attendance: ' + error.message);
    }
};

window.openMarksModal = function (id, name) {
    document.getElementById('marks-student-id').value = id;
    document.getElementById('marks-student-name').textContent = name;
    document.getElementById('marks-modal').classList.remove('hidden');
};

window.saveStudentMarks = async function () {
    const id = document.getElementById('marks-student-id').value;
    const exam = document.getElementById('exam-name').value;
    const examKey = exam.replace(/\s+/g, '_'); // Create key for map

    // Collect all subjects
    const subjects = ['hindi', 'english', 'math', 'science', 'sst', 'computer', 'art', 'gk'];
    const results = {};
    let total = 0;
    let count = 0;

    subjects.forEach(sub => {
        const val = document.getElementById(`marks-${sub}`).value;
        if (val) {
            results[sub] = parseInt(val);
            total += parseInt(val);
            count++;
        }
    });

    if (count === 0) { alert('Please enter marks for at least one subject.'); return; }

    const percentage = count > 0 ? (total / (count * 100) * 100).toFixed(2) : 0;

    // Data to save inside the map
    const examData = {
        examName: exam,
        results: results,
        percentage: percentage,
        updatedAt: new Date().toISOString()
    };

    try {
        // Save to 'examMarks' map field in student document
        // We use dot notation to update only this specific key in the map
        const updateData = {};
        updateData[`examMarks.${examKey}`] = examData;
        updateData.updatedAt = new Date().toISOString();

        // Also update legacy field for backward compatibility if needed, or just remove it
        updateData.lastExamMarks = `${percentage}% (${exam})`;

        await firestoreHelper.updateDocument('students', id, updateData);

        alert('Report Card Saved!');
        document.getElementById('marks-modal').classList.add('hidden');

        // Reload students to get fresh data
        loadStudents(currentTeacherProfile.assignedClass);

    } catch (error) {
        alert('Error: ' + error.message);
    }
};

window.sendReport = async function (e) {
    e.preventDefault();
    const subject = document.getElementById('report-subject').value;
    const message = document.getElementById('report-message').value;

    const reportData = {
        type: 'teacher_report',
        fromName: currentTeacherProfile.name,
        fromId: currentTeacherProfile.id,
        fromClass: currentTeacherProfile.assignedClass,
        subject: subject,
        message: message,
        date: new Date().toISOString(),
        read: false
    };

    try {
        await firestoreHelper.addDocument('messages', reportData);
        alert('Report sent to Principal successfully!');
        document.getElementById('report-form').reset();
    } catch (error) {
        alert('Failed to send report: ' + error.message);
    }
};

// Make logout available
window.authHelper = authHelper;
window.loadStudents = () => loadStudents(currentTeacherProfile?.assignedClass);
