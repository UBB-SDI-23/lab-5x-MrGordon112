describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.visit('http://localhost:3000/#/mechanics')
    cy.visit('http://localhost:3000/#/carTypes')
    cy.visit('http://localhost:3000/#/login')
    cy.visit('http://localhost:3000/#/signup')
    cy.visit('http://localhost:3000/#/login')

  })
})