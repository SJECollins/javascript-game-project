const startBtn = document.getElementById("start")
const resetBtn = document.getElementById("reset")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const playerImg = new Image()
playerImg.src = "../assets/images/pirate/player.png"
const shipImg = new Image()
shipImg.src = "../assets/images/pirate/ship.png"
const compassImg = new Image()
compassImg.src = "../assets/images/pirate/compass.png"
const arrowImg = new Image()
arrowImg.src = "../assets/images/pirate/arrow.png"
const bgImg = new Image()
bgImg.src = "../assets/images/pirate/sea.png"

const gameWidth = 320
const gameHeight = 320
const tileSize = 32

let wind = {}
let playerShip = {}
let enemyShips = []
let lastTime = 0

class Background {
    constructor() {
        this.img = bgImg
        this.x = 0
        this.y = 0
        this.width = gameWidth
        this.height = gameHeight
        this.speed = 0.5
        this.windDirection = 0
    }
    draw(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height)
        
        if (this.x < 0 && this.y < 0) {
            context.drawImage(this.img, this.x + this.width - 1, this.y + this.height - 1, this.width, this.height);
        } else if (this.x < 0 && this.y > 0) {
            context.drawImage(this.img, this.x + this.width - 1, this.y - this.height + 1, this.width, this.height);
        } else if (this.x > 0 && this.y < 0) {
            context.drawImage(this.img, this.x - this.width + 1, this.y + this.height - 1, this.width, this.height);
        } else if (this.x > 0 && this.y > 0) {
            context.drawImage(this.img, this.x - this.width + 1, this.y - this.height + 1, this.width, this.height);
        }
    
        if (this.x < 0) {
            context.drawImage(this.img, this.x + this.width - 1, this.y, this.width, this.height);
        } else if (this.x > 0) {
            context.drawImage(this.img, this.x - this.width + 1, this.y, this.width, this.height);
        }
    
        if (this.y < 0) {
            context.drawImage(this.img, this.x, this.y + this.height - 1, this.width, this.height);
        } else if (this.y > 0) {
            context.drawImage(this.img, this.x, this.y - this.height + 1, this.width, this.height);
        }
    
        if (this.x + this.width < this.width) {
            context.drawImage(this.img, this.x + this.width - 1, this.y, this.width, this.height);
        } else if (this.x + this.width > this.width) {
            context.drawImage(this.img, this.x - this.width + 1, this.y, this.width, this.height);
        }
    
        if (this.y + this.height < this.height) {
            context.drawImage(this.img, this.x, this.y + this.height - 1, this.width, this.height);
        } else if (this.y + this.height > this.height) {
            context.drawImage(this.img, this.x, this.y - this.height + 1, this.width, this.height);
        }
    }
    update(player, wind) {
        if (player.sails > 0) {
            let speed = this.speed * player.sails
            let playerFacingRadians = player.angle

            let windDirectionObject = wind.directions.find(obj => Object.keys(obj)[0] === wind.direction)
            let windDirectionRadians = windDirectionObject ? Object.values(windDirectionObject)[0] : 0

            let angleDifference = playerFacingRadians - windDirectionRadians
    
            if (angleDifference > Math.PI) {
                angleDifference -= 2 * Math.PI
            } else if (angleDifference < -Math.PI) {
                angleDifference += 2 * Math.PI
            }

            let thresholdAngle = Math.PI / 4

            if (Math.abs(angleDifference) < thresholdAngle) {
                let backgroundMovementRadians = playerFacingRadians + Math.PI / 2
                let dx = speed * Math.cos(backgroundMovementRadians)
                let dy = speed * Math.sin(backgroundMovementRadians)

                this.x += dx
                this.y += dy

                if (this.x > this.width) {
                    this.x -= this.width
                } else if (this.x < -this.width) {
                    this.x += this.width
                }

                if (this.y > this.height) {
                    this.y -= this.height
                } else if (this.y < -this.height) {
                    this.y += this.height
                }
            }
        }
    }               
}

class Player {
    constructor() {
        this.img = playerImg
        this.x = 0
        this.y = 0
        this.width = tileSize * 2
        this.frameX = 0
        this.speed = 0
        this.sails = 0
        this.angle = 0
        this.sailsChangeTimer = 0
        this.sailsChangeInterval = 1000
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(gameWidth / 2, gameHeight / 2)
        ctx.rotate(this.angle)
        ctx.drawImage(this.img, this.frameX, 0, this.width, this.width, -this.width / 2, -this.width / 2, this.width, this.width)
        ctx.restore()
    }
    update(deltaTime) {
        if (input.keys.includes("KeyA")) {
            this.angle -= Math.PI / 180
        }
        if (input.keys.includes("KeyD")) {
            this.angle += Math.PI / 180
        }

        if (this.sailsChangeTimer > this.sailsChangeInterval) {
            if (input.keys.includes("KeyS") && this.sails > 0) {
                this.sails--
                this.frameX -= 64
                this.sailsChangeTimer = 0
            }
            if (input.keys.includes("KeyW") && this.sails < 2) {
                this.sails++
                this.frameX += 64
                this.sailsChangeTimer = 0
            }            
        } else {
            this.sailsChangeTimer += deltaTime
        }

        if (input.keys.includes("Space")) {
            console.log("Fire")
        }
    }
}

class EnemyShip {
    constructor() {
        this.img = shipImg
        this.x = posX
        this.y = posY
        this.width = tileSize * 2
        this.height = tileSize * 2
        this.frameX = 0
        this.speed = 0
        this.sails = 0
    }
    draw(ctx) {}
    update() {}
}

class Wind {
    constructor() {
        this.compass = compassImg
        this.arrow = arrowImg
        this.width = tileSize
        this.x = gameWidth - tileSize
        this.y = 0
        this.changeDirectionTimer = 0
        this.changeDirectionInterval = Math.random() * 10000 + 10000
        this.directions = [{"N": 0}, {"NE": Math.PI/4}, 
            {"E": Math.PI/2}, {"SE": 3*Math.PI/4}, {"S": Math.PI}, 
            {"SW": -3*Math.PI/4}, {"W": -Math.PI/2}, {"NW": -Math.PI/4}]
        this.direction = "N"
    }
    draw(ctx) {
        ctx.drawImage(this.compass, this.x, this.y)
        ctx.translate(this.x + this.width / 2, this.y + this.width / 2)
        let directionObj = this.directions.find(obj => Object.keys(obj)[0] === this.direction)
        let angle = directionObj ? Object.values(directionObj)[0] : 0
        ctx.rotate(angle)
        ctx.drawImage(this.arrow, -this.width / 2, -this.width / 2)
        ctx.rotate(-angle)
        ctx.translate(-(this.x + this.width / 2), -(this.y + this.width / 2))
    }
    update(deltaTime) {
        if (this.changeDirectionTimer > this.changeDirectionInterval) {
            let randomDirection = this.directions[Math.floor(Math.random() * this.directions.length)]
            this.direction = Object.keys(randomDirection)[0]
            this.changeDirectionTimer = 0
            this.changeDirectionInterval = Math.random() * 10000 + 10000
        } else {
            this.changeDirectionTimer += deltaTime
        }
    }
}

class InputHandler {
    constructor() {
        this.keys = []
        window.addEventListener("keydown", (e) => {
            if ((e.code == "KeyW" ||
                 e.code == "KeyD" ||
                 e.code == "KeyS" ||
                 e.code == "KeyA" ||
                 e.code == "Space")
                 && this.keys.indexOf(e.code) === -1) {
                    this.keys.push(e.code)
                 }
        })
        window.addEventListener("keyup", (e) => {
            if (e.code == "KeyW" ||
                e.code == "KeyD" ||
                e.code == "KeyS" ||
                e.code == "KeyA" ||
                e.code == "Space") {
                this.keys.splice(this.keys.indexOf(e.code), 1)
                }
        })
    }
}

const startGame = () => {
    // Spawn the map and player boat
    wind = new Wind()
    playerShip = new Player()
    startBtn.removeEventListener("click", startGame)
    runGame(0)
}

const input = new InputHandler()
const background = new Background()

const runGame = (timeStamp) => {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, gameWidth, gameWidth)
    // draw and update stuff
    background.draw(ctx)
    background.update(playerShip, wind)
    wind.draw(ctx)
    wind.update(deltaTime)

    playerShip.draw(ctx)
    playerShip.update(deltaTime)
    requestAnimationFrame(runGame)
}

startBtn.addEventListener("click", startGame)
resetBtn.addEventListener("click", () => {
    location.reload()
})