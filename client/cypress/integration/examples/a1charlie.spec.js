/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

const Email = chance.email();
const BASE_URL = "http://localhost:3000/";

context("Actions", () => {
  //   beforeEach(() => {
  //     cy.visit("http://localhost:3000/");
  //   });

  it("loaded main page", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Charlie");
  });

  it("SIGN IN", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign").click();
    cy.location("pathname").should("include", "signin");
    //cy.should("contain", "Address").and("be.visible");
  });

  it("login error", () => {
    cy.visit("http://localhost:3000/signin");
    cy.get('[id="email1"]', { multiple: true }).type("--pokazit");
    cy.get('[type="submit"]').click();
    cy.contains("does not match");
  });

  it("login pass", () => {
    cy.visit("http://localhost:3000/signin");

    cy.get('[type="submit"]').click();
    cy.wait("@registerCall");
    cy.url().should("eq", `${BASE_URL}`);
    cy.should("not.contain", "Sign");
  });
});
