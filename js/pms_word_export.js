/**
 * PMS Universal Word (.doc) Exporter
 * Police Modern School, 25th Bn PAC, Raebareli
 * 
 * Converts webapp pages and printable canvases into Microsoft Word (.doc) documents
 * that render 100% IDENTICALLY to on-screen / print preview.
 * 
 * Key Features:
 * - Polyfills CSS Flexbox & Grid into native Word-compatible <table> layouts.
 * - Converts 3-item headers (Logo - Center School Info - Logo) into 3-column tables.
 * - Converts 2-column flex bars (Session & Date, Ref & Date) into borderless 2-column tables.
 * - Converts right-aligned signatory blocks (justify-end) into 60/40 alignment tables.
 * - Converts 4-column candidate fill-in grids into styled 4-column tables.
 * - Converts quiz question grids into clean 2-column side-by-side question tables.
 * - Converts essay cards (.essay-card) into numbered badge tables.
 * - Full Devanagari Unicode support with UTF-8 BOM (\ufeff).
 * - Exact MS Word Print Layout XML (<w:View>Print</w:View>) with @page Section1 (Portrait/Landscape).
 */

(function (window) {
  'use strict';

  function exportElementToWord(elementOrId, options = {}) {
    let sourceEl = null;
    if (typeof elementOrId === 'string') {
      sourceEl = document.getElementById(elementOrId) || document.querySelector(elementOrId);
    } else if (elementOrId instanceof HTMLElement) {
      sourceEl = elementOrId;
    }

    if (!sourceEl) {
      console.warn('[PMS Word Export] Source element not found:', elementOrId);
      return;
    }

    const title = options.title || document.title || 'PMS Document';
    const isLandscape = !!options.landscape;
    const filename = (options.filename || title.replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, '_')) + '.doc';

    // 1. Clone source element to manipulate safely without touching DOM
    const clone = sourceEl.cloneNode(true);

    // 2. Convert form inputs/selects/textareas to plain text representations before removing controls
    clone.querySelectorAll('input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="file"]):not([type="hidden"])').forEach(inp => {
      const span = document.createElement('span');
      span.textContent = inp.value !== undefined ? inp.value : (inp.getAttribute('value') || '');
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

    // 2b. Remove all no-print, buttons, file/button inputs, scripts
    clone.querySelectorAll('.no-print, [data-no-print], button, input[type="file"], input[type="button"], input[type="submit"], script, noscript').forEach(el => el.remove());

    // 2c. Custom preProcess hook
    if (typeof options.preProcess === 'function') {
      try {
        options.preProcess(clone);
      } catch (err) {
        console.warn('[PMS Word Export] preProcess hook error:', err);
      }
    }

    // 3. Convert all images to absolute URLs
    clone.querySelectorAll('img').forEach(img => {
      try {
        const srcAttr = img.getAttribute('src');
        if (srcAttr) {
          img.src = new URL(srcAttr, window.location.href).href;
        }
      } catch (e) {
        // keep existing src
      }
    });

    // 4. Transform Header Flex with Logos: 3 children (Left Logo, Title, Right Logo)
    clone.querySelectorAll('.flex.items-center.justify-between, .flex.justify-between.items-center').forEach(el => {
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
        td1.setAttribute('style', 'width: 75px; text-align: center; vertical-align: middle; border: none;');
        td1.appendChild(children[0]);
        tr.appendChild(td1);

        // Center Title
        const td2 = document.createElement('td');
        td2.setAttribute('style', 'text-align: center; vertical-align: middle; border: none; padding: 0 8pt;');
        td2.appendChild(children[1]);
        tr.appendChild(td2);

        // Right Logo
        const td3 = document.createElement('td');
        td3.setAttribute('style', 'width: 75px; text-align: center; vertical-align: middle; border: none;');
        td3.appendChild(children[2]);
        tr.appendChild(td3);

        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // 5. Transform 2-column flex bars (Dispatch & Date, Session & Date, etc.)
    clone.querySelectorAll('.flex.justify-between, [class*="justify-between"]').forEach(el => {
      // Skip if already processed or inside table
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
      if (children.length === 2) {
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

    // 6. Transform Right-aligned Signatory Blocks (.flex.justify-end)
    clone.querySelectorAll('.flex.justify-end, [class*="justify-end"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
      if (children.length === 1) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-top: 20pt; margin-bottom: 10pt;');
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.setAttribute('style', 'border: none; width: 60%;');

        const td2 = document.createElement('td');
        td2.setAttribute('align', 'center');
        td2.setAttribute('style', 'border: none; width: 40%; text-align: center; vertical-align: top;');
        td2.appendChild(children[0]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // 7. Transform 2-Column Grids (.grid.grid-cols-2)
    clone.querySelectorAll('.grid.grid-cols-2, [class*="grid-cols-2"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
      if (children.length === 2) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin-bottom: 8pt;');
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.setAttribute('style', 'border: none; width: 50%; vertical-align: top; padding-right: 8pt;');
        td1.appendChild(children[0]);

        const td2 = document.createElement('td');
        td2.setAttribute('style', 'border: none; width: 50%; vertical-align: top; padding-left: 8pt;');
        td2.appendChild(children[1]);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // 8. Transform 4-Column Grids (.grid.grid-cols-4, like student information rows)
    clone.querySelectorAll('.grid.grid-cols-4, [class*="grid-cols-4"]').forEach(el => {
      if (el.tagName === 'TABLE' || el.closest('table')) return;
      const children = Array.from(el.children).filter(c => !c.classList.contains('no-print'));
      if (children.length === 4) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: 1pt solid #cbd5e1; background-color: #f8fafc; border-collapse: collapse; margin-top: 4pt; margin-bottom: 6pt;');
        const tr = document.createElement('tr');
        children.forEach((c, idx) => {
          const td = document.createElement('td');
          td.setAttribute('style', 'border: none; padding: 4pt 6pt; font-size: 8.5pt; width: 25%; vertical-align: middle;' + (idx === 3 ? ' text-align: right;' : ' text-align: left;'));
          td.appendChild(c);
          tr.appendChild(td);
        });
        tbl.appendChild(tr);
        el.parentNode.replaceChild(tbl, el);
      }
    });

    // 9. Transform Quiz Grids (.quiz-grid)
    clone.querySelectorAll('.quiz-grid').forEach(grid => {
      const items = Array.from(grid.querySelectorAll('.q-item'));
      if (items.length > 0) {
        const tbl = document.createElement('table');
        tbl.setAttribute('width', '100%');
        tbl.setAttribute('border', '0');
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('cellpadding', '0');
        tbl.setAttribute('style', 'width: 100%; border: none; border-collapse: collapse; margin: 4pt 0;');
        for (let i = 0; i < items.length; i += 2) {
          const tr = document.createElement('tr');

          const td1 = document.createElement('td');
          td1.setAttribute('style', 'width: 49%; vertical-align: top; border: 1pt solid #cbd5e1; padding: 6pt 8pt; background-color: #f8fafc;');
          td1.appendChild(items[i]);
          tr.appendChild(td1);

          const tdSpacer = document.createElement('td');
          tdSpacer.setAttribute('style', 'width: 2%; border: none;');
          tr.appendChild(tdSpacer);

          const td2 = document.createElement('td');
          if (items[i + 1]) {
            td2.setAttribute('style', 'width: 49%; vertical-align: top; border: 1pt solid #cbd5e1; padding: 6pt 8pt; background-color: #f8fafc;');
            td2.appendChild(items[i + 1]);
          } else {
            td2.setAttribute('style', 'width: 49%; border: none;');
          }
          tr.appendChild(td2);
          tbl.appendChild(tr);

          // Row gap
          const trGap = document.createElement('tr');
          const tdGap = document.createElement('td');
          tdGap.setAttribute('colspan', '3');
          tdGap.setAttribute('style', 'height: 6pt; border: none;');
          trGap.appendChild(tdGap);
          tbl.appendChild(trGap);
        }
        grid.parentNode.replaceChild(tbl, grid);
      }
    });

    // 10. Transform Essay Cards (.essay-card)
    clone.querySelectorAll('.essay-card').forEach((card, idx) => {
      const badge = card.querySelector('.num-badge');
      const numText = badge ? badge.innerText.trim() : (idx + 1);
      const engDiv = card.querySelector('div.text-\\[14px\\]') || card.querySelector('.font-bold');
      const hiDiv = card.querySelector('.hindi-text');
      const engText = engDiv ? engDiv.innerHTML.trim() : '';
      const hiText = hiDiv ? hiDiv.innerHTML.trim() : '';

      const tbl = document.createElement('table');
      tbl.setAttribute('width', '100%');
      tbl.setAttribute('style', 'width: 100%; border: 1pt solid #cbd5e1; border-collapse: collapse; margin-bottom: 6pt; background-color: #ffffff;');
      tbl.innerHTML = `
        <tr>
          <td style="width: 32px; vertical-align: top; padding: 6pt 4pt 6pt 8pt; border: none; text-align: center;">
            <div style="width: 22px; height: 22px; background-color: #0f172a; color: #fbbf24; border: 1.5pt solid #fbbf24; font-weight: 900; font-size: 10.5pt; text-align: center; line-height: 20px;">
              ${numText}
            </div>
          </td>
          <td style="padding: 6pt 8pt 6pt 4pt; vertical-align: top; border: none;">
            <div style="font-size: 10.5pt; font-weight: bold; color: #0f172a; line-height: 1.35;">
              ${engText}
            </div>
            <div style="font-size: 9.5pt; color: #475569; margin-top: 2pt; font-family: 'Mangal', 'Noto Sans Devanagari', sans-serif;">
              ${hiText}
            </div>
          </td>
        </tr>
      `;
      card.parentNode.replaceChild(tbl, card);
    });

    // 10b. Transform Detailed Essay Sections (.essay-section)
    clone.querySelectorAll('.essay-section').forEach(sec => {
      const title = sec.querySelector('.sec-title');
      const body = sec.querySelector('.sec-body');
      const hi = sec.querySelector('.hindi-trans');

      const tbl = document.createElement('table');
      tbl.setAttribute('width', '100%');
      tbl.setAttribute('style', 'width: 100%; border: 1pt solid #cbd5e1; border-collapse: collapse; margin-bottom: 7pt; background-color: #ffffff;');
      tbl.innerHTML = `
        <tr>
          <td style="border: none; padding: 4pt 8pt; background-color: #f1f5f9; font-weight: bold; font-size: 11pt; color: #0f172a; border-bottom: 0.5pt solid #cbd5e1;">
            ${title ? title.innerText.trim() : ''}
          </td>
        </tr>
        <tr>
          <td style="border: none; padding: 6pt 8pt; font-size: 10.5pt; color: #1e293b; line-height: 1.45;">
            ${body ? body.innerHTML.trim() : ''}
          </td>
        </tr>
        ${hi ? `<tr>
          <td style="border: none; padding: 5pt 8pt; font-size: 9.5pt; color: #475569; background-color: #f8fafc; border-top: 0.5pt dashed #cbd5e1; line-height: 1.4; font-family: 'Mangal', 'Noto Sans Devanagari', sans-serif;">
            ${hi.innerHTML.trim()}
          </td>
        </tr>` : ''}
      `;
      sec.parentNode.replaceChild(tbl, sec);
    });

    // 11. Fix Existing Tables (Ensure borders and paddings are explicitly set in inline style)
    clone.querySelectorAll('table').forEach(tbl => {
      if (!tbl.style.borderCollapse) tbl.style.borderCollapse = 'collapse';
      if (!tbl.getAttribute('width')) tbl.setAttribute('width', '100%');
    });

    // 12. Build Word HTML Template with exact Word styles and MSO Settings
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
          @page Section1 {
            size: ${isLandscape ? '841.9pt 595.3pt' : '595.3pt 841.9pt'};
            ${isLandscape ? 'mso-page-orientation: landscape;' : ''}
            margin: ${isLandscape ? '20.0pt 24.0pt 20.0pt 24.0pt' : '28.0pt 36.0pt 28.0pt 36.0pt'};
            mso-header-margin: 0pt;
            mso-footer-margin: 0pt;
            mso-paper-source: 0;
          }
          div.Section1 {
            page: Section1;
          }
          body {
            font-family: 'Mangal', 'Noto Sans Devanagari', 'Calibri', 'Segoe UI', Arial, sans-serif;
            font-size: 10.5pt;
            color: #0f172a;
            line-height: 1.45;
            margin: 0;
            padding: 0;
          }
          table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          th, td {
            font-family: inherit;
          }
          table.sheet-table, table.data-table, table.table-bordered, table[border="1"] {
            border: 1pt solid #475569;
          }
          table.sheet-table th, table.data-table th, table.table-bordered th, table[border="1"] th {
            border: 1pt solid #475569;
            background-color: #f1f5f9;
            padding: 4pt 6pt;
            font-weight: bold;
          }
          table.sheet-table td, table.data-table td, table.table-bordered td, table[border="1"] td {
            border: 0.5pt solid #94a3b8;
            padding: 3pt 5pt;
          }
          .text-center, [align="center"] { text-align: center !important; }
          .text-right, [align="right"] { text-align: right !important; }
          .text-left, [align="left"] { text-align: left !important; }
          .text-justify { text-align: justify !important; }
          .font-bold, .font-extrabold, .font-black, strong, b { font-weight: bold !important; }
          .font-semibold { font-weight: bold !important; }
          .font-normal { font-weight: normal !important; }
          .italic, em, i { font-style: italic !important; }
          .underline, u { text-decoration: underline !important; }
          .uppercase { text-transform: uppercase !important; }
          .border { border: 1pt solid #cbd5e1 !important; }
          .border-2 { border: 1.5pt solid #000000 !important; }
          .border-b { border-bottom: 1pt solid #000000 !important; }
          .border-b-2 { border-bottom: 2pt solid #000000 !important; }
          .border-t { border-top: 1pt solid #000000 !important; }
          .border-t-2 { border-top: 2pt solid #000000 !important; }
          .bg-slate-50, .bg-neutral-50 { background-color: #f8fafc !important; }
          .bg-slate-100, .bg-neutral-100 { background-color: #f1f5f9 !important; }
          .bg-amber-100 { background-color: #fef3c7 !important; }
          .bg-orange-100 { background-color: #ffedd5 !important; }
          .bg-white { background-color: #ffffff !important; }
          .indent-8 { text-indent: 20pt !important; }
          .indent-10 { text-indent: 28pt !important; }
          .page-break, .paper-sheet + .paper-sheet {
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

    // 13. Create Blob with UTF-8 BOM (\ufeff) and trigger download
    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (typeof window.showToast === 'function') {
      window.showToast('Word (.doc) फ़ाइल सफलतापूर्वक डाउनलोड हुई!', 'success');
    } else if (typeof window.showLetterToast === 'function') {
      window.showLetterToast('Word (.doc) फ़ाइल सफलतापूर्वक डाउनलोड हुई!', 'success');
    }
  }

  // Expose globally
  window.exportElementToWord = exportElementToWord;

})(window);
