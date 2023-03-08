describe('test that site is working and up', () => {
    it('visit the localhost of the site', () => {
        cy.visit('http://localhost:3080')
    })
})