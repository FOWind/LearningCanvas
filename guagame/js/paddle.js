var Paddle = function(game) {
    //var img = imgFromPath("paddle.png");
    // var o = {
    //   x: 125,
    //   y: 270,
    //   speed: 5,
    //   image: img
    // };

    var o = game.imgByName("paddle");
    o.x = 125;
    o.y = 270;
    o.speed = 5;
    o.moveLeft = function() {
        if (o.x - o.speed >= 0) {
            o.x -= o.speed;
        }
    };
    o.moveRight = function() {
        if (o.x + o.speed <= 250) {
            o.x += o.speed;
        }
    };
    o.collide = function(g_image) {
        if (g_image.y + g_image.image.height > o.y && g_image.y < o.y) {
            if (
                g_image.x + g_image.image.width > o.x &&
                g_image.x < o.x + o.image.width
            ) {
                return true;
            }
        }
        return false;
    };
    return o;
};
