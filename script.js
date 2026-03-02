const DRINK_ARCHIVE = [
    // --- RED BULL (EVERY SIZE/FLAVOR) ---
    { name: "Red Bull Original (8.4oz)", mg: 80 }, { name: "Red Bull Original (12oz)", mg: 114 }, { name: "Red Bull Original (16oz)", mg: 151 }, { name: "Red Bull Original (20oz)", mg: 189 },
    { name: "Red Bull Sugarfree (8.4oz)", mg: 80 }, { name: "Red Bull Zero (8.4oz)", mg: 80 }, { name: "Red Bull Blue Edition (Blueberry)", mg: 80 }, { name: "Red Bull Red Edition (Watermelon)", mg: 80 },
    { name: "Red Bull Yellow Edition (Tropical)", mg: 80 }, { name: "Red Bull Amber Edition (Strawberry Apricot)", mg: 80 }, { name: "Red Bull Sea Blue (Juneberry)", mg: 80 }, { name: "Red Bull Green Edition (Dragon Fruit)", mg: 80 },

    // --- MONSTER ENERGY ---
    { name: "Monster Energy Original", mg: 160 }, { name: "Monster Zero Sugar", mg: 160 }, { name: "Monster Lo-Carb", mg: 160 }, { name: "Monster Ultra White", mg: 150 },
    { name: "Monster Ultra Peachy Keen", mg: 150 }, { name: "Monster Ultra Strawberry Dreams", mg: 150 }, { name: "Monster Ultra Watermelon", mg: 150 }, { name: "Monster Ultra Gold", mg: 150 },
    { name: "Monster Ultra Paradise", mg: 150 }, { name: "Monster Ultra Blue", mg: 150 }, { name: "Monster Ultra Red", mg: 150 }, { name: "Monster Ultra Violet", mg: 150 }, { name: "Monster Ultra Sunrise", mg: 150 },
    { name: "Monster Mango Loco", mg: 160 }, { name: "Monster Pipeline Punch", mg: 160 }, { name: "Monster Khaotic", mg: 160 }, { name: "Monster Pacific Punch", mg: 160 },
    { name: "Java Monster Mean Bean", mg: 200 }, { name: "Java Monster Loca Moca", mg: 200 }, { name: "Java Monster 300 Mocha", mg: 300 }, { name: "Monster Rehab Lemonade", mg: 160 },

    // --- GHOST ENERGY ---
    { name: "Ghost Sour Patch Kids Red", mg: 200 }, { name: "Ghost Sour Patch Kids Blue", mg: 200 }, { name: "Ghost Warheads Apple", mg: 200 }, { name: "Ghost Warheads Watermelon", mg: 200 },
    { name: "Ghost Orange Cream", mg: 200 }, { name: "Ghost Swedish Fish", mg: 200 }, { name: "Ghost Cherry Limeade", mg: 200 }, { name: "Ghost Citrus", mg: 200 }, { name: "Ghost Faze Pop", mg: 200 },

    // --- CELSIUS & ALANI NU ---
    { name: "Celsius (12oz Can - All Flavors)", mg: 200 }, { name: "Celsius Essentials (16oz)", mg: 270 }, { name: "Celsius On-the-Go Stick", mg: 200 },
    { name: "Alani Nu Kimade", mg: 200 }, { name: "Alani Nu Cosmic Stardust", mg: 200 }, { name: "Alani Nu Cherry Slush", mg: 200 }, { name: "Alani Nu Mimosa", mg: 200 }, { name: "Alani Nu Hawaiian Shaved Ice", mg: 200 },

    // --- STARBUCKS ---
    { name: "Starbucks Pike Place (Tall)", mg: 235 }, { name: "Starbucks Pike Place (Grande)", mg: 310 }, { name: "Starbucks Pike Place (Venti)", mg: 410 },
    { name: "Starbucks Blonde Roast (Grande)", mg: 360 }, { name: "Starbucks Dark Roast (Grande)", mg: 260 }, { name: "Starbucks Cold Brew (Grande)", mg: 205 },
    { name: "Starbucks Nitro Cold Brew (Grande)", mg: 280 }, { name: "Starbucks Americano (Grande)", mg: 225 }, { name: "Starbucks Iced Espresso (Grande)", mg: 225 },
    { name: "Starbucks Refreshers (Grande)", mg: 45 }, { name: "Starbucks Pink Drink (Grande)", mg: 45 },

    // --- DUNKIN ---
    { name: "Dunkin Hot Coffee (Small)", mg: 150 }, { name: "Dunkin Hot Coffee (Medium)", mg: 210 }, { name: "Dunkin Hot Coffee (Large)", mg: 300 },
    { name: "Dunkin Iced Coffee (Small)", mg: 198 }, { name: "Dunkin Iced Coffee (Medium)", mg: 297 }, { name: "Dunkin Iced Coffee (Large)", mg: 396 },
    { name: "Dunkin Cold Brew (Medium)", mg: 260 }, { name: "Dunkin Espresso Shot", mg: 118 },

    // --- SODAS (CANS & BOTTLES) ---
    { name: "Coke Can (12oz)", mg: 34 }, { name: "Coke Bottle (20oz)", mg: 57 }, { name: "Diet Coke Can (12oz)", mg: 46 }, { name: "Diet Coke Bottle (20oz)", mg: 76 },
    { name: "Pepsi Can (12oz)", mg: 38 }, { name: "Pepsi Bottle (20oz)", mg: 63 }, { name: "Pepsi Zero Sugar Bottle (20oz)", mg: 115 }, { name: "Mountain Dew Can (12oz)", mg: 54 },
    { name: "Mountain Dew Bottle (20oz)", mg: 91 }, { name: "Dr Pepper Can (12oz)", mg: 41 }, { name: "Dr Pepper Bottle (20oz)", mg: 68 }, { name: "Mello Yello", mg: 51 },

    // --- C4 & PRE-WORKOUTS ---
    { name: "C4 Performance Energy (16oz)", mg: 200 }, { name: "C4 Ultimate (16oz)", mg: 300 }, { name: "Ryse Godzilla (2 Scoops)", mg: 400 }, { name: "Bucked Up LFG", mg: 300 }, { name: "Total War", mg: 250 }
];

let history = JSON.parse(localStorage.getItem("trackerHistory")) || {};
let today = new Date();
let currentViewMonth = today.getMonth();
let currentViewYear = today.getFullYear();
let selectedDate = today.toISOString().split('T')[0];

window.addEventListener('DOMContentLoaded', () => { renderCalendar(); initSearch(); updateSidebarStats(); });

function initSearch() {
    const input = document.getElementById('caffeineSearch');
    const results = document.getElementById('searchResults');
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) { results.style.display = 'none'; return; }
        const filtered = DRINK_ARCHIVE.filter(d => d.name.toLowerCase().includes(query)).slice(0, 15);
        results.innerHTML = filtered.map(d => `<div class="search-item" onclick="selectDrink('${d.name.replace(/'/g, "\\'")}', ${d.mg})">${d.name} <span>${d.mg}mg</span></div>`).join('');
        results.style.display = 'block';
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.card')) results.style.display = 'none'; });
}

function selectDrink(name, mg) {
    document.getElementById('caffeineSearch').value = name;
    document.getElementById('caffeineInput').value = mg;
    document.getElementById('searchResults').style.display = 'none';
}

function addCaffeine() {
    let mg = parseInt(document.getElementById('caffeineInput').value) || 0;
    let name = document.getElementById('caffeineSearch').value || "Custom Drink";
    if (!history[selectedDate]) history[selectedDate] = { caffeineItems: [], sleep: 0, score: null, quality: 1.0, strain: 0 };
    history[selectedDate].caffeineItems.push({ name, mg, id: Date.now() });
    saveAndRender();
}

function submitDailyProfile() {
    let hrs = parseFloat(document.getElementById('sleepInput').value) || 0;
    let qual = parseFloat(document.getElementById('sleepQuality').value) || 1.0;
    let strain = parseFloat(document.getElementById('exerciseSelect').value) || 0;
    if (!history[selectedDate]) history[selectedDate] = { caffeineItems: [], sleep: 0, score: null, quality: 1.0, strain: 0 };
    let day = history[selectedDate];
    day.sleep = hrs; day.quality = qual; day.strain = strain;
    
    let totalMg = (day.caffeineItems || []).reduce((s, i) => s + i.mg, 0);
    let score = 100;
    if (totalMg > 200) score -= (totalMg - 200) * 0.2;
    let effectiveSleep = day.sleep * day.quality;
    if (effectiveSleep < 7) score -= (7 - effectiveSleep) * 10;
    score -= day.strain;
    
    // FIX: Score capped at 100% and minimum 0%
    day.score = Math.max(0, Math.min(100, Math.round(score)));
    saveAndRender();
}

function updateSidebarStats() {
    const day = history[selectedDate] || { caffeineItems: [], sleep: 0, score: null };
    const totalMg = (day.caffeineItems || []).reduce((s, i) => s + i.mg, 0);
    document.getElementById('totalCaffeine').textContent = totalMg;
    document.getElementById('sideScore').textContent = day.score !== null ? day.score + "%" : "--";
    document.getElementById('caffeineLogList').innerHTML = (day.caffeineItems || []).map(i => `<div class="log-item"><span>${i.name} (${i.mg}mg)</span><button onclick="deleteCaffeine(${i.id})">✕</button></div>`).join('');
    
    const fb = document.getElementById('dailyFeedback');
    if (day.score !== null) {
        fb.style.display = 'block';
        document.getElementById('feedbackText').textContent = day.score >= 80 ? "Optimal Recovery." : "Recovery Compromised. Prioritize rest.";
    } else { fb.style.display = 'none'; }
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid'); grid.innerHTML = "";
    const firstDay = new Date(currentViewYear, currentViewMonth, 1).getDay();
    const daysInMonth = new Date(currentViewYear, currentViewMonth + 1, 0).getDate();
    document.getElementById('currentMonthHeader').textContent = new Date(currentViewYear, currentViewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div')).className = 'calendar-day empty';
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentViewYear}-${(currentViewMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayData = history[dateStr];
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day' + (dateStr === selectedDate ? ' selected' : '');
        if (dayData && dayData.score !== null) {
            dayCard.style.backgroundColor = dayData.score < 50 ? '#f87171' : dayData.score < 80 ? '#fbbf24' : '#4ade80';
            dayCard.innerHTML = `<span class="day-num">${i}</span><span class="day-score">${dayData.score}%</span>`;
        } else { dayCard.innerHTML = `<span class="day-num">${i}</span>`; }
        dayCard.onclick = () => selectDate(dateStr);
        grid.appendChild(dayCard);
    }
}

function deleteCaffeine(id) { history[selectedDate].caffeineItems = history[selectedDate].caffeineItems.filter(i => i.id !== id); saveAndRender(); }
function changeMonth(d) { currentViewMonth += d; if (currentViewMonth < 0) { currentViewMonth = 11; currentViewYear--; } else if (currentViewMonth > 11) { currentViewMonth = 0; currentViewYear++; } renderCalendar(); }
function selectDate(d) { if (d > today.toISOString().split('T')[0]) return; selectedDate = d; updateSidebarStats(); renderCalendar(); }
function saveAndRender() { localStorage.setItem("trackerHistory", JSON.stringify(history)); renderCalendar(); updateSidebarStats(); }
function resetDayData() { if(confirm("Restart today?")) { delete history[selectedDate]; saveAndRender(); } }
