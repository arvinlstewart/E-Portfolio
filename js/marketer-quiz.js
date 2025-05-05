function initMarketerQuiz() {
  console.log("✅ Marketer Quiz Initialized");

  const modal = document.getElementById('quizModal');
  const openButtons = document.querySelectorAll('#openQuizBtnMain, #openQuizBtnSidebar');
  const closeBtn = document.getElementById('closeQuiz');
  const quizForm = document.getElementById('quizForm');
  const resultBox = document.getElementById('quizResult');

  if (!modal || !quizForm || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;

    let result = 'You are a versatile marketer!';

    if (q1 === 'data' && q2 === 'spreadsheet') result = 'You are a Data-Driven Marketer!';
    else if (q1 === 'creative' && q2 === 'graphic') result = 'You are a Creative Marketer!';
    else if (q1 === 'strategy' && q2 === 'crm') result = 'You are a Strategic Planner!';
    else if (q1 === 'tech' && q2 === 'dsp') result = 'You are a Programmatic Specialist!';

    resultBox.textContent = result;
    resultBox.style.display = 'block';
  });
}
