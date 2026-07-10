function createPlayers() {
    const player1 = new Object();
    const player2 = new Object();
    player1.name = "Player 1";
    player2.name = "Player 2";
    player1.symbol = 1;
    player2.symbol = 5;
    // console.log({ player1, player2 });
    function getPlayer1() {
        return { ...player1 };
    }

    function getPlayer2() {
        return { ...player2 };
    }

    return { getPlayer1, getPlayer2 }
}



const players = createPlayers();

// console.log(players.getPlayer2().symbol)

// console.log(players.player2.name)


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

    function resetGame() {
        board.resetBoard();
        state = 1;
        console.log("Game has been reset. Play your first move.");
        return state
    }

    function win() {
        let winner;
        if (symbol === "X") {
            winner = "Player 1"
        } else if (symbol === "O") {
            winner = "Player 2"
        }
        console.log(`${winner}, with symbol ${symbol}, has won!`);
        console.log("Resetting Board....");
        resetGame();
    }

    function draw() {
        console.log("It's a Draw!!");
        console.log("Resetting Board...");
        resetGame();
    }



    function passMove(row, col) {
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
        let boardHolder = structuredClone(Board); // THIS was the bug, claude. I changed the spread with this structuredClone thing once AI told me.

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

    function getState() {
        console.log(state)
    }

    return { passMove, getState, evalMove }

}

let g1 = GameState();

console.log(board.printBoard());



