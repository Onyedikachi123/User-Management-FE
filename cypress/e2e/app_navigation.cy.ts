describe('App Navigation', () => {
  it('navigates to the user detail page', () => {
    cy.visit('/').wait(2000); // Increase the wait time
    cy.get('a[href="/userdetail"]').should('be.visible').and('not.be.disabled').click();
    cy.url().should('include', '/userdetail');
  });
});
