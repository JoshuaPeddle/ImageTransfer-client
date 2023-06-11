
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
    // Should contain an image with id='src_img'
    cy.get('#src_img', {timeout: 20000}).should('be.visible');
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
  });

  it('should download image', () => {
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
    // Open download popup
    cy.get('#export_popup_btn').click();
    // Select with id='export_select'
    cy.get('#export_select', {timeout: 20000}).select('image');
    // Should contain a button with id='export_btn'
    cy.get('#export_btn').click();

    // Should be an image in /cypress/downloads
    cy.readFile('cypress/downloads/image.png', 'base64', {timeout: 5000}).then((image) => {
      expect(image).to.have.lengthOf.at.least(100);
    });
  });

  it('should download gif', () => {
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
    // Open download popup
    cy.get('#export_popup_btn').click();
    // Select with id='export_select'
    cy.get('#export_select', {timeout: 20000}).select('gif');
    // Should contain a button with id='export_btn'
    cy.get('#export_btn').click();

    // Should be an image in /cypress/downloads
    cy.readFile('cypress/downloads/video.gif', 'base64', {timeout: 20000}).then((video) => {
      expect(video).to.have.lengthOf.at.least(100);
    });
  });

  it('should download mp4', () => {
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
    // Open download popup
    cy.get('#export_popup_btn').click();
    // Select with id='export_select'
    cy.get('#export_select', {timeout: 20000}).select('mp4');
    // Should contain a button with id='export_btn'
    cy.get('#export_btn').click();

    // Should be an image in /cypress/downloads
    cy.readFile('cypress/downloads/video.mp4', 'base64', {timeout: 40000}).then((video) => {
      expect(video).to.have.lengthOf.at.least(100);
    });
  });
});