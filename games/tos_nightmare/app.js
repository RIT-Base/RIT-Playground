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
                        <p class="mb-4">PASAL 1. Dengan menggunakan layanan ini, Anda setuju bahwa kami tidak bertanggung jawab atas hilangnya waktu Anda.</p>
                        <p class="mb-4">PASAL 2. Scroll terus ke bawah. Jangan malas.</p>
                        <p class="mb-4">PASAL 3. Dokumen ini sengaja dibuat panjang agar Anda merasa seperti sedang membaca sesuatu yang penting, padahal isinya hanya Lorem Ipsum versi bahasa Indonesia.</p>
                        <p class="mb-4">PASAL 4. Jika Anda membaca ini, selamat, Anda orang yang teliti. Tapi tombolnya masih di bawah.</p>
                        <p class="mb-4">PASAL 5. Hampir sampai...</p>
                        <p class="mb-4">PASAL 6. Sedikit lagi...</p>
                        <p class="mb-4">PASAL 7. Pihak kami berhak meminta traktir kopi kapan saja.</p>
                        <p class="mb-4">PASAL 8. Terus gulir...</p>
                        <p class="mb-4">PASAL 9. INI ADALAH AKHIR DOKUMEN.</p>
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
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-2xl">
                    <h2 class="text-xl font-bold mb-2 text-yellow-400">⚠ PEMBERITAHUAN PRIVASI</h2>
                    <p class="text-sm text-gray-300 mb-6 leading-relaxed">
                        Kami menghargai privasi Anda, tapi kami lebih menghargai uang dari pengiklan.
                    </p>

                    <div class="bg-gray-900 p-4 rounded border border-gray-600 mb-6">
                        <label class="flex items-start gap-3 cursor-pointer group">
                            <div class="relative flex items-center">
                                <input type="checkbox" id="chk-spam" checked class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-blue-500 checked:border-blue-500 transition-all">
                                <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 7L6 10L11 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <span class="text-xs text-gray-400 group-hover:text-gray-200 select-none">
                                Saya bersedia menerima 100 email spam per hari dan menjual data lokasi saya ke pihak ketiga.
                            </span>
                        </label>
                    </div>

                    <button id="btn-submit-lvl2" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors shadow-lg">
                        ACCEPT & CONTINUE
                    </button>
                </div>
            </div>
        `,
        setup: () => {
            const btn = document.getElementById('btn-submit-lvl2');
            const chk = document.getElementById('chk-spam');

            btn.addEventListener('click', () => {
                if (chk.checked) {
                    takeDamage("Eits! Jangan mau dispam. Uncheck dulu!");
                } else {
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
                        <code class="text-green-400 font-bold text-lg select-none">sya mnyetujui sgalanya</code>
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
                <div class="bg-gray-800 p-4 rounded-t-xl border border-gray-700">
                    <h2 class="text-lg font-bold text-gray-200">UI EXPERIMENT v0.1</h2>
                    <p class="text-xs text-gray-400">Kami sedang mencoba desain minimalis. Tombolnya ada kok, cari saja.</p>
                </div>
                
                <div class="bg-gray-900 p-4 border-x border-b border-gray-700 rounded-b-xl flex-grow overflow-y-auto relative">
                    <div id="text-wall" class="text-gray-500 text-xs text-justify leading-relaxed font-mono select-none">
                        </div>
                </div>
            </div>
        `,
        setup: () => {
            const container = document.getElementById('text-wall');
            
            // Generate Lorem Ipsum
            const lorem = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ";
            const words = lorem.repeat(10).split(' ');
            
            // Sisipkan tombol di posisi acak (tapi agak di tengah/bawah biar seru)
            const btnIndex = Math.floor(Math.random() * (words.length - 50)) + 20;
            
            let html = "";
            words.forEach((word, i) => {
                if (i === btnIndex) {
                    // Ini tombolnya: Menyamar jadi teks biasa
                    html += `<span id="hidden-btn" class="cursor-pointer text-gray-500 hover:text-white transition-colors duration-75 font-bold">I_AGREE</span> `;
                } else {
                    html += `<span>${word}</span> `;
                }
            });
            
            container.innerHTML = html;

            const btn = document.getElementById('hidden-btn');
            btn.addEventListener('click', () => {
                nextLevel();
            });
        }
    },

    // LEVEL 6: THE CHECKBOX (DOUBLE NEGATIVE)
    6: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-2xl">
                    <h2 class="text-xl font-bold mb-2 text-yellow-400">⚠ PRIVASI (MUNGKIN)</h2>
                    <p class="text-sm text-gray-300 mb-6 font-bold bg-black/30 p-2 rounded text-center border border-gray-600">
                        MISI: Pastikan data Anda AMAN.
                    </p>

                    <div class="space-y-4 mb-6">
                        <label class="flex items-start gap-3 cursor-pointer p-3 bg-gray-900 rounded border border-gray-600 hover:bg-gray-800 transition">
                            <input type="checkbox" id="chk-6-1" class="mt-1 accent-red-500 w-5 h-5">
                            <div class="text-xs text-gray-300">
                                "Jangan tidak jual data saya kepada pihak ketiga yang tidak bertanggung jawab."
                            </div>
                        </label>

                        <label class="flex items-start gap-3 cursor-pointer p-3 bg-gray-900 rounded border border-gray-600 hover:bg-gray-800 transition">
                            <input type="checkbox" id="chk-6-2" class="mt-1 accent-red-500 w-5 h-5">
                            <div class="text-xs text-gray-300">
                                "Hapus akun saya secara permanen jika saya tidak aktif selama 5 menit."
                            </div>
                        </label>

                        <label class="flex items-start gap-3 cursor-pointer p-3 bg-gray-900 rounded border border-gray-600 hover:bg-gray-800 transition">
                            <input type="checkbox" id="chk-6-3" class="mt-1 accent-red-500 w-5 h-5">
                            <div class="text-xs text-gray-300">
                                "Saya TIDAK keberatan jika data saya disimpan di server yang TIDAK aman."
                            </div>
                        </label>
                    </div>

                    <button id="btn-lvl6" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors shadow-lg">
                        KONFIRMASI PILIHAN
                    </button>
                </div>
            </div>
        `,
        setup: () => {
            const btn = document.getElementById('btn-lvl6');
            
            btn.addEventListener('click', () => {
                const c1 = document.getElementById('chk-6-1').checked;
                const c2 = document.getElementById('chk-6-2').checked;
                const c3 = document.getElementById('chk-6-3').checked;

                // LOGIKA MENANG: Semua harus UNCHECKED (False) agar data aman
                // 1. "Jangan tidak jual" (checked = jual). Uncheck = Jangan jual.
                // 2. "Hapus akun" (checked = hapus). Uncheck = Jangan hapus.
                // 3. "Tidak keberatan data tidak aman" (checked = data tidak aman). Uncheck = keberatan (ingin aman).

                if (!c1 && !c2 && !c3) {
                    nextLevel();
                } else {
                    takeDamage("Pilihan Anda membahayakan data! Coba baca lagi.");
                }
            });
        }
    },

    // LEVEL 7: THE QUIZ (STROOP EFFECT)
    7: {
        render: () => `
            <div class="flex flex-col justify-center h-full fade-in">
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
                    <h2 class="text-2xl font-bold mb-6 text-white">TES FOKUS</h2>
                    <p class="text-lg text-gray-300 mb-8 animate-pulse">
                        Klik gambar <span class="font-black text-white underline decoration-blue-500">LINGKARAN</span>
                    </p>

                    <div class="flex justify-center gap-6 items-center">
                        <div class="shape-btn cursor-pointer bg-red-500 w-24 h-24 flex items-center justify-center font-bold text-white text-xs border-4 border-transparent hover:border-white transition-all shadow-xl hover:scale-105" data-shape="square">
                            LINGKARAN
                        </div>

                        <div class="shape-btn cursor-pointer bg-blue-500 w-24 h-24 rounded-full flex items-center justify-center font-bold text-white text-xs border-4 border-transparent hover:border-white transition-all shadow-xl hover:scale-105" data-shape="circle">
                            KOTAK
                        </div>
                    </div>
                </div>
            </div>
        `,
        setup: () => {
            const shapes = document.querySelectorAll('.shape-btn');
            shapes.forEach(shape => {
                shape.addEventListener('click', (e) => {
                    const type = e.target.dataset.shape;
                    // Instruksi: Klik GAMBAR Lingkaran.
                    if (type === 'circle') {
                        nextLevel();
                    } else {
                        takeDamage("Itu gambar Kotak! Jangan terkecoh tulisan.");
                    }
                });
            });
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
                        <p class="text-yellow-400 font-mono text-sm leading-relaxed select-none" id="target-text">Sumpah mi apa saya rela nilai D kalau tidak menyelesaikan game ini</p>
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
            const target = "Sumpah mi apa saya rela nilai D kalau tidak menyelesaikan game ini";

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
            const maxDodges = 8; // Berhenti setelah 8 kali
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
            <div class="flex flex-col h-full fade-in">
                <div class="bg-gray-800 p-4 rounded-t-xl border border-gray-700 text-center">
                    <h2 class="text-lg font-bold mb-1">🔍 FINE PRINT</h2>
                    <p class="text-xs text-gray-400">Ada password tersembunyi di teks super kecil ini.</p>
                </div>
                
                <div class="bg-white text-black p-4 border-x border-gray-700 flex-grow relative overflow-hidden cursor-crosshair group touch-none" id="magnifier-area">
                    
                    <div id="micro-content" class="text-[3px] leading-[4px] text-justify font-serif text-gray-800 break-words select-none pointer-events-none transition-transform duration-100 origin-top-left">
                        </div>

                    <div id="lens" class="absolute w-24 h-24 rounded-full border-2 border-gray-400 bg-white/30 backdrop-contrast-150 backdrop-saturate-150 pointer-events-none hidden shadow-2xl transform -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-multiply"></div>

                </div>

                <div class="bg-gray-800 p-4 rounded-b-xl border border-gray-700">
                    <div class="flex gap-2">
                        <input type="text" id="pass-input" placeholder="Kode: ????" class="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 font-mono text-center tracking-widest uppercase">
                        <button id="btn-lvl12" class="bg-blue-600 px-4 py-2 rounded font-bold text-white">OK</button>
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

            // 1. Generate Teks Micro
            const passCode = "1234";
            const dummy = "lorem ipsum dolor sit amet consectetur agreement ";
            let text = "";
            
            // Buat banyak teks, sisipkan password di tengah random
            for(let i=0; i<400; i++) {
                if (i === 200) {
                    text += `<span class="font-bold text-red-900 bg-yellow-200">PASSWORD:${passCode}</span> `;
                } else {
                    text += dummy;
                }
            }
            container.innerHTML = text;

            // 2. Logic Magnifier (CSS Transform Origin)
            const handleMove = (x, y) => {
                // Tampilkan lensa
                lens.classList.remove('hidden');
                
                // Pindahkan posisi visual lensa
                lens.style.left = `${x}px`;
                lens.style.top = `${y}px`;

                // ZOOM EFFECT:
                // Kita mengubah transform-origin container ke posisi kursor
                // Lalu scale container-nya
                const rect = area.getBoundingClientRect();
                const relX = x; 
                const relY = y;

                container.style.transformOrigin = `${relX}px ${relY}px`;
                container.style.transform = "scale(4)"; // Zoom 4x
            };

            const resetZoom = () => {
                container.style.transform = "scale(1)";
                lens.classList.add('hidden');
            };

            // Event Listeners Mouse
            area.addEventListener('mousemove', (e) => {
                const rect = area.getBoundingClientRect();
                handleMove(e.clientX - rect.left, e.clientY - rect.top);
            });
            area.addEventListener('mouseleave', resetZoom);

            // Event Listeners Touch
            area.addEventListener('touchmove', (e) => {
                e.preventDefault(); // Prevent scroll
                const touch = e.touches[0];
                const rect = area.getBoundingClientRect();
                handleMove(touch.clientX - rect.left, touch.clientY - rect.top);
            });
            area.addEventListener('touchend', resetZoom);

            // 3. Logic Submit
            btn.addEventListener('click', () => {
                if (input.value.trim() === passCode) {
                    nextLevel();
                } else {
                    takeDamage("Kode salah! Cari lagi pakai kaca pembesar.");
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
            <div class="flex flex-col h-full fade-in">
                <div class="bg-gray-800 rounded-t-xl border border-gray-700 p-4 pb-2">
                    <h2 class="text-lg font-bold">🍪 PREFERENSI COOKIE</h2>
                    <p class="text-xs text-gray-400">Atur privasi Anda. Hijau = Aktif.</p>
                </div>

                <div class="bg-gray-900 p-4 flex-grow overflow-y-auto border-x border-gray-700 space-y-4">
                    
                    <div class="flex justify-between items-center p-3 bg-gray-800 rounded border border-gray-600">
                        <div class="text-xs">
                            <div class="font-bold text-gray-200">Cookie Wajib</div>
                            <div class="text-gray-500 text-[10px]">Agar website tidak meledak.</div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="cookie-essential" class="sr-only peer" checked disabled>
                            <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 opacity-50 cursor-not-allowed"></div>
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

                <div class="bg-gray-800 border border-gray-700 rounded-b-xl p-4 flex gap-2">
                    <button id="btn-reject-all" class="w-1/3 bg-gray-700 text-gray-500 text-[10px] rounded hover:bg-gray-600">Reject All (Broken)</button>
                    <button id="btn-save-cookie" class="w-2/3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded text-sm">SIMPAN PENGATURAN</button>
                </div>
            </div>
        `,
        setup: () => {
            const btn = document.getElementById('btn-save-cookie');
            const reject = document.getElementById('btn-reject-all');
            
            reject.addEventListener('click', () => {
                takeDamage("Tombol ini rusak. Manual dong!");
            });

            btn.addEventListener('click', () => {
                const mic = document.getElementById('cookie-mic').checked;
                const mafia = document.getElementById('cookie-mafia').checked;
                const key = document.getElementById('cookie-key').checked;

                // Harus Unchecked semua (False)
                if (!mic && !mafia && !key) {
                    nextLevel();
                } else {
                    takeDamage("Anda masih mengizinkan hal berbahaya! Matikan yang hijau-hijau.");
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
                    <p class="text-xs text-gray-400">Scrollbar kami agak membal. Tahan di bawah untuk melanjutkan.</p>
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