describe("When Editing entry", () => {
  it("Edits entry successfully", () => {
    const label = "Groceries";
    const amount = "100.23";
    const date = "2020-01-01";
    const anotherLabel = "Gym";
    const anotherAmount = "300.23";
    const anotherDate = "2020-01-02";

    cy.goToEntryForm();

    cy.fillForm(label, amount, date);
    cy.getByTestId("SaveButton").click();

    cy.getByTestId("EditEntryButton").click();

    cy.fillForm(anotherLabel, anotherAmount, anotherDate);
    cy.getByTestId("SaveButton").click();

    cy.getByTestId("DashboardEntry")
      .findByTestId("DashboardEntryLabel")
      .should("have.text", anotherLabel);
    cy.getByTestId("DashboardEntry")
      .findByTestId("DashboardEntryAmount")
      .should("contain.text", anotherAmount);
    cy.getByTestId("DashboardEntry")
      .findByTestId("DashboardEntryDate")
      .should(
        "have.text",
        format(parseISO(anotherDate, "yyyy-MM-dd"), "M/d/yyyy")
      );
  });
});
