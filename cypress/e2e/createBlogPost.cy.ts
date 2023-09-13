describe('start app', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.wait(2000)
  })
})

describe('Add BlogPost', () => {
  it('should fill in email and password fields', () => {
    cy.visit("localhost:3000/login")
    cy.wait(2000)
    cy.get('#email').type('admin@example.com');
    cy.get('#password').type('1234');
    cy.get('#email').should('have.value', 'admin@example.com');
    cy.get('#password').should('have.value', '1234');
    cy.wait(2000)
    cy.get('.MuiButtonBase-root').click();
    cy.wait(2000)
    cy.get('.MuiBox-root > :nth-child(4)').click();
    cy.wait(2000)
    cy.get('.MuiButton-contained').click();
    cy.wait(2000)
    cy.get('#title').type('cypress test');
    cy.get('#text').type('this is an cypress test from cypress');
    cy.get('#category').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.wait(2000)
    cy.get('form > :nth-child(3)').click();
    cy.get('.MuiButton-containedSuccess').click();
  });
});