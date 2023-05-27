describe('Simple test', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
  });

  it('should get random image', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Should contain a button with id='random_image_btn'
    cy.get('#random_image_btn').click();
    cy.wait(2000);
    // Should contain an image with id='src_img'
    cy.get('#src_img', {timeout: 20000}).should('be.visible');
    
    // Get the div named 'modelButtonsContainer' and select the first button with id='style_btn_' in it
    cy.get('[class*="modelButtonsContainer"]').find('[id^="style_btn_"]').first().click();

    // Should contain an image with id='res_img'
    cy.get('#res_img', {timeout: 20000}).should('be.visible');

    // 
  });

  it('should generate image', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Should contain an image with id='src_img'
    cy.get('#src_img', {timeout: 20000}).should('be.visible');
    cy.wait(1000);
    // Generate an image
    // eslint-disable-next-line quotes
    // Get the div named 'modelButtonsContainer' and select the first button with id='style_btn_' in it
    cy.get('[class*="modelButtonsContainer"]').find('[id^="style_btn_"]').first().click();

    // Should contain an image with id='res_img'
    cy.get('#res_img', {timeout: 20000}).should('be.visible');

    // 
  });
});