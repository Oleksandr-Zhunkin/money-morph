describe('Exchange value from one currency to another', () => {
  it('should exchange value from one currency to another', () => {
    cy.visit('http://localhost:4200/');

    // Select the first currency
    cy.get('mat-select[id="mat-select-0"]').click();
    cy.get('mat-option').contains('USD').click();

    // Close the first select dropdown
    cy.get('body').click(0, 0);

    // Select the second currency
    cy.get('mat-select[id="mat-select-2"]').click();
    cy.get('mat-option').contains('USD').click();

    // Close the second select dropdown
    cy.get('body').click(0, 0);

    cy.get('mat-select[id="mat-select-0"]').invoke('text').then((firstSelectValue) => {
      cy.get('mat-select[id="mat-select-2"]').invoke('text').then((secondSelectValue) => {
        if (firstSelectValue === secondSelectValue) {
          // Perform actions if the values are the same(usd to usd)
          cy.get('input[id="mat-input-0"]').type('100').invoke('val').then((value) => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
              cy.get('input[id="mat-input-1"]').should('have.value', numericValue);
            }
          });
        } else {
          // Perform actions if the values are different(usd to uah)
          cy.get('ul[class="header-list"] :nth-child(1) :nth-child(2)').should('contain', '41.15');
          cy.get('input[id="mat-input-0"]').type('100').invoke('val').then((value) => {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
              cy.get('input[id="mat-input-1"]').should('have.value', numericValue * 41.15);
            }
          });

        }
      });
    });
  });
});
