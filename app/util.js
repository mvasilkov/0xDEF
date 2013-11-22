define(['app/conf'], function (conf) {
    var util = {},
        __R3 = Math.sqrt(3),
        __1$3SIZE = 1 / (3 * conf.CELL_SIZE_O)

    // recount (uv to xy)
    util.viewport = {
        x: function (u, v) { return __R3 * conf.CELL_SIZE_O * (u + 0.5 * v) },
        y: function (v) { return 1.5 * conf.CELL_SIZE_O * v }
    }

    // recount (xy to uv)
    util.hexagonal = function (x, y) {
        var u = __1$3SIZE * (__R3 * x - y),
            v = __1$3SIZE * 2 * y,
            w = -u - v,
            ru = Math.round(u),
            rv = Math.round(v),
            rw = Math.round(w),
            du = Math.abs(ru - u),
            dv = Math.abs(rv - v),
            dw = Math.abs(rw - w)
        if (du > dv && du > dw)
            ru = -rv - rw
        else if (dv > dw)
            rv = -ru - rw
        return { u: 0|ru, v: 0|rv }
    }

    return util
})
