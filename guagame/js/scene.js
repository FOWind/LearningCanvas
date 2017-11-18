var Scene = function(game) {
    var s = {
        game: game
    }
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0

    var blocks = []
    for (var i = 0; i < 3; i++) {
        var b = Block(game, i * 20, i * 30)
        blocks.push(b)
    }

    game.registerAction("a", function() {
        paddle.moveLeft()
    })
    game.registerAction("d", function() {
        paddle.moveRight()
    })
    game.registerAction("f", function() {
        ball.fire()
    })

    //拖动事件

    var draggable = false

    game.canvas.addEventListener("mousedown", function(event) {
        if (ball.isIn([event.offsetX, event.offsetY])) {
            // offsetTop = event.offsetY - ball.y;
            // offsetLeft = event.offsetX - ball.x;
            ball.setOffset(event.offsetX, event.offsetY)
            draggable = true
        } else {
            draggable = false
        }
    })
    game.canvas.addEventListener("mousemove", function(event) {
        if (!draggable) {
            return
        }
        log("mousemove")
        var moveX = event.offsetX
        var moveY = event.offsetY
        ball.calPosition(moveX, moveY)
    })
    game.canvas.addEventListener("mouseup", function(event) {
        draggable = false
    })
    s.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].alive) {
                game.drawImage(blocks[i])
            }
        }
        game.context.fillText("Score:" + score, 10, 290)
    }

    s.update = function() {
        if (paused) {
            return
        }
        ball.move()
        if (ball.y > paddle.y) {
            var end = SceneEnd(game)
            game.replaceScene(end)
        }
        if (paddle.collide(ball)) {
            ball.speedY = -ball.speedY
        }
        for (var index = 0; index < blocks.length; index++) {
            if (blocks[index].collide(ball) && blocks[index].alive) {
                score++
                blocks[index].kill()
                ball.speedY = -ball.speedY
            }
        }
    }
    return s
}
