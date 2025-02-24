import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
  projectId: 'aviv-qa',
  e2e: {
    baseUrl: "http://localhost:5173/",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    chromeWebSecurity: false,
    video: true,
    videoCompression: 32,
    videoUploadOnPasses: false,
    screenshots: true,
    screenshotOnRunFailure: true,
    parallelization: {
      enabled: true,
      workers: 4
    },
    retries: {
      runMode: 2,
      openMode: 0
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      allureResultsPath: "allure-results"
    }
  },
});
