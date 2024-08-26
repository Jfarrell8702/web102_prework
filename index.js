/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// Grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        // Access the current game object
        let game = games[i];

        // Create a new div element
        let gameCard = document.createElement('div');

        // Add the class 'game-card' to the div's class list
        gameCard.classList.add('game-card');

        // Set the inner HTML of the game card using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p><strong>Number of Backers:</strong> ${game.backers}</p>
        `;

        // Append the game card to the parent container on the page
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function we just defined using the correct variable
// Later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the number of games in the array for the secret key
    console.log(unfundedGames.length);

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// Show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the number of games in the array for the secret key
    console.log(fundedGames.length);

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// Show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const unfundedMessage = `There ${unfundedGames === 1 ? 'is 1 game' : `are ${unfundedGames} games`} that has not reached its funding goal.`;


// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');
paragraph.innerHTML = unfundedMessage;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Get the containers for the top games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by the amount pledged in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// Create an element for the top game and append it to firstGameContainer
const firstGameElement = document.createElement('p');
firstGameElement.innerHTML = `Top Pledge Game: ${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// Create an element for the second game and append it to secondGameContainer
const secondGameElement = document.createElement('p');
secondGameElement.innerHTML = `Second Pledge Game: ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);
