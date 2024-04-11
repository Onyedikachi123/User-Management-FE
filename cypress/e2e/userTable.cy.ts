describe('UserTable', () => {
    beforeEach(() => {
      cy.visit('/'); // Adjust this to the path where your UserTable component is rendered
    });
  
    it('displays a list of users', () => {
      cy.get('table').within(() => {
        cy.get('tbody tr').should('have.length', 2);
        cy.get('tbody tr').first().within(() => {
          cy.get('td').eq(0).should('contain', '1');
          cy.get('td').eq(1).should('contain', 'John Doe');
          cy.get('td').eq(2).should('contain', 'johndoe');
          cy.get('td').eq(3).should('contain', 'john@example.com');
          cy.get('td').eq(4).find('a').should('have.text', 'View Details').and('have.attr', 'href', '/userdetail/1');
        });
      });
    });
  });
  