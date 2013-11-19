define(['lib/exoskeleton', 'app/conf'], function (Backbone, conf) {
    var Cell = Backbone.View.extend({
        initialize: function (options) {
            this.c = options.canvas.getContext('2d')
            this.u = options.u
            this.v = options.v
        },

        render: function () {
            this.c.save()
            this.c.translate(conf.VIEWPORT_WIDTH * 0.5 + conf.__ux * (this.u + this.v * 0.5) + 0.5,
                conf.VIEWPORT_HEIGHT * 0.5 + conf.__vy * this.v + 0.5)

            this.c.beginPath()
            this.c.moveTo(0, conf.CELL_HEIGHT_I * -0.5)
            this.c.lineTo(conf.CELL_WIDTH_I * 0.5, conf.CELL_HEIGHT_I * -0.25)
            this.c.lineTo(conf.CELL_WIDTH_I * 0.5, conf.CELL_HEIGHT_I * 0.25)
            this.c.lineTo(0, conf.CELL_HEIGHT_I * 0.5)
            this.c.lineTo(conf.CELL_WIDTH_I * -0.5, conf.CELL_HEIGHT_I * 0.25)
            this.c.lineTo(conf.CELL_WIDTH_I * -0.5, conf.CELL_HEIGHT_I * -0.25)
            this.c.closePath()

            this.c.fillStyle = conf.CELL_COLOR
            this.c.fill()
            this.c.restore()
        }
    })

    return Cell
})
