const display = document.querySelector('.dialogue');
const startBtn = document.querySelector('.startbtn');
const resetBtn = document.querySelector('.resetbtn');
const domGameBoard = document.querySelector('#gameboard');
let player1 = null;
let player2 = null;

function createPlayers(name, symbol) {
    return { name: name, symbol: symbol }
}






function Gameboard() {
    let gameboard = {
        "row1": [null, null, null],
        "row2": [null, null, null],
        "row3": [null, null, null]
    }

    // FUNCTION to log the board
    function printBoard() {
        // console.log(gameboard);
        return { ...gameboard }
    }

    function makeMove(row, column, symbol) {
        const keyToLookUp = `row${row}`
        // console.log(gameboard[keyToLookUp][column - 1]);
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

let board = Gameboard();

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
        console.log("Game has been reset. Play your first move.");
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
        console.log("Resetting Board....");
        display.innerText = `${winner.name}, with symbol ${symbol}, has won!<br>Press the 'Reset Game' button to play again.`
        winstate = true;
        return winstate;
    }

    function draw() {
        console.log("It's a Draw!!");
        console.log("Resetting Board...");
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
            console.log("Cell already taken!") // FOR HANDLING TAKEN CELLS
            return
        } else if (key === null) {
            board.makeMove(row, col, symbol);
        }

        state++
        evalMove(board.printBoard());
        console.log(board.printBoard());
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
        const name = prompt("Enter the name of the first player")
        const name2 = prompt("Enter the name of the second player")
        player1 = createPlayers(name, "X");
        player2 = createPlayers(name2, "O");
        display.innerText = "Make your moves!"
        g1.flipNameFlag();
        return { player1, player2 }
    });
})();

// Fix the input validation bug on entering names
// Put as much code into non-global states