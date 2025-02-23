import LoginPage from './loginPage'

class AdminPage {
    // Grid Cards
    elements = {
        totalUsersCard: '.grid > :nth-child(1)',
        propertiesCard: '.grid > :nth-child(2)',
        agentsCard: '.grid > :nth-child(3)',
        activeListingsCard: '.grid > :nth-child(4)',
        
        // Navigation Buttons
        propertiesButton: '.bg-blue-600',
        usersButton: '.flex-col > .flex > :nth-child(2)',
        agentsButton: '.flex-col > .flex > :nth-child(3)',
        
        // Properties Section
        searchProperties: '.relative > div.w-full > .block',
        statusDropdown: '.w-48 > div.w-full > .block',
        resetButton: ':nth-child(2) > :nth-child(2) > .inline-flex',
        deletePropertyButton: ':nth-child(1) > .text-right > .inline-flex',
        confirmDeleteProperty: '.justify-end > .bg-blue-600',
        
        // Users Section
        searchUsers: '.relative > div.w-full > .block',
        rolesDropdown: '.w-48 > div.w-full > .block',
        editUserButton: ':nth-child(1) > .text-right > .mr-2',
        userNameInput: '.space-y-4 > :nth-child(1) > .w-full',
        userEmailInput: '.space-y-4 > :nth-child(2) > .w-full',
        userPhoneInput: '.space-y-4 > :nth-child(3) > .w-full',
        userRoleDropdown: ':nth-child(4) > .w-full',
        saveChangesButton: '.space-y-4 > .flex > .bg-blue-600',
        deleteUserButton: ':nth-child(1) > .text-right > .text-red-600',
        deleteUserModalButton: '.justify-end > .bg-blue-600',
        
        // Agents Section
        searchAgents: '.relative > div.w-full > .block',
        specializationsDropdown: '.w-48 > div.w-full > .block',
        deleteAgentButton: ':nth-child(1) > .text-right > .inline-flex',
        confirmDeleteAgent: '.justify-end > .bg-blue-600',
        editAgentButton: ':nth-child(1) > .text-right > .mr-2',
        agentNameInput: '.space-y-4 > :nth-child(1) > .w-full',
        agentEmailInput: '.space-y-4 > :nth-child(2) > .w-full',
        agentPhoneInput: '.space-y-4 > :nth-child(3) > .w-full',
        agentSpecializationDropdown: ':nth-child(4) > .w-full',
        saveAgentButton: '.space-y-4 > .flex > .bg-blue-600',
        
        // Settings
        settingsButton: '[href="/settings"]',
        uploadPhotoButton: '[href="/settings"]',
        saveProfileButton: '.pt-6 > .inline-flex',
        savePasswordButton: '.pt-4 > .space-y-4 > :nth-child(2) > div.w-full > .w-full',
        fullNameInput: '.space-y-6 > :nth-child(2) > :nth-child(1) > div.w-full > .w-full',
        emailAddressInput: '.space-y-6 > :nth-child(2) > :nth-child(2) > div.w-full > .w-full',
        phoneNumberInput: ':nth-child(3) > div.w-full > .w-full',
        currentPasswordInput: '.pt-4 > .space-y-4 > :nth-child(1) > div.w-full > .w-full',
        newPasswordInput: '.pt-4 > .space-y-4 > :nth-child(2) > div.w-full > .w-full',
        logoutButton: '.absolute > .w-full'
    }

    // Dropdown Options
    propertyStatuses = {
        ALL: 'All Statuses',
        AVAILABLE: 'Available',
        SOLD: 'Sold',
        UNDER_CONTRACT: 'Under Contract'
    }

    userRoles = {
        ALL: 'All Roles',
        USER: 'User',
        AGENT: 'Agent',
        ADMIN: 'Admin'
    }

    agentSpecializations = {
        ALL: 'All Specializations',
        LUXURY: 'Luxury Properties',
        COMMERCIAL: 'Commercial Properties',
        RESIDENTIAL: 'Residential Properties',
        INVESTMENT: 'Investment Properties'
    }

    // Methods for Properties Management
    verifyDashboardCards() {
        cy.get(this.elements.totalUsersCard).find('.text-3xl').invoke('text').should('match', /\d+/)
        cy.get(this.elements.propertiesCard).find('.text-3xl').invoke('text').should('match', /\d+/)
        cy.get(this.elements.agentsCard).find('.text-3xl').invoke('text').should('match', /\d+/)
        cy.get(this.elements.activeListingsCard).find('.text-3xl').invoke('text').should('match', /\d+/)
    }

    navigateToProperties() {
        cy.get(this.elements.propertiesButton).click()
    }

    searchProperty(searchText) {
        cy.get(this.elements.searchProperties).type(searchText)
    }

    filterPropertyByStatus(status) {
        cy.get(this.elements.statusDropdown).select(status)
    }

    deleteProperty() {
        cy.get(this.elements.deletePropertyButton).click()
        cy.get(this.elements.confirmDeleteProperty).click()
        // Add verification that property was deleted
    }

    filterPropertiesByStatus(status) {
        cy.get(this.elements.statusDropdown).select(status)
        cy.get('table tbody tr').each(($row) => {
            if (status !== this.propertyStatuses.ALL) {
                cy.wrap($row).find('td').eq(3).should('contain', status)
            }
        })
    }

    verifyPropertySearch() {
        cy.get('table tbody tr')
            .first()
            .find('td')
            .first()
            .invoke('text')
            .then((propertyName) => {
                // Store initial row count
                cy.get('table tbody tr').its('length').then((initialCount) => {
                    // Perform search
                    this.searchProperty(propertyName)
                    // Verify search results
                    cy.get('table tbody tr').should('have.length.lte', initialCount)
                    cy.get('table tbody tr').each(($row) => {
                        cy.wrap($row).should('contain', propertyName)
                    })
                })
            })
    }

    verifyPropertyDeletionBug() {
        cy.get(this.elements.propertiesCard).find('.text-3xl').invoke('text').then((initialCount) => {
            this.deleteProperty()
            cy.get(this.elements.propertiesCard).find('.text-3xl').should('contain', initialCount)
            
        })
    }

    resetFilters() {
        // Store the initial row count
        cy.get('table tbody tr').its('length').then((initialCount) => {
            // Click reset button
            cy.get(this.elements.resetButton).click()
            
            // Verify search input is cleared
            cy.get(this.elements.searchProperties).should('have.value', '')
            
            // Verify status dropdown is reset to 'All Statuses'
            cy.get(this.elements.statusDropdown).should('contain', this.propertyStatuses.ALL)
            
            // Verify table shows all records
            cy.get('table tbody tr').its('length').should('be.gte', initialCount)
        })
    }

    // Methods for Users Management
    navigateToUsers() {
        cy.get(this.elements.usersButton).click()
    }

    searchUser(searchText) {
        cy.get(this.elements.searchUsers).type(searchText)
    }

    editUser(name, email, phone, role) {
        cy.get(this.elements.editUserButton).click()
        cy.get(this.elements.userNameInput).clear().type(name)
        cy.get(this.elements.userEmailInput).clear().type(email)
        cy.get(this.elements.userPhoneInput).clear().type(phone)
        cy.get(this.elements.userRoleDropdown).select(role)
        cy.get(this.elements.saveChangesButton).click()
    }

    deleteUser() {
        // First navigate to Users section
        cy.get(this.elements.usersButton).click()
        
        // Get initial count from the users card
        cy.get('.grid > :nth-child(1)')
            .find('.text-3xl')
            .invoke('text')
            .then((initialCount) => {
                const count = parseInt(initialCount);
                
                // Delete user
                cy.get(this.elements.deleteUserButton).click()
                cy.get(this.elements.deleteUserModalButton).click()
                
                // Verify the count decreased
                cy.get('.grid > :nth-child(1)')
                    .find('.text-3xl')
                    .should('have.text', String(count - 1));
            });
    }

    filterUsersByRole(role) {
        cy.get(this.elements.rolesDropdown).select(role)
        cy.get('table tbody tr').each(($row) => {
            if (role !== this.userRoles.ALL) {
                cy.wrap($row).find('td').eq(4).should('contain', role)
            }
        })
    }

    verifyUserSearch() {
        cy.get('table tbody tr')
            .first()
            .find('td')
            .first()
            .invoke('text')
            .then((userName) => {
                // Store initial row count
                cy.get('table tbody tr').its('length').then((initialCount) => {
                    // Perform search with the user name
                    this.searchUser(userName);
                    
                    // Verify search results
                    cy.get('table tbody tr').should('have.length.lte', initialCount);
                    cy.get('table tbody tr').each(($row) => {
                        cy.wrap($row).should('contain', userName);
                    });
    
                    // Clear search input
                    cy.get(this.elements.searchUsers).clear();
    
                    // Select and verify Agent role
                    cy.get(this.elements.rolesDropdown).select('Agent');
    
                    // Wait for the table to update
                    cy.get('table tbody tr').should('have.length.lte', initialCount);
    
                    // Verify that each row contains 'Agent' in the role column dynamically
                    cy.get('table tbody tr').each(($row) => {
                        cy.wrap($row).find('td')
                            .eq(2)  // assuming the role is in the third column (index 2)
                            .invoke('text')
                            .then((text) => text.toLowerCase())
                            .should('equal', 'agent');
                    });
    
                    // Select and verify Admin role
                    cy.get(this.elements.rolesDropdown).select('Admin');
    
                    // Wait for the table to update
                    cy.get('table tbody tr').should('have.length.lte', initialCount);
    
                    // Verify that each row contains 'Admin' in the role column dynamically
                    cy.get('table tbody tr').each(($row) => {
                        cy.wrap($row).find('td')
                            .eq(2)  // assuming the role is in the third column (index 2)
                            .invoke('text')
                            .then((text) => text.toLowerCase())
                            .should('equal', 'admin');
                    });
                });
            });
    }
    
    editAndVerifyUser() {
        // Wait for table to be visible first
        cy.get('table').should('be.visible')
        const updatedUser = {
            name: 'Updated Name',
            email: 'updated@email.com',
            phone: '1234567890',
            role: 'agent'
        }

        // Click the edit button using the defined selector from elements
        cy.get(this.elements.editUserButton).click()

        // Use the defined selectors for all form inputs
        cy.get(this.elements.userNameInput).clear().type(updatedUser.name)
        cy.get(this.elements.userEmailInput).clear().type(updatedUser.email)
        cy.get(this.elements.userPhoneInput).clear().type(updatedUser.phone)
        cy.get(this.elements.userRoleDropdown).select(updatedUser.role)
        cy.get(this.elements.saveChangesButton).click()

        cy.wait(1000) // Wait for success message
        cy.get('table').should('contain', updatedUser.name)
            .and('contain', updatedUser.email)
            .and('contain', updatedUser.role)
    }

    // Methods for Agents Management
    navigateToAgents() {
        cy.get(this.elements.agentsButton).click()
    }

    searchAgent(searchText) {
        cy.get(this.elements.searchAgents).type(searchText)
    }

    deleteAgent() {
        cy.get(this.elements.deleteAgentButton).click()
        // Force click through the modal overlay
        cy.get(this.elements.confirmDeleteAgent).click({ force: true })
    }

    filterAgentsBySpecialization(specialization) {
        cy.get(this.elements.specializationsDropdown).select(specialization)
        cy.get('table tbody tr').each(($row) => {
            if (specialization !== this.agentSpecializations.ALL) {
                cy.wrap($row).find('td').eq(2).should('contain', specialization)
            }
        })
    }

    verifyAgentSearch() {
        cy.get('table tbody tr')
            .first()
            .find('td')
            .first()
            .invoke('text')
            .then((agentName) => {
                // Store initial row count
                cy.get('table tbody tr').its('length').then((initialCount) => {
                    // Perform search with the agent name
                    this.searchAgent(agentName)
                    
                    // Verify search results
                    cy.get('table tbody tr').should('have.length.lte', initialCount)
                    cy.get('table tbody tr').each(($row) => {
                        cy.wrap($row).should('contain', agentName)
                    })
    
                    // Clear search input
                    cy.get(this.elements.searchAgents).clear()
                    
                    // Select Luxury Properties and verify an agent name exists in first column
                    cy.get(this.elements.specializationsDropdown).select('Luxury Properties')
                    cy.get('table tbody tr')
                        .first()
                        .find('td')
                        .first()
                        .should('not.be.empty')
                })
            })
    }

    deleteAndVerifyAgent() {
        cy.get(this.elements.agentsButton).click()
        
        // Get initial count from the users card
        cy.get('.grid > :nth-child(3)')
            .find('.text-3xl')
            .invoke('text')
            .then((initialCount) => {
                const count = parseInt(initialCount);
                
                // Delete user
                cy.get(this.elements.deleteAgentButton).click()
                cy.get(this.elements.confirmDeleteAgent).click()
                
                // Verify the count decreased
                cy.get('.grid > :nth-child(3)')
                    .find('.text-3xl')
                    .should('have.text', String(count - 1));
            });
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
            name: 'Admin User',
            email: 'admin@updated.com',
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

export default new AdminPage() 