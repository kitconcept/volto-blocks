context('Blocks Acceptance Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setCookie('lang', 'de');
    cy.setCookie('confirm_privacy', 'confirmed');
    cy.createContent('Document', 'document', 'Document', '/de');
    cy.autologin();
  });
  it('As editor I can add a link to a text tile', function () {
    // given
    cy.visit('/document/edit');
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block');

    // when
    cy.get('.tile.inner.text .public-DraftEditor-content')
      .type('Colorless green ideas sleep furiously.')
      .setSelection('furiously');
    cy.get('.draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(2)').click();
    cy.get('.link-form-container input').type('https://google.com{enter}');
    cy.get('#toolbar-save').click();

    // then
    cy.get('.wrapper').contains('Colorless green ideas sleep furiously.');
    cy.get('.wrapper a')
      .should('have.attr', 'href')
      .and('include', 'https://google.com');
  });
});
// Low level command reused by `setSelection` and low level command `setCursor`
Cypress.Commands.add('selection', { prevSubject: true }, (subject, fn) => {
  cy.wrap(subject).trigger('mousedown').then(fn).trigger('mouseup');

  cy.document().trigger('selectionchange');
  return cy.wrap(subject);
});

Cypress.Commands.add(
  'setSelection',
  { prevSubject: true },
  (subject, query, endQuery) => {
    return cy.wrap(subject).selection(($el) => {
      if (typeof query === 'string') {
        const anchorNode = getTextNode($el[0], query);
        const focusNode = endQuery ? getTextNode($el[0], endQuery) : anchorNode;
        const anchorOffset = anchorNode.wholeText.indexOf(query);
        const focusOffset = endQuery
          ? focusNode.wholeText.indexOf(endQuery) + endQuery.length
          : anchorOffset + query.length;
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      } else if (typeof query === 'object') {
        const el = $el[0];
        const anchorNode = getTextNode(el.querySelector(query.anchorQuery));
        const anchorOffset = query.anchorOffset || 0;
        const focusNode = query.focusQuery
          ? getTextNode(el.querySelector(query.focusQuery))
          : anchorNode;
        const focusOffset = query.focusOffset || 0;
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      }
    });
  },
);

// Low level command reused by `setCursorBefore` and `setCursorAfter`, equal to `setCursorAfter`
Cypress.Commands.add(
  'setCursor',
  { prevSubject: true },
  (subject, query, atStart) => {
    return cy.wrap(subject).selection(($el) => {
      const node = getTextNode($el[0], query);
      const offset =
        node.wholeText.indexOf(query) + (atStart ? 0 : query.length);
      const document = node.ownerDocument;
      document.getSelection().removeAllRanges();
      document.getSelection().collapse(node, offset);
    });
    // Depending on what you're testing, you may need to chain a `.click()` here to ensure
    // further commands are picked up by whatever you're testing (this was required for Slate, for example).
  },
);

Cypress.Commands.add(
  'setCursorBefore',
  { prevSubject: true },
  (subject, query) => {
    cy.wrap(subject).setCursor(query, true);
  },
);

Cypress.Commands.add(
  'setCursorAfter',
  { prevSubject: true },
  (subject, query) => {
    cy.wrap(subject).setCursor(query);
  },
);

// Helper functions
function getTextNode(el, match) {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  if (!match) {
    return walk.nextNode();
  }

  const nodes = [];
  let node;
  while ((node = walk.nextNode())) {
    if (node.wholeText.includes(match)) {
      return node;
    }
  }
}

function setBaseAndExtent(...args) {
  const document = args[0].ownerDocument;
  document.getSelection().removeAllRanges();
  document.getSelection().setBaseAndExtent(...args);
}
