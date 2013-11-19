require.config({
    map: {
        // don't 404
        'lib/exoskeleton': { jquery: 'lib/nil', underscore: 'lib/nil' }
    }
})

require(['lib/exoskeleton'], function (Backbone) {
})
