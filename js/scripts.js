
// ===== Quiz Popup Logic =====
const quizTrigger = document.getElementById('openQuizModal');
const quizModalEl = document.getElementById('quizModal');
const quizClose = document.getElementById('closeQuiz');
const quizResultEl = document.getElementById('quizResult');
const quizFormEl = document.getElementById('quizForm');

if (quizTrigger && quizModalEl && quizClose && quizFormEl) {
  quizTrigger.addEventListener('click', () => {
    quizModalEl.style.display = 'block';
  });

  quizClose.addEventListener('click', () => {
    quizModalEl.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === quizModalEl) {
      quizModalEl.style.display = 'none';
    }
  });

  quizFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;

    let result = 'You are a versatile marketer!';
    if (q1 === 'data' && q2 === 'spreadsheet') result = 'You are a Data-Driven Marketer!';
    else if (q1 === 'creative' && q2 === 'graphic') result = 'You are a Creative Marketer!';
    else if (q1 === 'strategy' && q2 === 'crm') result = 'You are a Strategic Planner!';
    else if (q1 === 'tech' && q2 === 'dsp') result = 'You are a Programmatic Specialist!';

    quizResultEl.textContent = result;
    quizResultEl.style.display = 'block';
  });
}
