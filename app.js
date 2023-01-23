const Game = {
    READY: false,
    gameCanvas: null,
    gameCanvasContext: null,
    init: function () {
        this.gameCanvas = document.getElementById('TheGame')
        this.gameCanvasContext = this.gameCanvas.getContext('2d')
        this.gameCanvas.width = window.innerWidth
        this.gameCanvas.height = window.innerHeight
        App.READY = true
    }
}

window.onload = (e) => {
    if (!Game.READY) {
        Game.init()
    }
}