/// <reference types="cypress" />

describe("contact form", () => {
  it("should submit the contact form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get("textarea[data-cy='contact-input-message']").type("This is Message");
    cy.get('input[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.equal("Send Message");
    });

    const btn = cy.get('[data-cy="contact-btn-submit"]');
    btn.contains("Send Message").should("not.be.disabled");
    cy.get('input[data-cy="contact-input-email"]').type("test@gmail.com{enter}");
    //     btn.click();
    btn.contains("Sending...");
    btn.should("be.disabled");
    btn.should("have.attr", "disabled");

    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.exist;
    });

    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").contains("Send Message").and("not.be.disabled").click();
    cy.get("@submitBtn").contains("Sending...").and("be.disabled").and("have.attr", "disabled");
  });

  it("Should validate the contact form inputs", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('form button[type="submit"]')
      .click()
      .then((el) => {
        expect(el.attr("disabled")).to.be.undefined;
        expect(el.text()).to.not.equal("Sending...");
        expect(el.text()).to.equal("Send Message");
      });
    // cy.screenshot();
    cy.get('[data-cy="contact-input-message"]').as("msgInput");
    cy.get("@msgInput").focus().blur();
    cy.get("@msgInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    cy.get("@msgInput")
      .parent()
      .should((el) => {
        expect(el.attr("class")).to.not.be.undefined;
        expect(el.attr("class")).to.include("invalid");
      });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });
    // cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).to.be.exist;
        expect(el.attr("class")).to.include("invalid");
      });
  });
});
