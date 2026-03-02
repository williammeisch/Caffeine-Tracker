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
    
    // Lock from going before January 2026
    if (currentViewYear < 2026) {
        currentViewYear = 2026;
        currentViewMonth = 0;
    }
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
    history[selectedDate
