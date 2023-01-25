describe('Login to amazon website', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });
  
  
  it('Correct login case', () => {
    cy.get('#nav-link-accountList')
      .should('be.visible')
      .click();
    cy.location('pathname').should('include', '/ap/signin')
    cy.get('#ap_email').type(Cypress.env('username'));
    cy.get('#continue').invoke('text').then(buttonText => {
      expect(buttonText).to.include('Continue')
    })
    cy.get('#continue').click();
    cy.location('pathname').should('include', '/ap/signin');
    cy.get('#ap_password').type(Cypress.env('password'));

    cy.get('#auth-signin-button-announce').invoke('text').then(buttonText1 => {
      console.log('button text is ', buttonText1);
      expect(buttonText1).to.include('Sign in');
    })
    cy.get('#signInSubmit').click();
    // assuming we know the NAME of the user which is inserted during the registration
    // we can get this name from the authenticate API response data
    // cy.get('#nav-link-accountList-nav-line-1').should('have.text', 'Hello, Nane');
    cy.get('#nav-link-accountList').click();
    cy.get('div[class="a-row a-spacing-base"]').invoke('text').then(text => {
      expect(text).to.include('Your Account');
    })
    // more assertions goes here, we can validate the API response status code as well after the login and many more
  });


})