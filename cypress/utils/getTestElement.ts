/// <reference types="cypress" />

export function getTest(selector: string) {
  return cy.get(`[data-cy="${selector}"]`);
}
