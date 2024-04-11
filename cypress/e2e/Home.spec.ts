describe('Home', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('should open and close the modal for adding a new user', () => {
      // Click the "Add User" button to open the modal
      cy.get('button').contains('Add User').click();
      cy.contains('Add User').should('be.visible'); // Check if the modal title is correct
  
      // Close the modal
      cy.get('button').contains('Close').click();
      cy.contains('Add User').should('not.exist'); // Check if the modal is closed
    });
  });