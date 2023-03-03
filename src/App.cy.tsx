import { mount } from "cypress/react18";
import App from "./App";

describe("Login", () => {
  it("Should not log in without password", () => {
    cy.mount(<App />);
    cy.get("input#username").type("test");
    cy.get("button").click();
    cy.get("p#password-helper-text").should("be.visible");
    cy.wait(2000);
  });

  it("Should not log in without username", () => {
    cy.mount(<App />);
    cy.get("input#password").type("test");
    cy.get("button").click();
    cy.get("p#password-helper-text").should("be.visible");
    cy.wait(2000);
  });

  it("Should not log in without username and password", () => {
    cy.mount(<App />);
    cy.get("button").click();
    cy.get("p#password-helper-text").should("be.visible");
    cy.wait(2000);
  });

  it("Should log in", () => {
    cy.mount(<App />);
    cy.get("input#username").type("test");
    cy.get("input#password").type("test");
    cy.get("button").click();
    cy.get(".layout").should("be.visible");
  });
});
