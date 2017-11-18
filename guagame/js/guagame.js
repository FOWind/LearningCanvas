var GuaGame = function(images, runCallback) {
    // images参数是要载入的图片的对象，里面是图片的引用名字和路径
    // 当所有图片载入结束之后，程序才开始执行
    var g = {
        actions: {},
        keydowns: {},
        images: [],
        scene: null
    }
    var canvas = document.querySelector("#id-canvas")
    var context = canvas.getContext("2d")

    g.canvas = canvas
    g.context = context

    g.drawImage = function(g_image) {
        g.context.drawImage(g_image.image, g_image.x, g_image.y)
    }

    g.replaceScene = function(scene) {
        g.scene = scene
    }
    var loaded = []
    // 预载入图片资源
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        g.images[name] = img
        img.onload = function() {
            loaded.push(1)
            // 所有图片加载完毕之后执行g.run()
            if (loaded.length == names.length) {
                g.run()
            }
        }
    }

    g.imgByName = function(name) {
        var img = g.images[name]
        var o = {
            image: img
        }
        return o
    }

    // events
    window.addEventListener("keydown", function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener("keyup", function(event) {
        g.keydowns[event.key] = false
    })

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer

    // update
    g.update = function() {
        g.scene.update()
    }
    // draw
    g.draw = function() {
        g.scene.draw()
    }
    var runloop = function() {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        setTimeout(runloop, 1000 / window.fps)
    }

    g.runWithScene = function(scene) {
        g.scene = scene
        setTimeout(runloop, 1000 / window.fps)
    }
    // 主程序
    g.run = function(scene) {
        runCallback(g)
    }
    return g
}
