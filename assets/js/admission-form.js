// Admission Form Firebase Integration
import { admissionHelper, analyticsHelper } from './firebase-config.js';

// Log page view
analyticsHelper.logPageView('admission_form');

let currentStep = 0;
const steps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');

function showStep(step) {
    steps.forEach((s, index) => {
        s.classList.toggle('active', index === step);
    });

    progressSteps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (index === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active', 'completed');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);

            if (currentStep === steps.length - 1) {
                populateReview();
            }
        }
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

function validateCurrentStep() {
    const currentStepElement = steps[currentStep];
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');

    for (let input of inputs) {
        if (!input.value) {
            input.focus();
            alert('कृपया सभी आवश्यक फ़ील्ड भरें।');
            return false;
        }
    }
    return true;
}

function populateReview() {
    const formData = new FormData(document.getElementById('admission-form'));
    const reviewContent = document.getElementById('review-content');

    let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';

    for (let [key, value] of formData.entries()) {
        if (value && typeof value === 'string') {
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `
                <div class="border-b pb-2">
                    <p class="text-sm text-gray-500">${label}</p>
                    <p class="font-semibold">${value}</p>
                </div>
            `;
        }
    }

    html += '</div>';
    reviewContent.innerHTML = html;
}

// Form submission with Firebase
document.getElementById('admission-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!document.getElementById('terms').checked) {
        alert('कृपया नियम और शर्तें स्वीकार करें।');
        return;
    }

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>सबमिट हो रहा है...';

    try {
        // Collect form data
        const formData = new FormData(this);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                // Skip files for now, handle separately
                continue;
            }
            data[key] = value;
        }

        // Collect files
        const files = {
            birthCertificate: formData.get('birth_certificate'),
            aadharCard: formData.get('aadhar_card'),
            photo: formData.get('photo')
        };

        // Submit to Firebase
        const result = await admissionHelper.submitAdmission(data, files);

        if (result.success) {
            // Log analytics event
            analyticsHelper.logEvent('admission_submitted', {
                class: data.class,
                has_documents: !!(files.birthCertificate || files.aadharCard || files.photo)
            });

            // Show success message
            alert(`आपका आवेदन सफलतापूर्वक सबमिट हो गया है!\n\nआवेदन संख्या: ${result.id}\n\nहम जल्द ही आपसे संपर्क करेंगे।`);

            // Clear form and localStorage
            this.reset();
            localStorage.removeItem('admission-form');

            // Redirect to home
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('सबमिशन में त्रुटि: ' + error.message + '\n\nकृपया पुनः प्रयास करें या हमसे संपर्क करें।');

        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>सबमिट करें';
    }
});

// Make functions available globally
window.nextStep = nextStep;
window.prevStep = prevStep;
