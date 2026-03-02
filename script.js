let totalCaffeine = 0;
let sleepHours = 0;

// Load saved data on page load
window.onload = function () {
  const savedCaffeine = localStorage.getItem("totalCaffeine");
  const savedSleep = localStorage.getItem("sleepHours");

  if (savedCaffeine) {
    totalCaffeine = parseInt(savedCaffeine);
    document.getElementById("totalCaffeine").textContent = totalCaffeine;
  }

  if (savedSleep) {
    sleepHours = parseFloat(savedSleep);
    document.getElementById("sleepDisplay").textContent = sleepHours;
  }

  calculateScore();
};

// Add caffeine
function addCaffeine() {
  const input = document.getElementById("caffeineInput");
  const amount = parseInt(input.value);

  if (!amount || amount <= 0) return;

  totalCaffeine += amount;
  document.getElementById("totalCaffeine").textContent = totalCaffeine;

  localStorage.setItem("totalCaffeine", totalCaffeine);

  input.value = "";
  calculateScore();
}

// Save sleep
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

// Recovery score formula
function calculateScore() {
  let score = 100;

  // Penalize caffeine over 200mg
  if (totalCaffeine > 200) {
    score -= (totalCaffeine - 200) * 0.1;
  }

  // Reward sleep
  score += (sleepHours - 7) * 5;

  // Clamp score between 0–100
  score = Math.max(0, Math.min(100, Math.round(score)));

  document.getElementById("score").textContent = score;
}
