const Game = {
    READY: false,
    score: 0,
    scoreElement: null,
    /** @type {HTMLCanvasElement} */
    gameCanvas: null,
    /** @type {CanvasRenderingContext2D} */
    gameCanvasContext: null,
    map: null,
    boundaries: [],
    pellets: [],
    powerUps: [],
    ghosts: [],
    player: null,
    keys: {
        z: {pressed: false},
        q: {pressed: false},
        s: {pressed: false},
        d: {pressed: false}
    },
    lastKey: '',
    init: function () {
        this.scoreElement = document.getElementById('score')
        this.gameCanvas = document.getElementById('TheGame')
        this.gameCanvasContext = this.gameCanvas.getContext('2d')
        this.gameCanvas.width = window.innerWidth
        this.gameCanvas.height = window.innerHeight

        this.initBoundaries()
        this.initPlayer()
        this.initGhosts()
        this.initMovementKeys()
        this.animate()

        this.READY = true
    },
    Boundary: class {
        static width =  40;
        static height =  40;

        constructor({ position, image }) {
            this.position = position
            this.width = 40
            this.height = 40
            this.image = image
        }

        draw() {
            Game.gameCanvasContext.drawImage(this.image, this.position.x, this.position.y)
        }
    },
    initBoundaries: function () {
        Game.map = [
            ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
            ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
            ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
            ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
            ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
            ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
            ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
            ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
            ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
            ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
            ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
            ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
            ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
        ]

        Game.map.forEach((row, i) => {
            row.forEach((symbol, j) => {
                switch (symbol) {
                    case '-':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: Game.Boundary.width * j,
                                    y: Game.Boundary.height * i
                                },
                                image: Game.createImage('images/pipeHorizontal.png')
                            })
                        )
                    break
                    case '|':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: Game.Boundary.width * j,
                                    y: Game.Boundary.height * i
                                },
                                image: Game.createImage('images/pipeVertical.png')
                            })
                        )
                    break
                    case '1':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: Game.Boundary.width * j,
                                    y: Game.Boundary.height * i
                                },
                                image: Game.createImage('images/pipeCorner1.png')
                            })
                        )
                    break
                    case '2':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: Game.Boundary.width * j,
                                    y: Game.Boundary.height * i
                                },
                                image: Game.createImage('images/pipeCorner2.png')
                            })
                        )
                    break
                    case '3':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: Game.Boundary.width * j,
                                    y: Game.Boundary.height * i
                                },
                                image: Game.createImage('images/pipeCorner3.png')
                            })
                        )
                    break
                    case '4':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: Game.Boundary.width * j,
                                    y: Game.Boundary.height * i
                                },
                                image: Game.createImage('images/pipeCorner4.png')
                            })
                        )
                    break
                    case 'b':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: Game.Boundary.width * j,
                                    y: Game.Boundary.height * i
                                },
                                image: Game.createImage('images/block.png')
                            })
                        )
                    break
                    case '[':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                image: Game.createImage('images/capLeft.png')
                            })
                        )
                    break
                    case ']':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                image: Game.createImage('images/capRight.png')
                            })
                        )
                    break
                    case '_':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                image: Game.createImage('images/capBottom.png')
                            })
                        )
                    break
                    case '^':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                image: Game.createImage('images/capTop.png')
                            })
                        )
                    break
                    case '+':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                image: Game.createImage('images/pipeCross.png')
                            })
                        )
                    break
                    case '5':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                color: 'blue',
                                image: Game.createImage('images/pipeConnectorTop.png')
                            })
                        )
                    break
                    case '6':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                color: 'blue',
                                image: Game.createImage('images/pipeConnectorRight.png')
                            })
                        )
                    break
                    case '7':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                color: 'blue',
                                image: Game.createImage('images/pipeConnectorBottom.png')
                            })
                        )
                    break
                    case '8':
                        Game.boundaries.push(
                            new Game.Boundary({
                                position: {
                                    x: j * Game.Boundary.width,
                                    y: i * Game.Boundary.height
                                },
                                image: Game.createImage('images/pipeConnectorLeft.png')
                            })
                        )
                    break
                    case '.':
                        Game.pellets.push(
                            new Game.Pellet({
                                position: {
                                    x: j * Game.Boundary.width + Game.Boundary.width / 2,
                                    y: i * Game.Boundary.height + Game.Boundary.height / 2
                                }
                            })
                        )
                    break
                    case 'p':
                        Game.powerUps.push(
                            new Game.PowerUp({
                                position: {
                                    x: j * Game.Boundary.width + Game.Boundary.width / 2,
                                    y: i * Game.Boundary.height + Game.Boundary.height / 2
                                }
                            })
                        )
                    break
                }
            })
        })
    },
    Player: class {
        constructor({position, velocity}) {
            this.position = position
            this.velocity = velocity
            this.radius = 15
            this.radians = 0.75
            this.openRate = 0.12
            this.rotation = 0
        }

        draw() {
            Game.gameCanvasContext.save()
            Game.gameCanvasContext.translate(this.position.x, this.position.y)
            Game.gameCanvasContext.rotate(this.rotation)
            Game.gameCanvasContext.translate(-this.position.x, -this.position.y)
            Game.gameCanvasContext.beginPath()
            Game.gameCanvasContext.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians)
            Game.gameCanvasContext.lineTo(this.position.x, this.position.y)
            Game.gameCanvasContext.fillStyle = 'yellow'
            Game.gameCanvasContext.fill()
            Game.gameCanvasContext.closePath()
            Game.gameCanvasContext.restore()
        }

        update() {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            if (this.radians < 0 || this.radians > 0.75) this.openRate = -this.openRate
            this.radians += this.openRate
        }
    },
    Ghost: class {
        static speed = 4
        constructor({position, velocity, color = 'red'}) {
            this.position = position
            this.velocity = velocity
            this.radius = 15
            this.color = color
            this.prevCollisions = []
            this.speed = 4
            this.scared = false
        }

        draw() {
            Game.gameCanvasContext.beginPath()
            Game.gameCanvasContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            Game.gameCanvasContext.fillStyle = this.scared ? 'blue' : this.color
            Game.gameCanvasContext.fill()
            Game.gameCanvasContext.closePath()
        }

        update() {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    },
    Pellet: class {
        constructor({position}) {
            this.position = position
            this.radius = 3
        }

        draw() {
            Game.gameCanvasContext.beginPath()
            Game.gameCanvasContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            Game.gameCanvasContext.fillStyle = 'white'
            Game.gameCanvasContext.fill()
            Game.gameCanvasContext.closePath()
        }
    },
    PowerUp: class {
        constructor({position}) {
            this.position = position
            this.radius = 8
        }

        draw() {
            Game.gameCanvasContext.beginPath()
            Game.gameCanvasContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            Game.gameCanvasContext.fillStyle = 'white'
            Game.gameCanvasContext.fill()
            Game.gameCanvasContext.closePath()
        }
    },
    initPlayer: function () {
        Game.player = new Game.Player({
            position: {
                x: Game.Boundary.width + Game.Boundary.width / 2,
                y: Game.Boundary.height + Game.Boundary.height / 2
            },
            velocity: {
                x: 0,
                y: 0
            }
        })
    },
    initGhosts: function () {
        Game.ghosts = [
            new Game.Ghost({
                position: {
                    x: Game.Boundary.width * 6 + Game.Boundary.width / 2,
                    y: Game.Boundary.height + Game.Boundary.height / 2
                },
                velocity: {
                    x: Game.Ghost.speed,
                    y: 0
                }
            }),
            new Game.Ghost({
                position: {
                    x: Game.Boundary.width * 6 + Game.Boundary.width / 2,
                    y: Game.Boundary.height * 3 + Game.Boundary.height / 2
                },
                velocity: {
                    x: Game.Ghost.speed,
                    y: 0
                },
                color: 'pink'
            })
        ]
    },
    initMovementKeys: function () {
        addEventListener('keydown', ({key}) => {
            switch (key) {
                case 'z':
                    Game.keys.z.pressed = true
                    Game.lastKey = 'z'
                break
                case 'q':
                    Game.keys.q.pressed = true
                    Game.lastKey = 'q'
                break
                case 's':
                    Game.keys.s.pressed = true
                    Game.lastKey = 's'
                break
                case 'd':
                    Game.keys.d.pressed = true
                    Game.lastKey = 'd'
                break
            }
        })

        addEventListener('keyup', ({key}) => {
            switch (key) {
                case 'z':
                    Game.keys.z.pressed = false
                break
                case 'q':
                    Game.keys.q.pressed = false
                break
                case 's':
                    Game.keys.s.pressed = false
                break
                case 'd':
                    Game.keys.d.pressed = false
                break
            }
        })
    },
    createImage: function (src) {
        const image = new Image();
        image.src = src
        return image
    },
    circleCollidesWithRectangle: function ({circle, rectangle}) {
        const padding = Game.Boundary.width / 2 - circle.radius - 1
        return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding && 
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding && 
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding)
    },
    animationId: null,
    animate: function () {
        Game.animationId = requestAnimationFrame(Game.animate)
        Game.gameCanvasContext.clearRect(0, 0, Game.gameCanvas.width, Game.gameCanvas.height)

        if (Game.keys.z.pressed && Game.lastKey === 'z') {
            for (let i = 0; i < Game.boundaries.length; i++) {
                const boundary = Game.boundaries[i]
                if (Game.circleCollidesWithRectangle({circle: {...Game.player, velocity: {x: 0, y: -5}}, rectangle: boundary})) {
                    Game.player.velocity.y = 0
                    break
                } else {
                    Game.player.velocity.y = -5
                }
            }
            
        } else if (Game.keys.q.pressed && Game.lastKey === 'q') {
            for (let i = 0; i < Game.boundaries.length; i++) {
                const boundary = Game.boundaries[i]
                if (Game.circleCollidesWithRectangle({circle: {...Game.player, velocity: {x: -5, y: 0}}, rectangle: boundary})) {
                    Game.player.velocity.x = 0
                    break
                } else {
                    Game.player.velocity.x = -5
                }
            }
        } else if (Game.keys.s.pressed && Game.lastKey === 's') {
            for (let i = 0; i < Game.boundaries.length; i++) {
                const boundary = Game.boundaries[i]
                if (Game.circleCollidesWithRectangle({circle: {...Game.player, velocity: {x: 0, y: 5}}, rectangle: boundary})) {
                    Game.player.velocity.y = 0
                    break
                } else {
                    Game.player.velocity.y = 5
                }
            }
        } else if (Game.keys.d.pressed && Game.lastKey === 'd') {
            for (let i = 0; i < Game.boundaries.length; i++) {
                const boundary = Game.boundaries[i]
                if (Game.circleCollidesWithRectangle({circle: {...Game.player, velocity: {x: 5, y: 0}}, rectangle: boundary})) {
                    Game.player.velocity.x = 0
                    break
                } else {
                    Game.player.velocity.x = 5
                }
            }
        }

        //Pelets collision here
        for (let i = (Game.pellets.length - 1); 0 <= i; i--) {
            const pellet = Game.pellets[i];
            pellet.draw()

            if (Math.hypot(pellet.position.x - Game.player.position.x, pellet.position.y - Game.player.position.y) < pellet.radius + Game.player.radius) {
                Game.pellets.splice(i, 1)
                Game.score += 10
                Game.scoreElement.innerHTML = Game.score
            }
        }

        // Ghost collision with player
        for (let i = (Game.ghosts.length - 1); 0 <= i; i--) {
            const ghost = Game.ghosts[i];

            if (Math.hypot(ghost.position.x - Game.player.position.x, ghost.position.y - Game.player.position.y) < ghost.radius + Game.player.radius) {
                if (ghost.scared) {
                    Game.ghosts.splice(i, 1)
                } else {
                    cancelAnimationFrame(Game.animationId)
                    console.log('you lose')
                }
            }
        }

        // Win the game
        if (Game.pellets.length === 0) {
            cancelAnimationFrame(Game.animationId)
            console.log('You WIN')
        }

        //PowerUp collision here
        for (let i = (Game.powerUps.length - 1); 0 <= i; i--) {
            const powerUp = Game.powerUps[i];
            powerUp.draw()

            if (Math.hypot(powerUp.position.x - Game.player.position.x, powerUp.position.y - Game.player.position.y) < powerUp.radius + Game.player.radius) {
                Game.powerUps.splice(i, 1)

                // Make ghost scared
                Game.ghosts.forEach(ghost => {
                    ghost.scared = true
                    setTimeout(() => {
                        ghost.scared = false
                    }, 5000)
                })
            }
        }

        //Boundaries collision here
        Game.boundaries.forEach((boundary) => {
            boundary.draw()

            if (Game.circleCollidesWithRectangle({circle: Game.player, rectangle: boundary})) {
                Game.player.velocity.x = 0
                Game.player.velocity.y = 0
            }
        })

        Game.player.update();

        //Ghost collision here
        Game.ghosts.forEach(ghost => {
            ghost.update()

            const collisions = []
            Game.boundaries.forEach(boundary => {
                if (!collisions.includes('right') && Game.circleCollidesWithRectangle({circle: {...ghost, velocity: {x: ghost.speed, y: 0}}, rectangle: boundary})) {
                    collisions.push('right')
                }
                if (!collisions.includes('left') && Game.circleCollidesWithRectangle({circle: {...ghost, velocity: {x: -ghost.speed, y: 0}}, rectangle: boundary})) {
                    collisions.push('left')
                }
                if (!collisions.includes('up') && Game.circleCollidesWithRectangle({circle: {...ghost, velocity: {x: 0, y: -ghost.speed}}, rectangle: boundary})) {
                    collisions.push('up')
                }
                if (!collisions.includes('down') && Game.circleCollidesWithRectangle({circle: {...ghost, velocity: {x: 0, y: ghost.speed}}, rectangle: boundary})) {
                    collisions.push('down')
                }

            })
            if (collisions.length > ghost.prevCollisions.length) {
                ghost.prevCollisions = collisions
            }
            if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
                if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
                if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
                if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
                if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

                const pathways = ghost.prevCollisions.filter(collision => {
                    return !collisions.includes(collision)
                })

                const direction = pathways[Math.floor(Math.random() * pathways.length)]

                switch (direction) {
                    case 'down':
                        ghost.velocity.y = ghost.speed
                        ghost.velocity.x = 0
                    break;
                    case 'up':
                        ghost.velocity.y = -ghost.speed
                        ghost.velocity.x = 0
                    break;
                    case 'right':
                        ghost.velocity.y = 0
                        ghost.velocity.x = ghost.speed
                    break;
                    case 'left':
                        ghost.velocity.y = 0
                        ghost.velocity.x = -ghost.speed
                    break;
                }
                ghost.prevCollisions = []
            }
        })

        if (Game.player.velocity.x > 0) Game.player.rotation = 0
        else if (Game.player.velocity.x < 0) Game.player.rotation = Math.PI
        else if (Game.player.velocity.y > 0) Game.player.rotation = Math.PI / 2
        else if (Game.player.velocity.y < 0) Game.player.rotation = Math.PI * 1.5
    }
}

window.onload = (e) => {
    if (!Game.READY) {
        Game.init()
    }
}