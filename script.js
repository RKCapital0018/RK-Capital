// Scroll Animation
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    if(position < screenPosition){
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});
