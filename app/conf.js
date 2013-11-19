define(function () {
    var conf = {
        VIEWPORT_WIDTH: 960,
        BACK_COLOR: '#778188',
        CELL_COLOR: '#c4d6d6',
        // size_i < size_o
        CELL_SIZE_I: 26,
        CELL_SIZE_O: 30,
        DEBUG_CELL_UV: 1
    }
    // viewport is 16:9
    conf.VIEWPORT_HEIGHT = 0|conf.VIEWPORT_WIDTH * 0.5625
    var r3by2 = Math.sqrt(3) * 0.5
    'IO'.split('').forEach(function (s) {
        conf['CELL_HEIGHT_' + s] = 0|conf['CELL_SIZE_' + s] * 2
        conf['CELL_WIDTH_' + s] = 0|conf['CELL_HEIGHT_' + s] * r3by2 + 0.5
    })
    conf.BOARD_SIZE = computeBoardSize()
    // recount (uv to xy)
    conf.__ux = conf.CELL_SIZE_O * Math.sqrt(3)
    conf.__vy = conf.CELL_SIZE_O * 1.5
    return conf

    function computeBoardSize() {
        var size = 1
        while ((size * 1.5 + 1) * conf.CELL_HEIGHT_O < conf.VIEWPORT_HEIGHT)
            ++size
        return size - 1
    }
})
