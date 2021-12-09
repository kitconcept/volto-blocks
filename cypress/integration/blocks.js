import {
  getSlateEditorAndType,
  getSelectedSlateEditor,
} from '../support/slate';

context('Blocks Acceptance Tests', () => {
  describe('Text Block Tests', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Document',
      });
      cy.visit('/');
    });

    it('As editor I can add a page with a text block', function () {
      // when I add a page with a text block
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-document').click();
      cy.get('.documentFirstHeading')
        .type('My Page')
        .get('.documentFirstHeading')
        .contains('My Page');

        getSlateEditorAndType(
          '.block .slate-editor [contenteditable=true]',
          'This is the text',
        );

      getSelectedSlateEditor().contains('This is the text');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    });

    it('As editor I can add a link to a text block', function () {
      cy.navigate('/document/edit');

      // when I create a link
      getSlateEditorAndType(
        '.slate-editor [contenteditable=true]',
        'Colorless green ideas sleep furiously.',
      ).setSelection('furiously');

      cy.get('.slate-inline-toolbar .button-wrapper:nth-of-type(3)').click();
      cy.get('.link-form-container input').type('https://google.com{enter}');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/document');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('document');

      // then the page view should contain a link
      cy.get('.ui.container p').contains(
        'Colorless green ideas sleep furiously.',
      );
      cy.get('.ui.container p a')
        .should('have.attr', 'href')
        .and('include', 'https://google.com');
    });
    it('As editor I can add a button block', () => {
      // When I create a button block
      cy.navigate('/document/edit');
      cy.get('.slate-editor [contenteditable=true]').click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .buttonBlock').click();
      cy.get(' #blockform-fieldset-default  #field-title').type('Button Block');
      cy.get('#toolbar-save').click();

      // then the page view should contain a link
      cy.get('.block.button button').contains('Button Block');
    });
  });
});
