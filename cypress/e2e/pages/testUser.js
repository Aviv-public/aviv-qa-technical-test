import LoginPage from './loginPage'

class TestUserPage {
    elements = {
        // Grid kartice na dashboardu
        firstGridCard: '.md\\:grid-cols-3 > :nth-child(1)',
        secondGridCard: '.md\\:grid-cols-3 > :nth-child(2)',
        thirdGridCard: '.md\\:grid-cols-3 > :nth-child(3)',
        
        // Navigacija i meni
        menuButton: '.ml-2',
        firstMenuItem: ':nth-child(1) > .relative > .p-2',
        userMenu: '.h-8',
        dashboardLink: '[href="/dashboard"]',
        settingsButton: '[href="/settings"]',
        // Sadržaj na dashboardu
        contentGrid: '.md\\:grid-cols-2',

        fullNameInput: '.space-y-6 > :nth-child(2) > :nth-child(1) > div.w-full > .w-full',
        emailAddressInput: '.space-y-6 > :nth-child(2) > :nth-child(2) > div.w-full > .w-full',
        phoneNumberInput: ':nth-child(3) > div.w-full > .w-full',
        saveProfileButton: '.pt-6 > .inline-flex',
        currentPasswordInput: '.pt-4 > .space-y-4 > :nth-child(1) > div.w-full > .w-full',
        newPasswordInput: '.pt-4 > .space-y-4 > :nth-child(2) > div.w-full > .w-full',
    }

    verifyDashboard() {
        // Provera da su kartice vidljive i da imaju sadržaj
        cy.get(this.elements.firstGridCard).should('be.visible')
            .find('.text-3xl').should('exist').and('not.be.empty')
        
        cy.get(this.elements.secondGridCard).should('be.visible')
            .find('.text-3xl').should('exist').and('not.be.empty')
        
        cy.get(this.elements.thirdGridCard).should('be.visible')
            .find('.text-3xl').should('exist').and('not.be.empty')
    }

    navigateAndVerifyMenu() {
        // Klik na menu dugme
        cy.get(this.elements.menuButton).click()

        // Klik na prvi element u gridu
        cy.get('.my-12 > .grid > :nth-child(1) > .relative > .p-2').click()

        // Klik na user menu
        cy.get(this.elements.userMenu).click()

        // Klik na Dashboard link
        cy.get(this.elements.dashboardLink).click()

        // Provera da smo na Dashboard stranici
        cy.url().should('include', '/dashboard')

        // Provera da content grid nije prazan
        cy.get(this.elements.contentGrid).should('be.visible').and('not.be.empty')
    }

    verifyContentGrid() {
        cy.get(this.elements.contentGrid)
            .should('be.visible')
            .and('not.be.empty')
    }
     // Methods for Settings Management
     navigateToSettings() {
        cy.get(this.elements.settingsButton).click()
    }

    updateProfile(name, email, phone) {
        cy.get(this.elements.fullNameInput).clear().type(name)
        cy.get(this.elements.emailAddressInput).clear().type(email)
        cy.get(this.elements.phoneNumberInput).clear().type(phone)
        cy.get(this.elements.saveProfileButton).click()
    }

    changePassword(currentPassword, newPassword) {
        cy.get(this.elements.currentPasswordInput).type(currentPassword)
        cy.get(this.elements.newPasswordInput).type(newPassword)
        cy.get(this.elements.savePasswordButton).click()
    }

    logout() {
        cy.get(this.elements.logoutButton).click()
    }

    logoutAndVerify() {
        this.logout()
        cy.url().should('include', '/login')
        // Verify login form is visible
        cy.get(this.elements.emailInput).should('be.visible')
        cy.get(this.elements.passwordInput).should('be.visible')
    }

    updateAndVerifyProfile() {
        const profileData = {
            name: 'Admin User',
            email: 'admin@updated.com',
            phone: '9876543210'
        }

        this.updateProfile(profileData.name, profileData.email, profileData.phone)
        cy.get('.success-message').should('be.visible')
            .and('contain', 'Profile updated successfully')
        cy.get(this.elements.fullNameInput).should('have.value', profileData.name)
        cy.get(this.elements.emailAddressInput).should('have.value', profileData.email)
        cy.get(this.elements.phoneNumberInput).should('have.value', profileData.phone)
    }

    changeAndVerifyPassword() {
        this.changePassword('Test123!', 'NewTest123!')
        cy.get('.success-message').should('be.visible')
            .and('contain', 'Password changed successfully')
        cy.get(this.elements.currentPasswordInput).should('have.value', '')
        cy.get(this.elements.newPasswordInput).should('have.value', '')
    }

    updateProfileAndVerify() {
        const updatedCredentials = {
            name: 'Test User',
            email: 'test@updated.com',
            phone: '9876543210',
            currentPassword: 'Test123!',
            newPassword: 'NewTest123!'
        }

        // Navigate to settings
        this.navigateToSettings()
        
        // Update profile info
        cy.get(this.elements.fullNameInput).clear().type(updatedCredentials.name)
        cy.get(this.elements.emailAddressInput).clear().type(updatedCredentials.email)
        cy.get(this.elements.phoneNumberInput).clear().type(updatedCredentials.phone)
        cy.get(this.elements.saveProfileButton).click()

        // Verify success message
        cy.contains('Settings updated successfully').should('be.visible')

        // Change password
        cy.get(this.elements.currentPasswordInput).type(updatedCredentials.currentPassword)
        cy.get(this.elements.newPasswordInput).type(updatedCredentials.newPassword)
        cy.get(this.elements.saveProfileButton).click()

        // Click profile button and logout
        cy.get('.h-8').click()
        cy.get('.absolute > .w-full').click()
        
        // Verify redirect to login
        cy.url().should('include', '/login')

        // Login with new credentials
        cy.get(LoginPage.emailInput).type(updatedCredentials.email)
        cy.get(LoginPage.passwordInput).type(updatedCredentials.newPassword)
        cy.get(LoginPage.signInButton).click()

        // Verify successful login
        cy.url().should('include', '/dashboard')
        cy.get(LoginPage.userProfileButton).click()
        cy.contains(updatedCredentials.email).should('be.visible')
    }
}

export default new TestUserPage()
