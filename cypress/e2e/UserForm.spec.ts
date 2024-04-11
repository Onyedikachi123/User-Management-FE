describe('UserForm', () => {
    beforeEach(() => {
      cy.visit('/UserForm'); 
    });
  
    it('should add a new user when the form is submitted', () => {
      cy.get('#userName').type('John Doe');
      cy.get('#userEmail').type('john@example.com');
      cy.get('#userUsername').type('john_doe');
      cy.get('#phone').type('1234567890');
      cy.get('#website').type('www.johndoe.com');
      cy.get('button[type="submit"]').click();
  
    
    });
  });