import LoginPage from '../pages/loginPage'

describe('Invalid Login Tests', () => {
    beforeEach(() => {
        // ARRANGE
        LoginPage.visit()
    })

    it('should show error with invalid credentials', () => {
        // ACT
        LoginPage.loginWithInvalidCredentials()
        // ASSERT
        LoginPage.verifyErrorMessage('invalidCredentials')
    })

    it('should show error with empty form submission', () => {
        // ACT
        LoginPage.submitEmptyForm()
        // ASSERT
        LoginPage.verifyFormValidation()
    })

    it('should show error when only email is entered', () => {
        // ACT
        LoginPage.loginWithEmptyPassword()
        // ASSERT - inside page object method
    })

    it('should show error when only password is entered', () => {
        // ACT
        LoginPage.loginWithEmptyPassword()
        // ASSERT - inside page object method
    })

    it('should display error message with invalid password', () => {
        // ACT
        LoginPage.loginWithWrongPassword()
        // ASSERT - inside page object method
    })

    it('should display error message with non-existent user', () => {
        // ACT
        LoginPage.loginWithNonExistentUser()
        // ASSERT - inside page object method
    })

    it('should show error when password is empty', () => {
        // ACT
        LoginPage.loginWithEmptyPassword()
        // ASSERT - inside page object method
    })

    it('should show error with invalid email format', () => {
        // ACT
        LoginPage.loginWithInvalidEmailFormat()
        // ASSERT - inside page object method
    })
}) 