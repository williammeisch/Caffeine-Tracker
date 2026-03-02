let totalCaffeine = 0;
let sleepHours = 0;
let caffeineEntries = [];

// 1. Initial Load from LocalStorage
const savedCaffeine = localStorage.getItem("totalCaffeine");
const savedSleep = localStorage.getItem("sleepHours");
const savedEntries = localStorage.getItem("caffeineEntries");

if (savedCaffeine) {
    totalCaffeine = parseInt(savedCaffeine);
}

if (savedSleep) {
    sleepHours = parseFloat(savedSleep);
    document.getElementById("sleepDisplay").textContent = sleepHours;
}

if (savedEntries) {
    caffeineEntries = JSON.parse(savedEntries);
}

// Update the UI immediately on load
updateCaffeineUI();
calculateScore();

// 2. Function to Add Caffeine
function addCaffeine() {
    const input = document.getElementById("caffeineInput");
    const amount = parseInt(input.value);

    if (!amount || amount <= 0) return;

    totalCaffeine += amount;

    // Create a timestamp (e.g., 10:30 PM)
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add to our history list
    caffeineEntries.push({ mg: amount, time: timestamp });

    // Save to LocalStorage
    localStorage.setItem("totalCaffeine", totalCaffeine);
    localStorage.setItem("caffeineEntries", JSON.stringify(caffeineEntries));

    updateCaffeineUI();
    calculateScore();
    input.value = "";
}

// 3. Function to Update the List Display
function updateCaffeineUI() {
    document.getElementById("totalCaffeine").textContent = totalCaffeine;
    const logList = document.getElementById("caffeineLog");
    
    // Clear and rebuild the list
    logList.innerHTML = "";
    
    // Show newest entries at the top
    const displayEntries = [...caffeineEntries].reverse();

    displayEntries.forEach((entry) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${entry.time}</span> <strong>+${entry.mg}mg</strong>`;
        logList.appendChild(li);
    });
}

// 4. Function to Save Sleep
function setSleep() {
    const input = document.getElementById("sleepInput");
    const hours = parseFloat(input.value);

    if (!hours || hours <= 0) return;

    sleepHours = hours;
    document.getElementById("sleepDisplay").textContent = sleepHours;
    localStorage.setItem("sleepHours", sleepHours);

    input.value = "";
    calculateScore();
}

// 5. Recovery Score Logic
function calculateScore() {
    let score = 100;

    // Penalize caffeine over 200mg
    if (totalCaffeine > 200) {
        score -= (totalCaffeine - 200) * 0.1;
    }

    // Reward sleep (baseline 7 hours)
    score += (sleepHours - 7) * 5;

    // Clamp score between 0–100
    score = Math.max(0, Math.min(100, Math.round(score)));

    let status = "";
    if (score > 80) status = "🚀 Great";
    else if (score > 50) status = "⚖️ Okay";
    else status = "⚠️ Low";

    document.getElementById("score").textContent = `${score}% - ${status}`;
}
