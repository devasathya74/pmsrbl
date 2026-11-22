/**
 * PMS Universal Word (.doc / .docx) Exporter v3.5 (Precision WYSIWYG Engine)
 * Police Modern School, 25th Bn PAC, Raebareli
 * 
 * Guarantees that downloaded .doc files match the screen/print preview 100%:
 * 1. Automatic Orientation Detection (A4 Portrait 210x297mm vs A4 Landscape 297x210mm).
 * 2. Neutralizes outer preview containers (prevents double margins & horizontal overflow).
 * 3. Normalizes font sizes & line-heights from CSS variables / rem / px to exact print points (pt).
 * 4. Converts CSS Flexbox & CSS Grid layouts into native Word <table> structures.
 * 5. Embeds local logos and images as Base64 data URIs so they display offline in MS Word.
 * 6. Ensures complete editable text in Microsoft Word, WPS Office, LibreOffice & Google Docs.
 * 7. Encodes with UTF-8 BOM (\ufeff) to protect Hindi / Devanagari Unicode glyphs.
 */

(function (window) {
  'use strict';

  /**
   * Convert an Image element to a Base64 data URL via Canvas
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
      // Tainted canvas or cross-origin fallback
    }
    try {
      return new URL(currentSrc, window.location.href).href;
    } catch (e) {
      return currentSrc;
    }
  }

  /**
   * Determine whether element or options imply Landscape orientation
   */
  function detectIsLandscape(sourceEl, options) {
    if (typeof options.landscape === 'boolean') {
      return options.landscape;
    }
    if (typeof options.isLandscape === 'boolean') {
      return options.isLandscape;
    }
    if (options.orientation === 'landscape') {
      return true;
    }
    if (options.orientation === 'portrait') {
      return false;
    }

    // Inspect classes & attributes
    const classStr = ((sourceEl.className || '') + ' ' + (document.body.className || '')).toLowerCase();
    if (classStr.includes('landscape') || classStr.includes('timetable') || classStr.includes('vama') || classStr.includes('shulk_panjika')) {
      return true;
    }

    // Inspect dimensions
    try {
      const rect = sourceEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.width > rect.height * 1.15) {
        return true;
      }
    } catch (e) {}

    // Check document print styles
    const styles = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join(' ');
    if (/@page\s*\{[^}]*size:\s*A4\s+landscape/i.test(styles) || /@page\s*\{[^}]*size:\s*297mm/i.test(styles)) {
      return true;
    }

    return false;
  }

  /**
   * Master Export Function
   */
  function exportElementToWord(elementOrId, options = {}) {
    let sourceEl = null;

    if (typeof elementOrId === 'string') {
      sourceEl = document.getElementById(elementOrId) || document.querySelector(elementOrId);
    } else if (elementOrId instanceof HTMLElement) {
      sourceEl = elementOrId;
    }

    // Fallback search if not specified or not found
    if (!sourceEl) {
      sourceEl = document.querySelector(
        '#printSheet, #printArea, .print-paper, .timetable-sheet, .paper-sheet, #letterDocument, .sheet-container, .a4-page, .report-paper, .doc-paper, #live-preview-container, .tbl-wrap table'
      );
    }

    if (!sourceEl) {
      console.warn('[PMS Word Export] Target element not found for Word export:', elementOrId);
      if (typeof window.showToast === 'function') {
        window.showToast('डाउनलोड करने के लिए कोई दस्तावेज़ नहीं मिला!', 'warning');
      }
      return;
    }

    const title = options.title || document.title || 'PMS Document';
    const isLandscape = detectIsLandscape(sourceEl, options);
    const safeTitle = (options.filename || title).replace(/[^a-zA-Z0-9_\u0900-\u097F\s-]/g, '').trim().replace(/\s+/g, '_');
    const filename = (safeTitle || 'PMS_Document') + '.doc';

    // 1. Deep Clone the Element
    const clone = sourceEl.cloneNode(true);

    // 2. Convert active form elements to static printable spans
    clone.querySelectorAll('input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="file"]):not([type="hidden"])').forEach(inp => {
      const span = document.createElement('span');
      span.textContent = inp.value !== undefined && inp.value !== null ? inp.value : (inp.getAttribute('value') || '');
      span.className = inp.className;
      inp.parentNode.replaceChild(span, inp);
    });

    clone.querySelectorAll('select').forEach(sel => {
      const span = document.createElement('span');
      const opt = sel.options && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex] : null;
      span.textContent = opt ? opt.textContent.trim() : (sel.value || '');
      span.className = sel.className;
      sel.parentNode.replaceChild(span, sel);
    });

    clone.querySelectorAll('textarea').forEach(ta => {
      const div = document.createElement('div');
      div.textContent = ta.value !== undefined ? ta.value : (ta.textContent || '');
      div.className = ta.className;
      ta.parentNode.replaceChild(div, ta);
    });

    // 3. Remove non-printable and interactive UI elements
    clone.querySelectorAll('.no-print, [data-no-print], button, input[type="file"], input[type="button"], input[type="submit"], script, noscript, .card-resize-handle, .drag-handle-pill, .modal, .overlay, .view-switch-bar').forEach(el => el.remove());

    // 4. Custom preProcess hook if provided by caller
    if (typeof options.preProcess === 'function') {
      try {
        options.preProcess(clone);
      } catch (err) {
        console.warn('[PMS Word Export] preProcess hook error:', err);
      }
    }

    // 5. Neutralize outer paper-sheet / print-paper containers so margins are not doubled
    const containerSelectors = [
      '.print-paper', '.paper-sheet', '.sheet-container', '.timetable-sheet',
      '#letterDocument', '#letterDocumentPage2', '.a4-document', '.a4-page', '.canvas-page', '.doc-paper', '.report-paper',
      '.print-page-chunk', '.sheet-paper', '.receipt-card', '.letter-paper',
      '.signboard-overlay-box', '.signboard-panel', '#noticeCanvas', '#letterDoc', '.pledge-container', '.a4-preview'
    ];
    containerSelectors.forEach(sel => {
      clone.querySelectorAll(sel).forEach(cont => {
        cont.style.width = '100%';
        cont.style.maxWidth = '100%';
        cont.style.minWidth = '100%';
        cont.style.minHeight = 'auto';
        cont.style.height = 'auto';
        cont.style.margin = '0 auto';
        cont.style.padding = '0';
        cont.style.boxShadow = 'none';
        cont.style.border = 'none';
        cont.style.borderColor = 'transparent';
        cont.style.outline = 'none';
        cont.style.outlineColor = 'transparent';
        cont.style.background = 'transparent';
      });
    });

    // If root clone itself is a paper container, neutralize it too
    if (clone.style) {
      clone.style.width = '100%';
      clone.style.maxWidth = '100%';
      clone.style.minHeight = 'auto';
      clone.style.height = 'auto';
      clone.style.margin = '0 auto';
      clone.style.padding = '0';
      clone.style.boxShadow = 'none';
      clone.style.border = 'none';
      clone.style.borderColor = 'transparent';
      clone.style.outline = 'none';
      clone.style.outlineColor = 'transparent';
      clone.style.background = 'transparent';
    }

    // 6. Convert Images to Base64 and assign explicit dimensions
    const originalImgs = sourceEl.querySelectorAll('img');
    const cloneImgs = clone.querySelectorAll('img');
    cloneImgs.forEach((img, idx) => {
      const orig = originalImgs[idx] || img;
      const b64 = imageToBase64DataUrl(orig);
      if (b64) {
        img.src = b64;
      }
      const renderedW = orig.offsetWidth || orig.naturalWidth || parseInt(orig.getAttribute('width')) || 65;
      const renderedH = orig.offsetHeight || orig.naturalHeight || parseInt(orig.getAttribute('height')) || 65;
      img.setAttribute('width', Math.min(renderedW, 120));
      img.setAttribute('height', Math.min(renderedH, 120));
      img.style.maxWidth = '100%';
      img.style.objectFit = 'contain';
      img.style.border = 'none';
    });

    // 7. Transform Flexbox & Grid Elements to native MS Word Tables
    // (A) 3-item Header with Logos: Left Logo + Center Title + Right Logo
    clone.querySelectorAll('.flex.items-center.justify-between, .flex.justify-between.items-center, [class*="justify-between"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
      
      if (children.length === 3) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-bottom: 6pt;');
        const tr = document.createElement('tr');

        // Left Logo
        const td1 = document.createElement('td');
        td1.setAttribute('style', 'width: 15%; text-align: center; vertical-align: middle; border: none;');
        td1.appendChild(children[0]);
        tr.appendChild(td1);

        // Center Title
        const td2 = document.createElement('td');
        td2.setAttribute('style', 'width: 70%; text-align: center; vertical-align: middle; border: none; padding: 0 4pt;');
        td2.appendChild(children[1]);
        tr.appendChild(td2);

        // Right Logo
        const td3 = document.createElement('td');
        td3.setAttribute('style', 'width: 15%; text-align: center; vertical-align: middle; border: none;');
        td3.appendChild(children[2]);
        tr.appendChild(td3);

        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      } else if (children.length === 2) {
        // 2-item Bar (e.g. Reference & Date, Session & Date)
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 2pt; margin-bottom: 4pt;');
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.setAttribute('align', 'left');
        td1.setAttribute('style', 'border: none; text-align: left; vertical-align: middle; width: 50%;');
        td1.appendChild(children[0]);

        const td2 = document.createElement('td');
        td2.setAttribute('align', 'right');
        td2.setAttribute('style', 'border: none; text-align: right; vertical-align: middle; width: 50%;');
        td2.appendChild(children[1]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // (B) Right-aligned Signatory Blocks (.flex.justify-end)
    clone.querySelectorAll('.flex.justify-end, [class*="justify-end"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
      if (children.length === 1) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 18pt; margin-bottom: 8pt;');
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

    // (C) Signatures / Multi-column Blocks (2 or 3 items)
    clone.querySelectorAll('.sheet-signatures, .signatures-row, .signatures-grid, [class*="signatures"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
      if (children.length >= 2) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 18pt; margin-bottom: 6pt;');
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

    // (D) 2-Column Grids (.grid.grid-cols-2)
    clone.querySelectorAll('.grid.grid-cols-2, [class*="grid-cols-2"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
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

    // (E) 4-Column Grids (.grid.grid-cols-4, candidate details bar)
    clone.querySelectorAll('.grid.grid-cols-4, [class*="grid-cols-4"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
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
          td.setAttribute('style', 'border: none; padding: 3pt 5pt; font-size: 8pt; width: 25%; vertical-align: middle;' + (idx === 3 ? ' text-align: right;' : ' text-align: left;'));
          td.appendChild(c);
          tr.appendChild(td);
        });
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // (F) Quiz Grids (.quiz-grid)
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

    // (G) Essay Cards (.essay-card)
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

    // (H) Fix Existing Data Tables
    clone.querySelectorAll('table').forEach(tbl => {
      tbl.setAttribute('width', '100%');
      tbl.style.width = '100%';
      tbl.style.borderCollapse = 'collapse';
      tbl.style.msoTableLspace = '0pt';
      tbl.style.msoTableRspace = '0pt';
    });

    // 8. Build Word Document HTML with MSO Styles
    const baseFontSize = isLandscape ? '8pt' : '10pt';
    const bodyLineHeight = isLandscape ? '1.2' : '1.35';

    const wordHtml = `
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
            color: #0f172a;
            line-height: ${bodyLineHeight};
            margin: 0;
            padding: 0;
            background: #ffffff;
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
          table.data-table, table.sheet-table, table.fee-table, table.table-bordered, table[border="1"], table[border="0.5"] {
            border: 0.5pt solid #334155;
          }
          table.data-table th, table.sheet-table th, table.fee-table th, table[border="1"] th {
            border: 0.5pt solid #334155;
            background-color: #f1f5f9;
            padding: ${isLandscape ? '2pt 3pt' : '3.5pt 5pt'};
            font-weight: bold;
            font-size: ${isLandscape ? '7.5pt' : '9pt'};
            text-align: center;
          }
          table.data-table td, table.sheet-table td, table.fee-table td, table[border="1"] td {
            border: 0.5pt solid #94a3b8;
            padding: ${isLandscape ? '1.5pt 3pt' : '3pt 4.5pt'};
            font-size: ${isLandscape ? '7.5pt' : '9pt'};
          }

          /* Headings */
          h1 { font-size: 14pt; font-weight: bold; text-align: center; margin: 2pt 0; line-height: 1.2; }
          h2 { font-size: 12pt; font-weight: bold; text-align: center; margin: 2pt 0; line-height: 1.2; }
          h3 { font-size: 10pt; font-weight: bold; text-align: center; margin: 1pt 0; line-height: 1.2; }
          h4, h5, h6 { font-size: 9pt; font-weight: bold; margin: 1pt 0; }
          p { margin: 2pt 0 4pt 0; }

          /* Typography Utilities */
          .text-center, [align="center"] { text-align: center !important; }
          .text-right, [align="right"] { text-align: right !important; }
          .text-left, [align="left"] { text-align: left !important; }
          .text-justify { text-align: justify !important; }
          
          .text-xs, .text-\\[10px\\], .text-\\[11px\\] { font-size: 7.5pt !important; }
          .text-sm, .text-\\[12px\\], .text-\\[13px\\] { font-size: 8.5pt !important; }
          .text-base, .text-\\[14px\\], .text-\\[15px\\] { font-size: 9.5pt !important; }
          .text-lg, .text-\\[16px\\] { font-size: 11pt !important; font-weight: bold !important; }
          .text-xl, .text-\\[18px\\] { font-size: 12.5pt !important; font-weight: bold !important; }
          .text-2xl, .text-\\[20px\\] { font-size: 14pt !important; font-weight: bold !important; }
          .text-3xl { font-size: 16pt !important; font-weight: bold !important; }

          .font-bold, .font-extrabold, .font-black, strong, b { font-weight: bold !important; }
          .font-semibold { font-weight: bold !important; }
          .font-normal { font-weight: normal !important; }
          .italic, em, i { font-style: italic !important; }
          .underline, u { text-decoration: underline !important; }
          .uppercase { text-transform: uppercase !important; }

          /* Border Utilities */
          .border { border: 0.5pt solid #cbd5e1 !important; }
          .border-2 { border: 1pt solid #000000 !important; }
          .border-b { border-bottom: 0.75pt solid #000000 !important; }
          .border-b-2 { border-bottom: 1.5pt solid #000000 !important; }
          .border-t { border-top: 0.75pt solid #000000 !important; }
          .border-t-2 { border-top: 1.5pt solid #000000 !important; }

          /* Backgrounds */
          .bg-slate-50, .bg-neutral-50, .bg-gray-50 { background-color: #f8fafc !important; }
          .bg-slate-100, .bg-neutral-100, .bg-gray-100 { background-color: #f1f5f9 !important; }
          .bg-amber-50, .bg-yellow-50 { background-color: #fffbeb !important; }
          .bg-amber-100, .bg-yellow-100 { background-color: #fef3c7 !important; }
          .bg-orange-50 { background-color: #fff7ed !important; }
          .bg-orange-100 { background-color: #ffedd5 !important; }
          .bg-white { background-color: #ffffff !important; }

          /* Document Containers Outline & Border No-Color */
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
          .page-break, .paper-sheet + .paper-sheet, .timetable-sheet + .timetable-sheet, .print-page-chunk + .print-page-chunk {
            page-break-before: always;
            mso-special-character: line-break;
          }
        </style>
      </head>
      <body>
        <div class="Section1">
          ${clone.innerHTML}
        </div>
      </body>
      </html>
    `;

    // 9. Generate UTF-8 BOM Blob and trigger Download
    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Toast feedback
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
