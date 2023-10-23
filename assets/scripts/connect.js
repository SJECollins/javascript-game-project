const startBtn = document.getElementById("start")
const playBtn = document.getElementById("save-options")
const board = document.getElementById("play-area")
const hoverArea = document.getElementById("hover-area")

// Game variables
const gameVars = {
    player1: "red",
    player2: "yellow",
    computer: true,
    current: "",
    gameOver: false,
}

// The columns
const columns = {
    colOne: ["_1", "_8", "_15", "_22", "_29", "_36"],
    colTwo: ["_2", "_9", "_16", "_23", "_30", "_37"],
    colThree: ["_3", "_10", "_17", "_24", "_31", "_38"],
    colFour: ["_4", "_11", "_18", "_25", "_32", "_39"],
    colFive: ["_5", "_12", "_19", "_26", "_33", "_40"],
    colSix: ["_6", "_13", "_20", "_27", "_34", "_41"],
    colSeven: ["_7", "_14", "_21", "_28", "_35", "_42"],
}

// Select players
const selectPlayers = () => {
    let players = document.getElementsByName("human-computer")
    let colours = document.getElementsByName("colours")

    for (let i = 0; i < 2; i++) {
        if (players[i].checked) {
            if (players[i].value == "human") {
                gameVars.computer = false
                document.querySelector("#versus").innerHTML = "Two Player"
            } else {
                gameVars.computer = true
                document.querySelector("#versus").innerHTML = "Vs Computer"
            }
        }
        if (colours[i].checked) {
            if (colours[i].value == "red") {
                gameVars.player1 = "red"
                gameVars.player2 = "yellow"
            } else {
                gameVars.player1 = "yellow"
                gameVars.player2 = "red"
            }
        }
    }

    document.querySelector("#player1-colour").innerHTML = gameVars.player1
    document.querySelector("#player2-colour").innerHTML = gameVars.player2

    document.querySelector("#options").style.display = "none"
    createBoard()
    gameVars.current = gameVars.player1
}

// Generate the board
const createBoard = () => {
    for (let i = 0; i < 42; i++) {
        const spot = document.createElement("div")
        spot.classList.add("spot")
        spot.classList.add("_" + (i + 1))
        spot.addEventListener("click", addDisc)
        spot.addEventListener("mouseover", hoverDisc)
        spot.addEventListener("mouseout", removeHover)
        board.appendChild(spot)
    }

    for (let i = 0; i < 7; i++) {
        const hoverspot = document.createElement("div")
        hoverspot.classList.add("hover-disc")
        hoverspot.classList.add("hover" + i)
        hoverArea.appendChild(hoverspot)
    }
}

// Hovering disc over board
const hoverDisc = (event) => {
    const hovered = event.target
    let classes = Array.from(hovered.classList)

    if (checkClasses(columns.colOne, classes)) {
        let disc = document.querySelector(".hover0")
        disc.classList.add(gameVars.current)
    } else if (checkClasses(columns.colTwo, classes)) {
        let disc = document.querySelector(".hover1")
        disc.classList.add(gameVars.current)
    } else if (checkClasses(columns.colThree, classes)) {
        let disc = document.querySelector(".hover2")
        disc.classList.add(gameVars.current)
    } else if (checkClasses(columns.colFour, classes)) {
        let disc = document.querySelector(".hover3")
        disc.classList.add(gameVars.current)
    } else if (checkClasses(columns.colFive, classes)) {
        let disc = document.querySelector(".hover4")
        disc.classList.add(gameVars.current)
    } else if (checkClasses(columns.colSix, classes)) {
        let disc = document.querySelector(".hover5")
        disc.classList.add(gameVars.current)
    } else if (checkClasses(columns.colSeven, classes)) {
        let disc = document.querySelector(".hover6")
        disc.classList.add(gameVars.current)
    } else {
        console.log("What?")
    }
}

// Remove the hovering disc
const removeHover = (event) => {
    const hovered = event.target
    let classes = Array.from(hovered.classList)

    if (checkClasses(columns.colOne, classes)) {
        let disc = document.querySelector(".hover0")
        disc.classList.remove(gameVars.player1, gameVars.player2)
    } else if (checkClasses(columns.colTwo, classes)) {
        let disc = document.querySelector(".hover1")
        disc.classList.remove(gameVars.player1, gameVars.player2)
    } else if (checkClasses(columns.colThree, classes)) {
        let disc = document.querySelector(".hover2")
        disc.classList.remove(gameVars.player1, gameVars.player2)
    } else if (checkClasses(columns.colFour, classes)) {
        let disc = document.querySelector(".hover3")
        disc.classList.remove(gameVars.player1, gameVars.player2)
    } else if (checkClasses(columns.colFive, classes)) {
        let disc = document.querySelector(".hover4")
        disc.classList.remove(gameVars.player1, gameVars.player2)
    } else if (checkClasses(columns.colSix, classes)) {
        let disc = document.querySelector(".hover5")
        disc.classList.remove(gameVars.player1, gameVars.player2)
    } else if (checkClasses(columns.colSeven, classes)) {
        let disc = document.querySelector(".hover6")
        disc.classList.remove(gameVars.player1, gameVars.player2)
    } else {
        console.log("What?")
    }
}

// Adding a disc to the board
const addDisc = (event) => {
    const clicked = event.target
    let classes = Array.from(clicked.classList)

    if (checkClasses(columns.colOne, classes)) {
        checkColumn(columns.colOne, 1)
    } else if (checkClasses(columns.colTwo, classes)) {
        checkColumn(columns.colTwo, 2)
    } else if (checkClasses(columns.colThree, classes)) {
        checkColumn(columns.colThree, 3)
    } else if (checkClasses(columns.colFour, classes)) {
        checkColumn(columns.colFour, 4)
    } else if (checkClasses(columns.colFive, classes)) {
        checkColumn(columns.colFive, 5)
    } else if (checkClasses(columns.colSix, classes)) {
        checkColumn(columns.colSix, 6)
    } else if (checkClasses(columns.colSeven, classes)) {
        checkColumn(columns.colSeven, 7)
    } else {
        console.log("What?")
    }
}

// Which column did the user click?
const checkClasses = (column, classes) => {
    return classes.some(item => {
        return column.includes(item);
    });
}

// Check if discs are in column, drop disc in empty spot - should be called placeDisc really
const checkColumn = (column, columnNumber) => {
    for (let i = column.length - 1; i >= 0; i--) {
        const spot = document.querySelector(`.${column[i]}`)
        let classes = Array.from(spot.classList)
        if (!classes.includes("disc")) {
            spot.classList.add("disc", gameVars.current)
            return checkBoard(columnNumber, i)
        }
    }
}

// Swap players
const changePlayer = () => {
    if (gameVars.current == gameVars.player1) {
        gameVars.current = gameVars.player2
    } else {
        gameVars.current = gameVars.player1
    }
}

// Either end game or change player
const checkBoard = (colNum, rowNum) => {
    let allSpots = document.querySelectorAll(".spot")
    let spotArray = Array.from(allSpots)
    let spots = []
    for (let i = 0; i < spotArray.length; i += 7) {
        const row = spotArray.slice(i, i + 7)
        spots.push(row)
    }
    if (checkSpots(spots, colNum, rowNum)) {
        return endGame()
    } else {
        return changePlayer()
    }

}

// Find winning combo
const checkSpots = (spots, col, row) => {
    col = col - 1
    // Right
    if (col < 4) {
        let num = 0
        for (let i = 0; i < 4; i++) {    
            let spot = Array.from(spots[row][col + i].classList)
            if (spot.includes(gameVars.current)) {
                num += 1
            }            
            if (num == 4) return true
        }        
    }
    // Left
    if (col > 2) {
        let num = 0
        for (let i = 0; i < 4; i++) {
            let spot = Array.from(spots[row][col - i].classList)
            if (spot.includes(gameVars.current)) {
                num += 1
            }
            if (num == 4) return true
        }        
    }
    // Down
    if (row < 3) {
        let num = 0
        for (let i = 0; i < 4; i++) {
            let spot = Array.from(spots[row + i][col].classList)
            if (spot.includes(gameVars.current)) {
                num += 1
            }
            if (num == 4) return true
        }        
    }
    // Right down
    if (row < 3 && col < 4) {
        let num = 0
        for (let i = 0; i < 4; i++) {
            let spot = Array.from(spots[row + i][col + i].classList)
            if (spot.includes(gameVars.current)) {
                num += 1
            }
            if (num == 4) return true
        }        
    }
    //Left down
    if (row < 3 && col > 2) {
        let num = 0
        for (let i = 0; i < 4; i++) {    
            let spot = Array.from(spots[row + i][col - i].classList)
            if (spot.includes(gameVars.current)) {
                num += 1
            }
            if (num == 4) return true
        }        
    }
    // Right Up
    if (row > 2 && col < 4) {
        let num = 0
        for (let i = 0; i < 4; i++) {    
            let spot = Array.from(spots[row - i][col + i].classList)
            if (spot.includes(gameVars.current)) {
                num += 1
            }
            if (num == 4) return true
        }        
    }
    // Left up
    if (row > 2 && col > 2) {
        let num = 0
        for (let i = 0; i < 4; i++) {
            let spot = Array.from(spots[row - i][col - i].classList)
            if (spot.includes(gameVars.current)) {
                num += 1
            }
            if (num == 4) return true
        }        
    }
    return false
}

// End game
const endGame = () => {
    document.querySelector("#game-over").style.display = "block"
    if (gameVars.current == gameVars.player1) {
        document.querySelector("#result").innerHTML = "Player One wins!"
    } else {
        document.querySelector("#result").innerHTML = "Player Two wins!"
    }
}

// Start game
const startGame = () => {
    startBtn.removeEventListener("click", startGame)
    document.getElementById("options").style.display = "block"
    playBtn.addEventListener("click", selectPlayers)
}

startBtn.addEventListener("click", startGame)