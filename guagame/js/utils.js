var imgFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var loadLevel = function(game, k) {
    var bs = []
    var p = levels[k - 1]

    for (var i = 0; i < p.length; i++) {
        var b = Block(game, p[i][0], p[i][1])
        bs.push(b)
    }
    return bs 
}
 