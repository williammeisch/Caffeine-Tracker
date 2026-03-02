// THE COMPLETE MASTER ARCHIVE
const DRINK_ARCHIVE = [
    // --- MONSTER ENERGY (16oz) ---
    { name: "Monster Energy Original", mg: 160 }, { name: "Monster Zero Sugar", mg: 160 }, { name: "Monster Lo-Carb", mg: 160 },
    { name: "Monster Ultra White", mg: 150 }, { name: "Monster Ultra Peachy Keen", mg: 150 }, { name: "Monster Ultra Watermelon", mg: 150 },
    { name: "Monster Ultra Gold", mg: 150 }, { name: "Monster Ultra Paradise", mg: 150 }, { name: "Monster Ultra Blue", mg: 150 },
    { name: "Monster Ultra Red", mg: 150 }, { name: "Monster Ultra Violet", mg: 150 }, { name: "Monster Ultra Sunrise", mg: 150 },
    { name: "Monster Mango Loco", mg: 160 }, { name: "Monster Pipeline Punch", mg: 160 }, { name: "Monster Khaotic", mg: 160 },
    { name: "Monster Pacific Punch", mg: 160 }, { name: "Java Monster Mean Bean", mg: 200 }, { name: "Java Monster Loca Moca", mg: 200 },
    { name: "Java Monster Salted Caramel", mg: 200 }, { name: "Java Monster 300 French Vanilla", mg: 300 }, { name: "Java Monster 300 Mocha", mg: 300 },
    { name: "Monster Rehab Tea + Lemonade", mg: 160 }, { name: "Monster Rehab Peach", mg: 160 }, { name: "Monster Rehab Strawberry", mg: 160 },
    { name: "Monster Rehab Wild Berry", mg: 160 },

    // --- GHOST ENERGY (16oz) ---
    { name: "Ghost Orange Cream", mg: 200 }, { name: "Ghost Sour Patch Kids Red", mg: 200 }, { name: "Ghost Sour Patch Kids Blue", mg: 200 },
    { name: "Ghost Swedish Fish", mg: 200 }, { name: "Ghost Warheads Watermelon", mg: 200 }, { name: "Ghost Warheads Apple", mg: 200 },
    { name: "Ghost Faze Pop", mg: 200 }, { name: "Ghost Faze Up", mg: 200 }, { name: "Ghost Cherry Limeade", mg: 200 }, { name: "Ghost Sour Pink Lemonade", mg: 200 },

    // --- ALANI NU (12oz) ---
    { name: "Alani Nu Kimade", mg: 200 }, { name: "Alani Nu Cosmic Stardust", mg: 200 }, { name: "Alani Nu Cherry Slush", mg: 200 },
    { name: "Alani Nu Mimosa", mg: 200 }, { name: "Alani Nu Blue Slush", mg: 200 }, { name: "Alani Nu Witch's Brew", mg: 200 },
    { name: "Alani Nu Peach", mg: 200 }, { name: "Alani Nu Hawaiian Shaved Ice", mg: 200 },

    // --- CELSIUS ---
    { name: "Celsius Orange (12oz)", mg: 200 }, { name: "Celsius Kiwi Guava (12oz)", mg: 200 }, { name: "Celsius Fuji Apple (12oz)", mg: 200 },
    { name: "Celsius Peach Vibe (12oz)", mg: 200 }, { name: "Celsius Arctic Vibe (12oz)", mg: 200 }, { name: "Celsius Tropical Vibe (12oz)", mg: 200 },
    { name: "Celsius Strawberry Guava (12oz)", mg: 200 }, { name: "Celsius Raspberry Acai Green Tea", mg: 200 },
    { name: "Celsius Essentials Dragonberry (16oz)", mg: 270 }, { name: "Celsius Essentials Blue Crush (16oz)", mg: 270 }, { name: "Celsius Essentials Cherry Limeade (16oz)", mg: 270 },

    // --- C4 PERFORMANCE ---
    { name: "C4 Frozen Bombsicle (16oz)", mg: 200 }, { name: "C4 Skittles (16oz)", mg: 200 }, { name: "C4 Starburst Strawberry (16oz)", mg: 200 },
    { name: "C4 Starburst Cherry (16oz)", mg: 200 }, { name: "C4 Starburst Lemon (16oz)", mg: 200 }, { name: "C4 Starburst Orange (16oz)", mg: 200 },
    { name: "C4 Ultimate Arctic Snow Cone (16oz)", mg: 300 }, { name: "C4 Ultimate Ruthless Raspberry (16oz)", mg: 300 },

    // --- SODAS (Size Specific) ---
    { name: "Coke Can (12oz)", mg: 34 }, { name: "Coke Bottle (20oz)", mg: 57 }, { name: "Diet Coke Can (12oz)", mg: 46 },
    { name: "Diet Coke Bottle (20oz)", mg: 76 }, { name: "Coke Zero Can (12oz)", mg: 34 }, { name: "Pepsi Can (12oz)", mg: 38 },
    { name: "Pepsi Bottle (20oz)", mg: 63 }, { name: "Diet Pepsi Can (12oz)", mg: 35 }, { name: "Pepsi Zero Sugar Can (12oz)", mg: 69 },
    { name: "Pepsi Zero Sugar Bottle (20oz)", mg: 115 }, { name: "Mountain Dew Can (12oz)", mg: 54 }, { name: "Mountain Dew Bottle (20oz)", mg: 91 },
    { name: "Dr Pepper Can (12oz)", mg: 41 }, { name: "Dr Pepper Bottle (20oz)", mg: 68 },

    // --- COFFEE CHAINS (Grande/Medium) ---
    { name: "Starbucks Pike Place (16oz)", mg: 310 }, { name: "Starbucks Blonde Roast (16oz)", mg: 360 }, { name: "Starbucks Dark Roast (16oz)", mg: 260 },
    { name: "Starbucks Cold Brew (16oz)", mg: 205 }, { name: "Starbucks Nitro Cold Brew (16oz)", mg: 280 }, { name: "Starbucks Americano (16oz)", mg: 225 },
    { name: "Starbucks Iced Shaken Espresso (16oz)", mg: 225 }, { name: "Dunkin Hot Coffee (Medium)", mg: 210 }, { name: "Dunkin Iced Coffee (Medium)", mg: 297 },
    { name: "Dunkin Cold Brew (Medium)", mg: 260 }, { name: "Dutch Bros 9-1-1 (Medium)", mg: 450 }, { name: "Dutch Bros Golden Eagle (Medium)", mg: 180 },
    { name: "Dutch Bros Nitro Cold Brew (Can)", mg: 293 }, { name: "Dutch Bros Rebel Energy (Medium)", mg: 160 },

    // --- PRE-WORKOUTS ---
    { name: "Ryse Loaded Pre", mg: 390 }, { name: "Ryse Godzilla (1 Scoop)", mg: 200 }, { name: "Ryse Godzilla (2 Scoops)", mg: 400 },
    { name: "Bucked Up Standard", mg: 200 }, { name: "Bucked Up LFG", mg: 300 }, { name: "Bucked Up BAMF", mg: 333 },
    { name: "Total War (Redcon1)", mg: 250 }, { name: "Total War RTD Bottle", mg: 300 }, { name: "Gorilla Mode (1 Scoop)", mg: 175 },
    { name: "Gorilla Mode (2 Scoops)", mg: 350 },

    // --- YERBA MATE & TEAS ---
    { name: "Guayaki Bluephoria (15.5oz)", mg: 150 }, { name: "Guayaki Revel Berry (15.5oz)", mg: 150 }, { name: "Guayaki Enlighten Mint (15.5oz)", mg: 150 },
    { name: "Pure Leaf Iced Tea (18.5oz)", mg: 69 }, { name: "Gold Peak Iced Tea (18.5oz)", mg: 47 }, { name: "Arizona Iced Tea (23oz)", mg: 22 }
];

let history = JSON.parse(localStorage.getItem("trackerHistory")) || {};
let today = new Date();
let currentViewMonth = today.getMonth();
let currentViewYear = today.getFullYear();
let selectedDate = today.toISOString().split('T')[0];
const todayKey = today.toISOString().split('T')[0];

window.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    initSearch();
    updateSidebarStats();
});

function initSearch() {
    const searchInput = document.getElementById('caffeineSearch');
    const resultsDiv = document.getElementById('searchResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) { resultsDiv.style.display = 'none'; return; }
        const queryWords = query.split(' ');
        const filtered = DRINK_ARCHIVE.filter(drink => {
            const name = drink.name.toLowerCase();
            return queryWords.every(word => name.includes(word));
        }).slice(0, 15); 
        if (filtered.length > 0) {
            resultsDiv.innerHTML = filtered.map(drink => 
                `<div class="search-item" onclick="selectDrink('${drink.name.replace(/'/g, "\\'")}', ${drink.mg})">
                    ${drink.name} <span>${drink.mg}mg</span>
                </div>`
            ).join('');
            resultsDiv.style.display = 'block';
        } else { resultsDiv.style.display = 'none'; }
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.card')) resultsDiv.style.display = 'none'; });
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
    if (!history[selectedDate].caffeineItems) history[selectedDate].caffeineItems = [];
    history[selectedDate].caffeineItems.push({ name: name, mg: mg, id: Date.now() });
    document.getElementById('caffeineInput').value = "";
    document.getElementById('caffeineSearch').value = "";
    saveAndRender();
}

function deleteCaffeine(id) {
    history[selectedDate].caffeineItems = history[selectedDate].caffeineItems.filter(item => item.id !== id);
    saveAndRender();
}

function submitDailyProfile() {
    let hrs = parseFloat(document.getElementById('sleepInput').value) || 0;
    let qual = parseFloat(document.getElementById('sleepQuality').value) || 1.0;
    let strain = parseFloat(document.getElementById('exerciseSelect').value) || 0;
    if (!history[selectedDate]) history[selectedDate] = { caffeineItems: [], sleep: 0, score: null, quality: 1.0, strain: 0 };
    let day = history[selectedDate];
    day.sleep = hrs; day.quality = qual; day.strain = strain;
    let totalMg = (day.caffeineItems || []).reduce((sum, item) => sum + item.mg, 0);
    let score = 100;
    if (totalMg > 200) score -= (totalMg - 200) * 0.2;
    const effectiveSleep = day.sleep * day.quality;
    if (effectiveSleep < 7) score -= (7 - effectiveSleep) * 10;
    score -= day.strain;
    day.score = Math.max(0, Math.min(100, Math.round(score)));
    saveAndRender();
}

function updateSidebarStats() {
    const day = history[selectedDate] || { caffeineItems: [], sleep: 0, score: null, strain: 0 };
    const totalMg = (day.caffeineItems || []).reduce((sum, item) => sum + item.mg, 0);
    document.getElementById('totalCaffeine').textContent = totalMg;
    document.getElementById('sideScore').textContent = day.score !== null ? day.score + "%" : "--";
    const logList = document.getElementById('caffeineLogList');
    logList.innerHTML = (day.caffeineItems || []).map(item => `
        <div class="log-item"><span>${item.name} (${item.mg}mg)</span><button onclick="deleteCaffeine(${item.id})">✕</button></div>
    `).join('');
    const feedbackBox = document.getElementById('dailyFeedback');
    const feedbackText = document.getElementById('feedbackText');
    if (day.score !== null) {
        feedbackBox.style.display = 'block';
        if (day.score >= 85) feedbackText.textContent = "Strong recovery. Ready for high performance.";
        else if (day.score >= 40) feedbackText.textContent = "Moderate recovery. Manage your workload today.";
        else feedbackText.textContent = "Low Recovery: Rest and hydration are vital today.";
    } else { feedbackBox.style.display = 'none'; }
    const isOver = totalMg > 400;
    document.getElementById('fdaWarningSmall').style.display = isOver ? 'block' : 'none';
    document.getElementById('fdaMainWarning').style.display = isOver ? 'block' : 'none';
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = "";
    const firstDay = new Date(currentViewYear, currentViewMonth, 1).getDay();
    const daysInMonth = new Date(currentViewYear, currentViewMonth + 1, 0).getDate();
    document.getElementById('currentMonthHeader').textContent = new Date(currentViewYear, currentViewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div')).className = 'calendar-day empty';
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentViewYear}-${(currentViewMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayData = history[dateStr];
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';
        if (dateStr === selectedDate) dayCard.classList.add('selected');
        if (dayData && dayData.score !== null) {
            dayCard.style.backgroundColor = dayData.score < 50 ? '#f87171' : dayData.score < 75 ? '#fbbf24' : '#4ade80';
            dayCard.innerHTML = `<span class="day-num">${i}</span><span class="day-score">${dayData.score}%</span>`;
        } else { dayCard.innerHTML = `<span class="day-num">${i}</span>`; }
        dayCard.onclick = () => selectDate(dateStr);
        grid.appendChild(dayCard);
    }
}

function changeMonth(delta) { currentViewMonth += delta; if (currentViewMonth < 0) { currentViewMonth = 11; currentViewYear--; } else if (currentViewMonth > 11) { currentViewMonth = 0; currentViewYear++; } renderCalendar(); }
function selectDate(dateStr) { if (dateStr > todayKey) return; selectedDate = dateStr; updateSidebarStats(); renderCalendar(); }
function saveAndRender() { localStorage.setItem("trackerHistory", JSON.stringify(history)); renderCalendar(); updateSidebarStats(); }
function resetDayData() { if(confirm("Restart for this day?")) { delete history[selectedDate]; saveAndRender(); } }
