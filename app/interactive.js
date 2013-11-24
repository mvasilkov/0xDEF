define(['lib/exoskeleton', 'app/conf', 'app/util', 'app/cursor', 'app/cell'],
        function (Backbone, conf, util, Cursor, Cell) {

    function getPos(event) {
        var rect = event.target.getBoundingClientRect(),
            x = event.clientX - rect.left - conf.VIEWPORT_WIDTH * 0.5,
            y = event.clientY - rect.top - conf.VIEWPORT_HEIGHT * 0.5
        return util.hexagonal(x, y)
    }

    var Interactive = Backbone.View.extend({
        events: {
            mousemove: 'highlightCell',
            click:     'selectCell'
        },

        initialize: function (options) {
            this.app = options.app
            this.c = options.canvas.getContext('2d')
            this.setElement(options.canvas)

            this.cursor = new Cursor({ c: this.c, u: 0, v: 0 })
            this.cursor.color = null // means: cannot be used

            this.selected = new Cell({ c: this.c, u: 0, v: 0 })
            this.selected.color = null // same as above
        },

        render: function () {
            this.c.clearRect(0, 0, conf.VIEWPORT_WIDTH, conf.VIEWPORT_HEIGHT)
            if (this.cursor.color)   this.cursor.render()
            if (this.selected.color) this.selected.render()
        },

        highlightCell: function (event) {
            var pos = getPos(event)
            this.cursor.u = pos.u
            this.cursor.v = pos.v
            this.cursor.color = this.app.market.contains(pos.u, pos.v)?
                conf.MARKET_COLOR: this.app.board.contains(pos.u, pos.v)?
                conf.CURSOR_COLOR: null
        },

        selectCell: function (event) {
            var pos = getPos(event)
            this.selected.u = pos.u
            this.selected.v = pos.v
            this.selected.color = this.app.board.contains(pos.u, pos.v)?
                conf.CURSOR_COLOR: null
        }
    })

    return Interactive
})
