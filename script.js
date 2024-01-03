let moneyCount = 0;
let bitcoinCost = 10;
let incomeRate = 0; // Initial income rate
let unlockCost = 10000;
let beerCost = 2;
let beerVolume = 0.5; // Volume of beer in liters
let beerCount = 0;
let vitality = 100; // Initial vitality percentage
let vitalityDecreaseRate = 1; // Initial vitality decrease rate

let workEarnings = 10; // Euros earned from work
let workVitalityCost = 5; // Vitality cost for going to work
let recycleCounter = 0; // Counter for Recycle Bottles clicks
let bitcoinClicks = 0; // Counter for Bitcoin clicks

let employBumCost = 25; // Initial cost for employing a bum
let bumsRecycling = 0; // Counter for Bums Recycling



function goToWork() {
    if (vitality >= workVitalityCost) {
        vitality -= workVitalityCost;
        moneyCount += workEarnings; // Gain 10 Euros from work
        updateDisplay();
    } else {
        alert("Not enough vitality to go to work!");
    }

    // Check for game-over condition
    if (vitality <= 0) {
        alert("Game over! Your vitality has reached 0.");
        // You can add additional logic here for handling the game-over state
    }

    const chanceOfGettingBonus = 1 / 100;

    if (Math.random() < chanceOfGettingBonus) {
        const bonusReward = 125;
        moneyCount += bonusReward;
        alert("Congratulations! You got a bonus at work! " + bonusReward + " Euros!");
    }
}

function buyBitcoin() {
    if (moneyCount >= bitcoinCost) {
        moneyCount -= bitcoinCost;
        bitcoinClicks += 0.001; // Increase Bitcoin clicks by 0.001 BTC
        bitcoinCost *= 2; // Increase bitcoin cost for the next purchase
        incomeRate += 0.01; // Increase income rate by 20% for each bitcoin purchase
        updateDisplay();
    } else {
        alert("Not enough money to buy Bitcoin!");
    }
}

function buyUnlock() {
    if (moneyCount >= unlockCost) {
        moneyCount -= unlockCost;
        unlockCost *= 2; // Increase unlock cost for the next purchase
        // Add logic to unlock a new ticker/upgrade button with a slower income rate and click effect
        addNewUnlock();
        updateDisplay();
    } else {
        alert("Not enough money to buy the unlock!");
    }
}

function buyBeer() {
    if (moneyCount >= beerCost) {
        moneyCount -= beerCost;
        beerCount++;
        
        // Show the "Buy Unlock" button when the "Beers" counter reaches 10
        if (beerCount >= 10) {
            document.getElementById("unlockButton").style.display = "inline-block";
        }

        vitality = Math.min(100, vitality + 1.7); // Increase vitality by 2, capped at 100%
        updateDisplay();
    } else {
        alert("Not enough money to buy a beer!");
    }
}


function recycleBottles() {
    const chanceOfFindingWallet = 1 / 30;

    moneyCount += 0.1; // Base reward for recycling bottles

    // Check if the random event occurs (finding a wallet)
    if (Math.random() < chanceOfFindingWallet) {
        const walletReward = 25;
        moneyCount += walletReward;
        alert("Congratulations! You found a wallet in the trash and gained " + walletReward + " Euros!");
    }

    recycleCounter++; // Increase recycle counter
    updateDisplay();
}

function employBum() {
    if (moneyCount >= employBumCost) {
        moneyCount -= employBumCost;
        bumsRecycling++; // Update the Bums Recycling counter
        incomeRate += 0.005; // Increase income rate by a small amount for each employed bum
        employBumCost *= 1.2; // Increase the cost for the next employment
        updateDisplay();
    } else {
        displayMessage("Not enough money to employ a bum!");
    }
}


function displayMessage(message) {
    // You can customize this part based on how you want to display the message
    // For example, update a message div on your HTML page
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
        messageDiv.textContent = message;
        // You may want to style the messageDiv to make it more noticeable
        messageDiv.style.color = "red";
        messageDiv.style.fontWeight = "bold";
    } else {
        // If no message div is found, you can use console.log as a fallback
        console.log(message);
    }
}


function addNewUnlock() {
    // Add logic to create a new ticker/upgrade button with different properties
    // For example, you can create a new button and attach a different income rate and click effect
    const newBitcoinButton = document.createElement("button");
    newBitcoinButton.id = "bitcoinButton"; // Assign an id for easy reference
    newBitcoinButton.onclick = function() {
        buyBitcoin();
    };
    document.getElementById("buttons").appendChild(newBitcoinButton);
}

function updateDisplay() {
    // Round the money count to two decimal places
    const formattedMoneyCount = Math.round(moneyCount * 100) / 100;
    document.getElementById("moneyCount").textContent = formattedMoneyCount.toFixed(2);

    // Update bitcoin, unlock, beer, and vitality counters
    document.getElementById("bitcoinButton").textContent = "Buy Bitcoin (€" + bitcoinCost.toFixed(2) + ")";
    document.getElementById("unlockButton").textContent = "Buy Unlock (€" + unlockCost.toFixed(2) + ")";
    document.getElementById("buyBeerButton").textContent = "Buy Beer (€" + beerCost.toFixed(2) + ")";
    document.getElementById("workButton").textContent = "Go To Work (€" + workEarnings.toFixed(2) + ")";
    document.getElementById("recycleButton").textContent = "Recycle Bottles (€0.01)";
    
    document.getElementById("beerCount").textContent = (beerCount * beerVolume).toFixed(2);
    document.getElementById("bitcoinClicks").textContent = bitcoinClicks.toFixed(3); // Show Bitcoin clicks to three decimal places
    document.getElementById("vitality").textContent = vitality.toFixed(2) + "%";
    document.getElementById("recycleCounter").textContent = recycleCounter;
    // Update the Employ A Bum button text
    document.getElementById("employBumButton").textContent = "Employ A Bum (€" + employBumCost.toFixed(2) + ")";
    // Update the Bums Recycling counter
    document.getElementById("bumsRecycling").textContent = bumsRecycling;

    if (vitality <= 0) {
        document.getElementById("startOverButton").style.display = "inline-block";
    } else {
        document.getElementById("startOverButton").style.display = "none";
    }
}

function updateResources() {
    // Update income and decay logic here
    moneyCount += incomeRate; // Increase money based on the income rate

    // Decrease vitality over time with a faster decay as vitality decreases
    const decayRate = 0.01 * Math.pow(2, vitality / 20); // Adjust the decay rate as needed
    vitality = Math.max(0, vitality - decayRate);
}

setInterval(function() {
    updateResources();
    updateDisplay();
}, 1000);



class GameState extends Saveable {
    constructor() {
        super("game-state");
        this.moneyCount = 0;
        // Add other game state variables here
    }

    save() {
        console.log("Saving game state...");
        return { moneyCount: this.moneyCount };
    }

    load(data) {
        console.log("Loading game state...");
        this.moneyCount = data.moneyCount;
    }
}

class WorkFeature extends Saveable {
    constructor() {
        super("work-feature");
        this.workEarnings = 10;
        this.workVitalityCost = 5;
        // Add other feature-specific variables here
    }

    save() {
        console.log("Saving work feature...");
        return { workEarnings: this.workEarnings, workVitalityCost: this.workVitalityCost };
    }

    load(data) {
        console.log("Loading work feature...");
        this.workEarnings = data.workEarnings;
        this.workVitalityCost = data.workVitalityCost;
    }
}


// Function to save the entire game state
function saveGame() {
    const gameState = {
        moneyCount,
        bitcoinCost,
        incomeRate,
        unlockCost,
        beerCost,
        beerVolume,
        beerCount,
        vitality,
        vitalityDecreaseRate,
        workEarnings,
        workVitalityCost,
        recycleCounter,
        bitcoinClicks,
        employBumCost,
        bumsRecycling,
        // Add other variables as needed
    };

    localStorage.setItem("incremental-game-save", JSON.stringify(gameState));
}

// Function to load the entire game state
function loadGame() {
    const savedData = JSON.parse(localStorage.getItem("incremental-game-save")) || {};
    Object.assign(window, savedData); // Restore saved data to global variables
}

// Function to periodically save the entire game state
function autoSave() {
    setInterval(saveGame, 1000); // Autosave every 1 minute (adjust the interval as needed)
}

// Initialize the autosave and load the game state
autoSave();
loadGame();
