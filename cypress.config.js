import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: "test/cypress/support/e2e.js",
    specPattern: "test/cypress/e2e/spec.cy.js"
  },
  fixturesFolder: "test/cypress/fixtures",
  videosFolder: "test/cypress/videos",
  downloadsFolder: "test/cypress/downloads",
  screenshotsFolder: "test/cypress/screenshots",
});
