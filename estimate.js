/* ============================================
   BUILDEASY — Material Estimation & AI Analyzer
   ============================================ */

/* -------- MANUAL MATERIAL ESTIMATION -------- */
function calculateEstimation() {
    const length = parseFloat(document.getElementById('estLength').value);
    const width = parseFloat(document.getElementById('estWidth').value);
    const height = parseFloat(document.getElementById('estHeight').value) || 3;
    const stage = document.getElementById('estStage').value;
    const type = document.getElementById('estType').value;

    if (!length || !width) {
        alert('Please enter length and width.');
        return;
    }

    const area = length * width;
    const volume = area * height;
    const perimeter = 2 * (length + width);
    const wallArea = perimeter * height;
    const multiplier = type === 'premium' ? 1.3 : 1;

    let materials = [];

    switch (stage) {
        case 'foundation':
            materials = [
                { icon: '🧱', cls: 'cement', name: 'Cement', qty: (volume * 0.22 * multiplier).toFixed(1) + ' bags', note: 'OPC 53 Grade' },
                { icon: '🏖️', cls: 'sand', name: 'Sand', qty: (volume * 0.015 * multiplier).toFixed(2) + ' tons', note: 'River / M-Sand' },
                { icon: '🪨', cls: 'aggregate', name: 'Aggregate', qty: (volume * 0.03 * multiplier).toFixed(2) + ' tons', note: '20mm Crushed Stone' },
                { icon: '🔩', cls: 'steel', name: 'Steel', qty: (area * 3.2 * multiplier).toFixed(1) + ' kg', note: 'TMT Fe-500D' },
                { icon: '💧', cls: 'water', name: 'Water', qty: (volume * 30 * multiplier).toFixed(0) + ' litres', note: 'Clean potable water' },
                { icon: '🧱', cls: 'bricks', name: 'Bricks', qty: '—', note: 'Not needed at this stage' },
            ];
            break;
        case 'brickwork':
            materials = [
                { icon: '🧱', cls: 'bricks', name: 'Bricks', qty: (wallArea * 48 * multiplier).toFixed(0) + ' pcs', note: 'Standard red bricks' },
                { icon: '🧱', cls: 'cement', name: 'Cement', qty: (wallArea * 0.3 * multiplier).toFixed(1) + ' bags', note: 'PPC / OPC' },
                { icon: '🏖️', cls: 'sand', name: 'Sand', qty: (wallArea * 0.012 * multiplier).toFixed(2) + ' tons', note: 'Coarse Sand' },
                { icon: '💧', cls: 'water', name: 'Water', qty: (wallArea * 22 * multiplier).toFixed(0) + ' litres', note: 'For mortar mixing' },
                { icon: '🔩', cls: 'steel', name: 'Steel', qty: (wallArea * 0.5 * multiplier).toFixed(1) + ' kg', note: 'Lintel bars' },
                { icon: '🪨', cls: 'aggregate', name: 'Aggregate', qty: '—', note: 'Minimal at this stage' },
            ];
            break;
        case 'roofing':
            materials = [
                { icon: '🧱', cls: 'cement', name: 'Cement', qty: (area * 0.45 * multiplier).toFixed(1) + ' bags', note: 'OPC 53 Grade' },
                { icon: '🔩', cls: 'steel', name: 'Steel', qty: (area * 4.5 * multiplier).toFixed(1) + ' kg', note: 'TMT 10mm & 12mm' },
                { icon: '🏖️', cls: 'sand', name: 'Sand', qty: (area * 0.02 * multiplier).toFixed(2) + ' tons', note: 'Coarse Sand' },
                { icon: '🪨', cls: 'aggregate', name: 'Aggregate', qty: (area * 0.04 * multiplier).toFixed(2) + ' tons', note: '12mm & 20mm Jelly' },
                { icon: '💧', cls: 'water', name: 'Water', qty: (area * 35 * multiplier).toFixed(0) + ' litres', note: 'Curing water' },
                { icon: '🧱', cls: 'bricks', name: 'Shuttering', qty: (area * 1.1).toFixed(1) + ' sqft', note: 'Plywood sheets' },
            ];
            break;
        case 'plastering':
            materials = [
                { icon: '🧱', cls: 'cement', name: 'Cement', qty: (wallArea * 0.18 * multiplier).toFixed(1) + ' bags', note: 'PPC Cement' },
                { icon: '🏖️', cls: 'sand', name: 'Sand', qty: (wallArea * 0.01 * multiplier).toFixed(2) + ' tons', note: 'Fine Plastering Sand' },
                { icon: '💧', cls: 'water', name: 'Water', qty: (wallArea * 18 * multiplier).toFixed(0) + ' litres', note: 'For curing' },
                { icon: '🪨', cls: 'aggregate', name: 'POP/Putty', qty: (wallArea * 0.08 * multiplier).toFixed(1) + ' kg', note: 'Wall putty' },
                { icon: '🔩', cls: 'steel', name: 'Chicken Mesh', qty: (wallArea * 0.1).toFixed(1) + ' sqm', note: 'For crack prevention' },
                { icon: '🧱', cls: 'bricks', name: 'Primer', qty: (wallArea * 0.1).toFixed(1) + ' litres', note: 'White cement primer' },
            ];
            break;
        case 'finishing':
            materials = [
                { icon: '🎨', cls: 'cement', name: 'Paint', qty: (wallArea * 0.14 * multiplier).toFixed(1) + ' litres', note: 'Interior emulsion' },
                { icon: '🧱', cls: 'bricks', name: 'Tiles', qty: (area * 1.05 * multiplier).toFixed(1) + ' sqft', note: 'Vitrified / Ceramic' },
                { icon: '🧱', cls: 'sand', name: 'Tile Adhesive', qty: (area * 0.2 * multiplier).toFixed(1) + ' kg', note: 'For tile fixing' },
                { icon: '🪨', cls: 'aggregate', name: 'Putty', qty: (wallArea * 0.12 * multiplier).toFixed(1) + ' kg', note: 'Final wall putty' },
                { icon: '💧', cls: 'water', name: 'Primer', qty: (wallArea * 0.08 * multiplier).toFixed(1) + ' litres', note: 'Exterior + Interior' },
                { icon: '🔩', cls: 'steel', name: 'Hardware', qty: '1 set', note: 'Door handles, hinges' },
            ];
            break;
    }

    const grid = document.getElementById('resultGrid');
    grid.innerHTML = materials.map(m => `
        <div class="result-item">
            <div class="r-icon ${m.cls}">${m.icon}</div>
            <div class="r-data">
                <h4>${m.name}: ${m.qty}</h4>
                <p>${m.note}</p>
            </div>
        </div>
    `).join('');

    const panel = document.getElementById('manualResult');
    panel.classList.add('visible');

    // Update progress
    setProgress(3);
}

/* -------- PROGRESS STEPPER -------- */
function setProgress(step) {
    for (let i = 1; i <= 4; i++) {
        const ps = document.getElementById('ps' + i);
        const pc = document.getElementById('pc' + i);
        ps.classList.remove('active', 'done');
        if (pc) pc.classList.remove('active');

        if (i < step) {
            ps.classList.add('done');
            if (pc) pc.classList.add('active');
        } else if (i === step) {
            ps.classList.add('active');
            if (pc) pc.classList.add('active');
        }
    }
}

/* -------- DRAG & DROP + FILE UPLOAD -------- */
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewImg = document.getElementById('previewImg');
    const analyzeBtn = document.getElementById('analyzeBtn');

    if (!dropZone) return;

    ['dragover', 'dragenter'].forEach(evt => {
        dropZone.addEventListener(evt, e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, () => dropZone.classList.remove('dragover'));
    });

    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) handleFile(file);
    });

    dropZone.addEventListener('click', e => {
        if (e.target.tagName !== 'SPAN') fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) handleFile(fileInput.files[0]);
    });

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = e => {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            analyzeBtn.disabled = false;
            // Hide the text prompts
            dropZone.querySelector('.drop-icon').style.display = 'none';
            dropZone.querySelector('h3').style.display = 'none';
            dropZone.querySelectorAll('p').forEach(p => p.style.display = 'none');
            setProgress(2);
        };
        reader.readAsDataURL(file);
    }

    // Listen for manual input changes to update progress
    ['estLength', 'estWidth', 'estHeight'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => setProgress(1));
    });
});

/* -------- AI IMAGE ANALYSIS (Simulated) -------- */
const stageData = {
    foundation: {
        label: '🏗️ Foundation Stage',
        confidence: 94,
        materials: [
            { icon: '🧱', name: 'Cement (OPC 53)', note: '~220 bags needed', tag: 'Essential' },
            { icon: '🔩', name: 'TMT Steel 12mm', note: '~850 kg for rebar', tag: 'Critical' },
            { icon: '🏖️', name: 'River Sand', note: '~3.5 tons', tag: 'Required' },
            { icon: '🪨', name: 'Aggregate 20mm', note: '~5 tons crushed stone', tag: 'Required' },
        ]
    },
    brickwork: {
        label: '🧱 Brickwork Stage',
        confidence: 89,
        materials: [
            { icon: '🧱', name: 'Red Bricks', note: '~12,000 pieces', tag: 'Essential' },
            { icon: '🧱', name: 'Cement (PPC)', note: '~180 bags', tag: 'Critical' },
            { icon: '🏖️', name: 'Coarse Sand', note: '~2.8 tons for mortar', tag: 'Required' },
            { icon: '🔩', name: 'Lintel Steel', note: '~120 kg TMT 10mm', tag: 'Important' },
        ]
    },
    roofing: {
        label: '🏠 Roofing Stage',
        confidence: 91,
        materials: [
            { icon: '🔩', name: 'TMT Steel Mix', note: '~1200 kg (10mm + 12mm)', tag: 'Critical' },
            { icon: '🧱', name: 'Cement (OPC 53)', note: '~280 bags', tag: 'Essential' },
            { icon: '🪨', name: 'Jelly 12mm & 20mm', note: '~6.5 tons', tag: 'Required' },
            { icon: '🪵', name: 'Shuttering Ply', note: '~45 sheets', tag: 'Required' },
        ]
    },
    plastering: {
        label: '🪣 Plastering Stage',
        confidence: 87,
        materials: [
            { icon: '🧱', name: 'PPC Cement', note: '~150 bags', tag: 'Essential' },
            { icon: '🏖️', name: 'Fine Sand', note: '~2.2 tons', tag: 'Required' },
            { icon: '🪨', name: 'Wall Putty', note: '~200 kg', tag: 'Important' },
            { icon: '🎨', name: 'Primer', note: '~35 litres', tag: 'Next Step' },
        ]
    },
    finishing: {
        label: '✨ Finishing Stage',
        confidence: 85,
        materials: [
            { icon: '🎨', name: 'Emulsion Paint', note: '~60 litres int + ext', tag: 'Essential' },
            { icon: '🧱', name: 'Vitrified Tiles', note: '~1200 sqft', tag: 'Required' },
            { icon: '🪵', name: 'Door Frames', note: '~8 frames teak wood', tag: 'Important' },
            { icon: '🔩', name: 'Electrical & Plumbing', note: 'Full set', tag: 'Critical' },
        ]
    }
};

function analyzeImage() {
    const scanOverlay = document.getElementById('scanOverlay');
    const aiResult = document.getElementById('aiResult');
    const analyzeBtn = document.getElementById('analyzeBtn');

    // Show scanning animation
    scanOverlay.classList.add('active');
    analyzeBtn.disabled = true;
    aiResult.classList.remove('visible');

    // Simulate AI processing (2.5 seconds)
    setTimeout(() => {
        scanOverlay.classList.remove('active');

        // Randomly pick a stage for demo purposes
        const stages = Object.keys(stageData);
        const picked = stages[Math.floor(Math.random() * stages.length)];
        const data = stageData[picked];

        // Render stage badge
        document.getElementById('stageBadge').textContent = data.label;

        // Animate confidence bar
        document.getElementById('confValue').textContent = data.confidence + '%';
        setTimeout(() => {
            document.getElementById('confFill').style.width = data.confidence + '%';
        }, 100);

        // Render recommended materials
        const recGrid = document.getElementById('recGrid');
        recGrid.innerHTML = data.materials.map(m => `
            <div class="rec-card">
                <div class="rec-icon">${m.icon}</div>
                <div class="rec-info">
                    <h5>${m.name}</h5>
                    <p>${m.note}</p>
                </div>
                <div class="rec-tag">${m.tag}</div>
            </div>
        `).join('');

        aiResult.classList.add('visible');
        analyzeBtn.disabled = false;
        setProgress(3);
    }, 2500);
}
