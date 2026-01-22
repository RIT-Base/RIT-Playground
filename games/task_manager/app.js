let applications = [];

// applications max ram usages.
// iniitial start usage randomized < 50% max ram usage.
// then ram usage increase as its stays.

applications['Visual Studio Code'] = 850;
applications['Google Chrome'] = 1459;
applications['Google Drive'] = 521;
applications['Spotify'] = 50;
applications['Whatsapp'] = 1200;
applications['Microsoft Office'] = 768;
applications['Adobe Photoshop'] = 2120;
applications['Adobe Premiere'] = 5013;
applications['Notion'] = 341;
applications['Discord'] = 672;
applications['Explorer'] = 214;

// add more process later above if needed.

// ram capacity = 16GB. == 16384 MB.
// game over when ram exceed capacity limit.

// the kill function is the default behavior with 2 second delay, will add random variation,
// like captcha, ads, and so on to make killing tasks take more time.

// To-do
// [ ] will add suspend function for game mechanic (ability to halven process ram usage for 5 second).
// [X] dynamic status, 25-50% maxMem = Running; 70-80% maxMem = High Memory; [ ] 85-100 risk counter ++
// risk counter add more chance for not responding status.
// [ ] add game timer later. 3 minute -+
// [X] not responding game mechanics 
// (or maybe in seperate script for a global timer across different games.)

// [+] task type mechanic.

// reusable variables
const modal = document.createElement('div');
modal.className = 'bg-white p-6 rounded-lg shadow-xl flex flex-col items-center';

const overlay = document.createElement('div');

const KILL_EVENTS = [
    { name: 'standard', weight: 40 }, // Most common
    { name: 'captcha',  weight: 25 },
    { name: 'ads',      weight: 20 },
    { name: 'lag',      weight: 15 }  // Rarest
];

function kill(id) {
    const totalWeight = KILL_EVENTS.reduce((sum, event) => sum + event.weight, 0);
    
    let random = Math.random() * totalWeight;
    
    let selectedEvent = 'standard';
    for (const event of KILL_EVENTS) {
        if (random < event.weight) {
            selectedEvent = event.name;
            break;
        }
        random -= event.weight;
    }

    overlay.className = 'fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50';

    switch (selectedEvent) {
        case 'captcha':
            document.body.appendChild(overlay);
            events['captcha'](id);
            break;
        case 'ads':
            document.body.appendChild(overlay);
            events['ads'](id);
            break;
        case 'lag':
            events['not_responding']();
            break;
        default:
            executeKill(id);
            break;
    }
}

function executeKill(id) {
    overlay.className = 'fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50';
    modal.innerHTML = `
    <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p class="mt-4 text-gray-700 font-medium">Killing Task...</p>
    `;

    if (!overlay.parentNode) document.body.appendChild(overlay);
    overlay.appendChild(modal);

    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.remove();
        activeProcesses = activeProcesses.filter(p => p.id !== id);
        updateProcess();
        closeEvent();
    }, 2000);
}

// fun stuff here
const events = {
    ads: (id) => {
        modal.innerHTML = `
        <div class="flex justify-between w-full mb-4">
            <span class="text-xs font-bold text-gray-400">SPONSORED AD</span>
            <button onclick="closeEvent()" class="text-red-500 hover:bg-red-100 px-2 rounded">X</button>
        </div>
        <div class="py-8 text-center">
            <p class="text-xl font-bold text-blue-600">DOWNLOAD MORE RAM!</p>
            <button onclick="executeKill('${id}')" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Click here</button>
        </div>
        `;
        overlay.appendChild(modal);
    },
    captcha: (id) => {
        const codes = ['X9faBa', 'B901aL', 'PF0hfo', 'KLaks9', '98f2Hj'];
        const target_code = codes[Math.floor(Math.random() * codes.length)];
        modal.innerHTML = `
        <p class="mb-2 text-gray-600 text-sm">Confirm you are human: </p>
        <h2 class="text-2xl text-black font-mono font-bold mb-b tracking-widest">${target_code}</h2>
        <input type="text" id="cap-input" class="text-gray-400 border-2 border-gray-300 p-2 rounded focus:border-blue-500 outline-none">
        `;
        overlay.appendChild(modal);

        const input = document.getElementById("cap-input");
        input.focus();
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (e.target.value === target_code) {
                    executeKill(id); // Trigger standard kill after success
                } else {
                    e.target.classList.add('border-red-500');
                    e.target.value = "";
                }
            }   
        });
    },
    not_responding: () => {
        overlay.className = 'fixed inset-0 flex items-center justify-center bg-white/50 z-50';
        document.body.style.cursor = 'wait';
        document.body.appendChild(overlay);

        setTimeout(() => {
            document.body.style.cursor = 'default';
            overlay.remove();
        }, 3000);
    }
}

function closeEvent() {
    modal.remove();
    overlay.remove();
}

// mechanics 
function suspend() {
    // ability to halven ram usage by 5s (cooldown 7s)
    // write later
}

function test() {
    overlay.className = 'fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50';
    document.body.appendChild(overlay);
    events['not_responding']();
}
// using math.random to randomize spawn event around 6s~ to 4s frequency.
// the process ram itself start small as stated above, but grows in time. 

// array to store and manage generated processes.
let activeProcesses = [];
let processIdCounter = 0;

function spawn() {
    // randomize app and initial memory
    const list = Object.entries(applications);
    const [appName, maxMem] = list[Math.floor(Math.random() * list.length)];

    const initialMem = Math.floor(Math.random() * (maxMem / 2));
    const processId = `process-${processIdCounter++}`;

    const processObj = {
        id: processId,
        name: appName,
        currentMem: initialMem,
        maxMem: maxMem,
        growthRate: Math.random() * 15 + 5 
    };

    activeProcesses.push(processObj)

    // spawn process in the task manager
    const target = document.getElementById('task-manager');
    const createprocess = document.createElement('div');
    createprocess.id = processId;

    createprocess.innerHTML = `
    <div id="task" class="grid grid-cols-12 px-4 py-3 border-b border-gray-700 hover:bg-gray-750 transition-colors items-center">
        <div class="col-span-6 flex items-center gap-3">
        <div id="status-circle" class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="font-medium">${appName}</span>
        </div>
        <div id="status" class="col-span-2 text-right text-sm text-green-400">Running</div>
        <div id="mem" class="col-span-2 text-right text-sm font-mono text-gray-300">${initialMem.toLocaleString()} MB</div>
        <div class="col-span-2 text-right">
            <button onclick="kill('${processId}')" class="bg-red-900/30 text-red-400 border border-red-800/50 px-3 py-1 rounded text-xs hover:bg-red-600 hover:text-white transition-all">Kill Task</button>
        </div>
    </div>
    `;

    target.appendChild(createprocess);

    updateProcess();
};

// helper func for total processs display
function updateProcess() {
    const total_proc = document.getElementById('total-proc');
    total_proc.innerText = `Process: ${activeProcesses.length}`;
} 

// dynamic memory update
function updateMemory() {
    let totalSystemRam = 0;

    activeProcesses.forEach(proc => {
        if (proc.currentMem < proc.maxMem) {
            proc.currentMem += proc.growthRate;
            if (proc.currentMem > proc.maxMem) proc.currentMem = proc.maxMem;
        }

        const status = document.getElementById('status');
        const status_circle = document.getElementById('status-circle');
        if (proc.currentMem >= proc.maxMem * 0.7) {
            status.innerText = 'High Memory'
            status.className = 'col-span-2 text-right text-sm text-yellow-400'
            status_circle.className = 'w-2 h-2 rounded-full bg-yellow-500'
        }

        const element = document.getElementById(proc.id);
        if (element) {
            element.querySelector('#mem').innerText = `${Math.floor(proc.currentMem).toLocaleString()} MB`;
        }

        totalSystemRam += proc.currentMem;
    });

    const ramUsageEl = document.getElementById('total-ram');
    if (ramUsageEl) {
        ramUsageEl.innerText = `${Math.floor(totalSystemRam)} / 16384 MB`;
    }

    if (totalSystemRam > 16384) {
        alert("System Crash!!");
        location.reload();
    } 
}

// for game start function later
// setInterval(spawn, 6000);
// setInterval(updateMemory, 2000);

function startGame() {
    play = document.getElementById('start-game');
    play.remove();
    spawn();
    setInterval(spawn, 6000);
    setInterval(updateMemory, 2000);
}