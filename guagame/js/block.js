var Block = function(game, positionX, positionY) {
    // var img = imgFromPath("block.png");
    // var o = {
    //   image: img,
    //   alive: true,
    //   x: positionX,
    //   y: positionY
    // };

    var o = game.imgByName("block")
    o.alive = true
    o.x = positionX
    o.y = positionY

    o.collide = function(ball) {
        if (ball.y > o.y && o.y + o.image.height > ball.y) {
            if (
                ball.x + ball.image.width > o.x &&
                o.x + o.image.width > ball.x
            ) {
                return true
            }
        }
        return false
    }
    o.kill = function() {
        o.alive = false
    }
    return o
}
