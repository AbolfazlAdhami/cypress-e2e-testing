/// <reference types="cypress" />
const tasks = [
  {
    title: "Task 1",
    summary: "Summary 1",
    category: "important",
  },
  {
    title: "Task 2",
    summary: "Summary 2",
    category: "urgent",
  },
];

describe("task management ", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("dialog.modal").should("be.visible");
    cy.get("div.backdrop").click({ force: true });
    cy.get("div.backdrop").should("not.exist");
    cy.get("dialog.modal").should("not.exist");

    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });
  it("Should create a new task", () => {
    cy.visit("http://localhost:5173/");
    //     cy.get("div[id='task-control']").find("button").contains("Add Task").click();
    cy.get("button[data-cy='start-add-task-button']").click();

    const newTask = {
      title: "New Task",
      summary: "Some Text",
    };

    cy.get("form#new-task-form").within(() => {
      cy.get("input#title").type(newTask.title);
      cy.get("#summary").type(newTask.summary);
      cy.get("button[type='submit']").click();
    });
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    cy.get(".task").should("have.length", 1);
    cy.get(".task")
      .first()
      .within(() => {
        cy.get("h2").contains(newTask.title);
        cy.get("p").contains(newTask.summary);
        cy.get("span.task-category").contains("🔵");
      });
  });

  it("Should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.contains("Please provide values");
  });

  it("Should filter tasks base category tag", () => {
    cy.visit("http://localhost:5173/");

    tasks.map((task) => {
      cy.contains("Add Task").click();
      cy.get("form#new-task-form").within(() => {
        cy.get("input#title").type(task.title);
        cy.get("#summary").type(task.summary);
        cy.get("select#category").select(task.category);
        cy.get("button[type='submit']").click();
      });
    });
    cy.get(".task").should("have.length", 2);
    cy.get("#filter").select("low");
    cy.get(".task").should("have.length", 0);
    cy.get("#filter").select("important");
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 2);
  });

  it("Should add multiple tasks", () => {
    cy.visit("http://localhost:5173/");
    tasks.map((task) => {
      cy.contains("Add Task").click();
      cy.get("form#new-task-form").within(() => {
        cy.get("input#title").type(task.title);
        cy.get("#summary").type(task.summary);
        cy.get("button[type='submit']").click();
      });
    });
    cy.get(".task").should("have.length", 2);
    cy.get(".task").eq(0).contains("Task 1");
    cy.get(".task").eq(1).contains("Task 2");
  });
});
