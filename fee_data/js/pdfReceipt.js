/**
 * Fee Payment Receipt Generator & Printable View Controller
 */
const ReceiptModule = {
  renderReceiptModal(payment, student, feeSummary) {
    const modalBody = document.getElementById('receipt-modal-body');
    if (!modalBody) return;

    const paymentDateStr = new Date(payment.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });

    const primaryConcessionLabel = CONFIG.primaryConcessions[student.concessionType]?.label || 'None';

    modalBody.innerHTML = `
      <div class="receipt-printable" id="printable-receipt-content">
        <div class="receipt-header">
          <img src="logo1.png" style="height:55px; margin-bottom:0.35rem; object-fit:contain;" alt="School Logo">
          <div class="receipt-school-name">${CONFIG.school.name}</div>
          <div class="receipt-school-sub">${CONFIG.school.address} | Ph: ${CONFIG.school.phone}</div>
          <div style="font-size:0.9rem; font-weight:700; margin-top:0.5rem; text-decoration:underline;">FEE PAYMENT RECEIPT</div>
        </div>

        <div class="receipt-grid">
          <div><strong>Receipt No:</strong> ${payment.receiptNo}</div>
          <div style="text-align:right;"><strong>Date:</strong> ${paymentDateStr}</div>
          <div><strong>Student Name:</strong> ${student.name}</div>
          <div style="text-align:right;"><strong>Class & Sec:</strong> ${student.className} - ${student.section}</div>
          <div><strong>Father's Name:</strong> ${student.fatherName}</div>
          <div style="text-align:right;"><strong>Admission No:</strong> ${student.admissionNo}</div>
          <div><strong>Session:</strong> ${student.academicSession}</div>
          <div style="text-align:right;"><strong>Concession Category:</strong> ${primaryConcessionLabel}</div>
        </div>

        <table class="receipt-table">
          <thead>
            <tr>
              <th>Particulars / Description</th>
              <th>Month / Type</th>
              <th style="text-align:right;">Base Amount</th>
              <th style="text-align:right;">Discount</th>
              <th style="text-align:right;">Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${payment.feeType === 'ADMISSION' ? 'Admission Fee Collection' : 'Monthly Tuition Fee'}</td>
              <td>${payment.monthKey ? CONFIG.months.find(m => m.key === payment.monthKey)?.name : 'One-time Admission'}</td>
              <td style="text-align:right;">₹${(payment.amount + (feeSummary?.monthlyDiscount || 0)).toLocaleString('en-IN')}</td>
              <td style="text-align:right;">₹${(feeSummary?.monthlyDiscount || 0).toLocaleString('en-IN')}</td>
              <td style="text-align:right; font-weight:700;">₹${payment.amount.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-top:1rem; font-size:0.85rem;">
          <div>
            <div><strong>Payment Mode:</strong> ${payment.paymentMode}</div>
            ${payment.transactionId ? `<div><strong>Txn / Ref No:</strong> ${payment.transactionId}</div>` : ''}
            <div><strong>Collected By:</strong> ${payment.createdBy}</div>
            ${payment.notes ? `<div><strong>Notes:</strong> ${payment.notes}</div>` : ''}
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.1rem; font-weight:800; color:#1e3a8a;">Total Paid: ₹${payment.amount.toLocaleString('en-IN')}</div>
            <div style="font-size:0.85rem; color:#dc2626; font-weight:600; margin-top:0.25rem;">Remaining Dues: ₹${(feeSummary?.totalPendingAmount || 0).toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style="margin-top:2.5rem; display:flex; justify-content:space-between; align-items:flex-end; font-size:0.8rem; border-top:1px dashed #cbd5e1; padding-top:0.75rem;">
          <div>This is a computer-generated receipt and requires no physical signature.</div>
          <div style="text-align:center; border-top:1px solid #0f172a; width:160px; padding-top:0.25rem; font-weight:600;">Authorized Signatory</div>
        </div>
      </div>
    `;

    document.getElementById('receipt-modal').classList.add('active');
  },

  printCurrentReceipt() {
    window.print();
  }
};
