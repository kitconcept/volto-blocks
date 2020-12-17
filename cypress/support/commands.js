// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('autologin', () => {
  let api_url;
  api_url = 'http://localhost:55001/plone';
  cy.request({
    method: 'POST',
    url: `${api_url}/@login`,
    headers: { Accept: 'application/json' },
    body: { login: 'admin', password: 'secret' },
  }).then((response) => cy.setCookie('auth_token', response.body.token));
});

Cypress.Commands.add(
  'createContent',
  (contentType, contentId, contentTitle, path = '') => {
    let api_url;
    api_url = 'http://localhost:55001/plone';
    cy.request({
      method: 'POST',
      url: `${api_url}/${path}`,
      headers: {
        Accept: 'application/json',
      },
      auth: {
        user: 'admin',
        pass: 'secret',
      },
      body: {
        '@type': 'Document',
        id: contentId,
        title: contentTitle,
        tiles: {
          'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
          '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'text' },
        },
        tiles_layout: {
          items: [
            'd3f1c443-583f-4e8e-a682-3bf25752a300',
            '7624cf59-05d0-4055-8f55-5fd6597d84b0',
          ],
        },
      },
    });
  },
);
