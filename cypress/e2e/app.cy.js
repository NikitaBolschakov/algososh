it("Доступен по localhost:3000", function () {
  cy.visit("http://localhost:3000"); //выполнен переход
  cy.contains("МБОУ АЛГОСОШ");       //есть такой текст на странице
});
