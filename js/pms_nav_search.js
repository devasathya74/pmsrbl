/**
 * PMS Universal Search & Dynamic Document Registry System
 * Police Modern School, 25th Bn PAC, Raebareli
 * 
 * Automatically indexes built-in pages AND dynamically captures all newly saved/created documents
 * from LocalStorage, Firestore, and custom registrations in real-time.
 */

(function () {
  // Built-in Static Portal Pages
  const staticPortalPages = [
    // --- National Events & Competitions ---
    {
      id: "gandhi_quiz_hi",
      title: "गांधी जयंती क्विज़ (50 प्रश्न - हिंदी)",
      category: "गांधी जयंती विशेष",
      desc: "50 बहुविकल्पीय प्रश्न + आधिकारिक उत्तर कुंजी + प्रिंट-रेडी A4",
      url: "gandhi_jayanti_quiz.html",
      icon: "fa-solid fa-graduation-cap",
      badge: "स्थायी पेज",
      keywords: "gandhi quiz hindi 50 questions mcq mahatma gandhi jayanti"
    },
    {
      id: "gandhi_quiz_en",
      title: "Gandhi Jayanti Quiz (50 MCQs - English)",
      category: "Gandhi Jayanti Special",
      desc: "50 English MCQs + Official Answer Key + Printable A4 Paper",
      url: "gandhi_jayanti_quiz_english.html",
      icon: "fa-solid fa-file-lines",
      badge: "स्थायी पेज",
      keywords: "gandhi quiz english 50 questions mcq mahatma gandhi jayanti english version"
    },
    {
      id: "gandhi_10_lines",
      title: "महात्मा गांधी - 10 Lines Essay (Worksheet)",
      category: "गांधी जयंती विशेष",
      desc: "10 पंक्तियों का निबंध (Bilingual English + Hindi)",
      url: "mahatma_gandhi_10_lines.html",
      icon: "fa-solid fa-feather-pointed",
      badge: "स्थायी पेज",
      keywords: "gandhi 10 lines essay mahatma gandhi worksheet speech"
    },
    {
      id: "gandhi_detailed_essay",
      title: "महात्मा गांधी - विस्तृत निबंध (Detailed Essay)",
      category: "गांधी जयंती विशेष",
      desc: "6 महत्वपूर्ण उप-शीर्षकों सहित विस्तृत निबंध व हिंदी अनुवाद",
      url: "mahatma_gandhi_detailed_essay.html",
      icon: "fa-solid fa-book-open",
      badge: "स्थायी पेज",
      keywords: "gandhi detailed essay mahatma gandhi comprehensive essay nibandh"
    },
    {
      id: "shastri_quiz",
      title: "लाल बहादुर शास्त्री क्विज़ (50 प्रश्न - रैंडमाइज़्ड उत्तर)",
      category: "शास्त्री जयंती विशेष",
      desc: "50 प्रश्न A/B/C/D संतुलित विकल्प + उत्तर कुंजी + A4 प्रिंट",
      url: "shastri_jayanti_quiz.html",
      icon: "fa-solid fa-flag",
      badge: "स्थायी पेज",
      keywords: "shastri quiz lal bahadur shastri 50 questions mcq jai jawan jai kisan"
    },
    {
      id: "shastri_10_lines",
      title: "लाल बहादुर शास्त्री - 10 Lines Essay (Worksheet)",
      category: "शास्त्री जयंती विशेष",
      desc: "10 पंक्तियों का निबंध (Bilingual English + Hindi)",
      url: "shastri_10_lines.html",
      icon: "fa-solid fa-pen-nib",
      badge: "स्थायी पेज",
      keywords: "shastri 10 lines essay lal bahadur shastri speech worksheet"
    },
    {
      id: "shastri_detailed_essay",
      title: "लाल बहादुर शास्त्री - विस्तृत निबंध (Detailed Essay)",
      category: "शास्त्री जयंती विशेष",
      desc: "7 मुख्य उप-शीर्षक (1965 युद्ध, सादगी, ताशकंद, विजय घाट)",
      url: "shastri_detailed_essay.html",
      icon: "fa-solid fa-award",
      badge: "स्थायी पेज",
      keywords: "shastri detailed essay lal bahadur shastri comprehensive essay nibandh"
    },

    // --- Official Letters & Reports ---
    {
      id: "letter_generator",
      title: "पुलिस मॉडर्न स्कूल - पत्र एवं प्रार्थना पत्र जनरेटर",
      category: "आधिकारिक पत्राचार",
      desc: "विभिन्न विषयों पर आधिकारिक पत्र, प्रार्थना पत्र व ड्राफ्टिंग",
      url: "pms_letter_generator.html",
      icon: "fa-solid fa-file-signature",
      badge: "स्थायी पेज",
      keywords: "letter generator patra prathna patra application drafting pms"
    },
    {
      id: "anupalan_akhya",
      title: "अनुपालन आख्या जनरेटर (Compliance Report)",
      category: "आधिकारिक पत्राचार",
      desc: "सेनानायक महोदय/उच्चाधिकारियों हेतु बिंदुवार अनुपालन आख्या",
      url: "anupalan-akhya.html",
      icon: "fa-solid fa-clipboard-check",
      badge: "स्थायी पेज",
      keywords: "anupalan akhya compliance report senanayak inspection report"
    },
    {
      id: "consent_form",
      title: "छात्र अभिभावक सहमति पत्र (Consent Form)",
      category: "आधिकारिक पत्राचार",
      desc: "शैक्षणिक भ्रमण, खेलकूद व विद्यालयी गतिविधियों हेतु सहमति पत्र",
      url: "consent_form.html",
      icon: "fa-solid fa-file-contract",
      badge: "स्थायी पेज",
      keywords: "consent form sahmati patra parent permission form"
    },
    {
      id: "bsnl_bill",
      title: "BSNL ब्रॉडबैंड बिल एवं वाउचर जनरेटर",
      category: "आधिकारिक पत्राचार",
      desc: "बीएसएनएल इंटरनेट बिल व विभागीय वाउचर निर्माण",
      url: "bsnl_bill.html",
      icon: "fa-solid fa-phone",
      badge: "स्थायी पेज",
      keywords: "bsnl bill internet broadband voucher payment"
    },

    // --- Registers & Administration ---
    {
      id: "fee_dashboard",
      title: "मुख्य डैशबोर्ड एवं डिजिटल फीस रजिस्टर",
      category: "विद्यालय प्रबंधन",
      desc: "विद्यार्थी रिकॉर्ड, फीस संकलन, रसीद जनरेशन एवं डैशबोर्ड",
      url: "index.html",
      icon: "fa-solid fa-chart-pie",
      badge: "स्थायी पेज",
      keywords: "index home dashboard fee register student fees receipts aone register"
    },
    {
      id: "attendance_transport",
      title: "दैनिक उपस्थिति व परिवहन पंजिका (Transport / Attendance)",
      category: "विद्यालय प्रबंधन",
      desc: "छात्र उपस्थिति, बस रूट ट्रैकिंग एवं मासिक समरी",
      url: "attendance.html",
      icon: "fa-solid fa-bus",
      badge: "स्थायी पेज",
      keywords: "attendance transport bus register daily presence"
    },
    {
      id: "medicine_stock",
      title: "PMS दवा एवं प्राथमिक उपचार स्टॉक रजिस्टर",
      category: "विद्यालय प्रबंधन",
      desc: "25वीं वाहिनी पीएसी चिकित्सालय से प्राप्त दवाओं का संधारण व वितरण",
      url: "medicine_stock_register.html",
      icon: "fa-solid fa-kit-medical",
      badge: "स्थायी पेज",
      keywords: "medicine stock register first aid dawa stock pac hospital"
    },
    {
      id: "staff_salary",
      title: "स्टाफ वेतन एवं मानदेय रजिस्टर (Staff Salary)",
      category: "विद्यालय प्रबंधन",
      desc: "अध्यापकों एवं कर्मचारियों का मासिक वेतन व मानदेय बिल पंजिका",
      url: "staff_salary.html",
      icon: "fa-solid fa-money-check-dollar",
      badge: "स्थायी पेज",
      keywords: "salary staff vatan mandey register accounts"
    },
    // --- Fee Data System (Session 2026-27) ---
    {
      id: "fee_portal_2026",
      title: "फीस प्रबंधन पोर्टल 2026-27 (Fee Management System - fee_data)",
      category: "फीस व वित्तीय पोर्टल",
      desc: "सत्र 2026-27 हेतु उन्नत फीस पोर्टल, बकाया सूची, ट्रांसपोर्ट एवं एनालिटिक्स",
      url: "fee_data/index.html",
      icon: "fa-solid fa-file-invoice",
      badge: "नया सत्र 2026-27",
      keywords: "fee data 2026 2027 fee management fees collection defaulters transport receipts fee_data"
    },
    {
      id: "fee_form_s02",
      title: "Form S02 - UDISE+ छात्र डेटा प्रविष्टि (fee_data)",
      category: "फीस व वित्तीय पोर्टल",
      desc: "यू-डायस प्लस छात्र सूचना एवं प्रोफाईल सत्यापन फॉर्म",
      url: "fee_data/form_s02.html",
      icon: "fa-solid fa-address-card",
      badge: "UDISE+ Studio",
      keywords: "form s02 udise student data entry fee_data"
    },
    {
      id: "fee_receipt_view",
      title: "डिजिटल फीस रसीद जनरेटर एवं व्यूअर (fee_data)",
      category: "फीस व वित्तीय पोर्टल",
      desc: "आधिकारिक कम्प्यूटरीकृत फीस रसीद व प्रिंट लेआउट",
      url: "fee_data/reciept.html",
      icon: "fa-solid fa-receipt",
      badge: "रसीद प्रणाली",
      keywords: "fee receipt print receipt format bill voucher fee_data"
    },

    // --- Academic & Design Modules ---
    {
      id: "science_question_bank",
      title: "कक्षा 6 विज्ञान प्रश्न बैंक (Science Question Bank)",
      category: "शैक्षणिक सामग्री",
      desc: "कक्षा 6 विज्ञान के सभी अध्यायों के बहुविकल्पीय व वर्णनात्मक प्रश्न",
      url: "class6_science_question_bank.html",
      icon: "fa-solid fa-flask-vial",
      badge: "स्थायी पेज",
      keywords: "class 6 science question bank vigyan prashn bank"
    },
    {
      id: "pac_signboard_3d",
      title: "25वीं वाहिनी PAC 3D साइनबोर्ड एवं डिस्प्ले डिज़ाइन",
      category: "वाहिनी साइनबोर्ड",
      desc: "25वीं वाहिनी पी.ए.सी. रायबरेली 3D साइनबोर्ड व वाल विज़ुअलाइज़ेशन",
      url: "pac_signboard_3d.html",
      icon: "fa-solid fa-palette",
      badge: "3D डिज़ाइन",
      keywords: "pac signboard 3d sign board front wall pac raebareli"
    },
    {
      id: "pac_front_signboard",
      title: "PAC मुख्य द्वार फ्रंट साइनबोर्ड स्पेसिफिकेशन",
      category: "वाहिनी साइनबोर्ड",
      desc: "मुख्य प्रवेश द्वार हेतु विस्तृत आयाम एवं सामग्री विवरण",
      url: "pac_front_signboard.html",
      icon: "fa-solid fa-shield-halved",
      badge: "साइनबोर्ड",
      keywords: "pac front signboard gate board layout"
    }
  ];

  // Dynamic Document Index Manager
  window.PMS_DOC_INDEX = {
    // Custom dynamically registered documents stored in LocalStorage
    getCustomDocs() {
      try {
        return JSON.parse(localStorage.getItem("PMS_DYNAMIC_SAVED_DOCS") || "[]");
      } catch (e) {
        return [];
      }
    },

    // Method to register any new document directly from code or forms
    registerDocument(doc) {
      if (!doc || !doc.title || !doc.url) return;
      const customDocs = this.getCustomDocs();
      const existingIdx = customDocs.findIndex(d => (d.id && d.id === doc.id) || (d.url === doc.url && d.title === doc.title));
      
      const entry = {
        id: doc.id || "doc_" + Date.now(),
        title: doc.title,
        category: doc.category || "नवीन सहेजा गया दस्तावेज़",
        desc: doc.desc || ("सहेजा गया दिनांक: " + (doc.date || new Date().toLocaleDateString('hi-IN'))),
        url: doc.url,
        icon: doc.icon || "fa-solid fa-file-lines",
        badge: "✨ नया सेव दस्तावेज़",
        date: doc.date || new Date().toISOString(),
        keywords: (doc.keywords || "") + " " + doc.title.toLowerCase()
      };

      if (existingIdx >= 0) {
        customDocs[existingIdx] = entry;
      } else {
        customDocs.unshift(entry);
      }

      localStorage.setItem("PMS_DYNAMIC_SAVED_DOCS", JSON.stringify(customDocs));
      window.dispatchEvent(new CustomEvent("pms:doc_registered", { detail: entry }));
      if (document.getElementById("pmsSearchModal") && document.getElementById("pmsSearchModal").style.display === "flex") {
        renderResults(document.getElementById("pmsSearchInputField").value);
      }
    },

    // Automatically scan known localStorage keys across the portal to extract saved items
    scanAndSyncSavedDocs() {
      const detected = [];

      // 1. Scan Saved Letters
      try {
        const letterDraft = localStorage.getItem("pms_letter_draft");
        if (letterDraft) {
          const l = JSON.parse(letterDraft);
          if (l.subject) {
            detected.push({
              id: "saved_letter_active",
              title: `पत्र: ${l.subject.substring(0, 45)}...`,
              category: "सहेजे गए पत्र (Letters)",
              desc: `पत्रांक: ${l.refNo || 'पीएमएस'} | दिनांक: ${l.date || 'हालिया'}`,
              url: "pms_letter_generator.html",
              icon: "fa-solid fa-envelope-open-text",
              badge: "सहेजा गया पत्र",
              keywords: `letter saved draft ${l.subject} ${l.refNo || ''}`
            });
          }
        }
      } catch (e) {}

      // 2. Scan Saved BSNL Invoices / Drafts
      try {
        const bsnlDraft = localStorage.getItem("bsnl_bill_draft");
        if (bsnlDraft) {
          const b = JSON.parse(bsnlDraft);
          if (b.invoiceNo || b.customerName) {
            detected.push({
              id: "saved_bsnl_active",
              title: `BSNL बिल: ${b.invoiceNo || 'इनवॉइस'} (${b.customerName || 'PMS'})`,
              category: "सहेजे गए बिल (BSNL)",
              desc: `अवधि: ${b.usagePeriod || 'हालिया'} | धनराशि: ₹${b.totalAmount || '0'}`,
              url: "bsnl_bill.html",
              icon: "fa-solid fa-file-invoice-dollar",
              badge: "सहेजा गया बिल",
              keywords: `bsnl bill invoice ${b.invoiceNo} ${b.customerName}`
            });
          }
        }
      } catch (e) {}

      // 3. Scan Saved Consent Forms
      try {
        const consentDraft = localStorage.getItem("pms_consent_draft");
        if (consentDraft) {
          const c = JSON.parse(consentDraft);
          if (c.studentName) {
            detected.push({
              id: "saved_consent_active",
              title: `सहमति पत्र: ${c.studentName} (${c.className || 'कक्षा'})`,
              category: "सहेजे गए सहमति पत्र",
              desc: `पिता: श्री ${c.fatherName || '-'} | दिनांक: ${c.date || 'हालिया'}`,
              url: "consent_form.html",
              icon: "fa-solid fa-user-check",
              badge: "सहेजा गया सहमति पत्र",
              keywords: `consent form ${c.studentName} ${c.fatherName}`
            });
          }
        }
      } catch (e) {}

      // 4. Scan Saved Salary Sheets
      try {
        const salaryCurrent = localStorage.getItem("pms_staff_salary_current");
        if (salaryCurrent) {
          const s = JSON.parse(salaryCurrent);
          if (s.monthYear || s.title) {
            detected.push({
              id: "saved_salary_active",
              title: `वेतन शीट: ${s.monthYear || s.title || 'मासिक बिल'}`,
              category: "सहेजे गए वेतन रिकॉर्ड",
              desc: `स्टाफ सदस्य: ${(s.rows && s.rows.length) || 0} | कुल मानदेय: ₹${s.grandTotal || '0'}`,
              url: "staff_salary.html",
              icon: "fa-solid fa-receipt",
              badge: "सहेजी गई शीट",
              keywords: `salary sheet ${s.monthYear}`
            });
          }
        }
      } catch (e) {}

      // Merge scanned items into dynamic docs registry
      detected.forEach(item => {
        this.registerDocument(item);
      });
    },

    // Retrieve all documents combined (Static + Scanned + Custom Registered)
    getAllDocuments() {
      const custom = this.getCustomDocs();
      const combined = [...staticPortalPages];

      custom.forEach(c => {
        if (!combined.some(item => item.id === c.id)) {
          combined.push(c);
        }
      });

      return combined;
    }
  };

  // Inject CSS Styles for Universal Search
  const searchStyles = document.createElement("style");
  searchStyles.id = "pms-search-styles";
  searchStyles.innerHTML = `
    .pms-search-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(6px);
      z-index: 99999;
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding: 40px 16px 20px 16px;
      animation: pmsFadeIn 0.2s ease-out;
    }
    .pms-search-box {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      width: 100%;
      max-width: 720px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 85vh;
      color: #f8fafc;
      font-family: 'Inter', 'Noto Sans Devanagari', sans-serif;
    }
    .pms-search-header {
      padding: 14px 18px;
      border-bottom: 1px solid #334155;
      display: flex;
      align-items: center;
      gap: 12px;
      background: #0f172a;
    }
    .pms-search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 15px;
      font-weight: 500;
    }
    .pms-search-input::placeholder {
      color: #94a3b8;
    }
    .pms-filter-tabs {
      display: flex;
      gap: 6px;
      padding: 8px 14px;
      background: #1e293b;
      border-bottom: 1px solid #334155;
      overflow-x: auto;
    }
    .pms-filter-btn {
      background: #334155;
      color: #cbd5e1;
      border: none;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .pms-filter-btn:hover, .pms-filter-btn.active {
      background: #0284c7;
      color: #ffffff;
    }
    .pms-search-results {
      padding: 12px;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pms-result-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      background: #334155;
      border: 1px solid #475569;
      text-decoration: none;
      color: #f8fafc;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .pms-result-card:hover, .pms-result-card.active {
      background: #475569;
      border-color: #38bdf8;
      transform: translateX(4px);
    }
    .pms-result-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: #38bdf8;
      flex-shrink: 0;
    }
    .pms-result-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
    }
    .pms-result-category {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #f59e0b;
    }
    .pms-result-badge {
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      background: #064e3b;
      color: #34d399;
      border: 1px solid #059669;
    }
    .pms-result-title {
      font-size: 13.5px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.3;
    }
    .pms-result-desc {
      font-size: 11px;
      color: #cbd5e1;
      margin-top: 1.5px;
    }
    .pms-search-footer {
      padding: 10px 16px;
      background: #0f172a;
      border-top: 1px solid #334155;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
    .pms-floating-search-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 9999px;
      padding: 9px 16px;
      box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      font-weight: 700;
      z-index: 9998;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
    }
    .pms-floating-search-btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.7);
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }
    .pms-add-doc-panel {
      padding: 12px 16px;
      background: #0f172a;
      border-top: 1px solid #334155;
      display: none;
    }
    @keyframes pmsFadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media print {
      .pms-search-modal-overlay, .pms-floating-search-btn {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(searchStyles);

  // Inject Search Modal HTML
  const modalHTML = `
    <div class="pms-search-modal-overlay" id="pmsSearchModal">
      <div class="pms-search-box">
        
        <!-- Header -->
        <div class="pms-search-header">
          <i class="fa-solid fa-magnifying-glass text-sky-400 text-lg"></i>
          <input type="text" id="pmsSearchInputField" class="pms-search-input" placeholder="दस्तावेज़ या पेज खोजें... (उदा: गांधी क्विज़, शास्त्री निबंध, पत्र, सहमति, BSNL, वेतन)..." autocomplete="off" />
          <button onclick="window.togglePmsAddDocForm()" class="text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-500 flex items-center gap-1 transition">
            <i class="fa-solid fa-plus"></i> नया जोड़ें
          </button>
          <button onclick="window.closePmsSearch()" class="text-slate-400 hover:text-white px-2 py-1 text-xs bg-slate-800 rounded border border-slate-700">
            Esc
          </button>
        </div>

        <!-- Filter Category Tabs -->
        <div class="pms-filter-tabs" id="pmsFilterTabsBar">
          <button class="pms-filter-btn active" onclick="window.filterPmsCategory('ALL')">🌟 सभी दस्तावेज़ (<span id="pmsTotalDocCount">0</span>)</button>
          <button class="pms-filter-btn" onclick="window.filterPmsCategory('JAYANTI')">🇮🇳 2 अक्टूबर जयंती</button>
          <button class="pms-filter-btn" onclick="window.filterPmsCategory('SAVED')">💾 हालिया सहेजे गए</button>
          <button class="pms-filter-btn" onclick="window.filterPmsCategory('LETTERS')">📑 पत्र व फॉर्म</button>
          <button class="pms-filter-btn" onclick="window.filterPmsCategory('REGISTERS')">🏫 रजिस्टर व प्रबंधन</button>
        </div>

        <!-- Add Custom Doc Panel -->
        <div class="pms-add-doc-panel" id="pmsAddDocPanel">
          <div style="font-weight:700;font-size:12px;color:#38bdf8;margin-bottom:8px;display:flex;justify-content:space-between;">
            <span>➕ नया कस्टम दस्तावेज़ / पेज सर्च लिस्ट में जोड़ें:</span>
            <button onclick="window.togglePmsAddDocForm()" style="background:none;border:none;color:#94a3b8;cursor:pointer;">✕</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <input type="text" id="newDocTitle" placeholder="दस्तावेज़ का शीर्षक (Title)" style="background:#1e293b;border:1px solid #475569;padding:6px 10px;border-radius:6px;color:#fff;font-size:12px;" />
            <input type="text" id="newDocUrl" placeholder="फ़ाइल का नाम या URL (e.g. my_doc.html)" style="background:#1e293b;border:1px solid #475569;padding:6px 10px;border-radius:6px;color:#fff;font-size:12px;" />
            <input type="text" id="newDocCategory" placeholder="श्रेणी (Category e.g. आधिकारिक पत्राचार)" style="background:#1e293b;border:1px solid #475569;padding:6px 10px;border-radius:6px;color:#fff;font-size:12px;" />
            <input type="text" id="newDocDesc" placeholder="संक्षिप्त विवरण (Short Description)" style="background:#1e293b;border:1px solid #475569;padding:6px 10px;border-radius:6px;color:#fff;font-size:12px;" />
          </div>
          <div style="margin-top:8px;text-align:right;">
            <button onclick="window.savePmsCustomDoc()" style="background:#10b981;color:#fff;border:none;padding:5px 14px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;">
              ✓ लिस्ट में सेव करें
            </button>
          </div>
        </div>

        <!-- Search Results List -->
        <div class="pms-search-results" id="pmsSearchResultsContainer">
          <!-- Results rendered dynamically -->
        </div>

        <!-- Footer -->
        <div class="pms-search-footer">
          <div><i class="fa-regular fa-keyboard mr-1"></i> <b>↑ / ↓</b> नेविगेट करें | <b>Enter</b> खोलें | <b>Esc</b> बंद करें</div>
          <div class="font-semibold text-slate-400">पुलिस मॉडर्न स्कूल, रायबरेली</div>
        </div>
      </div>
    </div>

    <!-- Floating Global Search Button -->
    <button class="pms-floating-search-btn no-print" onclick="window.openPmsSearch()" title="Search & Quick Navigate (Ctrl + K)">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>दस्तावेज़ खोजें (Ctrl+K)</span>
    </button>
  `;

  const container = document.createElement("div");
  container.id = "pms-universal-nav-container";
  container.innerHTML = modalHTML;
  document.body.appendChild(container);

  let currentCategoryFilter = "ALL";

  // Modal Open / Close Functions
  window.openPmsSearch = function () {
    window.PMS_DOC_INDEX.scanAndSyncSavedDocs();
    const modal = document.getElementById("pmsSearchModal");
    const input = document.getElementById("pmsSearchInputField");
    if (modal) {
      modal.style.display = "flex";
      input.value = "";
      currentCategoryFilter = "ALL";
      updateCategoryTabsUI();
      renderResults("");
      setTimeout(() => input.focus(), 50);
    }
  };

  window.closePmsSearch = function () {
    const modal = document.getElementById("pmsSearchModal");
    if (modal) modal.style.display = "none";
  };

  window.filterPmsCategory = function (cat) {
    currentCategoryFilter = cat;
    updateCategoryTabsUI();
    const query = document.getElementById("pmsSearchInputField").value;
    renderResults(query);
  };

  function updateCategoryTabsUI() {
    const btns = document.querySelectorAll(".pms-filter-btn");
    btns.forEach(btn => {
      const onclickAttr = btn.getAttribute("onclick") || "";
      if (onclickAttr.includes(currentCategoryFilter)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  window.togglePmsAddDocForm = function () {
    const panel = document.getElementById("pmsAddDocPanel");
    if (panel) {
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    }
  };

  window.savePmsCustomDoc = function () {
    const title = document.getElementById("newDocTitle").value.trim();
    const url = document.getElementById("newDocUrl").value.trim();
    const category = document.getElementById("newDocCategory").value.trim() || "कस्टम दस्तावेज़";
    const desc = document.getElementById("newDocDesc").value.trim() || "उपयोगकर्ता द्वारा जोड़ा गया दस्तावेज़";

    if (!title || !url) {
      alert("कृपया शीर्षक (Title) और फ़ाइल नाम/URL दोनों दर्ज करें।");
      return;
    }

    window.PMS_DOC_INDEX.registerDocument({
      title,
      url,
      category,
      desc,
      icon: "fa-solid fa-file-circle-plus"
    });

    document.getElementById("newDocTitle").value = "";
    document.getElementById("newDocUrl").value = "";
    document.getElementById("newDocCategory").value = "";
    document.getElementById("newDocDesc").value = "";
    window.togglePmsAddDocForm();
    renderResults(document.getElementById("pmsSearchInputField").value);
  };

  function renderResults(query) {
    const resultsContainer = document.getElementById("pmsSearchResultsContainer");
    const countEl = document.getElementById("pmsTotalDocCount");
    const allDocs = window.PMS_DOC_INDEX.getAllDocuments();
    if (countEl) countEl.innerText = allDocs.length;

    const q = (query || "").trim().toLowerCase();
    
    let filtered = allDocs;

    // Filter by Tab
    if (currentCategoryFilter === "JAYANTI") {
      filtered = filtered.filter(d => d.category.includes("जयंती") || d.category.includes("Jayanti"));
    } else if (currentCategoryFilter === "SAVED") {
      filtered = filtered.filter(d => d.badge.includes("सहेजा") || d.badge.includes("नया"));
    } else if (currentCategoryFilter === "LETTERS") {
      filtered = filtered.filter(d => d.category.includes("पत्राचार") || d.category.includes("पत्र") || d.category.includes("सहमति") || d.category.includes("बिल"));
    } else if (currentCategoryFilter === "REGISTERS") {
      filtered = filtered.filter(d => d.category.includes("प्रबंधन") || d.category.includes("रजिस्टर") || d.category.includes("वेतन"));
    }

    // Filter by Query
    if (q) {
      filtered = filtered.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          (item.keywords && item.keywords.toLowerCase().includes(q))
        );
      });
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 20px; color: #94a3b8;">
          <i class="fa-regular fa-folder-open text-3xl mb-2 text-slate-500"></i>
          <p class="text-sm font-semibold">कोई दस्तावेज़ नहीं मिला "${query}"</p>
          <p class="text-xs text-slate-400 mt-1">अन्य शब्द से खोजें या ऊपर '+ नया जोड़ें' बटन से नया दस्तावेज़ जोड़ें।</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map((item, idx) => `
      <a href="${item.url}" class="pms-result-card ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        <div class="pms-result-icon">
          <i class="${item.icon || 'fa-solid fa-file'}"></i>
        </div>
        <div style="flex:1">
          <div class="pms-result-top">
            <span class="pms-result-category">${item.category}</span>
            <span class="pms-result-badge">${item.badge || 'उपलब्ध'}</span>
          </div>
          <div class="pms-result-title">${item.title}</div>
          <div class="pms-result-desc">${item.desc}</div>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-slate-400 text-xs"></i>
      </a>
    `).join("");
  }

  // Event Listeners for Search Input
  const inputEl = document.getElementById("pmsSearchInputField");
  if (inputEl) {
    inputEl.addEventListener("input", (e) => {
      renderResults(e.target.value);
    });

    inputEl.addEventListener("keydown", (e) => {
      const cards = document.querySelectorAll(".pms-result-card");
      if (cards.length === 0) return;

      let activeIdx = -1;
      cards.forEach((c, idx) => {
        if (c.classList.contains("active")) activeIdx = idx;
      });

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (activeIdx >= 0) cards[activeIdx].classList.remove("active");
        activeIdx = (activeIdx + 1) % cards.length;
        cards[activeIdx].classList.add("active");
        cards[activeIdx].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeIdx >= 0) cards[activeIdx].classList.remove("active");
        activeIdx = (activeIdx - 1 + cards.length) % cards.length;
        cards[activeIdx].classList.add("active");
        cards[activeIdx].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIdx >= 0 && cards[activeIdx]) {
          cards[activeIdx].click();
        }
      }
    });
  }

  // Keyboard Shortcuts: Ctrl+K / Cmd+K and Esc
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      window.openPmsSearch();
    } else if (e.key === "Escape") {
      window.closePmsSearch();
    }
  });

  // Close on Backdrop Click
  const modalEl = document.getElementById("pmsSearchModal");
  if (modalEl) {
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) {
        window.closePmsSearch();
      }
    });
  }

  // Auto-scan on boot and whenever storage changes
  window.addEventListener("DOMContentLoaded", () => {
    window.PMS_DOC_INDEX.scanAndSyncSavedDocs();
  });

  window.addEventListener("storage", () => {
    window.PMS_DOC_INDEX.scanAndSyncSavedDocs();
  });

  window.addEventListener("pms:doc_registered", () => {
    if (document.getElementById("pmsSearchModal") && document.getElementById("pmsSearchModal").style.display === "flex") {
      renderResults(document.getElementById("pmsSearchInputField").value);
    }
  });

})();
