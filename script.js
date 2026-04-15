const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".card, .product, .hero-text").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});
