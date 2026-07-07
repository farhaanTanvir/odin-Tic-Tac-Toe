// OBJ constructor for Players
// Constructor will have playerData, symbol (1/2)
// Keep function for making moves outside of players. too much hard-coding otherwise




/* function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol; // 1 = X, 2 = O
}

const player1 = new Player("Player 1", 1);
const player2 = new Player("Player 2", 2); */

function createPlayers() {
    const player1 = new Object();
    const player2 = new Object();
    player1.name = "Player 1";
    player2.name = "Player 2";
    player1.symbol = 1;
    player2.symbol = 2;
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
        console.log(gameboard)
    }



    // Function for delivering a move inside the board
    // function should take: Move, row, column

    function makeMove(row, column) { // symbol omitted for testing
        const keyToLookUp = `row${row}`
        console.log(gameboard[keyToLookUp][column - 1])
    }

    // IMPLEMENT THE "REPLACE WITH VALUE" SYSTEM
    // Grabbing the gameboard is already implemented

    return { printBoard, makeMove }
}

let board = Gameboard();

board.printBoard()

board.makeMove(3, 1)

