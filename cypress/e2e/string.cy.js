import { DELAY_IN_MS } from "../../src/constants/delays";
import { cyButton, cyChanging, cyCircle, cyDefault, cyForm, cyInput, cyModified } from "../constants";

describe("Корректная работа строки", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("При пустом инпуте, кнопка добавления недоступна", function () {
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", "");
      cy.get(cyButton).should("be.disabled");
    });
  });

  it("Корректно разворачивается строка", function () {
    cy.clock();

    cy.get(cyForm).within(() => {
      cy.get(cyInput).type("bread");
      cy.get(cyButton).click();
      cy.get(cyInput).should("have.value", ""); //инпут пустой
    });

    //пройтись по всем кружкам при первом рендере "bread"
    cy.get(cyCircle).then((item) => {
      cy.get(item[0])            //в первом элементе
        .invoke("attr", "class") //получить список классов элемента
        .then((classes) => expect(classes).contains(cyChanging)); //один из классов должен быть Changing - розовый
      cy.get(item[0]).children().should("have.text", "b"); //первая буква "b"

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault)); //должен быть синий
      cy.get(item[1]).children().should("have.text", "r"); //вторая буква "r"

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault)); //должен быть синий
      cy.get(item[2]).children().should("have.text", "e");  //третья буква "e"

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault)); //должен быть синий
      cy.get(item[3]).children().should("have.text", "a"); //четвертая буква "a"

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging)); //должен быть розовый
      cy.get(item[4]).children().should("have.text", "d"); //пятая буква буква "d"
    });

    cy.tick(DELAY_IN_MS);
    cy.wait(DELAY_IN_MS)

    //пройтись по всем кружкам при втором рендере "dreab"
    cy.get(cyCircle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified)); //должен быть зеленый
      cy.get(item[0]).children().should("have.text", "d");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging)); //должен быть розовый
      cy.get(item[1]).children().should("have.text", "r");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault)); //должен быть синий
      cy.get(item[2]).children().should("have.text", "e");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging)); //должен быть розовый
      cy.get(item[3]).children().should("have.text", "a");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified)); //должен быть зеленый
      cy.get(item[4]).children().should("have.text", "b");
    });

    cy.tick(DELAY_IN_MS);
    cy.wait(DELAY_IN_MS)

    //при третьем рендере "daerb"
    cy.get(cyCircle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified)); //должен быть зеленый
      cy.get(item[0]).children().should("have.text", "d");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified)); //должен быть зеленый
      cy.get(item[1]).children().should("have.text", "a");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging)); //должен быть розовый
      cy.get(item[2]).children().should("have.text", "e");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified)); //должен быть зеленый
      cy.get(item[3]).children().should("have.text", "r");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified)); //должен быть зеленый
      cy.get(item[4]).children().should("have.text", "b");
    });

    cy.tick(DELAY_IN_MS);
    cy.wait(DELAY_IN_MS);

    //при четвертом рендере "daerb"
    cy.get(cyCircle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified)); //должен быть зеленый
      cy.get(item[2]).children().should("have.text", "e");
    }); 

    cy.get(cyCircle)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyModified));

    cy.get(cyForm).within(() => {
      cy.get(cyButton).should("be.disabled");   //кнопка заблокирована
    });
  });
});