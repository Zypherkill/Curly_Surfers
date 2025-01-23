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

prepGame()
function checkForGameOver() {
    if (checkWinner(oGameData.playerOne)) {
        return 1;
    }
    else if (checkWinner(oGameData.playerTwo)) {
        return 2;
    }
    else if (checkForDraw()) {
        return 3;
    }
    else {
        return 0;
    }
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
    let hideGameArea = document.querySelector('#gameArea');
    hideGameArea.classList.add('d-none');
    let newGame = document.querySelector("#newGame");
    newGame.addEventListener('click', initiateGame);
}

function validateForm() {
}

function initiateGame() {
    initGlobalObject();
    let hideForm = document.querySelector('#theForm');
    hideForm.classList.add('d-none');
    let gameArea = document.querySelector('#gameArea');
    gameArea.classList.remove('d-none');
    let removeText = document.querySelector('#errorMsg');
    removeText.innerText = '';
    oGameData.nickNamePlayerOne = document.querySelector('#nick1').value;
    oGameData.nickNamePlayerTwo = document.querySelector('#nick2').value;
    oGameData.colorPlayerOne = document.querySelector('#color1').value;
    oGameData.colorPlayerTwo = document.querySelector("#color2").value;

    let tdElement = document.querySelectorAll('td');
    tdElement.forEach(removeText => {
        removeText.innerText = '';
        removeText.style.backgroundColor = '#ffffff';
    });
    let playerChar = 0;
    let playerName = 0;
    let playerColor = 0;

    let random = Math.random();
    console.log(random);
    
    if(random < 0.5) {
        playerChar = oGameData.playerOne;
        oGameData.currentPlayer = playerChar;
        playerName = oGameData.nickNamePlayerOne;
        playerColor = oGameData.colorPlayerOne;
    } else {
        playerChar = oGameData.playerTwo;
        oGameData.currentPlayer = playerChar;
        playerName = oGameData.nickNamePlayerTwo;
        playerColor = oGameData.colorPlayerTwo;
    }
    let whoPlay = document.querySelector('h1');
    whoPlay.innerText =`Aktuell spelare är ${playerName}`;

    let makeMove = document.querySelector('#gameArea');
    makeMove.addEventListener('click', executeMove);


}

function executeMove(event) {
    console.log('executeMove()');
    console.log(event.target);

    let cellBox = event.target.getAttribute('data-id');

    // Om spelare klicka i boxen
    if (event.target.tagName === 'TD' && oGameData.gameField[cellBox] === '') {
        oGameData.gameField[cellBox] = oGameData.currentPlayer;
        event.target.textContent = oGameData.currentPlayer;
        // Ändra bakgrundsfärgen baserat på vilken spelare som spelar
        if (oGameData.currentPlayer === oGameData.playerOne ) {
            event.target.style.backgroundColor = oGameData.colorPlayerOne;
            
        } else {
            event.target.style.backgroundColor = oGameData.colorPlayerTwo;

        }
    
        // Byter spelare samt ändrar h1 till den aktuella spelare
        if (oGameData.currentPlayer === oGameData.playerOne) {
            oGameData.currentPlayer = oGameData.playerTwo;
            document.querySelector('h1').textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`;
        } else {
            oGameData.currentPlayer = oGameData.playerOne;
            document.querySelector('h1').textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
        }
    
        const result = checkForGameOver();
        if (result !== 0) {
            gameOver(result);
        }
    }


}

function changePlayer() {
}

function timer() {

}

function gameOver(result) {
    console.log('gameOver()');

    const hideForm = document.querySelector('#theForm');
    hideForm.classList.remove('d-none');
    const hideGameArea = document.querySelector('#gameArea');
    hideGameArea.classList.add('d-none');

    let winnerName = "";
    if(result === 1) {
        document.querySelector('h1').textContent = `${oGameData.nickNamePlayerOne} vann! Spela igen?`;
    } else if (result === 2) {
        document.querySelector('h1').textContent = `${oGameData.nickNamePlayerTwo} vann! Spela igen?`;
    } else if (result === 3) {
        document.querySelector('h1').textContent = 'Oavgjort! Spela igen?';
    } else {
        console.log("Spelet fortsätter"); 
    }

    initGlobalObject();
}