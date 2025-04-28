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

// Modal functionality
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const cardData = {
  1: {
    title: "Tag Sheet Sync & Custom Click Macro Integration",
    description: `<p>This tool was designed to bridge the gap between third-party vendor tag sheets and internal campaign operations...</p>`
  },
  2: {
    title: "Dynamic Name Generator for Creative Naming",
    description: `<p>A smart Excel-based tool that auto-generates structured naming conventions based on campaign type...</p>`
  },
  3: {
    title: "Optimization Workbook with Performance Rules",
    description: `<p>An Excel-based optimization system that flags underperforming campaigns based on metrics like CTR, CPC, and CVR...</p>`
  }
};

document.querySelectorAll(".card").forEach((card, index) => {
  card.addEventListener("click", () => {
    const id = index + 1;
    modalTitle.textContent = cardData[id]?.title || "Project";
    modalDescription.innerHTML = cardData[id]?.description || "<p>More details coming soon.</p>";
    if (modal) modal.style.display = "block";
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Quiz form modal
const quizModal = document.getElementById("quizModal");
const openQuizBtn = document.getElementById("openQuizBtn");
const closeQuiz = document.getElementById("closeQuiz");
const quizSteps = document.querySelectorAll(".quiz-step");
let currentStep = 0;

function showStep(index) {
  quizSteps.forEach((step, i) => step.classList.toggle("active", i === index));
}

if (openQuizBtn) {
  openQuizBtn.addEventListener("click", () => {
    quizModal.style.display = "block";
    showStep(0);
  });
}

if (closeQuiz) {
  closeQuiz.addEventListener("click", () => {
    quizModal.style.display = "none";
  });
}

const quizForm = document.getElementById("quizForm");

if (quizForm) {
  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    // Basic Validation
    const email = form.email.value.trim();
    const fullName = form.fullName.value.trim();
    const jobtitle = form.jobtitle.value.trim();

    if (!email || !fullName || !jobtitle) {
      alert("Please complete your Name, Email, and Job Title before submitting.");
      return;
    }

    // Build the payload
    const data = {
      fullName,
      email,
      jobtitle,
      issues: Array.from(form.querySelectorAll('input[name="issues"]:checked')).map(i => i.value).join(", "),
      platforms: form.platforms.value,
      qa: form.querySelector('input[name="qa"]:checked')?.value || "",
      opt: form.querySelector('input[name="opt"]:checked')?.value || ""
    };

    //console.log("Submitting data:", data); // (optional for debugging)

    try {
     const AIRTABLE_WEBHOOK_URL = "https://hooks.airtable.com/workflows/v1/genericWebhook/appXXXXXXXXXXXXXX"; // <-- YOUR real webhook URL here

try {
  const response = await fetch(AIRTABLE_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert("Thanks! Your response was recorded.");
    quizForm.reset();
  } else {
    alert("Something went wrong. Please try again.");
  }
} catch (error) {
  console.error('Error:', error);
  alert("Submission failed. Please try again later.");
}


      const result = await response.json();

      if (result.message === "Success") {
        alert("Thanks! Your response was recorded.");
        quizForm.reset(); // ✅ Clear the form after successful submission
      } else {
        alert("Something went wrong: " + (result.error || result.message));
      }

    } catch (error) {
      // console.error('Error:', error);
      alert("Submission failed. Please try again later.");
    }
  });
}

document.querySelectorAll(".prev-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep === 0) {
      const nameInput = document.getElementById("fullName").value;
      const displayName = document.getElementById("displayName");
      if (displayName) displayName.textContent = nameInput || "friend";
    }

    if (currentStep < quizSteps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});
