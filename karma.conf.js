// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-spec-reporter"),
    ],
    client: {
      captureConsole: true,
      clearContext: false, // Leave Jasmine Spec Runner output visible in browser
    },
    browsers: ["ChromeHeadlessNoSandbox"],
    coverageReporter: {
      reporters: [
        {
          type: "text",
          dir: "coverage/",
          subdir: ".",
          file: "coverage.txt",
        },
        { type: "html" },
      ],
    },
    reporters: ["coverage", "spec"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    singleRun: true,
    restartOnFileChange: false,
    captureTimeout: 6000,
  });
};
