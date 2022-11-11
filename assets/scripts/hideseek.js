const reset = document.getElementById("reset")
const start = document.getElementById("start")
const display = document.getElementById("message")
const input = document.getElementById("user-input")
const userBtn = document.getElementById("user-answer")

let player = "Stranger"
let i = 0
let speed = 100
let roomIndex = 1

let gameVars = {
    player: "",
    window_closed: false,
    door_open: false,
    stool_out: false,
    shadow_delayed: false,
}

let pickUps = []

function typewriter(text) {
    let output = text
    if (i < output.length) {
        display.innerHTML += output.charAt(i)
        i++
        setTimeout(typewriter, speed, output)
    }
}

function clearOutput() {
    display.innerHTML = ""
}

function clearInput() {
    input.value = ""
}

start.addEventListener("click", () => {
   startGame()
})

function startGame() {
    showGameRoom(1)
    userBtn.addEventListener("click", compareChoice, false)
}

function showGameRoom(roomIndex) {
    i = 0
    clearOutput()
	let gameRoom = gameRooms.find(gameRoom => gameRoom.room === roomIndex)
    let roomText = gameRoom.text
    typewriter(roomText)
    console.log("This is the roomtext: " + roomText)
    console.log("This is the roomIndex leaving the func: " + gameRoom.room)
    console.log(gameRoom)
} 

function compareChoice() {
    let userChoice = input.value.trim().toLowerCase()
	let gameRoom = gameRooms.find(gameRoom => gameRoom.room === roomIndex)
    console.log("This is the userChoice: " + userChoice)
    console.log("This is the roomIndex coming into the function: " + gameRoom.room)
    let options = gameRoom.options
    console.log("These are the room options: " + options)
    console.log(options)
    if (options.some(option => option.choice === userChoice)){
        for (const option of options) {
            if (option.choice === userChoice) {
                roomIndex = option.nextRoom
                console.log("This is the nextRoom: " + roomIndex)
                return showGameRoom(roomIndex)
                }
            }
    } else {
        display.innerHTML += "That is not an option. Try again.<br>"
            return showGameRoom(gameRoom.room)
    }
}

const gameRooms = [
    {
        room: 1,
        text: "Do you want to play a game?",
        options: [
            {
                choice: "a",
                nextRoom: 2,
            },
            {
                choice: "b",
                nextRoom: 2,
            }
        ]
    },
    {
        room: 2,
        text: "Well, you made it to the next room.",
        options: [
            {
                choice: "a",
                nextRoom: 3,
            },
            {
                choice: "b",
                nextRoom: 3,
            }
        ]
    },
    {
        room: 3,
        text: "And then the next room.",
        options: [
            {
                choice: "a",
                nextRoom: 4,
            },
            {
                choice: "b",
                nextRoom: 4,
            }
        ]
    },
    {
        room: 4,
        text: "And this is another room.",
        options: [
            {
                choice: "a",
                nextRoom: 5,
            },
            {
                choice: "b",
                nextRoom: 5,
            }
        ]
    },

]