require.config({
    map: {
        // don't 404
        'lib/exoskeleton': { jquery: 'lib/nil', underscore: 'lib/nil' }
    }
})

require(['lib/exoskeleton', 'app/conf', 'app/board'], function (Backbone, conf, Board) {
    var App = Backbone.Router.extend({
        canvas: { bg: document.getElementById('bg') },
        routes: { '': 'start' },

        initialize: function () {
            this.canvas.bg.width = conf.VIEWPORT_WIDTH
            this.canvas.bg.height = conf.VIEWPORT_HEIGHT
            this.board = new Board({ canvas: this.canvas.bg, size: conf.BOARD_SIZE })
        },

        start: function () { this.board.render() }
    })

    new App
    Backbone.history.start()
})
