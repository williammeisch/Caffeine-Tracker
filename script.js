let history = JSON.parse(localStorage.getItem("trackerHistory")) || {};
let todayKey = new Date().toISOString().split('T')[0];

const quotes = [
    "Caffeine: The other vitamin C.",
    "Procaffeinating: The tendency to not start anything until you've had coffee.",
    "May your coffee be strong and your Monday be short.",
    "Training is the essence of transformation."
];

const drinkDatabase = [
    { name: "Alani Nu", mg: 200 }, { name: "C4 Performance", mg: 200 },
    { name: "Monster Energy", mg: 160 }, { name: "Red Bull (8.4oz)", mg: 80 },
    { name: "Celsius", mg: 200 }, { name: "Ghost Energy", mg: 200 },
    { name: "Starbucks Cold Brew", mg: 205 }, { name: "Dunkin' Iced Coffee", mg: 297 }
];

window.addEventListener('DOMContentLoaded', () => {
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
    if (!history[todayKey]) history[todayKey] = { caffeine: 0, sleep: 0, score: 100, quality: 1.0, strain: 0 };
    history[todayKey].caffeine += mg;
    document.getElementById('caffeineInput').value = "";
    document.getElementById('caffeineSearch').value = "";
    updateDailyScore();
    saveAndRender();
}

function setSleep() {
    let hrs = parseFloat(document.getElementById('sleepInput').value) || 0;
    let qual = parseFloat(document.getElementById('sleepQuality').value);
    if (!history[todayKey]) history[todayKey] = { caffeine: 0, sleep: 0, score: 100, quality: 1.0, strain: 0 };
    history[todayKey].sleep = hrs;
    history[todayKey].quality = qual;
    document.getElementById('sleepInput').value = "";
    updateDailyScore();
    saveAndRender();
}

function setExercise() {
    let strain = parseFloat(document.getElementById('exerciseSelect').value) || 0;
    if (!history[todayKey]) history[todayKey] = { caffeine: 0, sleep: 0, score: 100, quality: 1.0, strain: 0 };
    history[todayKey].strain = strain;
    updateDailyScore();
    saveAndRender();
}

function updateDailyScore() {
    let day = history[todayKey];
    let score = 100;
    
    // Caffeine Penalty
    if (day.caffeine > 200) score -= (day.caffeine - 200) * 0.2;
    
    // Sleep (Based on last night)
    const effectiveSleep = day.sleep * (day.quality || 1.0);
    if (effectiveSleep < 7) score -= (7 - effectiveSleep) * 10;

    // Exercise Strain (Temporarily lowers score until you sleep)
    score -= (day.strain || 0);

    day.score = Math.max(0, Math.min(100, Math.round(score)));
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = "";
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        grid.appendChild(empty);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayData = history[dateStr];
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';

        if (dayData && (dayData.caffeine > 0 || dayData.sleep > 0 || dayData.strain > 0)) {
            let color = '#4ade80';
            if (dayData.score < 50) color = '#f87171';
            else if (dayData.score < 75) color = '#fbbf24';
            dayCard.style.backgroundColor = color;
            dayCard.innerHTML = `<span class="day-num">${i}</span><span class="day-score">${dayData.score}%</span>`;
        } else {
            dayCard.innerHTML = `<span class="day-num">${i}</span>`;
        }
        grid.appendChild(dayCard);
    }
}

function updateSidebarStats() {
    const day = history[todayKey] || { caffeine: 0, sleep: 0, score: 100, strain: 0 };
    document.getElementById('totalCaffeine').textContent = day.caffeine;
    document.getElementById('sideScore').textContent = day.score + "%";
    
    // Advanced recommendation
    let needed = 8;
    if (day.caffeine > 300) needed += 1;
    if (day.strain > 10) needed += 1; // Need more sleep if you worked out
    if (day.sleep < 6) needed += 1;
    document.getElementById('sleepRecommendation').textContent = `Target Sleep Tonight: ${needed} hours`;
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

function resetDay() {
    if(confirm("Clear all historical data?")) { localStorage.clear(); location.reload(); }
}
