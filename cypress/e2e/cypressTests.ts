describe('start app', () => {
  it('passes', () => {
    cy.visit('http://sandro.uek.dev.noseryoung.ch')
    cy.wait(2000)
  })
})

describe('login and registration', () => {
  it('should fill in email and password fields', () => {
    cy.visit("http://sandro.uek.dev.noseryoung.ch/login")
    cy.wait(2000)
    cy.get('#email').type('admin@example.com');
    cy.get('#password').type('1234');
    cy.get('#email').should('have.value', 'admin@example.com');
    cy.get('#password').should('have.value', '1234');
    cy.wait(2000)
    cy.get('.MuiTypography-body1 > .MuiTypography-root').click();
    cy.get('h1').should('contain', 'Create an account!');
    cy.wait(2000)
  });
});

describe('blogs', () => {
  it('get blogs', () => {
    cy.visit("http://sandro.uek.dev.noseryoung.ch")
    cy.wait(2000)
    cy.get('.MuiBox-root > :nth-child(2)').click();
    cy.wait(2000)
    cy.get('p').should('contain', 'Seite 1');
  });
});