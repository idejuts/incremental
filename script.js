// script.js

const gameState = {
    score: 0,
    lastUpdateTimestamp: Math.floor(Date.now() / 1000),
    clickValue: 1,
    upgradeCost: 10,
    autoUpgradeCost: 100,
    autoSuperUpgradeCost: 1000,
    incomeRate: 0,
    incomeSuperRate: 0,
    autoUpgradeEnabled: false,
    autoSuperUpgradeEnabled: false
};

const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const buyUpgradeButton = document.getElementById('buyUpgrade');
const upgradeCostDisplay = document.getElementById('upgradeCost');
const resetButton = document.getElementById('resetButton');
const autoUpgradeContainer = document.getElementById('autoUpgradeContainer');
const autoSuperUpgradeContainer = document.getElementById('autoSuperUpgradeContainer');
const incomeRateDisplay = document.getElementById('incomeRate');
const incomeSuperRateDisplay = document.getElementById('incomeSuperRate');
const buyAutoUpgradeButton = document.getElementById('buyAutoUpgrade');
const autoUpgradeCostDisplay = document.getElementById('autoUpgradeCost');
const buyAutoSuperUpgradeButton = document.getElementById('buyAutoSuperUpgrade');
const autoSuperUpgradeCostDisplay = document.getElementById('autoSuperUpgradeCost');


clickButton.addEventListener('click', () => {
    gameState.score += gameState.clickValue;
    updateScoreDisplay();
    checkAutoUpgradeAvailability();
    checkAutoSuperUpgradeAvailability();
});

buyUpgradeButton.addEventListener('click', () => {
    if (gameState.score >= gameState.upgradeCost) {
        gameState.score -= gameState.upgradeCost;
        gameState.clickValue *= 2;
        gameState.upgradeCost *= 2;
        updateScoreDisplay();
        updateUpgradeCostDisplay();
        checkAutoUpgradeAvailability();
    }
});

buyAutoUpgradeButton.addEventListener('click', () => {
    if (gameState.score >= gameState.autoUpgradeCost) {
        gameState.score -= gameState.autoUpgradeCost;
        gameState.incomeRate += 5;
        gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.2); // Round the cost
        updateScoreDisplay();
        updateIncomeRateDisplay();
        updateAutoUpgradeCostDisplay(); // Update the display
    }
});


buyAutoSuperUpgradeButton.addEventListener('click', () => {
    if (gameState.score >= gameState.autoSuperUpgradeCost) {
        gameState.score -= gameState.autoSuperUpgradeCost;
        gameState.incomeSuperRate += 15;  // Increase super automatic income rate by 5
        gameState.autoSuperUpgradeCost = Math.round(gameState.autoSuperUpgradeCost * 1.2);
        updateScoreDisplay();
        updateIncomeSuperRateDisplay();
        updateAutoSuperUpgradeCostDisplay();
    }
});



resetButton.addEventListener('click', () => {
    resetGame();
});

function updateScoreDisplay() {
    scoreDisplay.textContent = gameState.score;
}

function updateUpgradeCostDisplay() {
    upgradeCostDisplay.textContent = gameState.upgradeCost;
}

function updateIncomeRateDisplay() {
    incomeRateDisplay.textContent = gameState.incomeRate;
}

function updateIncomeSuperRateDisplay() {
    incomeSuperRateDisplay.textContent = gameState.incomeSuperRate;
}



function updateAutoUpgradeCostDisplay() {
    autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost;
}


function updateAutoSuperUpgradeCostDisplay() {
    autoSuperUpgradeCostDisplay.textContent = gameState.autoSuperUpgradeCost;
}

function checkAutoSuperUpgradeAvailability() {
    if (gameState.score >= 1000 && !gameState.autoSuperUpgradeEnabled) {
        gameState.autoSuperUpgradeEnabled = true;
        autoSuperUpgradeContainer.style.display = 'block';
        updateAutoSuperUpgradeCostDisplay();  // Update the super upgrade cost display
    }
}

function checkAutoUpgradeAvailability() {
    if (gameState.score >= 100 && !gameState.autoUpgradeEnabled) {
        gameState.autoUpgradeEnabled = true;
        autoUpgradeContainer.style.display = 'block';
    }
}



function saveGame() {
    localStorage.setItem('incrementalGameSave', JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem('incrementalGameSave');
    if (savedGame) {
        Object.assign(gameState, JSON.parse(savedGame));
        updateScoreDisplay();
        updateUpgradeCostDisplay();
        updateIncomeRateDisplay();
        updateIncomeSuperRateDisplay();
        checkAutoUpgradeAvailability();
        updateAutoUpgradeCostDisplay();
        checkAutoSuperUpgradeAvailability();
        updateAutoSuperUpgradeCostDisplay();


        // Show/hide auto-upgrade container based on the loaded game state
        if (gameState.autoUpgradeEnabled) {
            autoUpgradeContainer.style.display = 'block';
        }
        if (gameState.autoSuperUpgradeEnabled) {
            autoSuperUpgradeContainer.style.display = 'block';
        }
    }
}

function resetGame() {
    localStorage.removeItem('incrementalGameSave');
    gameState.score = 0;
    gameState.clickValue = 1;
    gameState.upgradeCost = 10;
    gameState.autoUpgradeCost = 100;
    gameState.autoSuperUpgradeCost = 1000;
    gameState.incomeRate = 0;
    gameState.incomeSuperRate = 0;
    gameState.autoUpgradeEnabled = false;
    gameState.autoSuperUpgradeEnabled = false;
    updateScoreDisplay();
    updateUpgradeCostDisplay();
    updateIncomeRateDisplay();
    updateIncomeSuperRateDisplay();
    updateAutoUpgradeCostDisplay(); 
    updateAutoSuperUpgradeCostDisplay(); 
    
    // Hide auto-upgrade container on reset
    autoUpgradeContainer.style.display = 'none';

    checkAutoUpgradeAvailability();

    autoSuperUpgradeContainer.style.display = 'none';

    checkAutoSuperUpgradeAvailability();
}

function startResourceGeneration() {
    setInterval(() => {
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        const deltaTime = currentTimeStamp - gameState.lastUpdateTimestamp;

        // Calculate offline progression and update the score
        const offlineProgression = gameState.incomeRate * deltaTime;
        gameState.score += offlineProgression;

        // Update the timestamp for the next calculation
        gameState.lastUpdateTimestamp = currentTimeStamp;

        // Update the display
        updateScoreDisplay();
    }, 1000);
}

function showOfflineProgressionPopup() {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const deltaTime = currentTimeStamp - gameState.lastUpdateTimestamp;

    // Calculate offline progression
    const offlineProgression = gameState.incomeRate * deltaTime;
    gameState.score += offlineProgression;

    // Update the timestamp for the next calculation
    gameState.lastUpdateTimestamp = currentTimeStamp;

    // Display a popup with the offline progression information
    const popupMessage = `While you were away, you earned ${offlineProgression.toFixed(2)} points!`;
    
    // Use your custom popup function instead of alert
    showPopup(popupMessage);

    // Update the display
    updateScoreDisplay();
}


// ...

// Call the showOfflineProgressionPopup function when the player returns
// You can trigger this event based on user interaction or when the game starts
// For example, when the page is fully loaded, you might call it in the window.onload event handler.

//window.onload = showOfflineProgressionPopup;


function showPopup(message) {
    const modal = document.getElementById('myModal');
    const popupMessage = document.getElementById('popupMessage');

    // Set the message content
    popupMessage.textContent = message;

    // Display the modal
    modal.style.display = 'block';

    // Close the modal if the close button is clicked
    const closeButton = document.querySelector('.close');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    // Close the modal if the user clicks outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Example usage: showPopup('While you were away, you earned 50 points!');


// Uncomment the line below to start the resource generation loop
startResourceGeneration();

// Load the game when the page is fully loaded
window.addEventListener('load', () => {
    loadGame();
});

// Automatically save the game every 1 second
setInterval(() => {
    saveGame();
}, 1000);
