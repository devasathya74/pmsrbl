/**
 * School Fee Management Application - Main UI Controller v3.0
 * Features: Pure Cloud Firestore Sync, Realtime Updates, Mark/Unmark Fee System,
 * Other Fees Management (Admission, Diary, Fee Card), Search/Filter, Receipt Printing
 */
const App = {
  activeView: 'dashboard',
  navigationStack: ['dashboard'],
  selectedCollectionStudent: null,
  selectedCollectionMonths: [],
  selectedCollectionOtherFees: [],
  selectedDiscountStudentId: null,

  // ===== TOAST NOTIFICATION SYSTEM =====
  toast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      warning: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>'
    };

    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('toast-exit');
      setTimeout(() => el.remove(), 280);
    }, duration);
  },

  showLoading(text = 'Loading from Cloud Firestore...') {
    const ov = document.getElementById('loading-overlay');
    const tx = document.getElementById('loading-text');
    if (ov) { ov.style.display = 'flex'; }
    if (tx) tx.innerText = text;
  },

  hideLoading() {
    const ov = document.getElementById('loading-overlay');
    if (ov) ov.style.display = 'none';
  },

  init() {
    Store.init();
    this.bindNavigation();
    this.bindHistoryRouting();
    this.bindGlobalSearch();
    this.populateClassFilters();
    this.bindThemeToggle();
    this.bindStudentFilters();
    this.bindKeyboardShortcuts();
    window.addEventListener('click', () => {
      document.querySelectorAll('.action-menu-dropdown.show, .transport-action-menu.show').forEach(d => d.classList.remove('show'));
    });
    const initialView = window.location.hash ? window.location.hash.replace('#', '') : 'dashboard';
    this.switchView(initialView, false);
    console.log('School Fee Management v3.0 initialized (Professional Finance Workstation Mode).');
  },

  bindStudentFilters() {
    const searchInput = document.getElementById('student-search-input');
    const classFilter = document.getElementById('student-class-filter');
    const statusFilter = document.getElementById('student-status-filter');

    const triggerFilter = () => {
      const q = searchInput ? searchInput.value : '';
      const cls = classFilter ? classFilter.value : '';
      const status = statusFilter ? statusFilter.value : '';
      this.renderStudentsView(q, cls, status);
    };

    if (searchInput) searchInput.addEventListener('input', triggerFilter);
    if (classFilter) classFilter.addEventListener('change', triggerFilter);
    if (statusFilter) statusFilter.addEventListener('change', triggerFilter);

    // Transport View Filter Listeners
    const transSearch = document.getElementById('transport-search-input');

    if (transSearch) {
      transSearch.addEventListener('input', () => {
        this.renderTransportView(transSearch.value);
      });
    }
  },

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ctrl+K or '/' to trigger Command Palette Spotlight
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        this.toggleCommandPalette(true);
      }

      // Ctrl+S to save payment in collection view
      if (e.ctrlKey && e.key.toLowerCase() === 's' && this.activeView === 'collection') {
        e.preventDefault();
        this.submitFeePayment();
      }

      // Escape to close active modal, drawer, or spotlight
      if (e.key === 'Escape') {
        this.toggleCommandPalette(false);
        this.closeStudentDrawer();
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
          activeModal.classList.remove('active');
        }
        const dd1 = document.getElementById('global-search-dropdown');
        if (dd1) dd1.style.display = 'none';
        const dd2 = document.getElementById('collection-search-dropdown');
        if (dd2) dd2.style.display = 'none';
      }
    });
  },

  refreshActiveView(silent = false) {
    if (silent) {
      this.silentAutoRefresh();
    } else {
      this.switchView(this.activeView, false);
    }
  },

  silentAutoRefresh() {
    // If any modal is open, avoid interrupting active dialog
    if (document.querySelector('.modal-overlay.active')) return;
    
    // If user is actively typing in a search input, avoid re-rendering
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && activeEl.value.length > 0;

    switch (this.activeView) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'collection':
        if (this.selectedCollectionStudent) {
          this.selectStudentForCollection(this.selectedCollectionStudent.id, false);
        }
        break;
      case 'students':
        if (!isTyping) {
          const q = document.getElementById('student-search-input')?.value || '';
          const cls = document.getElementById('student-class-filter')?.value || '';
          const status = document.getElementById('student-status-filter')?.value || '';
          const totalInStore = Store.getStudents().length;
          if (this.studentLazyState.renderedCount === 0 || this._lastSyncedStudentCount !== totalInStore) {
            this._lastSyncedStudentCount = totalInStore;
            this.renderStudentsView(q, cls, status);
          }
        }
        break;
      case 'recycle_bin':
        if (!isTyping) {
          const q = document.getElementById('recycle-bin-search-input')?.value || '';
          this.renderRecycleBinView(q);
        }
        break;
      case 'transport':
        if (!isTyping) {
          const totalInStore = Store.getStudents().length + Store.getPayments().length;
          if (this._lastSyncedTransportDataKey !== totalInStore) {
            this._lastSyncedTransportDataKey = totalInStore;
            const q = document.getElementById('transport-search-input')?.value || '';
            this.renderTransportView(q);
          }
        }
        break;
      case 'defaulters':
        if (!isTyping) {
          const q = document.getElementById('defaulter-search-input')?.value || '';
          const cls = document.getElementById('defaulter-class-filter')?.value || '';
          this.renderDefaultersView(q, cls);
        }
        break;
    }
    this.updateRecycleBinBadges();
  },

  populateClassFilters() {
    ['student-class-filter', 'defaulter-class-filter', 'transport-class-filter'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = '<option value="">All Classes</option>' +
        CONFIG.classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    });
  },

  // View Router Navigation
  bindNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const viewName = item.getAttribute('data-view');
        this.switchView(viewName, true);
      });
    });
  },

  bindHistoryRouting() {
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.view) {
        this.switchView(e.state.view, false);
      } else if (window.location.hash) {
        const targetView = window.location.hash.replace('#', '');
        if (targetView) this.switchView(targetView, false);
      } else {
        this.switchView('dashboard', false);
      }
    });

    window.addEventListener('hashchange', () => {
      const targetView = window.location.hash.replace('#', '');
      if (targetView && targetView !== this.activeView) {
        this.switchView(targetView, false);
      }
    });

    window.addEventListener('keydown', (e) => {
      const isCtrlB = (e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B');
      const isCtrlE = (e.ctrlKey || e.metaKey) && (e.key === 'e' || e.key === 'E');
      const isCtrlD = (e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D');
      const isAltLeft = e.altKey && e.key === 'ArrowLeft';
      const isEscape = e.key === 'Escape';

      if (isEscape) {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
          activeModal.classList.remove('active');
          return;
        }
      }

      const getActiveStudentId = () => {
        if (this.selectedStudentIds && this.selectedStudentIds.size > 0) {
          const ids = Array.from(this.selectedStudentIds);
          return ids[ids.length - 1];
        }
        if (this.activeDrawerStudentId) {
          return this.activeDrawerStudentId;
        }
        if (this.selectedCollectionStudent && this.selectedCollectionStudent.id) {
          return this.selectedCollectionStudent.id;
        }
        const students = Store.getStudents();
        return students.length > 0 ? students[0].id : null;
      };

      // Keyboard Shortcut: Ctrl + E -> Edit Student Profile
      if (isCtrlE) {
        e.preventDefault();
        const targetId = getActiveStudentId();
        if (targetId) this.openEditStudentModal(targetId);
        return;
      }

      // Keyboard Shortcut: Ctrl + D -> Discount Management
      if (isCtrlD) {
        e.preventDefault();
        const targetId = getActiveStudentId();
        if (targetId) this.openDiscountModal(targetId);
        return;
      }

      if (isCtrlB || isAltLeft || (isEscape && !document.querySelector('.modal-overlay.active'))) {
        e.preventDefault();
        this.goBack();
      }
    });
  },

  switchView(viewName, pushHistory = true) {
    if (!viewName) viewName = 'dashboard';
    
    if (pushHistory && this.activeView !== viewName) {
      if (this.navigationStack[this.navigationStack.length - 1] !== viewName) {
        this.navigationStack.push(viewName);
      }
      history.pushState({ view: viewName }, '', '#' + viewName);
    }

    this.activeView = viewName;
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if (activeNav) activeNav.classList.add('active');

    document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
    const activeMobNav = document.querySelector(`.mobile-nav-item[data-view="${viewName}"]`);
    if (activeMobNav) activeMobNav.classList.add('active');

    this.toggleMobileSidebar(false);

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) targetSection.classList.add('active');

    switch (viewName) {
      case 'dashboard': this.renderDashboard(); break;
      case 'students': this.renderStudentsView(); break;
      case 'transport': this.renderTransportView(); break;
      case 'recycle_bin': this.renderRecycleBinView(); break;
      case 'collection': this.renderFeeCollection(); break;
      case 'defaulters': this.renderDefaultersView(); break;
      case 'reports': ReportsModule.renderReport('collection_daily'); break;
      case 'whatsapp_logs': this.renderWhatsAppLogs(); break;
      case 'settings': this.renderSettingsView(); break;
      case 'audit_logs': this.renderAuditLogs(); break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  toggleMobileSidebar(force) {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar) return;
    const shouldOpen = force !== undefined ? force : !sidebar.classList.contains('mobile-open');
    sidebar.classList.toggle('mobile-open', shouldOpen);
    if (overlay) overlay.classList.toggle('active', shouldOpen);
  },

  goBack() {
    if (this.navigationStack.length > 1) {
      this.navigationStack.pop();
      const previousView = this.navigationStack[this.navigationStack.length - 1];
      this.switchView(previousView, false);
      history.replaceState({ view: previousView }, '', '#' + previousView);
    } else {
      this.switchView('dashboard', true);
    }
  },

  // ===== DASHBOARD VIEW =====
  renderDashboard() {
    const students = Store.getStudents();
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    const activeStudents = students.filter(s => s.status === 'Active');
    const todayStr = new Date().toISOString().split('T')[0];
    
    const todayPayments = payments.filter(p => {
      if (!p || !p.createdAt) return false;
      const createdStr = typeof p.createdAt === 'string' ? p.createdAt : (typeof p.createdAt.toDate === 'function' ? p.createdAt.toDate().toISOString() : String(p.createdAt));
      return createdStr.startsWith(todayStr);
    });
    const todayCollectionTotal = todayPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const totalCollection = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    let totalPendingDues = 0;
    let defaulterCount = 0;
    let transportActiveCount = 0;
    let transportPendingTotal = 0;
    let transportDefaultersCount = 0;

    activeStudents.forEach(s => {
      const summary = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 5);
      if (summary.totalPendingAmount > 0) {
        defaulterCount++;
        totalPendingDues += summary.totalPendingAmount;
      }
      if (s.transportRequired || s.isTransportAvailed || s.transportService) {
        transportActiveCount++;
        if (summary.transportFeePendingTotal > 0) {
          transportDefaultersCount++;
          transportPendingTotal += summary.transportFeePendingTotal;
        }
      }
    });

    const totalStudentsEl = document.getElementById('kpi-total-students');
    if (totalStudentsEl) totalStudentsEl.innerText = activeStudents.length.toLocaleString('en-IN');

    const todayCollEl = document.getElementById('kpi-today-collection');
    if (todayCollEl) todayCollEl.innerText = '₹' + todayCollectionTotal.toLocaleString('en-IN');

    const totalCollEl = document.getElementById('kpi-total-collection');
    if (totalCollEl) totalCollEl.innerText = '₹' + totalCollection.toLocaleString('en-IN');

    const totalPendingEl = document.getElementById('kpi-total-pending');
    if (totalPendingEl) totalPendingEl.innerText = '₹' + totalPendingDues.toLocaleString('en-IN');

    // Dashboard Transport Stat Card
    const transStatEl = document.getElementById('dashboard-transport-stat');
    if (transStatEl) {
      transStatEl.textContent = `${transportActiveCount} enrolled students • ₹${transportPendingTotal.toLocaleString('en-IN')} pending dues (${transportDefaultersCount} students)`;
    }

    // Sidebar Transport Count Badge
    const sideTransBadge = document.getElementById('sidebar-transport-count');
    if (sideTransBadge) {
      if (transportActiveCount > 0) {
        sideTransBadge.textContent = transportActiveCount;
        sideTransBadge.style.display = 'inline-block';
      } else {
        sideTransBadge.style.display = 'none';
      }
    }

    this.updateDashboardCountBadge(activeStudents.length);

    // Class Summary Table
    const summaryTbody = document.getElementById('dashboard-class-summary-tbody');
    if (summaryTbody) {
      if (activeStudents.length === 0) {
        summaryTbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted);">
          <div class="empty-state" style="padding:2rem 0;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <h3>Loading student data from Cloud Firestore...</h3>
            <p>Please wait while live data is being synced.</p>
          </div>
        </td></tr>`;
      } else {
        summaryTbody.innerHTML = CONFIG.classes.map(c => {
          const targetNormClass = FirebaseService.normalizeClassName(c.name);
          const classStudents = activeStudents.filter(s => FirebaseService.normalizeClassName(s.className) === targetNormClass);
          let classPaid = 0, classPending = 0, classCollection = 0;

          classStudents.forEach(s => {
            const sum = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 5);
            if (sum.totalPendingAmount === 0) classPaid++;
            classPending += sum.totalPendingAmount;
            const sPayments = payments.filter(p => p.studentId === s.id && p.status !== 'REVERSED');
            classCollection += sPayments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
          });

          if (classStudents.length === 0) return '';
          return `<tr>
            <td><strong>${c.name}</strong></td>
            <td><span class="badge badge-secondary">${classStudents.length}</span></td>
            <td><span class="badge badge-success">${classPaid}</span></td>
            <td><span class="badge badge-danger">${classStudents.length - classPaid}</span></td>
            <td>₹${classCollection.toLocaleString('en-IN')}</td>
            <td><strong style="color:var(--danger);">₹${classPending.toLocaleString('en-IN')}</strong></td>
          </tr>`;
        }).filter(Boolean).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:1rem;">No class data available.</td></tr>`;
      }
    }

    // Manual Class Base Fee Preset Manager Table
    const overrideTbody = document.getElementById('dashboard-class-override-tbody');
    if (overrideTbody) {
      overrideTbody.innerHTML = CONFIG.classes.map(c => {
        const activeOverride = classOverrides.find(co => co.className === c.name && co.active);
        const currentAmount = activeOverride ? activeOverride.monthlyFee : c.defaultMonthlyFee;

        return `
          <tr>
            <td><code>${c.id}</code></td>
            <td><strong>${c.name}</strong></td>
            <td>₹${c.defaultMonthlyFee}/mo</td>
            <td>
              <input type="number" id="class-fee-input-${c.name.replace(/\s+/g, '-')}" class="form-control form-control-sm" style="width:130px; font-weight:700;" value="${currentAmount}">
            </td>
            <td>
              <button class="btn btn-sm btn-primary" onclick="App.saveClassFeeOverride('${c.name}')">Save Base Fee</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    if (typeof DashboardChartsModule !== 'undefined') {
      setTimeout(() => DashboardChartsModule.renderCharts(), 100);
    }
  },

  async saveClassFeeOverride(className) {
    const inputEl = document.getElementById(`class-fee-input-${className.replace(/\s+/g, '-')}`);
    if (!inputEl) return;
    const newFee = Number(inputEl.value);
    if (isNaN(newFee) || newFee < 0) {
      this.toast('Please enter a valid base fee amount.', 'error');
      return;
    }
    await Store.saveClassOverride(className, newFee);
    this.renderDashboard();
    this.renderStudentsView();
    this.toast(`Base fee for ${className} saved to Cloud Firestore (₹${newFee}/mo).`, 'success');
  },

  studentLazyState: {
    filteredStudents: [],
    renderedCount: 0,
    pageSize: 30,
    isScrollBound: false
  },

  // ===== AUTOMATIC CLASS-WISE ASCENDING ORDER SORTING =====
  sortStudentsClasswise(students) {
    const getClassWeight = (className) => {
      const norm = FirebaseService.normalizeClassName(className || '').toUpperCase();
      if (norm.includes('NUR')) return 0.05;
      if (norm.includes('KG-1') || norm.includes('LKG')) return 0.1;
      if (norm.includes('KG-2') || norm.includes('UKG')) return 0.2;
      const numMatch = norm.match(/\d+/);
      if (numMatch) return parseInt(numMatch[0], 10);
      return 99;
    };

    return [...students].sort((a, b) => {
      const wA = getClassWeight(a.className);
      const wB = getClassWeight(b.className);
      if (wA !== wB) return wA - wB;

      const serialA = Number(a.serial);
      const serialB = Number(b.serial);
      if (!isNaN(serialA) && !isNaN(serialB) && serialA !== serialB) {
        return serialA - serialB;
      }

      const secA = (a.section || '').localeCompare(b.section || '');
      if (secA !== 0) return secA;

      return (a.name || '').localeCompare(b.name || '');
    });
  },

  studentQuickFilter: 'all',

  setStudentQuickFilter(filterKey) {
    this.studentQuickFilter = filterKey;
    document.querySelectorAll('#student-quick-filter-tabs .filter-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterKey);
    });
    const q = document.getElementById('student-search-input')?.value || '';
    const cls = document.getElementById('student-class-filter')?.value || '';
    const status = document.getElementById('student-status-filter')?.value || '';
    this.renderStudentsView(q, cls, status);
  },

  renderStudentsView(query = '', filterClass = '', filterStatus = '') {
    const tbody = document.getElementById('students-table-tbody');
    if (!tbody) return;

    const q = query.toLowerCase().trim();
    let allStudents = Store.getStudents();
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    // Compute Quick Filter Counts across entire directory
    let countHigh = 0, countPending = 0, countConcession = 0, countPaid = 0, countTransport = 0;
    allStudents.forEach(s => {
      const sum = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 5);
      if (sum.totalPendingAmount >= 5000) countHigh++;
      if (sum.totalPendingAmount > 0) countPending++;
      else countPaid++;
      if (s.concessionType && s.concessionType !== 'NONE') countConcession++;
      if (s.transportRequired || s.isTransportAvailed || s.transportService) countTransport++;
    });

    const elAll = document.getElementById('tab-count-all');
    if (elAll) elAll.textContent = allStudents.length;
    const elTrans = document.getElementById('tab-count-transport');
    if (elTrans) elTrans.textContent = countTransport;
    const elHigh = document.getElementById('tab-count-high');
    if (elHigh) elHigh.textContent = countHigh;
    const elPend = document.getElementById('tab-count-pending');
    if (elPend) elPend.textContent = countPending;
    const elConc = document.getElementById('tab-count-concession');
    if (elConc) elConc.textContent = countConcession;
    const elPaid = document.getElementById('tab-count-paid');
    if (elPaid) elPaid.textContent = countPaid;

    // Filter by Search, Class, Status, and Quick Tab
    let filtered = allStudents.filter(s => {
      const matchSearch = !q ||
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.fatherName && s.fatherName.toLowerCase().includes(q)) ||
        (s.guardianMobile && s.guardianMobile.includes(q)) ||
        (s.admissionNo && s.admissionNo.toLowerCase().includes(q));

      const matchClass = !filterClass || s.className === filterClass;
      
      const summary = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 5);
      const isPaid = summary.totalPendingAmount === 0;
      let matchStatus = true;
      if (filterStatus === 'paid') matchStatus = isPaid;
      if (filterStatus === 'pending') matchStatus = !isPaid;

      let matchQuickTab = true;
      if (this.studentQuickFilter === 'transport') matchQuickTab = Boolean(s.transportRequired || s.isTransportAvailed || s.transportService);
      else if (this.studentQuickFilter === 'high_dues') matchQuickTab = summary.totalPendingAmount >= 5000;
      else if (this.studentQuickFilter === 'pending') matchQuickTab = summary.totalPendingAmount > 0;
      else if (this.studentQuickFilter === 'concession') matchQuickTab = s.concessionType && s.concessionType !== 'NONE';
      else if (this.studentQuickFilter === 'paid') matchQuickTab = isPaid;

      return matchSearch && matchClass && matchStatus && matchQuickTab;
    });

    // Sort class-wise ascending
    filtered = this.sortStudentsClasswise(filtered);

    this.studentLazyState.filteredStudents = filtered;
    this.studentLazyState.renderedCount = 0;
    tbody.innerHTML = '';
    this.updateRecycleBinBadges();
    this.updateBulkActionBar();

    const countBadge = document.getElementById('student-filter-count');
    if (countBadge) {
      countBadge.textContent = filtered.length === allStudents.length ? `${allStudents.length} Students` : `${filtered.length} of ${allStudents.length}`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          <h3>No students match your criteria</h3>
          <p>Try adjusting your search filters or quick tab selection.</p>
        </div>
      </td></tr>`;
      const ind = document.getElementById('students-lazy-indicator');
      if (ind) ind.innerHTML = '';
      return;
    }

    this.loadNextStudentBatch();

    if (!this.studentLazyState.isScrollBound) {
      const container = document.getElementById('students-table-container');
      if (container) {
        container.addEventListener('scroll', () => {
          if (container.scrollTop + container.clientHeight >= container.scrollHeight - 80) {
            this.loadNextStudentBatch();
          }
        });
        this.studentLazyState.isScrollBound = true;
      }
    }
  },

  loadNextStudentBatch() {
    const tbody = document.getElementById('students-table-tbody');
    if (!tbody) return;

    const { filteredStudents, renderedCount, pageSize } = this.studentLazyState;
    if (renderedCount >= filteredStudents.length && renderedCount > 0) {
      const ind = document.getElementById('students-lazy-indicator');
      if (ind) ind.innerHTML = `<span style="color:var(--text-dim);font-size:0.78rem;">✓ All ${filteredStudents.length} students loaded</span>`;
      return;
    }

    const chunk = filteredStudents.slice(renderedCount, renderedCount + pageSize);
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    const chunkHtml = chunk.map((s, idx) => {
      const sNo = renderedCount + idx + 1;
      const summary = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 5);
      const dues = summary.totalPendingAmount;
      const normClass = FirebaseService.normalizeClassName(s.className);

      // Tuition Progress
      const paid = summary.paidMonthsCount;
      const total = summary.applicableMonthsCount;
      const pct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
      const fillClass = paid === total ? 'full' : (paid > 0 ? 'partial' : 'zero');

      // Dues Severity Badge
      let duesBadgeHtml = '';
      if (dues === 0) {
        duesBadgeHtml = `
          <div class="dues-badge clear">
            <span>₹0</span>
            <span class="dues-sub">✓ Clear</span>
          </div>
        `;
      } else if (dues < 1000) {
        duesBadgeHtml = `
          <div class="dues-badge low">
            <span>₹${dues.toLocaleString('en-IN')}</span>
            <span class="dues-sub">Low Due</span>
          </div>
        `;
      } else if (dues < 5000) {
        duesBadgeHtml = `
          <div class="dues-badge mid">
            <span>₹${dues.toLocaleString('en-IN')}</span>
            <span class="dues-sub">Pending</span>
          </div>
        `;
      } else {
        duesBadgeHtml = `
          <div class="dues-badge high">
            <span>₹${dues.toLocaleString('en-IN')}</span>
            <span class="dues-sub">Critical</span>
          </div>
        `;
      }

      const isChecked = this.selectedStudentIds && this.selectedStudentIds.has(s.id);
      const concObj = CONFIG.primaryConcessions[s.concessionType];
      const concTag = (s.concessionType && s.concessionType !== 'NONE') ? `<span class="badge badge-info" style="font-size:0.68rem;padding:1px 5px;" title="${concObj?.label || s.concessionType}">🏷 ${concObj?.label || s.concessionType}</span>` : '';

      const getInitials = (name) => {
        if (!name) return 'ST';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.slice(0, 2).toUpperCase();
      };
      const initials = getInitials(s.name);

      return `
        <!-- Student ${sNo} : 1 Clean Flat-Dark Row -->
        <tr class="student-row-single" id="stu-row-${s.id}" onclick="App.handleStudentRowClick(event, '${s.id}')" title="Click to view student profile & ledger">
          <td style="text-align:center;">
            <input type="checkbox" class="student-select-cb" value="${s.id}" ${isChecked ? 'checked' : ''} onchange="App.handleStudentSelectChange('${s.id}', this.checked)">
          </td>
          <td style="text-align:center;">
            <span style="color:var(--muted);font-size:0.82rem;font-weight:600;">${sNo}</span>
          </td>
          <td>
            <div class="student-cell">
              <div class="avatar">${initials}</div>
              <div>
                <strong>${s.name}</strong>
                <span>${s.fatherName || 'No Father Name'}${s.admissionNo ? ` · ADM-${s.admissionNo}` : ''}${s.guardianMobile ? ` · ${s.guardianMobile}` : ''} ${concTag}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="badge badge-primary">${normClass}</span>
            <span style="font-size:0.74rem;color:var(--muted);font-weight:600;">(${s.section || 'A'})</span>
          </td>
          <td>
            <div style="display:flex;flex-direction:column;gap:4px;min-width:90px;">
              <div class="progress-track">
                <span class="${fillClass}" style="width:${pct}%;"></span>
              </div>
              <small style="font-size:11px;color:var(--muted);">${paid} / ${total} paid</small>
            </div>
          </td>
          <td style="text-align:right;">
            <strong class="due-amount ${dues > 0 ? 'has-due' : 'clear'}">${dues > 0 ? `₹${dues.toLocaleString('en-IN')}` : '✓ Clear'}</strong>
          </td>
          <td style="text-align:right;">
            <div style="display:inline-flex;align-items:center;gap:6px;justify-content:flex-end;">
              <button type="button" class="btn btn-primary btn-sm" onclick="App.openFeeCollectionForStudent('${s.id}')" title="Collect Fee for ${s.name}">
                Collect
              </button>
              
              <div class="action-menu-wrap" style="position:relative;">
                <button type="button" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.55rem;font-weight:700;" onclick="App.toggleActionDropdown(event, '${s.id}')" title="More Actions">⋮</button>
                <div class="action-menu" id="action-dropdown-${s.id}">
                  <button type="button" onclick="App.openStudentDrawer('${s.id}')">
                    <span>👤</span> View Profile
                  </button>
                  <button type="button" onclick="App.openEditStudentModal('${s.id}')">
                    <span>✏️</span> Edit Student
                  </button>
                  <button type="button" onclick="App.openDiscountModal('${s.id}')">
                    <span>🏷️</span> Discount / Concession
                  </button>
                  ${dues > 0 ? `
                  <button type="button" onclick="WhatsAppModule.openReminderPreview('${s.id}')" style="color:var(--success);">
                    <span>💬</span> WhatsApp Reminder
                  </button>
                  ` : ''}
                  <hr>
                  <button type="button" class="danger" onclick="App.moveStudentToRecycleBin('${s.id}')">
                    <span>🗑️</span> Move to Recycle Bin
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.insertAdjacentHTML('beforeend', chunkHtml);
    this.studentLazyState.renderedCount += chunk.length;

    const newRendered = this.studentLazyState.renderedCount;
    const total = filteredStudents.length;
    const ind = document.getElementById('students-lazy-indicator');
    if (ind) {
      if (newRendered < total) {
        ind.innerHTML = `<span style="color:var(--text-muted);">Showing ${newRendered} of ${total} students — <a href="javascript:void(0)" onclick="App.loadNextStudentBatch()" style="color:var(--primary);font-weight:600;">Load More (+${Math.min(pageSize, total - newRendered)})</a></span>`;
      } else {
        ind.innerHTML = `<span style="color:var(--text-dim);font-size:0.78rem;">✓ All ${total} students loaded</span>`;
      }
    }
  },

  toggleActionDropdown(event, studentId) {
    event.stopPropagation();
    const allDropdowns = document.querySelectorAll('.action-menu-dropdown');
    allDropdowns.forEach(dd => {
      if (dd.id !== `action-dropdown-${studentId}`) dd.classList.remove('show');
    });

    const targetDd = document.getElementById(`action-dropdown-${studentId}`);
    if (targetDd) targetDd.classList.toggle('show');
  },

  handleStudentRowClick(event, studentId) {
    // Don't open drawer if user clicked on checkbox, button, action menu or links
    if (event.target.closest('button, input, select, textarea, a, .action-menu, .action-menu-wrap, label')) {
      return;
    }
    this.openStudentDrawer(studentId);
  },

  // ===== SLIDE-OVER STUDENT DRAWER =====
  activeDrawerStudentId: null,

  openStudentDrawer(studentId) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    this.activeDrawerStudentId = studentId;

    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const summary = FeeEngine.calculateStudentFee(student, payments, classOverrides, [], 12);
    const normClass = FirebaseService.normalizeClassName(student.className);

    const drawer = document.getElementById('student-drawer');
    const nameEl = document.getElementById('drawer-student-name');
    const subEl = document.getElementById('drawer-student-sub');
    const avatarEl = document.getElementById('drawer-avatar');
    const bodyEl = document.getElementById('drawer-body-content');

    if (nameEl) nameEl.textContent = student.name;
    if (subEl) subEl.textContent = `${normClass} (${student.section || 'A'}) • ADM-${student.admissionNo || 'N/A'}`;
    if (avatarEl) avatarEl.textContent = student.name.slice(0, 2).toUpperCase();

    if (bodyEl) {
      bodyEl.innerHTML = `
        <!-- Outstanding Balance Card -->
        <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--radius-lg);padding:1.15rem;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:0.76rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Outstanding Dues</div>
            <div style="font-size:1.75rem;font-weight:900;color:var(--danger);line-height:1.15;margin-top:2px;">
              ₹${summary.totalPendingAmount.toLocaleString('en-IN')}
            </div>
          </div>
          <button type="button" class="btn btn-primary" onclick="App.closeStudentDrawer(); App.openFeeCollectionForStudent('${student.id}')" style="font-weight:700;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            Collect Fee
          </button>
        </div>

        <!-- Student Information Card -->
        <div class="card" style="margin-bottom:0;padding:1rem;">
          <h4 style="font-size:0.88rem;font-weight:700;margin-bottom:0.75rem;border-bottom:1px solid var(--border-color);padding-bottom:0.4rem;">Student Profile Info</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;font-size:0.82rem;">
            <div><span style="color:var(--text-muted);">Father Name:</span> <strong style="color:var(--text-main);">${student.fatherName || '—'}</strong></div>
            <div><span style="color:var(--text-muted);">Guardian Mobile:</span> <strong style="color:var(--text-main);">${student.guardianMobile || '—'}</strong></div>
            <div><span style="color:var(--text-muted);">Admission Date:</span> <strong style="color:var(--text-main);">${student.admissionDate || '2026-04-01'}</strong></div>
            <div><span style="color:var(--text-muted);">Student Type:</span> <strong style="color:var(--text-main);">${student.isPromoted ? 'Promoted (₹0 Adm)' : 'New Admission'}</strong></div>
            <div><span style="color:var(--text-muted);">Concession:</span> <strong style="color:var(--primary);">${CONFIG.primaryConcessions[student.concessionType]?.label || 'None'}</strong></div>
            <div><span style="color:var(--text-muted);">Transport:</span> <strong style="color:var(--text-main);">${student.transportRequired ? 'Active (₹300/mo)' : 'No'}</strong></div>
          </div>
        </div>

        <!-- Full 12-Month Academic Ledger Breakdown -->
        <div class="card" style="margin-bottom:0;padding:1rem;">
          <h4 style="font-size:0.88rem;font-weight:700;margin-bottom:0.75rem;border-bottom:1px solid var(--border-color);padding-bottom:0.4rem;">Session 2026-27 Tuition Ledger</h4>
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:0.5rem;">
            ${summary.monthlyLedger.map(m => `
              <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-sm);padding:0.45rem;text-align:center;">
                <div style="font-size:0.78rem;font-weight:700;">${m.monthName.slice(0, 3)}</div>
                <div style="font-size:0.72rem;margin-top:2px;">${m.status === 'Paid' ? '<span style="color:var(--success);font-weight:700;">✓ Paid</span>' : (m.isExempt ? '<span style="color:var(--text-dim);">Exempt</span>' : `<span style="color:var(--danger);font-weight:700;">₹${m.payable}</span>`)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Other Fees Breakdown -->
        <div class="card" style="margin-bottom:0;padding:1rem;">
          <h4 style="font-size:0.88rem;font-weight:700;margin-bottom:0.75rem;border-bottom:1px solid var(--border-color);padding-bottom:0.4rem;">Other Charges</h4>
          <div style="display:flex;flex-direction:column;gap:0.4rem;font-size:0.82rem;">
            <div style="display:flex;justify-content:space-between;">
              <span>Admission Fee:</span>
              <strong>${summary.admissionFee.isWaived ? 'Waived (₹0)' : (summary.admissionFee.status === 'Paid' ? 'Paid ✓' : `Due ₹${summary.admissionFee.payable}`)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span>School Diary:</span>
              <strong>${summary.diaryFee.status === 'Paid' ? 'Paid ✓' : `Due ₹${summary.diaryFee.payable}`}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span>Fee Card:</span>
              <strong>${summary.feeCard.status === 'Paid' ? 'Paid ✓' : `Due ₹${summary.feeCard.payable}`}</strong>
            </div>
          </div>
        </div>
      `;
    }

    if (drawer) drawer.classList.add('active');
  },

  closeStudentDrawer() {
    this.activeDrawerStudentId = null;
    const drawer = document.getElementById('student-drawer');
    if (drawer) drawer.classList.remove('active');
  },

  // ===== STUDENT MULTI-SELECT & RECYCLE BIN HANDLERS =====
  selectedStudentIds: new Set(),

  toggleSelectAllStudents(selectAll) {
    const visibleStudents = this.studentLazyState.filteredStudents || [];
    if (selectAll) {
      visibleStudents.forEach(s => this.selectedStudentIds.add(s.id));
    } else {
      this.selectedStudentIds.clear();
    }
    document.querySelectorAll('.student-select-cb').forEach(cb => {
      cb.checked = selectAll;
    });
    this.updateBulkActionBar();
  },

  handleStudentSelectChange(studentId, isChecked) {
    if (!this.selectedStudentIds) this.selectedStudentIds = new Set();
    if (isChecked) {
      this.selectedStudentIds.add(studentId);
    } else {
      this.selectedStudentIds.delete(studentId);
    }
    this.updateBulkActionBar();
  },

  deselectAllStudents() {
    if (this.selectedStudentIds) this.selectedStudentIds.clear();
    const selectAllCb = document.getElementById('students-select-all');
    if (selectAllCb) selectAllCb.checked = false;
    document.querySelectorAll('.student-select-cb').forEach(cb => {
      cb.checked = false;
    });
    this.updateBulkActionBar();
  },

  updateBulkActionBar() {
    const bar = document.getElementById('students-bulk-actions');
    const countEl = document.getElementById('bulk-selected-count');
    const selectAllCb = document.getElementById('students-select-all');
    const count = this.selectedStudentIds ? this.selectedStudentIds.size : 0;

    if (bar && countEl) {
      if (count > 0) {
        bar.style.display = 'flex';
        countEl.textContent = `${count} student${count > 1 ? 's' : ''} selected`;
      } else {
        bar.style.display = 'none';
      }
    }
    if (selectAllCb) {
      const totalVisible = (this.studentLazyState.filteredStudents || []).length;
      selectAllCb.checked = totalVisible > 0 && count === totalVisible;
    }
  },

  async moveStudentToRecycleBin(studentId) {
    const student = Store.getStudentById(studentId);
    if (!student) return;
    if (!confirm(`Are you sure you want to move "${student.name}" (Adm: ${student.admissionNo || 'N/A'}) to the Recycle Bin?`)) {
      return;
    }
    try {
      this.toast(`Moving ${student.name} to Recycle Bin...`, 'info', 1500);
      await Store.moveToRecycleBin(studentId);
      if (this.selectedStudentIds) this.selectedStudentIds.delete(studentId);
      this.updateBulkActionBar();
      this.renderStudentsView();
      this.updateRecycleBinBadges();
      this.toast(`✓ "${student.name}" moved to Recycle Bin.`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to move student to Recycle Bin: ' + err.message, 'error');
    }
  },

  async moveSelectedStudentsToRecycleBin() {
    if (!this.selectedStudentIds || this.selectedStudentIds.size === 0) return;
    const ids = Array.from(this.selectedStudentIds);
    if (!confirm(`Are you sure you want to move ${ids.length} selected student(s) to the Recycle Bin?`)) {
      return;
    }
    try {
      this.toast(`Moving ${ids.length} students to Recycle Bin...`, 'info', 2000);
      for (const id of ids) {
        await Store.moveToRecycleBin(id);
      }
      this.selectedStudentIds.clear();
      this.updateBulkActionBar();
      this.renderStudentsView();
      this.updateRecycleBinBadges();
      this.toast(`✓ ${ids.length} students moved to Recycle Bin.`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to move selected students: ' + err.message, 'error');
    }
  },

  // ===== RECYCLE BIN VIEW & MANAGEMENT =====
  updateRecycleBinBadges() {
    const deleted = Store.getDeletedStudents();
    const count = deleted.length;
    const sideBadge = document.getElementById('sidebar-trash-count');
    const btnCount = document.getElementById('btn-recycle-bin-count');
    const pageBadge = document.getElementById('recycle-bin-count-badge');
    if (sideBadge) sideBadge.textContent = count;
    if (btnCount) btnCount.textContent = count;
    if (pageBadge) pageBadge.textContent = `${count} Deleted Student${count !== 1 ? 's' : ''}`;
  },

  renderRecycleBinView(filterQuery = '') {
    this.updateRecycleBinBadges();
    const tbody = document.getElementById('recycle-bin-table-tbody');
    if (!tbody) return;

    let deleted = Store.getDeletedStudents();
    const q = filterQuery.toLowerCase().trim();
    if (q) {
      deleted = deleted.filter(s =>
        (s.name || '').toLowerCase().includes(q) ||
        (s.fatherName || '').toLowerCase().includes(q) ||
        (s.guardianMobile || '').includes(q) ||
        (s.admissionNo || '').toLowerCase().includes(q)
      );
    }

    if (deleted.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          <h3>Recycle Bin is Empty</h3>
          <p>No deleted students found in the recycle bin.</p>
        </div>
      </td></tr>`;
      return;
    }

    tbody.innerHTML = deleted.map((s, idx) => {
      const delDate = s.deletedAt ? new Date(s.deletedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently';
      const normClass = FirebaseService.normalizeClassName(s.className);
      return `<tr>
        <td style="text-align:center;"><strong>${idx + 1}</strong></td>
        <td>
          <div style="font-weight:700;">${s.name}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Father: ${s.fatherName || '—'}</div>
        </td>
        <td><span class="badge badge-secondary">${normClass}</span></td>
        <td style="font-family:var(--font-mono);font-size:0.82rem;">${s.guardianMobile || '—'}</td>
        <td><code>${s.admissionNo || '—'}</code></td>
        <td style="font-size:0.78rem;color:var(--text-dim);">${delDate}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-xs btn-success" onclick="App.restoreRecycleBinStudent('${s.id}')" title="Restore back to active directory">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              Restore
            </button>
            <button class="btn btn-xs btn-danger" onclick="App.permanentlyDeleteRecycleBinStudent('${s.id}')" title="Permanently delete from Cloud Firestore">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              Permanent Delete
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');
  },

  async restoreRecycleBinStudent(studentId) {
    try {
      await Store.restoreFromRecycleBin(studentId);
      this.renderRecycleBinView();
      this.renderStudentsView();
      this.toast('✓ Student restored back to active directory.', 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to restore student: ' + err.message, 'error');
    }
  },

  async permanentlyDeleteRecycleBinStudent(studentId) {
    if (!confirm('⚠️ WARNING: This will PERMANENTLY delete this student record from Cloud Firestore. This cannot be undone!\n\nAre you absolutely sure?')) {
      return;
    }
    try {
      await Store.deleteStudent(studentId);
      this.renderRecycleBinView();
      this.toast('✓ Student permanently deleted from Firestore.', 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to delete student: ' + err.message, 'error');
    }
  },

  async restoreAllRecycleBinStudents() {
    const deleted = Store.getDeletedStudents();
    if (deleted.length === 0) {
      this.toast('Recycle bin is already empty.', 'info');
      return;
    }
    if (!confirm(`Restore all ${deleted.length} student(s) back to active directory?`)) {
      return;
    }
    try {
      this.toast(`Restoring ${deleted.length} students...`, 'info', 1500);
      for (const s of deleted) {
        await Store.restoreFromRecycleBin(s.id);
      }
      this.renderRecycleBinView();
      this.renderStudentsView();
      this.toast(`✓ All ${deleted.length} students restored.`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to restore students: ' + err.message, 'error');
    }
  },

  async emptyRecycleBinPermanently() {
    const deleted = Store.getDeletedStudents();
    if (deleted.length === 0) {
      this.toast('Recycle bin is already empty.', 'info');
      return;
    }
    if (!confirm(`⚠️ DANGER: You are about to permanently delete all ${deleted.length} students from Cloud Firestore.\n\nThis cannot be undone. Proceed?`)) {
      return;
    }
    try {
      this.toast(`Permanently deleting ${deleted.length} students...`, 'info', 2000);
      for (const s of deleted) {
        await Store.deleteStudent(s.id);
      }
      this.renderRecycleBinView();
      this.toast(`✓ Recycle bin emptied permanently.`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to empty recycle bin: ' + err.message, 'error');
    }
  },

  bindStudentFilters() {
    const applyFilters = () => {
      const q = document.getElementById('student-search-input')?.value || '';
      const cls = document.getElementById('student-class-filter')?.value || '';
      const status = document.getElementById('student-status-filter')?.value || '';
      this.renderStudentsView(q, cls, status);
    };
    ['student-search-input', 'student-class-filter', 'student-status-filter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', applyFilters);
    });

    const recycleSearch = document.getElementById('recycle-bin-search-input');
    if (recycleSearch) {
      recycleSearch.addEventListener('input', (e) => {
        this.renderRecycleBinView(e.target.value);
      });
    }
  },

  // ===== FEE COLLECTION & MARK / UNMARK SYSTEM =====
  renderFeeCollection() {
    if (!this.selectedCollectionStudent) {
      const students = Store.getStudents();
      if (students.length > 0) {
        this.selectStudentForCollection(students[0].id);
      } else {
        const infoCard = document.getElementById('collection-student-card');
        if (infoCard) {
          infoCard.innerHTML = `<div class="empty-state">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <h3>No students available</h3>
            <p>Waiting for data from Cloud Firestore...</p>
          </div>`;
        }
      }
    } else {
      this.selectStudentForCollection(this.selectedCollectionStudent.id);
    }
  },

  openFeeCollectionForStudent(studentId) {
    this.switchView('collection', true);
    this.selectStudentForCollection(studentId);
  },

  currentDiscountPanelStudentId: null,

  selectStudentForCollection(studentId, forceRebuildDiscountPanel = false) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    this.selectedCollectionStudent = student;
    if (this.currentDiscountPanelStudentId !== student.id || forceRebuildDiscountPanel) {
      this.selectedCollectionMonths = [];
      this.selectedCollectionOtherFees = [];
    }

    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const feeSummary = FeeEngine.calculateStudentFee(student, payments, classOverrides, [], 12);

    // 1. Render Student Header Card
    const infoCard = document.getElementById('collection-student-card');
    if (infoCard) {
      const primaryConc = CONFIG.primaryConcessions[student.concessionType]?.label || 'None';
      infoCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 style="font-size:1.25rem; font-weight:800; color:var(--text-main);">${student.name}</h3>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">
              <strong>Adm No:</strong> ${student.admissionNo} | <strong>Class:</strong> ${student.className} (${student.section}) | 
              <strong>Father:</strong> ${student.fatherName} | <strong>Mobile:</strong> ${student.guardianMobile}
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:0.5rem; flex-wrap:wrap;">
              <span class="badge badge-info">${primaryConc}</span>
              ${student.customMonthlyFee ? `<span class="badge badge-warning">Custom Fee: ₹${student.customMonthlyFee}/mo</span>` : ''}
              ${student.lateAdmissionMonthlyWaiver ? '<span class="badge badge-purple">Late Adm (Prev Months Off)</span>' : ''}
              ${student.transportRequired ? '<span class="badge badge-warning">Transport Active</span>' : ''}
              ${feeSummary.admissionFee.isWaived ? `<span class="badge badge-success">Admission Waived (${feeSummary.admissionFee.waiverReason})</span>` : ''}
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:0.65rem; flex-wrap:wrap; align-items:center;">
              <button class="btn btn-xs btn-secondary" onclick="App.openEditStudentModal('${student.id}')" title="Edit Student Profile (Shortcut: Ctrl+E)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Edit Student Profile <span style="font-size:0.68rem; opacity:0.8; font-weight:700; margin-left:3px; background:rgba(0,0,0,0.2); padding:1px 4px; border-radius:3px;">Ctrl+E</span>
              </button>
              <button class="btn btn-xs btn-primary" onclick="App.openDiscountModal('${student.id}')" title="Full Discount / Concession Setup (Shortcut: Ctrl+D)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Discount Management <span style="font-size:0.68rem; opacity:0.85; font-weight:700; margin-left:3px; background:rgba(0,0,0,0.25); padding:1px 4px; border-radius:3px;">Ctrl+D</span>
              </button>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Base Monthly Fee</div>
            <div style="font-size:1.1rem; font-weight:700;">₹${feeSummary.baseMonthlyFee.toLocaleString('en-IN')}</div>
            <div style="font-size:0.82rem; color:var(--success); font-weight:600;">Payable Monthly: ₹${feeSummary.finalMonthlyPayable.toLocaleString('en-IN')}</div>
          </div>
        </div>
      `;
    }

    // 2. Render Direct Discount & Concession Manager Panel (Only if student changed or explicitly requested)
    const discountPanel = document.getElementById('collection-discount-panel');
    if (discountPanel && (this.currentDiscountPanelStudentId !== student.id || forceRebuildDiscountPanel)) {
      this.currentDiscountPanelStudentId = student.id;
      discountPanel.innerHTML = `
        <div class="card-header" style="padding:0.75rem 1.1rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--primary);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <h3 class="card-title" style="font-size:0.95rem; font-weight:800;">Direct Discount & Concession Center (Click any discount to assign instantly)</h3>
          </div>
          <span class="badge badge-primary">Direct 1-Click Assignment</span>
        </div>

        <div style="padding:1.1rem;">
          <!-- 1. All Primary Concessions Pills -->
          <div style="margin-bottom:1rem;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem; display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.3rem;">
              <span>Select Primary Concession / Discount Category:</span>
              <span style="color:var(--primary); font-size:0.78rem;">Active: <strong>${CONFIG.primaryConcessions[student.concessionType]?.label || 'None'}</strong></span>
            </div>
            <div class="discount-pills-grid" id="quick-discount-pills">
              ${Object.keys(CONFIG.primaryConcessions).map(key => {
                const item = CONFIG.primaryConcessions[key];
                const isActive = student.concessionType === key;
                return `
                  <button type="button" class="discount-pill ${isActive ? 'active' : ''}" onclick="App.setQuickConcessionPill('${student.id}', '${key}')" title="Click to assign ${item.label}">
                    <span>${item.label}</span>
                    <span class="badge ${isActive ? 'badge-primary' : 'badge-secondary'}" style="font-size:0.72rem;">
                      ${item.monthlyDiscountPercent}% Off ${item.waivesAdmission ? '+ Free Adm' : ''}
                    </span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 2. Detailed Controls Grid -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; align-items:flex-end; background:var(--bg-surface); padding:0.9rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            
            <!-- Custom Monthly Fee -->
            <div>
              <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:0.3rem;">Custom Fixed Monthly Fee Override (₹):</label>
              <div style="display:flex; gap:0.4rem;">
                <input type="number" id="quick-custom-fee" class="form-control form-control-sm" placeholder="e.g. 600" value="${student.customMonthlyFee != null ? student.customMonthlyFee : ''}">
                <button class="btn btn-xs btn-secondary" onclick="document.getElementById('quick-custom-fee').value=''; App.applyQuickDiscountDirectly('${student.id}');" title="Clear Override">Clear</button>
              </div>
              <div style="display:flex; gap:0.25rem; margin-top:0.35rem; flex-wrap:wrap;">
                <span class="discount-preset-btn" onclick="document.getElementById('quick-custom-fee').value=500; App.applyQuickDiscountDirectly('${student.id}');">₹500</span>
                <span class="discount-preset-btn" onclick="document.getElementById('quick-custom-fee').value=600; App.applyQuickDiscountDirectly('${student.id}');">₹600</span>
                <span class="discount-preset-btn" onclick="document.getElementById('quick-custom-fee').value=650; App.applyQuickDiscountDirectly('${student.id}');">₹650</span>
                <span class="discount-preset-btn" onclick="document.getElementById('quick-custom-fee').value=700; App.applyQuickDiscountDirectly('${student.id}');">₹700</span>
              </div>
            </div>

            <!-- Late Admission Previous Months Waiver -->
            <div>
              <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:0.3rem;">Late Admission (Previous Months 100% Off):</label>
              <select id="quick-late-month-select" class="form-control form-control-sm" style="font-weight:600;" onchange="App.applyQuickDiscountDirectly('${student.id}')">
                <option value="NONE" ${!student.lateAdmissionMonthlyWaiver ? 'selected' : ''}>Off (Charge All 12 Months)</option>
                ${CONFIG.months.filter(m => m.index >= 2).map(m => {
                  const isSel = student.lateAdmissionMonthlyWaiver && (student.lateAdmissionStartMonth === m.key || (!student.lateAdmissionStartMonth && student.admissionDate && FeeEngine.getMonthIndexFromDate(student.admissionDate) === m.index)) ? 'selected' : '';
                  return `<option value="${m.key}" ${isSel}>Admitted in ${m.name} (Prior Months ₹0 Exempt)</option>`;
                }).join('')}
              </select>
              <div style="font-size:0.71rem; color:var(--text-muted); margin-top:0.25rem;">
                Prior months will be 100% OFF (₹0 Exempt)
              </div>
            </div>

            <!-- Complementary Waivers -->
            <div>
              <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:0.3rem;">Admission & Transport Concessions:</label>
              <div style="display:flex; flex-direction:column; gap:0.45rem;">
                <label style="display:flex; align-items:center; gap:0.45rem; cursor:pointer; font-size:0.78rem; font-weight:700; color:var(--primary);">
                  <input type="checkbox" id="quick-promoted-check" onchange="App.applyQuickDiscountDirectly('${student.id}')" ${student.isPromoted || student.studentType === 'PROMOTED' ? 'checked' : ''}>
                  <span>Old / Promoted Student (100% Free Adm)</span>
                </label>
                <label style="display:flex; align-items:center; gap:0.45rem; cursor:pointer; font-size:0.78rem; font-weight:600;">
                  <input type="checkbox" id="quick-income-cert" onchange="App.applyQuickDiscountDirectly('${student.id}')" ${student.incomeCertificateApproved ? 'checked' : ''}>
                  <span>Income Cert (100% Admission Waived)</span>
                </label>
                <label style="display:flex; align-items:center; gap:0.45rem; cursor:pointer; font-size:0.78rem; font-weight:600;">
                  <input type="checkbox" id="quick-transport-req" onchange="App.applyQuickDiscountDirectly('${student.id}')" ${student.transportRequired ? 'checked' : ''}>
                  <span>Transport Service Active (₹300/mo)</span>
                </label>
              </div>
            </div>

            <!-- Save / Apply Button -->
            <div>
              <button class="btn btn-primary" style="width:100%; height:38px; font-weight:700; font-size:0.84rem; display:flex; align-items:center; justify-content:center; gap:0.4rem;" onclick="App.applyQuickDiscountDirectly('${student.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Save & Update Ledger
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 3. Render 12 Months Tuition Grid with Mark & Unmark
    const monthGrid = document.getElementById('collection-month-grid');
    if (monthGrid) {
      monthGrid.innerHTML = feeSummary.monthlyLedger.map(m => {
        let cardClass = 'month-card';
        if (m.status === 'Paid') cardClass += ' paid';
        if (m.isExempt) cardClass += ' exempt';

        return `
          <div class="${cardClass}" id="month-card-${m.monthKey}">
            <div class="month-header">
              <span class="month-name">${m.monthName}</span>
              ${m.status === 'Paid' ? '<span class="badge badge-success">Paid ✓</span>' : ''}
              ${m.status === 'Pending' ? '<span class="badge badge-danger">Pending</span>' : ''}
              ${m.status === 'Partially Paid' ? '<span class="badge badge-warning">Partial</span>' : ''}
              ${m.status === 'Exempt' ? '<span class="badge badge-secondary">Exempt</span>' : ''}
            </div>
            <div class="month-amount">
              ${m.isExempt ? '₹0 (Exempt)' : `₹${m.payable.toLocaleString('en-IN')}`}
            </div>
            ${m.paid > 0 && m.status !== 'Paid' ? `<div style="font-size:0.72rem; color:var(--success);">Paid: ₹${m.paid}</div>` : ''}
            
            <div class="month-actions">
              ${m.status === 'Paid' ? `
                <button class="btn-unmark" onclick="event.stopPropagation(); App.unmarkMonthFee('${student.id}', '${m.monthKey}')" title="Unmark / Mark Unpaid">
                  ✕ Unmark Fee
                </button>
              ` : (m.status !== 'Exempt' ? `
                <button class="btn-mark-paid" onclick="event.stopPropagation(); App.quickMarkMonthFee('${student.id}', '${m.monthKey}', ${m.payable})" title="Direct 1-Click Mark Paid">
                  ✓ Mark Paid
                </button>
                <button class="btn btn-xs btn-secondary" onclick="App.toggleMonthSelection('${m.monthKey}', ${m.payable}, '${m.status}')">
                  Select
                </button>
              ` : '')}
            </div>
          </div>
        `;
      }).join('');
    }

    // 4. Render Transport Service Fee Collection Section (Target UX Design)
    const transportSection = document.getElementById('collection-transport-section');
    if (transportSection) {
      const trans = feeSummary.transport;
      if (trans && trans.isAvailed) {
        const routeLabel = student.transportRoute || 'Standard Route';
        const stopLabel = student.transportStop || 'Campus Line';
        const paidCount = trans.ledger.filter(m => m.status === 'Paid').length;
        const totalCount = trans.ledger.filter(m => m.status !== 'Not Applicable').length;
        const pendingAmount = trans.pendingTotal || 0;

        transportSection.innerHTML = `
          <div class="transport-fee-card">
            <div class="transport-fee-header">
              <div>
                <span class="eyebrow">TRANSPORT SERVICE (वाहन सुविधा)</span>
                <h3>🚌 ${routeLabel} · ${stopLabel}</h3>
                <small>₹${trans.monthlyRate || 300} / month</small>
              </div>

              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span class="transport-status active">
                  <i></i> Active
                </span>
                <button type="button" class="btn btn-xs btn-secondary" onclick="App.selectAllDueTransportMonths()" title="Select All Due Transport Months">Select All Due</button>
                <button type="button" class="btn btn-xs btn-secondary" onclick="App.clearTransportMonthSelection()" title="Clear Selection">Clear</button>
              </div>
            </div>

            <div class="transport-months" id="collection-transport-month-grid">
              ${trans.ledger.map(m => {
                let monthClass = 'transport-month';
                let isPaid = m.status === 'Paid';
                let isExempt = m.status === 'Not Applicable';
                let isDue = m.status === 'Pending' || m.status === 'Partially Paid';

                if (isPaid) monthClass += ' paid';
                else if (isDue) monthClass += ' due';
                else if (isExempt) monthClass += ' exempt';

                const isSelected = this.selectedCollectionTransportMonths && this.selectedCollectionTransportMonths.some(tm => tm.monthKey === m.monthKey);
                if (isSelected) monthClass += ' selected';

                return `
                  <button type="button" class="${monthClass}" id="trans-card-${m.monthKey}" onclick="App.toggleTransportMonthSelection('${m.monthKey}', ${m.payable}, '${m.status}')" title="${m.monthName}: ${m.status}">
                    ${m.monthKey}
                    <b>${isPaid ? '✓' : (isExempt ? '—' : '₹' + m.payable)}</b>
                  </button>
                `;
              }).join('')}
            </div>

            <div class="transport-fee-footer">
              <span>${paidCount} / ${totalCount} months paid</span>
              <strong style="${pendingAmount === 0 ? 'color:var(--success);' : 'color:var(--danger);'}">
                ${pendingAmount === 0 ? '✓ Fully Paid' : `₹${pendingAmount.toLocaleString('en-IN')} due`}
              </strong>
            </div>
          </div>
        `;
      } else {
        transportSection.innerHTML = `
          <div class="transport-fee-card">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div>
                <span class="eyebrow">TRANSPORT SERVICE</span>
                <h3 style="font-size:14px; margin-top:2px; display:flex; align-items:center; gap:6px;">
                  🚌 Transport: <span class="transport-status inactive"><i></i> Inactive</span>
                </h3>
                <small style="color:var(--muted);">Student is currently not registered for school bus / van transport.</small>
              </div>
              <button type="button" class="btn btn-primary btn-sm" onclick="App.quickActivateTransport('${student.id}')">
                + Activate Transport (₹300/mo)
              </button>
            </div>
          </div>
        `;
      }
    }

    // 5. Render Other Fees Grid (Admission, Diary, Fee Card)
    const otherFeesGrid = document.getElementById('collection-other-fees-grid');
    if (otherFeesGrid) {
      const adm = feeSummary.admissionFee;
      const diary = feeSummary.diaryFee;
      const feeCard = feeSummary.feeCard;

      otherFeesGrid.innerHTML = `
        <!-- Admission Fee Card -->
        <div class="other-fee-card ${adm.status === 'Paid' ? 'paid' : (adm.isWaived ? 'waived' : '')}">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="font-size:0.95rem; font-weight:700;">Admission Fee</h4>
              ${adm.isWaived ? '<span class="badge badge-info">Waived</span>' : (adm.status === 'Paid' ? '<span class="badge badge-success">Paid ✓</span>' : '<span class="badge badge-danger">Pending</span>')}
            </div>
            <div style="font-size:1.15rem; font-weight:800; margin-top:0.35rem; color:var(--text-main);">
              ₹${adm.payable.toLocaleString('en-IN')}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
              ${adm.isWaived ? `Waived by policy (${adm.waiverReason})` : 'One-time admission charge'}
            </div>
          </div>
          <div class="fee-card-actions">
            ${adm.status === 'Paid' ? `
              <button class="btn-unmark" onclick="App.unmarkOtherFee('${student.id}', 'ADMISSION')">✕ Unmark Fee</button>
            ` : (!adm.isWaived ? `
              <button class="btn-mark-paid" onclick="App.quickMarkOtherFee('${student.id}', 'ADMISSION', ${adm.payable})">✓ Mark Paid (₹${adm.payable})</button>
            ` : '')}
          </div>
        </div>

        <!-- School Diary Card -->
        <div class="other-fee-card ${diary.status === 'Paid' ? 'paid' : ''}">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="font-size:0.95rem; font-weight:700;">School Diary</h4>
              ${diary.status === 'Paid' ? '<span class="badge badge-success">Paid ✓</span>' : '<span class="badge badge-danger">Pending</span>'}
            </div>
            <div style="font-size:1.15rem; font-weight:800; margin-top:0.35rem; color:var(--text-main);">
              ₹${diary.payable.toLocaleString('en-IN')}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
              Annual school student diary charge
            </div>
          </div>
          <div class="fee-card-actions">
            ${diary.status === 'Paid' ? `
              <button class="btn-unmark" onclick="App.unmarkOtherFee('${student.id}', 'DIARY')">✕ Unmark Fee</button>
            ` : `
              <button class="btn-mark-paid" onclick="App.quickMarkOtherFee('${student.id}', 'DIARY', ${diary.payable})">✓ Mark Paid (₹${diary.payable})</button>
            `}
          </div>
        </div>

        <!-- Fee Card -->
        <div class="other-fee-card ${feeCard.status === 'Paid' ? 'paid' : ''}">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="font-size:0.95rem; font-weight:700;">Fee Card</h4>
              ${feeCard.status === 'Paid' ? '<span class="badge badge-success">Paid ✓</span>' : '<span class="badge badge-danger">Pending</span>'}
            </div>
            <div style="font-size:1.15rem; font-weight:800; margin-top:0.35rem; color:var(--text-main);">
              ₹${feeCard.payable.toLocaleString('en-IN')}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
              Annual student fee card / passbook
            </div>
          </div>
          <div class="fee-card-actions">
            ${feeCard.status === 'Paid' ? `
              <button class="btn-unmark" onclick="App.unmarkOtherFee('${student.id}', 'FEE_CARD')">✕ Unmark Fee</button>
            ` : `
              <button class="btn-mark-paid" onclick="App.quickMarkOtherFee('${student.id}', 'FEE_CARD', ${feeCard.payable})">✓ Mark Paid (₹${feeCard.payable})</button>
            `}
          </div>
        </div>
      `;
    }

    this.updatePaymentSummary(feeSummary);
  },

  // ===== DIRECT DISCOUNT & CONCESSION HANDLER (ON COLLECTION PAGE) =====
  async setQuickConcessionPill(studentId, concessionKey) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    student.concessionType = concessionKey;
    this.toast(`Applying ${CONFIG.primaryConcessions[concessionKey]?.label || concessionKey}...`, 'info', 1200);
    try {
      await Store.saveStudent(student, 'Fee Manager');
      this.selectStudentForCollection(student.id, true);
      this.renderDashboard();
      this.renderStudentsView();
      this.renderDefaultersView();
      this.toast(`✓ ${CONFIG.primaryConcessions[concessionKey]?.label} saved to Cloud Firestore for ${student.name}.`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to save concession: ' + err.message, 'error');
    }
  },

  async applyQuickDiscountDirectly(studentId) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    const customFeeInput = document.getElementById('quick-custom-fee');
    const lateMonthSelect = document.getElementById('quick-late-month-select');
    const promotedCheck = document.getElementById('quick-promoted-check');
    const incomeCertCheck = document.getElementById('quick-income-cert');
    const transportCheck = document.getElementById('quick-transport-req');

    const newCustomFee = customFeeInput && customFeeInput.value !== '' ? Number(customFeeInput.value) : null;
    const lateChoice = lateMonthSelect ? lateMonthSelect.value : 'NONE';
    const isLateActive = lateChoice !== 'NONE';
    const lateStartMonth = isLateActive ? lateChoice : null;
    const isPromoted = promotedCheck ? promotedCheck.checked : false;
    const isIncomeCert = incomeCertCheck ? incomeCertCheck.checked : false;
    const isTransport = transportCheck ? transportCheck.checked : false;

    student.customMonthlyFee = newCustomFee;
    student.lateAdmissionMonthlyWaiver = isLateActive;
    student.lateAdmissionStartMonth = lateStartMonth;
    student.isPromoted = isPromoted;
    student.studentType = isPromoted ? 'PROMOTED' : 'NEW';
    student.incomeCertificateSubmitted = isIncomeCert;
    student.incomeCertificateApproved = isIncomeCert;
    student.transportRequired = isTransport;

    this.toast(`Updating discount in Cloud Firestore for ${student.name}...`, 'info', 1500);
    try {
      await Store.saveStudent(student, 'Fee Manager');
      this.selectStudentForCollection(student.id, true);
      this.renderDashboard();
      this.renderStudentsView();
      this.renderDefaultersView();
      this.toast(`✓ Concessions updated & saved to Cloud Firestore for ${student.name}.`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to save discount: ' + err.message, 'error');
    }
  },

  // ===== DIRECT 1-CLICK MARK & UNMARK HANDLERS =====

  async quickMarkMonthFee(studentId, monthKey, amount) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    try {
      this.toast(`Saving payment for ${monthKey} to Firestore...`, 'info', 1500);
      const payment = await Store.recordPayment({
        studentId,
        monthKey,
        feeType: 'MONTHLY',
        amount: Number(amount),
        paymentMode: 'Cash',
        notes: `Quick mark for ${monthKey}`
      });

      this.toast(`✓ Fee marked as Paid for ${monthKey} (${student.name}).`, 'success');
      this.selectStudentForCollection(studentId);
      this.renderDashboard();
    } catch (err) {
      console.error(err);
      this.toast('Failed to mark fee: ' + err.message, 'error');
    }
  },

  async unmarkMonthFee(studentId, monthKey) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    if (!confirm(`Are you sure you want to unmark ${monthKey} fee for ${student.name}? The payment will be removed from Cloud Firestore.`)) {
      return;
    }

    try {
      this.toast(`Unmarking fee for ${monthKey}...`, 'info', 1500);
      await Store.unmarkMonthFee(studentId, monthKey);
      this.toast(`✕ Unmarked fee for ${monthKey}. Dues updated.`, 'info');
      this.selectStudentForCollection(studentId);
      this.renderDashboard();
    } catch (err) {
      console.error(err);
      this.toast('Failed to unmark fee: ' + err.message, 'error');
    }
  },

  async quickMarkOtherFee(studentId, feeType, amount) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    const labelMap = { 'ADMISSION': 'Admission Fee', 'DIARY': 'School Diary', 'FEE_CARD': 'Fee Card' };
    const label = labelMap[feeType] || feeType;

    try {
      this.toast(`Saving ${label} to Firestore...`, 'info', 1500);
      await Store.recordPayment({
        studentId,
        monthKey: null,
        feeType: feeType,
        amount: Number(amount),
        paymentMode: 'Cash',
        notes: `${label} payment`
      });

      this.toast(`✓ ${label} marked as Paid for ${student.name}.`, 'success');
      this.selectStudentForCollection(studentId);
      this.renderDashboard();
      this.renderStudentsView();
    } catch (err) {
      console.error(err);
      this.toast('Failed to mark other fee: ' + err.message, 'error');
    }
  },

  async unmarkOtherFee(studentId, feeType) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    const labelMap = { 'ADMISSION': 'Admission Fee', 'DIARY': 'School Diary', 'FEE_CARD': 'Fee Card' };
    const label = labelMap[feeType] || feeType;

    if (!confirm(`Are you sure you want to unmark ${label} for ${student.name}? The record will be deleted from Cloud Firestore.`)) {
      return;
    }

    try {
      this.toast(`Unmarking ${label}...`, 'info', 1500);
      await Store.unmarkOtherFee(studentId, feeType);
      this.toast(`✕ ${label} unmarked. Dues updated.`, 'info');
      this.selectStudentForCollection(studentId);
      this.renderDashboard();
      this.renderStudentsView();
    } catch (err) {
      console.error(err);
      this.toast('Failed to unmark fee: ' + err.message, 'error');
    }
  },

  async quickToggleOtherFee(studentId, feeType) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const summary = FeeEngine.calculateStudentFee(student, payments, classOverrides, [], 12);

    let isPaid = false;
    let payable = 0;

    if (feeType === 'ADMISSION') {
      if (summary.admissionFee.isWaived) {
        this.toast(`Admission fee is waived for ${student.name} (${summary.admissionFee.waiverReason}).`, 'info');
        return;
      }
      isPaid = summary.admissionFee.status === 'Paid';
      payable = summary.admissionFee.payable;
    } else if (feeType === 'DIARY') {
      isPaid = summary.diaryFee.status === 'Paid';
      payable = summary.diaryFee.payable;
    } else if (feeType === 'FEE_CARD') {
      isPaid = summary.feeCard.status === 'Paid';
      payable = summary.feeCard.payable;
    }

    if (isPaid) {
      await this.unmarkOtherFee(studentId, feeType);
    } else {
      await this.quickMarkOtherFee(studentId, feeType, payable);
    }
  },

  // ===== TRANSPORT FEE COLLECTION & SELECTION HANDLERS =====
  async quickActivateTransport(studentId) {
    const student = Store.getStudentById(studentId);
    if (!student) return;
    student.transportRequired = true;
    student.transportMonthlyFee = 300;
    this.toast(`Activating Transport Service (₹300/mo) for ${student.name}...`, 'info', 1500);
    try {
      await Store.saveStudent(student, 'Fee Manager');
      this.selectStudentForCollection(student.id, true);
      this.renderStudentsView();
      this.toast(`✓ Transport Service activated for ${student.name}.`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Failed to activate transport: ' + err.message, 'error');
    }
  },

  async quickMarkTransportFee(studentId, monthKey, amount) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    try {
      this.toast(`Saving Transport Fee for ${monthKey} to Firestore...`, 'info', 1500);
      await Store.recordPayment({
        studentId,
        monthKey,
        feeType: 'TRANSPORT',
        amount: Number(amount),
        paymentMode: 'Cash',
        notes: `Transport fee for ${monthKey}`
      });

      this.toast(`✓ Transport Fee marked as Paid for ${monthKey} (${student.name}).`, 'success');
      this.selectStudentForCollection(studentId);
      this.renderDashboard();
    } catch (err) {
      console.error(err);
      this.toast('Failed to mark transport fee: ' + err.message, 'error');
    }
  },

  async unmarkTransportFee(studentId, monthKey) {
    const student = Store.getStudentById(studentId);
    if (!student) return;

    if (!confirm(`Are you sure you want to unmark ${monthKey} Transport fee for ${student.name}? The payment will be removed from Cloud Firestore.`)) {
      return;
    }

    try {
      this.toast(`Unmarking transport fee for ${monthKey}...`, 'info', 1500);
      const payments = Store.getPayments().filter(p => p.studentId === studentId && (p.feeType || '').toUpperCase() === 'TRANSPORT');
      const target = payments.find(p => String(p.monthKey || p.month).toLowerCase() === monthKey.toLowerCase());
      if (target) {
        await Store.deletePayment(target.id);
      }
      this.toast(`✕ Unmarked transport fee for ${monthKey}.`, 'info');
      this.selectStudentForCollection(studentId);
      this.renderDashboard();
    } catch (err) {
      console.error(err);
      this.toast('Failed to unmark transport fee: ' + err.message, 'error');
    }
  },

  toggleTransportMonthSelection(monthKey, amount, status) {
    if (status === 'Paid' || status === 'Not Applicable') return;
    if (!this.selectedCollectionTransportMonths) this.selectedCollectionTransportMonths = [];

    const idx = this.selectedCollectionTransportMonths.findIndex(m => m.monthKey === monthKey);
    const cardEl = document.getElementById(`trans-card-${monthKey}`);

    if (idx !== -1) {
      this.selectedCollectionTransportMonths.splice(idx, 1);
      if (cardEl) cardEl.classList.remove('selected');
    } else {
      this.selectedCollectionTransportMonths.push({ monthKey, amount });
      if (cardEl) cardEl.classList.add('selected');
    }

    this.updateSelectionDock();
  },

  selectAllDueTransportMonths() {
    if (!this.selectedCollectionStudent) {
      this.toast('Please select a student first.', 'warning');
      return;
    }

    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const feeSummary = FeeEngine.calculateStudentFee(this.selectedCollectionStudent, payments, classOverrides, [], 12);

    if (!feeSummary.transport || !feeSummary.transport.isAvailed) {
      this.toast('This student does not avail transport service.', 'info');
      return;
    }

    this.selectedCollectionTransportMonths = [];
    feeSummary.transport.ledger.forEach(m => {
      const cardEl = document.getElementById(`trans-card-${m.monthKey}`);
      if (m.status !== 'Paid' && m.status !== 'Not Applicable' && m.payable > 0) {
        this.selectedCollectionTransportMonths.push({ monthKey: m.monthKey, amount: m.payable });
        if (cardEl) cardEl.classList.add('selected');
      } else {
        if (cardEl) cardEl.classList.remove('selected');
      }
    });

    this.updateSelectionDock();
    this.toast(`Selected ${this.selectedCollectionTransportMonths.length} due transport months.`, 'info', 1800);
  },

  clearTransportMonthSelection() {
    this.selectedCollectionTransportMonths = [];
    document.querySelectorAll('#collection-transport-month-grid .month-card.selected').forEach(c => c.classList.remove('selected'));
    this.updateSelectionDock();
  },

  // ===== DEDICATED TRANSPORT FEE MANAGEMENT VIEW CONTROLLER =====
  transportQuickFilter: 'all',
  _lastFilteredTransportStudents: [],

  setTransportQuickFilter(filterKey) {
    this.transportQuickFilter = filterKey;
    document.querySelectorAll('#transport-quick-filter-tabs .filter-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterKey);
    });
    const q = document.getElementById('transport-search-input')?.value || '';
    this.renderTransportView(q);
  },

  closeAllTransportMenus() {
    document.querySelectorAll('.transport-action-menu.show').forEach(m => m.classList.remove('show'));
  },

  toggleTransportMenu(e, studentId) {
    if (e) {
      e.stopPropagation();
      if (typeof e.preventDefault === 'function') e.preventDefault();
    }
    const targetMenu = document.getElementById(`trans-menu-${studentId}`);
    const isAlreadyOpen = targetMenu && targetMenu.classList.contains('show');
    this.closeAllTransportMenus();
    if (targetMenu && !isAlreadyOpen) {
      targetMenu.classList.add('show');
    }
  },

  async toggleStudentTransport(studentId, activate) {
    this.closeAllTransportMenus();
    const student = Store.getStudentById(studentId);
    if (!student) return;

    student.transportRequired = activate;
    if (activate) {
      student.transportMonthlyFee = student.transportMonthlyFee || 300;
    }
    this.toast(`${activate ? 'Activating' : 'Deactivating'} Transport for ${student.name}...`, 'info', 1500);

    try {
      await Store.saveStudent(student, 'Fee Manager');
      this.toast(`✓ Transport ${activate ? 'activated (₹300/mo)' : 'deactivated'} for ${student.name}.`, 'success');
      this.renderTransportView();
      this.renderDashboard();
      this.renderStudentsView();
      if (this.selectedCollectionStudent && this.selectedCollectionStudent.id === studentId) {
        this.selectStudentForCollection(studentId, true);
      }
    } catch (err) {
      console.error(err);
      this.toast('Failed to update transport status: ' + err.message, 'error');
    }
  },

  async quickPayTransportNextDue(studentId) {
    this.closeAllTransportMenus();
    const student = Store.getStudentById(studentId);
    if (!student) return;

    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const summary = FeeEngine.calculateStudentFee(student, payments, classOverrides, [], 12);

    const pendingMonth = summary.transportLedger.find(m => m.status === 'Pending' && m.payable > 0);
    if (!pendingMonth) {
      this.toast(`All transport fees are already fully paid for ${student.name}.`, 'success');
      return;
    }

    await this.quickMarkTransportFee(studentId, pendingMonth.monthKey, pendingMonth.payable);
    this.renderTransportView();
  },

  openTransportEditModal(studentId) {
    this.closeAllTransportMenus();
    const student = Store.getStudentById(studentId);
    if (!student) return;

    const titleEl = document.getElementById('transport-edit-modal-title');
    const bodyEl = document.getElementById('transport-edit-modal-body');
    const modal = document.getElementById('transport-edit-modal');
    if (!bodyEl || !modal) return;

    if (titleEl) titleEl.textContent = `Configure Transport`;

    const isAvailed = Boolean(student.transportRequired || student.isTransportAvailed || student.transportService);
    const currentRate = student.transportMonthlyFee || 300;
    const currentRoute = student.transportRoute || 'Route A';
    const currentStop = student.transportStop || '';

    const initials = student.name ? student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'ST';

    bodyEl.innerHTML = `
      <input type="hidden" id="trans-edit-student-id" value="${student.id}">
      
      <div class="transport-edit-form">
        <div class="transport-student-mini">
          <div class="avatar">${initials}</div>
          <div>
            <strong>${student.name}</strong>
            <span>${student.className} (${student.section || 'A'}) · ${student.admissionNo || 'ADM-001'}</span>
          </div>
        </div>

        <div class="form-grid">
          <label>
            Transport Status
            <select id="trans-edit-status">
              <option value="true" ${isAvailed ? 'selected' : ''}>Active</option>
              <option value="false" ${!isAvailed ? 'selected' : ''}>Inactive</option>
            </select>
          </label>

          <label>
            Monthly Fee (₹)
            <input type="number" id="trans-edit-monthly-fee" value="${currentRate}" min="0" step="50">
          </label>

          <label class="full">
            Route
            <input type="text" id="trans-edit-route" value="${currentRoute}" placeholder="e.g. Route A / Police Line Van 1">
          </label>

          <label class="full">
            Pickup / Drop Stop
            <input type="text" id="trans-edit-stop" value="${currentStop}" placeholder="e.g. Gate No. 2 / Sector 4 Chauraha">
          </label>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  async saveTransportDetails() {
    const studentId = document.getElementById('trans-edit-student-id')?.value;
    const student = Store.getStudentById(studentId);
    if (!student) return;

    const statusSelect = document.getElementById('trans-edit-status');
    const feeInput = document.getElementById('trans-edit-monthly-fee');
    const routeInput = document.getElementById('trans-edit-route');
    const stopInput = document.getElementById('trans-edit-stop');

    student.transportRequired = statusSelect ? statusSelect.value === 'true' : false;
    student.transportMonthlyFee = feeInput ? (Number(feeInput.value) || 300) : 300;
    student.transportRoute = routeInput ? routeInput.value.trim() : 'Route A';
    student.transportStop = stopInput ? stopInput.value.trim() : '';

    this.showLoading('Saving transport details to Cloud Firestore...');
    try {
      await Store.saveStudent(student, 'Fee Manager');
      this.hideLoading();
      document.getElementById('transport-edit-modal').classList.remove('active');
      this.toast(`✓ Transport settings updated for ${student.name}.`, 'success');
      this.renderTransportView();
      this.renderDashboard();
      this.renderStudentsView();
      if (this.selectedCollectionStudent && this.selectedCollectionStudent.id === student.id) {
        this.selectStudentForCollection(student.id, true);
      }
    } catch (err) {
      this.hideLoading();
      console.error(err);
      this.toast('Failed to save transport settings: ' + err.message, 'error');
    }
  },

  openBulkManageTransportModal() {
    const students = Store.getStudents().filter(s => s.status === 'Active');
    const activeCount = students.filter(s => s.transportRequired || s.isTransportAvailed).length;
    this.toast(`Currently ${activeCount} students enrolled in transport. Use student ⋮ menus to configure routes or toggle status.`, 'info', 3000);
  },

  exportTransportExcel() {
    const allStudents = Store.getStudents().filter(s => s.status === 'Active');
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    const data = allStudents
      .filter(s => s.transportRequired || s.isTransportAvailed || s.transportService)
      .map((s, idx) => {
        const sum = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 12);
        const row = {
          'S.No.': idx + 1,
          'Admission No': s.admissionNo || '',
          'Student Name': s.name,
          'Class': s.className,
          'Section': s.section || 'A',
          'Father Name': s.fatherName || '',
          'Guardian Mobile': s.guardianMobile || '',
          'Route': s.transportRoute || 'Route A',
          'Stop Point': s.transportStop || 'Campus Line',
          'Monthly Fee (₹)': s.transportMonthlyFee || 300,
          'Transport Paid (₹)': sum.transport ? sum.transport.totalPaid : 0,
          'Transport Dues (₹)': sum.transportFeePendingTotal,
          'Status': sum.transportFeePendingTotal === 0 ? 'Fully Paid' : 'Pending Dues'
        };

        if (sum.transportLedger) {
          sum.transportLedger.forEach(m => {
            row[`${m.monthKey} (₹${m.payable})`] = m.status;
          });
        }
        return row;
      });

    if (data.length === 0) {
      this.toast('No students currently enrolled in Transport to export.', 'warning');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transport Roster');
    XLSX.writeFile(wb, `Police_Modern_School_Transport_Roster_2026-27.xlsx`);
    this.toast(`✓ Exported ${data.length} transport student records to Excel.`, 'success');
  },

  renderTransportView(query = '') {
    const tbody = document.getElementById('transport-table-tbody');
    const mobileContainer = document.getElementById('transport-mobile-cards-container');
    if (!tbody && !mobileContainer) return;

    const q = (query || '').toLowerCase().trim();
    const allStudents = Store.getStudents().filter(s => s.status === 'Active');
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    // 1. Calculate Transport Statistics across all students
    let enrolledCount = 0;
    let totalCollected = 0;
    let totalOutstanding = 0;
    let pendingStudentsCount = 0;
    let paidStudentsCount = 0;

    const studentCalculations = allStudents.map(s => {
      const isAvailed = Boolean(s.transportRequired || s.isTransportAvailed || s.transportService);
      const summary = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 12);
      const monthlyRate = isAvailed ? (Number(s.transportMonthlyFee) || 300) : 0;
      const transDues = isAvailed ? (Number(summary.transportFeePendingTotal) || (summary.transport ? Number(summary.transport.pendingTotal) : 0) || 0) : 0;
      const transPaid = isAvailed && summary.transport ? (Number(summary.transport.paid) || Number(summary.transport.totalPaid) || 0) : 0;
      const paidMonths = summary.transportLedger ? summary.transportLedger.filter(m => m.status === 'Paid').length : 0;
      const applicableMonths = summary.transportLedger ? summary.transportLedger.filter(m => m.status !== 'Not Applicable').length : 12;

      if (isAvailed) {
        enrolledCount++;
        totalCollected = (Number(totalCollected) || 0) + (Number(transPaid) || 0);
        totalOutstanding = (Number(totalOutstanding) || 0) + (Number(transDues) || 0);
        if (transDues > 0) pendingStudentsCount++;
        else paidStudentsCount++;
      }

      return {
        student: s,
        isAvailed,
        summary,
        monthlyRate,
        transDues,
        transPaid,
        paidMonths,
        applicableMonths
      };
    });

    const inactiveCount = allStudents.length - enrolledCount;

    // Update KPI Card UI
    const kpiEnrolled = document.getElementById('transport-kpi-enrolled');
    if (kpiEnrolled) kpiEnrolled.textContent = (Number(enrolledCount) || 0).toLocaleString('en-IN');

    const kpiColl = document.getElementById('transport-kpi-collected');
    if (kpiColl) kpiColl.textContent = '₹' + (Number(totalCollected) || 0).toLocaleString('en-IN');

    const kpiOutstanding = document.getElementById('transport-kpi-outstanding');
    if (kpiOutstanding) kpiOutstanding.textContent = '₹' + (Number(totalOutstanding) || 0).toLocaleString('en-IN');

    const kpiPending = document.getElementById('transport-kpi-pending-students');
    if (kpiPending) kpiPending.textContent = Number(pendingStudentsCount) || 0;

    // Update Tab Counts
    const elAll = document.getElementById('tab-trans-count-all');
    if (elAll) elAll.textContent = allStudents.length;
    const elActive = document.getElementById('tab-trans-count-active');
    if (elActive) elActive.textContent = enrolledCount;
    const elPending = document.getElementById('tab-trans-count-pending');
    if (elPending) elPending.textContent = pendingStudentsCount;
    const elPaid = document.getElementById('tab-trans-count-paid');
    if (elPaid) elPaid.textContent = paidStudentsCount;
    const elInactive = document.getElementById('tab-trans-count-inactive');
    if (elInactive) elInactive.textContent = inactiveCount;

    // Filter Students
    let filtered = studentCalculations.filter(item => {
      const s = item.student;
      const matchSearch = !q ||
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.fatherName && s.fatherName.toLowerCase().includes(q)) ||
        (s.guardianMobile && s.guardianMobile.includes(q)) ||
        (s.admissionNo && s.admissionNo.toLowerCase().includes(q)) ||
        (s.transportRoute && s.transportRoute.toLowerCase().includes(q)) ||
        (s.transportStop && s.transportStop.toLowerCase().includes(q));

      let matchQuickTab = true;
      if (this.transportQuickFilter === 'active') matchQuickTab = item.isAvailed;
      else if (this.transportQuickFilter === 'pending') matchQuickTab = item.isAvailed && item.transDues > 0;
      else if (this.transportQuickFilter === 'paid') matchQuickTab = item.isAvailed && item.transDues === 0;
      else if (this.transportQuickFilter === 'inactive') matchQuickTab = !item.isAvailed;
      else if (this.transportQuickFilter === 'all') matchQuickTab = true;

      return matchSearch && matchQuickTab;
    });

    this._lastFilteredTransportStudents = filtered.map(i => i.student);

    // 2. Render Desktop Table (Clean 6-Column Layout)
    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6">
          <div class="empty-state" style="padding:2.5rem 0;">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <h3>No transport records match criteria</h3>
            <p>Try clearing search or switching between Active, Due, Paid & Inactive tabs.</p>
          </div>
        </td></tr>`;
      } else {
        tbody.innerHTML = filtered.map(item => {
          const s = item.student;
          const isAvailed = item.isAvailed;
          const dues = item.transDues;
          const paidMonths = item.paidMonths;
          const totalMonths = item.applicableMonths || 12;
          const progressPct = totalMonths > 0 ? Math.min(100, Math.round((paidMonths / totalMonths) * 100)) : 0;
          const initials = s.name ? s.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'ST';
          const routeName = s.transportRoute || (isAvailed ? 'Route A' : '—');
          const stopName = s.transportStop || (isAvailed ? 'Gate No. 2' : 'Not Set');

          return `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:9px;">
                  <div style="width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,var(--primary),var(--secondary)); color:#fff; font-weight:800; font-size:11px; display:grid; place-items:center; flex-shrink:0;">${initials}</div>
                  <div>
                    <div style="font-weight:750; font-size:13px; color:var(--text);">${s.name}</div>
                    <div style="font-size:11px; color:var(--muted); margin-top:1px;">${s.fatherName || '—'} · ${s.className} (${s.section || 'A'})</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="route-cell">
                  <span class="route-icon">🚌</span>
                  <div>
                    <strong>${routeName}</strong>
                    <small>${stopName}</small>
                  </div>
                </div>
              </td>
              <td>
                ${isAvailed ? `
                  <span class="transport-status active"><i></i> Active</span>
                ` : `
                  <span class="transport-status inactive"><i></i> Inactive</span>
                `}
              </td>
              <td>
                ${isAvailed ? `
                  <div class="transport-progress">
                    <div class="transport-progress-bar">
                      <span style="width:${progressPct}%;"></span>
                    </div>
                    <div class="transport-progress-meta">
                      <strong>${paidMonths} / ${totalMonths} paid</strong>
                      <span class="${dues === 0 ? 'clear' : ''}">${dues === 0 ? '✓ Paid' : `₹${dues.toLocaleString('en-IN')} due`}</span>
                    </div>
                  </div>
                ` : `
                  <span style="font-size:11px; color:var(--text-dim);">Not Enrolled</span>
                `}
              </td>
              <td style="text-align:right;">
                ${isAvailed ? (dues > 0 ? `
                  <div class="transport-due">
                    <strong>₹${dues.toLocaleString('en-IN')}</strong>
                    <small>${totalMonths - paidMonths} months</small>
                  </div>
                ` : `
                  <div class="transport-due clear">
                    <strong>₹0</strong>
                    <small>Paid</small>
                  </div>
                `) : `<span style="font-size:11px; color:var(--text-dim);">—</span>`}
              </td>
              <td style="text-align:right;">
                <div class="transport-actions">
                  <button type="button" class="btn btn-xs btn-primary" onclick="App.openFeeCollectionForStudent('${s.id}')">
                    Collect
                  </button>
                  <button type="button" class="icon-btn" onclick="App.toggleTransportMenu(event, '${s.id}')" aria-label="More Options">
                    ⋮
                  </button>
                  <div class="transport-action-menu" id="trans-menu-${s.id}">
                    <button type="button" class="transport-action-menu-item" onclick="App.openStudentDrawer('${s.id}')">
                      👤 View Ledger & Profile
                    </button>
                    <button type="button" class="transport-action-menu-item" onclick="App.openTransportEditModal('${s.id}')">
                      ✏️ Edit Route & Stop
                    </button>
                    <button type="button" class="transport-action-menu-item" onclick="App.toggleStudentTransport('${s.id}', ${!isAvailed})">
                      🔄 ${isAvailed ? 'Deactivate Transport' : 'Activate (₹300/mo)'}
                    </button>
                    ${isAvailed && dues > 0 ? `
                      <button type="button" class="transport-action-menu-item" onclick="App.quickPayTransportNextDue('${s.id}')">
                        ⚡ Quick Pay Next Month
                      </button>
                      <button type="button" class="transport-action-menu-item" onclick="WhatsAppModule.openReminderPreview('${s.id}')">
                        💬 WhatsApp Reminder
                      </button>
                    ` : ''}
                  </div>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    // 3. Render Mobile Cards View
    if (mobileContainer) {
      if (filtered.length === 0) {
        mobileContainer.innerHTML = `<div class="empty-state" style="padding:2rem 1rem;">
          <h3>No students found</h3>
          <p>Try searching another name or route.</p>
        </div>`;
      } else {
        mobileContainer.innerHTML = filtered.map(item => {
          const s = item.student;
          const isAvailed = item.isAvailed;
          const dues = item.transDues;
          const paidMonths = item.paidMonths;
          const totalMonths = item.applicableMonths || 12;
          const progressPct = totalMonths > 0 ? Math.min(100, Math.round((paidMonths / totalMonths) * 100)) : 0;
          const initials = s.name ? s.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'ST';
          const routeName = s.transportRoute || (isAvailed ? 'Route A' : 'No Route');
          const stopName = s.transportStop || (isAvailed ? 'Gate No. 2' : 'Not Enrolled');

          return `
            <div class="transport-mobile-card">
              <div class="transport-mobile-top">
                <div class="student-cell">
                  <div class="avatar">${initials}</div>
                  <div>
                    <strong>${s.name}</strong>
                    <span>${s.className} (${s.section || 'A'}) · ${s.fatherName || '—'}</span>
                  </div>
                </div>
                <button type="button" class="icon-btn" onclick="App.openTransportEditModal('${s.id}')" title="Configure Transport">
                  ✏️
                </button>
              </div>

              <div class="transport-mobile-route">
                🚌 <strong>${routeName}</strong>
                <span>· ${stopName}</span>
              </div>

              <div class="transport-mobile-stats">
                <div>
                  <small>STATUS</small>
                  <strong class="${isAvailed ? 'success' : ''}">${isAvailed ? 'Active' : 'Inactive'}</strong>
                </div>
                <div>
                  <small>PAID</small>
                  <strong>${paidMonths} / ${totalMonths}</strong>
                </div>
                <div>
                  <small>DUE</small>
                  <strong class="${dues > 0 ? 'danger' : 'success'}">${dues > 0 ? `₹${dues.toLocaleString('en-IN')}` : '₹0'}</strong>
                </div>
              </div>

              <div class="transport-mobile-progress">
                <span style="width:${progressPct}%;"></span>
              </div>

              <div style="display:flex; gap:6px;">
                <button type="button" class="btn btn-primary btn-sm" style="flex:1;" onclick="App.openFeeCollectionForStudent('${s.id}')">
                  Collect Transport Fee
                </button>
                ${isAvailed && dues > 0 ? `
                  <button type="button" class="btn btn-whatsapp btn-sm" onclick="WhatsAppModule.openReminderPreview('${s.id}')" title="WhatsApp Reminder">
                    💬
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('');
      }
    }
  },

  // ===== MULTI-SELECTION BATCH PAYMENT =====
  toggleMonthSelection(monthKey, amount, status) {
    if (status === 'Paid' || status === 'Exempt') return;
    if (!this.selectedCollectionMonths) this.selectedCollectionMonths = [];

    const idx = this.selectedCollectionMonths.findIndex(m => m.monthKey === monthKey);
    const cardEl = document.getElementById(`month-card-${monthKey}`);

    if (idx !== -1) {
      this.selectedCollectionMonths.splice(idx, 1);
      if (cardEl) cardEl.classList.remove('selected');
    } else {
      this.selectedCollectionMonths.push({ monthKey, amount });
      if (cardEl) cardEl.classList.add('selected');
    }

    this.updateSelectionDock();
  },

  selectAllDueMonths() {
    if (!this.selectedCollectionStudent) {
      this.toast('Please search & select a student first.', 'warning');
      return;
    }

    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const feeSummary = FeeEngine.calculateStudentFee(this.selectedCollectionStudent, payments, classOverrides, [], 12);

    this.selectedCollectionMonths = [];
    feeSummary.monthlyLedger.forEach(m => {
      const cardEl = document.getElementById(`month-card-${m.monthKey}`);
      if (m.status !== 'Paid' && !m.isExempt && m.payable > 0) {
        this.selectedCollectionMonths.push({ monthKey: m.monthKey, amount: m.payable });
        if (cardEl) cardEl.classList.add('selected');
      } else {
        if (cardEl) cardEl.classList.remove('selected');
      }
    });

    this.updateSelectionDock();
    this.toast(`Selected ${this.selectedCollectionMonths.length} due tuition months for collection.`, 'info', 1800);
  },

  clearMonthSelection() {
    this.selectedCollectionMonths = [];
    document.querySelectorAll('#collection-month-grid .month-card.selected').forEach(c => c.classList.remove('selected'));
    this.updateSelectionDock();
  },

  updateSelectionDock() {
    const tuitionMonths = this.selectedCollectionMonths || [];
    const transMonths = this.selectedCollectionTransportMonths || [];

    const totalTuition = tuitionMonths.reduce((sum, m) => sum + m.amount, 0);
    const totalTrans = transMonths.reduce((sum, m) => sum + m.amount, 0);
    const grandTotal = totalTuition + totalTrans;

    const amountInput = document.getElementById('collection-amount-input');
    if (amountInput) amountInput.value = grandTotal > 0 ? grandTotal : '';

    const countBadge = document.getElementById('collection-selected-count-badge');
    if (countBadge) {
      const parts = [];
      if (tuitionMonths.length > 0) parts.push(`${tuitionMonths.length} Tuition`);
      if (transMonths.length > 0) parts.push(`${transMonths.length} Transport`);
      countBadge.textContent = parts.length > 0 ? parts.join(' + ') : '0 Selected';
    }

    const breakdownEl = document.getElementById('collection-dock-breakdown');
    if (breakdownEl) {
      breakdownEl.innerHTML = `
        ${totalTuition > 0 ? `<div class="dock-breakdown-row"><span>Tuition (${tuitionMonths.length} mos):</span> <strong>₹${totalTuition.toLocaleString('en-IN')}</strong></div>` : ''}
        ${totalTrans > 0 ? `<div class="dock-breakdown-row"><span>Transport (${transMonths.length} mos):</span> <strong>₹${totalTrans.toLocaleString('en-IN')}</strong></div>` : ''}
      `;
    }
  },

  async submitFeePayment() {
    if (!this.selectedCollectionStudent) { this.toast('Please select a student first.', 'error'); return; }

    const tuitionMonths = this.selectedCollectionMonths || [];
    const transMonths = this.selectedCollectionTransportMonths || [];

    if (tuitionMonths.length === 0 && transMonths.length === 0) {
      this.toast('Please select at least one pending tuition or transport month, or click "Mark Paid" directly on cards.', 'warning');
      return;
    }

    const amountInput = document.getElementById('collection-amount-input');
    const paymentModeSelect = document.getElementById('collection-mode-select');
    const notesInput = document.getElementById('collection-notes-input');

    const totalAmount = Number(amountInput.value);
    if (!totalAmount || totalAmount <= 0) { this.toast('Please enter a valid payment amount.', 'error'); return; }

    let lastPayment = null;
    this.showLoading('Saving payment to Cloud Firestore...');

    try {
      // 1. Record Tuition Payments
      for (const m of tuitionMonths) {
        lastPayment = await Store.recordPayment({
          studentId: this.selectedCollectionStudent.id,
          monthKey: m.monthKey,
          feeType: 'MONTHLY',
          amount: m.amount,
          paymentMode: paymentModeSelect ? paymentModeSelect.value : 'Cash',
          notes: notesInput ? notesInput.value : ''
        });
      }

      // 2. Record Transport Payments
      for (const tm of transMonths) {
        lastPayment = await Store.recordPayment({
          studentId: this.selectedCollectionStudent.id,
          monthKey: tm.monthKey,
          feeType: 'TRANSPORT',
          amount: tm.amount,
          paymentMode: paymentModeSelect ? paymentModeSelect.value : 'Cash',
          notes: notesInput ? notesInput.value : `Transport fee for ${tm.monthKey}`
        });
      }

      this.hideLoading();
      const payments = Store.getPayments();
      const classOverrides = Store.getClassOverrides();
      const feeSummary = FeeEngine.calculateStudentFee(this.selectedCollectionStudent, payments, classOverrides, [], 12);
      this.selectedCollectionMonths = [];
      this.selectedCollectionTransportMonths = [];
      this.selectStudentForCollection(this.selectedCollectionStudent.id);
      if (lastPayment) {
        ReceiptModule.renderReceiptModal(lastPayment, this.selectedCollectionStudent, feeSummary);
      }
      this.toast(`Fee collected for ${this.selectedCollectionStudent.name}. Saved to Cloud Firestore.`, 'success');
      this.renderDashboard();
    } catch (err) {
      this.hideLoading();
      console.error(err);
      this.toast('Error saving fee: ' + err.message, 'error');
    }
  },

  updatePaymentSummary(feeSummary) {
    const totalDueEl = document.getElementById('collection-total-due');
    if (totalDueEl) totalDueEl.innerText = '₹' + feeSummary.totalPendingAmount.toLocaleString('en-IN');
    this.updateSelectionDock();
  },

  // ===== DEFAULTERS VIEW =====
  renderDefaultersView(filterQuery = '', filterClass = '') {
    const tbody = document.getElementById('defaulters-table-tbody');
    if (!tbody) return;

    let students = Store.getStudents();
    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();

    const defaulters = [];
    students.forEach(s => {
      const summary = FeeEngine.calculateStudentFee(s, payments, classOverrides, [], 5);
      if (summary.totalPendingAmount > 0) defaulters.push({ student: s, summary });
    });

    let filtered = defaulters;
    const q = filterQuery.toLowerCase().trim();
    if (q) filtered = filtered.filter(d => (d.student.name||'').toLowerCase().includes(q) || (d.student.fatherName||'').toLowerCase().includes(q));
    if (filterClass) filtered = filtered.filter(d => FirebaseService.normalizeClassName(d.student.className) === FirebaseService.normalizeClassName(filterClass));

    const badge = document.getElementById('defaulters-count-badge');
    if (badge) badge.textContent = `${defaulters.length} Defaulters`;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
        <h3>${defaulters.length === 0 ? '🎉 No Defaulters!' : 'No matches found'}</h3>
        <p>${defaulters.length === 0 ? 'All active students have cleared their dues in Cloud Firestore.' : 'Try adjusting your filters.'}</p>
      </div></td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(d => {
      const s = d.student;
      const sum = d.summary;
      return `<tr>
        <td><div style="font-weight:700;">${s.name}</div><div style="font-size:0.75rem;color:var(--text-muted);">Adm: ${s.admissionNo || s.id.substring(0,8)}</div></td>
        <td><span class="badge badge-secondary">${FirebaseService.normalizeClassName(s.className)}</span></td>
        <td>${s.fatherName || '—'}<br><span style="font-family:var(--font-mono);font-size:0.78rem;">${s.guardianMobile || '—'}</span></td>
        <td><div style="display:flex;flex-wrap:wrap;gap:0.25rem;">${sum.pendingMonthsList.slice(0,4).map(m=>`<span class="badge badge-warning">${m}</span>`).join('')}${sum.pendingMonthsList.length>4?`<span class="badge badge-secondary">+${sum.pendingMonthsList.length-4}</span>`:''}</div></td>
        <td><strong style="color:var(--danger);font-size:1.05rem;">₹${sum.totalPendingAmount.toLocaleString('en-IN')}</strong></td>
        <td><div class="table-actions">
          <button class="btn btn-xs btn-primary" onclick="App.openFeeCollectionForStudent('${s.id}')">Collect</button>
          <button class="btn btn-xs btn-whatsapp" onclick="WhatsAppModule.openReminderPreview('${s.id}')">WhatsApp</button>
        </div></td>
      </tr>`;
    }).join('');

    const applyDef = () => {
      this.renderDefaultersView(
        document.getElementById('defaulter-search-input')?.value || '',
        document.getElementById('defaulter-class-filter')?.value || ''
      );
    };
    ['defaulter-search-input', 'defaulter-class-filter'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el._bound) { el.addEventListener('input', applyDef); el._bound = true; }
    });
  },

  // ===== DISCOUNT MODAL =====
  openDiscountModal(studentId) {
    const student = Store.getStudentById(studentId);
    if (!student) return alert('Student not found.');

    this.selectedDiscountStudentId = studentId;

    const payments = Store.getPayments();
    const classOverrides = Store.getClassOverrides();
    const feeSummary = FeeEngine.calculateStudentFee(student, payments, classOverrides, [], 12);

    const modalBody = document.getElementById('discount-modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="background:var(--bg-card); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:1.25rem;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.88rem;">
          <div><strong>Student Name:</strong> ${student.name}</div>
          <div><strong>Admission No:</strong> ${student.admissionNo}</div>
          <div><strong>Class:</strong> ${student.className} (${student.section})</div>
          <div><strong>Standard Class Fee:</strong> ₹${feeSummary.baseMonthlyFee}/mo</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Primary Concession Category:</label>
        <select id="modal-concession-type" class="form-control">
          ${Object.keys(CONFIG.primaryConcessions).map(key => {
            const item = CONFIG.primaryConcessions[key];
            const isSel = student.concessionType === key ? 'selected' : '';
            return `<option value="${key}" ${isSel}>${item.label} (${item.monthlyDiscountPercent}% Monthly Discount ${item.waivesAdmission ? '+ Admission Waived' : ''})</option>`;
          }).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Custom Fixed Monthly Fee Override (₹) [Optional]:</label>
        <input type="number" id="modal-custom-monthly-fee" class="form-control" placeholder="Enter custom monthly fee (e.g. 650)" value="${student.customMonthlyFee !== undefined && student.customMonthlyFee !== null ? student.customMonthlyFee : ''}">
      </div>

      <div style="margin-bottom:1.25rem; background:rgba(255,255,255,0.03); padding:0.85rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <label class="form-label" style="margin-bottom:0.5rem; font-weight:700;">Complementary Concession Rules:</label>
        <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.85rem;">
          <div>
            <label style="display:flex; align-items:flex-start; gap:0.5rem; cursor:pointer;">
              <input type="checkbox" id="modal-late-admission-waiver" style="margin-top:0.2rem;" onchange="document.getElementById('late-admission-month-wrap').style.display = this.checked ? 'block' : 'none';" ${student.lateAdmissionMonthlyWaiver ? 'checked' : ''}>
              <span><strong>Late Admission Previous Months Monthly Fee Off:</strong> Only monthly tuition fee of previous months (before admission month) is 100% OFF / Waived if admitted after July (Admission fee remains payable).</span>
            </label>

            <!-- Compulsory Admission Month Selector -->
            <div id="late-admission-month-wrap" style="margin-left:1.5rem; margin-top:0.4rem; background:rgba(0,0,0,0.18); padding:0.65rem 0.85rem; border-radius:var(--radius-sm); border:1px solid var(--border-color); display: ${student.lateAdmissionMonthlyWaiver ? 'block' : 'none'};">
              <label class="form-label" style="font-size:0.78rem; font-weight:700; color:var(--text-main); margin-bottom:0.3rem;">
                Compulsory Admission Month (Fees start from this month, prior months will be 100% OFF) <span style="color:var(--danger);">*</span>:
              </label>
              <select id="modal-admission-start-month" class="form-control form-control-sm" style="max-width:260px; font-weight:600;">
                <option value="">-- Choose Admission Month * --</option>
                ${CONFIG.months.map(m => {
                  const defaultKey = student.lateAdmissionStartMonth || (student.admissionDate ? CONFIG.months[FeeEngine.getMonthIndexFromDate(student.admissionDate) - 1]?.key : 'AUG');
                  const isSel = (defaultKey === m.key) ? 'selected' : '';
                  return `<option value="${m.key}" ${isSel}>${m.name} 2026 (Month ${m.index})</option>`;
                }).join('')}
              </select>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.25rem;">
                E.g., If 'August' is selected, April, May, June, July monthly fees will be marked as ₹0 (Exempt).
              </div>
            </div>
          </div>

          <label style="display:flex; align-items:flex-start; gap:0.5rem; cursor:pointer;">
            <input type="checkbox" id="modal-income-cert" style="margin-top:0.2rem;" ${student.incomeCertificateApproved ? 'checked' : ''}>
            <span><strong>Income Certificate Waiver:</strong> 100% Admission Fee Waiver for students admitted after July.</span>
          </label>
          <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <input type="checkbox" id="modal-transport-req" ${student.transportRequired ? 'checked' : ''}>
            <span>Transport Service Active (₹300/month)</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Reason / Justification <span style="color:var(--danger);">*</span>:</label>
        <textarea id="modal-audit-reason" class="form-control" rows="2" placeholder="e.g. Admitted in August - April to July monthly fee waived by Principal"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Approved By User:</label>
        <input type="text" id="modal-approved-by" class="form-control" value="Fee Manager">
      </div>
    `;

    document.getElementById('discount-modal').classList.add('active');
  },

  async saveDiscountAssignment() {
    if (!this.selectedDiscountStudentId) return;

    const concessionSelect = document.getElementById('modal-concession-type');
    const customFeeInput = document.getElementById('modal-custom-monthly-fee');
    const lateAdmissionCheck = document.getElementById('modal-late-admission-waiver');
    const startMonthSelect = document.getElementById('modal-admission-start-month');
    const incomeCertCheck = document.getElementById('modal-income-cert');
    const transportCheck = document.getElementById('modal-transport-req');
    const reasonTextarea = document.getElementById('modal-audit-reason');
    const approvedByInput = document.getElementById('modal-approved-by');

    const isLateAdmissionWaiver = lateAdmissionCheck ? lateAdmissionCheck.checked : false;
    let lateAdmissionStartMonth = null;

    if (isLateAdmissionWaiver) {
      if (!startMonthSelect || !startMonthSelect.value) {
        this.toast('Admission Month selection is compulsory for Late Admission discount.', 'error');
        if (startMonthSelect) startMonthSelect.focus();
        return;
      }
      lateAdmissionStartMonth = startMonthSelect.value;
    }

    const reason = reasonTextarea ? reasonTextarea.value.trim() : '';
    if (!reason) {
      this.toast('Reason is required for discount assignment.', 'error');
      if (reasonTextarea) reasonTextarea.focus();
      return;
    }

    const student = Store.getStudentById(this.selectedDiscountStudentId);
    student.concessionType = concessionSelect ? concessionSelect.value : 'NONE';
    student.customMonthlyFee = customFeeInput && customFeeInput.value !== '' ? Number(customFeeInput.value) : null;
    student.lateAdmissionMonthlyWaiver = isLateAdmissionWaiver;
    student.lateAdmissionStartMonth = lateAdmissionStartMonth;
    student.incomeCertificateSubmitted = incomeCertCheck ? incomeCertCheck.checked : false;
    student.incomeCertificateApproved = incomeCertCheck ? incomeCertCheck.checked : false;
    student.transportRequired = transportCheck ? transportCheck.checked : false;

    this.showLoading('Updating discount in Cloud Firestore...');
    await Store.saveStudent(student, approvedByInput ? approvedByInput.value : 'Admin');
    this.hideLoading();

    document.getElementById('discount-modal').classList.remove('active');
    this.renderStudentsView();
    if (this.selectedCollectionStudent && this.selectedCollectionStudent.id === student.id) {
      this.selectStudentForCollection(student.id);
    }
    this.renderDashboard();
    this.renderDefaultersView();
    this.toast(`Discount saved to Cloud Firestore for ${student.name}.`, 'success');
  },

  // ===== ADD / EDIT STUDENT MODALS =====
  currentWizardStep: 1,

  openAddStudentModal() {
    const titleEl = document.getElementById('student-modal-title');
    if (titleEl) titleEl.innerText = 'Add New Student Admission';
    this.currentWizardStep = 1;
    this.renderStudentFormModal();
    document.getElementById('student-modal').classList.add('active');
  },

  openEditStudentModal(studentId) {
    const student = Store.getStudentById(studentId);
    if (!student) return alert('Student profile not found.');
    const titleEl = document.getElementById('student-modal-title');
    if (titleEl) titleEl.innerText = `Edit Student Profile - ${student.name}`;
    this.currentWizardStep = 1;
    this.renderStudentFormModal(student);
    document.getElementById('student-modal').classList.add('active');
  },

  setWizardStep(stepNum) {
    this.currentWizardStep = stepNum;
    document.querySelectorAll('.wizard-step-item').forEach(item => {
      const s = Number(item.dataset.step);
      item.classList.toggle('active', s === stepNum);
      item.classList.toggle('completed', s < stepNum);
    });
    document.querySelectorAll('.wizard-panel').forEach(panel => {
      panel.classList.toggle('active', Number(panel.dataset.step) === stepNum);
    });

    if (stepNum === 4) {
      this.updateWizardReviewSummary();
    }
  },

  updateWizardReviewSummary() {
    const name = document.getElementById('new-stu-name')?.value || '—';
    const cls = document.getElementById('new-stu-class')?.value || '—';
    const sec = document.getElementById('new-stu-section')?.value || 'A';
    const admNo = document.getElementById('new-stu-adm-no')?.value || 'Auto-generated';
    const father = document.getElementById('new-stu-father')?.value || '—';
    const mobile = document.getElementById('new-stu-mobile')?.value || '—';
    const promoted = document.getElementById('new-stu-promoted')?.checked;
    const concKey = document.getElementById('new-stu-concession')?.value;
    const transport = document.getElementById('new-stu-transport')?.value === 'true';

    const reviewEl = document.getElementById('wizard-review-box');
    if (reviewEl) {
      reviewEl.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1rem;display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;font-size:0.84rem;">
          <div><span style="color:var(--text-muted);">Student Name:</span> <strong>${name}</strong></div>
          <div><span style="color:var(--text-muted);">Class & Section:</span> <strong>${cls} (${sec})</strong></div>
          <div><span style="color:var(--text-muted);">Father Name:</span> <strong>${father}</strong></div>
          <div><span style="color:var(--text-muted);">Guardian Mobile:</span> <strong>${mobile}</strong></div>
          <div><span style="color:var(--text-muted);">Admission Number:</span> <strong>${admNo}</strong></div>
          <div><span style="color:var(--text-muted);">Student Type:</span> <strong>${promoted ? 'Promoted (₹0 Adm Fee)' : 'New Admission'}</strong></div>
          <div><span style="color:var(--text-muted);">Concession:</span> <strong style="color:var(--primary);">${CONFIG.primaryConcessions[concKey]?.label || 'None'}</strong></div>
          <div><span style="color:var(--text-muted);">Transport:</span> <strong>${transport ? 'Active (₹300/mo)' : 'No'}</strong></div>
        </div>
      `;
    }
  },

  renderStudentFormModal(student = null) {
    const modalBody = document.getElementById('student-modal-body');
    if (!modalBody) return;

    const todayDate = new Date().toISOString().split('T')[0];

    modalBody.innerHTML = `
      <input type="hidden" id="edit-stu-id" value="${student ? student.id : ''}">
      
      <!-- Wizard Progress Steps -->
      <div class="wizard-steps">
        <div class="wizard-step-item active" data-step="1" onclick="App.setWizardStep(1)">
          <div class="wizard-step-num">1</div>
          <span>Student Info</span>
        </div>
        <div class="wizard-step-item" data-step="2" onclick="App.setWizardStep(2)">
          <div class="wizard-step-num">2</div>
          <span>Parent / Guardian</span>
        </div>
        <div class="wizard-step-item" data-step="3" onclick="App.setWizardStep(3)">
          <div class="wizard-step-num">3</div>
          <span>Fee Setup</span>
        </div>
        <div class="wizard-step-item" data-step="4" onclick="App.setWizardStep(4)">
          <div class="wizard-step-num">4</div>
          <span>Review</span>
        </div>
      </div>

      <!-- Step 1: Student Information -->
      <div class="wizard-panel active" data-step="1">
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Student Full Name *</label>
            <input type="text" id="new-stu-name" class="form-control" placeholder="e.g. Aarav Sharma" value="${student ? student.name : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Class *</label>
            <select id="new-stu-class" class="form-control">
              ${CONFIG.classes.map(c => {
                const isSel = student && student.className === c.name ? 'selected' : '';
                return `<option value="${c.name}" ${isSel}>${c.name} (Base Fee ₹${c.defaultMonthlyFee}/mo)</option>`;
              }).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Section</label>
            <input type="text" id="new-stu-section" class="form-control" value="${student ? student.section : 'A'}">
          </div>
          <div class="form-group">
            <label class="form-label">Admission No. (Optional)</label>
            <input type="text" id="new-stu-adm-no" class="form-control" placeholder="e.g. ADM-042" value="${student ? (student.admissionNo || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Admission Date *</label>
            <input type="date" id="new-stu-adm-date" class="form-control" value="${student && student.admissionDate ? student.admissionDate : todayDate}">
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:1rem;">
          <button type="button" class="btn btn-primary" onclick="App.setWizardStep(2)">Next: Parent Details →</button>
        </div>
      </div>

      <!-- Step 2: Parent Information -->
      <div class="wizard-panel" data-step="2">
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Father's Name *</label>
            <input type="text" id="new-stu-father" class="form-control" placeholder="e.g. Rajiv Sharma" value="${student ? student.fatherName : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Mother's Name</label>
            <input type="text" id="new-stu-mother" class="form-control" placeholder="e.g. Sunita Sharma" value="${student ? (student.motherName || '') : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Guardian WhatsApp / Mobile *</label>
            <input type="text" id="new-stu-mobile" class="form-control" placeholder="10-digit mobile number" value="${student ? student.guardianMobile : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Campus / Residential Address</label>
            <input type="text" id="new-stu-address" class="form-control" placeholder="e.g. 25th Battalion PAC Campus" value="${student ? (student.address || '') : ''}">
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:1rem;">
          <button type="button" class="btn btn-secondary" onclick="App.setWizardStep(1)">← Back</button>
          <button type="button" class="btn btn-primary" onclick="App.setWizardStep(3)">Next: Fee Setup →</button>
        </div>
      </div>

      <!-- Step 3: Fee Setup -->
      <div class="wizard-panel" data-step="3">
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Primary Concession Category</label>
            <select id="new-stu-concession" class="form-control">
              ${Object.keys(CONFIG.primaryConcessions).map(key => {
                const isSel = student && student.concessionType === key ? 'selected' : '';
                return `<option value="${key}" ${isSel}>${CONFIG.primaryConcessions[key].label}</option>`;
              }).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Transport Service</label>
            <select id="new-stu-transport" class="form-control">
              <option value="false" ${student && !student.transportRequired ? 'selected' : ''}>No Transport</option>
              <option value="true" ${student && student.transportRequired ? 'selected' : ''}>Active (₹300/mo)</option>
            </select>
          </div>
          <div class="form-group" style="grid-column:1/-1; background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.25); padding:0.75rem 1rem; border-radius:var(--radius-md);">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-weight:700; color:var(--text-main); margin-bottom:0;">
              <input type="checkbox" id="new-stu-promoted" ${student && (student.isPromoted || student.studentType === 'PROMOTED') ? 'checked' : ''} style="width:17px; height:17px;">
              <span>Old / Promoted Student (पुन: प्रवेश) — 100% Admission Fee Waived (₹0)</span>
            </label>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px; margin-left:24px;">
              Tick this if student studied in previous session and is promoted. No admission fee will be charged.
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:1rem;">
          <button type="button" class="btn btn-secondary" onclick="App.setWizardStep(2)">← Back</button>
          <button type="button" class="btn btn-primary" onclick="App.setWizardStep(4)">Next: Review & Save →</button>
        </div>
      </div>

      <!-- Step 4: Review Summary -->
      <div class="wizard-panel" data-step="4">
        <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:0.75rem;">Review Student Profile Details</h4>
        <div id="wizard-review-box"></div>
        <div style="display:flex;justify-content:space-between;margin-top:1.25rem;">
          <button type="button" class="btn btn-secondary" onclick="App.setWizardStep(3)">← Back to Fee Setup</button>
          <button type="button" class="btn btn-primary" onclick="App.saveNewStudent()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Confirm & Save to Firestore
          </button>
        </div>
      </div>
    `;
  },

  async saveNewStudent() {
    const editIdInput = document.getElementById('edit-stu-id');
    const editId = editIdInput ? editIdInput.value : '';

    const nameInput = document.getElementById('new-stu-name');
    const fatherInput = document.getElementById('new-stu-father');
    const classSelect = document.getElementById('new-stu-class');
    const sectionInput = document.getElementById('new-stu-section');
    const admNoInput = document.getElementById('new-stu-adm-no');
    const mobileInput = document.getElementById('new-stu-mobile');
    const dateInput = document.getElementById('new-stu-adm-date');
    const concessionSelect = document.getElementById('new-stu-concession');
    const transportSelect = document.getElementById('new-stu-transport');
    const promotedCheck = document.getElementById('new-stu-promoted');

    if (!nameInput?.value.trim() || !fatherInput?.value.trim() || !mobileInput?.value.trim()) {
      this.toast('Please fill in Student Name, Father Name & Mobile Number.', 'error');
      this.setWizardStep(1);
      return;
    }

    const isPromoted = promotedCheck ? promotedCheck.checked : false;

    const studentPayload = {
      name: nameInput.value.trim(),
      fatherName: fatherInput.value.trim(),
      guardianName: fatherInput.value.trim(),
      className: classSelect.value,
      section: sectionInput?.value.trim() || 'A',
      admissionNo: admNoInput?.value.trim() || '',
      guardianMobile: mobileInput.value.trim(),
      admissionDate: dateInput?.value || new Date().toISOString().split('T')[0],
      concessionType: concessionSelect?.value || 'NONE',
      transportRequired: transportSelect?.value === 'true',
      isPromoted: isPromoted,
      studentType: isPromoted ? 'PROMOTED' : 'NEW'
    };

    if (editId) {
      studentPayload.id = editId;
    }

    this.showLoading('Saving student to Cloud Firestore...');
    const savedStudent = await Store.saveStudent(studentPayload);
    this.hideLoading();

    document.getElementById('student-modal').classList.remove('active');
    this.renderStudentsView();
    this.renderDashboard();
    this.renderDefaultersView();
    this.toast(`Student "${savedStudent.name}" profile saved directly to Firestore.`, 'success');
  },

  // ===== COMMAND SPOTLIGHT PALETTE (Ctrl + K) =====
  toggleCommandPalette(show = true) {
    const palette = document.getElementById('command-palette');
    const input = document.getElementById('command-search-input');
    if (!palette) return;

    if (show) {
      palette.classList.add('active');
      if (input) {
        input.value = '';
        input.focus();
        this.handleCommandPaletteSearch('');
      }
    } else {
      palette.classList.remove('active');
    }
  },

  handleCommandPaletteSearch(query = '') {
    const container = document.getElementById('command-results-container');
    if (!container) return;

    const q = query.toLowerCase().trim();
    const students = Store.getStudents();
    const matchingStudents = students.filter(s =>
      !q ||
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.fatherName && s.fatherName.toLowerCase().includes(q)) ||
      (s.admissionNo && s.admissionNo.toLowerCase().includes(q)) ||
      (s.className && s.className.toLowerCase().includes(q))
    ).slice(0, 6);

    const pages = [
      { name: 'Dashboard', icon: '📊', view: 'dashboard' },
      { name: 'Collect Fee Workstation', icon: '💳', view: 'collection' },
      { name: 'Transport Fee Management (वाहन शुल्क)', icon: '🚌', view: 'transport' },
      { name: 'Students Directory', icon: '👥', view: 'students' },
      { name: 'Fee Defaulters', icon: '⚠️', view: 'defaulters' },
      { name: 'Financial Reports', icon: '📈', view: 'reports' },
      { name: 'WhatsApp Reminders Log', icon: '💬', view: 'whatsapp_logs' },
      { name: 'System Settings', icon: '⚙️', view: 'settings' }
    ].filter(p => !q || p.name.toLowerCase().includes(q) || (q === 'transport' || q === 'bus' || q === 'van' || q === 'vahan'));

    let html = '';

    // Quick Actions Group
    html += `
      <div class="command-group-title">⚡ Quick Actions</div>
      <div class="command-item" onclick="App.toggleCommandPalette(false); App.openAddStudentModal();">
        <span>➕ Add New Student Admission</span>
        <span style="font-size:0.75rem;color:var(--text-dim);">Action</span>
      </div>
      <div class="command-item" onclick="App.toggleCommandPalette(false); App.switchView('transport');">
        <span>🚌 Open Transport Fee Management</span>
        <span style="font-size:0.75rem;color:var(--text-dim);">Action</span>
      </div>
      <div class="command-item" onclick="App.toggleCommandPalette(false); App.switchView('collection');">
        <span>💳 Open Fee Cashier</span>
        <span style="font-size:0.75rem;color:var(--text-dim);">Action</span>
      </div>
    `;

    // Pages Group
    if (pages.length > 0) {
      html += `<div class="command-group-title">📄 Navigation Pages</div>`;
      html += pages.map(p => `
        <div class="command-item" onclick="App.toggleCommandPalette(false); App.switchView('${p.view}');">
          <span>${p.icon} ${p.name}</span>
          <span style="font-size:0.75rem;color:var(--text-dim);">Jump to page</span>
        </div>
      `).join('');
    }

    // Matching Students Group
    if (matchingStudents.length > 0) {
      html += `<div class="command-group-title">👤 Students (${matchingStudents.length})</div>`;
      html += matchingStudents.map(s => `
        <div class="command-item" onclick="App.toggleCommandPalette(false); App.openFeeCollectionForStudent('${s.id}');">
          <div>
            <strong>${s.name}</strong>
            <span style="font-size:0.78rem;color:var(--text-muted);margin-left:6px;">${s.className} (${s.section || 'A'}) · ADM-${s.admissionNo || 'N/A'}</span>
          </div>
          <span class="badge badge-primary" style="font-size:0.72rem;">Collect Fee</span>
        </div>
      `).join('');
    }

    container.innerHTML = html;
  },

  async quickTogglePromotedStatus(studentId) {
    const student = Store.getStudentById(studentId);
    if (!student) return;
    student.isPromoted = !student.isPromoted;
    student.studentType = student.isPromoted ? 'PROMOTED' : 'NEW';
    try {
      this.toast(`Updating admission fee status for ${student.name}...`, 'info', 1200);
      await Store.saveStudent(student, 'Fee Manager');
      this.renderStudentsView();
      if (this.selectedCollectionStudent && this.selectedCollectionStudent.id === studentId) {
        this.selectStudentForCollection(studentId, true);
      }
      this.toast(student.isPromoted ? `✓ ${student.name} marked as Promoted (Admission Fee Exempt ₹0).` : `✓ ${student.name} marked as New Admission (Admission Fee Payable).`, 'success');
    } catch (err) {
      this.toast('Error: ' + err.message, 'error');
    }
  },

  // ===== BULK STUDENT IMPORT SYSTEM =====
  importParsedStudents: [],

  openImportStudentsModal() {
    this.importParsedStudents = [];
    this.switchImportTab('file');
    const previewSec = document.getElementById('import-preview-section');
    const progContainer = document.getElementById('import-progress-container');
    const startBtn = document.getElementById('import-start-btn');
    const fileInput = document.getElementById('import-file-input');
    const textInput = document.getElementById('import-text-input');
    if (previewSec) previewSec.style.display = 'none';
    if (progContainer) progContainer.style.display = 'none';
    if (startBtn) startBtn.disabled = true;
    if (fileInput) fileInput.value = '';
    if (textInput) textInput.value = '';
    document.getElementById('import-modal').classList.add('active');
  },

  switchImportTab(tab) {
    const fileTab = document.getElementById('import-tab-file');
    const textTab = document.getElementById('import-tab-text');
    const fileBtn = document.getElementById('import-tab-file-btn');
    const textBtn = document.getElementById('import-tab-text-btn');
    if (tab === 'file') {
      if (fileTab) fileTab.style.display = 'block';
      if (textTab) textTab.style.display = 'none';
      if (fileBtn) { fileBtn.className = 'btn btn-sm btn-primary'; }
      if (textBtn) { textBtn.className = 'btn btn-sm btn-secondary'; }
    } else {
      if (fileTab) fileTab.style.display = 'none';
      if (textTab) textTab.style.display = 'block';
      if (fileBtn) { fileBtn.className = 'btn btn-sm btn-secondary'; }
      if (textBtn) { textBtn.className = 'btn btn-sm btn-primary'; }
    }
  },

  downloadSampleCsvTemplate() {
    const headers = 'Student Name,Father Name,Class,Section,Mobile,Admission No,Concession,Is Promoted,Admission Date\n';
    const sampleRows = [
      'Aarav Kumar,Rajesh Kumar,Class 1,A,9876543210,ADM-2026-001,NONE,Yes,2026-04-01',
      'Priya Sharma,Suresh Sharma,Class 2,A,9876543211,ADM-2026-002,SIBLING,Yes,2026-04-01',
      'Rohan Verma,Manoj Verma,KG-1,B,9876543212,ADM-2026-003,NONE,No,2026-04-01'
    ].join('\n');
    const blob = new Blob([headers + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'students_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.toast('Sample CSV Template downloaded.', 'success');
  },

  handleImportFileSelect(e) {
    const file = e.target.files[0];
    if (file) this.processImportFile(file);
  },

  handleImportFileDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) this.processImportFile(file);
  },

  async processImportFile(file) {
    const fileName = file.name.toLowerCase();
    this.toast(`Processing ${file.name}...`, 'info', 1200);

    try {
      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        if (typeof XLSX === 'undefined') {
          throw new Error('Excel parser library loading, please try again.');
        }
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        this.normalizeAndPreviewImportData(rawJson);
      } else {
        // CSV or text
        const text = await file.text();
        this.parseCsvOrTsvText(text);
      }
    } catch (err) {
      console.error(err);
      this.toast('Error reading file: ' + err.message, 'error');
    }
  },

  parsePastedImportText() {
    const text = document.getElementById('import-text-input')?.value || '';
    if (!text.trim()) {
      this.toast('Please paste text or table rows first.', 'warning');
      return;
    }
    this.parseCsvOrTsvText(text);
  },

  parseCsvOrTsvText(rawText) {
    const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length === 0) {
      this.toast('No rows found to import.', 'warning');
      return;
    }

    const isTsv = lines[0].includes('\t');
    const parseLine = (line) => {
      if (isTsv) return line.split('\t').map(c => c.trim().replace(/^["']|["']$/g, ''));
      const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
      const row = [];
      let match;
      while ((match = regex.exec(line)) !== null) {
        let val = match[1] || '';
        val = val.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
        row.push(val);
        if (regex.lastIndex >= line.length) break;
      }
      return row;
    };

    const firstRowCols = parseLine(lines[0]);
    const isHeader = firstRowCols.some(c => /name|father|class|mobile|adm|roll|pen|serial/i.test(c));

    let headers = [];
    let startIdx = 0;
    if (isHeader) {
      headers = firstRowCols.map(c => c.toLowerCase());
      startIdx = 1;
    } else {
      headers = ['name', 'fathername', 'classname', 'section', 'mobile', 'admissionno'];
    }

    const parsedObjects = [];
    for (let i = startIdx; i < lines.length; i++) {
      const cols = parseLine(lines[i]);
      if (cols.length === 0 || (cols.length === 1 && !cols[0])) continue;
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = cols[idx] || '';
      });
      parsedObjects.push(obj);
    }

    this.normalizeAndPreviewImportData(parsedObjects);
  },

  normalizeAndPreviewImportData(rawRows) {
    if (!rawRows || rawRows.length === 0) {
      this.toast('No student records found in data.', 'warning');
      return;
    }

    const defaultClass = document.getElementById('import-default-class')?.value || 'Class 1';
    const isPromotedDefault = document.getElementById('import-default-promoted')?.checked ?? true;
    const existingStudents = Store.getStudents();
    const existingAdmMap = new Map();
    existingStudents.forEach(s => {
      if (s.admissionNo) existingAdmMap.set(s.admissionNo.toLowerCase(), s);
    });

    const normalized = [];
    rawRows.forEach((r, idx) => {
      const nameKey = Object.keys(r).find(k => /student.*name|name|bacha/i.test(k));
      const fatherKey = Object.keys(r).find(k => /father|guardian|pita|parent/i.test(k));
      const classKey = Object.keys(r).find(k => /class|cls|std|grade|kaksha/i.test(k));
      const secKey = Object.keys(r).find(k => /section|sec|varg/i.test(k));
      const mobileKey = Object.keys(r).find(k => /mobile|phone|contact|number/i.test(k));
      const admKey = Object.keys(r).find(k => /adm|pen|sr|reg|id/i.test(k));
      const promotedKey = Object.keys(r).find(k => /promot|old|purana/i.test(k));

      const name = String(r[nameKey] || r.name || r.Name || '').trim();
      if (!name) return;

      const fatherName = String(r[fatherKey] || r.fatherName || r.FatherName || '').trim();
      let className = String(r[classKey] || r.className || r.class || defaultClass).trim();
      className = FirebaseService.normalizeClassName(className);
      const section = String(r[secKey] || r.section || 'A').trim().toUpperCase() || 'A';
      let mobile = String(r[mobileKey] || r.mobile || r.guardianMobile || '').trim().replace(/\D/g, '');
      if (mobile.length > 10) mobile = mobile.slice(-10);
      if (mobile.length < 10) mobile = '9876543210';

      const admNo = String(r[admKey] || r.admissionNo || '').trim();
      const isPromotedVal = promotedKey ? /yes|true|1|promot|old|haan/i.test(String(r[promotedKey])) : isPromotedDefault;

      const existingMatch = admNo ? existingAdmMap.get(admNo.toLowerCase()) : null;

      normalized.push({
        tempId: 'IMP-' + (idx + 1),
        existingId: existingMatch ? existingMatch.id : null,
        name,
        fatherName,
        guardianName: fatherName,
        className,
        section,
        guardianMobile: mobile,
        admissionNo: admNo || ('ADM-2026-' + String(existingStudents.length + normalized.length + 1).padStart(3, '0')),
        isPromoted: isPromotedVal,
        studentType: isPromotedVal ? 'PROMOTED' : 'NEW',
        concessionType: r.concessionType || 'NONE',
        transportRequired: Boolean(r.transportRequired),
        status: 'Active',
        isDeleted: false,
        admissionDate: r.admissionDate || '2026-04-01',
        isDuplicate: Boolean(existingMatch)
      });
    });

    this.importParsedStudents = normalized;
    this.renderImportPreview();
  },

  renderImportPreview() {
    const tbody = document.getElementById('import-preview-tbody');
    const previewSec = document.getElementById('import-preview-section');
    const startBtn = document.getElementById('import-start-btn');
    const badge = document.getElementById('import-preview-badge');
    const heading = document.getElementById('import-preview-heading');

    if (!tbody || !previewSec || !startBtn) return;

    if (this.importParsedStudents.length === 0) {
      previewSec.style.display = 'none';
      startBtn.disabled = true;
      return;
    }

    previewSec.style.display = 'block';
    startBtn.disabled = false;

    const duplicates = this.importParsedStudents.filter(s => s.isDuplicate).length;
    if (badge) badge.textContent = `${this.importParsedStudents.length} Students (${duplicates} Existing/Updates)`;
    if (heading) heading.textContent = `Parsed Students Preview (${this.importParsedStudents.length} Total)`;

    tbody.innerHTML = this.importParsedStudents.slice(0, 50).map((s, idx) => `
      <tr>
        <td><strong>${idx + 1}</strong></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.fatherName || '—'}</td>
        <td><span class="badge badge-secondary">${s.className} (${s.section})</span></td>
        <td><code>${s.guardianMobile}</code></td>
        <td><code>${s.admissionNo}</code></td>
        <td>${s.isPromoted ? '<span class="badge badge-info">Promoted (₹0 Adm)</span>' : '<span class="badge badge-secondary">New (Adm Due)</span>'}</td>
      </tr>
    `).join('') + (this.importParsedStudents.length > 50 ? `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);">... and ${this.importParsedStudents.length - 50} more students ready to import</td></tr>` : '');
  },

  async executeBulkStudentImport() {
    if (!this.importParsedStudents || this.importParsedStudents.length === 0) return;

    const total = this.importParsedStudents.length;
    const progContainer = document.getElementById('import-progress-container');
    const progBar = document.getElementById('import-progress-bar');
    const progLabel = document.getElementById('import-progress-label');
    const progPercent = document.getElementById('import-progress-percent');
    const startBtn = document.getElementById('import-start-btn');

    if (progContainer) progContainer.style.display = 'block';
    if (startBtn) startBtn.disabled = true;

    let importedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < total; i++) {
      const studentData = this.importParsedStudents[i];
      const payload = {
        name: studentData.name,
        fatherName: studentData.fatherName,
        guardianName: studentData.fatherName,
        className: studentData.className,
        section: studentData.section,
        guardianMobile: studentData.guardianMobile,
        admissionNo: studentData.admissionNo,
        isPromoted: studentData.isPromoted,
        studentType: studentData.studentType,
        concessionType: studentData.concessionType || 'NONE',
        transportRequired: studentData.transportRequired || false,
        status: 'Active',
        isDeleted: false,
        admissionDate: studentData.admissionDate || '2026-04-01'
      };

      if (studentData.existingId) {
        payload.id = studentData.existingId;
      }

      try {
        await Store.saveStudent(payload, 'Bulk Importer');
        importedCount++;
      } catch (err) {
        console.error('Import row error:', err);
        errorCount++;
      }

      const percent = Math.round(((i + 1) / total) * 100);
      if (progBar) progBar.style.width = `${percent}%`;
      if (progPercent) progPercent.textContent = `${percent}%`;
      if (progLabel) progLabel.textContent = `Saving ${i + 1} of ${total} students to Cloud Firestore...`;
    }

    this.toast(`✓ Successfully imported ${importedCount} students to Cloud Firestore!`, 'success', 4000);
    setTimeout(() => {
      document.getElementById('import-modal').classList.remove('active');
      this.renderStudentsView();
      this.renderDashboard();
      this.renderDefaultersView();
    }, 800);
  },

  // ===== WHATSAPP LOGS, SETTINGS & AUDIT TRAIL =====
  renderWhatsAppLogs() {
    const tbody = document.getElementById('whatsapp-logs-tbody');
    if (!tbody) return;

    const logs = Store.getWhatsAppLogs();
    tbody.innerHTML = logs.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No WhatsApp messages sent yet.</td></tr>' :
      logs.map(l => `
        <tr>
          <td>${new Date(l.sentAt).toLocaleString('en-IN')}</td>
          <td><strong>${l.studentName}</strong></td>
          <td>${l.guardianMobile}</td>
          <td>₹${l.pendingAmount.toLocaleString('en-IN')} (${l.pendingMonths})</td>
          <td><span class="badge badge-success">${l.status}</span></td>
          <td><span class="font-mono" style="font-size:0.75rem;">${l.apiMessageId}</span></td>
        </tr>
      `).join('');
  },

  renderSettingsView() {
    const templateTextarea = document.getElementById('setting-wa-template');
    if (templateTextarea) {
      templateTextarea.value = CONFIG.whatsapp.defaultTemplate;
    }
  },

  renderAuditLogs() {
    const tbody = document.getElementById('audit-logs-tbody');
    if (!tbody) return;

    const logs = Store.getAuditLogs();
    tbody.innerHTML = logs.length === 0 ? '<tr><td colspan="5" style="text-align:center;">No audit actions recorded yet.</td></tr>' :
      logs.map(l => `
        <tr>
          <td>${new Date(l.timestamp).toLocaleString('en-IN')}</td>
          <td><strong>${l.user}</strong></td>
          <td><span class="badge badge-info">${l.action}</span></td>
          <td>${l.entity} (${l.entityId})</td>
          <td>${l.reason || '-'}</td>
        </tr>
      `).join('');
  },

  bindGlobalSearch() {
    // 1. Top Header Global Live Search with Dropdown
    const searchInput = document.getElementById('global-search-input');
    const dropdown = document.getElementById('global-search-dropdown');
    
    if (searchInput && dropdown) {
      const handleSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length < 1) {
          dropdown.classList.remove('active');
          dropdown.innerHTML = '';
          return;
        }

        const students = Store.getStudents();
        const matches = students.filter(s =>
          (s.name || '').toLowerCase().includes(query) ||
          (s.fatherName || '').toLowerCase().includes(query) ||
          (s.admissionNo || '').toLowerCase().includes(query) ||
          (s.guardianMobile || '').includes(query) ||
          (s.className || '').toLowerCase().includes(query)
        ).slice(0, 10);

        if (matches.length === 0) {
          dropdown.innerHTML = `<div style="padding:0.75rem 1rem; color:var(--text-dim); font-size:0.82rem; text-align:center;">No matching students found</div>`;
          dropdown.classList.add('active');
          return;
        }

        dropdown.innerHTML = matches.map(s => {
          return `
            <div class="search-result-item" onclick="App.openFeeCollectionForStudent('${s.id}'); document.getElementById('global-search-dropdown').classList.remove('active'); document.getElementById('global-search-input').value='';">
              <div>
                <div style="font-weight:700; font-size:0.87rem; color:var(--text-main);">${s.name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Father: ${s.fatherName || '—'} | Mob: ${s.guardianMobile || '—'}</div>
              </div>
              <div style="text-align:right;">
                <span class="badge badge-secondary">${FirebaseService.normalizeClassName(s.className)}</span>
                <div style="font-size:0.72rem; color:var(--text-dim); font-family:var(--font-mono);">${s.admissionNo || s.id.substring(0,8)}</div>
              </div>
            </div>
          `;
        }).join('');
        dropdown.classList.add('active');
      };

      searchInput.addEventListener('input', handleSearch);
      searchInput.addEventListener('focus', handleSearch);
    }

    // 2. Collection View Quick Live Search
    const collInput = document.getElementById('collection-quick-search-input');
    const collDropdown = document.getElementById('collection-search-dropdown');

    if (collInput && collDropdown) {
      const handleCollSearch = () => {
        const query = collInput.value.toLowerCase().trim();
        if (query.length < 1) {
          collDropdown.classList.remove('active');
          collDropdown.innerHTML = '';
          return;
        }

        const students = Store.getStudents();
        const matches = students.filter(s =>
          (s.name || '').toLowerCase().includes(query) ||
          (s.fatherName || '').toLowerCase().includes(query) ||
          (s.admissionNo || '').toLowerCase().includes(query) ||
          (s.guardianMobile || '').includes(query) ||
          (s.className || '').toLowerCase().includes(query)
        ).slice(0, 10);

        if (matches.length === 0) {
          collDropdown.innerHTML = `<div style="padding:0.75rem 1rem; color:var(--text-dim); font-size:0.82rem; text-align:center;">No matching students found</div>`;
          collDropdown.classList.add('active');
          return;
        }

        collDropdown.innerHTML = matches.map(s => {
          return `
            <div class="search-result-item" onclick="App.selectStudentForCollection('${s.id}'); document.getElementById('collection-search-dropdown').classList.remove('active'); document.getElementById('collection-quick-search-input').value='';">
              <div>
                <div style="font-weight:700; font-size:0.87rem; color:var(--text-main);">${s.name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Father: ${s.fatherName || '—'} | Mob: ${s.guardianMobile || '—'}</div>
              </div>
              <div style="text-align:right;">
                <span class="badge badge-secondary">${FirebaseService.normalizeClassName(s.className)}</span>
                <div style="font-size:0.72rem; color:var(--text-dim); font-family:var(--font-mono);">${s.admissionNo || s.id.substring(0,8)}</div>
              </div>
            </div>
          `;
        }).join('');
        collDropdown.classList.add('active');
      };

      collInput.addEventListener('input', handleCollSearch);
      collInput.addEventListener('focus', handleCollSearch);
    }

    // Close search dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.quick-search') && dropdown) {
        dropdown.classList.remove('active');
      }
      if (!e.target.closest('#collection-quick-search-input') && !e.target.closest('#collection-search-dropdown') && collDropdown) {
        collDropdown.classList.remove('active');
      }
    });
  },

  bindThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('fee_app_theme', newTheme);
        this.toast(`Switched to ${newTheme} mode.`, 'info', 1800);
      });
      const saved = localStorage.getItem('fee_app_theme');
      if (saved) document.documentElement.setAttribute('data-theme', saved);
    }
  },

  updateDashboardCountBadge(count) {
    const b = document.getElementById('dashboard-student-count-badge');
    if (b) { b.textContent = `${count} Students`; b.className = count > 0 ? 'badge badge-success' : 'badge badge-secondary'; }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
