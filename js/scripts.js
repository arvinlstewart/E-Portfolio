const articlesIndex = [
  {
    title: "Unlocking First-Party Data for AdOps Growth",
    url: "articles/unlocking-first-party-data.html",
    excerpt: "Explore how first-party data strategies are driving higher performance and deeper audience insights in 2025...",
    keywords: ["first-party data", "privacy", "segmentation", "B2B", "audience targeting"]
  },
  {
    title: "New Standards in Campaign QA Workflows",
    url: "articles/campaign-qa-workflows.html",
    excerpt: "Discover the frameworks and automation tools reshaping the QA processes for digital advertising campaigns...",
    keywords: ["QA", "workflow", "campaign setup", "automation", "ad ops"]
  },
  {
    title: "What the Future of Ad Ops Management Looks Like",
    url: "articles/future-of-adops.html",
    excerpt: "A deep dive into the evolving role of Ad Ops leaders in an era of machine learning, automation, and analytics...",
    keywords: ["ad ops", "future trends", "programmatic advertising", "automation", "leadership"]
  },
  {
    title: "Top Excel Shortcuts You Didn't Know",
    url: "articles/excel-shortcuts.html",
    excerpt: "Master the hidden Excel shortcuts that can shave hours off your weekly ad ops reporting and optimizations...",
    keywords: ["Excel", "shortcuts", "productivity", "ad ops reporting"]
  },
  {
    title: "Breaking Through Excel Automation",
    url: "articles/excel-automation-2025.html",
    excerpt: "Learn how new Excel formulas and logical workflows are streamlining campaign optimization and data handling...",
    keywords: ["Excel", "automation", "campaign optimization", "workflow design", "ad ops"]
  }
];


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
    1: { title: "Tag Sheet Sync & Custom Click Macro Integration", description:`
  <p>This tool was designed to bridge the gap between third-party vendor tag sheets and internal campaign operations by using Power Query and structured lookup logic. It enables seamless syncing of tag sheet data with live campaign setups, dynamically matching creatives to their proper placements.</p>
  <p>What began as a tagging solution evolved into a comprehensive QA and compliance system with the ability to:</p>
  <ul>
    <li>Auto-inject custom click macros based on ad type and destination</li>
    <li>Flag mismatches in naming conventions</li>
    <li>Detect and notify when client-provided ad copy or creative dimensions are out of spec</li>
  </ul>
  <p><strong>Impact:</strong></p>
  <ul>
    <li>Reduced manual errors in tag handling</li>
    <li>Enforced naming consistency</li>
    <li>Automated QA alerts to prevent launch delays</li>
    <li>Improved collaboration between trafficking and creative teams</li>
  </ul>
` },



    2: { title: "Dynamic Name Generator for Creative Naming", description:
      `
      <p>A smart Excel-based tool that auto-generates structured naming conventions based on campaign type, platform, and placement logic. Built using nested formulas, character limits, and dropdown menus, the Name Generator ensures consistency across ad platforms.</p>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>Dynamic dropdowns and logic-driven name construction</li>
        <li>Character limit enforcement for platform compliance</li>
        <li>Real-time error detection and formatting validation</li>
      </ul>
      <p><strong>Impact:</strong></p>
      <ul>
        <li>Reduced setup time for new creatives</li>
        <li>Ensured naming compliance across systems</li>
        <li>Scaled efficiently for large campaign launches</li>
        <li>Adopted widely as a shared QA tool for new hires</li>
      </ul>
    `  
     
    },
    
    
    3: { title: "Optimization Workbook with Performance Rules", description: 
      
    `
      <p>An Excel-based optimization system that flags underperforming campaigns based on metrics like CTR, CPC, and CVR. It uses conditional formatting and logic-based rules to guide tactical recommendations.</p>
      <p><strong>Core Capabilities:</strong></p>
      <ul>
        <li>Performance thresholds for campaign health tracking</li>
        <li>Color-coded flags for underperforming placements</li>
        <li>Suggested actions (pause, bid up, reallocate budget)</li>
      </ul>
      <p><strong>Impact:</strong></p>
      <ul>
        <li>Streamlined optimization cycles</li>
        <li>Empowered non-technical users to take action</li>
        <li>Reduced reliance on manual reports and ad hoc analysis</li>
      </ul>
      `  
     }
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

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput) {
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    searchResults.innerHTML = "";
  
    if (query.length > 1) {
      const matchedArticles = articlesIndex.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
  
      matchedArticles.forEach(article => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('search-result-wrapper');
  
        const link = document.createElement('a');
        link.href = article.url;
        link.classList.add('search-result-item');
        link.textContent = article.title;
  
        const excerpt = document.createElement('p');
        excerpt.classList.add('search-result-excerpt');
        excerpt.textContent = article.excerpt;
  
        wrapper.appendChild(link);
        wrapper.appendChild(excerpt);
        searchResults.appendChild(wrapper);
      });
  
      if (matchedArticles.length === 0) {
        searchResults.innerHTML = "<div class='no-results'>No matching articles found.</div>";
      }
    }
  });
  
}

const clearSearch = document.getElementById('clearSearch');

if (clearSearch) {
  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchInput.focus();
  });
}

const aboutContainer = document.getElementById('aboutContainer');
const toggleAbout = document.getElementById('toggleAbout');

if (aboutContainer && toggleAbout) {
  toggleAbout.addEventListener('click', () => {
    aboutContainer.classList.toggle('expanded');

    if (aboutContainer.classList.contains('expanded')) {
      toggleAbout.textContent = '➖ Show Less';
    } else {
      toggleAbout.textContent = '➕ Read More';
    }
  });
}

