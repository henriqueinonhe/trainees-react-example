import { format, parse, parseISO } from "date-fns";

describe("When creating entry", () => {
  const label = "Groceries";
  const amount = "100.23";
  const date = "2020-01-01";
  const anotherLabel = "Car";
  const anotherAmount = "900.23";
  const anotherDate = "2022-01-01";
  
  it("Shows Entry Created notification", () => {
    cy.goToEntryForm();
    cy.fillForm(label, amount, date);

    cy.get("body").trigger("keydown", {
      key: "Enter",
    });
    cy.getByTestId("Notification").should("have.text", "❕ Entry created!");

  });

  it("Shows Entry Edited notification", () => {
    cy.goToEntryForm();
    cy.fillForm(label, amount, date);

    cy.get("body").trigger("keydown", {
      key: "Enter",
    });

    cy.getByTestId("EditEntryButton").click();

    cy.fillForm(anotherLabel, anotherAmount, anotherDate);

    cy.get("body").trigger("keydown", {
      key: "Enter",
    });
    cy.wait(1000);
    cy.getByTestId("Notification").should("have.text", "❕ Entry edited!");

  });

  it("Shows Entry Deleted notification", () => {
    cy.goToEntryForm();
    cy.fillForm(label, amount, date);

    cy.get("body").trigger("keyup", {
      key: "Enter",
    });

    cy.getByTestId("EditEntryButton").click();

    cy.wait(1000);

    cy.get("body").trigger("keydown", {
      key: "Delete",
    });
    cy.wait(1000);
    cy.getByTestId("Notification").should("have.text", "❕ Entry deleted!");

  });
});
