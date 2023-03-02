import { mount } from "cypress/react18";
import App from "./App";

describe("Login", () => {
  it("mounts", () => {
    cy.mount(<App />);
    cy.get("input#username").type("test");
    cy.get("input#password").type("test");
    cy.get("button").click();
    cy.get(".layout").should("be.visible");
  });
});
