context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/login')
  })
    it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
        cy.get('.action_username')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')})
    it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
        cy.get('.action_password')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')})

    it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
        cy.visit('http://localhost:3000/#/sign_up')
        cy.get('.action_username')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')})
    it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type

        cy.visit('http://localhost:3000/#/sign_up')
        cy.get('.action_password')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')})
    it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type

        cy.visit('http://localhost:3000/#/sign_up')
        cy.get('.action_email')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')})
    it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type

        cy.visit('http://localhost:3000/#/sign_up')
        cy.get('.action_password2')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')})
})

