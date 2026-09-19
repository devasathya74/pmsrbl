/**
 * Reports Module - Generates 12 Comprehensive Financial & Administrative Reports
 */
const ReportsModule = {
  activeReportType: 'collection_daily',

  renderReport(reportType, filters = {}) {
    this.activeReportType = reportType;
    const container = document.getElementById('report-output-container');
    if (!container) return;

    const students = Store.getStudents();
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    let html = '';

    switch (reportType) {
      case 'collection_daily': {
        const todayStr = new Date().toISOString().split('T')[0];
        const dailyPayments = payments.filter(p => {
          if (!p || !p.createdAt) return false;
          const str = typeof p.createdAt === 'string' ? p.createdAt : (typeof p.createdAt.toDate === 'function' ? p.createdAt.toDate().toISOString() : String(p.createdAt));
          return str.startsWith(todayStr);
        });
        const totalAmount = dailyPayments.reduce((sum, p) => sum + p.amount, 0);

        html = `
          <div class="card-header">
            <h3 class="card-title">Daily Fee Collection Report (${todayStr})</h3>
            <span class="badge badge-success">Total Today: ₹${totalAmount.toLocaleString('en-IN')}</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Fee Type</th>
                <th>Month</th>
                <th>Mode</th>
                <th>Collected By</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${dailyPayments.length === 0 ? '<tr><td colspan="8" style="text-align:center;">No payments recorded today.</td></tr>' : 
                dailyPayments.map(p => {
                  const s = students.find(st => st.id === p.studentId);
                  return `
                    <tr>
                      <td><strong>${p.receiptNo}</strong></td>
                      <td>${s ? s.name : 'Unknown'}</td>
                      <td>${s ? s.className : '-'}</td>
                      <td>${p.feeType}</td>
                      <td>${p.monthKey || 'N/A'}</td>
                      <td>${p.paymentMode}</td>
                      <td>${p.createdBy}</td>
                      <td><strong>₹${p.amount.toLocaleString('en-IN')}</strong></td>
                    </tr>
                  `;
                }).join('')
              }
            </tbody>
          </table>
        `;
        break;
      }

      case 'concession_impact': {
        const concessionStats = {};
        Object.keys(CONFIG.primaryConcessions).forEach(key => {
          concessionStats[key] = { label: CONFIG.primaryConcessions[key].label, count: 0, totalDiscount: 0 };
        });

        students.forEach(s => {
          const type = s.concessionType || 'NONE';
          const summary = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 12);
          if (!concessionStats[type]) {
            concessionStats[type] = { label: type, count: 0, totalDiscount: 0 };
          }
          concessionStats[type].count += 1;
          concessionStats[type].totalDiscount += (summary.monthlyDiscount * summary.applicableMonthsCount);
        });

        html = `
          <div class="card-header">
            <h3 class="card-title">Concession Financial Impact Report</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Concession Category</th>
                <th>Discount Policy</th>
                <th>Active Students</th>
                <th>Total Financial Discount (Annual)</th>
              </tr>
            </thead>
            <tbody>
              ${Object.keys(concessionStats).map(key => {
                const item = concessionStats[key];
                const conf = CONFIG.primaryConcessions[key] || {};
                return `
                  <tr>
                    <td><strong>${item.label}</strong></td>
                    <td>${conf.monthlyDiscountPercent || 0}% Monthly Off ${conf.waivesAdmission ? '+ 100% Admission Waived' : ''}</td>
                    <td>${item.count}</td>
                    <td><strong style="color:var(--warning);">₹${item.totalDiscount.toLocaleString('en-IN')}</strong></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `;
        break;
      }

      case 'class_pending': {
        const classSummary = CONFIG.classes.map(c => {
          const classStudents = students.filter(s => s.className === c.name);
          let paidCount = 0;
          let pendingTotal = 0;

          classStudents.forEach(s => {
            const sum = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 5); // Aug = 5
            if (sum.totalPendingAmount === 0) paidCount++;
            pendingTotal += sum.totalPendingAmount;
          });

          return {
            className: c.name,
            totalStudents: classStudents.length,
            paidStudents: paidCount,
            defaultersCount: classStudents.length - paidCount,
            pendingTotal
          };
        });

        html = `
          <div class="card-header">
            <h3 class="card-title">Class-Wise Pending Dues Summary</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Total Students</th>
                <th>Fully Paid</th>
                <th>Defaulters</th>
                <th>Total Pending Dues</th>
              </tr>
            </thead>
            <tbody>
              ${classSummary.map(cs => `
                <tr>
                  <td><strong>${cs.className}</strong></td>
                  <td>${cs.totalStudents}</td>
                  <td><span class="badge badge-success">${cs.paidStudents}</span></td>
                  <td><span class="badge badge-danger">${cs.defaultersCount}</span></td>
                  <td><strong style="color:var(--danger);">₹${cs.pendingTotal.toLocaleString('en-IN')}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        break;
      }

      default: {
        // Payment History default fallback
        html = `
          <div class="card-header">
            <h3 class="card-title">Complete Payment History Ledger</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Date</th>
                <th>Student ID</th>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Collected By</th>
              </tr>
            </thead>
            <tbody>
              ${payments.map(p => `
                <tr>
                  <td><strong>${p.receiptNo}</strong></td>
                  <td>${new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>${p.studentId}</td>
                  <td>${p.feeType} (${p.monthKey || 'N/A'})</td>
                  <td><strong>₹${p.amount.toLocaleString('en-IN')}</strong></td>
                  <td>${p.paymentMode}</td>
                  <td>${p.createdBy}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    }

    container.innerHTML = html;
  },

  exportToCSV() {
    const table = document.querySelector('#report-output-container table');
    if (!table) return alert('No report data available for export.');

    let csv = [];
    const rows = table.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
      const row = [], cols = rows[i].querySelectorAll('td, th');
      for (let j = 0; j < cols.length; j++) {
        let text = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/"/g, '""');
        row.push('"' + text + '"');
      }
      csv.push(row.join(','));
    }

    const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = `School_Fee_Report_${this.activeReportType}_${Date.now()}.csv`;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};
