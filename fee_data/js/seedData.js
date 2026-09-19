/**
 * School Fee Management System - Pre-loaded Seed Data for 2026-27 Session
 */
const SEED_DATA = {
  students: [
    {
      id: 'STU-1001',
      admissionNo: 'ADM-2026-001',
      name: 'Rahul Kumar',
      fatherName: 'Rajesh Kumar',
      motherName: 'Sunita Devi',
      guardianName: 'Rajesh Kumar',
      guardianMobile: '9876543210',
      className: 'Class 5',
      section: 'A',
      rollNo: '12',
      gender: 'Male',
      dob: '2016-05-14',
      admissionDate: '2026-04-05',
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'SIBLING', // 20% off monthly
      transportRequired: true,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      createdAt: '2026-04-05T09:00:00.000Z'
    },
    {
      id: 'STU-1002',
      admissionNo: 'ADM-2026-002',
      name: 'Priya Sharma',
      fatherName: 'Ramesh Sharma',
      motherName: 'Anita Sharma',
      guardianName: 'Ramesh Sharma',
      guardianMobile: '9812345678',
      className: 'Class 8',
      section: 'B',
      rollNo: '05',
      gender: 'Female',
      dob: '2013-09-20',
      admissionDate: '2026-04-08',
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'RTE', // 100% off
      transportRequired: false,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      createdAt: '2026-04-08T10:15:00.000Z'
    },
    {
      id: 'STU-1003',
      admissionNo: 'ADM-2026-003',
      name: 'Amit Patel',
      fatherName: 'Suresh Patel',
      motherName: 'Kamla Patel',
      guardianName: 'Suresh Patel',
      guardianMobile: '9988776655',
      className: 'Class 6',
      section: 'A',
      rollNo: '18',
      gender: 'Male',
      dob: '2015-01-11',
      admissionDate: '2026-04-10',
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'FOURTH_CLASS_EMPLOYEE', // 33% off
      transportRequired: false,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      createdAt: '2026-04-10T11:30:00.000Z'
    },
    {
      id: 'STU-1004',
      admissionNo: 'ADM-2026-004',
      name: 'Vikram Singh',
      fatherName: 'Mahendra Singh',
      motherName: 'Geeta Singh',
      guardianName: 'Mahendra Singh',
      guardianMobile: '9765432109',
      className: 'Class 3',
      section: 'A',
      rollNo: '22',
      gender: 'Male',
      dob: '2018-03-25',
      admissionDate: '2026-10-12', // Late Admission after July (October)
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'SPONSORED_BY_SCHOOL', // 50% off monthly + 100% admission waived
      transportRequired: false,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      createdAt: '2026-10-12T09:45:00.000Z'
    },
    {
      id: 'STU-1005',
      admissionNo: 'ADM-2026-005',
      name: 'Sneha Gupta',
      fatherName: 'Dinesh Gupta',
      motherName: 'Rekha Gupta',
      guardianName: 'Dinesh Gupta',
      guardianMobile: '9123456789',
      className: 'Class 2',
      section: 'B',
      rollNo: '08',
      gender: 'Female',
      dob: '2019-07-08',
      admissionDate: '2026-08-15', // Late Admission after July (August) + Income Cert
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'NONE',
      transportRequired: true,
      incomeCertificateSubmitted: true,
      incomeCertificateApproved: true, // Admission Fee Waived via Income Cert
      createdAt: '2026-08-15T14:20:00.000Z'
    },
    {
      id: 'STU-1006',
      admissionNo: 'ADM-2026-006',
      name: 'Ananya Verma',
      fatherName: 'Deepak Verma',
      motherName: 'Pooja Verma',
      guardianName: 'Deepak Verma',
      guardianMobile: '9898989898',
      className: 'Class 4',
      section: 'A',
      rollNo: '03',
      gender: 'Female',
      dob: '2017-11-30',
      admissionDate: '2026-04-02',
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'PRD_EMPLOYEE', // 50% off
      transportRequired: true,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      createdAt: '2026-04-02T10:00:00.000Z'
    },
    {
      id: 'STU-1007',
      admissionNo: 'ADM-2026-007',
      name: 'Rohan Sharma',
      fatherName: 'Vikas Sharma',
      motherName: 'Neelam Sharma',
      guardianName: 'Vikas Sharma',
      guardianMobile: '9711223344',
      className: 'KG-1',
      section: 'A',
      rollNo: '15',
      gender: 'Male',
      dob: '2021-02-14',
      admissionDate: '2026-04-01',
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'NONE',
      transportRequired: false,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      createdAt: '2026-04-01T08:30:00.000Z'
    },
    {
      id: 'STU-1008',
      admissionNo: 'ADM-2026-008',
      name: 'Kavya Nair',
      fatherName: 'Unnikrishnan Nair',
      motherName: 'Lakshmi Nair',
      guardianName: 'Unnikrishnan Nair',
      guardianMobile: '9447012345',
      className: 'Class 7',
      section: 'A',
      rollNo: '11',
      gender: 'Female',
      dob: '2014-06-19',
      admissionDate: '2026-04-06',
      academicSession: '2026-27',
      status: 'Active',
      concessionType: 'NONE',
      transportRequired: false,
      incomeCertificateSubmitted: false,
      incomeCertificateApproved: false,
      createdAt: '2026-04-06T11:00:00.000Z'
    }
  ],

  payments: [
    // Rahul Kumar (Class 5 - Sibling 20% -> Payable ₹640)
    { id: 'PAY-5001', receiptNo: 'RCP-2026-5001', studentId: 'STU-1001', monthKey: 'APR', feeType: 'MONTHLY', amount: 640, paymentMode: 'UPI', date: '2026-04-10', createdBy: 'Fee Manager', createdAt: '2026-04-10T10:00:00.000Z' },
    { id: 'PAY-5002', receiptNo: 'RCP-2026-5002', studentId: 'STU-1001', monthKey: 'MAY', feeType: 'MONTHLY', amount: 640, paymentMode: 'UPI', date: '2026-05-12', createdBy: 'Fee Manager', createdAt: '2026-05-12T11:00:00.000Z' },
    { id: 'PAY-5003', receiptNo: 'RCP-2026-5003', studentId: 'STU-1001', monthKey: null, feeType: 'ADMISSION', amount: 2000, paymentMode: 'Cash', date: '2026-04-05', createdBy: 'Fee Manager', createdAt: '2026-04-05T09:15:00.000Z' },

    // Amit Patel (Class 6 - 4th Class Employee 33% -> Base ₹1000, Payable ₹670)
    { id: 'PAY-5004', receiptNo: 'RCP-2026-5004', studentId: 'STU-1003', monthKey: 'APR', feeType: 'MONTHLY', amount: 670, paymentMode: 'Cash', date: '2026-04-12', createdBy: 'Fee Manager', createdAt: '2026-04-12T10:00:00.000Z' },
    { id: 'PAY-5005', receiptNo: 'RCP-2026-5005', studentId: 'STU-1003', monthKey: 'MAY', feeType: 'MONTHLY', amount: 670, paymentMode: 'Cash', date: '2026-05-15', createdBy: 'Fee Manager', createdAt: '2026-05-15T14:00:00.000Z' },

    // Rohan Sharma (KG-1 - Standard ₹600)
    { id: 'PAY-5006', receiptNo: 'RCP-2026-5006', studentId: 'STU-1007', monthKey: 'APR', feeType: 'MONTHLY', amount: 600, paymentMode: 'Cash', date: '2026-04-02', createdBy: 'Fee Manager', createdAt: '2026-04-02T09:00:00.000Z' },
    { id: 'PAY-5007', receiptNo: 'RCP-2026-5007', studentId: 'STU-1007', monthKey: 'MAY', feeType: 'MONTHLY', amount: 600, paymentMode: 'Cash', date: '2026-05-05', createdBy: 'Fee Manager', createdAt: '2026-05-05T10:30:00.000Z' },
    { id: 'PAY-5008', receiptNo: 'RCP-2026-5008', studentId: 'STU-1007', monthKey: 'JUN', feeType: 'MONTHLY', amount: 600, paymentMode: 'Cash', date: '2026-06-04', createdBy: 'Fee Manager', createdAt: '2026-06-04T11:15:00.000Z' },

    // Kavya Nair (Class 7 - Standard ₹1000 - Partial payment in June)
    { id: 'PAY-5009', receiptNo: 'RCP-2026-5009', studentId: 'STU-1008', monthKey: 'APR', feeType: 'MONTHLY', amount: 1000, paymentMode: 'Bank Transfer', date: '2026-04-10', createdBy: 'Fee Manager', createdAt: '2026-04-10T12:00:00.000Z' },
    { id: 'PAY-5010', receiptNo: 'RCP-2026-5010', studentId: 'STU-1008', monthKey: 'MAY', feeType: 'MONTHLY', amount: 1000, paymentMode: 'Bank Transfer', date: '2026-05-10', createdBy: 'Fee Manager', createdAt: '2026-05-10T12:00:00.000Z' },
    { id: 'PAY-5011', receiptNo: 'RCP-2026-5011', studentId: 'STU-1008', monthKey: 'JUN', feeType: 'MONTHLY', amount: 500, paymentMode: 'Cash', date: '2026-06-15', createdBy: 'Fee Manager', createdAt: '2026-06-15T15:30:00.000Z' }
  ],

  whatsappLogs: [
    {
      id: 'WA-7001',
      studentId: 'STU-1001',
      studentName: 'Rahul Kumar',
      guardianMobile: '+919876543210',
      pendingAmount: 1920,
      pendingMonths: 'June, July, August',
      currentMonth: 'August',
      status: 'DELIVERED',
      sentBy: 'Fee Manager',
      sentAt: '2026-08-20T10:42:00.000Z',
      apiMessageId: 'wamid.HBgLOTE5ODc2NTQzMjEwFQIAERgSMzFFMDQ1OEY2OTc2QkE3RUE4AA=='
    }
  ],

  auditLogs: [
    {
      id: 'AUD-8001',
      timestamp: '2026-04-01T08:30:00.000Z',
      user: 'Admin',
      action: 'SYSTEM_INITIALIZED',
      entity: 'SystemSetting',
      entityId: '2026-27',
      oldValue: null,
      newValue: '2026-27 Academic Session Created',
      reason: 'Academic year setup'
    }
  ]
};
