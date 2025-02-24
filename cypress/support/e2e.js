import '@shelex/cypress-allure-plugin';

beforeEach(() => {
  cy.log('Test started');
});

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    // Add screenshot to Allure report
    cy.allure().attachment(
      'Screenshot',
      cy.screenshot({ capture: 'runner' }),
      'image/png'
    );
  }
}); 