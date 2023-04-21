/// <reference types="cypress" />

import { getTest } from '../utils/getTestElement';

describe('change theme', () => {
  it('passes', () => {
    cy.visit('/page1');
    getTest('change-theme-button').click();
    cy.get('html').should('have.class', 'theme-dark');
    getTest('change-theme-button').click();
    cy.get('html').should('have.class', 'theme-light');
  });
});
