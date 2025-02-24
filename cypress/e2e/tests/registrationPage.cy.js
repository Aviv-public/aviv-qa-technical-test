import RegistrationPage from '../pages/registrationPage'

describe('Registration Tests', () => {
    beforeEach(() => {
        // ARRANGE
        RegistrationPage.visit()
    })

    it('should successfully create new account', () => {
        // ACT
        RegistrationPage.createAccount()
        // ASSERT - inside page object method
    })

    it('should show validation messages for empty form', () => {
        // ACT
        RegistrationPage.submitEmptyForm()
        // ASSERT - inside page object method
    })

    it('should show validation message when passwords do not match', () => {
        // ACT
        RegistrationPage.verifyPasswordMustMatch()
        // ASSERT - inside page object method
    })

    it('should validate password requirements', () => {
        // ACT
        RegistrationPage.verifyPasswordSetting()
        // ASSERT - inside page object method
    })

    it('should not allow registration with existing email', () => { //Bug: Test passes but system is not checking if email is already in use
        // ACT
        RegistrationPage.verifyExistingAccountCantCreate()
        // ASSERT - inside page object method
    })

    it('should verify login after registration', () => { //Bug: Test will not pass because of the bug in the login page after registration
        // ACT
        RegistrationPage.createAccount()
        // ASSERT
        RegistrationPage.verifyLoginAfterRegistration()
    })
})