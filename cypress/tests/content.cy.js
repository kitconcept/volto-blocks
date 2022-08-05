context('Content Acceptance Tests', () => {
  beforeEach(() => {
    cy.autologin();
  });

  it('As a site administrator I can add a page', function () {
    // given
    cy.visit('/');

    // when
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading')
      .type('This is a page')
      .get('.documentFirstHeading')
      .contains('This is a page');
    cy.get('#toolbar-save').click();

    // then
    cy.contains('This is a page');
    cy.url().should('include', '/this-is-a-page');
  });
});
