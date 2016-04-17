
module.exports = function(config) {

  config.set({

    preprocessors: {

      'test/index.html': ['html2js'],
      'dist/cash.js': ['coverage']

    },

    reporters: [

        'mocha',
        'coverage'

    ],

    coverageReporter: {

        dir: 'test/coverage',
        reporters: [
            { type: 'text-summary' },
            { type: 'html', subdir: './' }
        ]

    },

    basePath: '',

    frameworks: [

        'mocha',
        'should'
    ],

    browsers: [

        'Chrome',
        'IE',
        //'Firefox',
        //'Opera',
        //'Safari',
        'PhantomJS'

    ],

    files: [

        'dist/cash.js',
        'test/index.html',

        'test/scripts/setup.js',
        'test/scripts/core.js',
        'test/scripts/utilities.js',
        'test/scripts/selection.js',
        'test/scripts/collection.js',
        'test/scripts/traversal.js',
        'test/scripts/manipulation.js'

    ],

    colors: true

  });
};
