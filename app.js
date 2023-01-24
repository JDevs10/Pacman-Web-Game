const Game = {
    READY: false,
    /** @type {HTMLCanvasElement} */
    gameCanvas: null,
    /** @type {CanvasRenderingContext2D} */
    gameCanvasContext: null,
    map: null,
    boundaries: [],
    pellets: [],
    player: null,
    keys: {
        z: {pressed: false},
        q: {pressed: false},
        s: {pressed: false},
        d: {pressed: false}
    },
    lastKey: '',
    init: function () {
        this.gameCanvas = document.getElementById('TheGame')
        this.gameCanvasContext = this.gameCanvas.getContext('2d')
        this.gameCanvas.width = window.innerWidth
        this.gameCanvas.height = window.innerHeight

        this.initBoundaries()
        this.initPlayer()
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
            // Game.gameCanvasContext.fillStyle = 'blue'
            // Game.gameCanvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
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
                }
            })
        })
    },
    Player: class {
        constructor({position, velocity}) {
            this.position = position
            this.velocity = velocity
            this.radius = 15
        }

        draw() {
            Game.gameCanvasContext.beginPath()
            Game.gameCanvasContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            Game.gameCanvasContext.fillStyle = 'yellow'
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
            Game.gameCanvasContext.fillStyle = 'with'
            Game.gameCanvasContext.fill()
            Game.gameCanvasContext.closePath()
        }
    },
    initPlayer: function () {
        Game.player = new this.Player({
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
        return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && 
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y && 
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
    },
    animate: function () {
        requestAnimationFrame(Game.animate)
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

        Game.pellets.forEach((pellet) => {
            pellet.draw()
        })

        Game.boundaries.forEach((boundary) => {
            boundary.draw()

            if (Game.circleCollidesWithRectangle({circle: Game.player, rectangle: boundary})) {
                Game.player.velocity.x = 0
                Game.player.velocity.y = 0
            }
        })
        Game.player.update();

        // Game.player.velocity.x = 0
        // Game.player.velocity.y = 0
    }
}

window.onload = (e) => {
    if (!Game.READY) {
        Game.init()
    }
}