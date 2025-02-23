class LoginPage {
    // Elements
    signUpButton = '.text-gray-500 > .text-blue-600'
    emailInput = ':nth-child(2) > .w-full'
    passwordInput = ':nth-child(3) > .w-full'
    signInButton = '.space-y-6 > .inline-flex'
    signUpLink = '.text-gray-500 > .text-blue-600'
    userProfileButton = '.flex > .h-8'
    toastError = '.p-3'

    // Methods
    visit() {
        cy.visit('/login')
    }

    clickSignUp() {
        cy.get(this.signUpButton).should('be.visible').click()
    }

    login(email, password) {
        cy.get(this.emailInput).type(email)
        cy.get(this.passwordInput).type(password)
        cy.get(this.signInButton).click()
    }

    loginAsUser() {
        cy.fixture('users').then(users => {
            this.login(users.validUser.email, users.validUser.password)
        })
    }

    loginAsAgent() {
        cy.fixture('users').then(users => {
            this.login(users.agentUser.email, users.agentUser.password)
        })
    }

    loginAsAdmin() {
        cy.fixture('users').then(users => {
            this.login(users.adminUser.email, users.adminUser.password)
        })
    }

    // Invalid login methods
    loginWithInvalidCredentials() {
        cy.fixture('users').then(users => {
            this.login(users.invalidUser.email, users.invalidUser.password)
            cy.get(this.toastError).should('contain', 'Invalid email or password')
        })
    }

    loginWithInvalidEmailFormat() {
        cy.get(this.emailInput)
            .type('testexample.com')
            .invoke('prop', 'validationMessage')
            .should('contain', 'Please include an \'@\' in the email address')
        
        cy.get(this.passwordInput).type('Test123!')
        cy.get(this.signInButton).click()
    }

    submitEmptyForm() {
        cy.get(this.signInButton).click()
    }

    clickSignUpLink() {
        cy.get(this.signUpLink).click()
    }

    // Verification methods
    verifyErrorMessage(errorType) {
        cy.get(this.toastError).should('be.visible')
        switch (errorType) {
            case 'invalidCredentials':
                cy.get(this.toastError).should('contain', 'Invalid email or password')
              
        }
    }

    verifyFormValidation() {
        cy.contains('Invalid email address')
        cy.contains('Password must be at least 6 characters')
    }

    
    verifySignUpRedirection() {
        cy.url().should('include', '/register')
    }

    // User verification methods
    verifyLoggedInUser(role) {
        cy.fixture('users').then(users => {
            let user
            switch(role) {
                case 'user':
                    user = users.validUser
                    break
                case 'agent':
                    user = users.agentUser
                    break
                case 'admin':
                    user = users.adminUser
                    break
                default:
                    throw new Error('Invalid user role')
            }
            
            cy.url().should('include', '/dashboard')
            cy.get(this.userProfileButton).click()
            cy.contains(user.email).should('be.visible')
        })
    }
}

export default new LoginPage()
