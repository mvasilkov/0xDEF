require.config({
    map: {
        // don't 404
        'lib/exoskeleton': { jquery: 'lib/nil', underscore: 'lib/nil' }
    }
})

require(['lib/exoskeleton', 'app/conf', 'app/board', 'app/market', 'app/interactive'],
        function (Backbone, conf, Board, Market, Interactive) {

    var App = Backbone.Router.extend({
        canvas: {
            bg:          document.getElementById('bg'),
            interactive: document.getElementById('interactive')
        },

        routes: { '': 'start' },

        initialize: function () {
            var container = document.getElementsByClassName('container')[0]
            container.style.width = conf.VIEWPORT_WIDTH + 'px'
            container.style.height = conf.VIEWPORT_HEIGHT + 'px'

            for (var p in this.canvas) {
                if (this.canvas.hasOwnProperty(p)) {
                    this.canvas[p].width = conf.VIEWPORT_WIDTH
                    this.canvas[p].height = conf.VIEWPORT_HEIGHT
                }
            }

            this.board       = new Board({ app: this, canvas: this.canvas.bg })
            this.market      = new Market({ app: this, canvas: this.canvas.bg })
            this.interactive = new Interactive({ app: this, canvas: this.canvas.interactive })
        },

        start: function () {
            this.board.render()
            this.market.render()
        }
    })

    var app = new App

    // start with an empty route
    location.hash = '#'
    Backbone.history.start()
    ~
    (function render() {
        requestAnimationFrame(render)
        app.interactive.render()
    }())
})
