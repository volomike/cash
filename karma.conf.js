
module.exports = function(config) {

  config.set({

    preprocessors: {

      'test/testmocha.html': ['html2js'],
      'dist/cash.js': ['coverage']

    },

    reporters: [

        'dots',
        'coverage'

    ],

    coverageReporter: {

        dir: 'dist/reports/coverage',
        reporters: [{ type: 'html', subdir: 'report-html' }]

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
        'test/testmocha.html',
        'test/karma.test.js'

    ],

    colors: true

  });
};
