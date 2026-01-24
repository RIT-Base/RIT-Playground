// games/tos_nightmare/app.js

// --- STATE MANAGEMENT ---
const state = {
    currentLevel: 1, // Start level 1
    lives: 3,
    maxLives: 3,
    isTransitioning: false
};

// --- DOM REFERENCES ---
const gameArea = document.getElementById('game-area');
const levelIndicator = document.getElementById('level-indicator');
const livesDisplay = document.getElementById('lives-display');
const toast = document.getElementById('toast');

// --- UTILS ---
function showToast(msg) {
    toast.innerText = msg;
    toast.classList.remove('opacity-0');
    setTimeout(() => toast.classList.add('opacity-0'), 2000);
}

function updateHUD() {
    levelIndicator.innerText = state.currentLevel;
    livesDisplay.innerText = '❤️'.repeat(state.lives);
    
    if (state.lives <= 0) {
        gameOver();
    }
}

function triggerShake() {
    gameArea.classList.remove('shake');
    void gameArea.offsetWidth; // Trigger Reflow
    gameArea.classList.add('shake');
    // Vibrate di HP jika support
    if (navigator.vibrate) navigator.vibrate(200);
}

function nextLevel() {
    if (state.isTransitioning) return;
    state.isTransitioning = true;
    
    state.currentLevel++;
    updateHUD();
    
    // Simple fade out logic could go here
    setTimeout(() => {
        renderLevel(state.currentLevel);
        state.isTransitioning = false;
    }, 300);
}

function takeDamage(msg) {
    state.lives--;
    updateHUD();
    triggerShake();
    showToast(msg || "AKSES DITOLAK!");
}

function gameOver() {
    gameArea.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center fade-in">
            <div class="text-6xl mb-4">💀</div>
            <h1 class="text-3xl font-bold text-red-500 mb-2">GAME OVER</h1>
            <p class="text-gray-400 mb-8 text-sm">Identitas digital Anda telah dihapus.</p>
            <button onclick="location.reload()" class="bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 w-full">ULANGI DARI AWAL</button>
        </div>
    `;
}

const levels = {
    // --- LEVEL DEFINITIONS (FASE 1) ---
    // LEVEL 1: SCROLL TO BOTTOM
    1: {
        render: () => `
            <div class="flex flex-col h-full bg-gray-800 rounded-xl border border-gray-700 overflow-hidden fade-in">
                <div class="bg-gray-700 p-3 border-b border-gray-600 flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <span class="text-xs font-bold text-gray-300">TERMS_BASIC.TXT</span>
                </div>
                
                <div class="p-4 flex-grow relative overflow-hidden flex flex-col">
                    <p class="text-sm text-gray-300 mb-4 font-bold">Selamat datang. Baca dulu ya.</p>
                    
                    <div id="tos-scroll" class="legal-scroll flex-grow overflow-y-auto bg-gray-900 p-3 rounded border border-gray-700 text-xs text-gray-400 leading-relaxed font-mono">
                        <p class="mb-4"><strong>PASAL 1 (KETENTUAN UMUM):</strong> Dengan membaca kalimat ini, Anda menyadari bahwa Anda sedang membuang waktu berharga yang seharusnya bisa digunakan untuk mengerjakan revisi skripsi atau menamatkan backlog game di Steam.</p>
                        <p class="mb-4"><strong>PASAL 2 (HAK DEVELOPER):</strong> Developer berhak untuk mengubah aturan ini sesuka hati, tergantung suasana hati (mood), cuaca di Bandung, dan ketersediaan kopi di meja kerja.</p>
                        <p class="mb-4"><strong>PASAL 3 (TENTANG SCROLLING):</strong> Kami tahu jempol Anda mulai lelah. Tapi percayalah, olahraga jari itu penting untuk mencegah kram saat <em>coding</em> nanti.</p>
                        <p class="mb-4"><strong>PASAL 4.04 (NOT FOUND):</strong> Pasal ini tidak ditemukan. Silakan refresh browser Anda atau hubungi admin jika Anda peduli (padahal admin juga tidak peduli).</p>
                        <p class="mb-4"><strong>PASAL 5 (DISCLAIMER BATERAI):</strong> Kami tidak bertanggung jawab jika baterai HP Anda habis saat membaca dokumen ini. Siapa suruh lupa bawa powerbank?</p>
                        <p class="mb-4"><strong>PASAL 6:</strong> Apakah Anda masih membaca? Wow. Dedikasi Anda luar biasa. Seharusnya Anda membaca jurnal penelitian sedetail ini.</p>
                        <p class="mb-4"><strong>PASAL 7 (FORCE MAJEURE):</strong> Perjanjian ini batal demi hukum jika terjadi serangan alien, kiamat zombie, atau jika dosen pembimbing tiba-tiba membalas chat di hari Minggu.</p>
                        <p class="mb-4"><strong>PASAL 8 s/d 15 (DILOMPATI):</strong> Pasal-pasal ini sengaja dihapus karena isinya terlalu membosankan, bahkan bagi lawyer sekalipun. Anggap saja isinya tentang cookie, data, dan hal-hal membosankan lainnya.</p>
                        <p class="mb-4"><strong>PASAL 16 (PENGAKUAN DOSA):</strong> Sebenarnya teks ini dibuat jam 3 pagi sambil menahan kantuk. Jadi kalau ada <em>typo</em>, harap dimaklumi. Manusia tempatnya salah, GitHub tempatnya menaruh kesalahan itu.</p>
                        <p class="mb-4"><strong>PASAL 17:</strong> Pihak Pertama (Kami) berhak mengambil satu potong gorengan milik Pihak Kedua (Anda) jika kita bertemu secara fisik di kantin.</p>
                        <p class="mb-4"><strong>PASAL 18 (KLARIFIKASI):</strong> Tombol "Setuju" belum terlihat, kan? Sabar. Orang sabar disayang Tuhan, orang tidak sabar biasanya koneksi internetnya lemot.</p>
                        <p class="mb-4"><strong>PASAL 19:</strong> Lorem ipsum dolor sit amet... Ah sudahlah, saya tahu Anda tidak bisa bahasa Latin. Intinya: Scroll lagi.</p>
                        <p class="mb-4"><strong>PASAL 20:</strong> Ini adalah ujian kesabaran. Anggap saja ini simulasi mengantri di birokrasi pemerintahan, tapi versi digital dan tanpa perlu fotokopi KTP.</p>
                        <p class="mb-4"><strong>PASAL 21 (PRIVASI):</strong> Kami berjanji tidak akan menjual data Anda, kecuali ada yang menawar dengan harga sangat tinggi. (Bercanda. Atau tidak? Hmmm).</p>
                        <p class="mb-4"><strong>PASAL 22:</strong> Sedikit lagi. Serius. Jangan menyerah seperti saat melihat error di console log.</p>
                        <p class="mb-4"><strong>PASAL 23:</strong> Dengan mencapai titik ini, Anda setuju untuk mengakui bahwa RIT adalah organisasi terkeren di kampus ini. Tidak ada penolakan.</p>
                        <p class="mb-4"><strong>PASAL 99 (PENUTUP):</strong> Akhirnya sampai juga. Selamat! Anda telah membuktikan bahwa Anda memiliki kemampuan literasi (atau kemampuan scroll cepat) yang mumpuni. Silakan tekan tombol di bawah jika Anda menemukannya.</p>
                        <p class="mb-4" style="opacity: 0.5; font-size: 0.8rem;"><em>Drafted by: Tim Developer kurang gaji.</em></p>
                        <div class="h-10"></div> </div>
                </div>

                <div class="p-4 bg-gray-800 border-t border-gray-700">
                    <button id="btn-agree" disabled class="w-full bg-blue-600 text-white py-3 rounded font-bold disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-all opacity-50">
                        I AGREE (Scroll First)
                    </button>
                </div>
            </div>
        `,
        setup: () => {
            const scrollBox = document.getElementById('tos-scroll');
            const btn = document.getElementById('btn-agree');
            let scrolled = false;

            scrollBox.addEventListener('scroll', () => {
                // Deteksi jika sudah mentok bawah (toleransi 5px)
                if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 5) {
                    if (!scrolled) {
                        scrolled = true;
                        btn.disabled = false;
                        btn.classList.remove('opacity-50', 'disabled:bg-gray-600');
                        btn.innerText = "I AGREE";
                        btn.classList.add('animate-pulse'); // Visual cue
                    }
                }
            });

            btn.addEventListener('click', () => {
                nextLevel();
            });
        }
    },

    // LEVEL 2: DARK PATTERN (CHECKBOX)
    2: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in px-4">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-2xl w-full max-w-md mx-auto flex flex-col max-h-[90vh]">
                    
                    <div class="shrink-0">
                        <h2 class="text-xl font-bold mb-2 text-yellow-400">⚠ PEMBERITAHUAN PRIVASI</h2>
                        <p class="text-sm text-gray-300 mb-4 leading-relaxed border-b border-gray-700 pb-4">
                            Kami menghargai privasi Anda, tapi kami lebih menghargai uang dari pengiklan.
                        </p>
                    </div>

                    <div class="space-y-3 mb-6 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                        
                        <div class="bg-gray-900/50 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors">
                            <label class="flex items-start gap-3 cursor-pointer select-none">
                                <div class="relative flex items-center mt-1">
                                    <input type="checkbox" id="chk-satelit" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-red-500 checked:border-red-500 transition-all trap-checkbox">
                                    <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="text-sm text-gray-300">
                                    Saya <strong class="text-white">MENOLAK</strong> hak saya untuk <strong class="text-white">TIDAK</strong> dilacak oleh satelit mata-mata.
                                </span>
                            </label>
                        </div>

                        <div class="bg-gray-900/50 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors">
                            <label class="flex items-start gap-3 cursor-pointer select-none">
                                <div class="relative flex items-center mt-1">
                                    <input type="checkbox" id="chk-lapar" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-red-500 checked:border-red-500 transition-all trap-checkbox">
                                    <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="text-sm text-gray-300">
                                    Saya memilih untuk membiarkan developer kelaparan daripada memberikan data anonim yang tidak berharga.
                                </span>
                            </label>
                        </div>

                        <div class="bg-gray-900/50 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors">
                            <label class="flex items-start gap-3 cursor-pointer select-none">
                                <div class="relative flex items-center mt-1">
                                    <input type="checkbox" id="chk-obat" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-red-500 checked:border-red-500 transition-all trap-checkbox">
                                    <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="text-sm text-gray-300">
                                    Tolong <strong class="text-white">JANGAN HENTIKAN</strong> pengiriman email promosi obat kuat ke inbox dosen wali saya.
                                </span>
                            </label>
                        </div>

                        <div class="bg-gray-900/50 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors">
                            <label class="flex items-start gap-3 cursor-pointer select-none">
                                <div class="relative flex items-center mt-1">
                                    <input type="checkbox" id="chk-pass" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-red-500 checked:border-red-500 transition-all trap-checkbox">
                                    <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="text-sm text-gray-300">
                                    Hapus centang ini jika Anda <strong class="text-white">TIDAK</strong> keberatan jika kami <strong class="text-white">GAGAL</strong> melindungi password Anda.
                                </span>
                            </label>
                        </div>

                        <div class="bg-gray-900/50 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors">
                            <label class="flex items-start gap-3 cursor-pointer select-none">
                                <div class="relative flex items-center mt-1">
                                    <input type="checkbox" id="chk-cam" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-red-500 checked:border-red-500 transition-all trap-checkbox">
                                    <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="text-sm text-gray-300">
                                    Saya mengizinkan akses kamera depan untuk menilai ekspresi wajah saya saat <em>coding</em> error.
                                </span>
                            </label>
                        </div>

                        <div class="bg-gray-900/50 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors">
                            <label class="flex items-start gap-3 cursor-pointer select-none">
                                <div class="relative flex items-center mt-1">
                                    <input type="checkbox" id="chk-slow" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-red-500 checked:border-red-500 transition-all trap-checkbox">
                                    <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="text-sm text-gray-300">
                                    Saya mengerti bahwa menolak opsi ini akan membuat loading website menjadi 10x lebih lambat secara sengaja.
                                </span>
                            </label>
                        </div>

                        <div class="bg-gray-900/50 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors">
                            <label class="flex items-start gap-3 cursor-pointer select-none">
                                <div class="relative flex items-center mt-1">
                                    <input type="checkbox" id="chk-sosmed" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-red-500 checked:border-red-500 transition-all trap-checkbox">
                                    <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span class="text-sm text-gray-300">
                                    Saya setuju untuk <strong class="text-white">TIDAK MENUNTUT</strong> jika akun media sosial saya tiba-tiba memposting "I Love RIT" secara otomatis.
                                </span>
                            </label>
                        </div>

                    </div>

                    <div class="shrink-0 pt-2 border-t border-gray-700/50">
                        <button id="btn-submit-lvl2" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors shadow-lg">
                            ACCEPT & CONTINUE
                        </button>
                    </div>
                </div>
            </div>
        `,
        setup: () => {
            const btn = document.getElementById('btn-submit-lvl2');
            
            // Ambil semua checkbox jebakan
            const traps = document.querySelectorAll('.trap-checkbox');

            btn.addEventListener('click', () => {
                let isTrapped = false;
                let errorMessage = "";

                // Cek satu per satu
                traps.forEach(chk => {
                    if (chk.checked) {
                        isTrapped = true;
                        // Efek visual: Bikin checkboxnya berkedip merah kalau masih dicentang
                        chk.closest('div.bg-gray-900\\/50').classList.add('animate-pulse');
                    } else {
                        chk.closest('div.bg-gray-900\\/50').classList.remove('animate-pulse');
                    }
                });

                if (isTrapped) {
                    // Randomly pilih pesan error biar ngeselin
                    const insults = [
                        "Hayo, dibaca lagi! Masih ada jebakan yang dicentang.",
                        "Kamu mau data kamu dijual? Uncheck semua woy!",
                        "Serius mau dosen wali dapet spam? Jangan ngadi-ngadi.",
                        "Satelit mata-mata sedang mengunci lokasi Anda... Matikan centangnya!"
                    ];
                    const randomMsg = insults[Math.floor(Math.random() * insults.length)];
                    
                    takeDamage(randomMsg);
                } else {
                    // Lolos semua
                    nextLevel();
                }
            });
        }
    },

    // LEVEL 3: KNOWLEDGE CHECK (WARNA HURUF G)
    3: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
                    <div class="text-4xl mb-4">🤖</div>
                    <h2 class="text-lg font-bold mb-2">VERIFIKASI MANUSIA</h2>
                    <p class="text-sm text-gray-400 mb-6">
                        Untuk memastikan Anda bukan bot, jawab pertanyaan ini:
                        <br><br>
                        <span class="text-white font-bold text-base">"Apa warna huruf 'G' PERTAMA pada logo Google?"</span>
                    </p>

                    <div class="grid grid-cols-2 gap-3">
                        <button class="ans-btn bg-red-500 hover:bg-red-400 h-16 rounded font-bold text-white shadow-md transition-transform active:scale-95" data-color="red">MERAH</button>
                        <button class="ans-btn bg-blue-500 hover:bg-blue-400 h-16 rounded font-bold text-white shadow-md transition-transform active:scale-95" data-color="blue">BIRU</button>
                        <button class="ans-btn bg-green-500 hover:bg-green-400 h-16 rounded font-bold text-white shadow-md transition-transform active:scale-95" data-color="green">HIJAU</button>
                        <button class="ans-btn bg-yellow-500 hover:bg-yellow-400 h-16 rounded font-bold text-white shadow-md transition-transform active:scale-95 text-black" data-color="yellow">KUNING</button>
                    </div>
                </div>
            </div>
        `,
        setup: () => {
            const buttons = document.querySelectorAll('.ans-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const color = e.target.dataset.color;
                    if (color === 'blue') {
                        nextLevel();
                    } else {
                        takeDamage(`Salah! 'G' itu biru. Kamu bot ya?`);
                    }
                });
            });
        }
    },

    // LEVEL 4: COMPLIANCE (TYPO)
    4: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <div class="text-4xl mb-2 text-center">🐈</div>
                    <h2 class="text-lg font-bold mb-2 text-center">PERNYATAAN SUKARELA</h2>
                    <p class="text-xs text-gray-400 mb-4 text-center">
                        Ketik ulang kalimat di bawah persis sama (termasuk typo) untuk menyetujui bahwa Anda menyerahkan hak asuh kucing Anda.
                    </p>

                    <div class="bg-black p-4 rounded mb-4 text-center border border-gray-600">
                        <code class="text-green-400 font-bold text-lg select-all">sya mnyetujui sgalanya</code>
                    </div>

                    <input type="text" id="typo-input" class="w-full bg-gray-700 text-white p-3 rounded border-2 border-transparent focus:border-blue-500 focus:outline-none text-center font-mono text-lg placeholder-gray-500" placeholder="Ketik di sini..." autocomplete="off">

                    <button id="btn-lvl4" disabled class="w-full bg-blue-600 mt-4 text-white py-3 rounded font-bold disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all opacity-50">
                        SUBMIT PERNYATAAN
                    </button>
                </div>
            </div>
        `,
        setup: () => {
            const input = document.getElementById('typo-input');
            const btn = document.getElementById('btn-lvl4');
            const targetText = "sya mnyetujui sgalanya";

            input.addEventListener('input', () => {
                const val = input.value;
                
                // Real-time validation visual
                if (val === targetText) {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-green-500');
                    btn.disabled = false;
                    btn.classList.remove('opacity-50');
                } else {
                    btn.disabled = true;
                    btn.classList.add('opacity-50');
                    
                    // Jika user mengetik panjangnya sama/lebih tapi salah
                    if (val.length >= targetText.length && val !== targetText) {
                        input.classList.add('border-red-500');
                        input.classList.remove('border-green-500');
                    } else {
                         input.classList.remove('border-red-500', 'border-green-500');
                    }
                }
            });

            btn.addEventListener('click', () => {
                if (input.value === targetText) {
                    nextLevel();
                }
            });
        }
    },

    // --- FASE 2: ESCALATION (LEVEL 5-8) ---
    // LEVEL 5: THE BUTTON (HIDE & SEEK)
  5: {
        render: () => `
            <div class="flex flex-col h-full fade-in">
                <div class="bg-gray-800 p-4 rounded-t-xl border border-gray-700 flex justify-between items-center">
                    <div>
                        <h2 class="text-lg font-bold text-green-500 font-mono">>>> SYSTEM_LOG_DUMP</h2>
                        <p class="text-xs text-gray-400">GUI failed to load. Manual override required.</p>
                    </div>
                    <div class="animate-pulse w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div class="bg-black p-4 border-x border-b border-gray-700 rounded-b-xl flex-grow overflow-y-auto relative custom-scrollbar">
                    <div id="text-wall" class="text-gray-600 text-xs text-justify leading-relaxed font-mono select-none break-all">
                        </div>
                </div>
            </div>
        `,
        setup: () => {
            const container = document.getElementById('text-wall');
            
            // Kumpulan kata-kata "Techno-babble" & Log Systems
            // Ini terlihat seperti sistem yang sedang bekerja keras
            const jargon = [
                "INITIALIZING_HANDSHAKE", "0x4F5A2", "BUFFER_OVERFLOW", "DATA_MINING", 
                "PRIVACY_BYPASS", "ENCRYPTING_USER_SOUL", "LOADING_ASSETS", "RENDER_TEXTURE", 
                "MEMORY_LEAK_DETECTED", "ETHICAL_CONSTRAINTS_DISABLED", "OPTIMIZING_AD_REVENUE", 
                "TRACKING_PIXELS_ACTIVE", "IP_LOGGED", "GEOLOCATION_SYNC", "UPLOAD_COMPLETE", 
                "SYSTEM_32", "KERNEL_PANIC", "NULL_POINTER", "STACK_TRACE", "DEPRECATED_API",
                "USER_AGREEMENT_PENDING", "TERMS_V9.2", "COPYRIGHT_INFRINGEMENT", "SUBMIT_DATA",
                "FATAL_ERROR", "RETRYING_CONNECTION", "PING_LOCALHOST", "SSH_TUNNEL", "SUDO_ACCESS"
            ];
            
            // Buat array kata yang panjang (misal 500 kata)
            let logStream = [];
            for(let i=0; i<400; i++) {
                // Ambil kata acak dari array jargon
                const randomWord = jargon[Math.floor(Math.random() * jargon.length)];
                // Tambahkan elemen dekorasi biar makin 'hacker'
                const decoration = Math.random() > 0.8 ? `[${Math.floor(Math.random()*999)}]` : "";
                logStream.push(decoration + randomWord);
            }

            // Tentukan posisi tombol rahasia (di 1/3 akhir teks biar user scroll dulu)
            const btnIndex = Math.floor(Math.random() * 100) + 250; 
            
            let html = "";
            logStream.forEach((word, i) => {
                if (i === btnIndex) {
                    // TOMBOL RAHASIA
                    // Warnanya abu-abu (gray-600) sama seperti teks lain.
                    // Tapi kalau di-hover berubah jadi Hijau Neon & Bold.
                    html += `<span id="hidden-btn" class="cursor-pointer text-gray-600 hover:text-green-400 hover:bg-gray-900 hover:font-bold transition-all duration-75">[AGREE_TERMS]</span> `;
                } else {
                    // Teks biasa
                    // Kadang-kadang ada teks yang warnanya agak beda dikit buat kecoh
                    const colorClass = Math.random() > 0.95 ? "text-gray-500" : "text-gray-600";
                    html += `<span class="${colorClass}">${word}</span> `;
                }
            });
            
            container.innerHTML = html;

            const btn = document.getElementById('hidden-btn');
            btn.addEventListener('click', () => {
                // Efek visual sedikit saat diklik
                btn.innerText = "ACCESS_GRANTED";
                btn.classList.add("text-green-500", "bg-black");
                setTimeout(() => {
                    nextLevel();
                }, 500);
            });
        }
    },

    // LEVEL 6: THE CHECKBOX (DOUBLE NEGATIVE)
    6: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in px-4">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-2xl w-full max-w-md mx-auto">
                    <h2 class="text-xl font-bold mb-2 text-yellow-400">⚠ UJIAN LOGIKA PRIVASI</h2>
                    <p class="text-sm text-gray-300 mb-6 font-bold bg-black/30 p-2 rounded text-center border border-gray-600">
                        MISI: Konfigurasi agar akun Anda AMAN & NYAMAN.
                    </p>

                    <div class="space-y-4 mb-6">
                        <label class="flex items-start gap-3 cursor-pointer p-3 bg-gray-900 rounded border border-gray-600 hover:bg-gray-800 transition select-none">
                            <input type="checkbox" id="chk-6-1" class="mt-1 accent-red-500 w-5 h-5 cursor-pointer">
                            <div class="text-xs text-gray-300">
                                "Jangan tidak jual data saya kepada pihak ketiga yang tidak bertanggung jawab."
                            </div>
                        </label>

                        <label class="flex items-start gap-3 cursor-pointer p-3 bg-gray-900 rounded border border-gray-600 hover:bg-gray-800 transition select-none">
                            <input type="checkbox" id="chk-6-2" class="mt-1 accent-red-500 w-5 h-5 cursor-pointer">
                            <div class="text-xs text-gray-300">
                                "Hapus akun saya secara permanen jika saya tidak aktif selama 5 menit."
                            </div>
                        </label>

                        <label class="flex items-start gap-3 cursor-pointer p-3 bg-gray-900 rounded border border-gray-600 hover:border-green-500 transition select-none group">
                            <input type="checkbox" id="chk-6-secure" class="mt-1 accent-green-500 w-5 h-5 cursor-pointer">
                            <div class="text-xs text-gray-300 group-hover:text-white">
                                "Saya TIDAK MEMINTA agar koneksi saya TIDAK dienkripsi (SSL) supaya Admin tidak bisa mengintip password saya."
                            </div>
                        </label>

                        <label class="flex items-start gap-3 cursor-pointer p-3 bg-gray-900 rounded border border-gray-600 hover:bg-gray-800 transition select-none">
                            <input type="checkbox" id="chk-6-3" class="mt-1 accent-red-500 w-5 h-5 cursor-pointer">
                            <div class="text-xs text-gray-300">
                                "Saya TIDAK keberatan jika data saya disimpan di server yang TIDAK aman."
                            </div>
                        </label>
                    </div>

                    <button id="btn-lvl6" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors shadow-lg active:scale-95 transform duration-100">
                        KONFIRMASI PILIHAN
                    </button>
                </div>
            </div>
        `,
        setup: () => {
            const btn = document.getElementById('btn-lvl6');
            
            btn.addEventListener('click', () => {
                const c1 = document.getElementById('chk-6-1').checked;      // Trap (Harus False)
                const c2 = document.getElementById('chk-6-2').checked;      // Trap (Harus False)
                const cSecure = document.getElementById('chk-6-secure').checked; // Good (Harus True)
                const c3 = document.getElementById('chk-6-3').checked;      // Trap (Harus False)

                // LOGIKA MENANG:
                // Traps harus Mati (False) AND Security harus Nyala (True)
                
                if (!c1 && !c2 && !c3 && cSecure) {
                    nextLevel();
                } else if (!cSecure) {
                    // Pesan khusus jika user lupa mencentang yang positif
                    takeDamage("Waduh! Anda menolak Enkripsi? Password Anda barusan kelihatan lho!");
                    document.getElementById('chk-6-secure').parentElement.classList.add('animate-pulse', 'border-red-500');
                } else {
                    // Pesan jika user masih mencentang trap
                    takeDamage("Masih ada jebakan yang Anda setujui. Baca pelan-pelan!");
                }
            });
        }
    },

    // LEVEL 7: THE QUIZ (STROOP EFFECT)
7: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in px-4">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center w-full max-w-lg mx-auto shadow-2xl">
                    <h2 class="text-2xl font-bold mb-2 text-white">TES FOKUS</h2>
                    
                    <div class="w-full bg-gray-700 h-2 rounded-full mb-6 overflow-hidden">
                        <div id="focus-progress" class="bg-blue-500 h-full w-0 transition-all duration-300"></div>
                    </div>

                    <p id="focus-instruction" class="text-xl text-gray-300 mb-8 h-16 flex items-center justify-center">
                        Loading...
                    </p>

                    <div id="shape-container" class="grid grid-cols-3 gap-4">
                        </div>
                </div>
            </div>
        `,
        setup: () => {
            const container = document.getElementById('shape-container');
            const instructionEl = document.getElementById('focus-instruction');
            const progressBar = document.getElementById('focus-progress');

            // Konfigurasi Game
            const TOTAL_ROUNDS = 5;
            let currentRound = 0;

            // Database Bentuk & Label
            const shapesData = [
                { type: 'circle', label: 'LINGKARAN', css: 'rounded-full' },
                { type: 'square', label: 'KOTAK', css: 'rounded-xl' }, // Rounded dikit biar estetik
                { type: 'triangle', label: 'SEGITIGA', css: 'clip-triangle' } // Perlu custom CSS atau SVG
            ];

            const colors = [
                { name: 'red', bg: 'bg-red-500', text: 'text-red-500' },
                { name: 'blue', bg: 'bg-blue-500', text: 'text-blue-500' },
                { name: 'green', bg: 'bg-green-500', text: 'text-green-500' },
                { name: 'yellow', bg: 'bg-yellow-500', text: 'text-yellow-500' }
            ];

            // Helper: Generate Segitiga via Clip-path (karena Tailwind default ga ada triangle)
            // Kita inject style ini sekali saja
            if (!document.getElementById('triangle-style')) {
                const style = document.createElement('style');
                style.id = 'triangle-style';
                style.innerHTML = `.clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }`;
                document.head.appendChild(style);
            }

            // --- CORE LOGIC ---
            const nextRound = () => {
                // Cek Win Condition
                if (currentRound >= TOTAL_ROUNDS) {
                    instructionEl.innerHTML = `<span class="text-green-400 font-bold">FOKUS TERUJI!</span>`;
                    setTimeout(nextLevel, 800);
                    return;
                }

                // Update Progress Bar
                const progressPct = (currentRound / TOTAL_ROUNDS) * 100;
                progressBar.style.width = `${progressPct}%`;

                container.innerHTML = ""; // Bersihkan tombol lama

                // 1. Tentukan TARGET Ronde ini (Misal: Cari GAMBAR SEGITIGA)
                const targetShape = shapesData[Math.floor(Math.random() * shapesData.length)];
                
                // Set Instruksi
                instructionEl.innerHTML = `Klik gambar <span class="font-black text-white underline decoration-blue-500 mx-2 uppercase text-2xl">${targetShape.label}</span>`;

                // 2. Siapkan 3 Tombol (1 Benar, 2 Salah)
                let roundButtons = [];

                // --- TOMBOL BENAR (Correct Answer) ---
                // Visual: Benar (Target)
                // Label: SALAH (Pengecoh)
                const wrongLabelForCorrectBtn = shapesData.filter(s => s.type !== targetShape.type)[Math.floor(Math.random() * 2)];
                const colorCorrect = colors[Math.floor(Math.random() * colors.length)];
                
                roundButtons.push({
                    isCorrect: true,
                    visualType: targetShape.type, // Visual BENAR
                    visualCss: targetShape.css,
                    labelText: wrongLabelForCorrectBtn.label, // Teks SALAH (Stroop)
                    colorClass: colorCorrect.bg
                });

                // --- TOMBOL SALAH (Decoys) ---
                // Buat 2 tombol sisa
                const remainingShapes = shapesData.filter(s => s.type !== targetShape.type); // Sisa bentuk yang bukan target
                
                // Agar tombolnya jadi 3, kita ambil dari sisa bentuk atau random ulang
                for (let i = 0; i < 2; i++) {
                    // Kita pilih bentuk visual yang SALAH
                    // Bisa random, tapi usahakan beda-beda biar variatif
                    const decoyVisual = remainingShapes[i % remainingShapes.length]; // Rotasi sisa bentuk
                    
                    // Labelnya? Bisa label Target (Jebakan maut) atau Random
                    // 50% chance labelnya adalah Label Target ("Klik Segitiga", tombol ini tulisannya "Segitiga" tapi gambarnya Kotak)
                    const isTrapLabel = Math.random() > 0.5;
                    const decoyLabel = isTrapLabel ? targetShape.label : shapesData[Math.floor(Math.random() * shapesData.length)].label;

                    const colorDecoy = colors[Math.floor(Math.random() * colors.length)];

                    roundButtons.push({
                        isCorrect: false,
                        visualType: decoyVisual.type,
                        visualCss: decoyVisual.css,
                        labelText: decoyLabel,
                        colorClass: colorDecoy.bg
                    });
                }

                // 3. Acak Posisi Tombol (Shuffle Array)
                roundButtons.sort(() => Math.random() - 0.5);

                // 4. Render ke HTML
                roundButtons.forEach(btn => {
                    const btnEl = document.createElement('div');
                    
                    // Style dasar tombol
                    btnEl.className = `
                        cursor-pointer w-full aspect-square flex items-center justify-center 
                        font-bold text-white text-[10px] sm:text-xs md:text-sm 
                        transition-transform active:scale-95 shadow-lg select-none
                        ${btn.colorClass} ${btn.visualCss}
                    `;
                    
                    // Teks di dalam tombol
                    btnEl.innerText = btn.labelText;

                    // Event Listener
                    btnEl.addEventListener('click', () => {
                        if (btn.isCorrect) {
                            currentRound++;
                            nextRound(); // Lanjut ronde berikutnya
                        } else {
                            // Reset progress kalau salah! (Sadis tapi seru)
                            // Atau kurangi nyawa. Di sini kita reset level ini aja (visual effect).
                            takeDamage("Salah! Lihat GAMBARNYA, bukan tulisan/warnanya.");
                            
                            // Opsional: Reset ronde ke 0 biar greget (Focus Mode)
                            currentRound = 0; 
                            progressBar.style.width = '0%';
                            progressBar.classList.add('bg-red-500');
                            setTimeout(() => progressBar.classList.remove('bg-red-500'), 200);
                            
                            nextRound(); // Re-roll
                        }
                    });

                    container.appendChild(btnEl);
                });
            };

            // Mulai Ronde Pertama
            nextRound();
        }
    },

    // LEVEL 8: THE TYPO (LONG & ABSURD)
    8: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <div class="text-4xl mb-2 text-center">📜</div>
                    <h2 class="text-lg font-bold mb-2 text-center text-gray-200">SUMPAH DIGITAL</h2>
                    <p class="text-xs text-gray-400 mb-4 text-center">
                        Ketik kalimat di bawah ini dengan <strong>TEPAT (100%)</strong> untuk membuktikan keseriusan Anda.
                    </p>

                    <div class="bg-black p-3 rounded mb-4 text-center border border-gray-600 relative group">
                        <p class="text-yellow-400 font-mono text-sm leading-relaxed select-all" id="target-text">Sumpah saya rela nilai D kalau tidak menyelesaikan game ini</p>
                        <div class="absolute top-0 right-0 p-1 text-[10px] text-gray-600">No Copy-Paste</div>
                    </div>

                    <textarea id="long-input" rows="3" class="w-full bg-gray-700 text-white p-3 rounded border-2 border-transparent focus:border-yellow-500 focus:outline-none text-sm font-mono placeholder-gray-500" placeholder="Ketik di sini..."></textarea>

                    <button id="btn-lvl8" disabled class="w-full bg-yellow-600 mt-4 text-white py-3 rounded font-bold disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all opacity-50">
                        SAYA BERSUMPAH
                    </button>
                </div>
            </div>
        `,
        setup: () => {
            const input = document.getElementById('long-input');
            const btn = document.getElementById('btn-lvl8');
            const target = "Sumpah saya rela nilai D kalau tidak menyelesaikan game ini";

            // Mencegah Paste
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                takeDamage("JANGAN CURANG! KETIK MANUAL!");
            });

            input.addEventListener('input', () => {
                const val = input.value;
                
                if (val === target) {
                    input.classList.add('border-green-500');
                    btn.disabled = false;
                    btn.classList.remove('opacity-50');
                } else {
                    btn.disabled = true;
                    btn.classList.add('opacity-50');
                    input.classList.remove('border-green-500');
                }
            });

            btn.addEventListener('click', () => {
                if (input.value === target) {
                    nextLevel();
                }
            });
        }
    },

    // --- FASE 3: FRUSTRATION (LEVEL 9-12) ---
    // LEVEL 9: SPEED LIMIT (SCROLL POLICE)
    9: {
        render: () => `
            <div class="flex flex-col h-full fade-in">
                <div class="bg-gray-800 p-4 rounded-t-xl border border-gray-700 flex justify-between items-center">
                    <h2 class="text-sm font-bold text-red-400">SPEED LIMIT: 50px/s</h2>
                    <div class="text-[10px] bg-red-900 text-red-200 px-2 py-1 rounded animate-pulse">RADAR ON</div>
                </div>
                
                <div class="p-4 bg-gray-900 border-x border-b border-gray-700 rounded-b-xl flex-grow relative overflow-hidden flex flex-col">
                    <p class="text-xs text-gray-500 mb-2">Harap gulir pelan-pelan. Kami tahu Anda cuma mau tombolnya.</p>
                    
                    <div id="slow-scroll-container" class="legal-scroll flex-grow overflow-y-auto bg-black p-4 rounded border border-gray-800 text-xs text-gray-400 font-mono leading-loose select-none">
                        </div>
                </div>
                
                <div id="speed-warning" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white font-bold px-6 py-4 rounded-xl shadow-2xl hidden z-50 text-center border-4 border-white">
                    <div class="text-4xl mb-2">🐢</div>
                    TOO FAST!<br><span class="text-xs font-normal">Sabar woy! Reset ke atas!</span>
                </div>
            </div>
        `,
        setup: () => {
            const container = document.getElementById('slow-scroll-container');
            const warning = document.getElementById('speed-warning');
            
            // Generate Text Panjang
            let content = "";
            for(let i=1; i<=30; i++) {
                content += `<p class="mb-8">Pasal ${i}: Pelan-pelan saja. Kecepatan membunuhmu. ${"Lorem ipsum ".repeat(5)}</p>`;
            }
            content += `<button id="btn-lvl9" class="w-full bg-blue-600 text-white py-4 rounded font-bold mt-10 hover:bg-blue-500 transition">SAYA SUDAH MEMBACA PELAN-PELAN</button>`;
            container.innerHTML = content;

            const btn = document.getElementById('btn-lvl9');
            btn.addEventListener('click', () => nextLevel());

            // Speed Detection Logic
            let lastScrollTop = 0;
            let lastTime = Date.now();
            let isResetting = false;

            container.addEventListener('scroll', (e) => {
                if(isResetting) return;

                const now = Date.now();
                const currentScrollTop = container.scrollTop;
                const timeDiff = now - lastTime;

                // Cek speed setiap 50ms agar tidak terlalu sensitif
                if (timeDiff > 50) {
                    const distance = Math.abs(currentScrollTop - lastScrollTop);
                    const speed = distance / timeDiff; // pixels per ms

                    // Threshold: 0.8 px/ms (setara swipe cepat)
                    if (speed > 1.5) { 
                        isResetting = true;
                        warning.classList.remove('hidden');
                        takeDamage("Ngebut = Pelanggaran!");
                        
                        setTimeout(() => {
                            container.scrollTo({ top: 0, behavior: 'smooth' });
                            lastScrollTop = 0;
                        }, 500);

                        setTimeout(() => {
                            warning.classList.add('hidden');
                            isResetting = false;
                        }, 1500);
                    }

                    lastScrollTop = currentScrollTop;
                    lastTime = now;
                }
            });
        }
    },

    // LEVEL 10: UNCLICKABLE BUTTON
    10: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in relative overflow-hidden" id="area-lvl10">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center z-10 pointer-events-none">
                    <h2 class="text-xl font-bold mb-2">TANGKAP SAYA</h2>
                    <p class="text-sm text-gray-400">
                        Kami ingin memastikan refleks Anda cukup bagus untuk menyetujui kontrak ini.
                    </p>
                </div>

                <button id="btn-dodge" class="absolute bg-blue-600 text-white font-bold py-3 px-6 rounded shadow-lg transition-all duration-100 ease-out z-20">
                    I AGREE
                </button>
            </div>
        `,
        setup: () => {
            const btn = document.getElementById('btn-dodge');
            const area = document.getElementById('area-lvl10');
            
            // Posisikan awal di tengah agak bawah
            btn.style.top = "60%";
            btn.style.left = "35%";

            let dodges = 0;
            const maxDodges = 15; // Berhenti setelah 15 kali
            let isTired = false;

            const moveButton = () => {
                if (isTired) return;

                if (dodges >= maxDodges) {
                    isTired = true;
                    btn.innerText = "OKEH, CAPEK.";
                    btn.classList.replace('bg-blue-600', 'bg-gray-500');
                    return;
                }

                dodges++;
                
                // Random position (batas aman agar tidak keluar layar container)
                const maxX = area.clientWidth - btn.clientWidth - 20;
                const maxY = area.clientHeight - btn.clientHeight - 20;
                
                const newX = Math.random() * maxX;
                const newY = Math.random() * maxY;

                btn.style.left = `${newX}px`;
                btn.style.top = `${newY}px`;
            };

            // Event Listeners (Desktop & Mobile)
            btn.addEventListener('mouseover', moveButton);
            btn.addEventListener('touchstart', (e) => {
                // Prevent click on touchstart if not tired
                if(!isTired) {
                    e.preventDefault(); 
                    moveButton();
                }
            });

            btn.addEventListener('click', () => {
                if (isTired) {
                    nextLevel();
                }
            });
        }
    },

    // LEVEL 11: FAKE ADS
    11: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in relative">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
                    <h2 class="text-lg font-bold mb-4">MITRA KAMI</h2>
                    
                    <div class="relative w-full h-32 bg-gray-900 rounded border border-gray-600 flex items-center justify-center overflow-hidden">
                        
                        <button id="btn-real-lvl11" class="bg-blue-600 text-white px-6 py-2 rounded font-bold">
                            CONTINUE
                        </button>

                        <div id="ad-overlay" class="absolute inset-0 bg-yellow-300 flex flex-col items-center justify-center p-2 z-20 cursor-pointer">
                            <h3 class="text-red-600 font-black text-2xl animate-bounce">💰 PINJOL KILAT 💰</h3>
                            <p class="text-black text-xs font-bold text-center">Cair dalam 5 detik! Bunga 0.01%*</p>
                            
                            <div class="absolute top-2 right-2 w-6 h-6 bg-gray-200 text-gray-500 rounded flex items-center justify-center font-bold border border-gray-400 shadow cursor-pointer fake-close">X</div>
                            <div class="absolute top-2 left-2 w-6 h-6 bg-white text-black rounded flex items-center justify-center font-bold border border-gray-400 shadow cursor-pointer fake-close">✕</div>
                            
                            <div id="real-close" class="absolute bottom-1 right-1 text-[8px] text-yellow-600 p-2 opacity-50 hover:opacity-100 cursor-pointer font-sans">
                                [Tutup Iklan]
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `,
        setup: () => {
            const ad = document.getElementById('ad-overlay');
            const realBtn = document.getElementById('btn-real-lvl11');
            const realClose = document.getElementById('real-close');
            const fakeCloses = document.querySelectorAll('.fake-close');

            // Logic Tombol Palsu
            fakeCloses.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Biar ga trigger klik container
                    takeDamage("Itu tombol X palsu! PC anda terinfeksi (bohong).");
                });
            });

            // Klik Iklan (Bad)
            ad.addEventListener('click', (e) => {
                if (e.target !== realClose && !e.target.classList.contains('fake-close')) {
                    takeDamage("Jangan klik iklannya! Tutup dulu.");
                }
            });

            // Tombol Tutup Asli
            realClose.addEventListener('click', (e) => {
                e.stopPropagation();
                ad.style.display = 'none'; // Hilangkan iklan
            });

            // Tombol Lanjut Asli
            realBtn.addEventListener('click', () => {
                nextLevel();
            });
        }
    },

    // LEVEL 12: MAGNIFIER (MICRO TEXT)
    12: {
        render: () => `
            <div class="flex flex-col h-full fade-in px-4">
                <div class="bg-gray-800 p-4 rounded-t-xl border border-gray-700 text-center shrink-0">
                    <h2 class="text-lg font-bold mb-1 text-white">🔍 THE FINE PRINT</h2>
                    <p class="text-xs text-gray-400">Temukan nomor referensi <span class="font-mono font-bold text-yellow-400">SEC-????</span> di dokumen legal ini.</p>
                </div>
                
                <div class="bg-white text-black p-4 border-x border-gray-700 flex-grow relative overflow-hidden cursor-crosshair group touch-none shadow-inner" id="magnifier-area">
                    
                    <div id="micro-content" class="w-full h-full text-[3px] leading-[4px] text-justify font-serif text-gray-700 break-words select-none pointer-events-none transition-transform duration-75 origin-top-left columns-2 gap-2">
                        </div>

                    <div id="lens" class="absolute w-32 h-32 rounded-full border-[6px] border-gray-800 bg-white/10 backdrop-contrast-200 backdrop-saturate-200 pointer-events-none hidden shadow-2xl transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden ring-1 ring-black/20">
                        <div class="absolute top-2 left-2 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-full pointer-events-none"></div>
                    </div>

                </div>

                <div class="bg-gray-800 p-4 rounded-b-xl border border-gray-700 shrink-0">
                    <div class="flex gap-2">
                        <input type="text" id="pass-input" placeholder="SEC-????" class="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 font-mono text-center tracking-widest uppercase focus:border-blue-500 outline-none placeholder-gray-600">
                        <button id="btn-lvl12" class="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold text-white transition-colors">VERIFIKASI</button>
                    </div>
                </div>
            </div>
        `,
        setup: () => {
            const container = document.getElementById('micro-content');
            const area = document.getElementById('magnifier-area');
            const lens = document.getElementById('lens');
            const input = document.getElementById('pass-input');
            const btn = document.getElementById('btn-lvl12');

            // --- 1. GENERATOR DOKUMEN LEGAL REALISTIS ---
            
            const secretCode = Math.floor(1000 + Math.random() * 9000); 
            const targetString = `SEC-${secretCode}`;

            // Kata-kata yang akan di-bold secara acak sebagai pengecoh
            const boldKeywords = [
                "LIABILITY", "INDEMNIFY", "TERMINATION", "IRREVOCABLE", "WARRANTY", 
                "JURISDICTION", "DISCLAIMER", "AGREEMENT", "BINDING", "EXCLUSIVELY",
                "ACKNOWLEDGES", "FORFEIT", "PERPETUITY", "VIOLATION", "CONSENT"
            ];

            // Kalimat-kalimat "Filler" Legal
            const sentences = [
                "The user hereby agrees to surrender all rights to personal autonomy within the confines of the application ecosystem.",
                "Notwithstanding any provisions to the contrary, the provider reserves the right to monetize user anxiety.",
                "In the event of a catastrophic system failure, the user agrees that data loss is a feature, not a bug.",
                "This agreement shall be governed by the laws of thermodynamics, specifically entropy.",
                "To the fullest extent permitted by applicable law, the developer disclaims all warranties, express or implied.",
                "Failure to read this clause constitutes an immediate breach of contract and forfeiture of snack privileges.",
                "The party of the first part hereby acknowledges that the party of the second part is just guessing the code.",
                "Arbitration shall be held in a location determined by a roll of a twenty-sided die.",
                "Any resemblance to actual legal advice is purely coincidental and unintended."
            ];

            // Fungsi helper untuk mengubah angka ke Romawi (untuk Pasal)
            const toRoman = (num) => {
                const rom = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
                return rom[num - 1] || num;
            };

            let docHTML = "";
            
            // Header Dokumen Palsu
            docHTML += `<div class="w-full text-center font-bold mb-2 pb-1 border-b border-black text-[4px]">TERMS OF ETERNAL BINDING v.9.0</div>`;

            // Generate 8 Pasal (Articles)
            const targetArticle = Math.floor(Math.random() * 6) + 1; // Password ada di artikel random

            for (let i = 1; i <= 8; i++) {
                docHTML += `<div class="mb-2">`;
                docHTML += `<span class="font-bold block mb-0.5">ARTICLE ${toRoman(i)} - GENERAL PROVISIONS</span>`;
                
                // Generate 3-5 paragraf per pasal
                const paraCount = Math.floor(Math.random() * 3) + 3;
                
                for (let p = 0; p < paraCount; p++) {
                    let sentence = sentences[Math.floor(Math.random() * sentences.length)];
                    
                    // Logic Pengecoh (Bold Random Words)
                    // Kita split kalimat jadi kata-kata, lalu random bold
                    let words = sentence.split(" ");
                    let styledWords = words.map(w => {
                        // Bersihkan tanda baca untuk cek keyword
                        let cleanW = w.replace(/[^a-zA-Z]/g, "").toUpperCase();
                        if (boldKeywords.includes(cleanW) && Math.random() > 0.5) {
                            return `<b class="text-black">${w}</b>`;
                        }
                        return w;
                    });
                    
                    let finalSentence = styledWords.join(" ");

                    // SISIPKAN PASSWORD DI SINI?
                    if (i === targetArticle && p === 1) {
                        // Masukkan password di tengah kalimat secara natural
                        finalSentence += ` Refer to clause <b class="text-black">${targetString}</b> for details regarding soul ownership.`;
                    }

                    docHTML += `<p class="mb-1 text-justify indent-1">${finalSentence}</p>`;
                }
                docHTML += `</div>`;
            }

            // Footer Dokumen
            docHTML += `<div class="mt-4 pt-1 border-t border-black text-center italic text-[2px]">Doc Ref: ${Math.random().toString(36).substring(7).toUpperCase()} // Page 1 of 1</div>`;

            container.innerHTML = docHTML;

            // --- 2. LOGIC MAGNIFIER (Tetap sama, disesuaikan sedikit) ---
            const handleMove = (clientX, clientY) => {
                const rect = area.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                    lens.classList.add('hidden');
                    return;
                }

                lens.classList.remove('hidden');
                lens.style.left = `${x}px`;
                lens.style.top = `${y}px`;

                // Set origin zoom ke posisi kursor
                container.style.transformOrigin = `${x}px ${y}px`;
                // Zoom 5x agar teks 3px terbaca jelas (jadi setara 15px)
                container.style.transform = "scale(5)"; 
            };

            area.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
            area.addEventListener('mouseleave', () => {
                container.style.transform = "scale(1)";
                lens.classList.add('hidden');
            });

            // Touch support
            area.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                handleMove(touch.clientX, touch.clientY);
            }, { passive: false });
            area.addEventListener('touchend', () => {
                container.style.transform = "scale(1)";
                lens.classList.add('hidden');
            });

            // --- 3. VERIFIKASI ---
            btn.addEventListener('click', () => {
                const userVal = input.value.trim().toUpperCase();
                if (userVal === targetString) {
                    nextLevel();
                } else {
                    takeDamage("Nomor referensi salah! Jangan terkecoh teks tebal lainnya.");
                    input.value = "";
                    input.focus();
                }
            });
        }
    },

    // --- FASE 4: BIROKRASI & ENDING (LEVEL 13-16) ---
    // LEVEL 13: ENCODING / LANGUAGE
    13: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 class="text-lg font-bold mb-4 text-center">🌍 PILIH BAHASA</h2>
                    <p class="text-xs text-gray-400 mb-4 text-center">
                        Sistem kami mendeteksi Anda menggunakan bahasa asing. Silakan pilih bahasa manusia yang benar.
                    </p>

                    <div class="relative">
                        <select id="lang-select" class="w-full bg-gray-900 text-white p-4 rounded border border-gray-600 appearance-none font-mono text-sm cursor-pointer focus:border-blue-500 focus:outline-none">
                            <option value="" disabled selected>-- Select Language --</option>
                            </select>
                        <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                    </div>

                    <button id="btn-lvl13" class="w-full bg-blue-600 mt-6 text-white py-3 rounded font-bold opacity-0 transition-opacity duration-300 pointer-events-none">
                        KONFIRMASI BAHASA
                    </button>
                </div>
            </div>
        `,
        setup: () => {
            const select = document.getElementById('lang-select');
            const btn = document.getElementById('btn-lvl13');
            
            // Generator Bahasa Alien
            const garbage = ["01010011", "HℇllØ WØrld", "⌇⍙⟒⟒⏁", "⍀⏃⋔⟒⋏", "Klingon", "Dothraki", "Elvish", "⊬⍜⎍", "⏃⍀⟒", "⏁⍜⏃⌇⏁", "X Æ A-12", "C++", "Assembly", "Brainfuck", "Wingdings"];
            
            // Buat 50 opsi
            let options = [];
            for(let i=0; i<50; i++) {
                const txt = garbage[Math.floor(Math.random() * garbage.length)] + " " + Math.floor(Math.random() * 999);
                options.push(`<option value="fail">${txt}</option>`);
            }

            // Selipkan Bahasa Indonesia di posisi random (tapi agak bawah biar scroll)
            const correctIndex = Math.floor(Math.random() * 20) + 20; // Antara 20-40
            options.splice(correctIndex, 0, `<option value="correct">Bahasa Indonesia</option>`);

            select.innerHTML += options.join('');

            // Logic
            select.addEventListener('change', () => {
                if (select.value === 'correct') {
                    btn.classList.remove('opacity-0', 'pointer-events-none');
                } else {
                    btn.classList.add('opacity-0', 'pointer-events-none');
                    takeDamage("Itu bukan bahasa manusia (atau kami yang tidak paham).");
                }
            });

            btn.addEventListener('click', () => nextLevel());
        }
    },

    // LEVEL 14: COOKIE NIGHTMARE
    14: {
        render: () => `
            <div class="flex flex-col h-full fade-in px-4">
                <div class="bg-gray-800 rounded-t-xl border border-gray-700 p-4 pb-2 shrink-0">
                    <h2 class="text-lg font-bold text-white">🍪 PREFERENSI COOKIE</h2>
                    <p class="text-xs text-gray-400">Silakan pilih racun Anda. <span class="text-green-400">Hijau = Aktif</span>.</p>
                </div>

                <div class="bg-gray-900 p-4 flex-grow overflow-y-auto border-x border-gray-700 space-y-4 custom-scrollbar">
                    
                    <div class="flex justify-between items-center p-3 bg-gray-800 rounded border border-gray-600 opacity-60">
                        <div class="text-xs">
                            <div class="font-bold text-gray-200">Cookie Wajib</div>
                            <div class="text-gray-500 text-[10px]">Agar website tidak meledak.</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-not-allowed">
                            <input type="checkbox" checked disabled class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-green-800 after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5"></div>
                        </label>
                    </div>

                    <div class="flex justify-between items-center p-3 bg-gray-800 rounded border border-gray-600">
                        <div class="text-xs">
                            <div class="font-bold text-gray-200">Pelacakan Mikrofon</div>
                            <div class="text-gray-500 text-[10px]">Untuk mendengar curhat Anda.</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="cookie-mic" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                    <div class="flex justify-between items-center p-3 bg-gray-800 rounded border border-gray-600">
                        <div class="text-xs">
                            <div class="font-bold text-gray-200">Firewall Anti-Tuyul</div>
                            <div class="text-gray-400 text-[10px]">Mencegah pencurian saldo gopay.</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="cookie-firewall" class="sr-only peer"> 
                            <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    <div class="flex justify-between items-center p-3 bg-gray-800 rounded border border-gray-600">
                        <div class="text-xs">
                            <div class="font-bold text-gray-200">Jual Data ke Mafia</div>
                            <div class="text-gray-500 text-[10px]">Membantu ekonomi bawah tanah.</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="cookie-mafia" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>
                      
                    <div class="flex justify-between items-center p-3 bg-gray-800 rounded border border-gray-600">
                        <div class="text-xs">
                            <div class="font-bold text-gray-200">Keylogger</div>
                            <div class="text-gray-500 text-[10px]">Merekam password demi keamanan.</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="cookie-key" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                </div>

                <div class="bg-gray-800 border border-gray-700 rounded-b-xl p-4 flex gap-2 shrink-0">
                    <button id="btn-reject-all" class="w-1/3 bg-gray-700 text-gray-500 text-[10px] rounded hover:bg-gray-600 transition-colors border border-gray-600">Reject All (Error 500)</button>
                    <button id="btn-save-cookie" class="w-2/3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded text-sm shadow-lg transition-colors">SIMPAN PENGATURAN</button>
                </div>
            </div>
        `,
        setup: () => {
            const btn = document.getElementById('btn-save-cookie');
            const reject = document.getElementById('btn-reject-all');
            
            reject.addEventListener('click', () => {
                // Efek tombol rusak
                reject.innerText = "LOADING...";
                setTimeout(() => {
                    reject.innerText = "FAILED";
                    reject.classList.add("text-red-500");
                    takeDamage("Fitur 'Reject All' sedang cuti. Silakan manual.");
                }, 500);
            });

            btn.addEventListener('click', () => {
                const mic = document.getElementById('cookie-mic').checked;
                const firewall = document.getElementById('cookie-firewall').checked; // Ini yang positif
                const mafia = document.getElementById('cookie-mafia').checked;
                const key = document.getElementById('cookie-key').checked;

                // LOGIKA MENANG:
                // Traps harus False (Unchecked)
                // Firewall harus True (Checked)

                if (!mic && !mafia && !key && firewall) {
                    nextLevel();
                } else if (!firewall) {
                    takeDamage("Waduh! Anda lupa menyalakan Firewall Anti-Tuyul! Bahaya!");
                    // Visual hint: Kedipkan border
                    document.getElementById('cookie-firewall').closest('div').classList.add('animate-pulse', 'border-red-500');
                } else {
                    takeDamage("Anda masih mengizinkan spy! Matikan tombol hijau yang mencurigakan.");
                }
            });
        }
    },

    // LEVEL 15: SPRING SCROLL
    15: {
        render: () => `
             <div class="flex flex-col h-full fade-in">
                <div class="bg-gray-800 p-4 rounded-t-xl border border-gray-700 z-10">
                    <h2 class="text-lg font-bold text-white">⚙️ BROKEN SCROLLBAR</h2>
                    <p class="text-xs text-gray-400">Scrollbar kami agak bandel. Tahan scrollbar di bawah dan jangan biarkan dia naik lagi untuk melanjutkan.</p>
                </div>
                
                <div class="relative flex-grow bg-gray-900 border-x border-b border-gray-700 rounded-b-xl overflow-hidden">
                    
                    <div id="hold-progress-container" class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full z-20 hidden backdrop-blur">
                         <span class="text-xs font-bold">HOLDING: </span>
                         <span id="hold-pct" class="text-yellow-400 font-mono">0%</span>
                    </div>

                    <div id="spring-scroll" class="h-full overflow-y-auto p-4 text-justify text-gray-500 font-mono text-xs select-none relative">
                        </div>
                </div>
            </div>
        `,
        setup: () => {
            const container = document.getElementById('spring-scroll');
            const progContainer = document.getElementById('hold-progress-container');
            const progText = document.getElementById('hold-pct');
            
            // 1. Generate Content
            let content = `<div class="pt-10"></div>`;
            for(let i=0; i<30; i++) content += `<p class="mb-10">Scroll terus... jangan dilepas... pernya kuat sekali... ${i}</p>`;
            content += `<div class="h-64 flex items-center justify-center bg-gray-800 rounded mb-10 text-white font-bold border-2 border-dashed border-gray-600">👇 TAHAN DI SINI (3 DETIK) 👇</div>`;
            content += `<div class="h-[500px]"></div>`; // Extra space biar berasa scrollnya
            container.innerHTML = content;

            // 2. Logic Spring & Hold
            let holdTimer = null;
            let progress = 0;
            let isHolding = false;

            const resetSpring = () => {
                isHolding = false;
                progress = 0;
                progContainer.classList.add('hidden');
                
                // Efek Spring: Balik ke atas
                container.scrollTo({ top: 0, behavior: 'smooth' });
                
                if (holdTimer) clearInterval(holdTimer);
            };

            const startCharging = () => {
                if(isHolding) return;
                isHolding = true;
                progContainer.classList.remove('hidden');

                holdTimer = setInterval(() => {
                    progress += 2; // +2% per 20ms (total ~1 detik biar ga kelamaan bgt untuk demo)
                    // Tapi request minta 3 detik, sesuaikan:
                    // 100% / 3000ms = 0.033% per ms. Interval 50ms = 1.6%
                    
                    progText.innerText = `${Math.min(100, progress)}%`;

                    if (progress >= 100) {
                        clearInterval(holdTimer);
                        progText.innerText = "DONE!";
                        progText.classList.replace('text-yellow-400', 'text-green-500');
                        setTimeout(() => nextLevel(), 500);
                    }
                }, 60); // Agak lambat
            };

            // Event Listeners
            container.addEventListener('scroll', () => {
                // Cek apakah di bawah (Toleransi 50px)
                const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;

                if (isBottom) {
                    startCharging();
                } else {
                    // Kalau user geser ke atas lagi saat charging
                    if(isHolding) {
                        isHolding = false;
                        progress = 0;
                        if(holdTimer) clearInterval(holdTimer);
                        progContainer.classList.add('hidden');
                    }
                }
            });

            // Mekanik Spring: Kalau lepas sentuhan/mouse, balik ke atas
            container.addEventListener('touchend', resetSpring);
            container.addEventListener('mouseup', resetSpring);
            // Mouse leave juga reset biar ga curang keluar area
            container.addEventListener('mouseleave', resetSpring);
        }
    },

    // LEVEL 16: SOUL CONTRACT (FINALE)
    16: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-black rounded-xl border-2 border-red-900 p-6 text-center shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                    <h1 class="text-3xl font-black text-red-600 mb-2 font-serif tracking-widest">FINAL PACT</h1>
                    <p class="text-sm text-gray-400 mb-8 font-serif italic">
                        "Abandon all hope, ye who click here."
                    </p>

                    <div class="bg-red-900/20 p-6 rounded border border-red-800 mb-8 text-left">
                        <label class="flex items-start gap-4 cursor-pointer">
                            <input type="checkbox" id="soul-contract" class="mt-1 w-6 h-6 accent-red-600 cursor-pointer">
                            <span class="text-sm text-red-200 font-bold leading-relaxed">
                                Saya dengan sadar dan tanpa paksaan bersedia menyerahkan akun Instagram, password, dan sertifikat tanah kepada Developer RIT untuk keperluan "Riset".
                            </span>
                        </label>
                    </div>

                    <div class="space-y-3">
                        <button id="btn-agree-final" class="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 rounded text-xl border border-red-500 shadow-lg tracking-widest transition-transform active:scale-95">
                            SETUJU
                        </button>
                        <button id="btn-agree-final-2" class="w-full bg-transparent hover:bg-red-900/30 text-red-500 font-bold py-2 rounded text-xs border border-transparent hover:border-red-800 transition-colors">
                            SANGAT SETUJU (TIDAK ADA OPSI MENOLAK)
                        </button>
                    </div>
                </div>
            </div>
        `,
        setup: () => {
            const chk = document.getElementById('soul-contract');
            const btns = [document.getElementById('btn-agree-final'), document.getElementById('btn-agree-final-2')];

            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (!chk.checked) {
                        takeDamage("Centang dulu kontrak jiwanya.");
                    } else {
                        showCertificate(); // ENDING
                    }
                });
            });
        }
    }
};

// --- CORE ENGINE ---

function renderLevel(lvlIdx) {
    if (!levels[lvlIdx]) {
        // Placeholder untuk level selanjutnya (Fase 2)
        gameArea.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center fade-in">
                <div class="text-6xl mb-4">🚧</div>
                <h1 class="text-2xl font-bold text-blue-400">FASE 1 SELESAI</h1>
                <p class="text-gray-400 mt-2">Level selanjutnya (5-16) sedang dalam pengembangan.</p>
                <button onclick="location.reload()" class="mt-8 bg-gray-700 px-4 py-2 rounded">Main Lagi</button>
            </div>
        `;
        return;
    }

    // 1. Bersihkan area
    gameArea.innerHTML = '';
    
    // 2. Render HTML Level
    const levelData = levels[lvlIdx];
    gameArea.innerHTML = levelData.render();
    
    // 3. Jalankan Logic Level (Event Listeners)
    // Gunakan timeout kecil untuk memastikan DOM sudah siap
    setTimeout(() => {
        levelData.setup();
    }, 0);
}

function showCertificate() {
    // Stop game state
    state.isTransitioning = true; 
    
    // Render Certificate UI
    gameArea.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full fade-in p-4">
            <div class="bg-[#fdfbf7] text-black p-8 rounded-lg shadow-2xl border-[12px] border-double border-gray-800 max-w-sm relative overflow-hidden transform rotate-1">
                
                <div class="absolute top-4 right-4 opacity-20 transform rotate-12 pointer-events-none">
                    <div class="border-4 border-red-800 rounded-full w-24 h-24 flex items-center justify-center">
                        <span class="text-red-800 font-black text-xs text-center uppercase -rotate-12">RIT<br>OFFICIAL<br>OWNED</span>
                    </div>
                </div>

                <div class="text-center space-y-4">
                    <div class="text-4xl">🎓</div>
                    <h1 class="text-2xl font-serif font-bold uppercase tracking-widest border-b-2 border-black pb-2">Sertifikat<br>Kepemilikan</h1>
                    
                    <p class="text-xs font-serif italic text-gray-600">
                        Dengan ini dinyatakan bahwa jiwa dan data digital milik:
                    </p>
                    
                    <h2 class="text-xl font-bold font-mono bg-gray-200 p-2 rounded">PENGGUNA #309</h2>
                    
                    <p class="text-xs font-serif italic text-gray-600">
                        Telah resmi menjadi aset properti dari RIT Playground melalui kesepakatan "Terms of Service: The Nightmare".
                    </p>

                    <div class="pt-6 flex justify-between items-end">
                        <div class="text-center">
                            <div class="h-10 border-b border-black mb-1 w-16"></div>
                            <p class="text-[8px] uppercase font-bold">Korban</p>
                        </div>
                        <div class="w-10 h-10 bg-red-800 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-sm">
                            SEAL
                        </div>
                        <div class="text-center">
                            <div class="font-signature text-lg">Dev.RIT</div>
                            <div class="border-b border-black w-16"></div>
                            <p class="text-[8px] uppercase font-bold">Pemilik Baru</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 space-y-3 w-full max-w-xs text-center">
                <p class="text-gray-400 text-xs">Terima kasih telah membaca (atau tidak).</p>
                <button onclick="navigator.clipboard.writeText(window.location.href); alert('Link disalin! Bagikan penderitaan ini ke temanmu.')" class="w-full bg-[#5865F2] hover:bg-blue-600 text-white font-bold py-3 rounded shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
                    <span>📤</span> BAGIKAN SERTIFIKAT
                </button>
                <button onclick="location.reload()" class="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded border border-gray-600 text-xs">
                    MAIN ULANG (RESET)
                </button>
            </div>
        </div>
    `;

    // Confetti effect (CSS simple implementation via DOM)
    for(let i=0; i<30; i++) {
        const c = document.createElement('div');
        c.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${['#f00', '#0f0', '#00f', '#ff0'][Math.floor(Math.random()*4)]};
            animation: fall ${2 + Math.random() * 3}s linear infinite;
            z-index: 100;
        `;
        document.body.appendChild(c);
    }
    
    // Add CSS for falling confetti if not exists
    const style = document.createElement('style');
    style.innerHTML = `@keyframes fall { to { transform: translateY(100vh) rotate(720deg); } } .font-signature { font-family: cursive; }`;
    document.head.appendChild(style);
}


// Start Game
renderLevel(state.currentLevel);
updateHUD();