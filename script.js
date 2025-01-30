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
    newGame.addEventListener('click', validateForm);
}

function validateForm() {
    const nick1Input = document.querySelector('#nick1');
    const nick2Input = document.querySelector('#nick2');
    const color1Input = document.querySelector('#color1');
    const color2Input = document.querySelector('#color2');
    let errors = [];

        try {
            if (!nick1Input.value) {
                nick1Input.focus();
                throw new Error("Användarnamn för spelare 1 får inte vara tomt."); 
            } else if (nick1Input.value.length < 3 || nick1Input.value.length > 10) {
                nick1Input.focus();
                throw new Error("Användarnamn för spelare 1 måste vara mellan 3 och 10 tecken.");
            }

            if (!nick2Input.value) {
                nick2Input.focus();
                throw new Error("Användarnamn för spelare 2 får inte vara tomt.");
            } else if (nick2Input.value.length < 3 || nick2Input.value.length > 10) {
                nick2Input.focus();
                throw new Error("Användarnamn för spelare 2 måste vara mellan 3 och 10 tecken.");
            }

            if (!color1Input.value) {
                color1Input.focus();
                throw new Error("Färg för spelare 1 får inte vara tom.");
            } else if (color1Input.value === '#000000' ||  color1Input.value === '#ffffff') {
                color1Input.focus();
                throw new Error("Färgen för spelare 1 får inte vara svart eller vit.");
            }
            if (!color2Input.value) {
                color2Input.focus();
                throw new Error("Färg för spelare 2 får inte vara tom.");
            } else if (color2Input.value === '#000000' || color2Input.value === '#ffffff') {
                color2Input.focus();
                throw new Error("Färgen för spelare 2 får inte vara svart eller vit.");
            }

        } catch (error) {
            errors.push(error.message);
            document.querySelector('#errorMsg').textContent = (error.message);
        }
    
        if (errors.length > 0) {
            return errors;
        }

        initiateGame();
    }


function initiateGame() {
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

    let random = Math.random();
    console.log(random);
    
    if(random < 0.5) {
        playerChar = oGameData.playerOne;
        oGameData.currentPlayer = playerChar;
        playerName = oGameData.nickNamePlayerOne;
    } else {
        playerChar = oGameData.playerTwo;
        oGameData.currentPlayer = playerChar;
        playerName = oGameData.nickNamePlayerTwo;
    }
    let whoPlay = document.querySelector('h1');
    whoPlay.innerText =`Aktuell spelare är ${playerName}`;


    let makeMove = document.querySelector('#gameArea');
    makeMove.addEventListener('click', executeMove);
}

function executeMove(event) {
    const cellBox = event.target.getAttribute('data-id');

    if (event.target.tagName === 'TD' && oGameData.gameField[cellBox] === '') {
        oGameData.gameField[cellBox] = oGameData.currentPlayer;
        event.target.textContent = oGameData.currentPlayer;

        if (oGameData.currentPlayer === oGameData.playerOne) {
            event.target.style.backgroundColor = oGameData.colorPlayerOne;
        } else {
            event.target.style.backgroundColor = oGameData.colorPlayerTwo;
        }

        const result = checkForGameOver();
        if (result !== 0) {
            gameOver(result);
        } else {
            clearInterval(oGameData.timerId);//Stänger av tiden
            changePlayer(); //Byter spelare när någon har klickat
            oGameData.seconds = 6; //6 sekunder då det är 1 sekund delay så spelarna har 5 sekunder på sig
            timer(); //Startar timern
        }
    }
}

function changePlayer() { //Funktion för att byta spelare
    if (oGameData.currentPlayer === oGameData.playerOne) {
        oGameData.currentPlayer = oGameData.playerTwo;
        document.querySelector('h1').textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`;
    } else {
        oGameData.currentPlayer = oGameData.playerOne;
        document.querySelector('h1').textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
    }
}

function timer() {
    oGameData.timerId = setInterval(() => {
        oGameData.seconds -= 1; //Så timern räknar ner
        document.querySelector("#errorMsg").textContent = `Tid kvar: ${oGameData.seconds} s`; //Skriver ut nuvarande tid på skärmen

        if (oGameData.seconds <= 0) {
            clearInterval(oGameData.timerId);
            changePlayer(); //Byter spelare när tiden gått ut
            oGameData.seconds = 6;
            timer(); //Startar om timern
        }
    }, 1000);
}

function gameOver(result) {
    clearInterval(oGameData.timerId); //Stänger av tiden
    document.querySelector('#errorMsg').textContent = ''; //Tömmer p taggen när spelet är över
    const hideForm = document.querySelector('#theForm');
    hideForm.classList.remove('d-none');
    const hideGameArea = document.querySelector('#gameArea');
    hideGameArea.classList.add('d-none');

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