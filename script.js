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



    // Function for delivering a move inside the board
    // function should take: Move, row, column

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


    // Also, make a function for resetting the gameboard back to nulls, for future use when it's time to reset.

    return { printBoard, makeMove, resetBoard }
}

let board = Gameboard();

// board.makeMove(3, 1, "tanvir");
// board.makeMove(2, 2, "tanvir");
// board.makeMove(1, 3, "tanvir");
// console.log(board.printBoard());
// board.resetBoard();
// console.log(board.printBoard());


function GameState() {
    let state = 1;

    function win() {
        console.log("Winner Found!")
        console.log("Resetting Board....")
        // logic for resetting game:
    }

    function draw() {
        console.log("It's a Draw!!");
        console.log("Resetting Board...")
        // reset logic:
    }



    function passMove(row, col) {
        let symbol;
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
        return state
    }

    function evalMove(Board) {
        let boardHolder = { ...Board };

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


        console.log(boardHolder)
        const r1c1 = boardHolder["row1"][0]
        const r1c2 = boardHolder["row1"][1]
        const r1c3 = boardHolder["row1"][2]
        const r2c1 = boardHolder["row2"][0]
        const r2c2 = boardHolder["row2"][1]
        const r2c3 = boardHolder["row2"][2]
        const r3c1 = boardHolder["row3"][0]
        const r3c2 = boardHolder["row3"][1]
        const r3c3 = boardHolder["row3"][2]


        if (state > 9) {
            draw();
        } else if (r1c1 === r2c2 && r2c2 === r3c3) {
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
        } else { console.log("nothin'") }

    }

    function getState() {
        console.log(state)
    }



    // think about how you'll figure out WHICH player wins afterwards, but first just make it to deduct any side as the winner

    return { passMove, getState, evalMove }

}

let g1 = GameState();

console.log(board.printBoard());





// SANDBOX

/* let boardHolder = {
    "row1": ["X", "O", "X"],
    "row2": ["X", "O", "O"],
    "row3": ["O", "X", null]
}

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
console.log(boardHolder) */