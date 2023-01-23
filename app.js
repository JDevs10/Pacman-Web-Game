const Game = {
    READY: false,
    /** @type {HTMLCanvasElement} */
    gameCanvas: null,
    /** @type {CanvasRenderingContext2D} */
    gameCanvasContext: null,
    map: null,
    init: function () {
        this.gameCanvas = document.getElementById('TheGame')
        this.gameCanvasContext = this.gameCanvas.getContext('2d')
        this.gameCanvas.width = window.innerWidth
        this.gameCanvas.height = window.innerHeight

        this.initBoundaries();

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

        const boundaries = []

        Game.map.forEach((row, i) => {
            row.forEach((symbol, j) => {
                switch (symbol) {
                    case '-':
                        boundaries.push(
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

        boundaries.forEach((boundary) => {boundary.draw()})
    }
}

window.onload = (e) => {
    if (!Game.READY) {
        Game.init()
    }
}