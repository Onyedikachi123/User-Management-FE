describe('UserDetail', () => {
    it('should display user details', () => {
      cy.visit('/userdetail/1');
  
      cy.contains('John Doe');
      cy.contains('john.doe@example.com');
    });
  
    it('should display an error message if the fetch fails', () => {
      cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
        statusCode: 500,
      }).as('fetchUser');
  
      cy.visit('/userdetail/1');
  
      cy.wait('@fetchUser');
      cy.contains('Failed to fetch user details');
    });
  });
  