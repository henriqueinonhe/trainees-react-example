import { format, parse, parseISO } from "date-fns";

describe("When creating entry", () => {
  it("Creates entry successfully", () => {
    const label = "Groceries";
    const amount = "100.23";
    const date = "2020-01-01";

    cy.goToEntryForm();

    cy.fillForm(label, amount, date);

    cy.getByTestId("SaveButton").click();

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
});
