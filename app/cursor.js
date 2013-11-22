define(['lib/exoskeleton', 'app/conf', 'app/util'], function (Backbone, conf, util) {
    var Cursor = Backbone.View.extend({
        initialize: function (options) { this.c = options.c },

        render: function (u, v) {
            this.c.save()
            this.c.translate(conf.VIEWPORT_WIDTH * 0.5 + util.viewport.x(u, v) + 0.5,
                conf.VIEWPORT_HEIGHT * 0.5 + util.viewport.y(v) + 0.5)

            this.c.beginPath()
            this.c.moveTo(0, conf.CELL_HEIGHT_O * -0.5)
            this.c.lineTo(conf.CELL_WIDTH_O * 0.5, conf.CELL_HEIGHT_O * -0.25)
            this.c.lineTo(conf.CELL_WIDTH_O * 0.5, conf.CELL_HEIGHT_O * 0.25)
            this.c.lineTo(0, conf.CELL_HEIGHT_O * 0.5)
            this.c.lineTo(conf.CELL_WIDTH_O * -0.5, conf.CELL_HEIGHT_O * 0.25)
            this.c.lineTo(conf.CELL_WIDTH_O * -0.5, conf.CELL_HEIGHT_O * -0.25)
            this.c.closePath()

            this.c.lineWidth = 3
            this.c.strokeStyle = conf.CURSOR_COLOR
            this.c.stroke()
            this.c.restore()
        }
    })

    return Cursor
})
