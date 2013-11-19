define(['lib/exoskeleton', 'app/conf', 'app/cell'], function (Backbone, conf, Cell) {
    var Board = Backbone.View.extend({
        initialize: function (options) {
            this.c = options.canvas.getContext('2d')
            this.size = options.size
            this.cells = {}
            this.everyCell(function (u, v) {
                this.cells[u] || (this.cells[u] = {})
                this.cells[u][v] = new Cell({canvas: options.canvas, u: u, v: v})
            })
        },

        render: function () {
            this.c.fillStyle = conf.BACK_COLOR
            this.c.fillRect(0, 0, conf.VIEWPORT_WIDTH, conf.VIEWPORT_HEIGHT)

            this.everyCell(function (u, v) { this.cells[u][v].render() })
        },

        everyCell: function (fun) {
            for (var u = -this.size; u < this.size + 1; ++u)
                for (var v = -this.size; v < this.size + 1; ++v)
                    if (Math.abs(u + v) < this.size + 1) fun.call(this, u, v)
        }
    })

    return Board
})
