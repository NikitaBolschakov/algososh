describe("Корректная работа роутинга", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Открытие стартовой страницы", function () {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("Переход на страницу /recursion", function () {
    cy.get('a[href*="/recursion"]').click();
    cy.contains("Строка");
  });

  it("Переход на страницу /fibonacci", function () {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Переход на страницу /sorting", function () {
    cy.get('a[href*="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("Переход на страницу /stack", function () {
    cy.get('a[href*="/stack"]').click();
    cy.contains("Стек");
  });

  it("Переход на страницу /queue", function () {
    cy.get('a[href*="/queue"]').click();
    cy.contains("Очередь");
  });

  it("Переход на страницу /list", function () {
    cy.get('a[href*="/list"]').click();
    cy.contains("Связный список");
  });
});