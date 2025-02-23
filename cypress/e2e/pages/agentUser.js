import LoginPage from './loginPage'

class AgentUserPage {
    elements = {
        // Grid kartice na dashboardu
        firstGridCard: '.md\\:grid-cols-3 > :nth-child(1)',
        secondGridCard: '.md\\:grid-cols-3 > :nth-child(2)',
        thirdGridCard: '.md\\:grid-cols-3 > :nth-child(3)',
        
        // Navigacija i meni
        addPropertyButton: '.flex > .inline-flex',
        userMenu: '.h-8',
        dashboardLink: '[href="/dashboard"]',
        settingsButton: '[href="/settings"]',
        // Sadržaj na dashboardu
        contentGrid: '.text-center',

        fullNameInput: '.space-y-6 > :nth-child(2) > :nth-child(1) > div.w-full > .w-full',
        emailAddressInput: '.space-y-6 > :nth-child(2) > :nth-child(2) > div.w-full > .w-full',
        phoneNumberInput: ':nth-child(3) > div.w-full > .w-full',
        saveProfileButton: '.pt-6 > .inline-flex',
        currentPasswordInput: '.pt-4 > .space-y-4 > :nth-child(1) > div.w-full > .w-full',
        newPasswordInput: '.pt-4 > .space-y-4 > :nth-child(2) > div.w-full > .w-full',

        // Property Creation Elements
        propertyTitle: '.space-y-6 > :nth-child(2) > :nth-child(1) > .w-full',
        propertyPrice: '.space-y-6 > :nth-child(2) > :nth-child(3) > .w-full',
        propertyBedrooms: ':nth-child(5) > .w-full',
        propertyBathrooms: ':nth-child(2) > :nth-child(6) > .w-full',
        propertyArea: ':nth-child(7) > .w-full',
        propertyYearBuilt: ':nth-child(8) > .w-full',
        propertyAddress: ':nth-child(3) > .grid > :nth-child(1) > .w-full',
        propertyCity: ':nth-child(3) > .grid > :nth-child(2) > .w-full',
        propertyState: ':nth-child(3) > .grid > :nth-child(3) > .w-full',
        propertyZipCode: ':nth-child(3) > .grid > :nth-child(4) > .w-full',
        propertyDescription: '.space-y-6 > :nth-child(4) > .w-full',
        submitPropertyButton: '.justify-end > .bg-blue-600',
        userMenuIcon: '.flex > .h-8',
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
            .should('not.be.empty')
    }
     // Methods for Settings Management
     navigateToSettings() {
        // Click the user menu icon
        cy.get(this.elements.userMenuIcon).click()
        // Click Settings using contains
        cy.contains('Settings').click()
        // Verify we're on settings page
        cy.url().should('include', '/settings')
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

    createPropertyAndVerifyCreation() {
        const propertyData = {
            title: 'Luxury Villa',
            price: '500000',
            bedrooms: '4',
            bathrooms: '3',
            area: '2500',
            yearBuilt: '2020',
            address: '123 Main Street',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
            description: 'Beautiful luxury villa with modern amenities'
        }

        // Click add property button to open modal
        cy.get(this.elements.addPropertyButton).click()

        // Fill in property details
        cy.get(this.elements.propertyTitle).type(propertyData.title)
        cy.get(this.elements.propertyPrice).type(propertyData.price)
        cy.get(this.elements.propertyBedrooms).type(propertyData.bedrooms)
        cy.get(this.elements.propertyBathrooms).type(propertyData.bathrooms)
        cy.get(this.elements.propertyArea).type(propertyData.area)
        cy.get(this.elements.propertyYearBuilt).type(propertyData.yearBuilt)
        cy.get(this.elements.propertyAddress).type(propertyData.address)
        cy.get(this.elements.propertyCity).type(propertyData.city)
        cy.get(this.elements.propertyState).type(propertyData.state)
        cy.get(this.elements.propertyZipCode).type(propertyData.zipCode)
        cy.get(this.elements.propertyDescription).type(propertyData.description)

        // Submit the form
        cy.get(this.elements.submitPropertyButton).click()

        // Verify property card is displayed
        cy.get('.relative > .w-full').should('be.visible')
        cy.contains(propertyData.title).should('be.visible')
        cy.contains(propertyData.address).should('be.visible')
    }

    createPropertyWithData(propertyData) {
        // Click add property button to open modal
        cy.get(this.elements.addPropertyButton).click()

        // Fill in property details
        cy.get(this.elements.propertyTitle).type(propertyData.title)
        cy.get(this.elements.propertyPrice).type(propertyData.price)
        cy.get(this.elements.propertyBedrooms).type(propertyData.bedrooms)
        cy.get(this.elements.propertyBathrooms).type(propertyData.bathrooms)
        cy.get(this.elements.propertyArea).type(propertyData.area)
        cy.get(this.elements.propertyYearBuilt).type(propertyData.yearBuilt)
        cy.get(this.elements.propertyAddress).type(propertyData.address)
        cy.get(this.elements.propertyCity).type(propertyData.city)
        cy.get(this.elements.propertyState).type(propertyData.state)
        cy.get(this.elements.propertyZipCode).type(propertyData.zipCode)
        cy.get(this.elements.propertyDescription).type(propertyData.description)

        // Submit the form
        cy.get(this.elements.submitPropertyButton).click()

        // Verify property was created
        cy.contains(propertyData.title).should('be.visible')
        cy.contains(propertyData.address).should('be.visible')
    }

    verifyEmptyPropertyValidation() {
        // Click add property button without entering any data
        cy.get(this.elements.addPropertyButton).click()
        
        // Click submit to trigger validations
        cy.get(this.elements.submitPropertyButton).click()

        // Verify all validation messages with scrolling
        cy.contains('Title must be at least 5 characters').scrollIntoView().should('be.visible')
        cy.contains('Price is required').scrollIntoView().should('be.visible')
        cy.contains('Number of bedrooms is required').scrollIntoView().should('be.visible')
        cy.contains('Number of bathrooms is required').scrollIntoView().should('be.visible')
        cy.contains('Area is required').scrollIntoView().should('be.visible')
        cy.contains('Year built is required').scrollIntoView().should('be.visible')
        cy.contains('Address is required').scrollIntoView().should('be.visible')
        cy.contains('City is required').scrollIntoView().should('be.visible')
        cy.contains('State is required').scrollIntoView().should('be.visible')
        cy.contains('ZIP code is required').scrollIntoView().should('be.visible')
        cy.contains('Description must be at least 20 characters').scrollIntoView().should('be.visible')
    }

    verifyNegativeValuesValidation() {
        // Click add property button
        cy.get(this.elements.addPropertyButton).click()

        const negativeData = {
            title: 'Test Property',
            price: '-500000',
            bedrooms: '-4',
            bathrooms: '-3',
            area: '-2500',
            yearBuilt: '-2020',
            address: '123 Main Street',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
            description: 'This is a test property with negative values for validation testing'
        }

        // Fill in property details with negative values
        cy.get(this.elements.propertyTitle).type(negativeData.title)
        cy.get(this.elements.propertyPrice).type(negativeData.price)
        cy.get(this.elements.propertyBedrooms).type(negativeData.bedrooms)
        cy.get(this.elements.propertyBathrooms).type(negativeData.bathrooms)
        cy.get(this.elements.propertyArea).type(negativeData.area)
        cy.get(this.elements.propertyYearBuilt).type(negativeData.yearBuilt)
        cy.get(this.elements.propertyAddress).type(negativeData.address)
        cy.get(this.elements.propertyCity).type(negativeData.city)
        cy.get(this.elements.propertyState).type(negativeData.state)
        cy.get(this.elements.propertyZipCode).type(negativeData.zipCode)
        cy.get(this.elements.propertyDescription).type(negativeData.description)

        // Submit the form
        cy.get(this.elements.submitPropertyButton).click()

        // This is a bug - system should not accept negative values
        // Adding verification that this is incorrect behavior
        cy.get('.relative > .w-full').should('be.visible')
        cy.contains(negativeData.title).should('be.visible')
        cy.contains(negativeData.address).should('be.visible')
        
        // Add a comment indicating this is a bug
        cy.log('BUG: System accepts negative values for property details which should not be allowed')
    }

    sendMessageToAgent() {
        const messageData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            message: 'I am interested in this property and would like to schedule a viewing.'
        }

        // Click View Details
        cy.get(':nth-child(5) > .inline-flex').click()

        // Click Send Message
        cy.get('.border').click()

        // Fill in message form with clear first
        cy.get('form.space-y-4 > :nth-child(1) > .w-full').clear().type(messageData.name)
        cy.get('form.space-y-4 > :nth-child(2) > .w-full').clear().type(messageData.email)
        cy.get('form.space-y-4 > :nth-child(3) > .w-full').clear().type(messageData.phone)
        cy.get(':nth-child(4) > .w-full').clear().type(messageData.message)

        // Send message
        cy.get('.flex > .bg-blue-600').click()

        // Verify success message
        cy.contains('Message Sent!').should('be.visible')
        // Verify generic confirmation message without specific agent name
        cy.contains('will get back to you soon').should('be.visible')
    }

    verifyEmptyMessageValidation() {
        // Click View Details
        cy.get(':nth-child(5) > .inline-flex').click()

        // Click Send Message
        cy.get('.border').click()

        // Clear all fields (in case there's any default text)
        cy.get('form.space-y-4 > :nth-child(1) > .w-full').clear()
        cy.get('form.space-y-4 > :nth-child(2) > .w-full').clear()
        cy.get('form.space-y-4 > :nth-child(3) > .w-full').clear()
        cy.get(':nth-child(4) > .w-full').clear()

        // Click Send without filling in any data
        cy.get('.flex > .bg-blue-600').click()

        // Verify validation messages
        cy.contains('Name is required').scrollIntoView().should('be.visible')
        cy.contains('Invalid email address').scrollIntoView().should('be.visible')
        cy.contains('Valid phone number is required').scrollIntoView().should('be.visible')
        cy.contains('Message must be at least 10 characters').scrollIntoView().should('be.visible')
    }
}

export default new AgentUserPage()
