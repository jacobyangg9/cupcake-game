// DOM elements variable declarations
const allButtons = document.querySelectorAll('button');
const buyDefaultCupcakeBtn = document.querySelector('#buyDefaultCupcakeBtn');
const playDefaultCupcakeImg = document.querySelector('#playDefaultCupcakeImg');
const buttonContainer = document.querySelector('.button-container');
const headingText = document.querySelector('#headingText');
const bingCashRegister = new Audio('bingCashRegister.mp3');
const bingSellingRegister = new Audio('bingSellingRegister.mp3');
const bingGameOverSound = new Audio('bingAchievementBell.wav');
const bingCountdown = new Audio('bingCountdownAudio.mp3');
const displayTotalCash = document.querySelector('#displayTotalCash');
const displayReceipt = document.querySelector('#displayReceipt');
const displayProfit = document.querySelector('#displayProfit');
const cupcakePriceInput = document.querySelector('#cupcakePriceInput');
const sellButton = document.querySelector('#sellButton');
const displayTotalCashAtCenter = document.querySelector('#displayTotalCashAtCenter');
const container = document.querySelector('.container');
const displayCountdownTimer = document.querySelector('#displayCountdownTimer');
const sprinklesButton = document.querySelector('#sprinklesButton');
const oreosButton = document.querySelector('#oreosButton');
const chocolateButton = document.querySelector('#chocolateButton');
const cherryButton = document.querySelector('#cherryButton');
const buttonsContainer = document.querySelector('.buttons');
const toppingButtons = document.querySelector('.topping-buttons');
const sprinklesCupcakeImg = document.querySelector('#sprinklesCupcakeImg');
const oreosCupcakeImg = document.querySelector('#oreosCupcakeImg');
const chocolateChipsCupcakeImg = document.querySelector('#chocolateChipsCupcakeImg');
const cherryCupcakeImg = document.querySelector('#cherryCupcakeImg');
const bargain1 = document.querySelector('#bargain1');
const bargain2 = document.querySelector('#bargain2');
const bargain3 = document.querySelector('#bargain3');
const bargain4 = document.querySelector('#bargain4');
const bargain5 = document.querySelector('#bargain5');

// Variable game mechanics
let totalCash = 1; // Reuse this variable for the end screen
let sellPrice = 0;
let totalCostReceipt = 0;
let profit = 0;
let costOfPlainCupcake = 1;
let costOfSprinkles = 1;
let costOfOreos = 5;
let costOfChocolate = 15;
let costOfCherry = 50;
let timeToSell = 0; // How long it takes to sell a cupcake
let purchasedItemYet = false;
let purchasedSprinkles = false;
let purchasedOreos = false;
let purchasedChocolate = false;
let purchasedCherry = false;
let accumulatedCostAtSelling; // Varaible to total the cost of the array when selling
let accumulatedAttractivenessAtSelling; // Variable to total the attractiveness of the array when selling
let purchasedItems = [];
let availableToppings = [];
let countDown = 60; // Global function to countdown on game start

// Advanced game mechanics
let countDownInterval = setInterval(countDownFunc, 1000); // Execute timer function every second

// Event listeners
try { // In case of error
    buyDefaultCupcakeBtn.addEventListener('click', purchaseDefaultCupcake); // Purchase a plain cupcake
    sellButton.addEventListener('click', sellCupcake); // Selling  a cupcake
    buttonsContainer.addEventListener('click', updateBargains); // Update bargains upon every button click
    toppingButtons.addEventListener('click', updateBargains); // Update bargains upon every topping button click


    // Event listners for toppings
    sprinklesButton.addEventListener('click', function() {
        purchaseToppings('sprinkles');
    });

    oreosButton.addEventListener('click', function() {
        purchaseToppings('oreos');
    })

    chocolateButton.addEventListener('click', function() {
        purchaseToppings('chocolate');
    })

    cherryButton.addEventListener('click', function() {
        purchaseToppings('cherry');
    })
} catch (error) {
    console.log(error);
}



// Complex event listeners
// Add event listener for keydown event on document
document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the Enter key
    if (event.key === 'Enter') {
        // Call sellCupcake function
        sellCupcake();
    }
});

// Conditional statements
// Check to see if the toppings are clicked; if not, add event listeners for default color grading
if (!purchasedSprinkles) {
    try {
        sprinklesButton.addEventListener('mouseover', sprinkleButtonColorHover);
        sprinklesButton.addEventListener('mouseout', sprinkleButtonColorDefault);
    } catch (error) {
        console.log(error); 
    }
}

if (!purchasedOreos) {
    try {
        oreosButton.addEventListener('mouseover', oreosButtonColorHover);
        oreosButton.addEventListener('mouseout', oreosButtonColorDefault);
    } catch (error) {
    console.log(error);
    }
}

if (!purchasedChocolate) {
    try {
        chocolateButton.addEventListener('mouseover', chocolateButtonColorHover);
        chocolateButton.addEventListener('mouseout', chocolateButtonColorDefault);
    } catch (error) {
        console.log(error);
    }
}

if (!purchasedCherry) {
    try {
        cherryButton.addEventListener('mouseover', cherryButtonColorHover);
        cherryButton.addEventListener('mouseout', cherryButtonColorDefault);
    } catch (error) {
        console.log(error);
    }
}

// Objects for each topping and cupcake characteristics
const defaultCupcakeObj = {
    name: 'Default Cupcake',
    cost: 1,
    attractiveness: 1
}

const spinklesObj = {
    name: 'Sprinkles',
    cost: 1,
    attractiveness: 3
}

const oreosObj = {
    name: 'Oreos',
    cost: 5,
    attractiveness: 9
}

const chocolateObj = {
    name: 'Chocolate',
    cost: 15,
    attractiveness: 23
}

const cherryObj = {
    name: 'Cherry',
    cost: 50,
    attractiveness: 75
}

// Object for the bargains to loop through in a function
const bargains = [
    bargain1,
    bargain2,
    bargain3,
    bargain4,
    bargain5
];

// Objects for the style of the topping buttons for default color grading
const toppingButtonsStyle = {
    backgroundColor: 'hsl(38, 100%, 85%)',
    color: 'black',
    cursor: 'pointer'
}

const toppingButtonsStyleHovered = {
    backgroundColor: 'hsl(38, 100%, 70%)',
    color: 'black',
    cursor: 'pointer'
}

// Functions

// Function to change the colors of the topping buttons to apply the default effect
// Sprinkles button
function sprinkleButtonColorHover() {
    sprinklesButton.style.backgroundColor = toppingButtonsStyleHovered.backgroundColor;
    sprinklesButton.style.color = toppingButtonsStyleHovered.color;
    sprinklesButton.style.cursor = toppingButtonsStyleHovered.cursor;
}

function sprinkleButtonColorDefault() {
    sprinklesButton.style.backgroundColor = toppingButtonsStyle.backgroundColor;
    sprinklesButton.style.color = toppingButtonsStyle.color;
    sprinklesButton.style.cursor = toppingButtonsStyle.cursor;
}

function resetSprinklesButton() { // Reset the sprinkles button
    sprinkleButtonColorDefault();
    sprinklesButton.disabled = false;
    sprinklesButton.textContent = 'Sprinkles - $1';
    sprinklesButton.addEventListener('mouseover', sprinkleButtonColorHover);
    sprinklesButton.addEventListener('mouseout', sprinkleButtonColorDefault);
}

// Oreos button
function oreosButtonColorHover() {
    oreosButton.style.backgroundColor = toppingButtonsStyleHovered.backgroundColor;
    oreosButton.style.color = toppingButtonsStyleHovered.color;
    oreosButton.style.cursor = toppingButtonsStyleHovered.cursor;
}

function oreosButtonColorDefault() {
    oreosButton.style.backgroundColor = toppingButtonsStyle.backgroundColor;
    oreosButton.style.color = toppingButtonsStyle.color;
    oreosButton.style.cursor = toppingButtonsStyle.cursor;
}

function resetOreosButton() {
    oreosButtonColorDefault();
    oreosButton.disabled = false;
    oreosButton.textContent = 'Oreos - $5';
    oreosButton.addEventListener('mouseover', oreosButtonColorHover);
    oreosButton.addEventListener('mouseout', oreosButtonColorDefault);
}

// Chocolate button
function chocolateButtonColorHover() {
    chocolateButton.style.backgroundColor = toppingButtonsStyleHovered.backgroundColor;
    chocolateButton.style.color = toppingButtonsStyleHovered.color;
    chocolateButton.style.cursor = toppingButtonsStyleHovered.cursor;
}

function chocolateButtonColorDefault() {
    chocolateButton.style.backgroundColor = toppingButtonsStyle.backgroundColor;
    chocolateButton.style.color = toppingButtonsStyle.color;
    chocolateButton.style.cursor = toppingButtonsStyle.cursor;
}

function resetChocolateButton() {
    chocolateButtonColorDefault();
    chocolateButton.disabled = false;
    chocolateButton.textContent = 'Chocolate - $15';
    chocolateButton.addEventListener('mouseover', chocolateButtonColorHover);
    chocolateButton.addEventListener('mouseout', chocolateButtonColorDefault);
}

// Cherry button
function cherryButtonColorHover() {
    cherryButton.style.backgroundColor = toppingButtonsStyleHovered.backgroundColor;
    cherryButton.style.color = toppingButtonsStyleHovered.color;
    cherryButton.style.cursor = toppingButtonsStyleHovered.cursor;
}

function cherryButtonColorDefault() {
    cherryButton.style.backgroundColor = toppingButtonsStyle.backgroundColor;
    cherryButton.style.color = toppingButtonsStyle.color;
    cherryButton.style.cursor = toppingButtonsStyle.cursor;
}

function resetCherryButton() {
    cherryButtonColorDefault();
    cherryButton.disabled = false;
    cherryButton.textContent = 'Cherry - $50';
    cherryButton.addEventListener('mouseover', cherryButtonColorHover);
    cherryButton.addEventListener('mouseout', cherryButtonColorDefault);
}

// Purchase default cupcake
function purchaseDefaultCupcake() { // Purchase a default cupcake
    if (totalCash >= costOfPlainCupcake) { // If the player has enough cash
        purchasedItemYet = true;
        purchasedItems.push(defaultCupcakeObj);
        totalCash -= costOfPlainCupcake;
        profit = sellPrice - costOfPlainCupcake;
        totalCostReceipt += costOfPlainCupcake;
        
        // Change display using DOM manipulation
        displayReceipt.textContent = `Cost: $${totalCostReceipt}`;
        displayTotalCash.textContent = `Total Cash: $${totalCash}`;
        displayProfit.innerHTML = `Profit: $0 <br> <span style="font-size: 14px;">(Sell cupcake to profit)</span>`; // Add a span tag to change font family
        displayTotalCashAtCenter.textContent = `Total Cash: $${totalCash}`;
        
        // Exchange button with cupcake and show selling options
        buyDefaultCupcakeBtn.style.display = 'none';
        playDefaultCupcakeImg.style.visibility = 'visible';
        buttonContainer.style.visibility = 'visible';

        // Put cursor on input field
        cupcakePriceInput.focus();

        // Play cash register sound
        bingCashRegister.play();
    }

    // If statements
    // Check if the player has enough cash to purchase toppings
    if (purchasedItemYet) {
        if (totalCash >= 1) {
            sprinklesButton.style.visibility = 'visible';
            availableToppings.push('Sprinkles');
        }
    }   if (totalCash >= 5) {
            oreosButton.style.visibility = 'visible';
            availableToppings.push('Oreos');
        }
        if (totalCash >= 15) {
            chocolateButton.style.visibility = 'visible';
            availableToppings.push('Chocolate');
        }
        if (totalCash >= 50) {
            cherryButton.style.visibility = 'visible';
            availableToppings.push('Cherry');
        }

    
    // Conditional statements to adjust positions of the topping buttons to be centered
    if (availableToppings.length == 1) {
        sprinklesButton.style.marginLeft = '37%';
    }

    if (availableToppings.length == 2) {
        sprinklesButton.style.marginLeft = '25%';
        oreosButton.style.marginLeft = '10px';
    }

    if (availableToppings.length == 3) {
        sprinklesButton.style.marginLeft = '9%';
        oreosButton.style.marginLeft = '10px';
        chocolateButton.style.marginLeft = '10px';
    }

    if (availableToppings.length == 4) {
        sprinklesButton.style.marginLeft = '0%'
        oreosButton.style.marginLeft = '10px';
        chocolateButton.style.marginLeft = '10px';
        cherryButton.style.marginLeft = '10px';
    }

    // Reset toppings to original shade of colors and characteristics
    resetSprinklesButton();
    resetOreosButton();
    resetChocolateButton();
    resetCherryButton();
}

// Function to update the bargains and stats when buying and selling
function updateBargainsAndStats() {
    displayReceipt.textContent = `Cost: $${totalCostReceipt}`;
    displayTotalCash.textContent = `Total Cash: $${totalCash}`;
    displayTotalCashAtCenter.textContent = `Total Cash: $${totalCash}`;
}

// Function to purchase toppings
function purchaseToppings(topping) {
     
    // Purchase sprinkles
    if (topping == 'sprinkles') {
        totalCash -= costOfSprinkles;
        totalCostReceipt += costOfSprinkles;
        profit = sellPrice - costOfSprinkles;
        purchasedSprinkles = true;

        updateBargainsAndStats();

        // Fix button upon purchase
        sprinklesButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
        sprinklesButton.style.color = 'gray';
        sprinklesButton.disabled = true;
        sprinklesButton.textContent = 'Purchased!';
        sprinklesButton.style.cursor = 'not-allowed';

        // Remove event listener
        if(purchasedSprinkles) {
            sprinklesButton.removeEventListener('mouseover', sprinkleButtonColorHover);
            sprinklesButton.removeEventListener('mouseout', sprinkleButtonColorDefault);
        }


        sprinklesCupcakeImg.style.visibility = 'visible';

    
        // Push the purchased item to the array
        purchasedItems.push(spinklesObj);

        // Play audio
        bingCashRegister.play();
        cupcakePriceInput.focus();
    }

    // Purchase oreos
    if (topping == 'oreos') {
        totalCash -= costOfOreos;
        totalCostReceipt += costOfOreos;
        profit = sellPrice - costOfOreos;
        purchasedOreos = true;

        updateBargainsAndStats();

        // Fix button upon purchase
        oreosButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
        oreosButton.style.color = 'gray';
        oreosButton.disabled = true;
        oreosButton.textContent = 'Purchased!';
        oreosButton.style.cursor = 'not-allowed';

        // Remove event listener
        if(purchasedOreos) {
            oreosButton.removeEventListener('mouseover', oreosButtonColorHover);
            oreosButton.removeEventListener('mouseout', oreosButtonColorDefault);
        }


        oreosCupcakeImg.style.visibility = 'visible';

    
        // Push the purchased item to the array
        purchasedItems.push(oreosObj);

        // Play audio
        bingCashRegister.play();
        cupcakePriceInput.focus();
    }

    // Purchase chocolate
    if (topping == 'chocolate') {
        totalCash -= costOfChocolate;
        totalCostReceipt += costOfChocolate;
        profit = sellPrice - costOfChocolate;
        purchasedChocolate = true;

        updateBargainsAndStats();

        // Fix button upon purchase
        chocolateButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
        chocolateButton.style.color = 'gray';
        chocolateButton.disabled = true;
        chocolateButton.textContent = 'Purchased!';
        chocolateButton.style.cursor = 'not-allowed';

        // Remove event listener
        if(purchasedChocolate) {
            chocolateButton.removeEventListener('mouseover', chocolateButtonColorHover);
            chocolateButton.removeEventListener('mouseout', chocolateButtonColorDefault);
        }


        chocolateChipsCupcakeImg.style.visibility = 'visible';

    
        // Push the purchased item to the array
        purchasedItems.push(chocolateObj);

        // Play audio
        bingCashRegister.play();
        cupcakePriceInput.focus();
    }

    // Purchase cherry
    if (topping == 'cherry') {
        totalCash -= costOfCherry;
        totalCostReceipt += costOfCherry;
        profit = sellPrice - costOfCherry;
        purchasedCherry = true;

        updateBargainsAndStats();

        // Fix button upon purchase
        cherryButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
        cherryButton.style.color = 'gray';
        cherryButton.disabled = true;
        cherryButton.textContent = 'Purchased!';
        cherryButton.style.cursor = 'not-allowed';

        // Remove event listener
        if(purchasedCherry) {
            cherryButton.removeEventListener('mouseover', cherryButtonColorHover);
            cherryButton.removeEventListener('mouseout', cherryButtonColorDefault);
        }


        cherryCupcakeImg.style.visibility = 'visible';

    
        // Push the purchased item to the array
        purchasedItems.push(cherryObj);

        // Play audio
        bingCashRegister.play();
        cupcakePriceInput.focus();
    }

    // Fix issue if the user does not have enough cash
    // Sprinkles
    if (totalCash < costOfSprinkles) {
        if (!purchasedSprinkles) {
            // Update display
            sprinklesButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
            sprinklesButton.style.color = 'gray';
            sprinklesButton.disabled = true;
            sprinklesButton.textContent = 'Not enough money';
            sprinklesButton.style.cursor = 'not-allowed';
            purchasedSprinkles = true;

            if(purchasedSprinkles) {
                sprinklesButton.removeEventListener('mouseover', sprinkleButtonColorHover);
                sprinklesButton.removeEventListener('mouseout', sprinkleButtonColorDefault);
            }
        }
    }

    // Oreos
    if (totalCash < costOfOreos) {
        if (!purchasedOreos) {
            // Update display
            oreosButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
            oreosButton.style.color = 'gray';
            oreosButton.disabled = true;
            oreosButton.textContent = 'Not enough money';
            oreosButton.style.cursor = 'not-allowed';
            purchasedOreos = true;

            if(purchasedOreos) {
                oreosButton.removeEventListener('mouseover', oreosButtonColorHover);
                oreosButton.removeEventListener('mouseout', oreosButtonColorDefault);
            }
        }
    }

    // Chocolate
    if (totalCash < costOfChocolate) {
        if (!purchasedChocolate) {
            // Update display
            chocolateButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
            chocolateButton.style.color = 'gray';
            chocolateButton.disabled = true;
            chocolateButton.textContent = 'Not enough money';
            chocolateButton.style.cursor = 'not-allowed';
            purchasedChocolate = true;

            if(purchasedChocolate) {
                chocolateButton.removeEventListener('mouseover', chocolateButtonColorHover);
                chocolateButton.removeEventListener('mouseout', chocolateButtonColorDefault);
            }
        }
    }

    // Cherry
    if (totalCash < costOfCherry) {
        if (!purchasedCherry) {
            // Update display
            cherryButton.style.backgroundColor = 'hsl(38, 100%, 90%)';
            cherryButton.style.color = 'gray';
            cherryButton.disabled = true;
            cherryButton.textContent = 'Not enough money';
            cherryButton.style.cursor = 'not-allowed';
            purchasedCherry = true;

            if(purchasedCherry) {
                cherryButton.removeEventListener('mouseover', cherryButtonColorHover);
                cherryButton.removeEventListener('mouseout', cherryButtonColorDefault);
            }
        }
    }
}

// Function to sell the cupcake
function sellCupcake() {
    accumulatedCostAtSelling = 0; // Initialize to 0
    accumulatedAttractivenessAtSelling = 0; // Initialize to 0

    purchasedSprinkles = false; // Reset to false
    purchasedOreos = false; // Reset to false
    purchasedChocolate = false; // Reset to false
    purchasedCherry = false; // Reset to false

    availableToppings.length = 0; // Remove whitespace in topping buttons

    purchasedItems.forEach(purchasedItem => {
        accumulatedCostAtSelling += purchasedItem.cost; // Variable to total the cost of the array when selling
        accumulatedAttractivenessAtSelling += purchasedItem.attractiveness; // Variable to total the attractiveness of the array when selling
    })

    // Collect value of input field
    sellPrice = Number(cupcakePriceInput.value);
    profit = sellPrice - accumulatedCostAtSelling;

    // Collect how long it should take to sell cupcake
    // Formula: Cost - Attractiveness
    timeToSell = sellPrice - Number(accumulatedAttractivenessAtSelling);

    // Conditional flow to sell the cupcake, handels negative integers
    if (timeToSell < 0) {
        timeToSell = 0;
    }

    let timeToSellOfficial = Number(timeToSell); // Convert to number
    timeToSellOfficial *= 1000; // Convert to milliseconds
    timeToSellOfficial += 1000;

    let timeToDisplaySell = timeToSellOfficial - 2000; // Time to display successful selling message

    setTimeout(successfulSale, timeToSellOfficial); // How long to sell the cupcake
    setTimeout(displaySuccessfulSale, timeToDisplaySell); // How long to display the selling message
   
    // Change display to display profit
    displayProfit.textContent = `Profit: pending...`;

    // Change display to show it selling
    let sellingDisplay = document.createElement('h1');
    sellingDisplay.textContent = "Selling in progress...";
    sellingDisplay.id = "sellingDisplay";
    sellingDisplay.style.fontSize = '60px';
    sellingDisplay.style.fontFamily = 'sans-serif';
    sellingDisplay.style.color = '#fc4264';
    sellingDisplay.style.textAlign = 'center';
    sellingDisplay.style.position = 'absolute';
    sellingDisplay.style.top = '50%';
    sellingDisplay.style.left = '50%';
    sellingDisplay.style.transform = 'translate(-50%, -200%)';


    // Remove topping buttons when selling
    sprinklesButton.style.visibility = 'hidden';
    oreosButton.style.visibility = 'hidden';
    chocolateButton.style.visibility = 'hidden';
    cherryButton.style.visibility = 'hidden';


    // Remove topping images when selling
    sprinklesCupcakeImg.style.visibility = 'hidden';
    oreosCupcakeImg.style.visibility = 'hidden';
    chocolateChipsCupcakeImg.style.visibility = 'hidden';
    cherryCupcakeImg.style.visibility = 'hidden';
    

    bingSellingRegister.play();

    appendMessage(sellingDisplay);
}

function appendMessage(message) { // Function to append the selling message and remove cupcake
    // Append display
    container.appendChild(message);
    document.body.appendChild(message);

    playDefaultCupcakeImg.style.visibility = 'hidden';
    buttonContainer.style.visibility = 'hidden';
}

function resetBargains() { // Function to reset the bargains upon selling
    for (let i = 1; i < bargains.length; i++) {
        bargains[i].textContent = 'test';
        bargains[i].style.color = 'hsl(38, 100%, 85%)'
    }

    bargains[0].textContent = 'Items you purchased will show up here';
}

function updateBargains() { // Loop for every bargain to display what the player has purchased
    for(let i = 0; i < purchasedItems.length; i++) {
        bargains[i].style.color = 'black'; // Ensure the font color is readable
        bargains[i].textContent = `- ${purchasedItems[i].name}`;
    
    }
}

function successfulSale() { // Function to execute when the cupcake is sold
    // Restore original contents
    sellingDisplay.remove();
    buyDefaultCupcakeBtn.style.display = '';

    // Reset sale input
    cupcakePriceInput.blur();
    cupcakePriceInput.value = '';

    // Restore mechanics
    totalCash += sellPrice;
    displayTotalCashAtCenter.textContent = `Total Cash: $${totalCash}`;
    displayTotalCash.textContent = `Total Cash: $${totalCash}`;

    // Restore basic mechanics
    purchasedItemYet = false;
    totalCostReceipt = 0;
    purchasedItems.length = 0;

    accumulatedCostAtSelling = 0;
    accumulatedAttractivenessAtSelling = 0;
    sellPrice = 0;
    profit = 0;
    timeToSell = 0;
}

function displaySuccessfulSale() { // Function to display the successful sale
    sellingDisplay.textContent = "SOLD!";
    displayProfit.textContent = `Profit: $${profit}`;
    displayReceipt.textContent = `Cost: $0`;

    resetBargains();
    
    bingCashRegister.play();
} 


function bankrupt() {}

// Functions to start timer countdown on game load
function countDownFunc() {
    countDown--;
    
    // Show timer in 00:00 format
    let minutes = Math.floor(countDown / 60);
    let seconds = countDown % 60;

    // Convert to string
    minutes = minutes.toString();
    seconds = seconds.toString();

    // If statements
    if (seconds.length < 2) {
        seconds = `0${seconds}`;
    }

    // Drafting the timer countdown
    let draftedDisplayCountdown = `${minutes}:${seconds}`;
    
    // Update the countdown timer
    displayCountdownTimer.textContent = `Time left - ${draftedDisplayCountdown}`;

    if (draftedDisplayCountdown == "0:03") {
        bingCountdown.play();
    }

    if (draftedDisplayCountdown == "0:00") {
        endGame();
    }
}

// Function to end the game
function endGame() {
    clearInterval(countDownInterval); // Clear the countdown
    displayEndResults();
}

// Function to display the end results
function displayEndResults() {
    // Change text content
    displayTotalCash.textContent = `FINAL TOTAL CASH: $${totalCash}`;
    displayTotalCashAtCenter.textContent = `FINAL TOTAL CASH: $${totalCash}`;
    displayCountdownTimer.textContent = `GAME OVER!`;
    displayCountdownTimer.style.fontSize = '40px';

    // Change header
    headingText.textContent = '---FINAL RESULTS---';

    // Change all buttons to disabled
    allButtons.forEach(button => {
        button.style.color = 'gray';
        button.style.cursor = 'not-allowed';
        button.disabled = true;
        button.style.backgroundColor = 'hsl(38, 100%, 90%)';
    })

    // After five seconds, return to home
    setTimeout(returnToHome, 5000);

    bingGameOverSound.play();
}

// Function to return to home
function returnToHome() {
    window.location.href = 'index.html';
}
