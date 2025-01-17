"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

window.addEventListener('load', () => {
    initGlobalObject();
    if(checkForGameOver() === 1) {
        console.log("Spelare 1 vann");        
    } else if(checkForGameOver() === 2) {
        console.log("Spelare 2 vann");
    } else if(checkForGameOver() === 3) {
        console.log("Oavgjort");
    } else {
        console.log("Spelet fortsätter"); 
    }
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
  //Datastruktur för vilka platser som är lediga respektive har brickor
  //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
  oGameData.gameField = ['', '', '', '', '', '', '', '', ''];

  //['0', '1', '2',
  // '3', '4', '5',
  // '6', '7', '8']

  /* Testdata för att testa rättningslösning */
  //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
  //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
  //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
  //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
  //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

  //Indikerar tecknet som skall användas för spelare ett.
  oGameData.playerOne = "X";

  //Indikerar tecknet som skall användas för spelare två.
  oGameData.playerTwo = "O";

  //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
  oGameData.currentPlayer = "";

  //Nickname för spelare ett som tilldelas från ett formulärelement,
  oGameData.nickNamePlayerOne = "";

  //Nickname för spelare två som tilldelas från ett formulärelement.
  oGameData.nickNamePlayerTwo = "";

  //Färg för spelare ett som tilldelas från ett formulärelement.
  oGameData.colorPlayerOne = "";

  //Färg för spelare två som tilldelas från ett formulärelement.
  oGameData.colorPlayerTwo = "";

  //Antalet sekunder för timerfunktionen
  oGameData.seconds = 5;

  //Timerns ID
  oGameData.timerId = null;

  //Från start är timern inaktiverad
  oGameData.timerEnabled = false;

  //Referens till element för felmeddelanden
  oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
    if (checkWinner(oGameData.playerOne)) {
        return 1;
    }
    if (checkWinner(oGameData.playerTwo)) {
        return 2;
    }
    if (checkForDraw()) {
        return 3;
    }
    return 0;
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
    const winnerCombinations = [
        [0, 1, 2], // Top rad
        [3, 4, 5], // Mellan rad
        [6, 7, 8], // Botten rad
        [0, 3, 6], // Vänster column
        [1, 4, 7], // Mellan column
        [2, 5, 8], // Höger column
        [0, 4, 8], // Diagonalt vänster ner
        [2, 4, 6] // Diagonalt höger ner    
    ];

    for(let combination of winnerCombinations) {
        const [a, b, c] = combination;
        if (oGameData.gameField[a] === playerIn && oGameData.gameField[b] === playerIn && oGameData.gameField[c] === playerIn) {
            return true;
        }
}
    return false;
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    if (oGameData.gameField.every(box => box !== '')) {
        return true;
    } else {
        return false;
    }
}


// Nedanstående funktioner väntar vi med!

function prepGame() {

}

function validateForm() {
    
}

function initiateGame() {

}

function executeMove (event) {

}

function changePlayer() {

}

function timer() {

}

function gameOver(result) {

}