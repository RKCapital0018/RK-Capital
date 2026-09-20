document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("pageLoader");
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const leadForm = document.getElementById("leadForm");
  const formSuccess = document.getElementById("formSuccess");

  window.setTimeout(() => loader.classList.add("hidden"), 550);

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 25);
  }, { passive: true });

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const counters = document.querySelectorAll("[data-counter]");
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.counter);
      let current = 0;
      const duration = 1100;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(target * eased);
        el.textContent = current + "+";
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + "+";
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => counterObserver.observe(el));

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const city = formData.get("city");
    const loan = formData.get("loan");
    const amount = formData.get("amount");
    const occupation = formData.get("occupation");
    const message = formData.get("message");

    const text =
      `RK Capital Website Enquiry%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Mobile: ${encodeURIComponent(phone)}%0A` +
      `City: ${encodeURIComponent(city)}%0A` +
      `Requirement: ${encodeURIComponent(loan)}%0A` +
      `Amount: ${encodeURIComponent(amount || "Not specified")}%0A` +
      `Occupation: ${encodeURIComponent(occupation || "Not specified")}%0A` +
      `Message: ${encodeURIComponent(message || "Not specified")}`;

    // IMPORTANT: Replace the number below with RK Capital's official WhatsApp number.
    const whatsappNumber = "919325854165";

    if (whatsappNumber.includes("X")) {
      formSuccess.textContent = "Form design is ready. Add RK Capital's official WhatsApp number in script.js to activate enquiry forwarding.";
      formSuccess.classList.add("show");
      return;
    }

    window.open(`https://wa.me/${9325854165}?text=${text}`, "_blank");
    formSuccess.textContent = "Your enquiry has been prepared. WhatsApp is opening.";
    formSuccess.classList.add("show");
  });
});
