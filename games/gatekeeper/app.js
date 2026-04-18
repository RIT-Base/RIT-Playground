// app.js

const JURUSAN_DATA = [
    { kode: "71", nama: "Ilmu Komunikasi" },
    { kode: "72", nama: "Teknologi Informasi" },
    { kode: "73", nama: "Rekayasa Perangkat Lunak" },
    { kode: "74", nama: "Rekayasa Perangkat Keras" }
];

const NAMES = ["Budi Santoso", "Lani Cahya", "Andi Wijaya", "Siti Aminah", "Rizky Pratama", "Dewi Lestari", "Rendi Maulana", "Nisa Amelia"];

let state = {
    processed: 0,
    correctDecisions: 0,
    history: [],
    currentCard: null,
    startTime: Date.now()
};

function generateStudentData() {
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

    // Backend Rule Asli: TI(72), Angkatan 25, IPK >= 3.0, Aktif
    const isValid = (
        majorObj.kode === "72" &&      
        year === "25" &&               
        parseFloat(ipk) >= 3.00 &&     
        status === "Aktif"             
    );

    return { name, npm, jurusan: majorObj.nama, ipk, status, isValid };
}

function renderCard() {
    state.currentCard = generateStudentData();
    document.getElementById('val-nama').innerText = state.currentCard.name;
    document.getElementById('val-npm').innerText = state.currentCard.npm;
    document.getElementById('val-jurusan').innerText = state.currentCard.jurusan;
    document.getElementById('val-ipk').innerText = state.currentCard.ipk;
    
    const statusEl = document.getElementById('val-status');
    statusEl.innerText = state.currentCard.status;
    
    // Memberikan warna merah jika status tidak aktif agar lebih terlihat perbedaannya
    if(state.currentCard.status !== "Aktif") {
        statusEl.classList.add("text-red-400");
    } else {
        statusEl.classList.remove("text-red-400");
    }
}

function handleDecision(isApproving) {
    const isCorrect = (isApproving === state.currentCard.isValid);
    
    if (isCorrect) state.correctDecisions++;
    state.processed++;

    const logEntry = {
        npm: state.currentCard.npm,
        action: isApproving ? "APP" : "REJ",
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
            <span class="font-mono">${item.npm}</span>
            <span class="font-bold text-xs px-2 py-1 bg-slate-800 rounded">${item.action}</span>
            <b class="${item.status === 'CORRECT' ? 'text-emerald-400' : 'text-red-400'}">${item.status}</b>
        </div>
    `).join('');
}

// --- MODAL & FINAL SCREEN ---

const guessModal = document.getElementById('modal-overlay');
const resultScreen = document.getElementById('result-screen');

document.getElementById('btn-guess-trigger').addEventListener('click', () => {
    guessModal.classList.remove('hidden');
});

document.getElementById('btn-close-modal').addEventListener('click', () => {
    guessModal.classList.add('hidden');
});

document.getElementById('guess-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const guessedJurusan = formData.get('jurusan');
    const guessedAngkatan = formData.get('angkatan');
    const guessedIpkOp = formData.get('ipk_operator');
    const guessedIpkVal = parseFloat(formData.get('ipk_value'));
    const guessedStatus = formData.get('status_mhs');
    
    // Verifikasi jawaban tebakan mahasiswa
    const isRulesCorrect = (
        guessedJurusan === "72" && 
        guessedAngkatan === "25" &&
        guessedIpkOp === ">=" &&
        guessedIpkVal === 3 &&  // Evaluasi 3 atau 3.0
        guessedStatus === "Aktif"
    );
    
    showFinalResults(isRulesCorrect);
});

function showFinalResults(isRulesCorrect) {
    guessModal.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
    const acc = ((state.correctDecisions / state.processed) * 100 || 0).toFixed(1);
    
    document.getElementById('final-stats').innerHTML = `
        <div class="p-3 ${isRulesCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' : 'bg-red-500/20 text-red-400 border border-red-500'} rounded mb-4">
            Rule Deduction: <b class="text-xl">${isRulesCorrect ? "SUCCESS" : "FAILED"}</b>
        </div>
        <div class="flex justify-between border-b border-slate-700 pb-2">
            <span>Cards Processed:</span> <b class="text-white">${state.processed}</b>
        </div>
        <div class="flex justify-between border-b border-slate-700 pb-2">
            <span>Accuracy:</span> <b class="${acc > 80 ? 'text-emerald-400' : 'text-yellow-400'}">${acc}%</b>
        </div>
        <div class="flex justify-between">
            <span>Time Spent:</span> <b class="text-white">${timeSpent}s</b>
        </div>
    `;
}

// --- INIT ---
document.getElementById('btn-approve').addEventListener('click', () => handleDecision(true));
document.getElementById('btn-reject').addEventListener('click', () => handleDecision(false));

renderCard();