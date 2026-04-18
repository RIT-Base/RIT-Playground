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
    // MEMBUAT CHANCE 50/50
    // true = Sistem akan sengaja membuat data yang 100% Valid
    // false = Sistem akan membuat data random (yang kemungkinan besar salah)
    const isIntendedValid = Math.random() >= 0.5;

    let majorObj, year, ipk, status;

    if (isIntendedValid) {
        // Force Data Benar
        majorObj = JURUSAN_DATA.find(j => j.kode === "72"); // Harus TI
        year = "25"; // Harus Angkatan 25
        ipk = (Math.random() * (4.0 - 3.0) + 3.0).toFixed(2); // IPK 3.00 - 4.00
        status = "Aktif"; // Harus Aktif
    } else {
        // Force Data Random (Bisa salah di satu atau beberapa aspek)
        majorObj = JURUSAN_DATA[Math.floor(Math.random() * JURUSAN_DATA.length)];
        const years = ["21", "22", "23", "24", "25"];
        year = years[Math.floor(Math.random() * years.length)];
        ipk = (Math.random() * (4.0 - 2.0) + 2.0).toFixed(2);
        const statuses = ["Aktif", "Cuti", "Alumni"];
        status = statuses[Math.floor(Math.random() * statuses.length)];

        // Keamanan tambahan: Jika data random kebetulan 100% benar, kita paksakan salah satu jadi salah
        if (majorObj.kode === "72" && year === "25" && parseFloat(ipk) >= 3.00 && status === "Aktif") {
            status = "Cuti"; // Membatalkan validitas
        }
    }
    
    // Generate 11-digit NPM: 240 + KodeJur(2) + KodeAng(2) + Seq(4) = 11 digits
    const sequence = Math.floor(1000 + Math.random() * 8999);
    const npm = `240${majorObj.kode}${year}${sequence}`;
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];

    // Cek ulang dengan Backend Rule Asli
    const isValid = (
        majorObj.kode === "72" &&      
        year === "25" &&               
        parseFloat(ipk) >= 3.00 &&     
        status === "Aktif"             
    );

    return { name, npm, jurusan: majorObj.nama, ipk, status, isValid, kodeJur: majorObj.kode };
}

function renderCard() {
    state.currentCard = generateStudentData();
    document.getElementById('val-nama').innerText = state.currentCard.name;
    document.getElementById('val-npm').innerText = state.currentCard.npm;
    document.getElementById('val-jurusan').innerText = state.currentCard.jurusan;
    document.getElementById('val-ipk').innerText = state.currentCard.ipk;
    
    const statusEl = document.getElementById('val-status');
    statusEl.innerText = state.currentCard.status;
    
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

    // Menyimpan juga data kartu ke dalam history log
    const logEntry = {
        npm: state.currentCard.npm,
        jurusan_kode: state.currentCard.kodeJur,
        ipk: state.currentCard.ipk,
        status_mhs: state.currentCard.status,
        action: isApproving ? "APPROVE" : "REJECT",
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
    
    // Render UI History dengan data yang lebih lengkap
    historyContainer.innerHTML = state.history.map(item => `
        <div class="log-card ${item.className} p-3 mb-2 rounded-md border-l-4">
            <div class="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-2">
                <span class="font-mono font-bold text-cyan-300 text-sm">${item.npm}</span>
                <div class="flex gap-2 items-center">
                    <span class="font-bold text-[10px] px-2 py-1 bg-slate-800 rounded text-white">${item.action}</span>
                    <b class="text-xs ${item.status === 'CORRECT' ? 'text-emerald-400' : 'text-red-400'}">${item.status}</b>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-2 text-[11px] text-slate-400">
                <div>Jur: <span class="text-white">${item.jurusan_kode}</span></div>
                <div>IPK: <span class="text-white">${item.ipk}</span></div>
                <div>Status: <span class="text-white">${item.status_mhs}</span></div>
            </div>
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
    
    const isRulesCorrect = (
        guessedJurusan === "72" && 
        guessedAngkatan === "25" &&
        guessedIpkOp === ">=" &&
        guessedIpkVal === 3 &&  
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
            Rule Deduction: <b class="text-xl">${isRulesCorrect ? "SUCCESS ✅" : "FAILED ❌"}</b>
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