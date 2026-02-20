document.addEventListener("DOMContentLoaded", function () {

    // EMI CALCULATOR

    const loanAmount = document.getElementById("loanAmount");
    const interestRate = document.getElementById("interestRate");
    const loanTenure = document.getElementById("loanTenure");

    const emiText = document.getElementById("emi");
    const totalInterestText = document.getElementById("totalInterest");
    const totalPaymentText = document.getElementById("totalPayment");

    const loanAmountValue = document.getElementById("loanAmountValue");
    const interestRateValue = document.getElementById("interestRateValue");
    const loanTenureValue = document.getElementById("loanTenureValue");

    let emiChart;

    function calculateEMI() {
        let P = parseFloat(loanAmount.value);
        let R = parseFloat(interestRate.value) / 12 / 100;
        let N = parseFloat(loanTenure.value) * 12;

        let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        let totalPayment = EMI * N;
        let totalInterest = totalPayment - P;

        emiText.innerText = "₹ " + EMI.toFixed(0);
        totalInterestText.innerText = "₹ " + totalInterest.toFixed(0);
        totalPaymentText.innerText = "₹ " + totalPayment.toFixed(0);

        updateChart(P, totalInterest);
    }

    function updateChart(principal, interest) {
        const ctx = document.getElementById("emiChart").getContext("2d");

        if (emiChart) {
            emiChart.destroy();
        }

        emiChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Principal", "Interest"],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ["#0a1f44", "#d4af37"]
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    function updateValues() {
        loanAmountValue.innerText = loanAmount.value;
        interestRateValue.innerText = interestRate.value;
        loanTenureValue.innerText = loanTenure.value;
        calculateEMI();
    }

    loanAmount.addEventListener("input", updateValues);
    interestRate.addEventListener("input", updateValues);
    loanTenure.addEventListener("input", updateValues);

    updateValues();

    // TRUST COUNTER (FINAL WORKING VERSION)

    const section = document.querySelector(".trust-section");
    const counters = document.querySelectorAll(".counter");

    let started = false;

    function startCounter() {
        if (started) return;
        started = true;

        counters.forEach(counter => {
            counter.innerText = "0";
            const target = +counter.getAttribute("data-target");
            const increment = target / 100;

            const updateCounter = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(section);

// LOAN ELIGIBILITY CALCULATOR

const monthlyIncome = document.getElementById("monthlyIncome");
const existingEMI = document.getElementById("existingEMI");
const eligibilityRate = document.getElementById("eligibilityRate");
const eligibilityTenure = document.getElementById("eligibilityTenure");
const eligibleAmount = document.getElementById("eligibleAmount");

function calculateEligibility() {

    let income = parseFloat(monthlyIncome.value) || 0;
    let emiExisting = parseFloat(existingEMI.value) || 0;
    let rate = parseFloat(eligibilityRate.value) || 0;
    let tenure = parseFloat(eligibilityTenure.value) || 0;

    if (income <= 0 || rate <= 0 || tenure <= 0) {
        eligibleAmount.innerText = "₹ 0";
        return;
    }

    let maxEMI = (income * 0.60) - emiExisting;

    if (maxEMI <= 0) {
        eligibleAmount.innerText = "₹ 0";
        return;
    }

    let R = rate / 12 / 100;
    let N = tenure * 12;

    let loanAmount = (maxEMI * (Math.pow(1 + R, N) - 1)) / (R * Math.pow(1 + R, N));

    eligibleAmount.innerText = "₹ " + Math.round(loanAmount).toLocaleString();
}

monthlyIncome.addEventListener("input", calculateEligibility);
existingEMI.addEventListener("input", calculateEligibility);
eligibilityRate.addEventListener("input", calculateEligibility);
eligibilityTenure.addEventListener("input", calculateEligibility);
    
 // CALCULATOR TOGGLE FUNCTION

window.showCalculator = function (id) {

    const sections = document.querySelectorAll(".calculator-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selected = document.getElementById(id);

    if (selected) {
        selected.classList.add("active");
        selected.scrollIntoView({ behavior: "smooth" });
    }
};
// DARK MODE TOGGLE

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggleBtn.innerText = "☀";
    } else {
        toggleBtn.innerText = "🌙";
    }

});

// EMI PDF DOWNLOAD

const downloadBtn = document.getElementById("downloadPdfBtn");

downloadBtn.addEventListener("click", function () {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let P = parseFloat(loanAmount.value);
    let annualRate = parseFloat(interestRate.value);
    let tenureYears = parseFloat(loanTenure.value);

    let R = annualRate / 12 / 100;
    let N = tenureYears * 12;

    let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    let balance = P;

    doc.setFontSize(16);
    doc.text("RK Capital Financial Services", 20, 20);

    doc.setFontSize(12);
    doc.text("Loan Amount: ₹ " + P.toLocaleString(), 20, 30);
    doc.text("Interest Rate: " + annualRate + "%", 20, 37);
    doc.text("Tenure: " + tenureYears + " Years", 20, 44);
    doc.text("Monthly EMI: ₹ " + Math.round(EMI).toLocaleString(), 20, 51);

    let startY = 65;
    doc.text("Month | EMI | Principal | Interest | Balance", 20, startY);

    startY += 8;

    for (let i = 1; i <= N; i++) {

        let interest = balance * R;
        let principal = EMI - interest;
        balance -= principal;

        if (startY > 280) {
            doc.addPage();
            startY = 20;
        }

        doc.text(
            i + " | " +
            Math.round(EMI) + " | " +
            Math.round(principal) + " | " +
            Math.round(interest) + " | " +
            Math.max(0, Math.round(balance)),
            20,
            startY
        );

        startY += 7;
    }

    doc.save("RK-Capital-EMI-Schedule.pdf");

});
    
});
