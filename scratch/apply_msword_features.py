# Python script to apply MS Word text editing & table functionality to pms_letter_generator.html

with open('pms_letter_generator.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. ADD CSS FOR TABLE QUICK BAR & COL RESIZER
css_target = """    .mini-bar-sep {
      width: 1px;
      height: 16px;
      background: #334155;
      margin: 0 2px;
    }"""

css_replacement = """    .mini-bar-sep {
      width: 1px;
      height: 16px;
      background: #334155;
      margin: 0 2px;
    }

    /* Table Quick Floating Action Bar */
    .table-quick-bar {
      position: fixed;
      z-index: 9998;
      display: none;
      align-items: center;
      gap: 3px;
      padding: 4px 8px;
      background: rgba(15, 23, 42, 0.96);
      border: 1px solid #38bdf8;
      border-radius: 9px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.55), 0 0 12px rgba(56, 189, 248, 0.25);
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
      color: #e2e8f0;
      border-radius: 5px;
      padding: 2px 7px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }

    .table-quick-bar button:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .table-quick-bar button.btn-del:hover {
      background: #dc2626;
      border-color: #ef4444;
      color: #ffffff;
    }

    /* Table Column Border Resizer */
    .pms-letter-table th {
      position: relative;
    }

    .col-resizer {
      position: absolute;
      top: 0;
      right: -3px;
      width: 6px;
      bottom: 0;
      cursor: col-resize;
      user-select: none;
      z-index: 15;
    }

    .col-resizer:hover,
    .col-resizer.resizing {
      background: #38bdf8;
    }"""

assert css_target in content, "CSS target not found!"
content = content.replace(css_target, css_replacement, 1)

# 2. UPGRADE SIDEBAR TAB 3 TABLE CONTROLS (Row & Column Insert/Delete)
tab3_target = """              <!-- Row & Column Buttons -->
              <div class="grid grid-cols-2 gap-1.5 pt-1">
                <button type="button" id="btnAddTableRow"
                  class="px-2 py-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded border border-blue-500/40 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer">
                  + पंक्ति जोड़ें (Row)
                </button>
                <button type="button" id="btnRemoveTableRow"
                  class="px-2 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer">
                  - पंक्ति हटाएं
                </button>
                <button type="button" id="btnAddTableCol"
                  class="px-2 py-1.5 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded border border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer">
                  + कॉलम जोड़ें (Col)
                </button>
                <button type="button" id="btnRemoveTableCol"
                  class="px-2 py-1.5 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white rounded border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer">
                  - कॉलम हटाएं
                </button>
              </div>"""

tab3_replacement = """              <!-- MS Word Style Row & Column Controls -->
              <div class="space-y-2.5 pt-2 border-t border-slate-700/80">
                <div class="text-[11px] font-bold text-sky-400 flex items-center justify-between">
                  <span class="flex items-center gap-1"><i class="fa-solid fa-bars"></i> पंक्ति प्रबंधन (Rows):</span>
                  <span class="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-700" id="tableRowCountBadge">3 पंक्तियाँ</span>
                </div>
                <div class="grid grid-cols-3 gap-1.5">
                  <button type="button" onclick="insertTableRowAbove()"
                    class="px-2 py-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded border border-blue-500/40 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="चयनित पंक्ति के ऊपर नई पंक्ति जोड़ें">
                    <i class="fa-solid fa-arrow-up text-[10px]"></i> ऊपर जोड़ें
                  </button>
                  <button type="button" onclick="insertTableRowBelow()"
                    class="px-2 py-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded border border-blue-500/40 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="चयनित पंक्ति के नीचे नई पंक्ति जोड़ें">
                    <i class="fa-solid fa-arrow-down text-[10px]"></i> नीचे जोड़ें
                  </button>
                  <button type="button" onclick="deleteCurrentTableRow()"
                    class="px-2 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="चयनित पंक्ति हटाएं">
                    <i class="fa-solid fa-trash-can text-[10px]"></i> हटाएं
                  </button>
                </div>

                <div class="text-[11px] font-bold text-emerald-400 flex items-center justify-between pt-1">
                  <span class="flex items-center gap-1"><i class="fa-solid fa-table-columns"></i> कॉलम प्रबंधन (Columns):</span>
                  <span class="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-700" id="tableColCountBadge">3 कॉलम</span>
                </div>
                <div class="grid grid-cols-3 gap-1.5">
                  <button type="button" onclick="insertTableColLeft()"
                    class="px-2 py-1.5 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded border border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="चयनित कॉलम के बाईं ओर नया कॉलम जोड़ें">
                    <i class="fa-solid fa-arrow-left text-[10px]"></i> बाएं जोड़ें
                  </button>
                  <button type="button" onclick="insertTableColRight()"
                    class="px-2 py-1.5 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded border border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="चयनित कॉलम के दाईं ओर नया कॉलम जोड़ें">
                    <i class="fa-solid fa-arrow-right text-[10px]"></i> दाएं जोड़ें
                  </button>
                  <button type="button" onclick="deleteCurrentTableCol()"
                    class="px-2 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="चयनित कॉलम हटाएं">
                    <i class="fa-solid fa-trash-can text-[10px]"></i> हटाएं
                  </button>
                </div>

                <!-- Utilities: Auto-Number & Equal Width -->
                <div class="grid grid-cols-2 gap-1.5 pt-1">
                  <button type="button" onclick="autoRenumberTableRows()"
                    class="px-2 py-1.5 bg-amber-600/25 hover:bg-amber-600 text-amber-200 hover:text-white rounded border border-amber-500/40 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="क्रमांक कॉलम को 1, 2, 3... अनुसार स्वतः सही करें">
                    <i class="fa-solid fa-arrow-down-1-9 text-xs"></i> 1, 2, 3... सही करें
                  </button>
                  <button type="button" onclick="distributeTableColumns()"
                    class="px-2 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    title="सभी कॉलम की चौड़ाई बराबर करें">
                    <i class="fa-solid fa-arrows-left-right-to-line text-xs"></i> चौड़ाई समान करें
                  </button>
                </div>
              </div>"""

assert tab3_target in content, "Tab 3 target not found!"
content = content.replace(tab3_target, tab3_replacement, 1)

# 3. ADD MS WORD OFFICE RIBBON TOOLBAR ABOVE THE PREVIEW CANVAS
ribbon_target = """      <!-- VIEWPORT & A4 DOCUMENT PAPER -->
      <div class="preview-viewport">"""

ribbon_replacement = """      <!-- ================= MS WORD OFFICE FORMATTING RIBBON ================= -->
      <div id="officeRibbonToolbar"
        class="no-print w-full max-w-[880px] mx-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-2xl p-2 shadow-2xl mt-2 mb-1 flex items-center justify-between gap-1.5 flex-wrap text-xs select-none">

        <!-- Group 1: Undo / Redo / Clear -->
        <div class="flex items-center gap-0.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('undo')"
            class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="पूर्ववत करें (Undo - Ctrl+Z)">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('redo')"
            class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="पुनः करें (Redo - Ctrl+Y)">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
          <div class="w-px h-4 bg-slate-700 mx-0.5"></div>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('removeFormat')"
            class="px-1.5 py-1 text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded transition cursor-pointer font-bold text-[11px]"
            title="फॉर्मेटिंग हटाएं (Clear Formatting)">
            <span>T✕</span>
          </button>
        </div>

        <!-- Group 2: Font & Size -->
        <div class="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <select id="ribbonFontFamily" onchange="applyFontFamilyToSelection(this.value)" onmousedown="event.stopPropagation()"
            class="bg-slate-900 text-amber-300 border border-slate-700 rounded px-2 py-0.5 text-xs font-semibold focus:outline-none cursor-pointer max-w-[125px]"
            title="फॉन्ट बदलें">
            <option value="mangal" selected>मंगल (Mangal)</option>
            <option value="aparajita">अपराजिता (Aparajita)</option>
            <option value="kokila">कोकिला (Kokila)</option>
            <option value="noto_serif">नोटो सेरिफ</option>
            <option value="noto_sans">नोटो सेन्स</option>
            <option value="martel">मार्टेल (Martel)</option>
            <option value="tiro">तिरो देवनागरी</option>
            <option value="karma">कर्मा (Karma)</option>
            <option value="utsaah">उत्साह (Utsaah)</option>
          </select>

          <!-- A- / Size / A+ -->
          <div class="flex items-center bg-slate-900 rounded border border-slate-700">
            <button type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(-1)"
              class="px-1.5 py-0.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-l font-bold cursor-pointer"
              title="फॉन्ट छोटा करें (A-)">A−</button>
            <span id="ribbonFontSizeDisplay" class="px-1.5 text-[11px] font-mono text-amber-300 font-bold select-none">15.5px</span>
            <button type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(1)"
              class="px-1.5 py-0.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-r font-bold cursor-pointer"
              title="फॉन्ट बड़ा करें (A+)">A+</button>
          </div>

          <select id="ribbonFontSizeSelect" onchange="smartSetExactFontSize(parseFloat(this.value))" onmousedown="event.stopPropagation()"
            class="bg-slate-900 text-slate-200 border border-slate-700 rounded px-1.5 py-0.5 text-[11px] cursor-pointer"
            title="फॉन्ट साइज सीधे चुनें">
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15" selected>15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="22">22</option>
            <option value="24">24</option>
          </select>
        </div>

        <!-- Group 3: Character Formatting (Bold, Italic, Underline, Strike, Color, Highlight) -->
        <div class="flex items-center gap-0.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('bold')"
            class="w-7 h-6 flex items-center justify-center font-black text-slate-200 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="बोल्ड (Ctrl+B)"><b>B</b></button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('italic')"
            class="w-7 h-6 flex items-center justify-center font-serif italic text-slate-200 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="इटैलिक (Ctrl+I)"><i>I</i></button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('underline')"
            class="w-7 h-6 flex items-center justify-center underline text-slate-200 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="अंडरलाइन (Ctrl+U)"><u>U</u></button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('strikeThrough')"
            class="w-7 h-6 flex items-center justify-center line-through text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="स्ट्राइकथ्रू"><s>S</s></button>

          <div class="w-px h-4 bg-slate-700 mx-0.5"></div>

          <!-- Text Color Picker -->
          <div class="relative flex items-center" title="टेक्स्ट रंग (Font Color)">
            <label class="cursor-pointer flex items-center gap-0.5 px-1 py-0.5 hover:bg-slate-800 rounded">
              <span class="font-bold text-[11px] text-slate-200 border-b-2 border-red-500">A</span>
              <input type="color" id="ribbonTextColorPicker" value="#000000" onchange="letterRichExec('foreColor', this.value)"
                class="w-4 h-4 bg-transparent border-0 p-0 cursor-pointer opacity-0 absolute inset-0">
            </label>
          </div>

          <!-- Highlight Color Button -->
          <button type="button" onmousedown="event.preventDefault()" onclick="letterApplyHighlight('#fef08a')"
            class="w-6 h-6 flex items-center justify-center text-amber-300 hover:bg-slate-800 rounded cursor-pointer"
            title="हाइलाइट (Highlight)">
            <i class="fa-solid fa-highlighter text-xs"></i>
          </button>
        </div>

        <!-- Group 4: Paragraph & Alignment -->
        <div class="flex items-center gap-0.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('justifyLeft')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="बायां संरेखण (Left - Ctrl+L)">
            <i class="fa-solid fa-align-left text-xs"></i>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('justifyCenter')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="मध्य संरेखण (Center - Ctrl+E)">
            <i class="fa-solid fa-align-center text-xs"></i>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('justifyRight')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="दायां संरेखण (Right - Ctrl+R)">
            <i class="fa-solid fa-align-right text-xs"></i>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('justifyFull')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="समान संरेखण (Justify - Ctrl+J)">
            <i class="fa-solid fa-align-justify text-xs"></i>
          </button>

          <div class="w-px h-4 bg-slate-700 mx-0.5"></div>

          <!-- Bullet & Numbered List -->
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('insertUnorderedList')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="बुलेट सूची (Bullets)">
            <i class="fa-solid fa-list-ul text-xs"></i>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('insertOrderedList')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="क्रमांकित सूची (Numbers)">
            <i class="fa-solid fa-list-ol text-xs"></i>
          </button>

          <!-- Indent -->
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('outdent')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="इंडेंट घटाएं (Decrease Indent)">
            <i class="fa-solid fa-outdent text-xs"></i>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('indent')"
            class="w-7 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded cursor-pointer"
            title="इंडेंट बढ़ाएं (Increase Indent)">
            <i class="fa-solid fa-indent text-xs"></i>
          </button>
        </div>

        <!-- Group 5: MS Word Table Tools -->
        <div class="flex items-center gap-1 bg-blue-950/60 p-1 rounded-lg border border-blue-800/80"
          title="MS Word तालिका टूल्स (Rows & Columns)">
          <span class="text-[10px] text-blue-300 font-bold px-1 hidden md:inline">तालिका:</span>
          
          <!-- Add Row Above / Below -->
          <button type="button" onmousedown="event.preventDefault()" onclick="insertTableRowAbove()"
            class="px-1.5 py-0.5 bg-slate-900 hover:bg-blue-600 text-blue-200 hover:text-white rounded border border-slate-700 text-[11px] font-semibold transition cursor-pointer flex items-center gap-0.5"
            title="पंक्ति ऊपर जोड़ें (Insert Row Above)">
            <i class="fa-solid fa-arrow-up text-[9px]"></i>
            <span>+पंक्ति</span>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="insertTableRowBelow()"
            class="px-1.5 py-0.5 bg-slate-900 hover:bg-blue-600 text-blue-200 hover:text-white rounded border border-slate-700 text-[11px] font-semibold transition cursor-pointer flex items-center gap-0.5"
            title="पंक्ति नीचे जोड़ें (Insert Row Below)">
            <i class="fa-solid fa-arrow-down text-[9px]"></i>
            <span>+पंक्ति</span>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="deleteCurrentTableRow()"
            class="px-1.5 py-0.5 bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-800/60 text-[11px] font-semibold transition cursor-pointer flex items-center gap-0.5"
            title="चयनित पंक्ति हटाएं (Delete Row)">
            <i class="fa-solid fa-trash-can text-[9px]"></i>
            <span>-पंक्ति</span>
          </button>

          <div class="w-px h-4 bg-blue-800 mx-0.5"></div>

          <!-- Add Col Left / Right -->
          <button type="button" onmousedown="event.preventDefault()" onclick="insertTableColLeft()"
            class="px-1.5 py-0.5 bg-slate-900 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded border border-slate-700 text-[11px] font-semibold transition cursor-pointer flex items-center gap-0.5"
            title="कॉलम बाएं जोड़ें (Insert Column Left)">
            <i class="fa-solid fa-arrow-left text-[9px]"></i>
            <span>+कॉलम</span>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="insertTableColRight()"
            class="px-1.5 py-0.5 bg-slate-900 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded border border-slate-700 text-[11px] font-semibold transition cursor-pointer flex items-center gap-0.5"
            title="कॉलम दाएं जोड़ें (Insert Column Right)">
            <i class="fa-solid fa-arrow-right text-[9px]"></i>
            <span>+कॉलम</span>
          </button>
          <button type="button" onmousedown="event.preventDefault()" onclick="deleteCurrentTableCol()"
            class="px-1.5 py-0.5 bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white rounded border border-rose-800/60 text-[11px] font-semibold transition cursor-pointer flex items-center gap-0.5"
            title="चयनित कॉलम हटाएं (Delete Column)">
            <i class="fa-solid fa-trash-can text-[9px]"></i>
            <span>-कॉलम</span>
          </button>

          <div class="w-px h-4 bg-blue-800 mx-0.5"></div>

          <!-- Auto-number Table -->
          <button type="button" onmousedown="event.preventDefault()" onclick="autoRenumberTableRows()"
            class="px-1.5 py-0.5 bg-amber-950/60 hover:bg-amber-600 text-amber-200 hover:text-white rounded border border-amber-800/60 text-[11px] font-semibold transition cursor-pointer"
            title="पंक्तियों का क्रमांक स्वतः 1, 2, 3... सही करें (Auto-Number 1, 2, 3...)">
            <span>🔢 1,2,3</span>
          </button>
        </div>

      </div>

      <!-- VIEWPORT & A4 DOCUMENT PAPER -->
      <div class="preview-viewport">"""

assert ribbon_target in content, "Ribbon target not found!"
content = content.replace(ribbon_target, ribbon_replacement, 1)

# 4. ADD TABLE QUICK FLOATING BAR RIGHT AFTER SELECTION MINI BAR
table_bar_target = """  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="letterToastContainer"
    class="no-print fixed bottom-5 right-5 z-[150] flex flex-col gap-2 pointer-events-none"></div>"""

table_bar_replacement = """  <!-- Floating Table Quick Action Bar (Appears when table cell is clicked) -->
  <div id="tableQuickBar" class="table-quick-bar no-print">
    <div class="flex items-center gap-1">
      <span class="text-[10px] font-bold text-sky-400 px-1">तालिका:</span>
      <button type="button" onmousedown="event.preventDefault()" onclick="insertTableRowAbove()" title="पंक्ति ऊपर जोड़ें">⬆️ +पंक्ति ऊपर</button>
      <button type="button" onmousedown="event.preventDefault()" onclick="insertTableRowBelow()" title="पंक्ति नीचे जोड़ें">⬇️ +पंक्ति नीचे</button>
      <button type="button" onmousedown="event.preventDefault()" onclick="deleteCurrentTableRow()" class="btn-del" title="पंक्ति हटाएं">🗑️ पंक्ति हटाएं</button>
      <span class="mini-bar-sep"></span>
      <button type="button" onmousedown="event.preventDefault()" onclick="insertTableColLeft()" title="कॉलम बाएं जोड़ें">⬅️ +कॉलम बाएं</button>
      <button type="button" onmousedown="event.preventDefault()" onclick="insertTableColRight()" title="कॉलम दाएं जोड़ें">➡️ +कॉलम दाएं</button>
      <button type="button" onmousedown="event.preventDefault()" onclick="deleteCurrentTableCol()" class="btn-del" title="कॉलम हटाएं">🗑️ कॉलम हटाएं</button>
      <span class="mini-bar-sep"></span>
      <button type="button" onmousedown="event.preventDefault()" onclick="autoRenumberTableRows()" title="क्रमांक 1, 2, 3... सही करें">🔢 ऑटो-नंबर</button>
    </div>
  </div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="letterToastContainer"
    class="no-print fixed bottom-5 right-5 z-[150] flex flex-col gap-2 pointer-events-none"></div>"""

assert table_bar_target in content, "Table bar target not found!"
content = content.replace(table_bar_target, table_bar_replacement, 1)

# 5. ENHANCE JS WITH TABLE ROW/COL MANAGEMENT, KEYBOARD SHORTCUTS, TAB NAVIGATION & DRAG RESIZE
js_replacement = """    // ================= MS WORD TABLE & ROW / COLUMN MANAGEMENT =================
    let activeTableCell = null;
    let activeTableRow = null;
    let activeTableColIndex = 0;
    let activeTableRowIndex = 0;

    function updateActiveTableState(cell) {
      if (!cell) return;
      activeTableCell = cell;
      activeTableRow = cell.closest('tr');
      if (activeTableRow) {
        activeTableColIndex = Array.from(activeTableRow.children).indexOf(cell);
        if (docTableTbody && docTableTbody.contains(activeTableRow)) {
          activeTableRowIndex = Array.from(docTableTbody.children).indexOf(activeTableRow);
        }
      }
      updateTableRowColBadges();
      positionTableQuickBar(cell);
    }

    function updateTableRowColBadges() {
      const rowBadge = document.getElementById('tableRowCountBadge');
      const colBadge = document.getElementById('tableColCountBadge');
      if (rowBadge && docTableTbody) rowBadge.innerText = `${docTableTbody.children.length} पंक्तियाँ`;
      if (colBadge && docTableTheadTr) colBadge.innerText = `${docTableTheadTr.children.length} कॉलम`;
    }

    function positionTableQuickBar(cell) {
      const bar = document.getElementById('tableQuickBar');
      if (!bar || !cell) return;
      const rect = cell.getBoundingClientRect();
      if (rect.width > 0 && rect.top > 0) {
        bar.style.position = 'fixed';
        bar.style.top = Math.max(56, rect.top - 44) + 'px';
        bar.style.left = Math.max(10, Math.min(window.innerWidth - 460, rect.left)) + 'px';
        bar.classList.add('visible');
      }
    }

    // 1. Insert Row Above
    window.insertTableRowAbove = function () {
      if (!docTableTbody || !docTableTheadTr) return;
      const colCount = docTableTheadTr.children.length;
      const tr = document.createElement('tr');
      for (let i = 0; i < colCount; i++) {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.style.padding = "5px 8px";
        td.innerText = i === 0 ? '-' : 'नया विवरण';
        tr.appendChild(td);
      }

      const targetRow = (activeTableRow && docTableTbody.contains(activeTableRow)) ? activeTableRow : docTableTbody.firstElementChild;
      if (targetRow) {
        docTableTbody.insertBefore(tr, targetRow);
      } else {
        docTableTbody.appendChild(tr);
      }

      autoRenumberTableRows(false);
      applyTableStyles();
      attachTableEventListeners();
      initTableColumnResizing();
      triggerA4Check();
      updateTableRowColBadges();
      if (tr.children[1]) tr.children[1].focus();
      if (window.showLetterToast) window.showLetterToast('नई पंक्ति ऊपर जोड़ी गई', 'success');
    };

    // 2. Insert Row Below
    window.insertTableRowBelow = function () {
      if (!docTableTbody || !docTableTheadTr) return;
      const colCount = docTableTheadTr.children.length;
      const tr = document.createElement('tr');
      for (let i = 0; i < colCount; i++) {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.style.padding = "5px 8px";
        td.innerText = i === 0 ? '-' : 'नया विवरण';
        tr.appendChild(td);
      }

      const targetRow = (activeTableRow && docTableTbody.contains(activeTableRow)) ? activeTableRow : docTableTbody.lastElementChild;
      if (targetRow && targetRow.nextElementSibling) {
        docTableTbody.insertBefore(tr, targetRow.nextElementSibling);
      } else {
        docTableTbody.appendChild(tr);
      }

      autoRenumberTableRows(false);
      applyTableStyles();
      attachTableEventListeners();
      initTableColumnResizing();
      triggerA4Check();
      updateTableRowColBadges();
      if (tr.children[1]) tr.children[1].focus();
      if (window.showLetterToast) window.showLetterToast('नई पंक्ति नीचे जोड़ी गई', 'success');
    };

    // 3. Delete Current Row
    window.deleteCurrentTableRow = function () {
      if (!docTableTbody) return;
      if (docTableTbody.children.length <= 1) {
        if (window.showLetterToast) window.showLetterToast('तालिका में कम से कम 1 पंक्ति होना आवश्यक है', 'error');
        return;
      }

      const rowToDelete = (activeTableRow && docTableTbody.contains(activeTableRow)) ? activeTableRow : docTableTbody.lastElementChild;
      if (rowToDelete) {
        const nextRow = rowToDelete.nextElementSibling || rowToDelete.previousElementSibling;
        rowToDelete.remove();
        activeTableRow = nextRow;
        autoRenumberTableRows(false);
        triggerA4Check();
        updateTableRowColBadges();
        if (window.showLetterToast) window.showLetterToast('पंक्ति हटाई गई', 'success');
      }
    };

    // 4. Insert Column Left
    window.insertTableColLeft = function () {
      if (!docTableTheadTr || !docTableTbody) return;
      const targetIndex = Math.max(0, activeTableColIndex);

      const th = document.createElement('th');
      th.contentEditable = "true";
      th.style.padding = "5px 8px";
      th.innerText = 'नया कॉलम';
      if (docTableTheadTr.children[targetIndex]) {
        docTableTheadTr.insertBefore(th, docTableTheadTr.children[targetIndex]);
      } else {
        docTableTheadTr.appendChild(th);
      }

      Array.from(docTableTbody.children).forEach(row => {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.style.padding = "5px 8px";
        td.innerText = '-';
        if (row.children[targetIndex]) {
          row.insertBefore(td, row.children[targetIndex]);
        } else {
          row.appendChild(td);
        }
      });

      applyTableStyles();
      attachTableEventListeners();
      initTableColumnResizing();
      triggerA4Check();
      updateTableRowColBadges();
      if (window.showLetterToast) window.showLetterToast('नया कॉलम बाईं ओर जोड़ा गया', 'success');
    };

    // 5. Insert Column Right
    window.insertTableColRight = function () {
      if (!docTableTheadTr || !docTableTbody) return;
      const targetIndex = activeTableColIndex + 1;

      const th = document.createElement('th');
      th.contentEditable = "true";
      th.style.padding = "5px 8px";
      th.innerText = 'नया कॉलम';
      if (docTableTheadTr.children[targetIndex]) {
        docTableTheadTr.insertBefore(th, docTableTheadTr.children[targetIndex]);
      } else {
        docTableTheadTr.appendChild(th);
      }

      Array.from(docTableTbody.children).forEach(row => {
        const td = document.createElement('td');
        td.contentEditable = "true";
        td.style.padding = "5px 8px";
        td.innerText = '-';
        if (row.children[targetIndex]) {
          row.insertBefore(td, row.children[targetIndex]);
        } else {
          row.appendChild(td);
        }
      });

      applyTableStyles();
      attachTableEventListeners();
      initTableColumnResizing();
      triggerA4Check();
      updateTableRowColBadges();
      if (window.showLetterToast) window.showLetterToast('नया कॉलम दाईं ओर जोड़ा गया', 'success');
    };

    // 6. Delete Current Column
    window.deleteCurrentTableCol = function () {
      if (!docTableTheadTr || !docTableTbody) return;
      if (docTableTheadTr.children.length <= 1) {
        if (window.showLetterToast) window.showLetterToast('तालिका में कम से कम 1 कॉलम होना आवश्यक है', 'error');
        return;
      }

      const targetIndex = (activeTableColIndex >= 0 && activeTableColIndex < docTableTheadTr.children.length)
        ? activeTableColIndex
        : (docTableTheadTr.children.length - 1);

      if (docTableTheadTr.children[targetIndex]) {
        docTableTheadTr.children[targetIndex].remove();
      }

      Array.from(docTableTbody.children).forEach(row => {
        if (row.children[targetIndex]) {
          row.children[targetIndex].remove();
        }
      });

      activeTableColIndex = Math.max(0, targetIndex - 1);
      triggerA4Check();
      updateTableRowColBadges();
      initTableColumnResizing();
      if (window.showLetterToast) window.showLetterToast('कॉलम हटाया गया', 'success');
    };

    // 7. Auto-Renumber Table Rows (1, 2, 3...)
    window.autoRenumberTableRows = function (showToastNotify = true) {
      if (!docTableTbody) return;
      Array.from(docTableTbody.children).forEach((row, idx) => {
        const firstCell = row.firstElementChild;
        if (firstCell) {
          firstCell.innerText = `${idx + 1}.`;
        }
      });
      if (showToastNotify && window.showLetterToast) {
        window.showLetterToast('क्रमांक स्वतः सही किए गए (1, 2, 3...)', 'info');
      }
    };

    // 8. Distribute Columns Evenly
    window.distributeTableColumns = function () {
      if (!docTableTheadTr || docTableTheadTr.children.length === 0) return;
      const count = docTableTheadTr.children.length;
      const pct = Math.floor(100 / count);
      Array.from(docTableTheadTr.children).forEach((th, idx) => {
        th.style.width = idx === 0 && count > 2 ? '12%' : `${pct}%`;
      });
      triggerA4Check();
      if (window.showLetterToast) window.showLetterToast('कॉलम चौड़ाई समान की गई', 'info');
    };

    // Attach Cell Listeners for Focus, Click, and Tab Key (MS Word standard)
    function attachTableEventListeners() {
      if (!docCustomTable) return;
      const cells = docCustomTable.querySelectorAll('th, td');
      cells.forEach(cell => {
        cell.addEventListener('focus', () => updateActiveTableState(cell));
        cell.addEventListener('click', () => updateActiveTableState(cell));
        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const allTds = Array.from(docCustomTable.querySelectorAll('tbody td'));
            const curIdx = allTds.indexOf(cell);

            if (e.shiftKey) {
              if (curIdx > 0) {
                allTds[curIdx - 1].focus();
              }
            } else {
              if (curIdx === allTds.length - 1) {
                // At last cell! Automatically insert row below like MS Word!
                window.insertTableRowBelow();
                const updatedTds = Array.from(docCustomTable.querySelectorAll('tbody td'));
                if (updatedTds[curIdx + 2]) {
                  updatedTds[curIdx + 2].focus();
                }
              } else if (curIdx >= 0 && curIdx < allTds.length - 1) {
                allTds[curIdx + 1].focus();
              }
            }
          }
        });
      });
    }

    // Column Drag Resizing for Tables
    function initTableColumnResizing() {
      if (!docCustomTable || !docTableTheadTr) return;

      docTableTheadTr.querySelectorAll('.col-resizer').forEach(r => r.remove());

      const ths = docTableTheadTr.querySelectorAll('th');
      ths.forEach((th, idx) => {
        if (idx === ths.length - 1) return;
        th.style.position = 'relative';

        const resizer = document.createElement('div');
        resizer.className = 'col-resizer no-print';
        th.appendChild(resizer);

        let startX = 0;
        let startThWidth = 0;
        let nextTh = th.nextElementSibling;
        let startNextWidth = 0;

        const onMouseDown = (e) => {
          e.preventDefault();
          e.stopPropagation();
          startX = e.clientX;
          startThWidth = th.offsetWidth;
          nextTh = th.nextElementSibling;
          startNextWidth = nextTh ? nextTh.offsetWidth : 0;
          resizer.classList.add('resizing');

          const onMouseMove = (moveEvent) => {
            const delta = moveEvent.clientX - startX;
            const newThWidth = Math.max(30, startThWidth + delta);
            th.style.width = newThWidth + 'px';
            if (nextTh && startNextWidth > 0) {
              const newNextWidth = Math.max(30, startNextWidth - delta);
              nextTh.style.width = newNextWidth + 'px';
            }
          };

          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            resizer.classList.remove('resizing');
            triggerA4Check();
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        };

        resizer.addEventListener('mousedown', onMouseDown);
      });
    }

    // Initialize Table Events and Resizing
    attachTableEventListeners();
    initTableColumnResizing();
    updateTableRowColBadges();

    // Hide table quick bar on click outside table
    document.addEventListener('mousedown', (e) => {
      if (e.target.closest('#tableQuickBar') || e.target.closest('#officeRibbonToolbar')) return;
      const bar = document.getElementById('tableQuickBar');
      if (bar && !e.target.closest('#doc-custom-table')) {
        bar.classList.remove('visible');
      }
    });

    // MS WORD KEYBOARD SHORTCUTS LISTENER
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (key === 'b') {
          e.preventDefault();
          window.letterRichExec('bold');
        } else if (key === 'i') {
          e.preventDefault();
          window.letterRichExec('italic');
        } else if (key === 'u') {
          e.preventDefault();
          window.letterRichExec('underline');
        } else if (key === 'z') {
          e.preventDefault();
          if (e.shiftKey) {
            window.letterRichExec('redo');
          } else {
            window.letterRichExec('undo');
          }
        } else if (key === 'y') {
          e.preventDefault();
          window.letterRichExec('redo');
        } else if (key === 'l') {
          e.preventDefault();
          window.letterRichExec('justifyLeft');
        } else if (key === 'e') {
          e.preventDefault();
          window.letterRichExec('justifyCenter');
        } else if (key === 'r') {
          e.preventDefault();
          window.letterRichExec('justifyRight');
        } else if (key === 'j') {
          e.preventDefault();
          window.letterRichExec('justifyFull');
        } else if (key === ']' || (e.shiftKey && key === '>')) {
          e.preventDefault();
          window.smartChangeFontSize(1);
        } else if (key === '[' || (e.shiftKey && key === '<')) {
          e.preventDefault();
          window.smartChangeFontSize(-1);
        }
      }
    });"""

idx = content.rfind('btnAddTableRow')
assert idx != -1, "btnAddTableRow in JS not found!"
idx_start = content.rfind('// Add / Remove Row', 0, idx)
assert idx_start != -1, "// Add / Remove Row comment not found!"
idx_end = content.find('// Capture & Restore Table State helper', idx)
assert idx_end != -1, "// Capture & Restore Table State helper comment not found!"

content = content[:idx_start] + js_replacement + "\n\n    " + content[idx_end:]

# Also update updateAllFontSizeDisplays to update ribbon displays
old_fn = """      if (canvasFontSizeBadge) canvasFontSizeBadge.innerText = str;
      if (miniBarFontSize) miniBarFontSize.innerText = str;
      if (sidebarFontSizeBadge) sidebarFontSizeBadge.innerText = str;
      if (fontScaleDisplay) fontScaleDisplay.innerText = str;"""

new_fn = """      if (canvasFontSizeBadge) canvasFontSizeBadge.innerText = str;
      if (miniBarFontSize) miniBarFontSize.innerText = str;
      if (sidebarFontSizeBadge) sidebarFontSizeBadge.innerText = str;
      if (fontScaleDisplay) fontScaleDisplay.innerText = str;
      const ribbonFontSizeDisplay = document.getElementById('ribbonFontSizeDisplay');
      const ribbonFontSizeSelect = document.getElementById('ribbonFontSizeSelect');
      if (ribbonFontSizeDisplay) ribbonFontSizeDisplay.innerText = str;
      if (ribbonFontSizeSelect && !isNaN(num)) {
        const rounded = String(Math.round(num));
        if ([...ribbonFontSizeSelect.options].some(o => o.value === rounded)) {
          ribbonFontSizeSelect.value = rounded;
        }
      }"""

assert old_fn in content, "Old updateAllFontSizeDisplays not found!"
content = content.replace(old_fn, new_fn, 1)

# Also make sure setLetterFont updates ribbonFontFamily
old_set_font = """      if (fontSelectTop) fontSelectTop.value = fontKey;
      if (fontSelectSidebar) fontSelectSidebar.value = fontKey;"""

new_set_font = """      if (fontSelectTop) fontSelectTop.value = fontKey;
      if (fontSelectSidebar) fontSelectSidebar.value = fontKey;
      const ribbonFontFamily = document.getElementById('ribbonFontFamily');
      const miniBarFontFamily = document.getElementById('miniBarFontFamily');
      if (ribbonFontFamily) ribbonFontFamily.value = fontKey;
      if (miniBarFontFamily) miniBarFontFamily.value = fontKey;"""

assert old_set_font in content, "old_set_font not found!"
content = content.replace(old_set_font, new_set_font, 1)

with open('pms_letter_generator.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully applied MS Word text editing & table features!")
