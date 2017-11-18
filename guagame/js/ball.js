var Ball = function(game) {
    // var img = imgFromPath("ball.png");
    // var o = {
    //   x: 0,
    //   y: 270,
    //   speedX: 10,
    //   speedY: 10,
    //   fired: false,
    //   image: img
    // };
    var o = game.imgByName("ball")
    o.x = 100
    o.y = 150
    o.speedX = 10
    o.speedY = 10
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    // 点击点离球上侧的偏移量
    o.offsetTop = 0
    // 点击点离球左侧的偏移量
    o.offsetLeft = 0
    o.dragable = false
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.isIn = function(position) {
        var p = position
        var x = p[0]
        var y = p[1]
        if (o.x < x && x < o.x + o.image.width) {
            if (o.y < y && y < o.y + o.image.height) {
                return true
            }
        }
        return false
    }

    // 根据点击点，设置点击点离求左侧和上的偏移量
    o.setOffset = function(x, y) {
        o.offsetLeft = x - o.x
        o.offsetTop = y - o.y
    }
    // 根据偏移值计算托拽后球的新坐标
    o.calPosition = function(x, y) {
        o.x = x - o.offsetLeft
        o.y = y - o.offsetTop
    }
    return o
}
