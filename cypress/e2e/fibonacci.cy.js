import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { cyButton, cyCircle, cyForm, cyInput } from "../constants";

describe("Корректная работа страницы /fibonacci", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("При пустом инпуте, кнопка добавления недоступна", function () {
    cy.get(cyForm) //получаем элемент формы
      .within(() => {
        cy.get(cyInput).should("have.value", ""); //получаем инпут.должен иметь значение пусто
        cy.get(cyButton).should("be.disabled");   //получаем кнопку.должна быть заблокирована
      });
  });

  it("Корректная генерация чисел фибоначчи", function () {
    cy.clock(); //.clock - чтобы не использовать wait

    cy.get(cyForm) //находим форму
      .within(() => {
        cy.get(cyInput).type("6");                  //в инпут забиваем 6
        cy.get(cyButton).click();                   //нажимаем на кнопку
        cy.get(cyInput).should("have.value", "");   //инпут должен очиститься
      });

    cy.tick(SHORT_DELAY_IN_MS); //отрабатывает короткая задержка

    //во всех кружках нашли 1 ребенка, кружки имеют текст '1'
    cy.get(cyCircle)
      .children()
      .should("have.length", "1")
      .should("have.text", "1");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(cyCircle)
      .children()
      .should("have.length", "2")
      .should("have.text", "11");

    cy.tick(SHORT_DELAY_IN_MS);

    //в кружках нашли 3 ребенка, кружки имеют текст '112'
    cy.get(cyCircle)
      .children()
      .should("have.length", "3")
      .should("have.text", "112");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(cyCircle)
      .children()
      .should("have.length", "4")
      .should("have.text", "1123");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(cyCircle)
      .children()
      .should("have.length", "5")
      .should("have.text", "11235");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(cyCircle)
      .children()
      .should("have.length", "6")
      .should("have.text", "112358");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(cyCircle)
      .children()
      .should("have.length", "7")
      .should("have.text", "11235813");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(cyForm).within(() => {
      cy.get(cyButton).should("be.disabled"); //кнопка опять заблокирована
    });
  });
});