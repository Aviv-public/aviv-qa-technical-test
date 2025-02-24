class HomePage {
   
    defaultTestData = {
        location: 'Los Angeles',
        minPrice: '100000',
        maxPrice: '500000',
        propertyType: 'For Sale',
        beds: '2+ Beds'
    };
    
    // Selectors
    elements = {
        realEstateLink: () => cy.get(':nth-child(1) > .flex > .ml-2').as('RealEstateLink'),
        propertiesLink: () => cy.get('[href="/properties"]').as('PropertiesLink'),
        agentsLink: () => cy.get('[href="/agents"]').as('AgentsLink'),
        aboutLink: () => cy.get('[href="/about"]').as('AboutLink'),
        loginLink: () => cy.get('.ml-4 > .ml-2').as('LoginLink'),
        mainHeading: () => cy.get('.text-4xl').as('MainHeading'),
        subHeading: () => cy.get('.text-center > .text-xl').as('SubHeading'),
        locationInput: () => cy.get(':nth-child(1) > div.w-full > .block').as('LocationInput'),
        minPriceInput: () => cy.get(':nth-child(2) > div.w-full > .block').as('MinPriceInput'),
        maxPriceInput: () => cy.get(':nth-child(3) > div.w-full > .block').as('MaxPriceInput'),
        propertyTypeDropdown: () => cy.get(':nth-child(4) > div.w-full > .block').as('PropertyTypeDropdown'),
        bedsDropdown: () => cy.get(':nth-child(5) > div.w-full > .block').as('BedsDropdown'),
        searchButton: () => cy.get('[class*="bg-blue-600"]').eq(0).as('SearchButton'), // Clicks the first match
        resetButton: () => cy.get('.md\\:col-span-2 > .border').as('ResetButton'),
        viewDetailsButton: () => cy.get('.my-12 > .grid > :nth-child(1) > .p-4 > :nth-child(5) > .inline-flex').as('ViewDetailsButton'),
        propertiesSearchElements: {
            locationInput: () => cy.get(':nth-child(1) > div.w-full > .block').as('PropertyLocationInput'),
            minPriceInput: () => cy.get(':nth-child(2) > div.w-full > .block').as('PropertyMinPriceInput'),
            maxPriceInput: () => cy.get(':nth-child(3) > div.w-full > .block').as('PropertyMaxPriceInput'),
            allTypesInput: () => cy.get(':nth-child(4) > div.w-full > .block').as('PropertyTypesInput'),
            anyBedsInput: () => cy.get(':nth-child(5) > div.w-full > .block').as('PropertyBedsInput'),
            searchButton: () => cy.get('.md\\:col-span-2 > .bg-blue-600').as('PropertySearchButton'),
            resetButton: () => cy.get('.md\\:col-span-2 > .border').as('PropertyResetButton')
        },
        agentsSearchElements: {
            searchInput: () => cy.get(':nth-child(1) > div.w-full > .block').as('AgentSearchInput'),
            specializationDropdown: () => cy.get(':nth-child(2) > div.w-full > .block').as('SpecializationDropdown'),
            locationInput: () => cy.get(':nth-child(3) > div.w-full > .block').as('AgentLocationInput'),
            searchButton: () => cy.get('.flex > .bg-blue-600').as('AgentSearchButton'),
            resultsGrid: () => cy.get('.mt-8 > .grid').as('AgentsResultGrid')
        }
    };

    // Actions
    visit() {
        cy.visit('/');
    }

    clickRealEstateLink() {
        this.elements.realEstateLink().click();
    }

    clickPropertiesLink() {
        this.elements.propertiesLink().click();
    }

    clickAgentsLink() {
        this.elements.agentsLink().click();
    }

    clickAboutLink() {
        this.elements.aboutLink().click();
    }

    clickLoginLink() {
        this.elements.loginLink().click();
    }

    typeLocation(location) {
        this.elements.locationInput().clear().type(location);
    }

    typeMinPrice(price) {
        this.elements.minPriceInput().clear().type(price);
    }

    typeMaxPrice(price) {
        this.elements.maxPriceInput().clear().type(price);
    }

    selectPropertyType(type) {
        this.elements.propertyTypeDropdown().select(type);
    }

    selectBeds(beds) {
        this.elements.bedsDropdown().select(beds);
    }

    clickSearchButton() {
        this.elements.searchButton().click();
    }

    clickResetButton() {
        this.elements.resetButton().click();
    }

    clickViewDetails() {
        this.elements.viewDetailsButton().click();
    }

    // Search for property with test data
    searchForProperty(data = this.defaultTestData) {
        this.typeLocation(data.location);
        this.typeMinPrice(data.minPrice);
        this.typeMaxPrice(data.maxPrice);
        this.selectPropertyType(data.propertyType);
        this.selectBeds(data.beds);
        this.clickSearchButton();
    }

    // Verifications
    verifyMainHeading() {
        this.elements.mainHeading().should('have.text', 'Find Your Dream Property');
    }

    verifySubHeading() {
        this.elements.subHeading().should('have.text', 'Discover the perfect home from our extensive collection of properties');
    }

    verifyPropertyTypeDropdown(value = 'All Types') {
        this.elements.propertyTypeDropdown().find('option:selected').should('have.text', value);
    }

    verifyBedsDropdown(value = 'Any Beds') {
        this.elements.bedsDropdown().find('option:selected').should('have.text', value);
    }

    searchPropertiesFromHome(searchData = {
        location: 'Los Angeles',
        minPrice: '200000',
        maxPrice: '500000',
        type: 'For Sale',
        beds: '2+ Beds'
    }) {
        // Navigate to properties page
        this.elements.propertiesLink().click();

        // Fill in search criteria
        this.elements.propertiesSearchElements.locationInput().clear().type(searchData.location);
        this.elements.propertiesSearchElements.minPriceInput().clear().type(searchData.minPrice);
        this.elements.propertiesSearchElements.maxPriceInput().clear().type(searchData.maxPrice);
        
        // Select correct values from dropdowns
        this.elements.propertiesSearchElements.allTypesInput().select('For Sale');
        this.elements.propertiesSearchElements.anyBedsInput().select('2+ Beds');

        // Click search
        this.elements.propertiesSearchElements.searchButton().click();

        // Check for results or no results message
        cy.get('body').then($body => {
            if ($body.find('.relative > .w-full').length > 0) {
                // Properties found
                cy.get('.relative > .w-full').should('be.visible');
            } else {
                // No properties found
                cy.contains('No properties match your search criteria.').should('be.visible');
                cy.contains('Try adjusting your filters or search terms.').should('be.visible');
                
                // Reset and try with just location
                this.elements.propertiesSearchElements.resetButton().click();
                this.elements.propertiesSearchElements.locationInput().clear().type(searchData.location);
                this.elements.propertiesSearchElements.searchButton().click();
            }
        });
    }

    resetPropertiesSearch() {
        // Click reset button
        this.elements.propertiesSearchElements.resetButton().click();

        // Verify fields are reset
        this.elements.propertiesSearchElements.locationInput().should('have.value', '');
        this.elements.propertiesSearchElements.minPriceInput().should('have.value', '');
        this.elements.propertiesSearchElements.maxPriceInput().should('have.value', '');
        this.elements.propertiesSearchElements.allTypesInput().should('have.value', '');  // or whatever the default value is
        this.elements.propertiesSearchElements.anyBedsInput().should('have.value', '');   // or whatever the default value is
    }

    searchPropertiesWithLocationOnly(location = 'Los Angeles') {
        // Navigate to properties page
        this.elements.propertiesLink().click();

        // Reset any existing filters
        this.elements.propertiesSearchElements.resetButton().click();

        // Search with just location
        this.elements.propertiesSearchElements.locationInput().clear().type(location);
        this.elements.propertiesSearchElements.searchButton().click();

        // Check for results
        cy.get('body').then($body => {
            if ($body.find('.relative > .w-full').length > 0) {
                cy.get('.relative > .w-full').should('be.visible');
            } else {
                cy.contains('No properties match your search criteria.').should('be.visible');
            }
        });
    }

    verifyPropertiesSearchForm() {
        // Verify all search elements are present
        this.elements.propertiesSearchElements.locationInput().should('be.visible');
        this.elements.propertiesSearchElements.minPriceInput().should('be.visible');
        this.elements.propertiesSearchElements.maxPriceInput().should('be.visible');
        this.elements.propertiesSearchElements.allTypesInput().should('be.visible');
        this.elements.propertiesSearchElements.anyBedsInput().should('be.visible');
        this.elements.propertiesSearchElements.searchButton().should('be.visible');
        this.elements.propertiesSearchElements.resetButton().should('be.visible');
    }

    searchAgentsFromHome(searchData = {
        name: '',
        specialization: 'Luxury Properties',
        location: 'Los Angeles'
    }) {
        // Navigate to agents page
        this.elements.agentsLink().click();

        // Fill in search criteria if name provided
        if (searchData.name) {
            this.elements.agentsSearchElements.searchInput().clear().type(searchData.name);
        }

        // Select specialization
        this.elements.agentsSearchElements.specializationDropdown().select('Luxury Properties');

        // Enter location
        this.elements.agentsSearchElements.locationInput().clear().type(searchData.location);

        // Click search
        this.elements.agentsSearchElements.searchButton().click();

        // Verify results
        cy.get('body').then($body => {
            if ($body.find('.mt-8 > .grid').length > 0) {
                // Verify agents grid is visible and contains results
                this.elements.agentsSearchElements.resultsGrid()
                    .should('be.visible')
                    .and('not.be.empty');
                cy.contains('Luxury Properties').should('be.visible');
            } else {
                cy.contains('No agents match your search criteria.').should('be.visible');
                
                // Reset and try with just location
                cy.get('.flex > .border').click(); // Reset button
                this.elements.agentsSearchElements.locationInput().clear().type(searchData.location);
                this.elements.agentsSearchElements.searchButton().click();
            }
        });
    }

    verifyAgentSearchForm() {
        // Navigate to agents page
        this.elements.agentsLink().click();

        // Verify all search elements are present
        this.elements.agentsSearchElements.searchInput().should('be.visible');
        this.elements.agentsSearchElements.specializationDropdown().should('be.visible');
        this.elements.agentsSearchElements.locationInput().should('be.visible');
        this.elements.agentsSearchElements.searchButton().should('be.visible');
    }

}

export default new HomePage();
