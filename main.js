
const SYMBOLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ROWS = 3;

const prompt = require("prompt-sync")();

// the initial deposit
const deposit = () => {
    let initialMoney;
    do {
        initialMoney = parseFloat(prompt('How much money (in dollars) do you want to deposit? '));
    } while (isNaN(initialMoney))
    return initialMoney;
}

// choose the bets
const chooseBets = (totalMoney) => {
    let bet;
    do {
        bet = parseFloat(prompt(`You have ${totalMoney} dollars. How much are you betting: `));
    } while (isNaN(bet) || bet > totalMoney);
    return bet;
}

const transpose = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]));

// spin the slot machine
const spinSlotMachine = () => {
    // get the results of the slot machine
    let results = Array.from({length: 3}, getSymbols);
    let resultsTranspose = transpose(results);

    // return newMat;
    for (const oneD of resultsTranspose) {
        console.log(oneD.join(' | '));
    }

    return resultsTranspose;
}

// pick three unique indices randomly from 0 to 9 inclusive
const getSymbols = () => {
    let indices = new Set();

    while (indices.size < ROWS) {
        indices.add(Math.floor(Math.random() * SYMBOLS.length));
    }

    // transform the indices to symbols
    indices = [...indices];
    return indices.map((index) => SYMBOLS[index]);
}

// check if the user wins
const checkWin = (res, bets) => {
    let tempSet = new Set();
    let multiplier, won = 0;

    for (let row = 0; row < ROWS; row ++) {
        tempSet.clear();
        for (let col = 0; col < 3; col ++) {
            tempSet.add(res[row][col]);
        }

        multiplier = 2 * ROWS - row;

        if (tempSet.size === 2) { // two same symbols
            console.log(`You won the second biggest prize on row ${row + 1}!`);
            won += bets * 2 * multiplier;
        } else if (tempSet.size === 1) { // one same symbol
            console.log(`You won the biggest prize on row ${row + 1}!`);
            won += bets * 3 * multiplier;
        } else { // everything is different
            console.log(`You didn't win anything on row ${row + 1}...`);
        }
    }

    return won;
}

// the main game loop
const game = () => {
    let action, bets, res, won, gameContinue = true, totalMoney = 0;

    while (gameContinue) {
        console.log();
        action = prompt("What do you want to do? (d)eposit, (p)lay, or (l)eave: ");

        switch (action) {
            // deposit
            case 'd':
                totalMoney += deposit();
                console.log(`You currently have ${totalMoney} dollars.`);
                break;

            // play the game
            case 'p':
                // check if the user still has money
                while (totalMoney === 0) {
                    console.log("You're out of money...");
                    totalMoney += deposit();
                }

                bets = chooseBets(totalMoney);
                console.log("Starting slot machine...");

                res = spinSlotMachine();
                won = checkWin(res, bets);

                totalMoney = totalMoney - bets + won;
                console.log(`You currently have ${totalMoney} dollars`);
                break;

            // leave the game
            case 'l':
                gameContinue = false;
                console.log("Thank you so much for playing!!");
                break;

            default:
                console.log("Invalid action. Please try again.");
                break;
        }
    }
}

game();