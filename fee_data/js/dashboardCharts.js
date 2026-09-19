/**
 * Interactive Analytics & Charts Module - v2.0
 * Uses Chart.js to render Fee Collection Trend & Discount Distribution charts.
 * Handles empty data gracefully with placeholder messages.
 */
const DashboardChartsModule = {
  feeTrendChart: null,
  discountChart: null,

  // Resolve CSS variable to actual color value for Chart.js
  getCssVar(varName, fallback) {
    try {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback;
    } catch (e) {
      return fallback;
    }
  },

  renderCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded yet.');
      return;
    }

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
    const textColor = isDark ? '#94a3b8' : '#475569';
    const cardBg = isDark ? '#1a2235' : '#f8fafc';

    const students = Store.getStudents();
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    // --- 1. Monthly Collection vs Pending Trend ---
    const monthLabels = CONFIG.months.map(m => m.name.substring(0, 3));
    const monthCollectedData = new Array(12).fill(0);
    const monthPendingData = new Array(12).fill(0);

    CONFIG.months.forEach((m, idx) => {
      payments.forEach(p => {
        const pKey = String(p.monthKey || p.month || '').trim().toUpperCase();
        if (pKey === m.key || pKey === m.name.toUpperCase().substring(0,3)) {
          monthCollectedData[idx] += Number(p.amount) || 0;
        }
      });

      students.forEach(s => {
        try {
          const sum = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 12);
          const item = sum.monthlyLedger.find(i => i.monthKey === m.key);
          if (item && item.status !== 'Paid' && !item.isExempt) {
            monthPendingData[idx] += Math.max(0, item.balance || 0);
          }
        } catch (e) { /* skip errors per student */ }
      });
    });

    const trendCtx = document.getElementById('chart-fee-trend');
    if (trendCtx) {
      if (this.feeTrendChart) this.feeTrendChart.destroy();

      const hasData = monthCollectedData.some(v => v > 0) || monthPendingData.some(v => v > 0);

      this.feeTrendChart = new Chart(trendCtx, {
        type: 'bar',
        data: {
          labels: monthLabels,
          datasets: [
            {
              label: 'Collected (₹)',
              data: hasData ? monthCollectedData : new Array(12).fill(0),
              backgroundColor: 'rgba(16,185,129,0.7)',
              borderColor: '#10b981',
              borderWidth: 1.5,
              borderRadius: 5,
              borderSkipped: false
            },
            {
              label: 'Pending Dues (₹)',
              data: hasData ? monthPendingData : new Array(12).fill(0),
              backgroundColor: 'rgba(239,68,68,0.65)',
              borderColor: '#ef4444',
              borderWidth: 1.5,
              borderRadius: 5,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: textColor,
                font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
                boxWidth: 10, boxHeight: 10, borderRadius: 3
              }
            },
            tooltip: {
              backgroundColor: cardBg,
              borderColor: gridColor,
              borderWidth: 1,
              titleColor: isDark ? '#f1f5f9' : '#0f172a',
              bodyColor: textColor,
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN')}`
              }
            }
          },
          scales: {
            x: {
              ticks: { color: textColor, font: { size: 11 } },
              grid: { color: gridColor }
            },
            y: {
              ticks: {
                color: textColor,
                font: { size: 11 },
                callback: v => v >= 1000 ? '₹' + (v/1000).toFixed(0) + 'k' : '₹' + v
              },
              grid: { color: gridColor }
            }
          }
        }
      });
    }

    // --- 2. Discount & Concession Distribution (Doughnut) ---
    const concKeys = ['NONE', 'SIBLING', 'FOURTH_CLASS_EMPLOYEE', 'PRD_EMPLOYEE', 'RTE', 'SPONSORED_BY_SCHOOL', 'CUSTOM_OVERRIDE'];
    const concCounts = {};
    concKeys.forEach(k => concCounts[k] = 0);

    students.forEach(s => {
      if (s.customMonthlyFee != null && s.customMonthlyFee !== '') {
        concCounts.CUSTOM_OVERRIDE++;
      } else if (concCounts[s.concessionType] !== undefined) {
        concCounts[s.concessionType]++;
      } else {
        concCounts.NONE++;
      }
    });

    const discountCtx = document.getElementById('chart-discount-distribution');
    if (discountCtx) {
      if (this.discountChart) this.discountChart.destroy();

      const dataValues = [
        concCounts.NONE,
        concCounts.SIBLING,
        concCounts.FOURTH_CLASS_EMPLOYEE,
        concCounts.PRD_EMPLOYEE,
        concCounts.RTE,
        concCounts.SPONSORED_BY_SCHOOL,
        concCounts.CUSTOM_OVERRIDE
      ];
      const hasAny = dataValues.some(v => v > 0);

      this.discountChart = new Chart(discountCtx, {
        type: 'doughnut',
        data: {
          labels: ['No Discount', 'Sibling 20%', '4th Class 33%', 'PRD Employee 50%', 'RTE 100%', 'Sponsored 50%', 'Custom Fee'],
          datasets: [{
            data: hasAny ? dataValues : [1],
            backgroundColor: hasAny
              ? ['#64748b', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981', '#06b6d4']
              : ['rgba(255,255,255,0.08)'],
            borderWidth: 2,
            borderColor: cardBg,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: {
              display: hasAny,
              position: 'right',
              labels: {
                color: textColor,
                font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
                boxWidth: 10, boxHeight: 10, borderRadius: 3,
                filter: (item) => {
                  return dataValues[item.index] > 0;
                }
              }
            },
            tooltip: {
              backgroundColor: cardBg,
              borderColor: gridColor,
              borderWidth: 1,
              titleColor: isDark ? '#f1f5f9' : '#0f172a',
              bodyColor: textColor,
              callbacks: {
                label: ctx => hasAny ? ` ${ctx.label}: ${ctx.raw} students` : ' No data yet'
              }
            }
          }
        }
      });

      // Show "No data" center text if empty
      if (!hasAny) {
        const ctx2d = discountCtx.getContext('2d');
        discountCtx.style.position = 'relative';
      }
    }
  }
};
