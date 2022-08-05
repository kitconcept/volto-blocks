describe('createContent Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });

  it('Create document', function () {
    cy.intercept('GET', '/**/my-page').as('content');
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.navigate('/my-page');
    cy.wait('@content');
    cy.get('.documentFirstHeading').should('have.text', 'My Page');
  });
  it('Create document with path', function () {
    cy.intercept('GET', '/**/child').as('content');
    cy.createContent({
      contentType: 'Document',
      contentId: 'container',
      contentTitle: 'My Container',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: '/container',
    });
    cy.navigate('/container/child');
    cy.wait('@content');
    cy.get('.documentFirstHeading').should('have.text', 'My Child');
  });
  it('Create document with custom id', function () {
    cy.intercept('GET', '/**/my-custom-id').as('content');
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-custom-id',
      contentTitle: 'My Page',
    });
    cy.navigate('/my-custom-id');
    cy.wait('@content');
    cy.get('.documentFirstHeading').should('have.text', 'My Page');
  });
  it('Create News Item', function () {
    cy.intercept('GET', '/**/my-news-item').as('content');
    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news-item',
      contentTitle: 'My News Item',
    });
    cy.navigate('/my-news-item');
    cy.wait('@content');
    cy.get('.documentFirstHeading').should('have.text', 'My News Item');
  });
  it('Create File', function () {
    cy.intercept('GET', '/**/my-file').as('content');
    cy.createContent({
      contentType: 'File',
      contentId: 'my-file',
      contentTitle: 'My File',
    });
    cy.navigate('/my-file');
    cy.wait('@content');
    cy.get('.documentFirstHeading').should('have.text', 'My File');
    cy.get('.view-wrapper a').should(
      'have.attr',
      'href',
      '/my-file/@@download/file',
    );
    // cy.get('.view-wrapper a').click();
  });
  it('Create Image', function () {
    cy.intercept('GET', '/**/my-image').as('content');
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });
    cy.navigate('/my-image');
    cy.wait('@content');
    cy.get('.documentFirstHeading').should('have.text', 'My Image');
    cy.get('.view-wrapper img')
      .should('have.attr', 'src')
      .and('include', '/my-image/@@images/');
    cy.get('.view-wrapper img').should('have.attr', 'alt', 'My Image');
    // cy.get('.view-wrapper a').click();
  });
});
