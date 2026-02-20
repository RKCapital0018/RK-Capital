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
    
});
