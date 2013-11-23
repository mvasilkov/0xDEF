define(['lib/exoskeleton', 'app/conf', 'app/cell'], function (Backbone, conf, Cell) {
    var Market = Backbone.View.extend({
        initialize: function (options) {
            var u = conf.BOARD_SIZE + 3, v = -conf.BOARD_SIZE
            this.c = options.canvas.getContext('2d')
            this.cells = Array(3)
            for (var n = 0; n < this.cells.length; ++n) {
                this.cells[n] = new Cell({ c: this.c, u: u, v: v++ })
                this.cells[n].color = conf.MARKET_COLOR
            }
        },

        render: function () {
            for (var n = 0; n < this.cells.length; ++n)
                this.cells[n].render()
        },

        contains: function (u, v) {
            v += conf.BOARD_SIZE
            return u == conf.BOARD_SIZE + 3 && v > -1 && v < this.cells.length
        }
    })

    return Market
})
