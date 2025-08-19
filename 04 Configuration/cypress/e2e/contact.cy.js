/// <reference types="cypress" />

describe("contact form", () => {
  before(() => {
    // This is run once before all tests
    cy.visit("/about");
    cy.getById("contact-input-message").type("Hello world!");
    cy.get("form").as("contactForm").should("be.visible");
  });
  beforeEach(() => {
    // This is run before each test
    cy.visit("/about");
    cy.getById("contact-input-message").should("have.value", "");
    cy.getById("contact-input-name").should("have.value", "");
    cy.getById("contact-input-email").should("have.value", "");
  });

  afterEach(() => {
    // This is run after each test
    cy.getById("contact-btn-submit").contains("Send Message").and("have.not.attr", "disabled");
  });
  after(() => {
    // This is run once after all tests
    cy.getById("contact-btn-submit").contains("Send Message").and("have.not.attr", "disabled");
    cy.getById("contact-input-message").should("have.value", "");
    cy.getById("contact-input-name").should("have.value", "");
    cy.getById("contact-input-email").should("have.value", "");
  });

  it("should submit the form", () => {
    cy.task("seedDatabase", "filename.csv").then((returnValue) => {
      // ... use returnValue
    });
    cy.getById("contact-input-message").type("Hello world!");
    cy.getById("contact-input-name").type("John Doe");
    cy.getById("contact-btn-submit").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.screenshot();
    cy.getById("contact-input-email").type("test@example.com ");
    cy.submitForm();
    cy.screenshot();
    cy.getById("contact-btn-submit").as("submitBtn");
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.submitForm();
    cy.getById("contact-btn-submit").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.getById("contact-btn-submit").contains("Send Message");
    cy.getById("contact-input-message").as("msgInput");
    cy.get("@msgInput").focus().blur();
    cy.get("@msgInput")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });

    cy.getById("contact-input-name").focus().blur();
    cy.getById("contact-input-name")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });

    cy.getById("contact-input-email").focus().blur();
    cy.getById("contact-input-email")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });
  });
});
