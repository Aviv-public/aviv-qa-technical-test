import TestUserPage from '../pages/testUser'
import LoginPage from '../pages/loginPage'

describe('Test User Dashboard Tests', () => {
    beforeEach(() => {
        // ARRANGE
        LoginPage.visit()
        // ACT
        LoginPage.loginAsUser()
        // ASSERT
        LoginPage.verifyLoggedInUser('user')
    })

    it('should display dashboard correctly for user role', () => {
        // ACT
        TestUserPage.verifyDashboard()
        // ASSERT - inside page object method
    })

    it('should navigate through menu items successfully', () => {
        // ACT
        TestUserPage.navigateAndVerifyMenu()
        // ASSERT - inside page object method
    })

    it('should perform complete user workflow', () => {
        // ARRANGE - User is already logged in from beforeEach
        
        // ACT
        TestUserPage.verifyDashboard()
        TestUserPage.navigateAndVerifyMenu()
        // ASSERT
        TestUserPage.verifyContentGrid()
    })

    it('should update profile settings, logout and verify new credentials', () => { //Bug: This test will not pass because system does not remember the new password or the new email
        // ACT
        TestUserPage.updateProfileAndVerify()
        // ASSERT - inside page object method
    })
}) 