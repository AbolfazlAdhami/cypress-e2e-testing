describe("First Cypress Test", () => {
  it("Visits Page and Check List Box", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("contain", "Getting Started with Cypress");
    cy.get("li").should("have.length", 6);
    cy.get("img[alt='Logo']").should("be.visible");
  });
});
