import { format, parse, parseISO } from "date-fns";

describe("When creating entry with shortcuts", () => {
  const label = "Groceries";
  const amount = "100.23";
  const date = "2020-01-01";
  it("Creates entry successfully pressing Enter", () => {
    cy.goToEntryForm();
    cy.fillForm(label, amount, date);

    cy.get("body").trigger("keydown", {
      key: "Enter",
    });

    cy.getByTestId("DashboardEntry")
      .findByTestId("DashboardEntryLabel")
      .should("have.text", label);
    cy.getByTestId("DashboardEntry")
      .findByTestId("DashboardEntryAmount")
      .should("contain.text", amount);
    cy.getByTestId("DashboardEntry")
      .findByTestId("DashboardEntryDate")
      .should("have.text", format(parseISO(date, "yyyy-MM-dd"), "M/d/yyyy"));
  });

  it("Goes back to Dashboard pressing Escape", () => {
    cy.goToEntryForm();
    cy.wait(1000);
    cy.get("body").trigger("keydown", {
      key: "Escape",
    });
    cy.wait(1000);
    cy.getByTestId("DashboardEntry").should("not.exist");
  });

  it("Deletes the Entry pressing Delete", () => {
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

    cy.getByTestId("DashboardEntry").should("not.exist");
  });
});
