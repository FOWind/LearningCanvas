var log = console.log.bind(console)
var __main = function() {
    var images = {
        ball: "./img/ball.png",
        paddle: "./img/paddle.png",
        block: "./img/block.png"
    }
    var game = GuaGame(images, function(game) {
        var s = Scene(game)
        game.runWithScene(s)
    })
    enableDebugMode(game, true)
}
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener("keydown", function(event) {
        var k = event.key
        if (k == "p") {
            paused = !paused
        } else if ("1234".includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })

    document.querySelector("#g_fps").addEventListener("input", function(event) {
        window.fps = event.target.value
    })
}
window.fps = 30
__main()
