import App from "../../App";

describe("Characters List", () => {
  it("Should open characters list", () => {
    cy.mount(<App />);
    cy.login();
    cy.get('ul[role="menu"] a').contains("Marvel Characters").click();
    cy.get(".list-page").should("exist");
  });
});
