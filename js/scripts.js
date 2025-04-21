// Highlight the clicked card
function highlightCard(cardElement) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('active'));
  cardElement.classList.add('active');
}

// Toggle dark mode
document.getElementById('darkModeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
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
