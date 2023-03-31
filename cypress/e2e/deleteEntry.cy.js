describe("When Deleting entry", () => {
  it("Deletes entry successfully", () => {
    const label = "Groceries";
    const amount = "100.23";
    const date = "2020-01-01";

    cy.goToEntryForm();

    cy.fillForm(label, amount, date);

    cy.getByTestId("SaveButton").click();

    cy.getByTestId("DeletEntryButton").click();

    cy.getByTestId("DashboardEntry").should("not.exist");
  });
});
