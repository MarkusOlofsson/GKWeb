let catches = JSON.parse(localStorage.getItem('catches')) || [];

document.getElementById('catchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fisherman = document.getElementById('fisherman').value;
    const fish = document.getElementById('fish').value;
    const length = parseInt(document.getElementById('length').value);
    const date = new Date().toLocaleDateString();

    catches.push({ fisherman, fish, length, date });
    localStorage.setItem('catches', JSON.stringify(catches));

    updateProgressBars();
    updateTop3Lists();
    updateHistory();
    this.reset();
});

function updateProgressBars() {
    const fishermen = ['Markus', 'Max', 'Lasse'];
    let firstTo1000Abborre = null;

    fishermen.forEach(fisherman => {
        const totalLengthAbborre = catches
            .filter(c => c.fisherman === fisherman && c.fish === 'Abborre')
            .reduce((sum, fishingRecord) => sum + fishingRecord.length, 0);
        
        const totalLengthGadda = catches
            .filter(c => c.fisherman === fisherman && c.fish === 'Gädda')
            .reduce((sum, fishingRecord) => sum + fishingRecord.length, 0);
        
        const progressAbborre = (totalLengthAbborre / 1000) * 100;
        const progressGadda = (totalLengthGadda / 1500) * 100;

        document.getElementById(`progress${fisherman}Abborre`).style.width = `${Math.min(progressAbborre, 100)}%`;
        document.getElementById(`progressText${fisherman}Abborre`).textContent = `${totalLengthAbborre} / 1000 cm Abborre`;

        document.getElementById(`progress${fisherman}Gadda`).style.width = `${Math.min(progressGadda, 100)}%`;
        document.getElementById(`progressText${fisherman}Gadda`).textContent = `${totalLengthGadda} / 1500 cm Gädda`;

        
    });
}

function updateTop3Lists() {
    const abborrar = catches
        .filter(c => c.fish === 'Abborre')
        .sort((a, b) => b.length - a.length)
        .slice(0, 3);
    
    const abborreList = document.getElementById('top3Abborre');
    abborreList.innerHTML = abborrar
        .map(fishingRecord => `<li>${fishingRecord.length}cm - ${fishingRecord.fisherman} (${fishingRecord.date})</li>`)
        .join('');

    const gaddor = catches
        .filter(c => c.fish === 'Gädda')
        .sort((a, b) => b.length - a.length)
        .slice(0, 3);
    
    const gaddaList = document.getElementById('top3Gadda');
    gaddaList.innerHTML = gaddor
        .map(fishingRecord => `<li>${fishingRecord.length}cm - ${fishingRecord.fisherman} (${fishingRecord.date})</li>`)
        .join('');
}

function updateHistory() {
    const historyDiv = document.getElementById('catchHistory');
    historyDiv.innerHTML = '';

    const fishermen = ['Markus', 'Max', 'Lasse'];
    
    fishermen.forEach(fisherman => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${fisherman}</h3>`;
        
        const fishermanCatches = catches.filter(c => c.fisherman === fisherman);
        if (fishermanCatches.length > 0) {
            const ul = document.createElement('ul');
            ul.style.listStyle = 'none';
            ul.style.padding = '0';
            
            fishermanCatches.forEach((fishingRecord, index) => {
                const li = document.createElement('li');
                li.className = 'catch-item';
                li.innerHTML = `
                    ${fishingRecord.fish} - ${fishingRecord.length}cm (${fishingRecord.date})
                    <button class="delete-btn" onclick="deleteCatch(${catches.indexOf(fishingRecord)})">Ta bort</button>
                `;
                ul.appendChild(li);
            });
            div.appendChild(ul);
        }
        historyDiv.appendChild(div);
    });
}

function deleteCatch(index) {
    catches.splice(index, 1);
    localStorage.setItem('catches', JSON.stringify(catches));
    updateProgressBars();
    updateTop3Lists();
    updateHistory();
}

// Ladda historik när sidan laddas
updateProgressBars();
updateTop3Lists();
updateHistory(); 