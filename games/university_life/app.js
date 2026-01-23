document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENT REFS ---
    const worldContainer = document.getElementById('game-world');
    const indicator = document.getElementById('semester-indicator');
    const bgFront = document.getElementById('bg-front');
    const bgBack = document.getElementById('bg-back');
    const preloader = document.getElementById('preloader');
    const loadingText = document.getElementById('loading-text');

    // State untuk Background
    let activeBgLayer = 1; // 1 = Front, 2 = Back

    // --- 1. DATA MASTER (Backgrounds) ---
    const semesterBackgrounds = {
        1: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop", // Kampus Cerah
        2: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop", // Nongkrong
        3: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1920&auto=format&fit=crop", // Rapat
        4: "https://images.unsplash.com/photo-1504384308090-c54be3855091?q=80&w=1920&auto=format&fit=crop", // Chaos/Crowd
        5: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop", // Laptop/Kerja
        6: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1920&auto=format&fit=crop", // Office
        7: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1920&auto=format&fit=crop", // Gelap/Sendiri
        8: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop"  // Wisuda
    };

    // --- 2. CONTENT DATA (Updated with Micro Moments) ---
    const contentData = [
        // --- SEMESTER 1: The "Maba" Era ---
        { sem: 1, type: 'card', title: "Masuk Universitas", desc: "Ga nyangka bisa jadi mahasiswa di sini, walau sempat galau pilih jurusan.", img: "https://placehold.co/600x400/87CEEB/333?text=Kampus+Impian", align: "center" },
        { sem: 1, type: 'micro', text: "📸 Foto pakai almet di setiap sudut kampus (buat PP WA)", align: "left" },
        { sem: 1, type: 'micro', text: "🤔 Nyasar cari Gedung C, malu nanya satpam", align: "right" }, 
        { sem: 1, type: 'card', title: "PKKMB / Ospek", desc: "Disuruh botak atau kuncir pita? 'Siap Kak!' adalah kata kunci.", img: "https://placehold.co/600x400/4682B4/FFF?text=PKKMB", align: "right" },
        { sem: 1, type: 'micro', text: "🍞 Sarapan Roti 2 ribuan karena telat bangun", align: "center" }, 
        { sem: 1, type: 'card', title: "Kaget Kuliah", desc: "Dosen nggak ngejar tugas kayak guru SMA. Bebas tapi panik.", img: "https://placehold.co/600x400/5F9EA0/FFF?text=Culture+Shock", align: "left" },
        { sem: 1, type: 'micro', text: "📝 Catat semua omongan dosen (masih rajin)", align: "right" }, 
        { sem: 1, type: 'card', title: "Target Ambis", desc: "IPK harus 4.00! Mau jadi Ketua BEM! Lulus 3.5 Tahun!", img: "https://placehold.co/600x400/FFD700/333?text=Ambis+Mode", align: "right" },
        { sem: 1, type: 'micro', text: "😢 Homesick: Rindu masakan Ibu & suara omelan bapak", align: "center" },
        { sem: 1, type: 'fact', text: "Fun Fact: 1/3 Mahasiswa baru mengalami kecemasan (Culture Shock) karena adaptasi drastis.", source: "Frontiers in Public Health" },
    
        // --- SEMESTER 2: The Settler ---
        { sem: 2, type: 'card', title: "Matkul Peminatan", desc: "Mulai masuk materi jurusan. Wah ternyata asik juga!", img: "https://placehold.co/600x400/1E90FF/FFF?text=Matkul+Seru", align: "left" },
        { sem: 2, type: 'micro', text: "💸 Uang bulanan habis di minggu ke-2", align: "right" }, 
        { sem: 2, type: 'card', title: "Lifestyle Mahasiswa", desc: "Nongkrong di cafe modal WiFi gratisan biar kelihatan produktif.", img: "https://placehold.co/600x400/8A2BE2/FFF?text=Coffee+Shop", align: "right" },
        { sem: 2, type: 'micro', text: "😴 Titip Absen (TA) ke temen sekelas", align: "left" }, 
        { sem: 2, type: 'card', title: "Aktif Ormawa", desc: "Rapat sampai malam, proker padat. Makin pede berpendapat.", img: "https://placehold.co/600x400/FF4500/FFF?text=Organisasi", align: "center" },
        { sem: 2, type: 'micro', text: "❤️ Cinlok sama teman kepanitiaan (Divisi Acara x Logistik)", align: "right" },
        { sem: 2, type: 'micro', text: "👕 Baju himpunan jadi outfit kebanggaan", align: "left" }, 
        { sem: 2, type: 'card', title: "Praktikum", desc: "Laporan tulis tangan? Asistensi dicoret-coret? Mental baja dimulai.", img: "https://placehold.co/600x400/3CB371/FFF?text=Lab+Work", align: "left" },
        { sem: 2, type: 'fact', text: "Fun Fact: 87% Mahasiswa Indonesia pernah merasa salah jurusan.", source: "ICCN" },
    
        // --- SEMESTER 3: Sophomore Slump ---
        { sem: 3, type: 'card', title: "Resmi Kating", desc: "Maba minggir dulu, sepuh (padahal baru tingkat 2) mau lewat.", img: "https://placehold.co/600x400/708090/FFF?text=Seniority", align: "left" },
        { sem: 3, type: 'micro', text: "📄 Jualan Danus (Risul/Donat) keliling kampus", align: "center" },
        { sem: 3, type: 'micro', text: "😡 Teman sekelompok jadi beban (Freeloader)", align: "right" }, 
        { sem: 3, type: 'card', title: "Perang KRS", desc: "Telat semenit, server down, dapet kelas sisa jam 7 pagi.", img: "https://placehold.co/600x400/B22222/FFF?text=War+KRS", align: "right" },
        { sem: 3, type: 'micro', text: "💻 Laptop mulai lemot/rusak pas deadline", align: "left" }, 
        { sem: 3, type: 'card', title: "Dosen Favorit vs Killer", desc: "Udah hafal mana dosen yang nilainya 'A' gratis, mana yang pelit.", img: "https://placehold.co/600x400/008080/FFF?text=Dosen+Idola", align: "left" },
        { sem: 3, type: 'card', title: "Sibuk Agenda", desc: "Kuliah, Rapat, Nugas, Repeat. Kantung mata memblack.", img: "https://placehold.co/600x400/8B4513/FFF?text=Hectic", align: "right" },
        { sem: 3, type: 'fact', text: "'Sophomore Slump' adalah penurunan motivasi drastis di tahun kedua.", source: "Psychology Research" },

        // --- SEMESTER 4: The Chaos ---
        { sem: 4, type: 'card', title: "Event Hunter", desc: "Lomba sana sini, panitia konser. Gas terus selagi muda!", img: "https://placehold.co/600x400/FF8C00/FFF?text=Event+Organizer", align: "left" },
        { sem: 4, type: 'micro', text: "🍜 Indomie telur adalah penyelamat akhir bulan", align: "center" }, 
        { sem: 4, type: 'card', title: "Tugas Numpuk", desc: "SKS adalah jalan ninjaku. Kopi adalah air putihku.", img: "https://placehold.co/600x400/8B0000/FFF?text=Deadline", align: "right" },
        { sem: 4, type: 'micro', text: "🤖 Chat GPT: 'Buatkan kerangka essay...'", align: "left" }, 
        { sem: 4, type: 'card', title: "KKN Dimulai", desc: "Dibuang ke desa antah berantah. 30 hari survive tanpa sinyal.", img: "https://placehold.co/600x400/556B2F/FFF?text=KKN+Desa", align: "center" },
        { sem: 4, type: 'micro', text: "👻 Uji Nyali di Posko KKN", align: "right" },
        { sem: 4, type: 'micro', text: "💦 Mandi ngantri satu kamar mandi buat 15 orang", align: "left" }, 
        { sem: 4, type: 'card', title: "Tamat KKN", desc: "Pengen rehat tapi besok udah masuk kuliah lagi. Cinlok KKN bubar jalan.", img: "https://placehold.co/600x400/A0522D/FFF?text=Burnout", align: "left" },
        { sem: 4, type: 'fact', text: "Fun Fact: KKN terbukti meningkatkan soft-skill empati & problem solving.", source: "Jurnal Pengabdian Masyarakat" },

        // --- SEMESTER 5: The Hustler ---
        { sem: 5, type: 'card', title: "Make Money Worth", desc: "Kuliah mahal, ilmu harus dapet. Mulai kritis sama dosen.", img: "https://placehold.co/600x400/9400D3/FFF?text=Critical+Thinking", align: "right" },
        { sem: 5, type: 'micro', text: "🔌 Hunting colokan listrik di perpustakaan", align: "center" }, 
        { sem: 5, type: 'card', title: "Mikirin Duit", desc: "Ada gak ya aktivitas yang bisa jadi cuan? Mulai freelance/part-time.", img: "https://placehold.co/600x400/006400/FFF?text=Cuan+Hunter", align: "left" },
        { sem: 5, type: 'micro', text: "👔 LinkedIn status: Open to Work", align: "left" },
        { sem: 5, type: 'card', title: "Mulai Sepuh", desc: "Liat maba tingkahnya aneh-aneh. 'Dulu kita gitu gak sih?'", img: "https://placehold.co/600x400/778899/FFF?text=Sepuh+Moment", align: "center" },
        { sem: 5, type: 'fact', text: "Fun Fact: 7% Mahasiswa kuliah sambil bekerja/freelance.", source: "Data BPS" },
    
        // --- SEMESTER 6: Real World ---
        { sem: 6, type: 'card', title: "Jalan Akademisi (Metpen)", desc: "Mulai pusing cari judul. Mengajukan 3 judul, ditolak semua.", img: "https://placehold.co/600x400/000080/FFF?text=Metpen", align: "left" },
        { sem: 6, type: 'micro', text: "☕ Kopi bukan lagi hobi, tapi kebutuhan hidup", align: "right" },
        { sem: 6, type: 'card', title: "Persiapan Magang", desc: "Apply ke 50 perusahaan, yang bales cuma 2. Itupun ditolak.", img: "https://placehold.co/600x400/2F4F4F/FFF?text=Internship", align: "right" },
        { sem: 6, type: 'micro', text: "📧 'We regret to inform you...' (Email penolakan)", align: "left" }, 
        { sem: 6, type: 'card', title: "The Hustle", desc: "Pulang magang, ngerjain laporan, tidur 3 jam. Welcome to adulthood.", img: "https://placehold.co/600x400/191970/FFF?text=Corporate+Slave", align: "center" },
        { sem: 6, type: 'fact', text: "60% Mahasiswa magang dapat tawaran full-time.", source: "NACE Report" },

        // --- SEMESTER 7: The Void ---
        { sem: 7, type: 'card', title: "Mencari Judul Skripsi", desc: "Dosen: 'Judulmu terlalu luas'. Revisi lagi, revisi lagi.", img: "https://placehold.co/600x400/800000/FFF?text=Skripsi+Starter+Pack", align: "left" },
        { sem: 7, type: 'micro', text: "👻 Dospem Ghosting 2 minggu", align: "left" },
        { sem: 7, type: 'card', title: "Laid Back & Lonely", desc: "Ke kampus cuma buat bimbingan. Teman-teman mulai menghilang.", img: "https://placehold.co/600x400/36454F/FFF?text=Lonely", align: "right" },
        { sem: 7, type: 'micro', text: "💍 Liat story IG: Teman angkatan mulai nikah", align: "center" }, 
        { sem: 7, type: 'card', title: "Jati Diri", desc: "Quarter Life Crisis. Orang lain udah sukses, aku masih di Bab 1.", img: "https://placehold.co/600x400/000000/FFF?text=Quarter+Life+Crisis", align: "center" },
        { sem: 7, type: 'fact', text: "Fun Fact: Quarter Life Crisis paling sering menyerang usia 18-29 tahun.", source: "Psikostudia" },
    
        // --- SEMESTER 8: The Finale ---
        { sem: 8, type: 'card', title: "Menyelesaikan TA", desc: "Begadang tiap malam di depan laptop. Printer macet pas mau jilid.", img: "https://placehold.co/600x400/FFD700/333?text=Pejuang+Skripsi", align: "right" },
        { sem: 8, type: 'micro', text: "🖨️ Biaya ngeprint skripsi = uang makan seminggu", align: "left" }, 
        { sem: 8, type: 'card', title: "Sidang Skripsi", desc: "Dibantai Penguji, kaki gemetar, tapi akhirnya 'LULUS'.", img: "https://placehold.co/600x400/B8860B/FFF?text=Sidang", align: "center" },
        { sem: 8, type: 'micro', text: "😭 Nangis haru pas keluar ruang sidang", align: "center" },
        { sem: 8, type: 'card', title: "Wisuda", desc: "Toga, foto keluarga, dan lempar topi. You did it!", img: "https://placehold.co/600x400/FFFFFF/333?text=Wisuda", align: "left" },
        { sem: 8, type: 'micro', text: "👋 Selamat tinggal KTM, selamat datang KTP", align: "right" }, 
        { sem: 8, type: 'card', title: "New Chapter", desc: "Dunia kerja menanti. Terima kasih kampusku.", img: "https://placehold.co/600x400/F0F8FF/333?text=The+End?", align: "right" },
        { sem: 8, type: 'quote', text: "Selamat! Dunia nyata menanti.", source: "RIT Playground" },
    ];

    // === 3. PRELOAD ASET ===
    function preloadAssets() {
        const imagesToLoad = [];
        
        // Backgrounds
        Object.values(semesterBackgrounds).forEach(url => imagesToLoad.push(url));
        
        // Cards
        contentData.forEach(item => {
            if (item.img) imagesToLoad.push(item.img);
        });

        let loadedCount = 0;
        const total = imagesToLoad.length;

        if (total === 0) {
            hidePreloader();
            return;
        }

        imagesToLoad.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                loadingText.innerText = `Memuat Kenangan: ${Math.floor((loadedCount / total) * 100)}%`;
                if (loadedCount >= total) hidePreloader();
            };
            img.onerror = () => {
                loadedCount++; 
                if (loadedCount >= total) hidePreloader();
            };
        });
    }

    function hidePreloader() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = 'auto'; // Enable scroll
            indicator.innerText = "SEMESTER 1";
            bgFront.style.backgroundImage = `url('${semesterBackgrounds[1]}')`;
        }, 1000);
    }

    // === 4. RENDER WORLD (SCATTERED & RESPONSIVE) ===
    function renderWorld() {
        for (let i = 1; i <= 8; i++) {
            const section = document.createElement('section');
            section.id = `semester-${i}`;
            section.dataset.semester = i;
            // Pad lebih kecil di HP (py-20) vs Desktop (py-32)
            section.className = "min-h-screen relative py-20 md:py-32 flex flex-col w-full max-w-7xl mx-auto gap-12 md:gap-24"; 

            const semesterData = contentData.filter(d => d.sem === i);
            let funFactData = null;
            let quoteData = null;

            semesterData.forEach(item => {

                // Fact + Quote
                if (item.type === 'fact') {
                    funFactData = item;
                    return;
                }

                if (item.type === 'quote') {
                    quoteData = item;
                    return;
                }

                // Wrapper Setup
                const wrapper = document.createElement('div');
                wrapper.className = "w-full flex px-4 md:px-0 z-10 pointer-events-auto";
                
                // Alignment Standard
                if (item.align === 'left') wrapper.classList.add('justify-start'); 
                else if (item.align === 'right') wrapper.classList.add('justify-end');
                else wrapper.classList.add('justify-center');

                // Random Rotation (Efek Album Foto)
                const randomRot = Math.random() * 6 - 3; 

                // --- LOGIC MICRO vs CARD ---
                if (item.type === 'card') {
                    // CARD: Margin standar, Ukuran Responsif (Kecil di HP)
                    // Mobile: w-[85vw] (Lebar hampir full layar HP tapi ada sisa)
                    // Desktop: w-[450px]
                    wrapper.innerHTML = `
                        <div class="float-card bg-white p-2 md:p-3 shadow-2xl transform transition-transform duration-500 w-[85vw] md:w-[450px] max-w-lg"
                             style="transform: rotate(${randomRot}deg);">
                             
                            <div class="h-48 md:h-64 overflow-hidden bg-gray-100 mb-2 md:mb-4 border border-gray-200 relative">
                                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
                            </div>
                            
                            <div class="px-2 pb-2">
                                <h3 class="font-bold text-lg md:text-2xl text-gray-900 font-serif mb-1 md:mb-2">${item.title}</h3>
                                <p class="text-xs md:text-base text-gray-600 leading-relaxed font-sans">${item.desc}</p>
                            </div>
                        </div>
                    `;
                } else if (item.type === 'micro') {
                    // MICRO: Scattered Position (Margin Acak)
                    const randomMargin = Math.floor(Math.random() * 30); // 0% - 30% margin random
                    
                    // Terapkan margin acak hanya di sisi lawan align
                    // (Misal align left, kita kasih margin-left random biar gak nempel kiri banget)
                    if(item.align === 'left') wrapper.style.paddingLeft = `${randomMargin}%`;
                    else if(item.align === 'right') wrapper.style.paddingRight = `${randomMargin}%`;

                    // Style Micro: Kecil, Padat, Compact di HP
                    wrapper.innerHTML = `
                        <div class="transform bg-black/70 backdrop-blur-md text-white px-3 py-2 md:px-6 md:py-3 rounded-xl border border-white/20 shadow-xl max-w-[80%] md:max-w-md"
                             style="transform: rotate(${randomRot * -2}deg);">
                            <div class="flex items-center gap-2 md:gap-3">
                                <span class="text-base md:text-xl">📌</span>
                                <span class="text-xs md:text-base font-medium tracking-wide leading-tight">${item.text}</span>
                            </div>
                        </div>
                    `;
                }
                
                section.appendChild(wrapper);
            });

            // FUN FACT SECTION
            if (funFactData) {
                const factContainer = document.createElement('div');
                factContainer.className = "w-full py-24 md:py-40 flex flex-col items-center justify-center text-center px-4 relative z-10";
                factContainer.innerHTML = `
                    <div class="max-w-4xl">
                        <span class="block text-[10px] md:text-sm tracking-[0.4em] uppercase text-white/60 mb-4 md:mb-6 animate-pulse">Fun Fact</span>
                        <h3 class="text-xl md:text-4xl font-light leading-snug text-white font-serif italic drop-shadow-lg">
                            "${funFactData.text}"
                        </h3>
                        <p class="text-[10px] md:text-sm text-white/50 mt-4 uppercase tracking-widest">— ${funFactData.source}</p>
                    </div>
                `;
                section.appendChild(factContainer);
            }

            // Quote SECTION
            if (quoteData) {
                const quoteContainer = document.createElement('div');
                quoteContainer.className = "w-full py-24 md:py-40 flex flex-col items-center justify-center text-center px-4 relative z-10";
                quoteContainer.innerHTML = `
                    <div class="max-w-4xl">
                        <span class="block text-[10px] md:text-sm tracking-[0.4em] uppercase text-white/60 mb-4 md:mb-6 animate-pulse">Quote</span>
                        <h3 class="text-xl md:text-4xl font-light leading-snug text-white font-serif italic drop-shadow-lg">
                            "${quoteData.text}"
                        </h3>
                        <p class="text-[10px] md:text-sm text-white/50 mt-4 uppercase tracking-widest">— ${quoteData.source}</p>
                    </div>
                `;
                section.appendChild(quoteContainer);
            }

            worldContainer.appendChild(section);
        }
    }

    // === 5. BACKGROUND OBSERVER ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const semIndex = entry.target.dataset.semester;
                indicator.innerText = `SEMESTER ${semIndex}`;
                
                const newBgUrl = `url('${semesterBackgrounds[semIndex]}')`;

                if (activeBgLayer === 1) {
                    bgBack.style.backgroundImage = newBgUrl;
                    bgBack.style.opacity = '1';
                    bgFront.style.opacity = '0';
                    activeBgLayer = 2;
                } else {
                    bgFront.style.backgroundImage = newBgUrl;
                    bgFront.style.opacity = '1';
                    bgBack.style.opacity = '0';
                    activeBgLayer = 1;
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-40% 0px -40% 0px', 
        threshold: 0
    });

    // === START ===
    renderWorld();
    
    document.querySelectorAll('section[id^="semester-"]').forEach(section => {
        observer.observe(section);
    });

    preloadAssets();

});