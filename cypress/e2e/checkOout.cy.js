describe('Checkout tests', () => {

    beforeEach( () => {

        cy.visit('/');
        cy.loginFromUI(Cypress.env('username'), Cypress.env('password'));
    });

    it('Validate the checkout process', () => {
        // searching an item from the search bar
        cy.get('#twotabsearchtextbox').type('iphone 13 pro case{enter}');
        // finding the first element in the appeared list
        cy.get('[data-index]').eq(2).find('img[class="s-image"]').eq(0).click();
        // adding the element to cart
        cy.get('#add-to-cart-button').click();
        // go to Cart to validate the item existence
        cy.get('#sw-gtc').click();
        // making sure the item is in the cart. Of course there is a better way by checking the API response data
        cy.get('[data-asin]').eq(0).find('span[class="a-truncate-full a-offscreen"]')
            .invoke('text').then(itemText => {
                expect(itemText.toLowerCase()).to.include('iphone 13');
                expect(itemText.toLocaleLowerCase()).to.include('case');
            });
        cy.get('#desktop-ptc-button-celWidget').find('div[class="sc-without-multicart"]')
            .invoke('text').then(buttonText => {
                cy.wrap(buttonText).should('include', 'Proceed to checkout');
            });
        cy.get('#desktop-ptc-button-celWidget').click();

        // and the last step of this flow is to place the order, which is not done to not waste money ;)

    });
});