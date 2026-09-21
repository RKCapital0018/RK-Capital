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
    const whatsappNumber = "91XXXXXXXXXX";

    if (whatsappNumber.includes("X")) {
      formSuccess.textContent = "Form design is ready. Add RK Capital's official WhatsApp number in script.js to activate enquiry forwarding.";
      formSuccess.classList.add("show");
      return;
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
    formSuccess.textContent = "Your enquiry has been prepared. WhatsApp is opening.";
    formSuccess.classList.add("show");
  });
});

/* RK_CAPITAL_PHASE1_TOOLS */
(function(){
  const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Math.max(0,n));
  const num = id => Number(document.getElementById(id)?.value || 0);
  const validLoan = v => Number.isFinite(v) && v >= 1000;
  function emi(principal, annualRate, years){
    const months = Math.round(years*12), r=annualRate/1200;
    if(!principal || !months || !r) return principal/months;
    const f=Math.pow(1+r,months);
    return principal*r*f/(f-1);
  }
  function showError(id,msg){ const el=document.getElementById(id); if(el) el.textContent=msg||""; }

  const emiForm=document.getElementById("emiCalculator");
  function calculateEMI(){
    const p=num("emiAmount"), rate=num("emiRate"), years=num("emiTenure");
    if(!validLoan(p)||rate<=0||years<=0){showError("emiError","Enter a valid loan amount, interest rate and tenure.");return false;}
    const months=Math.round(years*12), monthly=emi(p,rate,years), total=monthly*months;
    document.getElementById("emiMonthly").textContent=money(monthly);
    document.getElementById("emiInterest").textContent=money(total-p);
    document.getElementById("emiTotal").textContent=money(total);
    showError("emiError","");
    return true;
  }
  if(emiForm) emiForm.addEventListener("submit",e=>{e.preventDefault();calculateEMI();});

  const affordForm=document.getElementById("loanAmountCalculator");
  function calculateAfford(){
    const payment=num("affordEmi"), rate=num("affordRate"), years=num("affordTenure");
    if(payment<=0||rate<=0||years<=0){showError("affordError","Enter a valid EMI, interest rate and tenure.");return false;}
    const months=Math.round(years*12), r=rate/1200;
    const principal = r ? payment*(1-Math.pow(1+r,-months))/r : payment*months;
    const total=payment*months;
    document.getElementById("affordAmount").textContent=money(principal);
    document.getElementById("affordTotal").textContent=money(total);
    showError("affordError","");
    return true;
  }
  if(affordForm) affordForm.addEventListener("submit",e=>{e.preventDefault();calculateAfford();});

  const scheduleBtn=document.getElementById("showSchedule");
  const wrap=document.getElementById("scheduleWrap");
  function buildSchedule(){
    if(!calculateEMI()) return;
    const p=num("emiAmount"), rate=num("emiRate"), years=num("emiTenure"), months=Math.round(years*12);
    let balance=p, monthly=emi(p,rate,years), annualP=0, annualI=0, rows="";
    const r=rate/1200;
    for(let m=1;m<=months;m++){
      const interest=balance*r;
      let principal=monthly-interest;
      if(m===months) principal=balance;
      balance=Math.max(0,balance-principal);
      annualP+=principal; annualI+=interest;
      if(m%12===0||m===months){
        rows += `<tr><td>Year ${Math.ceil(m/12)}</td><td>${money(annualP)}</td><td>${money(annualI)}</td><td>${money(balance)}</td></tr>`;
        annualP=0; annualI=0;
      }
    }
    document.getElementById("scheduleBody").innerHTML=rows;
    document.getElementById("scheduleMeta").textContent=`${money(p)} • ${rate.toFixed(1)}% • ${years} years`;
    wrap.classList.add("is-visible");
  }
  if(scheduleBtn) scheduleBtn.addEventListener("click",buildSchedule);
  calculateEMI(); calculateAfford();
})();
