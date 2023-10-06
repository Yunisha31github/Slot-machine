const prompt = require ("prompt-sync") ();

const ROWS = 3;
const Cols = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B : 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B:4,
    C: 3,
    D: 2
}




const deposit = () => {
    while(true){
    const depositeAmount = prompt("enter a deposite amount: ")
    const numberDepositeAmount = parseFloat(depositeAmount);
    if (isNaN(numberDepositeAmount) || numberDepositeAmount<= 0){
        console.log("Invalid deposite amount, try again");
    } else {
        return numberDepositeAmount;
    }
}
};
const getNumberofLines = () => {
    while(true){
        const Lines = prompt("enter the number of lines to bet on (1-3): ")
        const NumberofLines = parseFloat(Lines);
        if (isNaN(NumberofLines) || NumberofLines<= 0 || NumberofLines> 3){
            console.log("Invalid number of lines , try again");
        } else {
            return NumberofLines;
        }
    }

};
const getBet = (balance,lines) => {
    while(true){
        const bet = prompt("enter the bet per line ")
        const NumberBet = parseFloat(bet);
        if (isNaN(NumberBet) || NumberBet<= 0 || NumberBet> balance / lines){
            console.log("Invalid bet , try again");
        } else {
            return NumberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
      for (let i =0; i < count; i++){
        symbols.push(symbol);
      }
    }
   const reels = [];
   for  (let i =0; i< Cols; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j =0; j< ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex,1);
    }
   }
   return reels;
};
const transpose = (reels) => {
    const rows = [];
    for(let i =0; i < ROWS; i++){
        rows.push([]);
        for(let j =0; j < Cols; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()) {
            rowString += symbol
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};
const getWinnings = (rows,bet,Lines) => {
    let winnings = 0;
    for(let row =0; row < Lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};
const game = () => {
let balance = deposit();
while (true) {
    console.log("you have a balance of $"+balance);
const NumberofLines = getNumberofLines();
const bet = getBet(balance,NumberofLines);
balance -= bet * NumberofLines;
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, NumberofLines)
balance += winnings;
console.log("YOU WON, $" +winnings.toString())
if(balance <= 0) {
    console.log("you ran out of money!");
    break;
}
const playagain = prompt("Do you want to play again? (y/n)")
if(playagain!= "y") break;
}
};
game();
