import React from "react";
import Todo from "../../src/Todo";

describe("Todo />", () => {
  it("allows users to add a task", () => {
    cy.mount(<Todo />);
    const task = "New Task";

    cy.get("input[type='text']").type(task);
    cy.get("button").contains("Add Task").click();

    cy.get("ul").should("contain", task);
  });

  it("allows users to delete a task", () => {
    cy.mount(<Todo />);
    const task1 = "First Task";
    const task2 = "Second Task";

    // Add two tasks
    cy.get("input[type='text']").type(task1);
    cy.get("button").contains("Add Task").click();
    cy.get("input[type='text']").clear().type(task2);
    cy.get("button").contains("Add Task").click();

    // Delete the first task
    cy.get("ul").contains(task1).click();

    // Verify the first task is deleted and the second task remains
    cy.get("ul").should("not.contain", task1);
    cy.get("ul").should("contain", task2);
  });

  it("clears the input field after adding a task", () => {
    cy.mount(<Todo />);
    const task = "Clear Input Task";

    cy.get("input[type='text']").type(task);
    cy.get("button").contains("Add Task").click();

    cy.get("input[type='text']").should("have.value", "");
  });
});
