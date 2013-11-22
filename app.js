require.config({
    map: {
        // don't 404
        'lib/exoskeleton': { jquery: 'lib/nil', underscore: 'lib/nil' }
    }
})

require(['lib/exoskeleton', 'app/conf', 'app/board'], function (Backbone, conf, Board) {
    var App = Backbone.Router.extend({
        canvas: {
            bg:          document.getElementById('bg'),
            interactive: document.getElementById('interactive')
        },
        routes: { '': 'start' },

        initialize: function () {
            for (var p in this.canvas) {
                if (this.canvas.hasOwnProperty(p)) {
                    this.canvas[p].width = conf.VIEWPORT_WIDTH
                    this.canvas[p].height = conf.VIEWPORT_HEIGHT
                }
            }
            this.board = new Board({
                canvas: this.canvas.bg,
                iCanvas: this.canvas.interactive,
                size: conf.BOARD_SIZE
            })
        },

        start: function () { this.board.render() }
    })

    new App
    Backbone.history.start()
})
