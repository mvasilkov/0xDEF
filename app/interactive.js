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
        },

        render: function () {
            this.c.clearRect(0, 0, conf.VIEWPORT_WIDTH, conf.VIEWPORT_HEIGHT)
            if (this.cursor)   this.cursor.render()
            if (this.selected) this.selected.render()
        },

        highlightCell: function (event) {
            var pos = getPos(event)

            if (this.cursor) {
                this.cursor.u = pos.u
                this.cursor.v = pos.v
            }
            else this.cursor = new Cursor({ c: this.c, u: pos.u, v: pos.v })

            this.cursor.color = this.app.market.contains(pos.u, pos.v)?
                conf.MARKET_COLOR: conf.CURSOR_COLOR
        },

        selectCell: function (event) {
            var pos = getPos(event)

            if (this.selected) {
                this.selected.u = pos.u
                this.selected.v = pos.v
            }
            else {
                this.selected = new Cell({ c: this.c, u: pos.u, v: pos.v })
                this.selected.color = conf.CURSOR_COLOR
            }
        }
    })

    return Interactive
})
