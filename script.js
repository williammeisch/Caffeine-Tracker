let history = JSON.parse(localStorage.getItem("trackerHistory")) || {};
let todayKey = new Date().toISOString().split('T')[0];

const quotes = [
    "Caffeine: The other vitamin C.",
    "Sleep is a symptom of caffeine deprivation.",
    "Decaf coffee only works if you throw it at people.",
    "Procaffeinating: The tendency to not start anything until you've had coffee.",
    "May your coffee be strong and your Monday be short.",
    "I haven’t even had my coffee yet—don't look at me with those 'productive' eyes."
];

// --- BIG DRINK DATABASE ---
const drinkDatabase = [
    { name: "Alani Nu", mg: 200 }, { name: "C4 Performance", mg: 200 },
    { name: "Monster Energy", mg: 160 }, { name: "Red Bull (8.4oz)", mg: 80 },
    { name: "Celsius", mg: 200 }, { name: "Ghost Energy", mg: 200 },
    { name: "Starbucks Cold Brew", mg: 205 }, { name: "Dunkin' Iced Coffee", mg: 297 }
];

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    renderCalendar();
    displayQuote();
    setupSearch();
    updateSidebarStats();
});

function setupSearch() {
    const list = document.getElementById('drinkOptions');
    drinkDatabase.forEach(drink => {
        let opt = document.createElement('option');
        opt.value = drink.name;
        list.appendChild(opt);
    });
    document.getElementById('caffeineSearch').addEventListener('input', (e) => {
        const selected = drinkDatabase.find(d => d.name === e.target.value);
        if (selected) document.getElementById('caffeineInput').value = selected.mg;
    });
}

function addCaffeine() {
    let mg = parseInt(document.getElementById('caffeineInput').value) || 0;
    if (!history[todayKey]) history[todayKey] = { caffeine: 0, sleep: 0, score: 0 };
    history[todayKey].caffeine += mg;
    updateDailyScore();
    saveAndRender();
}

function setSleep() {
    let hrs = parseFloat(document.getElementById('sleepInput').value) || 0;
    let qual = parseFloat(document.getElementById('sleepQuality').value);
    if (!history[todayKey]) history[todayKey] = { caffeine: 0, sleep: 0, score: 0 };
    history[todayKey].sleep = hrs * qual;
    updateDailyScore();
    saveAndRender();
}

function updateDailyScore() {
    let day = history[todayKey];
    let score = 100;
    if (day.caffeine > 200) score -= (day.caffeine - 200) * 0.15;
    score += (day.sleep - 7) * 8;
    day.score = Math.max(0, Math.min(100, Math.round(score)));
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = "";
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${new Date().toISOString().split('-').slice(0, 2).join('-')}-${i.toString().padStart(2, '0')}`;
        const dayData = history[dateStr];
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';

        if (dayData) {
            let color = '#4ade80'; // Green
            if (dayData.caffeine > 400) color = '#f87171'; // Red
            else if (dayData.caffeine > 300) color = '#fb923c'; // Orange
            else if (dayData.caffeine > 150) color = '#fbbf24'; // Yellow
            dayCard.style.backgroundColor = color;
            dayCard.innerHTML = `<span class="day-num">${i}</span><span class="day-score">${dayData.score}%</span>`;
        } else {
            dayCard.innerHTML = `<span class="day-num">${i}</span>`;
        }
        grid.appendChild(dayCard);
    }
}

function displayQuote() {
    const rand = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteText').textContent = `"${quotes[rand]}"`;
}

function saveAndRender() {
    localStorage.setItem("trackerHistory", JSON.stringify(history));
    renderCalendar();
    updateSidebarStats();
}

function updateSidebarStats() {
    if (history[todayKey]) {
        document.getElementById('totalCaffeine').textContent = history[todayKey].caffeine;
        document.getElementById('sideScore').textContent = history[todayKey].score + "%";
    }
}

function resetDay() {
    if(confirm("Clear everything?")) { localStorage.clear(); location.reload(); }
}
