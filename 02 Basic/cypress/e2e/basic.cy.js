/// <reference types="cypress" />

describe("task page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5173/");
    cy.get("header img[alt='A list']").should("be.visible").should("have.attr", "src").and("include", "/logo.png");
    cy.get("header").find("img").should("be.visible").and("have.attr", "src").and("include", "/logo.png");
  });
  it("Should display the page title", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header h1").contains("React Tasks");
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("not.have.class", "error"); // Example of checking for a class
    // cy.contains("React Tasks"); // Any Where in Page
  });
});
