// Game Constants
const UPLOAD_TIME = 180; // 3 minutes in seconds
let timeLeft = UPLOAD_TIME;
let battery = 100;
let wifiSignal = 100;
let isGameActive = false;
let gameInterval;

const turnInBtn = document.getElementById('test-button');
const progressFill = document.getElementById('progress-fill');
const percentText = document.getElementById('percent-text');
const statusContainer = document.getElementById('status-container');
const statsDisplay = document.getElementById('stats-display');

const modal = document.createElement('div');
modal.className = 'fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-s z-50';
modal.innerHTML = `
<div class="bg-white p-6 rounded-lg shadow-2xl w-64">
    <h3 class="font-bold mb-4">Settings</h3>
    <button id="fix-wifi" class="w-full mb-2 bg-blue-100 py-2 rounded hover:bg-blue-200">Reconnect Wi-Fi</button>
    <button id="plug-charger" class="w-full bg-green-100 py-2 rounded hover:bg-green-200">Plug in Charger</button>
    <button id="close-modal" class="mt-4 w-full text-gray-500 text-sm">Close</button>
</div>`;

document.getElementById("control-panel").addEventListener('click', () => {
    document.body.appendChild(modal);
});

modal.addEventListener('click', (e) => {
    if(e.target.id === 'fix-wifi') wifiSignal = Math.min(wifiSignal + 30, 100);
    if(e.target.id === 'plug-charger') battery = Math.min(battery + 25, 100);
    if(e.target.id === 'close-modal') modal.remove();
    updateDisplays();
});

// --- Game Functions ---

function startGame() {
    isGameActive = true;
    turnInBtn.disabled = true;
    turnInBtn.innerText = "Uploading...";
    statusContainer.classList.remove('hidden');
    statsDisplay.classList.remove('hidden');

    gameInterval = setInterval(() => {
        // 1. Progress Logic
        timeLeft--;
        const progress = ((UPLOAD_TIME - timeLeft) / UPLOAD_TIME) * 100;
        progressFill.style.width = `${progress}%`;
        percentText.innerText = `${Math.floor(progress)}%`;

        // 2. Resource Drain (Randomized)
        battery -= Math.random() * 0.8; 
        wifiSignal -= Math.random() * 1.2;

        updateDisplays();

        // 3. Lose Conditions
        if (battery <= 0) endGame("Laptop died! Assignment not submitted.");
        if (wifiSignal <= 0) endGame("Internet disconnected! Upload failed.");

        // 4. Win Condition
        if (timeLeft <= 0) endGame("Success! Assignment turned in.", true);

    }, 1000);
}

function updateDisplays() {
    document.getElementById('stat-battery').innerText = `Battery: ${Math.max(0, Math.floor(battery))}%`;
    document.getElementById('stat-wifi').innerText = `Signal: ${Math.max(0, Math.floor(wifiSignal))}%`;
    
    // Visual warnings
    if (battery < 20) document.getElementById('stat-battery').classList.add('text-red-600');
    if (wifiSignal < 20) document.getElementById('stat-wifi').classList.add('text-red-600');
}

function endGame(message, isWin = false) {
    clearInterval(gameInterval);
    isGameActive = false;
    alert(message);
    location.reload(); // Reset the game
}

turnInBtn.addEventListener('click', startGame);