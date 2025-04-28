// ===== Highlight clicked card =====
const cards = document.querySelectorAll('.card');
if (cards.length > 0) {
  function highlightCard(cardElement) {
    cards.forEach(card => card.classList.remove('active'));
    cardElement.classList.add('active');
  }
}

// ===== Dark Mode Toggle =====
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

// ===== Scroll Reveal Functionality =====
function handleScrollReveal() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  reveals.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('reveal-visible');
    }
  });
}
window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);

// ===== Modal for Project Details =====
const modal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

if (modal && closeModal && modalTitle && modalDescription) {
  const cardData = {
    1: { title: "Tag Sheet Sync & Custom Click Macro Integration", description: "<p>Full description for project 1.</p>" },
    2: { title: "Dynamic Name Generator for Creative Naming", description: "<p>Full description for project 2.</p>" },
    3: { title: "Optimization Workbook with Performance Rules", description: "<p>Full description for project 3.</p>" }
  };

  document.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('click', () => {
      const id = index + 1;
      modalTitle.textContent = cardData[id]?.title || "Project";
      modalDescription.innerHTML = cardData[id]?.description || "<p>More details coming soon.</p>";
      modal.style.display = "block";
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
  
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// ===== Quiz Modal Form =====
const quizModal = document.getElementById('quizModal');
const openQuizBtn = document.getElementById('openQuizBtn');
const closeQuiz = document.getElementById('closeQuiz');
const quizSteps = document.querySelectorAll('.quiz-step');

if (quizModal && openQuizBtn && closeQuiz && quizSteps.length > 0) {
  let currentStep = 0;

  function showStep(index) {
    quizSteps.forEach((step, i) => step.classList.toggle('active', i === index));
  }

  openQuizBtn.addEventListener('click', () => {
    quizModal.style.display = "block";
    showStep(0);
  });

  closeQuiz.addEventListener('click', () => {
    quizModal.style.display = "none";
  });

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < quizSteps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });
}

// ===== Quiz Form Submission =====
const quizForm = document.getElementById('quizForm');
if (quizForm) {
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const issues = Array.from(form.querySelectorAll('input[name="issues"]:checked')).map(i => i.value).join(", ");
    const platforms = form.platforms.value;
    const qa = form.qa.value;
    const opt = form.opt.value;
    const name = form.fullName.value.trim();
    const email = form.email.value.trim();

    fetch("https://hooks.airtable.com/workflows/v1/genericWebhook/appioblrblEFkppAF/wflMwxhgeR4vuNigi/wtr5XjZAY5pgr4lkp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, issues, platforms, qa, opt })
    })
    .then(res => res.json())
    .then(data => {
      alert("Thanks! Your response has been submitted.");
      quizModal.style.display = "none";
      form.reset();
    })
    .catch(err => {
      console.error("Submission failed", err);
      alert("Something went wrong. Please try again.");
    });
  });
}

// ===== Carousel Functionality =====
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dotsContainer = document.querySelector('.carousel-dots');

if (track && items.length > 0 && prevButton && nextButton && dotsContainer) {
  let index = 0;

  // Create dots dynamically
  items.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = idx;
      showSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  function showSlide(idx) {
    const slideWidth = items[0].clientWidth;
    track.style.transform = `translateX(-${idx * slideWidth}px)`;

    const allDots = document.querySelectorAll('.dot');
    allDots.forEach(dot => dot.classList.remove('active'));
    allDots[idx].classList.add('active');
  }

  // Button click events
  prevButton.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    showSlide(index);
  });

  nextButton.addEventListener('click', () => {
    index = (index + 1) % items.length;
    showSlide(index);
  });

  // Auto-slide
  setInterval(() => {
    index = (index + 1) % items.length;
    showSlide(index);
  }, 5000);

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  }, false);

  function handleGesture() {
    if (touchEndX < touchStartX - 50) {
      index = (index + 1) % items.length;
      showSlide(index);
    }
    if (touchEndX > touchStartX + 50) {
      index = (index - 1 + items.length) % items.length;
      showSlide(index);
    }
  }
}
