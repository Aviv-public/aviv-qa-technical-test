class RegistrationPage {
    // Elements
    elements = {
        fullNameInput: '.space-y-6 > :nth-child(1) > .w-full',
        emailInput: ':nth-child(2) > .w-full',
        phoneInput: ':nth-child(3) > .w-full',
        accountTypeDropdown: ':nth-child(4) > .w-full',
        passwordInput: ':nth-child(5) > .w-full',
        confirmPasswordInput: ':nth-child(6) > .w-full',
        createAccountButton: '.space-y-6 > .inline-flex',
        userProfileButton: '.flex > .h-8',
        logoutButton: '.absolute > .w-full',
        loginEmailInput: ':nth-child(2) > .w-full',
        loginPasswordInput: ':nth-child(3) > .w-full',
        loginButton: '.space-y-6 > .inline-flex',
        // Validation messages
        nameValidation: () => cy.get(':nth-child(1) > .text-red-500'),
        emailValidation: () => cy.get(':nth-child(2) > .text-red-500'),
        phoneValidation: () => cy.get(':nth-child(3) > .text-red-500'),
        passwordValidation: () => cy.get(':nth-child(5) > .text-red-500'),
        confirmPasswordValidation: () => cy.get(':nth-child(6) > .text-red-500')
    }

    validationMessages = {
        nameRequired: 'Name must be at least 2 characters',
        invalidEmail: 'Invalid email address',
        invalidPhone: 'Please enter a valid phone number',
        passwordLength: 'Password must be at least 8 characters',
        passwordsDoNotMatch: "Passwords don't match",
        passwordUppercase: 'Password must contain at least one uppercase letter',
        passwordNumber: 'Password must contain at least one number',
        passwordSpecial: 'Password must contain at least one special character'
    }

    // Test Data
    testUserData = {
        fullName: 'Test User',
        email: `test${Date.now()}@example.com`,
        phone: '1234567890',
        accountType: 'user',
        password: 'Test123!'
    }

    existingUserData = {
        fullName: 'Existing User',
        email: 'test@example.com',
        phone: '1234567890',
        accountType: 'user',
        password: 'Test123!'
    }

    weakPasswordData = {
        fullName: 'Test User',
        email: 'newuser@example.com',
        phone: '1234567890',
        accountType: 'user',
        password: 'weak'
    }

    invalidTestData = {
        shortName: 'A',
        invalidEmail: 'invalid.email',
        invalidPhone: 'abc123',
        shortPassword: 'weak',
        differentConfirmPassword: 'Different123!'
    }

    testData = {
        validName: 'Test User',
        validPhone: '12345678912',
        validPassword: 'Test123!'
    }

    // Methods
    visit() {
        cy.visit('/register')
    }

    submitEmptyForm() {
        cy.get(this.elements.createAccountButton).click()
        cy.contains(this.validationMessages.nameRequired).should('be.visible')
        cy.contains(this.validationMessages.invalidEmail).should('be.visible')
        cy.contains(this.validationMessages.invalidPhone).should('be.visible')
        cy.contains(this.validationMessages.passwordLength).should('be.visible')
    }

    fillRegistrationForm(fullName, email, phone, accountType, password, confirmPassword = password) {
        if (fullName) cy.get(this.elements.fullNameInput).type(fullName)
        if (email) cy.get(this.elements.emailInput).type(email)
        if (phone) cy.get(this.elements.phoneInput).type(phone)
        if (accountType) cy.get(this.elements.accountTypeDropdown).select(accountType)
        if (password) cy.get(this.elements.passwordInput).type(password)
        if (confirmPassword) cy.get(this.elements.confirmPasswordInput).type(confirmPassword)
    }

    verifyNameValidation() {
        this.fillRegistrationForm(
            this.invalidTestData.shortName,
            this.testUserData.email,
            this.testUserData.phone,
            this.testUserData.accountType,
            this.testUserData.password
        )
        this.elements.nameValidation().should('be.visible')
            .and('have.text', this.validationMessages.nameRequired)
    }

    verifyEmailValidation() {
        this.fillRegistrationForm(
            this.testUserData.fullName,
            this.invalidTestData.invalidEmail,
            this.testUserData.phone,
            this.testUserData.accountType,
            this.testUserData.password
        )
        this.elements.emailValidation().should('be.visible')
            .and('have.text', this.validationMessages.invalidEmail)
    }

    verifyPhoneValidation() {
        this.fillRegistrationForm(
            this.testUserData.fullName,
            this.testUserData.email,
            this.invalidTestData.invalidPhone,
            this.testUserData.accountType,
            this.testUserData.password
        )
        this.elements.phoneValidation().should('be.visible')
            .and('have.text', this.validationMessages.invalidPhone)
    }

    verifyPasswordValidation() {
        this.fillRegistrationForm(
            this.testUserData.fullName,
            this.testUserData.email,
            this.testUserData.phone,
            this.testUserData.accountType,
            this.invalidTestData.shortPassword
        )
        this.elements.passwordValidation().should('be.visible')
            .and('have.text', this.validationMessages.passwordLength)
    }

    verifyPasswordMismatch() {
        this.fillRegistrationForm(
            this.testUserData.fullName,
            this.testUserData.email,
            this.testUserData.phone,
            this.testUserData.accountType,
            this.testUserData.password,
            this.invalidTestData.differentConfirmPassword
        )
        this.elements.confirmPasswordValidation().should('be.visible')
            .and('have.text', this.validationMessages.passwordsDoNotMatch)
    }

    submitRegistration() {
        cy.get(this.elements.createAccountButton).click()
    }

    registerNewUser(userData) {
        this.fillRegistrationForm(
            userData.fullName,
            userData.email,
            userData.phone,
            userData.accountType,
            userData.password
        )
        this.submitRegistration()
    }

    registerValidUser() {
        this.registerNewUser(this.testUserData)
    }

    registerWithExistingEmail() {
        this.registerNewUser(this.existingUserData)
    }

    registerWithWeakPassword() {
        this.registerNewUser(this.weakPasswordData)
    }

    verifySuccessfulRegistration() {
        cy.url().should('include', '/dashboard')
    }

    verifyErrorMessage(errorType) {
        cy.get('.error-message').should('be.visible')
        switch(errorType) {
            case 'existing':
                cy.get('.error-message').should('contain', 'Email already exists')
                break
            case 'password':
                cy.get('.password-validation-error').should('be.visible')
                break
            default:
                break
        }
    }

    createAccount() {
        const timestamp = new Date().getTime()
        cy.get(this.elements.fullNameInput).type(this.testData.validName)
        cy.get(this.elements.emailInput).type(`test${timestamp}@example.com`)
        cy.get(this.elements.phoneInput).type(this.testData.validPhone)
        cy.get(this.elements.passwordInput).type(this.testData.validPassword)
        cy.get(this.elements.confirmPasswordInput).type(this.testData.validPassword)
        cy.get(this.elements.createAccountButton).click()
        cy.url().should('include', '/dashboard')
    }

    verifyPasswordMustMatch() {
        cy.get(this.elements.passwordInput).type('Test123!')
        cy.get(this.elements.confirmPasswordInput).type('Test123')
        cy.get(this.elements.createAccountButton).click()
        cy.contains(this.validationMessages.passwordsDoNotMatch).should('be.visible')
    }

    verifyPasswordSetting() {
        // Test for 8 characters
        cy.get(this.elements.passwordInput).clear().type('password8')
        cy.get(this.elements.createAccountButton).click()
        cy.contains(this.validationMessages.passwordUppercase).should('be.visible')

        // Test for uppercase
        cy.get(this.elements.passwordInput).clear().type('Password8')
        cy.get(this.elements.createAccountButton).click()
        cy.contains(this.validationMessages.passwordNumber).should('be.visible')

        // Test for number
        cy.get(this.elements.passwordInput).clear().type('Password8')
        cy.get(this.elements.createAccountButton).click()
        cy.contains(this.validationMessages.passwordSpecial).should('be.visible')
    }

    verifyExistingAccountCantCreate() {
        cy.fixture('users').then(users => {
            const user = users.validUser
            cy.get(this.elements.fullNameInput).type('Test User')
            cy.get(this.elements.emailInput).type(user.email)
            cy.get(this.elements.phoneInput).type('12345678912')
            cy.get(this.elements.passwordInput).type('Test123!')
            cy.get(this.elements.confirmPasswordInput).type('Test123!')
            cy.get(this.elements.createAccountButton).click()
        })
    }

    verifyLoginAfterRegistration() {
        // Klik na profile button
        cy.get(this.elements.userProfileButton).click()
        // Klik na logout
        cy.get(this.elements.logoutButton).click()
        // Sačekaj da se učita login stranica
        cy.url().should('include', '/login')
        // Login sa istim kredencijalima
        const timestamp = new Date().getTime()
        const email = `test${timestamp}@example.com`
        cy.get(this.elements.loginEmailInput).type(email)
        cy.get(this.elements.loginPasswordInput).type(this.testData.validPassword)
        cy.get(this.elements.loginButton).click()
        // Proveri da li je login uspešan
        cy.url().should('include', '/dashboard')
    }
}

export default new RegistrationPage() 