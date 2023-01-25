const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    $schema: 'https://on.cypress.io/cypress.schema.json',
    baseUrl: 'https://www.amazon.com/',
    defaultCommandTimeout: 6000,
    experimentalRunAllSpecs: true
  },
});
