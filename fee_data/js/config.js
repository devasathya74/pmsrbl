/**
 * School Fee Management System - Configuration Module
 */
const CONFIG = {
  school: {
    name: 'Police Modern School',
    address: 'Police Line Campus, Sector 4',
    phone: '+91 98765 43210',
    email: 'info@policemodernschool.edu.in',
    code: 'PMS-2026'
  },
  
  defaultAcademicSession: '2026-27',
  
  academicSessions: ['2025-26', '2026-27', '2027-28'],
  
  // April to March order
  months: [
    { key: 'APR', name: 'April', index: 1 },
    { key: 'MAY', name: 'May', index: 2 },
    { key: 'JUN', name: 'June', index: 3 },
    { key: 'JUL', name: 'July', index: 4 },
    { key: 'AUG', name: 'August', index: 5 },
    { key: 'SEP', name: 'September', index: 6 },
    { key: 'OCT', name: 'October', index: 7 },
    { key: 'NOV', name: 'November', index: 8 },
    { key: 'DEC', name: 'December', index: 9 },
    { key: 'JAN', name: 'January', index: 10 },
    { key: 'FEB', name: 'February', index: 11 },
    { key: 'MAR', name: 'March', index: 12 }
  ],

  classes: [
    { id: 'KG-1', name: 'KG-1', defaultMonthlyFee: 600 },
    { id: 'KG-2', name: 'KG-2', defaultMonthlyFee: 600 },
    { id: 'Class 1', name: 'Class 1', defaultMonthlyFee: 700 },
    { id: 'Class 2', name: 'Class 2', defaultMonthlyFee: 700 },
    { id: 'Class 3', name: 'Class 3', defaultMonthlyFee: 800 },
    { id: 'Class 4', name: 'Class 4', defaultMonthlyFee: 800 },
    { id: 'Class 5', name: 'Class 5', defaultMonthlyFee: 800 },
    { id: 'Class 6', name: 'Class 6', defaultMonthlyFee: 1000 },
    { id: 'Class 7', name: 'Class 7', defaultMonthlyFee: 1000 },
    { id: 'Class 8', name: 'Class 8', defaultMonthlyFee: 1000 }
  ],

  defaultCharges: {
    admissionFee: 2000,
    transportFee: 300,
    diaryFee: 100,
    feeCardFee: 20
  },

  billingFrequencies: {
    transport: 'Monthly',
    diary: 'Annual',
    feeCard: 'Annual'
  },

  primaryConcessions: {
    NONE: { id: 'NONE', label: 'No Discount', monthlyDiscountPercent: 0, waivesAdmission: false },
    SIBLING: { id: 'SIBLING', label: 'Sibling Concession', monthlyDiscountPercent: 20, waivesAdmission: false },
    FOURTH_CLASS_EMPLOYEE: { id: 'FOURTH_CLASS_EMPLOYEE', label: '4th Class Employee', monthlyDiscountPercent: 33, waivesAdmission: false },
    PRD_EMPLOYEE: { id: 'PRD_EMPLOYEE', label: 'PRD Employee', monthlyDiscountPercent: 50, waivesAdmission: false },
    RTE: { id: 'RTE', label: 'RTE (Right to Education)', monthlyDiscountPercent: 100, waivesAdmission: true },
    SPONSORED_BY_SCHOOL: { id: 'SPONSORED_BY_SCHOOL', label: 'Sponsored by School', monthlyDiscountPercent: 50, waivesAdmission: true }
  },

  complementaryRules: {
    LATE_ADMISSION_AFTER_JULY: {
      id: 'LATE_ADMISSION_AFTER_JULY',
      label: 'Late Admission (After July)',
      description: 'Admitted on or after 1 August; exempts months prior to admission month'
    },
    INCOME_CERTIFICATE_ADMISSION_WAIVER: {
      id: 'INCOME_CERTIFICATE_ADMISSION_WAIVER',
      label: 'Income Certificate Waiver',
      description: 'Provides 100% admission fee waiver for poor students admitted after July'
    }
  },

  paymentModes: ['Cash', 'UPI', 'Bank Transfer', 'Cheque'],

  whatsapp: {
    duplicateProtectionHours: 24,
    hindiTemplateWithTransport: `आदरणीय अभिभावक जी,

सादर प्रणाम।
यह आपके बच्चे {{student_name}} (कक्षा: {{class_name}}) की विद्यालय शिक्षण व वाहन फीस के संबंध में स्मरण पत्र है।

सत्र 2026-27 ({{current_month}} तक) का बकाया विवरण:
• मासिक शिक्षण शुल्क (Tuition Fee): ₹{{tuition_pending}} (माह: {{tuition_months}})
• मासिक वाहन शुल्क (Transport Fee): ₹{{transport_pending}} (माह: {{transport_months}})
───────────────────────
कुल देय बकाया शुल्क: ₹{{total_pending}}

कृपया अतिशीघ्र बकाया शुल्क जमा कराने का कष्ट करें।

धन्यवाद,
{{school_name}}
संपर्क सूत्र: {{school_phone}}`,

    hindiTemplateTuitionOnly: `आदरणीय अभिभावक जी,

सादर प्रणाम।
यह आपके बच्चे {{student_name}} (कक्षा: {{class_name}}) की विद्यालय शिक्षण फीस के संबंध में स्मरण पत्र है।

सत्र 2026-27 ({{current_month}} तक) का बकाया विवरण:
• मासिक शिक्षण शुल्क (Tuition Fee): ₹{{tuition_pending}}
• बकाया शिक्षण माह: {{tuition_months}}
───────────────────────
कुल देय बकाया शुल्क: ₹{{total_pending}}

कृपया अतिशीघ्र बकाया शुल्क जमा कराने का कष्ट करें।

धन्यवाद,
{{school_name}}
संपर्क सूत्र: {{school_phone}}`,

    englishTemplateWithTransport: `Dear Parent,

Warm regards from {{school_name}}.
This is a fee reminder for your ward {{student_name}}, Class {{class_name}}.

Outstanding Fee Breakdown (up to {{current_month}}):
• Monthly Tuition Fee: ₹{{tuition_pending}} (Months: {{tuition_months}})
• Monthly Transport Fee: ₹{{transport_pending}} (Months: {{transport_months}})
───────────────────────
Total Outstanding Dues: ₹{{total_pending}}

Kindly clear the pending fee at the earliest.

Thank you,
{{school_name}}
Phone: {{school_phone}}`,

    englishTemplateTuitionOnly: `Dear Parent,

Warm regards from {{school_name}}.
This is a fee reminder for your ward {{student_name}}, Class {{class_name}}.

Outstanding Fee Breakdown (up to {{current_month}}):
• Monthly Tuition Fee: ₹{{tuition_pending}}
• Pending Tuition Months: {{tuition_months}}
───────────────────────
Total Outstanding Dues: ₹{{total_pending}}

Kindly clear the pending fee at the earliest.

Thank you,
{{school_name}}
Phone: {{school_phone}}`,

    dualTemplateWithTransport: `आदरणीय अभिभावक जी / Dear Parent,

सादर प्रणाम।
यह आपके बच्चे {{student_name}} (कक्षा / Class: {{class_name}}) की विद्यालय शिक्षण व वाहन फीस के संबंध में स्मरण पत्र है।
This is a fee reminder regarding school tuition & transport fee for your ward {{student_name}}, Class {{class_name}}.

सत्र 2026-27 बकाया विवरण / Outstanding Fee Breakdown:
• मासिक शिक्षण शुल्क / Tuition Fee: ₹{{tuition_pending}} (माह / Months: {{tuition_months}})
• मासिक वाहन शुल्क / Transport Fee: ₹{{transport_pending}} (माह / Months: {{transport_months}})
───────────────────────────────
कुल देय बकाया शुल्क / Total Outstanding: ₹{{total_pending}}

कृपया अतिशीघ्र बकाया शुल्क जमा कराने का कष्ट करें।
Kindly clear the pending school fee at the earliest.

धन्यवाद / Regards,
{{school_name}}
संपर्क सूत्र / Phone: {{school_phone}}`,

    dualTemplateTuitionOnly: `आदरणीय अभिभावक जी / Dear Parent,

सादर प्रणाम।
यह आपके बच्चे {{student_name}} (कक्षा / Class: {{class_name}}) की विद्यालय शिक्षण फीस के संबंध में स्मरण पत्र है।
This is a fee reminder regarding school tuition fee for your ward {{student_name}}, Class {{class_name}}.

सत्र 2026-27 बकाया विवरण / Outstanding Fee Breakdown:
• मासिक शिक्षण शुल्क / Tuition Fee: ₹{{tuition_pending}}
• बकाया माह / Pending Months: {{tuition_months}}
───────────────────────────────
कुल देय बकाया शुल्क / Total Outstanding: ₹{{total_pending}}

कृपया अतिशीघ्र बकाया शुल्क जमा कराने का कष्ट करें।
Kindly clear the pending school fee at the earliest.

धन्यवाद / Regards,
{{school_name}}
संपर्क सूत्र / Phone: {{school_phone}}`,

    defaultTemplate: `Dear Parent,

Fee reminder for ward {{student_name}}, Class {{class_name}}.
Pending Tuition Fee: ₹{{tuition_pending}} ({{tuition_months}})
Total Pending: ₹{{total_pending}}

Regards,
{{school_name}}`
  }
};
