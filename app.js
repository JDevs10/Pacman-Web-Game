const Game = {
    READY: false,
    /** @type {HTMLCanvasElement} */
    gameCanvas: null,
    /** @type {CanvasRenderingContext2D} */
    gameCanvasContext: null,
    map: null,
    boundaries: [],
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

        constructor({ position }) {
            this.position = position
            this.width = 40
            this.height = 40
        }

        draw() {
            Game.gameCanvasContext.fillStyle = 'blue'
            Game.gameCanvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    },
    initBoundaries: function () {
        Game.map = [
            ['-', '-', '-', '-', '-', '-'],
            ['-', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', '-', '-', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '-'],
            ['-', '-', '-', '-', '-', '-']
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
    animate: function () {
        requestAnimationFrame(Game.animate)
        Game.gameCanvasContext.clearRect(0, 0, Game.gameCanvas.width, Game.gameCanvas.height)
        Game.boundaries.forEach((boundary) => {boundary.draw()})
        Game.player.update();

        Game.player.velocity.x = 0
        Game.player.velocity.y = 0

        if (Game.keys.z.pressed && Game.lastKey === 'z') {
            Game.player.velocity.y = -5
        } else if (Game.keys.q.pressed && Game.lastKey === 'q') {
            Game.player.velocity.x = -5
        } else if (Game.keys.s.pressed && Game.lastKey === 's') {
            Game.player.velocity.y = 5
        } else if (Game.keys.d.pressed && Game.lastKey === 'd') {
            Game.player.velocity.x = 5
        }
    }
}

window.onload = (e) => {
    if (!Game.READY) {
        Game.init()
    }
}