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
        1: "img/UL-1.webp", // Kampus Cerah
        2: "img/UL-2.webp", // Nongkrong
        3: "img/UL-3.webp", // Rapat
        4: "img/UL-4.webp", // Chaos/Crowd
        5: "img/UL-5.webp", // Laptop/Kerja
        6: "img/UL-6.webp", // Office
        7: "img/UL-7.webp", // Gelap/Sendiri
        8: "img/UL-8.webp"  // Wisuda
    };

    // --- 2. CONTENT DATA (Updated with Micro Moments) ---
    const contentData = [
        // --- SEMESTER 1: The "Maba" Era ---
        { sem: 1, type: 'card', title: "Masuk Universitas", desc: "Ga nyangka bisa jadi mahasiswa di sini, walau sempat galau pilih jurusan.", img: "img/UL-9.webp", align: "center" },
        { sem: 1, type: 'micro', text: "📸 Foto pakai almet di setiap sudut kampus (buat PP WA)", align: "left" },
        { sem: 1, type: 'micro', text: "🤔 Nyasar cari Gedung C, malu nanya satpam", align: "right" }, 
        { sem: 1, type: 'card', title: "PKKMB / Ospek", desc: "Disuruh ini itu? 'Siap Kak, Laksanakan!'.", img: "img/UL-10.webp", align: "right" },
        { sem: 1, type: 'micro', text: "🍞 Sarapan Roti 2 ribuan karena telat bangun", align: "center" }, 
        { sem: 1, type: 'card', title: "Kaget Kuliah", desc: "Dosen nggak ngejar tugas kayak guru SMA. Bebas tapi panik.", img: "img/UL-11.webp", align: "left" },
        { sem: 1, type: 'micro', text: "🏫 Keliling kampus lagi sampe nyasar", align: "right" }, 
        { sem: 1, type: 'micro', text: "📝 Catat semua omongan dosen (masih rajin)", align: "left" }, 
        { sem: 1, type: 'card', title: "Target Ambis", desc: "IPK harus 4.00! Mau jadi Ketua BEM! Lulus 3.5 Tahun!", img: "img/UL-12.webp", align: "right" },
        { sem: 1, type: 'micro', text: "😢 Homesick, rindu masakan Ibu & suara omelan bapak", align: "center" },
        { sem: 1, type: 'micro', text: "🎒 Rindu masa SMA, temen-temen kabarnya gimana ya?", align: "right" },
        { sem: 1, type: 'card', title: "Sirkel baru", desc:  "Bro, lu jurusan apa? Kantin yuk.", img: "img/UL-13.webp", align: "left" },
        { sem: 1, type: 'card', title: "Ujian Pertama", desc: "Belajar H-1, ternyata soalnya esai semua.", img: "img/UL-14.webp", align: "center" },        
        { sem: 1, type: 'fact', text: "1/3 Mahasiswa baru mengalami kecemasan (Culture Shock) karena adaptasi drastis. Tenang, ini fenomena yang umum kok!", source: "Auerbach et al. di Journal of Abnormal Psychology" },
    
        // --- SEMESTER 2: The Settler ---
        { sem: 2, type: 'card', title: "Matkul Peminatan", desc: "Mulai masuk materi jurusan. Wah ternyata asik juga!", img: "img/UL-15.webp", align: "left" },
        { sem: 2, type: 'micro', text: "💸 Uang bulanan habis di minggu ke-2", align: "right" }, 
        { sem: 2, type: 'card', title: "Lifestyle Mahasiswa", desc: "Nongkrong di cafe modal WiFi gratisan biar kelihatan produktif.", img: "img/UL-16.webp", align: "right" },
        { sem: 2, type: 'micro', text: "😴 Titip Absen (TA) ke temen sekelas", align: "left" }, 
        { sem: 2, type: 'card', title: "Aktif Ormawa", desc: "Rapat sampai malam, proker padat. Makin pede berpendapat.", img: "img/UL-17.webp", align: "center" },
        { sem: 2, type: 'micro', text: "❤️ Cinlok sama teman kepanitiaan (Divisi Acara x Logistik)", align: "right" },
        { sem: 2, type: 'micro', text: "👕 Baju himpunan jadi outfit kebanggaan", align: "left" }, 
        { sem: 2, type: 'card', title: "Matkul Praktikum", desc: "Laporan tulis tangan? Asistensi dicoret-coret? Hal baru deh pokoknya.", img: "img/UL-18.webp", align: "left" },
        { sem: 2, type: 'micro', text: "😔 Apa aku salah jurusan ya, kok susah?", align: "left" }, 
        { sem: 2, type: 'micro', text: "🗓️ Udah survive setahun, aku pasti bisa!", align: "center" }, 
        { sem: 2, type: 'card', title: "Libur Semester", desc: "Liburnya lama banget, sampai lupa cara nulis.", img: "img/UL-19.webp", align: "center" },        
        { sem: 2, type: 'fact', text: "Merasa salah jurusan? Kamu nggak sendiri. Sekitar 87% mahasiswa di Indonesia merasa mereka memilih jurusan yang tidak sesuai minat.", source: "Indonesia Career Center Network (ICCN) Summit 2017" },
    
        // --- SEMESTER 3: Sophomore Slump ---
        { sem: 3, type: 'micro', text: "🥱 Kapan liburnya selesai? Gabut banget di rumah.", align: "center" },        
        { sem: 3, type: 'card', title: "Resmi Kating", desc: "Maba minggir dulu, sepuh (padahal baru tingkat 2) mau lewat.", img: "img/UL-20.webp", align: "left" },
        { sem: 3, type: 'card', title: "Perang KRS", desc: "Telat semenit, server down, dapet kelas sisa jam 7 pagi.", img: "img/UL-21.webp", align: "right" },
        { sem: 3, type: 'micro', text: "📄 Jualan Danus (Risol/Donat) keliling kampus", align: "center" },
        { sem: 3, type: 'micro', text: "😡 Teman sekelompok jadi beban (Pegal gendong kelompok)", align: "right" }, 
        { sem: 3, type: 'micro', text: "💻 Laptop udah jadi pasangan terdekat, banyak tugas soalnya", align: "left" }, 
        { sem: 3, type: 'card', title: "Dosen Favorit vs Killer", desc: "Udah hafal mana dosen yang nilainya 'A' gratis, mana yang pelit.", img: "img/UL-22.webp", align: "left" },
        { sem: 3, type: 'card', title: "Sibuk Agenda", desc: "Kuliah, Rapat, Nugas, Repeat. Juga ditambah kegiatan lainnya.", img: "img/UL-23.webp", align: "right" },
        { sem: 3, type: 'card', title: "Ujian Lagi", desc: "Perasaan baru kemarin masuk, kok udah UAS?", img: "img/UL-24.webp", align: "center" },       
        { sem: 3, type: 'fact', text: "Hati-hati kena 'Sophomore Slump'! Ini adalah fenomena nyata di mana motivasi anjlok drastis di tahun kedua setelah euforia maba hilang dan rutinitas membosankan dimulai.", source: "Laurie A. Schreiner di Jurnal Innovative Higher Education" },

        // --- SEMESTER 4: The Chaos ---
        { sem: 4, type: 'card', title: "Event Hunter", desc: "Lomba sana sini, jadi panitia, jadi volunteer... Gas terus selagi muda!", img: "img/UL-25.webp", align: "left" },
        { sem: 4, type: 'micro', text: "🍜 Indomie telur adalah penyelamat akhir bulan", align: "center" }, 
        { sem: 4, type: 'card', title: "Tugas Numpuk", desc: "SKS adalah jalan ninjaku. Kopi adalah air putihku.", img: "img/UL-26.webp", align: "right" },
        { sem: 4, type: 'micro', text: "📚 Baca jurnal biar keliatan kaya akademisi", align: "center" },         
        { sem: 4, type: 'micro', text: "🤖 Chat GPT: 'Buatkan kerangka essay...'", align: "left" }, 
        { sem: 4, type: 'micro', text: "⚖️ Harus tetep semangat Work Life Balance walau sibuknya minta ampun", align: "right" }, 
        { sem: 4, type: 'card', title: "KKN Dimulai", desc: "Keluar dari zona nyaman, 30 hari harus survive seadanya.", img: "img/UL-43.webp", align: "center" },
        { sem: 4, type: 'micro', text: "💦 Mandi ngantri satu kamar mandi buat 10 orang", align: "left" }, 
        { sem: 4, type: 'micro', text: "🫠 Lika-liku hidup di KKN, ada-ada aja pokoknya", align: "right" },        
        { sem: 4, type: 'micro', text: "🫂 Akrab sama warga, udah kaya warga lokal aja.", align: "center" },         
        { sem: 4, type: 'card', title: "Tamat KKN", desc: "Pengen rehat tapi besok udah masuk kuliah lagi. Cinlok KKN bubar jalan.", img: "img/UL-27.webp", align: "left" },
        { sem: 4, type: 'fact', text: "KKN bukan sekadar 'liburan di desa'. Studi menunjukkan interaksi langsung dengan warga meningkatkan Kecerdasan Emosional (EQ) dan kepedulian sosial secara signifikan.", source: "Iis Prasetyo et al. di Jurnal Pengabdian Masyarakat" },

        // --- SEMESTER 5: The Hustler ---
        { sem: 5, type: 'micro', text: "📉 Circle pertemanan menyusut drastis. Sisa yang sefrekuensi & bahas masa depan.", align: "center"},
        { sem: 5, type: 'card', title: "Make Money Worth", desc: "Kuliah mahal, ilmu harus dapet. Mulai kritis sama dosen.", img: "img/UL-28.webp", align: "right" },
        { sem: 5, type: 'micro', text: "👻 Horror baru, otw skripsi dengan mulai belajar 'Metodologi Penelitian'.", align: "center" },        
        { sem: 5, type: 'micro', text: "🎽 Outfit ngampus berubah dari stylish jadi 'yang penting pake baju'.", align: "left" },         
        { sem: 5, type: 'card', title: "Berpikir pragmatis", desc: "Nilai ga masalah, yang penting skill.", img: "img/UL-29.webp", align: "right" },
        { sem: 5, type: 'card', title: "Cuan Oriented", desc: "Ada gak ya aktivitas yang bisa jadi cuan? Mulai freelance/part-time.", img: "img/UL-30.webp", align: "left" },
        { sem: 5, type: 'micro', text: "👔 LinkedIn status: Open to Work", align: "left" },
        { sem: 5, type: 'card', title: "Mulai Sepuh", desc: "Liat maba tingkahnya aneh-aneh. 'Dulu kita gitu gak sih?' (Padahal iya).", img: "img/UL-31.webp", align: "center" },
        { sem: 5, type: 'fact', text: "Jiwa pengusaha! Sekitar 7% pelajar & mahasiswa di Indonesia tercatat kuliah sambil bekerja (freelance/part-time) untuk mandiri secara finansial.", source: "Data BPS Ketenagakerjaan" },
    
        // --- SEMESTER 6: Real World ---
        { sem: 6, type: 'card', title: "Jalan Akademisi (Metpen)", desc: "Mulai belajar statistika dan metode penelitian.", img: "img/UL-32.webp", align: "left" },
        { sem: 6, type: 'micro', text: "☕ Kopi bukan lagi hobi, tapi bensin agar tetap hidup.", align: "right" },
        { sem: 6, type: 'micro', text: "📧 Notif email: 'We regret to inform you...' (Ditolak lagi).", align: "left" },
        { sem: 6, type: 'card', title: "Drama Konversi SKS", desc: "Magang capek-capek, masih deg-degan apakah SKS-nya bakal diakui Prodi atau harus ngulang matkul.", img: "https://placehold.co/600x400/800000/FFF?text=Konversi+SKS", align: "left" },
        { sem: 6, type: 'card', title: "Corporate Slave Starter Pack", desc: "Pulang magang, ngerjain laporan harian, tidur 3 jam. Selamat datang di kehidupan dewasa.", img: "img/UL-34.webp", align: "center" },
        { sem: 6, type: 'micro', text: "💸 Gaji magang numpang lewat buat bayar kost & ojol.", align: "right" },
        { sem: 6, type: 'micro', text: "📝 Laporan magang tebelnya ga abis-abis.", align: "center" },
        { sem: 6, type: 'micro', text: "🌃 'Story Instagram isinya laptop dan kopi jam 2 pagi.", align: "right" },
        { sem: 6, type: 'micro', text: "📜 Mulai jarang nongkrong karena 'nanggung, bentar lagi lulus'.", align: "center" },  
        { sem: 6, type: 'micro', text: "🎓 Panik liat teman yang ambis pede lulus 3.5 tahun.", align: "left" },        
        { sem: 6, type: 'fact', text: "Magang itu gerbang emas! Riset menunjukkan sekitar 60-70% mahasiswa yang magang mendapatkan tawaran kerja full-time dari tempat mereka magang.", source: "NACE Internship & Co-op Report" },

        // --- SEMESTER 7: The Void ---
        { sem: 7, type: 'card', title: "Mencari Judul Skripsi", desc: "Dosen: 'Judulmu terlalu luas'. Revisi lagi, revisi lagi.", img: "img/UL-35.webp", align: "left" },
        { sem: 7, type: 'micro', text: "✅ ACC Judul (Akhirnya!)", align: "right" },
        { sem: 7, type: 'micro', text: "🏃 Sibuk-sibuknya sama dospem.", align: "left" },
        { sem: 7, type: 'card', title: "Seminar Proposal (Sempro)", desc: "Presentasi bab 1-3 dengan tangan dingin. Dosen penguji mulai bertanya hal yang tidak ada di slide.", img: "img/UL-36.webp", align: "right" },
        { sem: 7, type: 'card', title: "Laid Back & Lonely", desc: "Ke kampus cuma buat bimbingan. Teman-teman mulai menghilang sibuk sama rutinitasnya masing-masing.", img: "img/UL-37.webp", align: "right" },
        { sem: 7, type: 'micro', text: "💍 Liat story IG, Teman angkatan udah mulai nikah", align: "center" }, 
        { sem: 7, type: 'card', title: "Jati Diri", desc: "Quarter Life Crisis. Orang lain udah sukses, aku masih di Bab 1. Scroll LinkedIn malah jadi insecure.", img: "img/UL-38.webp", align: "center" },
        { sem: 7, type: 'fact', text: "Bingung masa depan? Itu wajar. Periode Quarter Life Crisis (kecemasan akan arah hidup) paling sering menyerang rentang usia 18-29 tahun.", source: "Rizqi Agustin Permana, et al. di Jurnal Psikostudia" },
    
        // --- SEMESTER 8: The Finale ---
        { sem: 8, type: 'card', title: "Menyelesaikan TA", desc: "Begadang tiap malam di depan laptop. Mata panda permanen, kopi adalah air putih.", img: "img/UL-39.webp", align: "right" },
        { sem: 8, type: 'micro', text: "🖨️ Biaya ngeprint skripsi = uang makan seminggu", align: "left" }, 
        { sem: 8, type: 'micro', text: "📚 Ribet ngurus Bebas Pustaka & Revisi", align: "right" },
        { sem: 8, type: 'card', title: "Sidang Skripsi", desc: "Dibantai Penguji, kaki gemetar, otak blank, tapi akhirnya kalimat sakti itu keluar: 'Kamu LULUS'.", img: "img/UL-40.webp", align: "center" },
        { sem: 8, type: 'micro', text: "😭 Nangis haru pas keluar ruang sidang", align: "center" },
        { sem: 8, type: 'card', title: "Hari terakhir di Kosan", desc: "Packing barang. Kamar yang dulu penuh kenangan kini kosong melompong. Pamit sama ibu kos.", img: "img/UL-41.webp", align: "left" },
        { sem: 8, type: 'card', title: "Wisuda", desc: "Toga, foto keluarga, dan lempar topi. Semua lelah terbayar hari ini. You did it!", img: "img/UL-42.webp", align: "right" },
        { sem: 8, type: 'micro', text: "👋 Selamat tinggal KTM, selamat datang KTP", align: "right" }, 
        { sem: 8, type: 'card', title: "New Chapter", desc: "Euforia selesai. Dunia kerja menanti. Ngirim CV, nunggu panggilan, dan berjuang lagi dari nol.", img: "https://placehold.co/600x400/F0F8FF/333?text=Welcome+to+Reality", align: "center" },
        { sem: 8, type: 'quote', text: "Education is what remains after one has forgotten what one has learned in school.", source: "Albert Einstein" },
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