# Python script to build the full interactive khel_record_editor.html
import json

with open(r'c:\Users\pmsrbl\Desktop\pmsrbl\initial_table_rows.json', 'r', encoding='utf-8') as f:
    table_rows = json.load(f)

# Convert initial rows into JSON string to embed in JavaScript
initial_rows_json = json.dumps(table_rows, ensure_ascii=False)

html_template = '''<!DOCTYPE html>
<html lang="hi" class="h-full bg-slate-900">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>वामा खेलोत्सव 2026 - खेल रिकॉर्ड संपादक (MS Office Style Table Editor)</title>
  <link rel="icon" type="image/png" href="pac_logo.png">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet">

  <!-- Font Awesome 6.5.1 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <!-- SheetJS for Excel Export -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            pac: {
              50: '#f0f9ff',
              100: '#e0f2fe',
              500: '#0284c7',
              600: '#0369a1',
              700: '#075985',
              800: '#0c4a6e',
              900: '#082f49',
              950: '#031726'
            }
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            devanagari: ['Noto Sans Devanagari', 'Mangal', 'Segoe UI', 'sans-serif'],
            heading: ['Outfit', 'Noto Sans Devanagari', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    }
  </script>

  <style>
    :root {
      --app-font: 'Noto Sans Devanagari', 'Mangal', 'Segoe UI', sans-serif;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: var(--app-font);
      background-color: #0b1329;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }

    /* Print Specific Styling (A4 Landscape) */
    @page {
      size: A4 landscape;
      margin: 8mm 6mm 8mm 6mm;
    }

    @media print {
      body {
        background-color: #ffffff !important;
        color: #000000 !important;
        font-size: 11pt;
      }

      .no-print {
        display: none !important;
      }

      .print-page-wrapper {
        box-shadow: none !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100% !important;
        width: 100% !important;
        background: transparent !important;
      }

      .khel-table-container {
        overflow: visible !important;
      }

      #mainDataTable {
        width: 100% !important;
        border-collapse: collapse !important;
        border: 1.5px solid #000000 !important;
      }

      #mainDataTable th,
      #mainDataTable td {
        border: 1px solid #000000 !important;
        color: #000000 !important;
        background-color: transparent !important;
        padding: 4px 6px !important;
        font-size: 10pt !important;
        page-break-inside: avoid !important;
      }

      #mainDataTable thead {
        display: table-header-group !important;
      }

      #mainDataTable tr {
        page-break-inside: avoid !important;
      }

      .print-badge {
        border: 1px solid #333 !important;
        padding: 1px 4px !important;
        border-radius: 3px !important;
        font-size: 8.5pt !important;
      }
    }

    /* Custom Table Styling */
    .khel-table {
      width: 100%;
      border-collapse: collapse;
      background-color: #ffffff;
      font-size: 13px;
      user-select: text;
    }

    .khel-table th,
    .khel-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: center;
      vertical-align: middle;
      position: relative;
      transition: background-color 0.1s ease;
    }

    .khel-table th {
      background-color: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
      white-space: pre-wrap;
      user-select: none;
    }

    /* Cell Focus & Selection States */
    .khel-table td:focus {
      outline: 2px solid #0284c7 !important;
      background-color: #f0fdf4;
      z-index: 20;
    }

    .cell-selected {
      background-color: #bae6fd !important;
      outline: 1.5px solid #0284c7 !important;
      z-index: 10;
    }

    .cell-active-anchor {
      outline: 2px solid #0369a1 !important;
      background-color: #e0f2fe !important;
      z-index: 25;
    }

    /* Floating Quick Bar */
    .table-quick-bar {
      position: fixed;
      z-index: 9998;
      display: none;
      align-items: center;
      gap: 4px;
      padding: 5px 9px;
      background: rgba(15, 23, 42, 0.96);
      border: 1px solid #38bdf8;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.3);
      backdrop-filter: blur(12px);
      pointer-events: auto;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.15s ease, transform 0.15s ease;
    }

    .table-quick-bar.visible {
      display: flex !important;
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .table-quick-bar button {
      background: #1e293b;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      height: 26px;
      transition: all 0.15s;
    }

    .table-quick-bar button:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      transform: translateY(-1px);
    }

    .table-quick-bar button.btn-danger:hover {
      background: #dc2626;
      border-color: #ef4444;
    }

    /* Context Menu */
    .custom-context-menu {
      position: fixed;
      z-index: 9999;
      display: none;
      min-width: 210px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 6px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.65), 0 0 15px rgba(56, 189, 248, 0.2);
      backdrop-filter: blur(16px);
      user-select: none;
    }

    .custom-context-menu.visible {
      display: block;
    }

    .ctx-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      font-size: 12px;
      color: #e2e8f0;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.12s;
    }

    .ctx-item:hover {
      background: #0284c7;
      color: #ffffff;
    }

    .ctx-item.disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    .ctx-divider {
      height: 1px;
      background: #1e293b;
      margin: 4px 0;
    }

    /* Custom Ribbon Tabs */
    .ribbon-tab-btn {
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 8px 8px 0 0;
      color: #94a3b8;
      transition: all 0.15s;
      border-bottom: 2px solid transparent;
      cursor: pointer;
    }

    .ribbon-tab-btn.active {
      color: #38bdf8;
      background: #1e293b;
      border-bottom-color: #38bdf8;
    }

    .ribbon-tab-content {
      display: none;
    }

    .ribbon-tab-content.active {
      display: flex;
    }

    /* Custom Scrollbars */
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    ::-webkit-scrollbar-track {
      background: #0f172a;
    }

    ::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #0284c7;
    }
  </style>
</head>

<body class="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">

  <!-- ================= TOP HEADER BAR ================= -->
  <header class="no-print bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
    <div class="flex items-center gap-3">
      <img src="pac_logo.png" alt="PAC" class="w-9 h-9 object-contain drop-shadow" onerror="this.style.display='none'">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-sm font-bold text-white tracking-wide">वामा खेलोत्सव 2026 — खेल रिकॉर्ड संपादक</h1>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            MS Office Table Suite
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
            विजेता + उपविजेता
          </span>
        </div>
        <p class="text-[11px] text-slate-400">25वीं वाहिनी पीएसी, रायबरेली • अनाधिकारिक/बाह्य सूची (पद व PNO रहित)</p>
      </div>
    </div>

    <!-- Right Header Utilities -->
    <div class="flex items-center gap-2">
      <!-- Auto-save Status Badge -->
      <div id="saveStatusBadge" class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-xs text-slate-300 border border-slate-700">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span id="saveStatusText" class="text-[11px] font-mono">स्वतः सुरक्षित</span>
      </div>

      <!-- Quick Action Buttons -->
      <button onclick="saveToLocalStorage(true)"
        class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
        title="ड्राफ्ट सुरक्षित करें (Ctrl+S)">
        <i class="fa-solid fa-floppy-disk text-sky-400"></i>
        <span class="hidden md:inline">सेव</span>
      </button>

      <button onclick="exportToExcel()"
        class="px-2.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold border border-emerald-500/40 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
        title="Microsoft Excel (.xlsx) में डाउनलोड करें">
        <i class="fa-solid fa-file-excel"></i>
        <span>Excel</span>
      </button>

      <button onclick="exportToWord()"
        class="px-2.5 py-1.5 bg-blue-700/80 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold border border-blue-500/40 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
        title="Microsoft Word (.doc) में डाउनलोड करें">
        <i class="fa-solid fa-file-word"></i>
        <span>Word</span>
      </button>

      <button onclick="prepareAndPrint()"
        class="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold border border-sky-400/50 flex items-center gap-1.5 transition cursor-pointer shadow-md"
        title="A4 लैंडस्केप प्रिंट / PDF सेव करें">
        <i class="fa-solid fa-print"></i>
        <span>प्रिंट / PDF</span>
      </button>
    </div>
  </header>

  <!-- ================= MS OFFICE STYLE RIBBON TOOLBAR ================= -->
  <div class="no-print bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 sticky top-[57px] z-40 backdrop-blur-md">
    
    <!-- Ribbon Tabs Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-1">
      <div class="flex items-center gap-1">
        <button onclick="switchRibbonTab('table')" id="tabBtn_table" class="ribbon-tab-btn active">
          <i class="fa-solid fa-table mr-1 text-sky-400"></i>तालिका एवं पंक्तियाँ (Table)
        </button>
        <button onclick="switchRibbonTab('merge')" id="tabBtn_merge" class="ribbon-tab-btn">
          <i class="fa-solid fa-object-group mr-1 text-amber-400"></i>मर्ज एवं अनमर्ज (Merge & Split)
        </button>
        <button onclick="switchRibbonTab('format')" id="tabBtn_format" class="ribbon-tab-btn">
          <i class="fa-solid fa-font mr-1 text-purple-400"></i>टेक्स्ट एवं फॉर्मेटिंग (Format)
        </button>
        <button onclick="switchRibbonTab('columns')" id="tabBtn_columns" class="ribbon-tab-btn">
          <i class="fa-solid fa-sliders mr-1 text-emerald-400"></i>कॉलम प्रबंधन (Columns)
        </button>
      </div>

      <!-- Selected Cells Indicator -->
      <div id="selectionBadge" class="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-md border border-slate-800">
        <span>चयनित: <b id="selectedCellsCount" class="text-sky-300">0</b> सेल</span>
      </div>
    </div>

    <!-- Ribbon Tab 1: Table & Rows -->
    <div id="tabContent_table" class="ribbon-tab-content active items-center gap-2 py-2 flex-wrap text-xs">
      
      <!-- Row Controls -->
      <div class="flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
        <span class="text-[10px] font-bold text-sky-400 px-1 uppercase tracking-wider">पंक्ति:</span>
        <button onclick="insertRowAbove()" class="px-2 py-1 bg-slate-900 hover:bg-sky-600 text-sky-200 hover:text-white rounded border border-slate-700 flex items-center gap-1 cursor-pointer" title="ऊपर नई पंक्ति जोड़ें">
          <i class="fa-solid fa-arrow-up text-[10px]"></i> ऊपर जोड़ें
        </button>
        <button onclick="insertRowBelow()" class="px-2 py-1 bg-slate-900 hover:bg-sky-600 text-sky-200 hover:text-white rounded border border-slate-700 flex items-center gap-1 cursor-pointer" title="नीचे नई पंक्ति जोड़ें">
          <i class="fa-solid fa-arrow-down text-[10px]"></i> नीचे जोड़ें
        </button>
        <button onclick="insertWinnerRow()" class="px-2 py-1 bg-emerald-950/70 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded border border-emerald-800/60 flex items-center gap-1 cursor-pointer font-bold" title="विजेता (1st) पंक्ति जोड़ें">
          <i class="fa-solid fa-medal text-amber-300"></i> +विजेता
        </button>
        <button onclick="insertRunnerUpRow()" class="px-2 py-1 bg-sky-950/70 hover:bg-sky-600 text-sky-300 hover:text-white rounded border border-sky-800/60 flex items-center gap-1 cursor-pointer font-bold" title="उपविजेता (2nd) पंक्ति जोड़ें">
          <i class="fa-solid fa-award text-slate-300"></i> +उपविजेता
        </button>
        <button onclick="duplicateCurrentRow()" class="px-2 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 flex items-center gap-1 cursor-pointer" title="पंक्ति डुप्लीकेट करें">
          <i class="fa-regular fa-copy text-[10px]"></i> डुप्लीकेट
        </button>
        <button onclick="deleteCurrentRow()" class="px-2 py-1 bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-800/60 flex items-center gap-1 cursor-pointer" title="चयनित पंक्ति हटाएं">
          <i class="fa-solid fa-trash-can text-[10px]"></i> हटाएं
        </button>
      </div>

      <!-- Column Controls -->
      <div class="flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
        <span class="text-[10px] font-bold text-emerald-400 px-1 uppercase tracking-wider">कॉलम:</span>
        <button onclick="insertColLeft()" class="px-2 py-1 bg-slate-900 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded border border-slate-700 flex items-center gap-1 cursor-pointer" title="बाएँ नया कॉलम जोड़ें">
          <i class="fa-solid fa-arrow-left text-[10px]"></i> बाएं
        </button>
        <button onclick="insertColRight()" class="px-2 py-1 bg-slate-900 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded border border-slate-700 flex items-center gap-1 cursor-pointer" title="दाएँ नया कॉलम जोड़ें">
          <i class="fa-solid fa-arrow-right text-[10px]"></i> दाएं
        </button>
        <button onclick="deleteCurrentCol()" class="px-2 py-1 bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-800/60 flex items-center gap-1 cursor-pointer" title="चयनित कॉलम हटाएं">
          <i class="fa-solid fa-trash-can text-[10px]"></i> हटाएं
        </button>
      </div>

      <!-- Table Utilities -->
      <div class="flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
        <button onclick="autoRenumberRows()" class="px-2.5 py-1 bg-amber-950/60 hover:bg-amber-600 text-amber-200 hover:text-white rounded border border-amber-800/60 font-semibold flex items-center gap-1.5 cursor-pointer" title="क्र०सं० को 1, 2, 3... अनुसार स्वतः सही करें">
          <i class="fa-solid fa-arrow-down-1-9"></i> 1, 2, 3... सही करें
        </button>
        <button onclick="toggleAllUpvijetaRows()" id="btnToggleUpvijeta" class="px-2.5 py-1 bg-slate-900 hover:bg-sky-600 text-sky-200 hover:text-white rounded border border-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer" title="सभी उपविजेता पंक्तियाँ दिखाएं/छिपाएं">
          <i class="fa-solid fa-users"></i> उपविजेता पंक्तियाँ
        </button>
      </div>

    </div>

    <!-- Ribbon Tab 2: Merge & Split -->
    <div id="tabContent_merge" class="ribbon-tab-content items-center gap-2 py-2 flex-wrap text-xs">
      <div class="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
        <span class="text-[10px] font-bold text-amber-400 px-1 uppercase tracking-wider">मर्ज उपकरण:</span>
        
        <!-- Merge Cells Button -->
        <button id="btnMergeCells" onclick="mergeSelectedCells()"
          class="px-3 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:hover:bg-amber-600 text-white rounded font-bold flex items-center gap-1.5 cursor-pointer transition shadow-sm"
          title="चयनित सेलों को एक में मर्ज करें (Alt+M)">
          <i class="fa-solid fa-object-group"></i> सेल मर्ज करें (Merge)
        </button>

        <!-- Unmerge Cells Button -->
        <button id="btnUnmergeCells" onclick="unmergeSelectedCell()"
          class="px-3 py-1 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:hover:bg-sky-600 text-white rounded font-bold flex items-center gap-1.5 cursor-pointer transition shadow-sm"
          title="मर्ज किए गए सेल को पुनः सामान्य सेलों में विभाजित करें (Alt+U)">
          <i class="fa-solid fa-object-ungroup"></i> सेल अनमर्ज करें (Unmerge)
        </button>
      </div>

      <div class="flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
        <span class="text-[10px] font-bold text-sky-400 px-1 uppercase tracking-wider">सेल विभाजन (Split):</span>
        <button onclick="splitCellHorizontal()" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-1 cursor-pointer" title="सेल को 2 कॉलम में बाँटें">
          <i class="fa-solid fa-table-columns"></i> 2 कॉलम में बाँटें
        </button>
        <button onclick="splitCellVertical()" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-1 cursor-pointer" title="सेल को 2 पंक्तियों में बाँटें">
          <i class="fa-solid fa-table-cells-large"></i> 2 पंक्तियों में बाँटें
        </button>
      </div>

      <div class="text-[11px] text-slate-400 hidden xl:flex items-center gap-1 px-2">
        <i class="fa-solid fa-circle-info text-amber-400"></i>
        <span>टिप: सेलों को चुनने के लिए माउस ड्रैग करें, या Shift+Click करें, फिर 'सेल मर्ज करें' दबाएं।</span>
      </div>
    </div>

    <!-- Ribbon Tab 3: Format & Style -->
    <div id="tabContent_format" class="ribbon-tab-content items-center gap-2 py-2 flex-wrap text-xs">
      
      <!-- Undo / Redo -->
      <div class="flex items-center gap-0.5 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
        <button onclick="undo()" class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer" title="पूर्ववत (Ctrl+Z)">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
        <button onclick="redo()" class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer" title="दोहराएँ (Ctrl+Y)">
          <i class="fa-solid fa-rotate-right"></i>
        </button>
      </div>

      <!-- Font Family -->
      <div class="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
        <select id="ribbonFontFamily" onchange="applyFontFamily(this.value)" class="bg-slate-900 text-amber-300 border border-slate-700 rounded px-2 py-1 text-xs focus:outline-none cursor-pointer">
          <option value="Noto Sans Devanagari" selected>नोटो संस (Noto Sans)</option>
          <option value="Mangal">मंगल (Mangal)</option>
          <option value="Inter">इंटर (Inter)</option>
          <option value="Outfit">आउटफिट (Outfit)</option>
        </select>

        <!-- Font Size -->
        <div class="flex items-center bg-slate-900 rounded border border-slate-700">
          <button onclick="changeFontSize(-1)" class="px-1.5 py-0.5 text-slate-300 hover:text-white hover:bg-slate-800 font-bold cursor-pointer" title="छोटा करें">A−</button>
          <span id="fontSizeDisplay" class="px-2 text-[11px] font-mono text-amber-300 font-bold select-none">13px</span>
          <button onclick="changeFontSize(1)" class="px-1.5 py-0.5 text-slate-300 hover:text-white hover:bg-slate-800 font-bold cursor-pointer" title="बड़ा करें">A+</button>
        </div>
      </div>

      <!-- Character Styles -->
      <div class="flex items-center gap-0.5 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
        <button onclick="execFormat('bold')" class="w-7 h-6 flex items-center justify-center font-bold text-slate-200 hover:text-white hover:bg-slate-800 rounded cursor-pointer" title="बोल्ड (Ctrl+B)"><b>B</b></button>
        <button onclick="execFormat('italic')" class="w-7 h-6 flex items-center justify-center font-serif italic text-slate-200 hover:text-white hover:bg-slate-800 rounded cursor-pointer" title="इटैलिक (Ctrl+I)"><i>I</i></button>
        <button onclick="execFormat('underline')" class="w-7 h-6 flex items-center justify-center underline text-slate-200 hover:text-white hover:bg-slate-800 rounded cursor-pointer" title="अंडरलाइन (Ctrl+U)"><u>U</u></button>
        
        <!-- Cell Color Palette -->
        <div class="w-px h-4 bg-slate-700 mx-1"></div>
        <span class="text-[10px] text-slate-400">रंग:</span>
        <button onclick="applyCellBg('#ffffff')" class="w-5 h-5 rounded-full bg-white border border-slate-400 cursor-pointer" title="सफेद"></button>
        <button onclick="applyCellBg('#fef08a')" class="w-5 h-5 rounded-full bg-yellow-200 border border-yellow-400 cursor-pointer" title="पीला हाईलाइट"></button>
        <button onclick="applyCellBg('#bbf7d0')" class="w-5 h-5 rounded-full bg-green-200 border border-green-400 cursor-pointer" title="हल्का हरा"></button>
        <button onclick="applyCellBg('#bae6fd')" class="w-5 h-5 rounded-full bg-sky-200 border border-sky-400 cursor-pointer" title="हल्का नीला"></button>
        <button onclick="applyCellBg('#fed7aa')" class="w-5 h-5 rounded-full bg-orange-200 border border-orange-400 cursor-pointer" title="हल्का नारंगी"></button>
        <button onclick="applyCellBg('#f1f5f9')" class="w-5 h-5 rounded-full bg-slate-200 border border-slate-400 cursor-pointer" title="ग्रे"></button>
      </div>

      <!-- Alignment -->
      <div class="flex items-center gap-0.5 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
        <button onclick="execFormat('justifyLeft')" class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer" title="बायां"><i class="fa-solid fa-align-left text-xs"></i></button>
        <button onclick="execFormat('justifyCenter')" class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer" title="मध्य"><i class="fa-solid fa-align-center text-xs"></i></button>
        <button onclick="execFormat('justifyRight')" class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer" title="दायां"><i class="fa-solid fa-align-right text-xs"></i></button>
      </div>

    </div>

    <!-- Ribbon Tab 4: Column Manager -->
    <div id="tabContent_columns" class="ribbon-tab-content items-center gap-3 py-2 flex-wrap text-xs">
      <div class="flex items-center gap-3 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800 flex-wrap">
        <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">कॉलम दृश्यता (Toggle Columns):</span>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(0, this.checked)" class="rounded text-sky-500"> क्र०सं०
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(1, this.checked)" class="rounded text-sky-500"> खेल का नाम
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(2, this.checked)" class="rounded text-sky-500"> आयु वर्ग
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(3, this.checked)" class="rounded text-sky-500"> श्रेणी / भार
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(4, this.checked)" class="rounded text-sky-500"> स्थान (विजेता/उपविजेता)
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(5, this.checked)" class="rounded text-sky-500"> खिलाड़ी का नाम
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(6, this.checked)" class="rounded text-sky-500"> जन्मतिथि
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(7, this.checked)" class="rounded text-sky-500"> समय / दूरी
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(8, this.checked)" class="rounded text-sky-500"> अभिभावक का नाम
        </label>
        <label class="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
          <input type="checkbox" checked onchange="toggleColumn(9, this.checked)" class="rounded text-sky-500"> मोबाइल नं०
        </label>
      </div>

      <button onclick="restoreOriginalPDFData()" class="px-2.5 py-1 bg-rose-950/70 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-800/60 font-semibold flex items-center gap-1 cursor-pointer ml-auto" title="सभी बदलाव निरस्त कर मूल PDF डेटा पुनर्स्थापित करें">
        <i class="fa-solid fa-arrows-rotate"></i> मूल PDF डेटा रीसेट
      </button>
    </div>

  </div>

  <!-- ================= SUB-BAR: FILTERS & SEARCH ================= -->
  <div class="no-print bg-slate-900 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between gap-3 flex-wrap text-xs">
    
    <!-- Search Bar -->
    <div class="flex items-center gap-2 flex-grow max-w-md">
      <div class="relative w-full">
        <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
        <input type="text" id="tableSearchInput" oninput="applyTableFilter()"
          placeholder="खिलाड़ी, खेल, अभिभावक या मोबाइल खोजें..."
          class="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500">
      </div>
      <button onclick="clearSearch()" class="px-2 py-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-md border border-slate-700 cursor-pointer" title="खोज खाली करें">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- Filter Buttons -->
    <div class="flex items-center gap-2 flex-wrap">
      
      <!-- Age Group Filter -->
      <div class="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
        <span class="text-[10px] text-slate-400 font-bold">आयु वर्ग:</span>
        <select id="filterAgeGroup" onchange="applyTableFilter()" class="bg-transparent text-sky-400 text-xs focus:outline-none cursor-pointer">
          <option value="ALL">सभी आयु वर्ग</option>
          <option value="12 वर्ष अथवा उससे कम">12 वर्ष अथवा उससे कम</option>
          <option value="12 वर्ष अधिक - 15 वर्ष तक">12 वर्ष अधिक - 15 वर्ष तक</option>
          <option value="15 वर्ष अधिक - 18 वर्ष तक">15 वर्ष अधिक - 18 वर्ष तक</option>
        </select>
      </div>

      <!-- Category Filter -->
      <div class="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
        <span class="text-[10px] text-slate-400 font-bold">श्रेणी:</span>
        <select id="filterCategory" onchange="applyTableFilter()" class="bg-transparent text-emerald-400 text-xs focus:outline-none cursor-pointer">
          <option value="ALL">सभी</option>
          <option value="बालक">बालक</option>
          <option value="बालिका">बालिका</option>
        </select>
      </div>

      <!-- Position Filter -->
      <div class="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
        <span class="text-[10px] text-slate-400 font-bold">स्थान:</span>
        <select id="filterPosition" onchange="applyTableFilter()" class="bg-transparent text-amber-400 text-xs focus:outline-none cursor-pointer">
          <option value="ALL">सभी (विजेता + उपविजेता)</option>
          <option value="विजेता">केवल विजेता (1st)</option>
          <option value="उपविजेता">केवल उपविजेता (2nd)</option>
        </select>
      </div>

      <!-- Total Rows Display -->
      <span class="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
        कुल: <b id="displayedRowsCount" class="text-white">0</b> पंक्तियाँ
      </span>

    </div>
  </div>

  <!-- ================= MAIN EDITABLE CANVAS / DOCUMENT VIEWPORT ================= -->
  <main class="flex-grow p-3 md:p-6 flex justify-center overflow-x-auto">
    
    <!-- Printable / Editable A4 Document Card -->
    <div id="printDocumentCard" class="print-page-wrapper w-full max-w-[1360px] bg-white text-slate-900 rounded-xl shadow-2xl p-6 md:p-8 border border-slate-300">
      
      <!-- Document Official Header -->
      <div class="border-b-2 border-slate-900 pb-4 mb-4 text-center">
        <div class="flex items-center justify-between mb-2">
          <img src="pac_logo.png" alt="PAC Emblem" class="w-16 h-16 object-contain hidden sm:block" onerror="this.style.visibility='hidden'">
          <div class="flex-grow px-4">
            <h1 class="text-xl md:text-2xl font-black text-slate-900 tracking-wide uppercase">
              वामा खेलोत्सव 2026
            </h1>
            <h2 class="text-sm md:text-base font-bold text-slate-800 mt-0.5">
              जनपद / पुलिस कमिश्नरेट स्तर पर विजेता एवं उपविजेता खिलाड़ियों / टीमों का विवरण
            </h2>
            <div class="text-xs md:text-sm font-semibold text-slate-700 mt-1 flex items-center justify-center gap-6 flex-wrap">
              <span>वाहिनी का नाम : <b>25वीं वाहिनी पीएसी, रायबरेली</b></span>
              <span class="flex items-center gap-1">
                प्रतियोगिता आयोजन की तिथि :
                <span contenteditable="true" id="docEventDate" class="border-b border-dotted border-slate-600 px-2 py-0.5 font-bold outline-none hover:bg-yellow-50 focus:bg-yellow-100">
                  25/01/2026
                </span>
              </span>
            </div>
          </div>
          <div class="w-16 hidden sm:block"></div>
        </div>
      </div>

      <!-- Main Editable Table -->
      <div class="khel-table-container overflow-x-auto">
        <table id="mainDataTable" class="khel-table">
          <thead>
            <tr>
              <th style="width: 45px;" class="col-idx-0">क्र०सं०</th>
              <th style="width: 140px;" class="col-idx-1">खेल / प्रतियोगिता<br>का नाम</th>
              <th style="width: 120px;" class="col-idx-2">आयु वर्ग</th>
              <th style="width: 120px;" class="col-idx-3">श्रेणी / भार<br>(बालक/बालिका)</th>
              <th style="width: 110px;" class="col-idx-4">स्थान / परिणाम<br>(विजेता / उपविजेता)</th>
              <th style="width: 150px;" class="col-idx-5">प्रतिभागी / खिलाड़ी<br>का नाम</th>
              <th style="width: 95px;" class="col-idx-6">जन्मतिथि<br>(DD/MM/YYYY)</th>
              <th style="width: 95px;" class="col-idx-7">समय / दूरी<br>(Record)</th>
              <th style="width: 140px;" class="col-idx-8">अभिभावक का नाम</th>
              <th style="width: 110px;" class="col-idx-9">मोबाइल नं०</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            <!-- Dynamically populated rows -->
          </tbody>
        </table>
      </div>

      <!-- Document Signatures Footer -->
      <div class="mt-12 pt-6 border-t border-slate-400 grid grid-cols-3 gap-6 text-center text-xs font-bold text-slate-800">
        <div>
          <div class="h-10"></div>
          <p class="border-t border-slate-600 pt-1">नोडल अधिकारी / खेल सचिव</p>
          <p class="text-[11px] text-slate-600 font-normal">25वीं वाहिनी पीएसी, रायबरेली</p>
        </div>
        <div>
          <div class="h-10"></div>
          <p class="border-t border-slate-600 pt-1">सहायक सेनानायक</p>
          <p class="text-[11px] text-slate-600 font-normal">25वीं वाहिनी पीएसी, रायबरेली</p>
        </div>
        <div>
          <div class="h-10"></div>
          <p class="border-t border-slate-600 pt-1">सेनानायक</p>
          <p class="text-[11px] text-slate-600 font-normal">25वीं वाहिनी पीएसी, रायबरेली</p>
        </div>
      </div>

    </div>
  </main>

  <!-- ================= FLOATING TABLE QUICK ACTION BAR ================= -->
  <div id="tableQuickBar" class="table-quick-bar no-print">
    <span class="text-[10px] font-bold text-sky-400 px-1">सेल टूल्स:</span>
    <button onclick="insertRowAbove()" title="ऊपर पंक्ति जोड़ें">⬆️ ऊपर</button>
    <button onclick="insertRowBelow()" title="नीचे पंक्ति जोड़ें">⬇️ नीचे</button>
    <button onclick="insertWinnerRow()" title="विजेता पंक्ति जोड़ें" class="text-emerald-300 font-bold">🥇 +विजेता</button>
    <button onclick="insertRunnerUpRow()" title="उपविजेता पंक्ति जोड़ें" class="text-sky-300 font-bold">🥈 +उपविजेता</button>
    <button onclick="deleteCurrentRow()" class="btn-danger text-rose-300" title="पंक्ति हटाएं">🗑️ पंक्ति</button>
    <span class="w-px h-4 bg-slate-700 mx-0.5"></span>
    <button id="quickMergeBtn" onclick="mergeSelectedCells()" title="मर्ज करें">🔀 मर्ज</button>
    <button id="quickUnmergeBtn" onclick="unmergeSelectedCell()" title="अनमर्ज करें">🔁 अनमर्ज</button>
  </div>

  <!-- ================= CUSTOM MS OFFICE RIGHT CLICK CONTEXT MENU ================= -->
  <div id="customContextMenu" class="custom-context-menu no-print">
    <div class="ctx-item" onclick="insertRowAbove()">
      <span><i class="fa-solid fa-arrow-up text-sky-400 mr-2"></i>ऊपर पंक्ति जोड़ें</span>
    </div>
    <div class="ctx-item" onclick="insertRowBelow()">
      <span><i class="fa-solid fa-arrow-down text-sky-400 mr-2"></i>नीचे पंक्ति जोड़ें</span>
    </div>
    <div class="ctx-item font-semibold" onclick="insertWinnerRow()">
      <span><i class="fa-solid fa-medal text-amber-400 mr-2"></i>विजेता पंक्ति जोड़ें</span>
      <span class="text-[10px] text-amber-400">1st</span>
    </div>
    <div class="ctx-item font-semibold" onclick="insertRunnerUpRow()">
      <span><i class="fa-solid fa-award text-slate-300 mr-2"></i>उपविजेता पंक्ति जोड़ें</span>
      <span class="text-[10px] text-slate-400">2nd</span>
    </div>
    <div class="ctx-item" onclick="duplicateCurrentRow()">
      <span><i class="fa-regular fa-copy text-slate-400 mr-2"></i>पंक्ति डुप्लीकेट करें</span>
    </div>
    <div class="ctx-item text-rose-300 hover:text-white" onclick="deleteCurrentRow()">
      <span><i class="fa-solid fa-trash-can text-rose-400 mr-2"></i>पंक्ति हटाएं</span>
    </div>
    
    <div class="ctx-divider"></div>

    <div class="ctx-item" onclick="insertColLeft()">
      <span><i class="fa-solid fa-arrow-left text-emerald-400 mr-2"></i>बाएँ कॉलम जोड़ें</span>
    </div>
    <div class="ctx-item" onclick="insertColRight()">
      <span><i class="fa-solid fa-arrow-right text-emerald-400 mr-2"></i>दाएँ कॉलम जोड़ें</span>
    </div>
    <div class="ctx-item text-rose-300 hover:text-white" onclick="deleteCurrentCol()">
      <span><i class="fa-solid fa-trash-can text-rose-400 mr-2"></i>कॉलम हटाएं</span>
    </div>

    <div class="ctx-divider"></div>

    <div id="ctxMergeItem" class="ctx-item" onclick="mergeSelectedCells()">
      <span><i class="fa-solid fa-object-group text-amber-400 mr-2"></i>सेल मर्ज करें</span>
      <span class="text-[10px] text-slate-400">Alt+M</span>
    </div>
    <div id="ctxUnmergeItem" class="ctx-item" onclick="unmergeSelectedCell()">
      <span><i class="fa-solid fa-object-ungroup text-sky-400 mr-2"></i>सेल अनमर्ज करें</span>
      <span class="text-[10px] text-slate-400">Alt+U</span>
    </div>
  </div>

  <!-- ================= TOAST NOTIFICATION CONTAINER ================= -->
  <div id="toastContainer" class="no-print fixed bottom-5 right-5 z-[10000] flex flex-col gap-2 pointer-events-none"></div>

  <!-- ================= JAVASCRIPT LOGIC ================= -->
  <script>
    // Embedded Initial Clean Data Extracted from खेल रिकार्ड.pdf
    const INITIAL_PDF_ROWS = ''' + initial_rows_json + ''';

    // Current Working Rows
    let activeTableCell = null;
    let activeTableRow = null;
    let selectedCells = new Set();
    let isMouseSelecting = false;
    let selectionStartCell = null;
    let showUpvijetaRows = true;

    // Undo / Redo History Stack
    const historyStack = [];
    let historyIndex = -1;
    const MAX_HISTORY = 35;

    // Toast Notification Utility
    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      const bg = type === 'success' ? 'bg-emerald-600 border-emerald-400' :
                 type === 'error' ? 'bg-rose-600 border-rose-400' :
                 type === 'warn' ? 'bg-amber-600 border-amber-400' : 'bg-sky-600 border-sky-400';
      toast.className = `${bg} text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xl border flex items-center gap-2 transform transition-all duration-300 translate-y-3 opacity-0`;
      toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : type === 'error' ? 'triangle-exclamation' : 'circle-info'}"></i><span>${message}</span>`;
      container.appendChild(toast);
      
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-3', 'opacity-0');
      });

      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-3');
        setTimeout(() => toast.remove(), 300);
      }, 2600);
    }

    // Switch Ribbon Tabs
    function switchRibbonTab(tabName) {
      document.querySelectorAll('.ribbon-tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.ribbon-tab-content').forEach(c => c.classList.remove('active'));

      const activeBtn = document.getElementById(`tabBtn_${tabName}`);
      const activeContent = document.getElementById(`tabContent_${tabName}`);
      if (activeBtn) activeBtn.classList.add('active');
      if (activeContent) activeContent.classList.add('active');
    }

    // Render Initial Table
    function renderInitialTable(rowsData) {
      const tbody = document.getElementById('tableBody');
      tbody.innerHTML = '';

      rowsData.forEach((r, idx) => {
        const tr = document.createElement('tr');
        tr.dataset.ageGroup = r.age_group || '';
        tr.dataset.category = r.category || '';
        tr.dataset.position = r.position || '';
        tr.dataset.isWinner = r.is_winner ? 'true' : 'false';

        // Badge styling for Position
        let posBadge = '';
        if (r.position.includes('विजेता (प्रथम)')) {
          posBadge = `<span class="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 print-badge">🥇 विजेता</span>`;
        } else if (r.position.includes('उपविजेता')) {
          posBadge = `<span class="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 print-badge">🥈 उपविजेता</span>`;
        } else {
          posBadge = r.position;
        }

        const cells = [
          { html: r.sno || '', cls: 'col-idx-0 font-bold' },
          { html: r.event || '', cls: 'col-idx-1 font-semibold' },
          { html: r.age_group || '', cls: 'col-idx-2' },
          { html: r.category || '', cls: 'col-idx-3 font-semibold' },
          { html: posBadge, cls: 'col-idx-4' },
          { html: r.name || '', cls: 'col-idx-5 font-bold text-slate-900' },
          { html: r.dob || '', cls: 'col-idx-6' },
          { html: r.record || '', cls: 'col-idx-7 font-semibold' },
          { html: r.parent || '', cls: 'col-idx-8' },
          { html: r.mobile || '', cls: 'col-idx-9 font-mono' }
        ];

        cells.forEach((cData, colIdx) => {
          const td = document.createElement('td');
          td.contentEditable = "true";
          td.className = cData.cls;
          td.innerHTML = cData.html;
          attachCellEvents(td);
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

      updateTableRowCount();
      pushHistory();
    }

    // Attach Cell Events for Selection, Typing, Navigation
    function attachCellEvents(cell) {
      cell.addEventListener('focus', () => {
        setActiveCell(cell);
      });

      cell.addEventListener('mousedown', (e) => {
        if (e.shiftKey) {
          e.preventDefault();
          selectRangeBetween(activeTableCell || cell, cell);
        } else if (e.ctrlKey || e.metaKey) {
          toggleCellSelection(cell);
        } else {
          clearSelection();
          selectedCells.add(cell);
          cell.classList.add('cell-selected');
          isMouseSelecting = true;
          selectionStartCell = cell;
          setActiveCell(cell);
        }
        updateSelectionBadge();
      });

      cell.addEventListener('mouseenter', () => {
        if (isMouseSelecting && selectionStartCell) {
          selectRangeBetween(selectionStartCell, cell);
        }
      });

      cell.addEventListener('keydown', (e) => {
        // Tab / Shift+Tab Navigation
        if (e.key === 'Tab') {
          e.preventDefault();
          handleTabNavigation(cell, e.shiftKey);
        }
        // Save shortcut
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
          e.preventDefault();
          saveToLocalStorage(true);
        }
      });

      cell.addEventListener('input', () => {
        scheduleAutoSave();
      });

      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        setActiveCell(cell);
        if (!selectedCells.has(cell)) {
          clearSelection();
          selectedCells.add(cell);
          cell.classList.add('cell-selected');
          updateSelectionBadge();
        }
        showContextMenu(e.clientX, e.clientY);
      });
    }

    document.addEventListener('mouseup', () => {
      isMouseSelecting = false;
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#customContextMenu')) {
        hideContextMenu();
      }
      if (!e.target.closest('#mainDataTable') && !e.target.closest('.ribbon-tab-btn') && !e.target.closest('.ribbon-tab-content') && !e.target.closest('#tableQuickBar')) {
        // keep selection or clear if clicked completely away
      }
    });

    // Set Active Cell and Position Quick Bar
    function setActiveCell(cell) {
      if (activeTableCell && activeTableCell !== cell) {
        activeTableCell.classList.remove('cell-active-anchor');
      }
      activeTableCell = cell;
      activeTableRow = cell ? cell.closest('tr') : null;
      if (cell) {
        cell.classList.add('cell-active-anchor');
        positionQuickBar(cell);
        updateMergeButtonsState();
      } else {
        hideQuickBar();
      }
    }

    // Position Floating Quick Bar
    function positionQuickBar(cell) {
      const quickBar = document.getElementById('tableQuickBar');
      if (!cell || !quickBar) return;
      const rect = cell.getBoundingClientRect();
      const top = Math.max(10, rect.top - 44);
      const left = Math.max(10, Math.min(window.innerWidth - 320, rect.left));
      quickBar.style.top = `${top}px`;
      quickBar.style.left = `${left}px`;
      quickBar.classList.add('visible');
    }

    function hideQuickBar() {
      const quickBar = document.getElementById('tableQuickBar');
      if (quickBar) quickBar.classList.remove('visible');
    }

    // Cell Selection Range Logic
    function clearSelection() {
      selectedCells.forEach(c => c.classList.remove('cell-selected'));
      selectedCells.clear();
      updateSelectionBadge();
      updateMergeButtonsState();
    }

    function toggleCellSelection(cell) {
      if (selectedCells.has(cell)) {
        selectedCells.delete(cell);
        cell.classList.remove('cell-selected');
      } else {
        selectedCells.add(cell);
        cell.classList.add('cell-selected');
      }
      updateSelectionBadge();
      updateMergeButtonsState();
    }

    function selectRangeBetween(startCell, endCell) {
      if (!startCell || !endCell) return;
      clearSelection();
      const table = document.getElementById('mainDataTable');
      const grid = buildTableGrid(table);

      let startPos = null;
      let endPos = null;

      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < (grid[r] ? grid[r].length : 0); c++) {
          if (grid[r][c] && grid[r][c].cell === startCell && !startPos) startPos = { r, c };
          if (grid[r][c] && grid[r][c].cell === endCell && !endPos) endPos = { r, c };
        }
      }

      if (!startPos || !endPos) return;

      const minR = Math.min(startPos.r, endPos.r);
      const maxR = Math.max(startPos.r, endPos.r);
      const minC = Math.min(startPos.c, endPos.c);
      const maxC = Math.max(startPos.c, endPos.c);

      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          if (grid[r] && grid[r][c] && grid[r][c].cell) {
            selectedCells.add(grid[r][c].cell);
            grid[r][c].cell.classList.add('cell-selected');
          }
        }
      }

      updateSelectionBadge();
      updateMergeButtonsState();
    }

    function updateSelectionBadge() {
      const badge = document.getElementById('selectedCellsCount');
      if (badge) badge.textContent = selectedCells.size;
      const wrap = document.getElementById('selectionBadge');
      if (wrap) {
        if (selectedCells.size > 1) {
          wrap.classList.remove('hidden');
        } else {
          wrap.classList.add('hidden');
        }
      }
    }

    // Grid Construction for Colspan / Rowspan Resolution
    function buildTableGrid(table) {
      const grid = [];
      const rows = Array.from(table.rows);
      rows.forEach((tr, rIdx) => {
        if (!grid[rIdx]) grid[rIdx] = [];
        let colPointer = 0;
        Array.from(tr.cells).forEach(cell => {
          while (grid[rIdx][colPointer]) {
            colPointer++;
          }
          const rSpan = cell.rowSpan || 1;
          const cSpan = cell.colSpan || 1;
          for (let r = 0; r < rSpan; r++) {
            for (let c = 0; c < cSpan; c++) {
              const targetR = rIdx + r;
              const targetC = colPointer + c;
              if (!grid[targetR]) grid[targetR] = [];
              grid[targetR][targetC] = {
                cell: cell,
                isOrigin: (r === 0 && c === 0),
                originR: rIdx,
                originC: colPointer
              };
            }
          }
          colPointer += cSpan;
        });
      });
      return grid;
    }

    // Update Merge & Unmerge Buttons (Active / Disabled states)
    function updateMergeButtonsState() {
      const btnMerge = document.getElementById('btnMergeCells');
      const btnUnmerge = document.getElementById('btnUnmergeCells');
      const quickMerge = document.getElementById('quickMergeBtn');
      const quickUnmerge = document.getElementById('quickUnmergeBtn');
      const ctxMerge = document.getElementById('ctxMergeItem');
      const ctxUnmerge = document.getElementById('ctxUnmergeItem');

      const canMerge = selectedCells.size > 1;
      const isCurrentMerged = activeTableCell && ((activeTableCell.rowSpan > 1) || (activeTableCell.colSpan > 1));

      if (btnMerge) btnMerge.disabled = !canMerge;
      if (quickMerge) quickMerge.style.display = canMerge ? 'inline-flex' : 'none';
      if (ctxMerge) ctxMerge.classList.toggle('disabled', !canMerge);

      if (btnUnmerge) btnUnmerge.disabled = !isCurrentMerged;
      if (quickUnmerge) quickUnmerge.style.display = isCurrentMerged ? 'inline-flex' : 'none';
      if (ctxUnmerge) ctxUnmerge.classList.toggle('disabled', !isCurrentMerged);
    }

    // ================= MERGE CELLS (पूर्ण एमएस ऑफिस फीचर्स) =================
    function mergeSelectedCells() {
      if (selectedCells.size < 2) {
        showToast('मर्ज करने के लिए कम से कम 2 सेलों को चुनें।', 'warn');
        return;
      }

      pushHistory();
      const table = document.getElementById('mainDataTable');
      const grid = buildTableGrid(table);

      // Find bounding box of all selected cells
      let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity;
      selectedCells.forEach(cell => {
        for (let r = 0; r < grid.length; r++) {
          for (let c = 0; c < (grid[r] ? grid[r].length : 0); c++) {
            if (grid[r][c] && grid[r][c].cell === cell) {
              minR = Math.min(minR, r);
              maxR = Math.max(maxR, r);
              minC = Math.min(minC, c);
              maxC = Math.max(maxC, c);
            }
          }
        }
      });

      if (minR === Infinity || minC === Infinity) return;

      const originCell = grid[minR][minC].cell;
      const combinedText = [];
      const mergedMeta = [];

      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          const item = grid[r][c];
          if (item && item.cell) {
            const cell = item.cell;
            if (cell !== originCell && !mergedMeta.some(m => m.cell === cell)) {
              if (cell.innerText.trim()) {
                combinedText.push(cell.innerText.trim());
              }
              mergedMeta.push({
                cell: cell,
                parentRow: cell.closest('tr'),
                html: cell.innerHTML,
                className: cell.className
              });
              // Remove other cell from DOM
              cell.remove();
            }
          }
        }
      }

      originCell.rowSpan = (maxR - minR + 1);
      originCell.colSpan = (maxC - minC + 1);
      if (combinedText.length > 0) {
        originCell.innerText = (originCell.innerText.trim() + ' ' + combinedText.join(' ')).trim();
      }

      clearSelection();
      selectedCells.add(originCell);
      originCell.classList.add('cell-selected');
      setActiveCell(originCell);

      showToast('सेल सफलतापूर्वक मर्ज किए गए (Merged)!', 'success');
      scheduleAutoSave();
    }

    // ================= UNMERGE CELLS (सेल अनमर्ज करें) =================
    function unmergeSelectedCell() {
      const cell = activeTableCell;
      if (!cell || (cell.rowSpan <= 1 && cell.colSpan <= 1)) {
        showToast('यह सेल पहले से एकल (Unmerged) है।', 'warn');
        return;
      }

      pushHistory();
      const table = document.getElementById('mainDataTable');
      const grid = buildTableGrid(table);

      let originPos = null;
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < (grid[r] ? grid[r].length : 0); c++) {
          if (grid[r][c] && grid[r][c].cell === cell) {
            originPos = { r, c };
            break;
          }
        }
        if (originPos) break;
      }

      if (!originPos) return;

      const origRowSpan = cell.rowSpan || 1;
      const origColSpan = cell.colSpan || 1;
      cell.rowSpan = 1;
      cell.colSpan = 1;

      for (let r = originPos.r; r < originPos.r + origRowSpan; r++) {
        for (let c = originPos.c; c < originPos.c + origColSpan; c++) {
          if (r === originPos.r && c === originPos.c) continue;

          const targetRow = table.rows[r];
          if (!targetRow) continue;

          const newCell = document.createElement('td');
          newCell.contentEditable = "true";
          newCell.className = cell.className;
          newCell.innerHTML = "";
          attachCellEvents(newCell);

          // Find insertion index in targetRow
          let inserted = false;
          const currentGrid = buildTableGrid(table);
          for (let targetC = c + 1; targetC < (currentGrid[r] ? currentGrid[r].length : 0); targetC++) {
            if (currentGrid[r][targetC] && currentGrid[r][targetC].isOrigin) {
              targetRow.insertBefore(newCell, currentGrid[r][targetC].cell);
              inserted = true;
              break;
            }
          }
          if (!inserted) {
            targetRow.appendChild(newCell);
          }
        }
      }

      updateMergeButtonsState();
      showToast('सेल सफलतापूर्वक अनमर्ज किए गए (Unmerged)!', 'success');
      scheduleAutoSave();
    }

    // Split cell horizontally (2 columns)
    function splitCellHorizontal() {
      if (!activeTableCell) return;
      pushHistory();
      const newCell = document.createElement('td');
      newCell.contentEditable = "true";
      newCell.className = activeTableCell.className;
      newCell.innerHTML = "";
      attachCellEvents(newCell);
      activeTableCell.after(newCell);
      showToast('सेल को 2 कॉलम में विभाजित किया गया', 'success');
      scheduleAutoSave();
    }

    // Split cell vertically (2 rows)
    function splitCellVertical() {
      if (!activeTableCell) return;
      insertRowBelow();
    }

    // ================= ROW OPERATIONS =================
    function insertRowAbove() {
      if (!activeTableRow) return;
      pushHistory();
      const newRow = createEmptyRowLike(activeTableRow);
      activeTableRow.before(newRow);
      focusFirstCell(newRow);
      updateTableRowCount();
      showToast('ऊपर नई पंक्ति जोड़ी गई', 'success');
      scheduleAutoSave();
    }

    function insertRowBelow() {
      if (!activeTableRow) return;
      pushHistory();
      const newRow = createEmptyRowLike(activeTableRow);
      activeTableRow.after(newRow);
      focusFirstCell(newRow);
      updateTableRowCount();
      showToast('नीचे नई पंक्ति जोड़ी गई', 'success');
      scheduleAutoSave();
    }

    function insertWinnerRow() {
      if (!activeTableRow) return;
      pushHistory();
      const newRow = createEmptyRowLike(activeTableRow);
      // Pre-fill position with Winner badge
      const posCell = newRow.children[4];
      if (posCell) {
        posCell.innerHTML = `<span class="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 print-badge">🥇 विजेता</span>`;
      }
      activeTableRow.after(newRow);
      focusCell(newRow.children[5] || newRow.children[0]);
      updateTableRowCount();
      showToast('🥇 विजेता पंक्ति जोड़ी गई', 'success');
      scheduleAutoSave();
    }

    function insertRunnerUpRow() {
      if (!activeTableRow) return;
      pushHistory();
      const newRow = createEmptyRowLike(activeTableRow);
      // Pre-fill position with Runner-up badge
      const posCell = newRow.children[4];
      if (posCell) {
        posCell.innerHTML = `<span class="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 print-badge">🥈 उपविजेता</span>`;
      }
      activeTableRow.after(newRow);
      focusCell(newRow.children[5] || newRow.children[0]);
      updateTableRowCount();
      showToast('🥈 उपविजेता पंक्ति जोड़ी गई', 'success');
      scheduleAutoSave();
    }

    function duplicateCurrentRow() {
      if (!activeTableRow) return;
      pushHistory();
      const clone = activeTableRow.cloneNode(true);
      Array.from(clone.cells).forEach(cell => {
        attachCellEvents(cell);
      });
      activeTableRow.after(clone);
      updateTableRowCount();
      showToast('पंक्ति डुप्लीकेट की गई', 'success');
      scheduleAutoSave();
    }

    function deleteCurrentRow() {
      if (!activeTableRow) return;
      const tbody = document.getElementById('tableBody');
      if (tbody.children.length <= 1) {
        showToast('अंतिम पंक्ति नहीं हटाई जा सकती!', 'warn');
        return;
      }
      pushHistory();
      const nextRow = activeTableRow.nextElementSibling || activeTableRow.previousElementSibling;
      activeTableRow.remove();
      if (nextRow) focusFirstCell(nextRow);
      updateTableRowCount();
      showToast('पंक्ति हटाई गई', 'info');
      scheduleAutoSave();
    }

    function createEmptyRowLike(referenceRow) {
      const tr = document.createElement('tr');
      tr.dataset.ageGroup = referenceRow.dataset.ageGroup || '';
      tr.dataset.category = referenceRow.dataset.category || '';
      tr.dataset.position = '';

      Array.from(referenceRow.children).forEach((refCell, idx) => {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.className = refCell.className;
        // Keep Event and Age Group filled for continuity, blank for participant info
        if (idx === 1) td.innerHTML = referenceRow.children[1] ? referenceRow.children[1].innerHTML : '';
        else if (idx === 2) td.innerHTML = referenceRow.children[2] ? referenceRow.children[2].innerHTML : '';
        else if (idx === 3) td.innerHTML = referenceRow.children[3] ? referenceRow.children[3].innerHTML : '';
        else td.innerHTML = '';

        attachCellEvents(td);
        tr.appendChild(td);
      });
      return tr;
    }

    // ================= COLUMN OPERATIONS =================
    function insertColLeft() {
      if (!activeTableCell) return;
      pushHistory();
      const table = document.getElementById('mainDataTable');
      const colIdx = activeTableCell.cellIndex;

      // Header cell
      const th = document.createElement('th');
      th.contentEditable = "true";
      th.innerHTML = "नया कॉलम";
      table.rows[0].insertBefore(th, table.rows[0].children[colIdx]);

      // Data cells
      const tbody = document.getElementById('tableBody');
      Array.from(tbody.rows).forEach(r => {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.innerHTML = "";
        attachCellEvents(td);
        r.insertBefore(td, r.children[colIdx]);
      });

      showToast('बायाँ कॉलम जोड़ा गया', 'success');
      scheduleAutoSave();
    }

    function insertColRight() {
      if (!activeTableCell) return;
      pushHistory();
      const table = document.getElementById('mainDataTable');
      const colIdx = activeTableCell.cellIndex + 1;

      // Header cell
      const th = document.createElement('th');
      th.contentEditable = "true";
      th.innerHTML = "नया कॉलम";
      if (colIdx < table.rows[0].children.length) {
        table.rows[0].insertBefore(th, table.rows[0].children[colIdx]);
      } else {
        table.rows[0].appendChild(th);
      }

      // Data cells
      const tbody = document.getElementById('tableBody');
      Array.from(tbody.rows).forEach(r => {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.innerHTML = "";
        attachCellEvents(td);
        if (colIdx < r.children.length) {
          r.insertBefore(td, r.children[colIdx]);
        } else {
          r.appendChild(td);
        }
      });

      showToast('दायाँ कॉलम जोड़ा गया', 'success');
      scheduleAutoSave();
    }

    function deleteCurrentCol() {
      if (!activeTableCell) return;
      const colIdx = activeTableCell.cellIndex;
      const table = document.getElementById('mainDataTable');
      if (table.rows[0].cells.length <= 1) {
        showToast('अंतिम कॉलम नहीं हटाया जा सकता!', 'warn');
        return;
      }
      pushHistory();
      Array.from(table.rows).forEach(r => {
        if (r.cells[colIdx]) r.cells[colIdx].remove();
      });
      showToast('कॉलम हटाया गया', 'info');
      scheduleAutoSave();
    }

    // Auto Renumber Rows
    function autoRenumberRows() {
      pushHistory();
      const tbody = document.getElementById('tableBody');
      let currentNumber = 1;
      let lastEvent = '';

      Array.from(tbody.rows).forEach(row => {
        if (row.style.display === 'none') return;
        const snoCell = row.children[0];
        const eventCell = row.children[1];
        const eventName = eventCell ? eventCell.innerText.trim() : '';

        if (snoCell) {
          if (eventName && eventName !== lastEvent) {
            snoCell.innerText = currentNumber++;
            lastEvent = eventName;
          } else if (!eventName) {
            snoCell.innerText = currentNumber++;
          } else {
            snoCell.innerText = '';
          }
        }
      });
      showToast('क्रमांक स्वतः सही किए गए (1, 2, 3...)', 'success');
      scheduleAutoSave();
    }

    // Toggle Upvijeta Rows Visibility
    function toggleAllUpvijetaRows() {
      showUpvijetaRows = !showUpvijetaRows;
      const btn = document.getElementById('btnToggleUpvijeta');
      if (btn) {
        btn.innerHTML = showUpvijetaRows ? 
          `<i class="fa-solid fa-users"></i> उपविजेता पंक्तियाँ (सक्रिय)` : 
          `<i class="fa-solid fa-eye-slash"></i> उपविजेता पंक्तियाँ (छिपी)`;
        btn.classList.toggle('bg-amber-600', !showUpvijetaRows);
      }
      applyTableFilter();
      showToast(showUpvijetaRows ? 'सभी उपविजेता पंक्तियाँ दिखाई जा रही हैं' : 'उपविजेता पंक्तियाँ छिपाई गईं', 'info');
    }

    // Toggle Column Visibility
    function toggleColumn(colIdx, isVisible) {
      const table = document.getElementById('mainDataTable');
      Array.from(table.rows).forEach(r => {
        const cell = r.children[colIdx];
        if (cell) {
          cell.style.display = isVisible ? '' : 'none';
        }
      });
    }

    // ================= TEXT FORMATTING =================
    function execFormat(cmd, val = null) {
      document.execCommand(cmd, false, val);
      scheduleAutoSave();
    }

    function applyFontFamily(fontName) {
      if (activeTableCell) {
        activeTableCell.style.fontFamily = fontName;
      }
      scheduleAutoSave();
    }

    let currentFontSize = 13;
    function changeFontSize(delta) {
      currentFontSize = Math.max(9, Math.min(24, currentFontSize + delta));
      document.getElementById('fontSizeDisplay').textContent = `${currentFontSize}px`;
      if (activeTableCell) {
        activeTableCell.style.fontSize = `${currentFontSize}px`;
      }
      scheduleAutoSave();
    }

    function applyCellBg(color) {
      if (selectedCells.size > 0) {
        selectedCells.forEach(cell => {
          cell.style.backgroundColor = color;
        });
      } else if (activeTableCell) {
        activeTableCell.style.backgroundColor = color;
      }
      scheduleAutoSave();
    }

    // Tab Navigation
    function handleTabNavigation(currentCell, isShift) {
      const table = document.getElementById('mainDataTable');
      const cells = Array.from(table.querySelectorAll('tbody td'));
      const idx = cells.indexOf(currentCell);
      if (idx === -1) return;

      if (!isShift) {
        if (idx < cells.length - 1) {
          focusCell(cells[idx + 1]);
        } else {
          // Add new row when tabbing out of last cell!
          insertRowBelow();
        }
      } else {
        if (idx > 0) {
          focusCell(cells[idx - 1]);
        }
      }
    }

    function focusFirstCell(row) {
      if (row && row.cells[0]) focusCell(row.cells[0]);
    }

    function focusCell(cell) {
      if (cell) {
        cell.focus();
        setActiveCell(cell);
      }
    }

    // Context Menu Helpers
    function showContextMenu(x, y) {
      const menu = document.getElementById('customContextMenu');
      if (!menu) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      menu.style.left = `${Math.min(x + 2, w - 220)}px`;
      menu.style.top = `${Math.min(y + 2, h - 340)}px`;
      menu.classList.add('visible');
    }

    function hideContextMenu() {
      const menu = document.getElementById('customContextMenu');
      if (menu) menu.classList.remove('visible');
    }

    // ================= FILTERS & SEARCH =================
    function applyTableFilter() {
      const searchVal = document.getElementById('tableSearchInput').value.trim().toLowerCase();
      const ageGroupVal = document.getElementById('filterAgeGroup').value;
      const categoryVal = document.getElementById('filterCategory').value;
      const positionVal = document.getElementById('filterPosition').value;

      const tbody = document.getElementById('tableBody');
      let visibleCount = 0;

      Array.from(tbody.rows).forEach(row => {
        const text = row.innerText.toLowerCase();
        const posText = row.children[4] ? row.children[4].innerText : '';
        const isRunnerUp = posText.includes('उपविजेता');

        // Check Upvijeta toggle
        if (!showUpvijetaRows && isRunnerUp) {
          row.style.display = 'none';
          return;
        }

        // Check Search
        const matchesSearch = !searchVal || text.includes(searchVal);

        // Check Age Group
        const ageCellText = row.children[2] ? row.children[2].innerText : '';
        const matchesAge = (ageGroupVal === 'ALL') || ageCellText.includes(ageGroupVal);

        // Check Category
        const catCellText = row.children[3] ? row.children[3].innerText : '';
        const matchesCat = (categoryVal === 'ALL') || catCellText.includes(categoryVal);

        // Check Position
        const matchesPos = (positionVal === 'ALL') || 
                           (positionVal === 'विजेता' && posText.includes('विजेता') && !isRunnerUp) ||
                           (positionVal === 'उपविजेता' && isRunnerUp);

        if (matchesSearch && matchesAge && matchesCat && matchesPos) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      document.getElementById('displayedRowsCount').textContent = visibleCount;
    }

    function clearSearch() {
      document.getElementById('tableSearchInput').value = '';
      applyTableFilter();
    }

    function updateTableRowCount() {
      applyTableFilter();
    }

    // ================= UNDO / REDO SYSTEM =================
    function pushHistory() {
      const tbody = document.getElementById('tableBody');
      if (!tbody) return;
      const state = tbody.innerHTML;

      // Truncate future states if we are in middle of stack
      if (historyIndex < historyStack.length - 1) {
        historyStack.splice(historyIndex + 1);
      }

      historyStack.push(state);
      if (historyStack.length > MAX_HISTORY) historyStack.shift();
      historyIndex = historyStack.length - 1;
    }

    function undo() {
      if (historyIndex > 0) {
        historyIndex--;
        restoreTableState(historyStack[historyIndex]);
        showToast('पूर्ववत किया गया (Undo)', 'info');
      } else {
        showToast('कोई पूर्ववत इतिहास उपलब्ध नहीं', 'warn');
      }
    }

    function redo() {
      if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        restoreTableState(historyStack[historyIndex]);
        showToast('दोहराया गया (Redo)', 'info');
      } else {
        showToast('कोई दोहराने योग्य इतिहास उपलब्ध नहीं', 'warn');
      }
    }

    function restoreTableState(html) {
      const tbody = document.getElementById('tableBody');
      tbody.innerHTML = html;
      Array.from(tbody.querySelectorAll('td')).forEach(td => attachCellEvents(td));
      clearSelection();
      updateTableRowCount();
    }

    // Keyboard Shortcuts for Undo/Redo/Format
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (e.altKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        mergeSelectedCells();
      } else if (e.altKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        unmergeSelectedCell();
      }
    });

    // ================= AUTO SAVE & LOCAL STORAGE =================
    let autoSaveTimer = null;
    function scheduleAutoSave() {
      const statusText = document.getElementById('saveStatusText');
      if (statusText) statusText.textContent = 'परिवर्तन हो रहा है...';

      clearTimeout(autoSaveTimer);
      autoSaveTimer = setTimeout(() => {
        saveToLocalStorage(false);
      }, 1500);
    }

    function saveToLocalStorage(isManual = false) {
      const tbody = document.getElementById('tableBody');
      const docDate = document.getElementById('docEventDate');
      if (!tbody) return;

      const dataToSave = {
        tableHtml: tbody.innerHTML,
        eventDate: docDate ? docDate.innerText : '',
        timestamp: new Date().toLocaleTimeString('hi-IN')
      };

      try {
        localStorage.setItem('khel_record_editor_v1', JSON.stringify(dataToSave));
        const statusText = document.getElementById('saveStatusText');
        if (statusText) statusText.textContent = `सहेजा गया (${dataToSave.timestamp})`;
        if (isManual) showToast('ड्राफ्ट सफलतापूर्वक सहेजा गया!', 'success');
      } catch (e) {
        console.error('Storage error:', e);
      }
    }

    function loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('khel_record_editor_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.tableHtml) {
            const tbody = document.getElementById('tableBody');
            tbody.innerHTML = parsed.tableHtml;
            if (parsed.eventDate && document.getElementById('docEventDate')) {
              document.getElementById('docEventDate').innerText = parsed.eventDate;
            }
            Array.from(tbody.querySelectorAll('td')).forEach(td => attachCellEvents(td));
            updateTableRowCount();
            pushHistory();
            showToast(`सहेजा गया ड्राफ्ट लोड किया गया (${parsed.timestamp || ''})`, 'info');
            return true;
          }
        }
      } catch (e) {
        console.error('Load error:', e);
      }
      return false;
    }

    function restoreOriginalPDFData() {
      if (confirm('क्या आप सचमुच मूल PDF डेटा पुनर्स्थापित करना चाहते हैं? आपके वर्तमान बदलाव रीसेट हो जाएंगे।')) {
        localStorage.removeItem('khel_record_editor_v1');
        renderInitialTable(INITIAL_PDF_ROWS);
        showToast('मूल PDF डेटा पुनर्स्थापित कर दिया गया!', 'success');
      }
    }

    // ================= EXPORT & PRINT FUNCTIONS =================
    function prepareAndPrint() {
      // Clear visual selections before printing
      clearSelection();
      hideQuickBar();
      hideContextMenu();
      window.print();
    }

    function exportToExcel() {
      const table = document.getElementById('mainDataTable');
      const clone = table.cloneNode(true);

      // Clean cloned table
      clone.querySelectorAll('*').forEach(el => {
        if (el.style.display === 'none') el.remove();
      });

      const wb = XLSX.utils.table_to_book(clone, { sheet: "खेल_रिकॉर्ड_2026", raw: true });
      const ws = wb.Sheets["खेल_रिकॉर्ड_2026"];

      // Prepend Title Rows
      const titleRow = ["वामा खेलोत्सव 2026 — विजेता एवं उपविजेता खिलाड़ियों का विवरण (25वीं वाहिनी पीएसी, रायबरेली)"];
      const dateRow = [`प्रतियोगिता आयोजन की तिथि: ${document.getElementById('docEventDate').innerText}`];
      const emptyRow = [];

      let dataArr = XLSX.utils.sheet_to_json(ws, { header: 1 });
      dataArr = [titleRow, dateRow, emptyRow, ...dataArr];

      const newWs = XLSX.utils.aoa_to_sheet(dataArr);
      wb.Sheets["खेल_रिकॉर्ड_2026"] = newWs;

      XLSX.writeFile(wb, "Vama_Khelotsav_2026_Record.xlsx");
      showToast('Excel फाइल सफलतापूर्वक डाउनलोड की गई!', 'success');
    }

    function exportToWord() {
      const table = document.getElementById('mainDataTable');
      const eventDate = document.getElementById('docEventDate').innerText;

      const headerHtml = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>वामा खेलोत्सव 2026</title>
          <style>
            body { font-family: 'Mangal', 'Arial Unicode MS', sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 6px; text-align: center; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1, h2 { text-align: center; margin: 4px; }
          </style>
        </head>
        <body>
          <h1>वामा खेलोत्सव 2026</h1>
          <h2>25वीं वाहिनी पीएसी, रायबरेली</h2>
          <p style="text-align:center;"><b>प्रतियोगिता आयोजन की तिथि:</b> ${eventDate}</p>
          <br>
          ${table.outerHTML}
        </body>
        </html>
      `;

      const blob = new Blob(['\ufeff', headerHtml], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Vama_Khelotsav_2026_Record.doc';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Word (.doc) फाइल डाउनलोड की गई!', 'success');
    }

    // ================= INITIALIZATION =================
    window.addEventListener('DOMContentLoaded', () => {
      const hasLoadedDraft = loadFromLocalStorage();
      if (!hasLoadedDraft) {
        renderInitialTable(INITIAL_PDF_ROWS);
      }
    });
  </script>
</body>
</html>
'''

with open(r'c:\Users\pmsrbl\Desktop\pmsrbl\khel_record_editor.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

# Also update vama_khel.html so that it is upgraded with this same rich MS Office suite!
with open(r'c:\Users\pmsrbl\Desktop\pmsrbl\vama_khel.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print("Generated both khel_record_editor.html and vama_khel.html successfully!")
