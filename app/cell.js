define(['lib/exoskeleton', 'app/conf', 'app/util'], function (Backbone, conf, util) {
    var Cell = Backbone.View.extend({
        initialize: function (options) {
            this.c = options.c
            this.u = options.u
            this.v = options.v
            this.color = conf.CELL_COLOR
        },

        render: function () {
            this.c.save()
            this.c.translate(conf.VIEWPORT_WIDTH * 0.5 + util.viewport.x(this.u, this.v) + 0.5,
                conf.VIEWPORT_HEIGHT * 0.5 + util.viewport.y(this.v) + 0.5)

            this.c.beginPath()
            this.c.moveTo(0, conf.CELL_HEIGHT_I * -0.5)
            this.c.lineTo(conf.CELL_WIDTH_I * 0.5, conf.CELL_HEIGHT_I * -0.25)
            this.c.lineTo(conf.CELL_WIDTH_I * 0.5, conf.CELL_HEIGHT_I * 0.25)
            this.c.lineTo(0, conf.CELL_HEIGHT_I * 0.5)
            this.c.lineTo(conf.CELL_WIDTH_I * -0.5, conf.CELL_HEIGHT_I * 0.25)
            this.c.lineTo(conf.CELL_WIDTH_I * -0.5, conf.CELL_HEIGHT_I * -0.25)
            this.c.closePath()

            this.c.fillStyle = this.color
            this.c.fill()
            if (conf.DEBUG_CELL_UV) {
                this.c.font = '12px Consolas, Monaco, monospace'
                this.c.textBaseline = 'middle'
                this.c.fillStyle = conf.BACK_COLOR
                this.c.fillText('u=' + this.u, -12, -5)
                this.c.fillText('v=' + this.v, -12, 5)
            }
            this.c.restore()
        }
    })

    return Cell
})
