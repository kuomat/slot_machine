// 1. Despot some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again


const prompt = require("prompt-sync")();

// the initial deposit
const deposit = () => {
    let initialMoney;
    do {
        initialMoney = parseFloat(prompt('How much money (in dollars) do you want to deposit? You can only do this once: '));
    } while (isNaN(initialMoney))
    return initialMoney;
}

// choose the number of lines to bet on
const chooseLines = () => {
    let numberOfLines;
    do {
        numberOfLines = parseInt(prompt('Choose how many lines to bet on (1-3): '));
    } while (isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines < 1);
    return numberOfLines;
}

// choose the bets
const chooseBets = (totalMoney) => {
    let bet;
    do {
        bet = parseFloat(prompt(`You have ${totalMoney} dollars. How much are you betting: `));
    } while (isNaN(bet) || bet > totalMoney);
    return bet;
}

// the main game loop
const game = () => {
    let totalMoney = deposit();
    let lines = chooseLines();
    let bets = chooseBets(totalMoney);
    console.log();

    console.log(`You have ${totalMoney} and you are betting on ${lines} lines with ${bets} dollars`);
}


game();