/**
 * Police Modern School, 25th Bn PAC - Daily Classroom English Sentences
 * Minimal Speech Synthesis & Clipboard Logic
 */

const SENTENCES = [
  "May I come in, Sir/Ma'am?",
  "May I go to the washroom?",
  "May I drink water?",
  "Ma'am, please step aside, the board is not visible.",
  "Could you please explain this question again?",
  "I have completed my work, please check my notebook.",
  "Could you please lend me a pencil/eraser?",
  "Ma'am, he/she is disturbing me.",
  "What is the homework for today?",
  "Excuse me Ma'am, I have a doubt."
];

let isPlayingAll = false;
let currentPlayIdx = 0;

// Speak a single sentence
function speakOne(num, text) {
  if (!('speechSynthesis' in window)) {
    showToast('Browser does not support Speech Synthesis');
    return;
  }

  window.speechSynthesis.cancel();
  stopPlayAllUI();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  const item = document.querySelectorAll('.sentence-card')[num - 1];
  if (item) item.classList.add('speaking');

  utterance.onend = () => {
    if (item) item.classList.remove('speaking');
  };

  utterance.onerror = () => {
    if (item) item.classList.remove('speaking');
  };

  window.speechSynthesis.speak(utterance);
}

// Play all 10 sentences in sequence
function togglePlayAll() {
  if (isPlayingAll) {
    stopPlayAll();
    return;
  }

  if (!('speechSynthesis' in window)) {
    showToast('Browser does not support Speech Synthesis');
    return;
  }

  isPlayingAll = true;
  currentPlayIdx = 0;
  updatePlayAllBtn(true);
  showToast('Playing sentences 1 to 10...');
  playNextSequence();
}

function playNextSequence() {
  if (!isPlayingAll) return;

  if (currentPlayIdx >= SENTENCES.length) {
    stopPlayAll();
    showToast('All 10 sentences completed!');
    return;
  }

  const items = document.querySelectorAll('.sentence-card');
  items.forEach(it => it.classList.remove('speaking'));

  const currentItem = items[currentPlayIdx];
  if (currentItem) {
    currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    currentItem.classList.add('speaking');
  }

  const text = SENTENCES[currentPlayIdx];
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  utterance.onend = () => {
    if (currentItem) currentItem.classList.remove('speaking');
    currentPlayIdx++;
    setTimeout(() => {
      if (isPlayingAll) playNextSequence();
    }, 600);
  };

  utterance.onerror = () => {
    if (currentItem) currentItem.classList.remove('speaking');
    stopPlayAll();
  };

  window.speechSynthesis.speak(utterance);
}

function stopPlayAll() {
  isPlayingAll = false;
  window.speechSynthesis.cancel();
  stopPlayAllUI();
}

function stopPlayAllUI() {
  isPlayingAll = false;
  updatePlayAllBtn(false);
  document.querySelectorAll('.sentence-card').forEach(it => it.classList.remove('speaking'));
}

function updatePlayAllBtn(playing) {
  const btn = document.getElementById('playAllBtn');
  const text = document.getElementById('playAllText');
  if (!btn || !text) return;

  if (playing) {
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-dark');
    text.innerText = 'आवाज़ रोकें';
  } else {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-dark');
    text.innerText = 'ऑडियो सुनें';
  }
  if (window.feather) feather.replace();
}

// Copy All Sentences to Clipboard
function copyAllSentences() {
  const formatted = SENTENCES.map((s, i) => `${i + 1}. ${s}`).join('\n');
  navigator.clipboard.writeText(formatted).then(() => {
    showToast('10 वाक्य सफलतापूर्वक कॉपी हुए!');
  }).catch(() => {
    showToast('कॉपी करने में त्रुटि!');
  });
}

// Toast Utility
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  if (window.feather) feather.replace();
});

// Export to Word (.doc)
function exportClassroomWord() {
  const page = document.querySelector('.a4-page');
  if (!page) return;
  const clone = page.cloneNode(true);
  const noPrints = clone.querySelectorAll('.no-print');
  noPrints.forEach(el => el.remove());

  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Classroom English Sentences</title>
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
        @page { size: A4 portrait; margin: 1.2cm; }
        body { font-family: 'Calibri', 'Segoe UI', 'Mangal', sans-serif; font-size: 11pt; color: #111; line-height: 1.4; }
        .sentence-card { border: 0.5pt solid #cbd5e1; padding: 6pt; margin: 4pt 0; background: #f8fafc; }
        .no-print { display: none !important; }
      </style>
    </head>
    <body>
      ${clone.innerHTML}
    </body>
    </html>
  `;
  const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'PMS_Classroom_English_Sentences.doc';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
window.exportClassroomWord = exportClassroomWord;
