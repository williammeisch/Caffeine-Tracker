let history = JSON.parse(localStorage.getItem("trackerHistory")) || {};
let today = new Date();
let currentViewMonth = today.getMonth();
let currentViewYear = today.getFullYear();
let selectedDate = today.toISOString().split('T')[0];
const todayKey = today.toISOString().split('T')[0];

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

function changeMonth(delta) {
    currentViewMonth += delta;
    if (currentViewMonth < 0) { currentViewMonth = 11; currentViewYear--; }
    else if (currentViewMonth > 11) { currentViewMonth = 0; currentViewYear++; }
    if (currentViewYear < 2026) { currentViewYear = 2026; currentViewMonth = 0; }
    renderCalendar();
}

function selectDate(dateStr) {
    if (dateStr > todayKey) return; 
    selectedDate = dateStr;
    const d = new Date(dateStr + 'T00:00:00');
    document.getElementById('editingDateLabel').textContent = `Editing: ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    updateSidebarStats();
    renderCalendar();
}

function addCaffeine() {
    let mg = parseInt(document.getElementById('caffeineInput').value) || 0;
    if (!history[selectedDate]) history[selectedDate] = { caffeine: 0, sleep: 0, score: null, quality: 1.0, strain: 0 };
    history[selectedDate].caffeine += mg;
    document.getElementById('caffeineInput').value = "";
    document.getElementById('caffeineSearch').value = "";
    saveAndRender();
}

function submitDailyProfile() {
    let hrs = parseFloat(document.getElementById('sleepInput').value) || 0;
    let qual = parseFloat(document.getElementById('sleepQuality').value) || 1.0;
    let strain = parseFloat(document.getElementById('exerciseSelect').value) || 0;

    if (!history[selectedDate]) history[selectedDate] = { caffeine: 0, sleep: 0, score: null, quality: 1.0, strain: 0 };
    
    history[selectedDate].sleep = hrs;
    history[selectedDate].quality = qual;
    history[selectedDate].strain = strain;

    // Trigger calculation
    let day = history[selectedDate];
    let score = 100;
    if (day.caffeine > 200) score -= (day.caffeine - 200) * 0.2;
    const effectiveSleep = day.sleep * (day.quality || 1.0);
    if (effectiveSleep < 7) score -= (7 - effectiveSleep) * 10;
    score -= day.strain;
    
    day.score = Math.max(0, Math.min(100, Math.round(score)));

    // Clear sleep input specifically
    document.getElementById('sleepInput').value = "";
    saveAndRender();
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = "";
    const monthDisplay = new Date(currentViewYear, currentViewMonth);
    document.getElementById('currentMonthHeader').textContent = monthDisplay.toLocaleString('default', { month: 'long', year: 'numeric' });
    const firstDay = new Date(currentViewYear, currentViewMonth, 1).getDay();
    const daysInMonth = new Date(currentViewYear, currentViewMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        grid.appendChild(empty);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentViewYear}-${(currentViewMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayData = history[dateStr];
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';
        if (dateStr === selectedDate) dayCard.classList.add('selected');
        if (dateStr > todayKey) dayCard.classList.add('future');
        dayCard.onclick = () => selectDate(dateStr);

        if (dayData && dayData.score !== null) {
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
    const day = history[selectedDate] || { caffeine: 0, sleep: 0, score: null, strain: 0 };
    document.getElementById('totalCaffeine').textContent = day.caffeine;
    document.getElementById('sideScore').textContent = day.score !== null ? day.score + "%" : "--";
    document.getElementById('exerciseSelect').value = day.strain || 0;

    // FDA Warning Logic
    const fdaLimit = 400;
    const isOver = day.caffeine > fdaLimit;
    document.getElementById('fdaWarningSmall').style.display = isOver ? 'block' : 'none';
    document.getElementById('fdaMainWarning').style.display = isOver ? 'block' : 'none';
}

function saveAndRender() {
    localStorage.setItem("trackerHistory", JSON.stringify(history));
    renderCalendar();
    updateSidebarStats();
}

function resetDayData() {
    if(confirm("Discard all entries for this specific day and restart?")) {
        delete history[selectedDate];
        saveAndRender();
    }
}
