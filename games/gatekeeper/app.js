// Konfigurasi Jurusan sesuai permintaan
const JURUSAN_DATA = [
    { kode: "71", nama: "Ilmu Komunikasi" },
    { kode: "72", nama: "Teknologi Informasi" },
    { kode: "73", nama: "Rekayasa Perangkat Lunak" },
    { kode: "74", nama: "Rekayasa Perangkat Keras" }
];

const NAMES = ["Budi Santoso", "Lani Cahya", "Andi Wijaya", "Siti Aminah", "Rizky Pratama", "Dewi Lestari"];

let state = {
    processed: 0,
    correctDecisions: 0,
    history: [],
    currentCard: null,
    startTime: Date.now()
};

// --- LOGIKA GAME ---

function generateStudentData() {
    // Randomize criteria
    const majorObj = JURUSAN_DATA[Math.floor(Math.random() * JURUSAN_DATA.length)];
    const years = ["21", "22", "23", "24", "25"];
    const year = years[Math.floor(Math.random() * years.length)];
    
    // Generate 11-digit NPM: 240 + KodeJur(2) + KodeAng(2) + Seq(4) = 11 digits
    const sequence = Math.floor(1000 + Math.random() * 8999);
    const npm = `240${majorObj.kode}${year}${sequence}`;
    
    const ipk = (Math.random() * (4.0 - 2.0) + 2.0).toFixed(2);
    const statuses = ["Aktif", "Cuti", "Alumni"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];

    // Hidden Validation Logic (The "Backend" Rules)
    const isValid = (
        majorObj.kode === "72" &&      // Harus TI
        year === "25" &&               // Harus Angkatan 25
        parseFloat(ipk) >= 3.00 &&     // IPK minimal 3.00
        status === "Aktif"             // Harus Aktif
    );

    return { name, npm, jurusan: majorObj.nama, ipk, status, isValid };
}

function renderCard() {
    state.currentCard = generateStudentData();
    document.getElementById('val-nama').innerText = state.currentCard.name;
    document.getElementById('val-npm').innerText = state.currentCard.npm;
    document.getElementById('val-jurusan').innerText = state.currentCard.jurusan;
    document.getElementById('val-ipk').innerText = state.currentCard.ipk;
    document.getElementById('val-status').innerText = state.currentCard.status;
}

function handleDecision(isApproving) {
    const isCorrect = (isApproving === state.currentCard.isValid);
    
    if (isCorrect) state.correctDecisions++;
    state.processed++;

    const logEntry = {
        npm: state.currentCard.npm,
        action: isApproving ? "APPROVED" : "REJECTED",
        status: isCorrect ? "CORRECT" : "WRONG",
        className: isCorrect ? "log-success" : "log-error"
    };

    state.history.unshift(logEntry);
    updateUI();
    renderCard();
}

function updateUI() {
    document.getElementById('count').innerText = state.processed;
    const historyContainer = document.getElementById('history-list');
    
    historyContainer.innerHTML = state.history.map(item => `
        <div class="log-item ${item.className}">
            <span>${item.npm}</span>
            <span>${item.action}</span>
            <b>${item.status}</b>
        </div>
    `).join('');
}

// --- MODAL & FINAL SCREEN ---

const guessModal = document.getElementById('modal-overlay');
const resultScreen = document.getElementById('result-screen');

document.getElementById('btn-guess-trigger').onclick = () => guessModal.classList.remove('hidden');
document.getElementById('btn-close-modal').onclick = () => guessModal.classList.add('hidden');

document.getElementById('guess-form').onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const guessedJurusan = formData.get('jurusan');
    const guessedAngkatan = formData.get('angkatan');
    
    // Simple verification for the demo
    const isRulesCorrect = (guessedJurusan === "72" && guessedAngkatan === "25");
    
    showFinalResults(isRulesCorrect);
};

function showFinalResults(isRulesCorrect) {
    guessModal.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
    
    document.getElementById('final-stats').innerHTML = `
        <p>Rule Deduction: <b>${isRulesCorrect ? "SUCCESS ✅" : "FAILED ❌"}</b></p>
        <p>Total Cards Processed: <b>${state.processed}</b></p>
        <p>Accuracy: <b>${((state.correctDecisions/state.processed)*100 || 0).toFixed(1)}%</b></p>
        <p>Time Spent: <b>${timeSpent} seconds</b></p>
    `;
}

// --- INIT ---
document.getElementById('btn-approve').onclick = () => handleDecision(true);
document.getElementById('btn-reject').onclick = () => handleDecision(false);

renderCard();