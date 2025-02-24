import AgentUserPage from '../pages/agentUser'
import LoginPage from '../pages/loginPage'

describe('Test User Dashboard Tests', () => {
    beforeEach(() => {
        // ARRANGE: Navigate to the login page
        LoginPage.visit()
        
        // ACT: Perform login as an agent
        LoginPage.loginAsAgent()

        // ASSERT: Verify the user is logged in as an agent
    })

    it('should display dashboard correctly for agent role', () => {
        // ARRANGE: Ensure agent is on the dashboard page
        
        // ACT: Verify the dashboard layout and content
        AgentUserPage.verifyDashboard()

        // ASSERT: Validate that the correct dashboard elements are displayed
    })

    it('should create property successfully and verify creation', () => {
        // ARRANGE: Ensure agent is on the property creation page
        
        // ACT: Create a property
        AgentUserPage.createPropertyAndVerifyCreation()

        // ASSERT: Validate that the property was created successfully
    })

    it('should verify empty property validation', () => {
        // ARRANGE: Ensure agent is on the property creation page
        
        // ACT: Attempt to submit an empty property form
        AgentUserPage.verifyEmptyPropertyValidation()

        // ASSERT: Validate that appropriate validation errors are shown
    })

    it('should verify negative values validation', () => { // This test will pass but this is a bug because the system should not allow negative values
        // ARRANGE: Ensure agent is on the property creation page
        
        // ACT: Enter negative values into the form and submit
        AgentUserPage.verifyNegativeValuesValidation()

        // ASSERT: Validate that the system prevents negative values (Bug: It does not)
    })

    it('should verify message sending to agent', () => { // Bug: This test will pass but this is a small bug because the placeholders are populated with the values from the property
        // ARRANGE: Ensure a property exists
        AgentUserPage.createPropertyAndVerifyCreation()
        
        // ACT: Send a message to the agent
        AgentUserPage.sendMessageToAgent()

        // ASSERT: Validate that the message is sent correctly (Bug: Placeholders are prefilled incorrectly)
    })

    it('should verify empty message validation', () => {
        // ARRANGE: Ensure a property exists
        AgentUserPage.createPropertyAndVerifyCreation()
        
        // ACT: Attempt to send an empty message
        AgentUserPage.verifyEmptyMessageValidation()

        // ASSERT: Validate that the system displays an appropriate validation error
    })

    it('should update profile settings, logout and verify new credentials', () => { // Bug: This test will not pass because the system does not remember the new password or the new email
        // ARRANGE: Ensure the agent is on the profile settings page
        
        // ACT: Update profile settings with new credentials
        AgentUserPage.updateProfileAndVerify()

        // ASSERT: Validate that the updated credentials are remembered (Bug: They are not)
    })
})
