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
