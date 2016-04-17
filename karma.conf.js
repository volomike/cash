module.exports = function(config) {
  config.set({

    preprocessors: {
      'test/testmocha.html': ['html2js']
    },

    basePath: '',
    frameworks: ['mocha', 'should'],
    //browsers: ['Chrome'],
    files: [

        "dist/cash.js",
        "test/testmocha.html",
        "test/karma.test.js"

    ],

    singleRun: false,
    colors: true

  });
};
