import { defineConfig } from "cypress";

export default defineConfig({
  numTestsKeptInMemory: 5,
  chromeWebSecurity: false,
  waitForAnimations: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  videoCompression: false,
  pageLoadTimeout: 120000,
  responseTimeout: 120000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://med.retinus.io/",
    supportFile: "tests/e2e/support/e2e.ts",
    specPattern: "./tests/e2e/specs/**/*?(.{cy,spec}).{js,jsx,ts,tsx}",
    fixturesFolder: "tests/e2e/fixtures/",
    screenshotsFolder: "tests/e2e/screenshots",
    videosFolder: "tests/e2e/videos",
  },
  component: {
    supportFile: "tests/component/support/component.ts",
    specPattern: "tests/component/cy/**/*.cy.{js,jsx,ts,tsx}",
    indexHtmlFile: "tests/component/html/component-index.html",
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
});
