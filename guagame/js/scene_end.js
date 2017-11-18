var SceneEnd = function(game) {
    var s = {
        game: game
    }
    s.draw = function() {
        game.context.fillText("游戏结束", 150, 150)
    }

    s.update = function() {
        return
    }
    return s
}
