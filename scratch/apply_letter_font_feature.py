# Script to apply font increase/decrease feature to pms_letter_generator.html
import re

with open('pms_letter_generator.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add CSS for selection mini-bar and custom-sized-text
css_target = """    .subject-bar {
      border-left: 3.5px solid #000000;
      padding-left: 8px;
    }"""

css_replacement = """    .subject-bar {
      border-left: 3.5px solid #000000;
      padding-left: 8px;
    }

    /* Custom Sized Text & Selection Mini-Bar */
    .custom-sized-text {
      display: inline;
      line-height: inherit;
    }

    .custom-font-text {
      display: inline;
      line-height: inherit;
    }

    .selection-mini-bar {
      position: fixed;
      z-index: 9999;
      display: none;
      align-items: center;
      gap: 3px;
      padding: 4px 6px;
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

    .selection-mini-bar.visible {
      display: flex !important;
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .selection-mini-bar button {
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
      min-width: 24px;
      height: 24px;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }

    .selection-mini-bar button:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .selection-mini-bar select {
      background: #1e293b;
      border: 1px solid #334155;
      color: #e2e8f0;
      border-radius: 5px;
      padding: 2px 5px;
      font-size: 10px;
      height: 24px;
      outline: none;
      cursor: pointer;
    }

    .selection-mini-bar select:hover,
    .selection-mini-bar select:focus {
      border-color: #38bdf8;
      color: #fde047;
    }

    .mini-bar-sep {
      width: 1px;
      height: 16px;
      background: #334155;
      margin: 0 2px;
    }"""

assert css_target in content, "CSS target not found!"
content = content.replace(css_target, css_replacement, 1)

# 2. Update Top Header Toolbar Font Scaler
top_target = """      <!-- Letter Font Size Scaler (A- / 100% / A+) -->
      <div class="flex items-center bg-slate-900/90 rounded-lg border border-slate-700/80 p-0.5 shadow-inner"
        title="पत्र का फॉन्ट आकार (A4 में फिट करने हेतु)">
        <button id="fontDecBtn" type="button"
          class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-bold transition flex items-center gap-1 cursor-pointer"
          title="फॉन्ट छोटा करें (Font Size -)">
          <span>A-</span>
        </button>
        <span id="fontScaleDisplay"
          class="px-1.5 text-[11px] font-mono font-bold text-amber-400 select-none">100%</span>
        <button id="fontIncBtn" type="button"
          class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-bold transition flex items-center gap-1 cursor-pointer"
          title="फॉन्ट बड़ा करें (Font Size +)">
          <span>A+</span>
        </button>
      </div>"""

top_replacement = """      <!-- Letter Font Size Scaler (A- / 100% / A+ / Exact px) -->
      <div class="flex items-center bg-slate-900/90 rounded-lg border border-slate-700/80 p-0.5 shadow-inner"
        title="फॉन्ट आकार: चयनित टेक्स्ट या सम्पूर्ण पत्र (A- / A+)">
        <button id="fontDecBtn" type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(-1)"
          class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-bold transition flex items-center gap-1 cursor-pointer"
          title="फॉन्ट छोटा करें (A-) [चयनित टेक्स्ट या सम्पूर्ण पत्र]">
          <span class="text-xs">A−</span>
        </button>
        <span id="fontScaleDisplay"
          class="px-1.5 text-[11px] font-mono font-bold text-amber-400 select-none min-w-[38px] text-center"
          title="वर्तमान फॉन्ट स्केल या आकार">100%</span>
        <button id="fontIncBtn" type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(1)"
          class="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-bold transition flex items-center gap-1 cursor-pointer"
          title="फॉन्ट बड़ा करें (A+) [चयनित टेक्स्ट या सम्पूर्ण पत्र]">
          <span class="text-xs">A+</span>
        </button>
        <select id="fontSizeSelectTop" onmousedown="event.stopPropagation()" onchange="smartSetExactFontSize(parseFloat(this.value))"
          class="hidden sm:inline-block bg-slate-800 text-amber-300 font-semibold border-l border-slate-700 px-1.5 py-0.5 text-[11px] focus:outline-none cursor-pointer rounded-r"
          title="फॉन्ट साइज सीधे चुनें">
          <option value="12">12px</option>
          <option value="13">13px</option>
          <option value="14">14px</option>
          <option value="15" selected>15px (मानक)</option>
          <option value="16">16px</option>
          <option value="17">17px</option>
          <option value="18">18px (बड़ा)</option>
          <option value="20">20px</option>
          <option value="22">22px</option>
          <option value="24">24px (शीर्षक)</option>
        </select>
      </div>"""

assert top_target in content, "Top target not found!"
content = content.replace(top_target, top_replacement, 1)

# 3. Add Font Size Controller Card to Tab 4 in Sidebar
sidebar_target = """            <!-- Font Preview Box -->
            <div class="bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 text-xs">
              <div class="text-[10px] text-slate-400 mb-1">फॉन्ट पूर्वावलोकन (Preview):</div>
              <div id="fontSampleText" class="text-[13.5px] font-semibold text-amber-200">
                कार्यालय पुलिस मॉडर्न स्कूल, 25वीं वाहिनी पीएसी, रायबरेली।
              </div>
            </div>
          </div>

          <!-- Document Line Spacing & Margins -->"""

sidebar_replacement = """            <!-- Font Preview Box -->
            <div class="bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 text-xs">
              <div class="text-[10px] text-slate-400 mb-1">फॉन्ट पूर्वावलोकन (Preview):</div>
              <div id="fontSampleText" class="text-[13.5px] font-semibold text-amber-200">
                कार्यालय पुलिस मॉडर्न स्कूल, 25वीं वाहिनी पीएसी, रायबरेली।
              </div>
            </div>
          </div>

          <!-- Font Size & Scale Controller Card -->
          <div class="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <i class="fa-solid fa-text-height text-sky-400"></i>
                <span>फॉन्ट आकार (Font Size & Scale)</span>
              </label>
              <span id="sidebarFontSizeBadge"
                class="text-[11px] bg-slate-950 text-amber-300 font-mono px-2 py-0.5 rounded border border-slate-700 font-bold">15.5px</span>
            </div>

            <!-- Big A- / A+ Action Buttons -->
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(-1)"
                class="flex items-center justify-center gap-2 py-2 bg-slate-900 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 font-bold text-sm transition shadow-sm cursor-pointer"
                title="चयनित टेक्स्ट या सम्पूर्ण पत्र का फॉन्ट छोटा करें">
                <span class="text-base font-black">A−</span>
                <span class="text-xs">छोटा करें</span>
              </button>
              <button type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(1)"
                class="flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg border border-blue-500 font-bold text-sm transition shadow-sm cursor-pointer"
                title="चयनित टेक्स्ट या सम्पूर्ण पत्र का फॉन्ट बड़ा करें">
                <span class="text-base font-black">A+</span>
                <span class="text-xs">बड़ा करें</span>
              </button>
            </div>

            <!-- Quick Size Presets -->
            <div>
              <div class="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                <span>त्वरित साइज (Quick Presets):</span>
                <select id="fontSizeSelectSidebar" onchange="smartSetExactFontSize(parseFloat(this.value))"
                  class="bg-slate-900 text-amber-300 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] cursor-pointer">
                  <option value="12">12px</option>
                  <option value="13">13px</option>
                  <option value="14">14px</option>
                  <option value="15" selected>15px</option>
                  <option value="16">16px</option>
                  <option value="17">17px</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                  <option value="22">22px</option>
                  <option value="24">24px</option>
                </select>
              </div>
              <div class="grid grid-cols-4 gap-1">
                <button type="button" onmousedown="event.preventDefault()" onclick="smartSetExactFontSize(13)"
                  class="px-1.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-semibold text-center cursor-pointer">
                  13px
                </button>
                <button type="button" onmousedown="event.preventDefault()" onclick="smartSetExactFontSize(15)"
                  class="px-1.5 py-1 bg-slate-900 hover:bg-slate-700 text-amber-300 rounded border border-slate-700 text-[11px] font-semibold text-center cursor-pointer">
                  15px <span class="text-[9px] text-slate-400">मानक</span>
                </button>
                <button type="button" onmousedown="event.preventDefault()" onclick="smartSetExactFontSize(17)"
                  class="px-1.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-semibold text-center cursor-pointer">
                  17px <span class="text-[9px] text-slate-400">बड़ा</span>
                </button>
                <button type="button" onmousedown="event.preventDefault()" onclick="smartSetExactFontSize(20)"
                  class="px-1.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-semibold text-center cursor-pointer">
                  20px <span class="text-[9px] text-slate-400">शीर्षक</span>
                </button>
              </div>
            </div>

            <!-- Whole Document Scale Preset Buttons -->
            <div>
              <div class="text-[11px] text-slate-400 mb-1">सम्पूर्ण पत्र स्केल (A4 Fit Scaler):</div>
              <div class="grid grid-cols-5 gap-1">
                <button type="button" onclick="setFontScale(90)"
                  class="px-1 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-mono text-center cursor-pointer">90%</button>
                <button type="button" onclick="setFontScale(95)"
                  class="px-1 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-mono text-center cursor-pointer">95%</button>
                <button type="button" onclick="setFontScale(100)"
                  class="px-1 py-1 bg-blue-950 text-blue-300 rounded border border-blue-700 text-[11px] font-mono text-center font-bold cursor-pointer">100%</button>
                <button type="button" onclick="setFontScale(105)"
                  class="px-1 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-mono text-center cursor-pointer">105%</button>
                <button type="button" onclick="setFontScale(110)"
                  class="px-1 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] font-mono text-center cursor-pointer">110%</button>
              </div>
            </div>

            <div class="text-[10px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800 leading-relaxed">
              💡 <b>सुझाव:</b> पत्र में किसी भी शब्द या पंक्ति को सेलेक्ट करके <b>A+</b> या <b>A−</b> दबाएं, केवल वही टेक्स्ट बड़ा या छोटा होगा!
            </div>
          </div>

          <!-- Document Line Spacing & Margins -->"""

assert sidebar_target in content, "Sidebar target not found!"
content = content.replace(sidebar_target, sidebar_replacement, 1)

# 4. Add Quick Font Size Pill to Preview Canvas Floating Bar
canvas_bar_target = """        <!-- Auto-Fit 1 Page Action Button -->
        <button id="autoFitBtn" type="button"
          class="bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white px-2.5 py-1 rounded-full font-bold border border-blue-500/40 transition flex items-center gap-1 cursor-pointer"
          title="फॉन्ट और स्पेसिंग को स्वतः सेट करें ताकि पत्र 1 पेज पर समा जाए">
          <i class="fa-solid fa-wand-magic-sparkles text-amber-300 text-xs"></i>
          <span>1-पेज ऑटो-फिट</span>
        </button>

        <div class="h-4 w-px bg-slate-700"></div>"""

canvas_bar_replacement = """        <!-- Auto-Fit 1 Page Action Button -->
        <button id="autoFitBtn" type="button"
          class="bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white px-2.5 py-1 rounded-full font-bold border border-blue-500/40 transition flex items-center gap-1 cursor-pointer"
          title="फॉन्ट और स्पेसिंग को स्वतः सेट करें ताकि पत्र 1 पेज पर समा जाए">
          <i class="fa-solid fa-wand-magic-sparkles text-amber-300 text-xs"></i>
          <span>1-पेज ऑटो-फिट</span>
        </button>

        <div class="h-4 w-px bg-slate-700"></div>

        <!-- Canvas Quick Font Size (A- / A+) -->
        <div class="flex items-center bg-slate-950/80 rounded-full border border-slate-700 px-1 py-0.5 text-xs shadow-inner"
          title="फॉन्ट आकार कम/ज्यादा करें (A- / A+)">
          <button id="canvasFontDecBtn" type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(-1)"
            class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition cursor-pointer"
            title="फॉन्ट छोटा करें (A-)">
            <span>A−</span>
          </button>
          <span id="canvasFontSizeBadge"
            class="px-2 text-[11px] font-mono font-bold text-amber-300 select-none">15.5px</span>
          <button id="canvasFontIncBtn" type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(1)"
            class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition cursor-pointer"
            title="फॉन्ट बड़ा करें (A+)">
            <span>A+</span>
          </button>
        </div>

        <div class="h-4 w-px bg-slate-700"></div>"""

assert canvas_bar_target in content, "Canvas bar target not found!"
content = content.replace(canvas_bar_target, canvas_bar_replacement, 1)

# 5. Add Selection Mini-Bar right before Toast Container
mini_bar_target = """  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="letterToastContainer"
    class="no-print fixed bottom-5 right-5 z-[150] flex flex-col gap-2 pointer-events-none"></div>"""

mini_bar_replacement = """  <!-- Floating Selection Mini-Bar (Appears right above selected text in letter) -->
  <div id="selectionMiniBar" class="selection-mini-bar no-print">
    <button type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(-1)"
      title="चयनित फॉन्ट छोटा करें (A-)">A−</button>
    <span id="miniBarFontSize" class="font-mono text-[10px] text-amber-300 px-1 font-bold">15.5px</span>
    <button type="button" onmousedown="event.preventDefault()" onclick="smartChangeFontSize(1)"
      title="चयनित फॉन्ट बड़ा करें (A+)">A+</button>
    <span class="mini-bar-sep"></span>
    <select id="miniBarFontFamily" onchange="applyFontFamilyToSelection(this.value)" onmousedown="event.stopPropagation()"
      title="चयनित टेक्स्ट का फॉन्ट बदलें">
      <option value="mangal">Mangal (मंगल)</option>
      <option value="aparajita">Aparajita (अपराजिता)</option>
      <option value="kokila">Kokila (कोकिला)</option>
      <option value="noto_serif">Noto Serif (नोटो सेरिफ)</option>
      <option value="noto_sans">Noto Sans (नोटो सेन्स)</option>
      <option value="martel">Martel (मार्टेल)</option>
      <option value="tiro">Tiro (तिरो देवनागरी)</option>
      <option value="karma">Karma (कर्मा)</option>
      <option value="utsaah">Utsaah (उत्साह)</option>
    </select>
    <span class="mini-bar-sep"></span>
    <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('bold')" title="बोल्ड (Ctrl+B)"><b>B</b></button>
    <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('italic')" title="इटैलिक (Ctrl+I)"><i>I</i></button>
    <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('underline')" title="अंडरलाइन (Ctrl+U)"><u>U</u></button>
    <button type="button" onmousedown="event.preventDefault()" onclick="letterApplyHighlight('#fef08a')" title="हाइलाइट (Highlight)" style="color: #facc15;">★</button>
    <button type="button" onmousedown="event.preventDefault()" onclick="letterRichExec('removeFormat')" title="फॉर्मेटिंग हटाएं (Clear Formatting)" style="color: #94a3b8; font-size: 10px;">Tx</button>
  </div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="letterToastContainer"
    class="no-print fixed bottom-5 right-5 z-[150] flex flex-col gap-2 pointer-events-none"></div>"""

assert mini_bar_target in content, "Mini bar target not found!"
content = content.replace(mini_bar_target, mini_bar_replacement, 1)

# 6. Replace and enhance the Font Size Scaler JS
js_target = """    // ================= FONT SIZE SCALER (BUG FIXED WITH NULL GUARDS & BOUNDS) =================
    let currentFontScale = 100;
    const fontScaleDisplay = document.getElementById('fontScaleDisplay');
    const fontIncBtn = document.getElementById('fontIncBtn');
    const fontDecBtn = document.getElementById('fontDecBtn');

    window.setFontScale = function (scalePercent) {
      currentFontScale = Math.max(80, Math.min(130, scalePercent));
      document.documentElement.style.setProperty('--letter-font-scale', (currentFontScale / 100));
      if (fontScaleDisplay) {
        fontScaleDisplay.innerText = currentFontScale + '%';
      }
      triggerA4Check();
    };

    if (fontIncBtn) {
      fontIncBtn.addEventListener('click', () => {
        window.setFontScale(currentFontScale + 5);
      });
    }

    if (fontDecBtn) {
      fontDecBtn.addEventListener('click', () => {
        window.setFontScale(currentFontScale - 5);
      });
    }"""

js_replacement = """    // ================= SMART FONT SIZE SCALER & SELECTION FORMATTING =================
    let currentFontScale = 100;
    let activeLetterSelection = null;
    let activeLetterTarget = null;

    const fontScaleDisplay = document.getElementById('fontScaleDisplay');
    const fontIncBtn = document.getElementById('fontIncBtn');
    const fontDecBtn = document.getElementById('fontDecBtn');

    // Update all font size & scale indicators across toolbars and sidebar
    function updateAllFontSizeDisplays(size, isPercentage = false) {
      const fontScaleDisplay = document.getElementById('fontScaleDisplay');
      const canvasFontSizeBadge = document.getElementById('canvasFontSizeBadge');
      const miniBarFontSize = document.getElementById('miniBarFontSize');
      const sidebarFontSizeBadge = document.getElementById('sidebarFontSizeBadge');
      const fontSizeSelectTop = document.getElementById('fontSizeSelectTop');
      const fontSizeSelectSidebar = document.getElementById('fontSizeSelectSidebar');

      if (isPercentage) {
        if (fontScaleDisplay) fontScaleDisplay.innerText = size + '%';
        if (canvasFontSizeBadge) canvasFontSizeBadge.innerText = Math.round(15.5 * (size / 100) * 10) / 10 + 'px';
        if (sidebarFontSizeBadge) sidebarFontSizeBadge.innerText = Math.round(15.5 * (size / 100) * 10) / 10 + 'px';
        return;
      }

      const num = typeof size === 'number' ? size : parseFloat(size);
      const str = isNaN(num) ? String(size) : (num + 'px');

      if (canvasFontSizeBadge) canvasFontSizeBadge.innerText = str;
      if (miniBarFontSize) miniBarFontSize.innerText = str;
      if (sidebarFontSizeBadge) sidebarFontSizeBadge.innerText = str;
      if (fontScaleDisplay) fontScaleDisplay.innerText = str;

      if (!isNaN(num)) {
        const rounded = String(Math.round(num));
        if (fontSizeSelectTop && [...fontSizeSelectTop.options].some(o => o.value === rounded)) {
          fontSizeSelectTop.value = rounded;
        }
        if (fontSizeSelectSidebar && [...fontSizeSelectSidebar.options].some(o => o.value === rounded)) {
          fontSizeSelectSidebar.value = rounded;
        }
      }
    }

    // Set Document-wide Font Scale (%)
    window.setFontScale = function (scalePercent) {
      currentFontScale = Math.max(80, Math.min(130, scalePercent));
      document.documentElement.style.setProperty('--letter-font-scale', (currentFontScale / 100));
      updateAllFontSizeDisplays(currentFontScale, true);
      triggerA4Check();
    };

    // Apply font size directly to a DOM selection Range
    function applyFontSizeToLetterRange(range, val, isDelta = true) {
      try {
        let parent = range.commonAncestorContainer;
        if (parent.nodeType === 3) parent = parent.parentElement;

        let curSize = 15.5;
        if (parent) {
          const comp = window.getComputedStyle(parent);
          curSize = parseFloat(parent.style.fontSize) || parseFloat(comp.fontSize) || 15.5;
        }

        const newSize = isDelta ? Math.max(9, Math.min(48, Math.round(curSize + val))) : val;

        // If parent is already a custom-sized-text span and range covers its contents
        if (parent && parent.tagName === 'SPAN' && parent.classList.contains('custom-sized-text') && range.toString() === parent.innerText) {
          parent.style.fontSize = newSize + 'px';
          updateAllFontSizeDisplays(newSize);
          triggerA4Check();
          if (window.showLetterToast) window.showLetterToast(`चयनित टेक्स्ट: ${newSize}px`, 'info');
          return;
        }

        const span = document.createElement('span');
        span.style.fontSize = newSize + 'px';
        span.className = 'custom-sized-text';

        const frag = range.extractContents();
        if (frag.querySelectorAll) {
          frag.querySelectorAll('.custom-sized-text, span[style*="font-size"]').forEach(inner => {
            inner.style.fontSize = '';
          });
        }
        span.appendChild(frag);
        range.insertNode(span);

        // Keep styled text selected so A+ / A- can be clicked repeatedly
        const sel = window.getSelection();
        sel.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        sel.addRange(newRange);
        activeLetterSelection = newRange.cloneRange();
        activeLetterTarget = span.closest('[contenteditable="true"]');

        updateAllFontSizeDisplays(newSize);
        triggerA4Check();
        if (window.showLetterToast) window.showLetterToast(`चयनित टेक्स्ट: ${newSize}px`, 'info');

        updateMiniBarPosition(newRange);
      } catch (err) {
        console.warn("applyFontSizeToLetterRange error:", err);
      }
    }

    // Smart Font Size Changer: Adjusts selected text if selected, else focused block, else whole letter
    window.smartChangeFontSize = function (deltaPx) {
      let sel = window.getSelection();
      let range = null;

      if (sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed) {
        range = sel.getRangeAt(0);
      } else if (activeLetterSelection && !activeLetterSelection.collapsed) {
        try {
          sel.removeAllRanges();
          sel.addRange(activeLetterSelection);
          range = activeLetterSelection;
        } catch (e) { }
      }

      // 1. If active selection inside #letterDocument
      if (range && !range.collapsed) {
        const common = range.commonAncestorContainer.nodeType === 3 ? range.commonAncestorContainer.parentElement : range.commonAncestorContainer;
        const letterDoc = document.getElementById('letterDocument');
        if (letterDoc && letterDoc.contains(common)) {
          applyFontSizeToLetterRange(range, deltaPx, true);
          return;
        }
      }

      // 2. If a specific editable element is focused inside #letterDocument
      if (activeLetterTarget && document.contains(activeLetterTarget)) {
        const comp = window.getComputedStyle(activeLetterTarget);
        const curSize = parseFloat(activeLetterTarget.style.fontSize) || parseFloat(comp.fontSize) || 15.5;
        const newSize = Math.max(9, Math.min(48, Math.round(curSize + deltaPx)));
        activeLetterTarget.style.fontSize = newSize + 'px';
        updateAllFontSizeDisplays(newSize);
        triggerA4Check();
        if (window.showLetterToast) window.showLetterToast(`ब्लॉक फॉन्ट: ${newSize}px`, 'info');
        return;
      }

      // 3. Fallback: Scale the entire letter document
      const nextScale = deltaPx > 0 ? (currentFontScale + 5) : (currentFontScale - 5);
      window.setFontScale(nextScale);
      if (window.showLetterToast) window.showLetterToast(`सम्पूर्ण पत्र स्केल: ${currentFontScale}%`, 'info');
    };

    // Set Exact Font Size (px)
    window.smartSetExactFontSize = function (px) {
      let sel = window.getSelection();
      let range = null;

      if (sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed) {
        range = sel.getRangeAt(0);
      } else if (activeLetterSelection && !activeLetterSelection.collapsed) {
        try {
          sel.removeAllRanges();
          sel.addRange(activeLetterSelection);
          range = activeLetterSelection;
        } catch (e) { }
      }

      if (range && !range.collapsed) {
        const common = range.commonAncestorContainer.nodeType === 3 ? range.commonAncestorContainer.parentElement : range.commonAncestorContainer;
        const letterDoc = document.getElementById('letterDocument');
        if (letterDoc && letterDoc.contains(common)) {
          applyFontSizeToLetterRange(range, px, false);
          return;
        }
      }

      if (activeLetterTarget && document.contains(activeLetterTarget)) {
        activeLetterTarget.style.fontSize = px + 'px';
        updateAllFontSizeDisplays(px);
        triggerA4Check();
        if (window.showLetterToast) window.showLetterToast(`ब्लॉक फॉन्ट: ${px}px`, 'info');
        return;
      }

      if (window.showLetterToast) window.showLetterToast('पहले टेक्स्ट चुनें जिसका फॉन्ट साइज बदलना है', 'info');
    };

    // Apply Specific Font Family to Selection or Document
    window.applyFontFamilyToSelection = function (fontFamilyKey) {
      let sel = window.getSelection();
      let range = null;

      if (sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed) {
        range = sel.getRangeAt(0);
      } else if (activeLetterSelection && !activeLetterSelection.collapsed) {
        try {
          sel.removeAllRanges();
          sel.addRange(activeLetterSelection);
          range = activeLetterSelection;
        } catch (e) { }
      }

      const f = HINDI_FONTS[fontFamilyKey];
      const cssFont = f ? f.cssBody : fontFamilyKey;

      if (range && !range.collapsed) {
        try {
          let parent = range.commonAncestorContainer;
          if (parent.nodeType === 3) parent = parent.parentElement;
          if (parent && parent.tagName === 'SPAN' && range.toString() === parent.innerText) {
            parent.style.fontFamily = cssFont;
            triggerA4Check();
            if (window.showLetterToast) window.showLetterToast(`फ़ॉन्ट: ${f ? f.name : fontFamilyKey}`, 'info');
            return;
          }
          const span = document.createElement('span');
          span.style.fontFamily = cssFont;
          span.className = 'custom-font-text';
          const frag = range.extractContents();
          span.appendChild(frag);
          range.insertNode(span);

          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          sel.removeAllRanges();
          sel.addRange(newRange);
          activeLetterSelection = newRange.cloneRange();
          triggerA4Check();
          if (window.showLetterToast) window.showLetterToast(`फ़ॉन्ट: ${f ? f.name : fontFamilyKey}`, 'info');
          return;
        } catch (e) {
          console.warn('applyFontFamilyToSelection error', e);
        }
      }

      // If no text selected, change whole document font
      window.setLetterFont(fontFamilyKey);
      if (window.showLetterToast) window.showLetterToast(`सम्पूर्ण पत्र फ़ॉन्ट बदला गया`, 'info');
    };

    // Mini-Bar Rich Text Exec (Bold, Italic, Underline, Format Clear)
    window.letterRichExec = function (cmd, value = null) {
      if (activeLetterTarget && document.contains(activeLetterTarget)) {
        activeLetterTarget.focus();
      }
      if (activeLetterSelection) {
        try {
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(activeLetterSelection);
        } catch (e) { }
      }
      try {
        document.execCommand('styleWithCSS', false, true);
      } catch (e) { }
      try {
        document.execCommand(cmd, false, value);
      } catch (e) { }
      triggerA4Check();
    };

    // Mini-Bar Highlight
    window.letterApplyHighlight = function (color = '#fef08a') {
      window.letterRichExec('hiliteColor', color);
    };

    // Position the Floating Mini-Bar right above the selected text
    function updateMiniBarPosition(range) {
      const miniBar = document.getElementById('selectionMiniBar');
      if (!miniBar || !range) return;

      const rect = range.getBoundingClientRect();
      if (rect.width > 0 && rect.top > 0) {
        miniBar.style.position = 'fixed';
        miniBar.style.top = Math.max(56, rect.top - 44) + 'px';
        miniBar.style.left = Math.max(10, Math.min(window.innerWidth - 320, rect.left + (rect.width / 2) - 150)) + 'px';
        miniBar.classList.add('visible');
      } else {
        miniBar.classList.remove('visible');
      }
    }

    // Track Selection State in #letterDocument
    function handleLetterSelectionChange() {
      const sel = window.getSelection();
      const miniBar = document.getElementById('selectionMiniBar');

      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        if (miniBar) miniBar.classList.remove('visible');
        return;
      }

      const range = sel.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const elem = container.nodeType === 3 ? container.parentElement : container;
      const letterDoc = document.getElementById('letterDocument');

      if (!letterDoc || !letterDoc.contains(elem)) {
        if (miniBar) miniBar.classList.remove('visible');
        return;
      }

      activeLetterSelection = range.cloneRange();
      activeLetterTarget = elem.closest('[contenteditable="true"]') || elem;

      // Update displayed font size
      const comp = window.getComputedStyle(elem);
      const curSize = Math.round(parseFloat(elem.style.fontSize) || parseFloat(comp.fontSize) || 15.5);
      updateAllFontSizeDisplays(curSize);

      updateMiniBarPosition(range);
    }

    // Attach listeners for selection tracking
    document.addEventListener('selectionchange', handleLetterSelectionChange);
    document.addEventListener('mouseup', handleLetterSelectionChange);
    document.addEventListener('keyup', handleLetterSelectionChange);

    // Reposition or hide on scroll / resize
    window.addEventListener('scroll', () => {
      if (activeLetterSelection && !activeLetterSelection.collapsed) {
        updateMiniBarPosition(activeLetterSelection);
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (activeLetterSelection && !activeLetterSelection.collapsed) {
        updateMiniBarPosition(activeLetterSelection);
      }
    }, { passive: true });

    // Hide mini-bar when clicking outside
    document.addEventListener('mousedown', (e) => {
      if (e.target.closest('#selectionMiniBar') ||
          e.target.closest('#fontDecBtn') ||
          e.target.closest('#fontIncBtn') ||
          e.target.closest('#canvasFontDecBtn') ||
          e.target.closest('#canvasFontIncBtn') ||
          e.target.closest('#fontSizeSelectTop') ||
          e.target.closest('#tabContentLayout')) {
        return;
      }
      const miniBar = document.getElementById('selectionMiniBar');
      if (miniBar && !e.target.closest('#letterDocument')) {
        miniBar.classList.remove('visible');
      }
    });

    if (fontIncBtn) {
      fontIncBtn.addEventListener('click', () => {
        window.smartChangeFontSize(1);
      });
    }

    if (fontDecBtn) {
      fontDecBtn.addEventListener('click', () => {
        window.smartChangeFontSize(-1);
      });
    }"""

assert js_target in content, "JS target not found!"
content = content.replace(js_target, js_replacement, 1)

with open('pms_letter_generator.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully applied font increase/decrease feature!")
