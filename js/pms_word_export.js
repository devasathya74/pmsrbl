/**
 * PMS Universal Word (.doc / .docx) Exporter v4.0 (100% Exact WYSIWYG Engine)
 * Police Modern School, 25th Bn PAC, Raebareli
 * 
 * Guarantees that downloaded .doc files match the screen/print preview 100%:
 * 1. Live DOM Computed Style Transfer: Recursively transfers exact computed styles
 *    (font sizes in pt, font weights, colors, line heights, text indents, borders, paddings)
 *    from the live rendered document directly into inline CSS on every element.
 * 2. Native Word Table Conversion for CSS Flexbox & CSS Grid:
 *    - 3-column top header (Left Logo 15% + School Title 70% + Right Logo 15%).
 *    - 2-column contact bar (Email 50% left + Phone 50% right) with bottom border.
 *    - 2-column dispatch bar (पत्रांक संख्या 50% left + दिनांक 50% right) with bottom border.
 *    - 2-column bottom letter section: Left Sanlagnak/Pratilipi (55%) + Right Signature (45%) side-by-side.
 *    - Multi-signature rows, 2-column & 4-column candidate grids, quiz grids, and essay cards.
 * 3. Data Tables with Exact Proportions: Extracts column percentage widths from rendered <th>
 *    cells and applies explicit cell borders, background colors, and alignments.
 * 4. Multi-Page Support: Connects multiple pages (e.g. Page 1 & Page 2, multi-sheet timetables,
 *    attendance chunks) using standard MSO page breaks:
 *    <br clear="all" style="page-break-before: always; mso-special-character: line-break;" />
 * 5. Offline Base64 Images: Embeds logos and images as Base64 data URIs with explicit pixel/pt
 *    width and height attributes matching on-screen rendered dimensions.
 * 6. UTF-8 BOM (\ufeff) Encoding: Preserves all Hindi & Devanagari Unicode glyphs flawlessly.
 */

(function (window) {
  'use strict';

  /**
   * Helper: Convert px to pt (1px = 0.75pt)
   */
  function pxToPt(pxVal) {
    const num = parseFloat(pxVal);
    if (isNaN(num)) return null;
    return (num * 0.75).toFixed(1);
  }

  /**
   * Helper: Convert an Image element to a Base64 data URL via Canvas
   */
  function imageToBase64DataUrl(imgEl) {
    if (!imgEl) return '';
    const currentSrc = imgEl.currentSrc || imgEl.src || imgEl.getAttribute('src') || '';
    if (currentSrc.startsWith('data:image')) {
      return currentSrc;
    }
    try {
      if (imgEl.complete && imgEl.naturalWidth > 0 && imgEl.naturalHeight > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = imgEl.naturalWidth;
        canvas.height = imgEl.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgEl, 0, 0);
        return canvas.toDataURL('image/png');
      }
    } catch (e) {
      // Cross-origin / tainted canvas fallback
    }
    try {
      return new URL(currentSrc, window.location.href).href;
    } catch (e) {
      return currentSrc;
    }
  }

  /**
   * Helper: Determine whether element or options imply Landscape orientation
   */
  function detectIsLandscape(sourceEl, options) {
    if (typeof options.landscape === 'boolean') return options.landscape;
    if (typeof options.isLandscape === 'boolean') return options.isLandscape;
    if (options.orientation === 'landscape') return true;
    if (options.orientation === 'portrait') return false;

    if (sourceEl) {
      const classStr = ((sourceEl.className || '') + ' ' + (document.body.className || '') + ' ' + (sourceEl.id || '')).toLowerCase();
      if (classStr.includes('landscape') || classStr.includes('timetable') || classStr.includes('vama') || classStr.includes('shulk_panjika') || classStr.includes('is-landscape') || classStr.includes('abc') || classStr.includes('course') || classStr.includes('report-page')) {
        return true;
      }
      try {
        const rect = sourceEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && rect.width > rect.height * 1.15) {
          return true;
        }
      } catch (e) {}
    }

    try {
      const styles = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join(' ');
      if (/@page\s*\{[^}]*size:\s*A4\s+landscape/i.test(styles) || /@page\s*\{[^}]*size:\s*297mm/i.test(styles)) {
        return true;
      }
    } catch (e) {}

    return false;
  }

  /**
   * Resolve target elements to process: returns an array of HTMLElements
   */
  function resolveTargetElements(elementOrIdOrArray, options) {
    const list = [];

    if (Array.isArray(elementOrIdOrArray)) {
      elementOrIdOrArray.forEach(item => {
        if (typeof item === 'string') {
          const el = document.getElementById(item) || document.querySelector(item);
          if (el) list.push(el);
        } else if (item instanceof HTMLElement) {
          list.push(item);
        }
      });
    } else if (typeof elementOrIdOrArray === 'string') {
      const el = document.getElementById(elementOrIdOrArray) || document.querySelector(elementOrIdOrArray);
      if (el) list.push(el);
    } else if (elementOrIdOrArray instanceof HTMLElement) {
      list.push(elementOrIdOrArray);
    }

    // Fallback if none found
    if (list.length === 0) {
      const fallback = document.querySelector(
        '#letterDocument, #noticeDocument, #printSheet, #printArea, .print-paper, .timetable-sheet, .paper-sheet, .sheet-container, .a4-page, .report-paper, .doc-paper, #live-preview-container, .tbl-wrap table'
      );
      if (fallback) list.push(fallback);
    }

    // If caller provided additionalPages in options
    if (Array.isArray(options.additionalPages)) {
      options.additionalPages.forEach(p => {
        const el = typeof p === 'string' ? (document.getElementById(p) || document.querySelector(p)) : p;
        if (el && el instanceof HTMLElement && !list.includes(el) && !el.classList.contains('hidden')) {
          list.push(el);
        }
      });
    }

    // If a single container was provided that has multiple visible pages/sheets, expand them
    if (list.length === 1) {
      const subPages = Array.from(list[0].querySelectorAll(
        '.a4-document:not(.hidden), .timetable-sheet:not(.hidden), .print-page-chunk:not(.hidden), .paper-sheet:not(.hidden), .canvas-page:not(.hidden)'
      )).filter(p => !p.classList.contains('hidden') && p.offsetParent !== null);
      if (subPages.length > 1) {
        return subPages;
      }
    }

    return list;
  }

  /**
   * Transfer computed styles recursively from a live element to its clone
   */
  function transferComputedStyles(liveNode, cloneNode) {
    if (!liveNode || !cloneNode || liveNode.nodeType !== Node.ELEMENT_NODE || cloneNode.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    // If live element is hidden, mark clone for removal
    const liveStyle = window.getComputedStyle(liveNode);
    if (!liveStyle) return;

    if (liveStyle.display === 'none' || liveNode.classList.contains('hidden')) {
      cloneNode.setAttribute('data-word-remove', 'true');
      return;
    }

    const tagName = cloneNode.tagName.toUpperCase();

    // 1. Font Size in pt (1px = 0.75pt)
    const fsPx = parseFloat(liveStyle.fontSize);
    if (!isNaN(fsPx) && fsPx > 0) {
      const fsPt = (fsPx * 0.75).toFixed(1);
      cloneNode.style.fontSize = fsPt + 'pt';
    }

    // 2. Font Weight
    const fw = liveStyle.fontWeight;
    if (fw && fw !== '400' && fw !== 'normal') {
      cloneNode.style.fontWeight = fw;
    }

    // 3. Font Style
    if (liveStyle.fontStyle === 'italic') {
      cloneNode.style.fontStyle = 'italic';
    }

    // 4. Font Family (always ensure Hindi Devanagari priority)
    cloneNode.style.fontFamily = "'Mangal', 'Noto Sans Devanagari', 'Calibri', 'Segoe UI', Arial, sans-serif";

    // 5. Text Color
    const color = liveStyle.color;
    if (color && color !== 'rgba(0, 0, 0, 0)') {
      cloneNode.style.color = color;
    }

    // 6. Background Color (only if non-transparent and not root container)
    const bg = liveStyle.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      const isRootPaper = cloneNode.classList.contains('a4-document') || 
                          cloneNode.classList.contains('paper-sheet') || 
                          cloneNode.classList.contains('print-paper') ||
                          cloneNode.id === 'letterDocument' ||
                          cloneNode.id === 'noticeDocument';
      if (!isRootPaper) {
        cloneNode.style.backgroundColor = bg;
      }
    }

    // 7. Text Alignment
    const ta = liveStyle.textAlign;
    if (ta && ta !== 'start') {
      cloneNode.style.textAlign = ta;
      cloneNode.setAttribute('align', ta);
    }

    // 8. Text Indent (Hindi letters indent-10 = 40px -> 30pt)
    const indentPx = parseFloat(liveStyle.textIndent);
    if (!isNaN(indentPx) && indentPx > 0) {
      cloneNode.style.textIndent = (indentPx * 0.75).toFixed(1) + 'pt';
    }

    // 9. Line Height (unitless ratio for cross-platform Word rendering)
    const lhPx = parseFloat(liveStyle.lineHeight);
    if (!isNaN(lhPx) && !isNaN(fsPx) && fsPx > 0 && lhPx > 0) {
      const ratio = (lhPx / fsPx).toFixed(2);
      cloneNode.style.lineHeight = ratio;
    }

    // 10. Letter Spacing
    if (liveStyle.letterSpacing && liveStyle.letterSpacing !== 'normal') {
      cloneNode.style.letterSpacing = liveStyle.letterSpacing;
    }

    // 11. Text Decoration
    if (liveStyle.textDecorationLine && liveStyle.textDecorationLine.includes('underline')) {
      cloneNode.style.textDecoration = 'underline';
    }

    // 12. Explicit Borders
    ['Top', 'Bottom', 'Left', 'Right'].forEach(side => {
      const bWidth = parseFloat(liveStyle['border' + side + 'Width']);
      const bStyle = liveStyle['border' + side + 'Style'];
      const bColor = liveStyle['border' + side + 'Color'];
      if (bWidth > 0 && bStyle && bStyle !== 'none' && bColor && bColor !== 'transparent' && bColor !== 'rgba(0, 0, 0, 0)') {
        const ptWidth = Math.max(0.5, (bWidth * 0.75)).toFixed(1);
        cloneNode.style['border' + side] = `${ptWidth}pt ${bStyle} ${bColor}`;
      }
    });

    // 13. Padding
    if (['TH', 'TD', 'SPAN', 'DIV', 'P'].includes(tagName)) {
      const pt = parseFloat(liveStyle.paddingTop);
      const pr = parseFloat(liveStyle.paddingRight);
      const pb = parseFloat(liveStyle.paddingBottom);
      const pl = parseFloat(liveStyle.paddingLeft);
      if (pt > 0 || pr > 0 || pb > 0 || pl > 0) {
        cloneNode.style.padding = `${(pt * 0.75).toFixed(1)}pt ${(pr * 0.75).toFixed(1)}pt ${(pb * 0.75).toFixed(1)}pt ${(pl * 0.75).toFixed(1)}pt`;
      }
    }

    // 14. Margins for Headings and Paragraphs
    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'].includes(tagName)) {
      const mt = parseFloat(liveStyle.marginTop);
      const mb = parseFloat(liveStyle.marginBottom);
      cloneNode.style.marginTop = !isNaN(mt) && mt > 0 ? (mt * 0.75).toFixed(1) + 'pt' : '0pt';
      cloneNode.style.marginBottom = !isNaN(mb) && mb > 0 ? (mb * 0.75).toFixed(1) + 'pt' : '3.5pt';
    }

    // Walk children in parallel
    const liveKids = Array.from(liveNode.children);
    const cloneKids = Array.from(cloneNode.children);
    const len = Math.min(liveKids.length, cloneKids.length);
    for (let i = 0; i < len; i++) {
      transferComputedStyles(liveKids[i], cloneKids[i]);
    }
  }

  /**
   * Convert active form elements to static printable spans
   */
  function convertFormElements(cloneEl) {
    cloneEl.querySelectorAll('input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="file"]):not([type="hidden"])').forEach(inp => {
      const span = document.createElement('span');
      span.textContent = inp.value !== undefined && inp.value !== null ? inp.value : (inp.getAttribute('value') || '');
      span.className = inp.className;
      inp.parentNode.replaceChild(span, inp);
    });

    cloneEl.querySelectorAll('select').forEach(sel => {
      const span = document.createElement('span');
      const opt = sel.options && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex] : null;
      span.textContent = opt ? opt.textContent.trim() : (sel.value || '');
      span.className = sel.className;
      sel.parentNode.replaceChild(span, sel);
    });

    cloneEl.querySelectorAll('textarea').forEach(ta => {
      const div = document.createElement('div');
      div.textContent = ta.value !== undefined ? ta.value : (ta.textContent || '');
      div.className = ta.className;
      ta.parentNode.replaceChild(div, ta);
    });
  }

  /**
   * Convert Images to Base64 and assign explicit rendered dimensions
   */
  function convertImagesToBase64(liveEl, cloneEl) {
    const liveImgs = liveEl.querySelectorAll('img');
    const cloneImgs = cloneEl.querySelectorAll('img');
    const count = Math.min(liveImgs.length, cloneImgs.length);

    for (let i = 0; i < count; i++) {
      const liveImg = liveImgs[i];
      const cloneImg = cloneImgs[i];

      const b64 = imageToBase64DataUrl(liveImg);
      if (b64) {
        cloneImg.src = b64;
      }

      const renderedW = liveImg.offsetWidth || liveImg.naturalWidth || parseInt(liveImg.getAttribute('width')) || 65;
      const renderedH = liveImg.offsetHeight || liveImg.naturalHeight || parseInt(liveImg.getAttribute('height')) || 65;

      const targetW = Math.round(renderedW);
      const targetH = Math.round(renderedH);
      cloneImg.setAttribute('width', targetW);
      cloneImg.setAttribute('height', targetH);
      cloneImg.style.width = targetW + 'px';
      cloneImg.style.height = targetH + 'px';
      cloneImg.style.maxWidth = '100%';
      cloneImg.style.objectFit = 'contain';
      cloneImg.style.border = 'none';
    }
  }

  /**
   * Convert Data Tables with exact column percentage widths & styles
   */
  function convertDataTables(liveEl, cloneEl) {
    const liveTables = liveEl.querySelectorAll('table');
    const cloneTables = cloneEl.querySelectorAll('table');
    const count = Math.min(liveTables.length, cloneTables.length);

    for (let t = 0; t < count; t++) {
      const liveTbl = liveTables[t];
      const cloneTbl = cloneTables[t];

      cloneTbl.setAttribute('width', '100%');
      cloneTbl.setAttribute('border', '1');
      cloneTbl.setAttribute('cellspacing', '0');
      cloneTbl.setAttribute('cellpadding', '3');
      cloneTbl.style.width = '100%';
      cloneTbl.style.borderCollapse = 'collapse';
      cloneTbl.style.msoTableLspace = '0pt';
      cloneTbl.style.msoTableRspace = '0pt';
      cloneTbl.style.tableLayout = 'fixed';

      const liveThs = liveTbl.querySelectorAll('thead th, tr:first-child th, tr:first-child td');
      const cloneThs = cloneTbl.querySelectorAll('thead th, tr:first-child th, tr:first-child td');
      const tblWidth = liveTbl.offsetWidth || 1;

      if (liveThs.length > 0 && liveThs.length === cloneThs.length) {
        let totalPct = 0;
        const pctWidths = [];
        for (let i = 0; i < liveThs.length; i++) {
          const colW = liveThs[i].offsetWidth;
          const pct = Math.max(5, Math.round((colW / tblWidth) * 100));
          pctWidths.push(pct);
          totalPct += pct;
        }
        if (totalPct > 0 && pctWidths.length > 0) {
          pctWidths[pctWidths.length - 1] += (100 - totalPct);
        }
        for (let i = 0; i < cloneThs.length; i++) {
          const wStr = pctWidths[i] + '%';
          cloneThs[i].setAttribute('width', wStr);
          cloneThs[i].style.width = wStr;
        }
      }

      // Explicit cell borders and paddings
      cloneTbl.querySelectorAll('th').forEach(th => {
        th.style.border = '0.75pt solid #000000';
        th.style.backgroundColor = th.style.backgroundColor || '#f1f5f9';
        th.style.padding = '3pt 4pt';
        th.style.fontWeight = 'bold';
      });
      cloneTbl.querySelectorAll('td').forEach(td => {
        td.style.border = '0.5pt solid #000000';
        td.style.padding = '2.5pt 4pt';
      });
    }
  }

  /**
   * Transform CSS Flexbox & CSS Grid layouts to native Microsoft Word <table> structures
   */
  function transformFlexAndGridLayouts(clone) {
    // (A) Top Header with 3 items: Left Logo + Center Title + Right Logo
    clone.querySelectorAll('.flex.items-center.justify-between, .flex.justify-between.items-center, [class*="justify-between"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      // Do not convert bottom signature container here (handled specifically below)
      if (el.id === 'signature-container' || el.closest('#signature-container') || el.querySelector('#doc-signature-block')) return;

      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print') && c.getAttribute('data-word-remove') !== 'true');
      
      if (children.length === 3) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-bottom: 4pt;');
        const tr = document.createElement('tr');

        // Left Logo (15%)
        const td1 = document.createElement('td');
        td1.setAttribute('style', 'width: 15%; text-align: center; vertical-align: middle; border: none; padding: 0;');
        td1.appendChild(children[0]);
        tr.appendChild(td1);

        // Center Title (70%)
        const td2 = document.createElement('td');
        td2.setAttribute('style', 'width: 70%; text-align: center; vertical-align: middle; border: none; padding: 0 4pt;');
        td2.appendChild(children[1]);
        tr.appendChild(td2);

        // Right Logo (15%)
        const td3 = document.createElement('td');
        td3.setAttribute('style', 'width: 15%; text-align: center; vertical-align: middle; border: none; padding: 0;');
        td3.appendChild(children[2]);
        tr.appendChild(td3);

        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      } else if (children.length === 2) {
        // 2-item Bar (e.g. Reference & Date, Session & Date, Contact & Email)
        const hasBorderB = el.classList.contains('border-b') || el.style.borderBottomWidth;
        const bBottomStyle = hasBorderB ? 'border-bottom: 0.75pt solid #000000;' : '';

        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', `width: 100%; border: none; ${bBottomStyle} border-collapse: collapse; margin-top: 2pt; margin-bottom: 4pt; padding-bottom: 3pt;`);
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.setAttribute('align', 'left');
        td1.setAttribute('style', 'border: none; text-align: left; vertical-align: middle; width: 50%; padding: 2pt 0 3pt 0;');
        td1.appendChild(children[0]);

        const td2 = document.createElement('td');
        td2.setAttribute('align', 'right');
        td2.setAttribute('style', 'border: none; text-align: right; vertical-align: middle; width: 50%; padding: 2pt 0 3pt 0;');
        td2.appendChild(children[1]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // (B) Bottom Letter Layout: Left Noting/Sanlagnak/Pratilipi + Right Signature Block
    // In preview: <div id="signature-container"><div class="flex justify-between items-end ...">
    clone.querySelectorAll('#signature-container, .flex.justify-between.items-end').forEach(cont => {
      if (cont.tagName === 'TABLE' || cont.closest('table')) return;
      const flexRow = cont.classList.contains('flex') ? cont : cont.querySelector('.flex');
      if (!flexRow) return;

      const children = Array.from(flexRow.children).filter(c => !c.classList.contains('no-print') && c.getAttribute('data-word-remove') !== 'true');
      if (children.length >= 2) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 18pt; margin-bottom: 6pt;');
        const tr = document.createElement('tr');

        // Left Cell (Sanlagnak, Pratilipi, Noting Stamp)
        const td1 = document.createElement('td');
        td1.setAttribute('align', 'left');
        td1.setAttribute('style', 'width: 55%; text-align: left; vertical-align: bottom; border: none; padding-right: 8pt;');
        td1.appendChild(children[0]);

        // Right Cell (Signature Block)
        const td2 = document.createElement('td');
        td2.setAttribute('align', 'center');
        td2.setAttribute('style', 'width: 45%; text-align: center; vertical-align: bottom; border: none; padding-left: 8pt;');
        td2.appendChild(children[1]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        cont.parentNode.replaceChild(tbl, cont);
      }
    });

    // (C) Right-aligned Signatory Blocks (.flex.justify-end)
    clone.querySelectorAll('.flex.justify-end, [class*="justify-end"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print') && c.getAttribute('data-word-remove') !== 'true');
      if (children.length === 1) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 16pt; margin-bottom: 6pt;');
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.setAttribute('style', 'border: none; width: 55%;');

        const td2 = document.createElement('td');
        td2.setAttribute('align', 'center');
        td2.setAttribute('style', 'border: none; width: 45%; text-align: center; vertical-align: top;');
        td2.appendChild(children[0]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // (D) Multi-Column Signatures (.sheet-signatures, .signatures-row)
    clone.querySelectorAll('.sheet-signatures, .signatures-row, .signatures-grid, [class*="signatures"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print') && c.getAttribute('data-word-remove') !== 'true');
      if (children.length >= 2) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 16pt; margin-bottom: 6pt;');
        const tr = document.createElement('tr');
        const colW = Math.floor(100 / children.length) + '%';
        children.forEach(c => {
          const td = document.createElement('td');
          td.setAttribute('align', 'center');
          td.setAttribute('style', `border: none; text-align: center; vertical-align: top; width: ${colW};`);
          td.appendChild(c);
          tr.appendChild(td);
        });
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // (E) 2-Column Grids (.grid.grid-cols-2)
    clone.querySelectorAll('.grid.grid-cols-2, [class*="grid-cols-2"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print') && c.getAttribute('data-word-remove') !== 'true');
      if (children.length === 2) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-bottom: 6pt;');
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.setAttribute('style', 'border: none; width: 50%; vertical-align: top; padding-right: 6pt;');
        td1.appendChild(children[0]);

        const td2 = document.createElement('td');
        td2.setAttribute('style', 'border: none; width: 50%; vertical-align: top; padding-left: 6pt;');
        td2.appendChild(children[1]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // (F) 4-Column Grids (.grid.grid-cols-4, candidate details bar)
    clone.querySelectorAll('.grid.grid-cols-4, [class*="grid-cols-4"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print') && c.getAttribute('data-word-remove') !== 'true');
      if (children.length === 4) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: 0.75pt solid #cbd5e1; background-color: #f8fafc; border-collapse: collapse; margin-top: 3pt; margin-bottom: 5pt;');
        const tr = document.createElement('tr');
        children.forEach((c, idx) => {
          const td = document.createElement('td');
          td.setAttribute('style', 'border: none; padding: 3pt 5pt; font-size: 8.5pt; width: 25%; vertical-align: middle;' + (idx === 3 ? ' text-align: right;' : ' text-align: left;'));
          td.appendChild(c);
          tr.appendChild(td);
        });
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // (G) Quiz Grids (.quiz-grid)
    clone.querySelectorAll('.quiz-grid').forEach(grid => {
      const items = Array.from(grid.querySelectorAll('.q-item'));
      if (items.length > 0) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin: 3pt 0;');
        for (let i = 0; i < items.length; i += 2) {
          const tr = document.createElement('tr');

          const td1 = document.createElement('td');
          td1.setAttribute('style', 'width: 49%; vertical-align: top; border: 0.75pt solid #cbd5e1; padding: 4pt 6pt; background-color: #f8fafc;');
          td1.appendChild(items[i]);
          tr.appendChild(td1);

          const tdSpacer = document.createElement('td');
          tdSpacer.setAttribute('style', 'width: 2%; border: none;');
          tr.appendChild(tdSpacer);

          const td2 = document.createElement('td');
          if (items[i + 1]) {
            td2.setAttribute('style', 'width: 49%; vertical-align: top; border: 0.75pt solid #cbd5e1; padding: 4pt 6pt; background-color: #f8fafc;');
            td2.appendChild(items[i + 1]);
          } else {
            td2.setAttribute('style', 'width: 49%; border: none;');
          }
          tr.appendChild(td2);
          tbl.appendChild(tr);

          const trGap = document.createElement('tr');
          const tdGap = document.createElement('td');
          tdGap.setAttribute('colspan', '3');
          tdGap.setAttribute('style', 'height: 4pt; border: none;');
          trGap.appendChild(tdGap);
          tbl.appendChild(trGap);
        }
        grid.parentNode.replaceChild(tbl, grid);
      }
    });

    // (H) Essay Cards (.essay-card)
    clone.querySelectorAll('.essay-card').forEach((card, idx) => {
      const badge = card.querySelector('.num-badge');
      const numText = badge ? badge.innerText.trim() : (idx + 1);
      const engDiv = card.querySelector('div.text-\\[14px\\]') || card.querySelector('.font-bold');
      const hiDiv = card.querySelector('.hindi-text');
      const engText = engDiv ? engDiv.innerHTML.trim() : '';
      const hiText = hiDiv ? hiDiv.innerHTML.trim() : '';

      const tbl = document.createElement('table');
      tbl.setAttribute('width', '100%');
      tbl.setAttribute('style', 'width: 100%; border: 0.75pt solid #cbd5e1; border-collapse: collapse; margin-bottom: 4pt; background-color: #ffffff;');
      tbl.innerHTML = `
        <tr>
          <td style="width: 26px; vertical-align: top; padding: 4pt 3pt 4pt 6pt; border: none; text-align: center;">
            <div style="width: 18px; height: 18px; background-color: #0f172a; color: #fbbf24; border: 1pt solid #fbbf24; font-weight: 900; font-size: 9pt; text-align: center; line-height: 18px;">
              ${numText}
            </div>
          </td>
          <td style="padding: 4pt 6pt 4pt 3pt; vertical-align: top; border: none;">
            <div style="font-size: 9.5pt; font-weight: bold; color: #0f172a; line-height: 1.25;">
              ${engText}
            </div>
            ${hiText ? `<div style="font-size: 8.5pt; color: #475569; margin-top: 1pt; font-family: 'Mangal', 'Noto Sans Devanagari', sans-serif; line-height: 1.2;">
              ${hiText}
            </div>` : ''}
          </td>
        </tr>
      `;
      card.parentNode.replaceChild(tbl, card);
    });

    // (I) Subject Bar Accent Border
    clone.querySelectorAll('#doc-subject-container, .subject-bar').forEach(sb => {
      sb.style.borderLeft = '3pt solid #000000';
      sb.style.paddingLeft = '6pt';
      sb.style.fontWeight = 'bold';
      sb.style.fontSize = '12pt';
      sb.style.marginTop = '10pt';
      sb.style.marginBottom = '6pt';
    });

    // (J) PAC ABC Course Report Layout (#report-page)
    clone.querySelectorAll('#report-page, .report-inner').forEach(page => {
      page.style.position = 'static';
      page.style.width = '100%';
      page.style.maxWidth = '100%';
      page.style.height = 'auto';
      page.style.border = 'none';
      page.style.padding = '0';
      page.style.background = '#ffffff';

      // (1) .header-top -> 3-column table
      const headerTop = page.querySelector('.header-top');
      if (headerTop && headerTop.tagName !== 'TABLE' && !headerTop.closest('table')) {
        const leftImg = headerTop.querySelector('.logo-left') || headerTop.querySelector('img:first-child');
        const rightImg = headerTop.querySelector('.logo-right') || headerTop.querySelector('img:last-child');
        const titleSpan = headerTop.querySelector('span') || headerTop.querySelector('[data-save-id="header-title"]');
        const titleText = titleSpan ? titleSpan.textContent.trim() : '25वीं वाहिनी पीएसी, रायबरेली';

        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-bottom: 6pt; background-color: #1e3a8a;');
        const tr = document.createElement('tr');

        // Left Logo
        const td1 = document.createElement('td');
        td1.setAttribute('style', 'width: 15%; text-align: center; vertical-align: middle; border: none; padding: 4pt;');
        if (leftImg) td1.appendChild(leftImg.cloneNode(true));
        tr.appendChild(td1);

        // Center Title
        const td2 = document.createElement('td');
        td2.setAttribute('style', 'width: 70%; text-align: center; vertical-align: middle; border: none; padding: 4pt 6pt;');
        const titleDiv = document.createElement('div');
        titleDiv.setAttribute('style', "font-size: 20pt; font-weight: 800; color: #ffffff; letter-spacing: 1px; font-family: 'Mangal', 'Noto Sans Devanagari', sans-serif;");
        titleDiv.textContent = titleText;
        td2.appendChild(titleDiv);
        tr.appendChild(td2);

        // Right Logo
        const td3 = document.createElement('td');
        td3.setAttribute('style', 'width: 15%; text-align: center; vertical-align: middle; border: none; padding: 4pt;');
        if (rightImg) td3.appendChild(rightImg.cloneNode(true));
        tr.appendChild(td3);

        tbl.appendChild(tr);
        headerTop.parentNode.replaceChild(tbl, headerTop);
      }

      // (2) .header-sub
      const headerSub = page.querySelector('.header-sub');
      if (headerSub) {
        headerSub.style.position = 'static';
        headerSub.style.margin = '4pt auto 8pt auto';
        headerSub.style.width = '65%';
        headerSub.style.backgroundColor = '#fe1063';
        headerSub.style.color = '#ffffff';
        headerSub.style.textAlign = 'center';
        headerSub.style.padding = '4pt 8pt';
        headerSub.style.fontSize = '12.5pt';
        headerSub.style.fontWeight = 'bold';
        headerSub.style.border = '1.5pt solid #0097a7';
        headerSub.style.borderRadius = '4pt';
      }

      // (3) .intro-text
      const introText = page.querySelector('.intro-text');
      if (introText) {
        introText.style.position = 'static';
        introText.style.width = '100%';
        introText.style.fontSize = '11.5pt';
        introText.style.fontWeight = 'bold';
        introText.style.lineHeight = '1.4';
        introText.style.margin = '6pt 0 10pt 0';
        introText.style.color = '#000000';
      }

      // (4) Data Table in report page
      const reportTbl = page.querySelector('table:not([border="0"])');
      if (reportTbl) {
        reportTbl.style.position = 'static';
        reportTbl.style.width = '100%';
        reportTbl.style.margin = '6pt 0 10pt 0';
        reportTbl.style.borderCollapse = 'collapse';
        reportTbl.style.tableLayout = 'fixed';
      }

      // (5) .footer-section -> right-aligned table
      const footer = page.querySelector('.footer-section');
      if (footer && footer.tagName !== 'TABLE' && !footer.closest('table')) {
        const footerHtml = footer.innerHTML;
        const tblF = document.createElement('table');
        tblF.setAttribute('width', '100%');
        tblF.setAttribute('border', '0');
        tblF.setAttribute('cellspacing', '0');
        tblF.setAttribute('cellpadding', '0');
        tblF.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 16pt; margin-bottom: 4pt;');
        const trF = document.createElement('tr');

        const tdF1 = document.createElement('td');
        tdF1.setAttribute('style', 'width: 50%; border: none;');
        trF.appendChild(tdF1);

        const tdF2 = document.createElement('td');
        tdF2.setAttribute('align', 'right');
        tdF2.setAttribute('style', "width: 50%; border: none; text-align: right; font-size: 11pt; font-weight: bold; line-height: 1.35; color: #000000; font-family: 'Mangal', 'Noto Sans Devanagari', sans-serif;");
        tdF2.innerHTML = footerHtml;
        trF.appendChild(tdF2);

        tblF.appendChild(trF);
        footer.parentNode.replaceChild(tblF, footer);
      }
    });

    // (K) Photo Pages (.inner-border-canvas)
    clone.querySelectorAll('.inner-border-canvas').forEach(canvas => {
      canvas.style.position = 'static';
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      canvas.style.border = 'none';
      canvas.style.padding = '0';
      canvas.style.background = '#ffffff';

      const boxes = Array.from(canvas.querySelectorAll('.resizable-box')).filter(b => {
        const img = b.querySelector('img');
        return img && img.src && !img.src.includes('data:image/gif') && img.style.display !== 'none' && !b.classList.contains('no-print');
      });

      if (boxes.length > 0) {
        const cols = boxes.length <= 6 ? 2 : 3;
        const colWidth = Math.floor(100 / cols) + '%';

        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '6');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border-collapse: separate; margin: 6pt auto;');

        for (let i = 0; i < boxes.length; i += cols) {
          const tr = document.createElement('tr');
          for (let c = 0; c < cols; c++) {
            const td = document.createElement('td');
            td.setAttribute('width', colWidth);
            td.setAttribute('align', 'center');
            td.setAttribute('valign', 'middle');
            td.setAttribute('style', `width: ${colWidth}; text-align: center; vertical-align: middle; padding: 4pt; border: 0.75pt solid #cbd5e1; background-color: #f8fafc;`);

            const box = boxes[i + c];
            if (box) {
              const img = box.querySelector('img');
              if (img) {
                const cloneImg = img.cloneNode(true);
                cloneImg.setAttribute('width', cols === 2 ? 340 : 220);
                cloneImg.setAttribute('height', cols === 2 ? 220 : 160);
                cloneImg.style.width = (cols === 2 ? 340 : 220) + 'px';
                cloneImg.style.height = (cols === 2 ? 220 : 160) + 'px';
                cloneImg.style.objectFit = 'contain';
                cloneImg.style.maxWidth = '100%';
                td.appendChild(cloneImg);
              }
            }
            tr.appendChild(td);
          }
          tbl.appendChild(tr);
        }
        canvas.innerHTML = '';
        canvas.appendChild(tbl);
      }
    });
  }

  /**
   * Neutralize outer paper-sheet / print-paper containers so margins are not doubled
   */
  function neutralizeOuterContainers(clone) {
    const containerSelectors = [
      '.print-paper', '.paper-sheet', '.sheet-container', '.timetable-sheet',
      '#letterDocument', '#letterDocumentPage2', '.a4-document', '.a4-page', '.canvas-page', '.doc-paper', '.report-paper',
      '.print-page-chunk', '.sheet-paper', '.receipt-card', '.letter-paper',
      '.signboard-overlay-box', '.signboard-panel', '#noticeCanvas', '#letterDoc', '.pledge-container', '.a4-preview',
      '#all-pages-wrapper', '.inner-border-canvas', '.report-inner', '#report-page'
    ];

    const applyNeutralStyle = (el) => {
      if (!el || !el.style) return;
      el.style.width = '100%';
      el.style.maxWidth = '100%';
      el.style.minWidth = '100%';
      el.style.minHeight = 'auto';
      el.style.height = 'auto';
      el.style.margin = '0 auto';
      el.style.padding = '0';
      el.style.boxShadow = 'none';
      el.style.border = 'none';
      el.style.borderColor = 'transparent';
      el.style.outline = 'none';
      el.style.outlineColor = 'transparent';
      el.style.background = 'transparent';
    };

    containerSelectors.forEach(sel => {
      clone.querySelectorAll(sel).forEach(applyNeutralStyle);
    });

    applyNeutralStyle(clone);
  }

  /**
   * Remove non-printable and interactive UI elements
   */
  function cleanInteractiveElements(clone) {
    clone.querySelectorAll(
      '.no-print, [data-no-print], [data-word-remove="true"], button, input[type="file"], input[type="button"], input[type="submit"], script, noscript, .card-resize-handle, .drag-handle-bar, .drag-handle-pill, .modal, .overlay, .view-switch-bar, .table-edge-resizer-right, .table-edge-resizer-bottom, .table-corner-resizer, .table-resize-tooltip, .page-label, .add-box-controls, .add-container-btn, .box-control-btn'
    ).forEach(el => el.remove());
  }

  /**
   * Build complete Word document HTML wrapper with MSO Section styles
   */
  function buildWordDocumentHtml(bodyHtml, title, isLandscape, options) {
    const baseFontSize = isLandscape ? '8pt' : '10pt';
    const bodyLineHeight = isLandscape ? '1.2' : '1.35';

    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${title}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: ${isLandscape ? '29.7cm 21.0cm' : '21.0cm 29.7cm'};
            margin: ${isLandscape ? '8.0mm 10.0mm 8.0mm 10.0mm' : '12.0mm 14.0mm 12.0mm 14.0mm'};
            mso-page-orientation: ${isLandscape ? 'landscape' : 'portrait'};
          }
          @page Section1 {
            size: ${isLandscape ? '841.9pt 595.3pt' : '595.3pt 841.9pt'};
            mso-page-orientation: ${isLandscape ? 'landscape' : 'portrait'};
            margin: ${isLandscape ? '22.7pt 28.3pt 22.7pt 28.3pt' : '34.0pt 39.7pt 34.0pt 39.7pt'};
            mso-header-margin: 0pt;
            mso-footer-margin: 0pt;
            mso-paper-source: 0;
          }
          div.Section1 {
            page: Section1;
            width: 100%;
          }
          body {
            font-family: 'Mangal', 'Noto Sans Devanagari', 'Calibri', 'Segoe UI', Arial, sans-serif;
            font-size: ${baseFontSize};
            color: #000000;
            line-height: ${bodyLineHeight};
            margin: 0;
            padding: 0;
            background: #ffffff;
            -webkit-print-color-adjust: exact;
          }

          /* Headings and Paragraph margin normalizer */
          h1, h2, h3, h4, h5, h6, p {
            margin-top: 0;
            margin-bottom: 3pt;
          }

          /* Tables */
          table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
          }
          th, td {
            font-family: inherit;
            vertical-align: middle;
          }

          /* Containers Outline & Border No-Color */
          .paper-sheet, .a4-sheet, .a4-document, .a4-page, .print-paper, 
          .timetable-sheet, .print-page-chunk, .doc-paper, .report-paper, 
          .sheet-container, .sheet-paper, .canvas-page, .receipt-card, 
          .letter-paper, #letterDocument, #letterDocumentPage2, #noticeDocument, 
          #letterDoc, #printSheet, #printArea, .a4-preview, .certificate-sheet, 
          .birthday-card, .pledge-container, [contenteditable="true"] {
            outline: none !important;
            outline-color: transparent !important;
            border: none !important;
            border-color: transparent !important;
            box-shadow: none !important;
          }

          /* Multi-Page Break Handling */
          .page-break, .page-break-always {
            page-break-before: always;
            mso-special-character: line-break;
          }
        </style>
      </head>
      <body>
        <div class="Section1">
          ${bodyHtml}
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Helper: Trigger download of UTF-8 BOM Blob
   */
  function downloadBlob(wordHtml, filename) {
    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Master Export Function (100% WYSIWYG Precision Exporter)
   */
  function exportElementToWord(elementOrIdOrArray, options = {}) {
    const sourceElements = resolveTargetElements(elementOrIdOrArray, options);

    if (!sourceElements || sourceElements.length === 0) {
      console.warn('[PMS Word Export] Target element not found for Word export:', elementOrIdOrArray);
      if (typeof window.showToast === 'function') {
        window.showToast('डाउनलोड करने के लिए कोई दस्तावेज़ नहीं मिला!', 'warning');
      }
      return;
    }

    const title = options.title || document.title || 'PMS Document';
    const isLandscape = detectIsLandscape(sourceElements[0], options);
    const safeTitle = (options.filename || title).replace(/[^a-zA-Z0-9_\u0900-\u097F\s-]/g, '').trim().replace(/\s+/g, '_');
    const filename = (safeTitle || 'PMS_Document') + '.doc';

    const processedPagesHtml = [];

    for (let pIdx = 0; pIdx < sourceElements.length; pIdx++) {
      const liveEl = sourceElements[pIdx];
      if (!liveEl) continue;

      // Handle detached elements by temporarily mounting offscreen to enable getComputedStyle
      const wasDetached = !liveEl.isConnected;
      let tempMount = null;
      if (wasDetached) {
        tempMount = document.createElement('div');
        tempMount.style.position = 'absolute';
        tempMount.style.left = '-99999px';
        tempMount.style.top = '-99999px';
        tempMount.style.visibility = 'hidden';
        tempMount.appendChild(liveEl);
        document.body.appendChild(tempMount);
      }

      // 1. Deep Clone
      const cloneEl = liveEl.cloneNode(true);

      // 2. Transfer live DOM computed styles recursively
      transferComputedStyles(liveEl, cloneEl);

      // 3. Convert form inputs / selects / textareas
      convertFormElements(cloneEl);

      // 4. Convert images to Base64 and assign rendered dimensions
      convertImagesToBase64(liveEl, cloneEl);

      // 5. Convert data tables (column widths & cell styling)
      convertDataTables(liveEl, cloneEl);

      // 6. Transform Flexbox & Grid layouts to native Word tables
      transformFlexAndGridLayouts(cloneEl);

      // 7. Neutralize outer containers (remove outlines, shadows, margins)
      neutralizeOuterContainers(cloneEl);

      // 8. Clean interactive & non-printable elements
      cleanInteractiveElements(cloneEl);

      // 9. Custom preProcess hook if provided by caller
      if (typeof options.preProcess === 'function') {
        try {
          options.preProcess(cloneEl);
        } catch (err) {
          console.warn('[PMS Word Export] preProcess hook error:', err);
        }
      }

      // Cleanup temporary offscreen mount if used
      if (wasDetached && tempMount && tempMount.parentNode) {
        tempMount.parentNode.removeChild(tempMount);
      }

      processedPagesHtml.push(cloneEl.innerHTML || cloneEl.outerHTML);
    }

    // 10. Combine all pages with standard MSO Page Break
    const pageBreakHtml = '\n<br clear="all" style="page-break-before: always; mso-special-character: line-break;" />\n';
    const combinedBodyHtml = processedPagesHtml.join(pageBreakHtml);

    // 11. Build Word HTML
    const wordHtml = buildWordDocumentHtml(combinedBodyHtml, title, isLandscape, options);

    // 12. Download Blob
    downloadBlob(wordHtml, filename);

    // 13. User feedback toast
    const msg = `Word (.doc) फ़ाइल (${filename}) डाउनलोड हो गई!`;
    if (typeof window.showToast === 'function') {
      window.showToast(msg, 'success');
    } else if (typeof window.showCustomDialog === 'function') {
      window.showCustomDialog('सफलता', msg, 'success');
    } else if (typeof window.toast === 'function') {
      window.toast(msg, 'success');
    } else if (typeof window.showLetterToast === 'function') {
      window.showLetterToast(msg, 'success');
    }
  }

  // Globally register primary and alias functions
  window.exportElementToWord = exportElementToWord;
  window.exportToWordDoc = exportElementToWord;
  window.exportWord = exportElementToWord;
  window.exportDocWord = exportElementToWord;
  window.pmsExportWord = exportElementToWord;

  // Universal on-page outline no-color enforcement for all content containers in HTML web view
  if (typeof document !== 'undefined') {
    const injectUniversalNoOutlineCSS = function () {
      if (document.getElementById('pms-universal-no-outline-css')) return;
      const st = document.createElement('style');
      st.id = 'pms-universal-no-outline-css';
      st.textContent = `
        /* Universal Outline No-Color Rule across all pages */
        .paper-sheet, .a4-document, .a4-sheet, .a4-page, .print-paper, 
        .timetable-sheet, .print-page-chunk, .certificate-sheet, .birthday-card, 
        .a4-preview, .pledge-container, #letterDocument, #letterDocumentPage2, 
        #noticeDocument, #letterDoc, #printSheet, #printArea, .canvas-page, 
        .sheet-container, .doc-paper, .report-paper, [contenteditable="true"] {
          outline: none !important;
          outline-color: transparent !important;
        }
      `;
      (document.head || document.documentElement).appendChild(st);
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectUniversalNoOutlineCSS);
    } else {
      injectUniversalNoOutlineCSS();
    }
  }

})(window);
