let totalCaffeine = 0;
let sleepHours = 0;
let sleepQuality = 1.0;
let caffeineEntries = [];

// --- THE BIG DRINK DATABASE ---
const drinkDatabase = [
    // ENERGY DRINKS (10 Brands)
    { name: "Alani Nu (All Flavors)", mg: 200 },
    { name: "C4 Performance", mg: 200 },
    { name: "C4 Ultimate", mg: 300 },
    { name: "Monster Energy (Original)", mg: 160 },
    { name: "Monster Ultra (Zero Sugar)", mg: 150 },
    { name: "Red Bull (8.4oz)", mg: 80 },
    { name: "Red Bull (12oz)", mg: 114 },
    { name: "Celsius (12oz)", mg: 200 },
    { name: "Celsius Heat (16oz)", mg: 300 },
    { name: "Ghost Energy", mg: 200 },
    { name: "Reign Total Body Fuel", mg: 300 },
    { name: "Bang Energy", mg: 300 },
    { name: "Rockstar Original", mg: 160 },
    { name: "Bucked Up Energy", mg: 300 },
    { name: "Prime Energy", mg: 200 },

    // STARBUCKS (Common Sizes: Grande)
    { name: "Starbucks Blonde Roast (Grande)", mg: 360 },
    { name: "Starbucks Pike Place (Grande)", mg: 310 },
    { name: "Starbucks Cold Brew (Grande)", mg: 205 },
    { name: "Starbucks Nitro Cold Brew (Grande)", mg: 280 },
    { name: "Starbucks Iced Coffee (Grande)", mg: 165 },
    { name: "Starbucks Americano (Grande)", mg: 225 },
    { name: "Starbucks Latte/Cappuccino (Grande)", mg: 150 },
    { name: "Starbucks Espresso Shot (Solo)", mg: 75 },

    // DUNKIN'
    { name: "Dunkin' Hot Coffee (Medium)", mg: 210 },
    { name: "Dunkin' Iced Coffee (Medium)", mg: 297 },
    { name: "Dunkin' Cold Brew (Medium)", mg: 260 },
    { name: "Dunkin' Americano (Medium)", mg: 284 },
    { name: "Dunkin' Espresso Shot", mg: 118 },

    // DUTCH BROS
    { name: "Dutch Bros 911 (All Sizes)", mg: 280 },
    { name: "Dutch Bros Double Torture", mg: 130 },
    { name: "Dutch Bros Rebel Energy", mg: 80 },
    { name: "Dutch Bros Cold Brew", mg: 293 },
    { name: "Dutch Bros Americano", mg: 94 }
];

// Load Database into Search Menu
window.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('drinkOptions');
    drinkDatabase.forEach(drink => {
        let option = document.createElement('option');
        option.value = drink.name;
        list.appendChild(option);
    });

    // Auto-fill MG when a drink is selected
    document.getElementById('caffeineSearch').addEventListener('input', (e) => {
        const selected = drinkDatabase.find(d => d.name === e.target.value);
        if (selected) document.getElementById('caffeineInput').value = selected.mg;
    });

    loadData();
});

function addCaffeine() {
    const input = document.getElementById("caffeineInput");
    const amount = parseInt(input.value);

    if (!amount || amount <= 0) return;

    totalCaffeine += amount;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    caffeineEntries.push({ mg: amount, time: time, name: document.getElementById('caffeineSearch').value || "Manual Entry" });

    // HEALTH WARNING POP-UP
    if (totalCaffeine > 400) {
        alert("⚠️ WARNING: You have exceeded the FDA recommended daily limit of 400mg of caffeine!");
        document.getElementById('caffeineCard').style.borderColor = "red";
    }

    saveAndRefresh();
    input.value = "";
    document.getElementById('caffeineSearch').value = "";
}

function setSleep() {
    sleepHours = parseFloat(document.getElementById("sleepInput").value);
    sleepQuality = parseFloat(document.getElementById("sleepQuality").value);
    saveAndRefresh();
}

function calculateScore() {
    let score = 100;
    
    // Caffeine Penalty
    if (totalCaffeine > 200) score -= (totalCaffeine - 200) * 0.15;
    if (totalCaffeine > 400) score -= 20;

    // Sleep Quality Math
    const effectiveSleep = sleepHours * sleepQuality;
    score += (effectiveSleep - 7) * 8;

    score = Math.max(0, Math.min(100, Math.round(score)));
    
    // Update Score and Progress Bar
    const scoreEl = document.getElementById("score");
    const bar = document.getElementById("progressBar");
    scoreEl.textContent = score + "%";
    bar.style.width = score + "%";
    
    // Bar color logic
    if (score > 70) bar.style.backgroundColor = "#4CAF50";
    else if (score > 40) bar.style.backgroundColor = "#FFC107";
    else bar.style.backgroundColor = "#F44336";
}

function saveAndRefresh() {
    localStorage.setItem("totalCaffeine", totalCaffeine);
    localStorage.setItem("caffeineEntries", JSON.stringify(caffeineEntries));
    localStorage.setItem("sleepHours", sleepHours);
    updateUI();
    calculateScore();
}

function updateUI() {
    document.getElementById("totalCaffeine").textContent = totalCaffeine;
    document.getElementById("sleepDisplay").textContent = sleepHours;
    const list = document.getElementById("caffeineLog");
    list.innerHTML = "";
    [...caffeineEntries].reverse().forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${entry.time} - ${entry.name}</span> <strong>+${entry.mg}mg</strong>`;
        list.appendChild(li);
    });
}

function loadData() {
    totalCaffeine = parseInt(localStorage.getItem("totalCaffeine")) || 0;
    sleepHours = parseFloat(localStorage.getItem("sleepHours")) || 0;
    caffeineEntries = JSON.parse(localStorage.getItem("caffeineEntries")) || [];
    updateUI();
    calculateScore();
}

function resetDay() {
    if(confirm("Reset everything for a new day?")) {
        localStorage.clear();
        location.reload();
    }
}
