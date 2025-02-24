import LoginPage from '../pages/loginPage'

describe('Login Tests', () => {
    beforeEach(() => {
        // ARRANGE
        LoginPage.visit()
    })

    it('should login successfully with valid user credentials', () => {
        // ACT
        LoginPage.loginAsUser()
        // ASSERT
        cy.url().should('include', '/dashboard')
        LoginPage.verifyLoggedInUser('user')
    })

    it('should login successfully with valid agent credentials', () => {
        // ACT
        LoginPage.loginAsAgent()
        // ASSERT
        cy.url().should('include', '/dashboard')
        LoginPage.verifyLoggedInUser('agent')
    })

    it('should login successfully with valid admin credentials', () => {
        // ACT
        LoginPage.loginAsAdmin()
        // ASSERT
        cy.url().should('include', '/dashboard')
        LoginPage.verifyLoggedInUser('admin')
    })
}) 