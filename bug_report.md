# Bug Report — Police Modern School Fee Management Webapp
**File analyzed:** [index.html](file:///c:/Users/co_25/Desktop/ABC%20Report/index.html) (2586 lines)  
**Date:** 2026-07-04

---

## 🔴 Critical Bugs

### 1. Firebase API Key Exposed in Source Code
**Line:** 1717  
The Firebase `apiKey`, `appId`, `messagingSenderId`, etc. are hardcoded directly in the HTML file, which is publicly visible to anyone who views page source. Anyone can read/write your Firestore database.

**Fix:** Move credentials to environment variables (for a build process) or restrict the key in Firebase Console (App Check / domain allowlisting).

---

### 2. Monthly Register Table: Column Count Mismatch in Footer
**Lines:** 2393–2394  

```js
'<td colspan="13" ...>Total collected cash...'
```

The actual column count in the monthly register table is:
- Sr (1) + PEN (1) + Name (1) + Cls (1) + Bus (1) = **5 base columns**
- 3 quarter groups × 2 cols each = **6 data columns**
- Total/Balance (1) + Per-row total col (4 rows × 1) = still **1** in header
- = **13 columns in header** — but each data row also renders a **per-row "Rs. total" column** (the `rowTot` column added by patch12) for **each of the 4 rows**

The footer `colspan="13"` does NOT span the per-row total column added in rows 2–4, resulting in **broken table layout** where the footer doesn't stretch the full width.

**Fix:** Count columns including per-row total and update `colspan` accordingly (should be ~14).

---

### 3. Monthly Register: `q1.map(i => '...' + SCHOOL_MONTHS[i+3])` — Array Index Out of Bounds
**Line:** 2342 (and same in patches 11/12)

```js
q1.map(i => SCHOOL_MONTHS[i] + ' / ' + SCHOOL_MONTHS[i+1] + ' / ' + SCHOOL_MONTHS[i+2] + ' / ' + SCHOOL_MONTHS[i+3])
```

`q1 = [0, 4, 8]`:
- For `i = 8`: `SCHOOL_MONTHS[8+3] = SCHOOL_MONTHS[11]` → ✅ OK
- For `i = 4`: `SCHOOL_MONTHS[4+3] = SCHOOL_MONTHS[7]` → ✅ OK

But the **column header says "colspan=2"** while the sub-header generates `Fee / Rec#` and `Bus / Rec#` per entry — so there are **6 sub-columns** but only **3 headers with colspan=2**, meaning the layout is correct structurally. However, the quarter grouping by `q1=[0,4,8]` means month groups are **not contiguous** (Apr, Aug, Dec) which is **semantically wrong** for a quarterly/monthly register. The intended 4 months per row should be `[0,1,2,3]`, `[4,5,6,7]`, `[8,9,10,11]`.

**Fix:** Change quarter arrays to contiguous ranges:
```js
const q1 = [0, 1, 2]; const q2 = [3, 4, 5]; const q3 = [6, 7, 8]; const q4 = [9, 10, 11];
```
And adjust header map from `i+3` down to `i+2`.

---

### 4. `downloadPDF()` — Clone Rendered Off-Screen Stays Visible in Some Browsers
**Lines:** 2489–2541  

`zIndex: '-9999'` does NOT always work to hide the cloned element — on some browsers, the fixed-position clone with negative z-index is still visible (flashing) to the user during PDF generation since the parent body has `position: static`.

**Fix:** Use `visibility: 'hidden'` and `opacity: '0'` in addition to the negative z-index, or append clone **off-screen** via `left: '-99999px'` instead of `top/left: '0'`.

---

## 🟠 Medium Bugs

### 5. `calcFee()` Net Includes Bus Fee Even for Non-Bus Students
**Line:** 1826

```js
return { base, dairy: DAIRY, bus, disc, discAmt, net: base - discAmt + DAIRY + bus };
```

If `st.bus = false`, then `bus = 0`, so `net` is correctly tuition-only. However, in `renderFcArea()` at line 2107:

```js
'Tuition: Rs.' + (f.net - f.bus) + '/mo'
```

This subtracts `f.bus` from `net` to show tuition-only amount — meaning `f.net` is the **combined** (tuition+bus) total. This is displayed as the student's overall monthly fee everywhere (Students list, Fee Chart, etc.) — potentially **confusing** for non-bus students since it correctly shows tuition-only, but for bus students `f.net` shows combined.

In the **balance calculation** of the monthly register (lines 2351–2353):
```js
const monthlyFee = calcFee(s).net;  // This is TUITION + BUS combined
const annualLiability = (monthlyFee * 12)
```

This means **bus fees are counted in the annual liability** even if the student pays bus fee separately. This inflates the balance column incorrectly.

**Fix:** Either separate the liability calculation: `const tuitionNet = f.net - f.bus; const annualLiability = tuitionNet * 12 + (s.bus ? BUS_FEE * 12 : 0);` — but since bus is separately tracked, the balance column should probably only track tuition liability.

---

### 6. `toggleTuition()` Doesn't Update Year Tabs UI
**Line:** 2186–2194  

When `fcSelectedYear` is changed via year tab clicks, the tab renders correctly via `onclick="fcSelectedYear=y; renderMonthGrid()"`. However, the year tabs themselves don't get `active` class updated after click because `renderMonthGrid()` doesn't re-render the year tabs — only `renderFcArea()` does. After clicking a year tab, the active styling **may stay on the old year** if `renderFcArea()` isn't called.

**Fix:** Call `renderFcArea()` instead of `renderMonthGrid()` in the year tab `onclick`, or update the year tab active state inside `renderMonthGrid()`.

---

### 7. `saveBus()` Defaults to `BUS_FEE` Even If Input is 0
**Line:** 2244

```js
const busAmount = parseFloat(amtEl?.value) || BUS_FEE;
```

If the user intentionally enters `0` (waived fee), `parseFloat(0) || BUS_FEE` evaluates to `BUS_FEE` (300) — the zero is discarded. Same issue exists in `saveTuition` but is caught by the `amount <= 0` guard.

**Fix:** Use: `const busAmount = amtEl?.value !== '' ? parseFloat(amtEl.value) : BUS_FEE;`

---

### 8. `unmarkTuition()` — Race Condition: Local State Modified Before Firestore Write
**Lines:** 2212–2213

```js
if (_fees[idx].busPaid) { 
  _fees[idx].amount = 0; _fees[idx].receipt = ''; _fees[idx].ts = null; 
  await fsAddFee(_fees[idx]); 
}
```

The local `_fees` array is modified BEFORE `fsAddFee` resolves. If the Firestore write fails, the local state is already corrupted (amount=0, receipt='') but the Firestore record still has the old values. This causes an inconsistency.

**Fix:** Use a copy for the Firestore write or revert local changes in a `catch` block.

---

### 9. `prYear` Defaults to 2025 But Overwritten on Data Load
**Lines:** 1637 and 2565

HTML defaults the year input to `2025`:
```html
<input type="number" id="prYear" value="2025" ...>
```
But `loadData()` overwrites it with `new Date().getFullYear()`. This means on initial load the value briefly shows 2025 then updates to current year — minor but could also mean if `loadData()` errors out, the year stays at 2025.

---

### 10. `renderPrint()` Not Called on Year Input Change When Typing
**Line:** 1637

```html
<input type="number" id="prYear" value="2025" onchange="renderPrint()">
```

`onchange` only fires on blur (when focus leaves). If the user types a new year and presses Enter without blurring, `renderPrint()` is not triggered.

**Fix:** Add `oninput="renderPrint()"` as well.

---

## 🟡 Minor Issues / UX Problems

### 11. `logout()` Not Wrapped in Error Handling
**Line:** 1760

```js
function logout() { signOut(auth).then(() => window.location.reload()); }
```

No `.catch()` handler — if `signOut` fails (network error), the user sees nothing and the page doesn't reload.

**Fix:** Add `.catch(err => toast('Logout failed: ' + err.message, 'error'))`.

---

### 12. Login Error Message is Generic
**Line:** 1752

```js
err.textContent = 'Invalid credentials. Please try again.';
```

All Firebase auth errors (wrong password, user not found, too many requests, network error) show the same message. Useful for security but unhelpful for legitimate network issues.

**Fix:** Distinguish network errors: `if (error.code === 'auth/network-request-failed') { err.textContent = 'Network error. Check your connection.'; }`

---

### 13. `nextSn()` Could Generate Duplicate Serial Numbers
**Line:** 1820

```js
function nextSn() { return _students.length ? Math.max(..._students.map(x => x.serial || 0)) + 1 : 1 }
```

This is actually correct — it uses `Math.max` which prevents duplicates. ✅ No bug here, just noting it's safe.

---

### 14. `src/index.html` and Root `index.html` Are Out of Sync
The `patch*.py` scripts modify **both** `index.html` (root) and `src/index.html`. But the patches don't verify both files are identical before patching. If patches were run selectively on one file, the two could have diverged. The `build.js` likely copies one to the other — but if the root `index.html` is the deployed file, the `src/index.html` may have stale state.

---

### 15. `loadData()` Error Doesn't Hide Loader
**Lines:** 2566–2569

```js
} catch (err) {
  document.querySelector('#appLoader .lm').textContent = 'Error: ' + err.message;
  document.querySelector('#appLoader .lm').style.color = '#fca5a5';
}
```

On error, `showLoader(false)` is never called, leaving the full-screen loader permanently visible. There's no retry button or way to dismiss it.

**Fix:** Add a "Retry" button or at minimum add a "Close" button when the error is displayed.

---

### 16. `exportCSV()` Headers Are Hardcoded in English, Not Matching Field Order
**Line:** 2464–2472

The CSV headers array has 20 items; the row array also has 20 items — they match. ✅ No misalignment found. However, `s.admYear` is passed as-is (could be a number or string), and the field is not normalized. Minor risk of mixed types in CSV.

---

### 17. Bus Fee Label in Month Card Has a JavaScript Interpolation Bug
**Line:** 2136

```js
'<span class="bus-row-label">🚌 Bus Fee (Rs.\''+BUS_FEE+'\') </span>'
```

This string is built **inside a JS template string within HTML** — the single-quote escaping `\'` is correct in the context, but the actual rendered text will show:
```
🚌 Bus Fee (Rs.'300')
```
The extra single-quotes are visible to the user. This is a **display bug**.

**Fix:** Remove the escaped quotes:
```js
'<span class="bus-row-label">🚌 Bus Fee (Rs.' + BUS_FEE + '/mo)</span>'
```

---

## 📋 Summary Table

| # | Severity | Area | Issue |
|---|----------|------|-------|
| 1 | 🔴 Critical | Security | Firebase API key exposed in source |
| 2 | 🔴 Critical | Monthly Register | Footer colspan mismatch — broken table |
| 3 | 🔴 Critical | Monthly Register | Non-contiguous month grouping in quarters |
| 4 | 🔴 Critical | PDF Download | Clone visible (flashing) during capture |
| 5 | 🟠 Medium | Balance Calc | Annual liability incorrectly includes bus in tuition balance |
| 6 | 🟠 Medium | Fee Collect UI | Year tab active state not re-rendered after click |
| 7 | 🟠 Medium | saveBus() | Zero bus amount silently defaults to BUS_FEE |
| 8 | 🟠 Medium | unmarkTuition | Local state mutated before async write completes |
| 9 | 🟡 Minor | Print Panel | prYear default value (2025) briefly wrong |
| 10 | 🟡 Minor | Print Panel | Year input change not detected on Enter key |
| 11 | 🟡 Minor | Auth | logout() has no error handling |
| 12 | 🟡 Minor | Auth | Generic login error for all failure types |
| 14 | 🟡 Minor | Build | src/index.html and root index.html may be out of sync |
| 15 | 🟡 Minor | UX | Loader never dismissed on data load error |
| 17 | 🟡 Minor | UI | Bus fee label shows unwanted single-quotes |

