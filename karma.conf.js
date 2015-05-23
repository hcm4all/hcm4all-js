// Karma configuration
// Generated on Tue May 19 2015 14:27:08 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/vendor/jquery.js',
      'src/*.js',
      'test/*.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    customLaunchers: {
      Chrome_sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
