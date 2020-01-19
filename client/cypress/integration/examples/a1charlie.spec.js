/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("loaded main page", () => {
    cy.contains("Charlie");
  });

  it("login", () => {
    cy.contains("Create").click();
    cy.should("contain", "login first").and("be.visible");
  });
});
