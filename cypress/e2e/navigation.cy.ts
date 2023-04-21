/// <reference types="cypress" />

import { getTest } from '../utils/getTestElement';

describe('navigate through pages', () => {
  it('passes', () => {
    cy.visit('/page1');
    getTest('to-page-1-button').should('have.attr', 'disabled');
    getTest('to-page-2-button').click().should('have.attr', 'disabled');
  });
});
