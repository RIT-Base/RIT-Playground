document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.getElementById('game-world');
    const indicator = document.getElementById('semester-indicator');
    const bgLayer = document.getElementById('dynamic-bg');

    // === DATA KONTEN ===
    // Jarak antar semester sekitar 1500px - 1600px
    const SEMESTER_HEIGHT = 1600;
    
    const contentData = [
        // --- SEMESTER 1: The "Maba" Era (0 - 1600) ---
        { sem: 1, type: 'card', title: "Masuk Universitas", desc: "Ga nyangka bisa jadi mahasiswa di sini, walau sempat galau pilih jurusan.", img: "https://placehold.co/600x400/87CEEB/333?text=Kampus+Impian", align: "center" },
        { sem: 1, type: 'micro', text: "📸 Foto pakai almet di setiap sudut kampus", align: "left" },
        { sem: 1, type: 'card', title: "PKKMB / Ospek", desc: "Disuruh botak atau kuncir pita? 'Siap Kak!' adalah kata kunci.", img: "https://placehold.co/600x400/4682B4/FFF?text=PKKMB", align: "right" },
        { sem: 1, type: 'card', title: "Kaget Kuliah", desc: "Dosen nggak ngejar tugas kayak guru SMA. Bebas tapi panik.", img: "https://placehold.co/600x400/5F9EA0/FFF?text=Culture+Shock", align: "left" },
        { sem: 1, type: 'card', title: "Target Ambis", desc: "IPK harus 4.00! Mau jadi Ketua BEM! Lulus 3.5 Tahun!", img: "https://placehold.co/600x400/FFD700/333?text=Ambis+Mode", align: "right" },
        { sem: 1, type: 'micro', text: "😢 Homesick: Rindu masakan Ibu", align: "center" },
        { sem: 1, type: 'card', title: "Cari Sirkel", desc: "Kenalan sana-sini, 'Bro lu jurusan apa? Kantin yuk.'", img: "https://placehold.co/600x400/20B2AA/FFF?text=Teman+Baru", align: "left" },
        { sem: 1, type: 'card', title: "Ujian Pertama", desc: "Belajar H-1 sistem SKS, ternyata soalnya esai semua.", img: "https://placehold.co/600x400/DC143C/FFF?text=UAS+Pertama", align: "center" },
        { sem: 1, type: 'fact', text: "Fun Fact: 1/3 Mahasiswa baru mengalami kecemasan (Culture Shock) karena adaptasi drastis.", source: "Frontiers in Public Health" },

        // --- SEMESTER 2: The Settler (1600 - 3200) ---
        // Visual: Biru Terang (Semangat)
        { sem: 2, type: 'card', title: "Matkul Peminatan", desc: "Mulai masuk materi jurusan. Wah ternyata asik juga!", img: "https://placehold.co/600x400/1E90FF/FFF?text=Matkul+Seru", align: "left" },
        { sem: 2, type: 'card', title: "Lifestyle Mahasiswa", desc: "Nongkrong di cafe modal WiFi gratisan biar kelihatan produktif.", img: "https://placehold.co/600x400/8A2BE2/FFF?text=Coffee+Shop", align: "right" },
        { sem: 2, type: 'card', title: "Aktif Ormawa", desc: "Rapat sampai malam, proker padat. Makin pede berpendapat.", img: "https://placehold.co/600x400/FF4500/FFF?text=Organisasi", align: "center" },
        { sem: 2, type: 'micro', text: "❤️ Cinlok sama teman kepanitiaan", align: "right" },
        { sem: 2, type: 'card', title: "Praktikum", desc: "Jas lab jangan dicuci biar kelihatan scientific dan pekerja keras.", img: "https://placehold.co/600x400/3CB371/FFF?text=Lab+Work", align: "left" },
        { sem: 2, type: 'card', title: "Salah Jurusan?", desc: "Kok susah ya? Apa ini beneran panggilanku?", img: "https://placehold.co/600x400/696969/FFF?text=Overthinking", align: "right" },
        { sem: 2, type: 'card', title: "Libur Panjang", desc: "Libur semester ganjil lama banget sampai lupa cara nulis.", img: "https://placehold.co/600x400/FFA500/FFF?text=Liburan", align: "center" },
        { sem: 2, type: 'fact', text: "Fun Fact: 87% Mahasiswa Indonesia pernah merasa salah jurusan.", source: "Indonesia Career Center Network" },

        // --- SEMESTER 3: Sophomore Slump (3200 - 4800) ---
        // Visual: Abu-abu/Mendung (Mulai jenuh)
        { sem: 3, type: 'card', title: "Resmi Kating", desc: "Maba minggir dulu, sepuh (padahal baru tingkat 2) mau lewat.", img: "https://placehold.co/600x400/708090/FFF?text=Seniority", align: "left" },
        { sem: 3, type: 'micro', text: "📄 Jualan Danus buat nambah uang jajan", align: "center" },
        { sem: 3, type: 'card', title: "Perang KRS", desc: "Telat semenit, server down, dapet kelas sisa jam 7 pagi.", img: "https://placehold.co/600x400/B22222/FFF?text=War+KRS", align: "right" },
        { sem: 3, type: 'card', title: "Dosen Favorit", desc: "Udah hafal mana dosen enak, mana yang 'Killer'.", img: "https://placehold.co/600x400/008080/FFF?text=Dosen+Idola", align: "left" },
        { sem: 3, type: 'card', title: "Bagi Info", desc: "Grup angkatan isinya share jawaban tugas... ups, referensi.", img: "https://placehold.co/600x400/4169E1/FFF?text=Sharing+is+Caring", align: "center" },
        { sem: 3, type: 'card', title: "Sibuk Agenda", desc: "Kuliah, Rapat, Nugas, Repeat. Wajah mulai kusam.", img: "https://placehold.co/600x400/8B4513/FFF?text=Hectic", align: "right" },
        { sem: 3, type: 'fact', text: "Fun Fact: 'Sophomore Slump' adalah penurunan motivasi drastis di tahun kedua kuliah.", source: "Psychology Research" },

        // --- SEMESTER 4: The Chaos (4800 - 6400) ---
        // Visual: Oranye/Merah (Intens)
        { sem: 4, type: 'card', title: "Event Hunter", desc: "Lomba sana sini, panitia konser. Gas terus selagi muda!", img: "https://placehold.co/600x400/FF8C00/FFF?text=Event+Organizer", align: "left" },
        { sem: 4, type: 'card', title: "Tugas Numpuk", desc: "SKS adalah jalan ninjaku. Kopi adalah air putihku.", img: "https://placehold.co/600x400/8B0000/FFF?text=Deadline", align: "right" },
        { sem: 4, type: 'card', title: "Jurnal Ilmiah", desc: "Mulai baca paper bahasa Inggris, pura-pura ngerti padahal translate.", img: "https://placehold.co/600x400/2F4F4F/FFF?text=Jurnal", align: "center" },
        { sem: 4, type: 'card', title: "Work Life Balance?", desc: "Apa itu tidur? Yang penting proker beres.", img: "https://placehold.co/600x400/483D8B/FFF?text=No+Sleep", align: "left" },
        { sem: 4, type: 'card', title: "KKN Dimulai", desc: "Dibuang ke desa antah berantah. 30 hari survive tanpa sinyal.", img: "https://placehold.co/600x400/556B2F/FFF?text=KKN+Desa", align: "center" },
        { sem: 4, type: 'micro', text: "👻 Uji Nyali di Posko KKN", align: "right" },
        { sem: 4, type: 'card', title: "Tamat KKN", desc: "Pengen rehat tapi besok udah masuk kuliah lagi. Capek!", img: "https://placehold.co/600x400/A0522D/FFF?text=Burnout", align: "left" },
        { sem: 4, type: 'fact', text: "Fun Fact: KKN terbukti meningkatkan soft-skill empati & problem solving.", source: "Jurnal Pengabdian Masyarakat" },

        // --- SEMESTER 5: The Hustler (6400 - 8000) ---
        // Visual: Ungu/Senja (Dewasa)
        { sem: 5, type: 'card', title: "Make Money Worth", desc: "Kuliah mahal, ilmu harus dapet. Mulai kritis sama dosen.", img: "https://placehold.co/600x400/9400D3/FFF?text=Critical+Thinking", align: "right" },
        { sem: 5, type: 'card', title: "Mikirin Duit", desc: "Ada gak ya aktivitas yang bisa jadi cuan? Mulai freelance.", img: "https://placehold.co/600x400/006400/FFF?text=Cuan+Hunter", align: "left" },
        { sem: 5, type: 'card', title: "Mulai Sepuh", desc: "Liat maba tingkahnya aneh-aneh. 'Dulu kita gitu gak sih?'", img: "https://placehold.co/600x400/778899/FFF?text=Sepuh+Moment", align: "center" },
        { sem: 5, type: 'micro', text: "👔 LinkedIn status: Open to Work", align: "left" },
        { sem: 5, type: 'fact', text: "Fun Fact: 7% Mahasiswa kuliah sambil bekerja/freelance.", source: "Data BPS" },

        // --- SEMESTER 6: Real World (8000 - 9600) ---
        // Visual: Biru Malam (Serius)
        { sem: 6, type: 'card', title: "Jalan Akademisi", desc: "Metodologi Penelitian (Metpen). Mulai pusing cari judul.", img: "https://placehold.co/600x400/000080/FFF?text=Metpen", align: "left" },
        { sem: 6, type: 'card', title: "Persiapan Magang", desc: "Apply ke 50 perusahaan, yang bales cuma 2. Itupun ditolak.", img: "https://placehold.co/600x400/2F4F4F/FFF?text=Internship", align: "right" },
        { sem: 6, type: 'card', title: "The Hustle", desc: "Pulang magang, ngerjain laporan, tidur 3 jam. Welcome to adulthood.", img: "https://placehold.co/600x400/191970/FFF?text=Corporate+Slave", align: "center" },
        { sem: 6, type: 'micro', text: "☕ Kopi bukan lagi hobi, tapi kebutuhan hidup", align: "right" },
        { sem: 6, type: 'fact', text: "Fun Fact: 60% Mahasiswa magang mendapat tawaran full-time di tempat yang sama.", source: "NACE Report" },

        // --- SEMESTER 7: The Void (9600 - 11200) ---
        // Visual: Merah Gelap/Hitam (Krisis)
        { sem: 7, type: 'card', title: "Mencari Judul", desc: "Dosen: 'Judulmu terlalu luas'. Revisi lagi, revisi lagi.", img: "https://placehold.co/600x400/800000/FFF?text=Skripsi+Starter+Pack", align: "left" },
        { sem: 7, type: 'card', title: "Laid Back", desc: "Ke kampus cuma buat bimbingan. Teman-teman mulai menghilang.", img: "https://placehold.co/600x400/36454F/FFF?text=Lonely", align: "right" },
        { sem: 7, type: 'card', title: "Jati Diri", desc: "Quarter Life Crisis. Teman udah nikah, aku masih Bab 1.", img: "https://placehold.co/600x400/000000/FFF?text=Quarter+Life+Crisis", align: "center" },
        { sem: 7, type: 'micro', text: "👻 Dospem Ghosting 2 minggu", align: "left" },
        { sem: 7, type: 'fact', text: "Fun Fact: Quarter Life Crisis paling sering menyerang usia 18-29 tahun.", source: "Psikostudia" },

        // --- SEMESTER 8: The Finale (11200 - 12800) ---
        // Visual: Emas/Putih (Harapan)
        { sem: 8, type: 'card', title: "Menyelesaikan TA", desc: "Begadang tiap malam demi ACC Sidang. Semangat terakhir!", img: "https://placehold.co/600x400/FFD700/333?text=Pejuang+Skripsi", align: "right" },
        { sem: 8, type: 'card', title: "Sidang Skripsi", desc: "Dibantai Penguji, kaki gemetar, tapi akhirnya 'LULUS'.", img: "https://placehold.co/600x400/B8860B/FFF?text=Sidang", align: "center" },
        { sem: 8, type: 'micro', text: "😭 Nangis haru pas keluar ruang sidang", align: "center" },
        { sem: 8, type: 'card', title: "Wisuda", desc: "Toga, foto keluarga, dan lempar topi. You did it!", img: "https://placehold.co/600x400/FFFFFF/333?text=Wisuda", align: "left" },
        { sem: 8, type: 'card', title: "New Chapter", desc: "Selamat tinggal KTM, selamat datang Kartu Pencari Kerja.", img: "https://placehold.co/600x400/F0F8FF/333?text=The+End?", align: "right" },
    ];

    // Konfigurasi Warna Background per Semester
    const bgColors = {
        1: "bg-sky-400",       // Cerah
        2: "bg-blue-500",      // Biru Langit
        3: "bg-gray-400",      // Mendung
        4: "bg-orange-600",    // Panas/Chaos
        5: "bg-purple-700",    // Senja/Dewasa
        6: "bg-blue-900",      // Malam/Kerja
        7: "bg-red-900",       // Void/Krisis
        8: "bg-yellow-100"     // Terang/Lulus (Pakai text-black nanti)
    };

    if (!container || !indicator) return;

    // --- 1. GENERATE POSISI & RENDER ---
    function renderItems() {
        // Offset awal (header intro)
        let currentScrollBase = 800; 

        timeline.forEach((item, index) => {
            // Hitung posisi vertikal berdasarkan semester dan urutan
            // Kita sebar item di dalam range semester tersebut
            
            // Random jitter biar gak kaku lurus banget
            const randomJitter = Math.floor(Math.random() * 100) - 50; 
            
            // Logic posisi: Base semester + increment per item
            // Misal sem 1 mulai di 0. Item 1 di 200, Item 2 di 400...
            const semesterStart = (item.sem - 1) * SEMESTER_HEIGHT;
            
            // Kita cari ada berapa item di semester ini untuk bagi rata jaraknya
            const itemsInSem = timeline.filter(t => t.sem === item.sem).length;
            const itemIndexInSem = timeline.filter(t => t.sem === item.sem).indexOf(item);
            
            // Jarak per item dalam semester
            const step = SEMESTER_HEIGHT / (itemsInSem + 1);
            
            const topPos = currentScrollBase + semesterStart + (itemIndexInSem * step) + step + randomJitter;

            const el = document.createElement('div');
            
            // ALIGNMENT CLASSES
            let justifyClass = 'justify-center';
            if (item.align === 'left') justifyClass = 'justify-start pl-4 md:pl-24';
            if (item.align === 'right') justifyClass = 'justify-end pr-4 md:pr-24';

            el.className = `absolute w-full flex ${justifyClass} pointer-events-auto px-4 z-10`;
            el.style.top = `${topPos}px`;

            // RENDER BERDASARKAN TIPE
            if (item.type === 'card') {
                el.innerHTML = `
                    <div class="float-card bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 w-48 md:w-80 border-4 border-white/30">
                        <div class="h-28 md:h-44 overflow-hidden bg-gray-200 relative">
                            <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div class="p-4 bg-white text-gray-800">
                            <h3 class="font-bold text-sm md:text-lg mb-1 leading-tight text-indigo-900">${item.title}</h3>
                            <p class="text-[10px] md:text-sm text-gray-600 leading-relaxed">${item.desc}</p>
                        </div>
                    </div>
                `;
            } else if (item.type === 'fact') {
                el.innerHTML = `
                    <div class="max-w-md bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-r shadow-lg transform rotate-1 hover:rotate-0 transition-transform">
                        <p class="font-bold text-xs md:text-sm uppercase tracking-wider mb-1">💡 DID YOU KNOW?</p>
                        <p class="text-xs md:text-base font-medium italic">"${item.text}"</p>
                        <p class="text-[10px] text-yellow-700 mt-2 text-right">- ${item.source}</p>
                    </div>
                `;
            } else if (item.type === 'micro') {
                el.innerHTML = `
                    <div class="float-card-delayed bg-white/20 backdrop-blur-md border border-white/40 px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold shadow-sm hover:bg-white/30 transition-colors cursor-default">
                        ${item.text}
                    </div>
                `;
            }
    
            container.appendChild(el);
        });
    }

    renderItems();

    // --- 2. LOGIC SCROLL & BACKGROUND CHANGE ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Hitung Semester Saat Ini
        // Kita kurangi offset header (800) biar pas masuk konten baru ganti
        const adjustedScroll = Math.max(0, scrollY - 600);
        let currentSem = Math.floor(adjustedScroll / SEMESTER_HEIGHT) + 1;
        
        if (currentSem < 1) currentSem = 1;
        if (currentSem > 8) currentSem = 8;
        
        // Update Text
        if (scrollY < 13000) { // Belum tamat
             indicator.innerText = `Semester ${currentSem}`;
        } else {
             indicator.innerText = "LULUS 🎓";
        }

        // Update Background Color
        const newTheme = bgColors[currentSem] || "bg-black";
        
        // Reset class warna lama, pasang yang baru
        // Kita pakai regex simpel atau replace manual
        bgLayer.className = `fixed inset-0 z-0 bg-cover bg-center transition-colors duration-1000 ${newTheme}`;

        // Khusus Semester 8 (Lulus/Terang), ubah text body jadi hitam biar kebaca
        if (currentSem === 8) {
            document.body.classList.remove('text-white');
            document.body.classList.add('text-gray-900');
            indicator.parentElement.classList.replace('text-white', 'text-gray-900');
            indicator.parentElement.classList.replace('border-white/10', 'border-black/10');
        } else {
            document.body.classList.add('text-white');
            document.body.classList.remove('text-gray-900');
            indicator.parentElement.classList.replace('text-gray-900', 'text-white');
            indicator.parentElement.classList.replace('border-black/10', 'border-white/10');
        }
    });
});