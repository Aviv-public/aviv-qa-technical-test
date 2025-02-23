import AgentUserPage from '../pages/agentUser'
import HomePage from '../pages/homePage';

describe('HomePage Full Functional Tests', () => {
    
    beforeEach(() => {
        // Arrange
        HomePage.visit();
    });

    it('should verify main and sub headings', () => {
        // Act
        HomePage.verifyMainHeading();
        HomePage.verifySubHeading();

        // Assert
        cy.get('@MainHeading').should('have.text', 'Find Your Dream Property');
        cy.get('@SubHeading').should('have.text', 'Discover the perfect home from our extensive collection of properties');
    });

    it('should search and display results with default data', () => {   //This test is failing as expected because the search button is not working.
        // Arrange
        const data = HomePage.defaultTestData;

        // Act
        HomePage.searchForProperty(data);

        // Assert
        cy.url().should('include', '/properties');
        cy.get('.property-list').should('have.length.greaterThan', 0);
        cy.get('.property-card').each(($property) => {
            cy.wrap($property).should('contain.text', data.location);
            cy.wrap($property).should('contain.text', data.propertyType);
            cy.wrap($property).find('.property-price').invoke('text').then((price) => {
                const priceValue = parseInt(price.replace(/[^\d]/g, ''));
                expect(priceValue).to.be.greaterThan(parseInt(data.minPrice));
                expect(priceValue).to.be.lessThan(parseInt(data.maxPrice));
            });
        });
    });

    it('should reset the search form correctly', () => {
        // Arrange
        HomePage.searchForProperty();

        // Act
        HomePage.clickResetButton();

        // Assert
        HomePage.elements.locationInput().should('have.value', '');
        HomePage.elements.minPriceInput().should('have.value', '');
        HomePage.elements.maxPriceInput().should('have.value', '');
        HomePage.verifyPropertyTypeDropdown();
        HomePage.verifyBedsDropdown();
    });

    it('should ensure UI elements are clickable and lead to the correct pages', () => {
        
        // Act & Assert
        HomePage.clickRealEstateLink();
        cy.url().should('include', '/');

        HomePage.clickPropertiesLink();
        cy.url().should('include', '/properties');

        HomePage.clickAgentsLink();
        cy.url().should('include', '/agents');

        HomePage.clickAboutLink();
        cy.url().should('include', '/about');

        HomePage.clickLoginLink();
        cy.url().should('include', '/login');
    });

    it('should view property details and validate the URL', () => {
        // Arrange
        HomePage.searchForProperty();

        // Act
        HomePage.clickViewDetails();

        // Assert
        cy.url().should('include', '/properties/p1');
    });

    it('should verify sending message to agent on property details page', () => {
        // Arrange
        HomePage.clickViewDetails();
        AgentUserPage.sendMessageToAgent();
        
    })

    it('should verify search of properties', () => {
        // Full search with fallback
        HomePage.searchPropertiesFromHome() //This test passes but there is a bug in the search functionality. Shows 6 properties but there are none.

        // Search with just location
        HomePage.searchPropertiesWithLocationOnly()

        // Reset and verify
        HomePage.resetPropertiesSearch()
    })

    it('should verify search of agents', () => {
        HomePage.searchAgentsFromHome();
        HomePage.verifyAgentSearchForm();
    })
});
