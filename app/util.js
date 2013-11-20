define(['app/conf'], function (conf) {
    var util = {},
        __R3 = Math.sqrt(3)

    // recount (uv to xy)
    util.viewport = {
        x: function (u, v) { return __R3 * conf.CELL_SIZE_O * (u + 0.5 * v) },
        y: function (v) { return 1.5 * conf.CELL_SIZE_O * v }
    }

    return util
})
