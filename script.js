const display = document.querySelector('.dialogue');
let player1 = null;
let player2 = null;

// Failed to encapsulate code above this comment too. Cuz these are variables we'll need in the global scope. They're used in 2 different functions.

function Gameboard() {
    let gameboard = {
        "row1": [null, null, null],
        "row2": [null, null, null],
        "row3": [null, null, null]
    }

    function printBoard() {
        return { ...gameboard }
    }

    function makeMove(row, column, symbol) {
        const keyToLookUp = `row${row}`
        gameboard[keyToLookUp][column - 1] = symbol;
        return gameboard
    }

    function resetBoard() {
        gameboard = {
            "row1": [null, null, null],
            "row2": [null, null, null],
            "row3": [null, null, null]
        }
        return gameboard
    }

    return { printBoard, makeMove, resetBoard }
}

let board = Gameboard(); // I HAVE FAILED TO ENCAPSULATE THIS. This is called in two different functions, so zero idea how I'd remove this from global scope

function GameState() {
    let state = 1;
    let symbol;
    let winstate = false;
    let hasNames = false;

    function flipNameFlag() {
        hasNames = true
        return hasNames
    }

    function resetGame() {
        board.resetBoard();
        state = 1;
        winstate = false;
        return { state, winstate }
    }

    function win() {
        let winner;
        if (symbol === "X") {
            winner = player1
        } else if (symbol === "O") {
            winner = player2
        }
        display.innerText = `${winner.name}, with symbol ${symbol}, has won! Press the 'Reset Game' button to play again.`
        winstate = true;
        return winstate;
    }

    function draw() {
        display.innerText = `It's a draw!!`
        winstate = true;
        return winstate;
    }

    function passMove(row, col) {
        if (winstate === true) { return }
        if (hasNames === false) { return }

        if (state % 2 === 0) {
            symbol = "O";
        } else if (state % 2 === 1) {
            symbol = "X";
        }
        let boardHolder = board.printBoard()
        const keyToLookUp = `row${row}`
        const key = boardHolder[keyToLookUp][col - 1]
        if (key !== null) {
            return
        } else if (key === null) {
            board.makeMove(row, col, symbol);
        }

        state++
        evalMove(board.printBoard());
        return state
    }

    function evalMove(Board) {
        let boardHolder = structuredClone(Board);

        boardHolder["row1"].forEach((item, index, array) => {
            if (item === "X" || item === "O") {
                return

            } else { array[index] = Math.random(); }
        })

        boardHolder["row2"].forEach((item, index, array) => {
            if (item === "X" || item === "O") {
                return

            } else { array[index] = Math.random(); }
        })

        boardHolder["row3"].forEach((item, index, array) => {
            if (item === "X" || item === "O") {
                return

            } else { array[index] = Math.random(); }
        })

        const r1c1 = boardHolder["row1"][0]
        const r1c2 = boardHolder["row1"][1]
        const r1c3 = boardHolder["row1"][2]
        const r2c1 = boardHolder["row2"][0]
        const r2c2 = boardHolder["row2"][1]
        const r2c3 = boardHolder["row2"][2]
        const r3c1 = boardHolder["row3"][0]
        const r3c2 = boardHolder["row3"][1]
        const r3c3 = boardHolder["row3"][2]

        if (r1c1 === r2c2 && r2c2 === r3c3) {
            win() // corner 1 
        } else if (r1c3 === r2c2 && r2c2 === r3c1) {
            win() // corner 2
        } else if (r1c1 === r1c2 && r1c2 === r1c3) {
            win() // row 1
        } else if (r2c1 === r2c2 && r2c2 === r2c3) {
            win() // row 2
        } else if (r3c1 === r3c2 && r3c2 === r3c3) {
            win() // row 3
        } else if (r1c1 === r2c1 && r2c1 === r3c1) {
            win() // column 1
        } else if (r1c2 === r2c2 && r2c2 === r3c2) {
            win() // column 2
        } else if (r1c3 === r2c3 && r2c3 === r3c3) {
            win() // column 3
        } else if (state > 9) { draw() }

    }

    return { passMove, resetGame, flipNameFlag }
}

function renderBoard() {
    let boardHolder = structuredClone(board.printBoard());
    const r1c1 = boardHolder["row1"][0];
    const r1c2 = boardHolder["row1"][1];
    const r1c3 = boardHolder["row1"][2];
    const r2c1 = boardHolder["row2"][0];
    const r2c2 = boardHolder["row2"][1];
    const r2c3 = boardHolder["row2"][2];
    const r3c1 = boardHolder["row3"][0];
    const r3c2 = boardHolder["row3"][1];
    const r3c3 = boardHolder["row3"][2];

    const cell11 = document.querySelector('.r1-1');
    const cell12 = document.querySelector('.r1-2');
    const cell13 = document.querySelector('.r1-3');
    const cell21 = document.querySelector('.r2-1');
    const cell22 = document.querySelector('.r2-2');
    const cell23 = document.querySelector('.r2-3');
    const cell31 = document.querySelector('.r3-1');
    const cell32 = document.querySelector('.r3-2');
    const cell33 = document.querySelector('.r3-3');

    cell11.innerText = r1c1;
    cell12.innerText = r1c2;
    cell13.innerText = r1c3;
    cell21.innerText = r2c1;
    cell22.innerText = r2c2;
    cell23.innerText = r2c3;
    cell31.innerText = r3c1;
    cell32.innerText = r3c2;
    cell33.innerText = r3c3;
}

(function () {
    let g1 = GameState();
    const startBtn = document.querySelector('.startbtn');
    const resetBtn = document.querySelector('.resetbtn');
    const domGameBoard = document.querySelector('#gameboard');

    function createPlayers(name, symbol) {
        return { name: name, symbol: symbol }
    }

    domGameBoard.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell') === false) { return }
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        g1.passMove(row, column);
        renderBoard();
    });

    resetBtn.addEventListener('click', () => {
        g1.resetGame();
        renderBoard();
        display.innerText = "Make your moves!"
    });

    startBtn.addEventListener('click', () => {
        if (player1 !== null) { return }
        const name = prompt("Enter the name of the first player");
        const name2 = prompt("Enter the name of the second player");
        player1 = createPlayers(name, "X");
        player2 = createPlayers(name2, "O");
        display.innerText = "Make your moves!"
        g1.flipNameFlag();
        return { player1, player2 }
    });
})();

/* CLOSING */

// 4 Lines failed to remove from the global scope. And I have no idea how to lol.

// Input validation for entering names has been skipped. entering the wrong type dosen't break the game, so it's not necessary. If someone's got numbers in their names, then that's their business. So I won't bother

// Finished: 14 July 2026. Farhan Tanvir

