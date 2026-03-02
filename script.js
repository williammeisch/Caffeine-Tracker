let history = JSON.parse(localStorage.getItem("trackerHistory")) || {};
let selectedDate = new Date().toISOString().split('T')[0];
const todayKey = new Date().toISOString().split('T')[0];

const drinkDatabase = [
    { name: "Alani Nu", mg: 200 }, { name: "C4 Performance", mg: 200 },
    { name: "Monster Energy", mg: 160 }, { name: "Red Bull (8.4oz)", mg: 80 },
    { name: "Celsius", mg: 200 }, { name: "Ghost Energy", mg: 200 },
    { name: "Starbucks Cold Brew", mg: 205 }, { name: "Dunkin' Iced Coffee", mg: 297 }
];

window.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
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

function selectDate(dateStr) {
    if (dateStr > todayKey) return; // Block future dates
    selectedDate = dateStr;
    
    // Update Sidebar UI to show which date we are editing
    const displayDate = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    document.getElementById('editingDateLabel').textContent = `Editing: ${displayDate}`;
    
    updateSidebarStats();
    
    // Visual feedback for selected day
    renderCalendar();
}

function addCaffeine() {
    let mg = parseInt(document.getElementById('caffeineInput').value) || 0;
    if (!history[selectedDate]) history[selectedDate] = { caffeine: 0, sleep: 0, score: 100, quality: 1.0, strain: 0 };
    history[selectedDate].caffeine += mg;
    document.getElementById('caffeineInput').value = "";
    document.getElementById('caffeineSearch').value = "";
    updateDailyScore(selectedDate);
    saveAndRender();
}

function setSleep() {
    let hrs = parseFloat(document.getElementById('sleepInput').value) || 0;
    let qual = parseFloat(document.getElementById('sleepQuality').value) || 1.0;
    if (!history[selectedDate]) history[selectedDate] = { caffeine: 0, sleep: 0, score: 100, quality: 1.0, strain: 0 };
    history[selectedDate].sleep = hrs;
    history[selectedDate].quality = qual;
    document.getElementById('sleepInput').value = "";
    updateDailyScore(selectedDate);
    saveAndRender();
}

function setExercise() {
    let strain = parseFloat(document.getElementById('exerciseSelect').value) || 0;
    if (!history[selectedDate]) history[selectedDate] = { caffeine: 0, sleep: 0, score: 100, quality: 1.0, strain: 0 };
    history[selectedDate].strain = strain;
    updateDailyScore(selectedDate);
    saveAndRender();
}

function updateDailyScore(date) {
    let day = history[date];
    let score = 100;
    if (day.caffeine > 200) score -= (day.caffeine - 200) * 0.2;
    const effectiveSleep = day.sleep * (day.quality || 1.0);
    if (effectiveSleep < 7) score -= (7 - effectiveSleep) * 10;
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
        grid.appendChild(document.createElement('div')).className = 'calendar-day empty';
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayData = history[dateStr];
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';
        if (dateStr === selectedDate) dayCard.classList.add('selected');
        if (dateStr > todayKey) dayCard.classList.add('future');

        dayCard.onclick = () => selectDate(dateStr);

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
    const day = history[selectedDate] || { caffeine: 0, sleep: 0, score: 100, strain: 0 };
    document.getElementById('totalCaffeine').textContent = day.caffeine;
    document.getElementById('sideScore').textContent = day.score + "%";
}

function saveAndRender() {
    localStorage.setItem("trackerHistory", JSON.stringify(history));
    renderCalendar();
    updateSidebarStats();
}
