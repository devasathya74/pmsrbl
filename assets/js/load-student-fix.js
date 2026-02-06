// Load existing student data if in edit mode
async function loadStudentData() {
    if (!isEditMode || !editingStudentId) return;

    console.log('Loading student data for ID:', editingStudentId);

    try {
        const { firestoreHelper } = await import('./firebase-config.js');
        const result = await firestoreHelper.getDocument('students', editingStudentId);

        if (result.success && result.data) {
            const s = result.data;
            console.log('Student data retrieved:', s);

            // Helper function to set field value by name attribute
            const setFieldValue = (name, value) => {
                const field = document.querySelector(`[name="${name}"]`);
                if (field && value !== undefined && value !== null) {
                    field.value = value;
                    console.log(`Set ${name} = ${value}`);
                } else if (!field) {
                    console.warn(`Field not found: ${name}`);
                }
            };

            // Populate all fields using name attributes
            setFieldValue('scholarName', s.studentName);
            setFieldValue('dob', s.dob);
            setFieldValue('targetClass', s.class);
            setFieldValue('fatherName', s.fatherName);
            setFieldValue('motherName', s.motherName);
            setFieldValue('mobile', s.mobile);
            setFieldValue('email', s.email);
            setFieldValue('permAddress', s.address);
            setFieldValue('rollNumber', s.rollNumber);

            // Set photo if available
            if (s.photo) {
                const photoPreview = document.getElementById('photoPreview');
                if (photoPreview) {
                    photoPreview.src = s.photo;
                    console.log('Photo loaded');
                }
            }

            console.log('✅ Student data loaded successfully');
        } else {
            console.error('Failed to load student:', result.error);
        }
    } catch (error) {
        console.error('Error loading student data:', error);
    }
}

// Wait for DOM to be ready before loading data
if (isEditMode) {
    console.log('Edit mode detected, will load student data');
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded, loading student data now');
            loadStudentData();
        });
    } else {
        // DOM already loaded
        console.log('DOM already loaded, loading student data immediately');
        setTimeout(loadStudentData, 500); // Small delay to ensure all scripts loaded
    }
}
