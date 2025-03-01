// Function to fetch data from Google Apps Script
async function fetchDataFromGoogleSheet() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyNFi1UcMkIHtSyXY4057dyJ32BxQutpJlmbVVZyTdvkKsCPuAN87F7qrhqpyn0PO00iw/exec');
        const data = await response.json();
        return data.map(row => ({
            row: parseInt(row[0]) || 0,
            col: parseInt(row[1]) || 0,
            survivors: parseInt(row[2]) || 0
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Initialize the 10x10 grid
function initializeGrid() {
    const gridMap = document.getElementById('gridMap');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            gridMap.appendChild(cell);
        }
    }
}

// Update the grid with data from the sheet
async function updateGridWithSheetData(sheetData) {
    const cells = document.querySelectorAll('.grid-cell');
    const drones = {};

    // Clear existing markers
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.backgroundColor = '#98ff98'; // Reset to default green
    });

    // Process sheet data to find drone locations and survivor counts
    sheetData.forEach(({ row, col, survivors }) => {
        if (row >= 0 && row < 10 && col >= 0 && col < 10 && survivors > 0) {
            const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.innerHTML = `<span class="person-count">${survivors}</span>`;
                cell.style.backgroundColor = '#ff4500'; // Highlight cell with survivors (red)

                // Assume the first entry is for Drone 1, second for Drone 2 (simplified logic)
                if (!drones[1]) {
                    drones[1] = { row, col };
                } else if (!drones[2]) {
                    drones[2] = { row, col };
                }
            }
        }
    });

    // Update drone locations in the grid and status
    Object.entries(drones).forEach(([id, location]) => {
        const droneId = parseInt(id);
        const cell = document.querySelector(`.grid-cell[data-row="${location.row}"][data-col="${location.col}"]`);
        if (cell) {
            if (droneId === 1) {
                cell.style.backgroundColor = '#ff4500'; // Red for Drone 1
                cell.innerHTML += `<span class="drone-label drone1-label">D1 loc</span>`; // Add "D1 loc" in red
                document.getElementById('drone1Location').textContent = `${location.row},${location.col}`;
            } else if (droneId === 2) {
                cell.style.backgroundColor = '#9370db'; // Purple for Drone 2
                cell.innerHTML += `<span class="drone-label drone2-label">D2 loc</span>`; // Add "D2 loc" in purple
                document.getElementById('drone2Location').textContent = `${location.row},${location.col}`;
            }
        }
    });
}

// Load data and update the grid periodically
document.addEventListener('DOMContentLoaded', () => {
    initializeGrid();
    updateGridPeriodically();
});

async function updateGridPeriodically() {
    while (true) {
        try {
            const data = await fetchDataFromGoogleSheet();
            updateGridWithSheetData(data);
        } catch (error) {
            console.error('Error updating grid:', error);
        }
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds for updates
    }
}

// Add event listeners for buttons (for demo, just log clicks)
document.getElementById('mapBtn').addEventListener('click', () => console.log('Map clicked'));
document.getElementById('coordinateBtn').addEventListener('click', () => console.log('Coordinate clicked'));
document.getElementById('manualModeBtn').addEventListener('click', () => console.log('Manual Mode clicked'));
document.getElementById('autoModeBtn').addEventListener('click', () => console.log('Auto Mode clicked'));
document.getElementById('manualTakeoffBtn').addEventListener('click', () => console.log('Manual Takeoff clicked'));
document.getElementById('manualLandBtn').addEventListener('click', () => console.log('Manual Land clicked'));