define(['lib/exoskeleton', 'app/conf', 'app/util', 'app/cursor'],
        function (Backbone, conf, util, Cursor) {

    var Interactive = Backbone.View.extend({
        events: { 'mousemove': 'selectCell' },

        initialize: function (options) {
            this.c = options.canvas.getContext('2d')
            this.cursor = new Cursor({ c: this.c })
            this.setElement(options.canvas)
        },

        selectCell: function (event) {
            var rect = event.target.getBoundingClientRect(),
                x = event.clientX - rect.left - conf.VIEWPORT_WIDTH * 0.5,
                y = event.clientY - rect.top - conf.VIEWPORT_HEIGHT * 0.5,
                pos = util.hexagonal(x, y)
            this.c.clearRect(0, 0, conf.VIEWPORT_WIDTH, conf.VIEWPORT_HEIGHT)
            this.cursor.render(pos.u, pos.v)
        }
    })

    return Interactive
})
