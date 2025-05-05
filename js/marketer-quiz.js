console.log("Marketer quiz JS loaded!");
document.addEventListener('DOMContentLoaded', function () {
    const marketerQuizModal = document.getElementById('quizModal');
    const openMarketerQuiz = document.getElementById('openQuizModal');
    const closeMarketerQuiz = document.getElementById('closeQuiz');
    const resultBox = document.getElementById('quizResult');
    const marketerQuizForm = document.getElementById('quizForm');
  
    if (marketerQuizModal && openMarketerQuiz && closeMarketerQuiz && marketerQuizForm) {
      openMarketerQuiz.addEventListener('click', () => {
        marketerQuizModal.style.display = 'block';
        resultBox.style.display = 'none';
      });
  
      closeMarketerQuiz.addEventListener('click', () => {
        marketerQuizModal.style.display = 'none';
      });
  
      window.addEventListener('click', function (e) {
        if (e.target === marketerQuizModal) {
          marketerQuizModal.style.display = 'none';
        }
      });
  
      marketerQuizForm.addEventListener('submit', function (e) {
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
  
    // Optional: dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const logo = document.getElementById('siteLogo');
        const isDark = document.body.classList.contains('dark-mode');
        if (logo) {
          logo.src = isDark ? 'images/portfoliolight.png' : 'images/portfolio.png';
        }
      });
    }
  });
