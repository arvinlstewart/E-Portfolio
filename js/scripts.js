// Highlight the clicked card
function highlightCard(cardElement) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('active'));
  cardElement.classList.add('active');
}

// Toggle dark mode
document.getElementById('darkModeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  const logo = document.getElementById('siteLogo');
  const isDark = document.body.classList.contains('dark-mode');

  // Debug log
  console.log('Dark mode toggled:', isDark);

  if (logo) {
    logo.src = isDark ? 'images/portfoliolight.png' : 'images/portfolio.png';
  }
});



// Scroll reveal functionality
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

const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const cardData = {
  1: {
    title: "Tag Sheet Sync & Custom Click Macro Integration",
    description: `
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
    `
  },
  2: {
    title: "Dynamic Name Generator for Creative Naming",
    description: `
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
  3: {
    title: "Optimization Workbook with Performance Rules",
    description: `
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


// Open modal on card click
document.querySelectorAll(".card").forEach((card, index) => {
  card.addEventListener("click", () => {
    const id = index + 1;
    modalTitle.textContent = cardData[id]?.title || "Project";
    modalDescription.innerHTML = cardData[id]?.description || "<p>More details coming soon.</p>";

    modal.style.display = "block";
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

const quizModal = document.getElementById("quizModal");
const openQuizBtn = document.getElementById("openQuizBtn");
const closeQuiz = document.getElementById("closeQuiz");
const quizSteps = document.querySelectorAll(".quiz-step");
let currentStep = 0;

function showStep(index) {
  quizSteps.forEach((step, i) => step.classList.toggle("active", i === index));
}

openQuizBtn.addEventListener("click", () => {
  quizModal.style.display = "block";
  showStep(0);
});

closeQuiz.addEventListener("click", () => {
  quizModal.style.display = "none";
});

const form = document.getElementById("quizForm");
document.getElementById("quizForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.fullName.value.trim();
  const email = form.email.value.trim();
  const jobtitle = form.jobtitle ? form.jobtitle.value.trim() : '';
  const issues = Array.from(form.querySelectorAll('input[name="issues"]:checked')).map(i => i.value).join(", ");
  const platforms = form.platforms.value;
  const qa = form.qaProcess.value;
  const opt = form.optSpeed.value;

  fetch("https://script.google.com/macros/s/AKfycbymEaM7hMV2WBG4qYRWaLiG45dp17giB_MSTO6ivEI/dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: name,
      email,
      jobtitle,
      issues,
      platforms,
      qa,
      opt
    })
  })
  .then(response => response.json())
  .then(data => {
    alert("Thanks! Your response has been submitted.");
    document.getElementById("quizModal").style.display = "none";
    form.reset();
  })
  .catch(err => {
    console.error("Submission failed:", err);
    alert("Something went wrong. Please try again.");
  });
});




document.querySelectorAll(".prev-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      console.log("Moved back to step:", currentStep);
    }
  });
});

document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep === 0) {
      const nameInput = document.getElementById("fullName").value;
      const displayName = document.getElementById("displayName");
      if (displayName) {
        displayName.textContent = nameInput || "friend";
      }
    }

    if (currentStep < quizSteps.length - 1) {
      currentStep++;
      showStep(currentStep);
      console.log("Moved forward to step:", currentStep);
    }
  });
});


