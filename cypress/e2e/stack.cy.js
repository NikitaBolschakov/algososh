import { DELAY_IN_MS } from "../../src/constants/delays";
import { cyAdd, cyChanging, cyCircle, cyClear, cyDefault, cyDelete, cyForm, cyInput } from "../constants";

describe("Корректная работа стека", () => {
  const addFirst = (value) => {
    cy.clock();

    cy.get(cyForm).within(() => {
      cy.get(cyInput).type(value); //в инпут написать value
      cy.get(cyAdd).should("be.not.disabled"); //кнопка добавить не заблокирована
      cy.get(cyDelete).should("be.disabled"); //остальные заблокированы
      cy.get(cyClear).should("be.disabled");
    });

    cy.get(cyForm).within(() => {
      cy.get(cyAdd).click(); //произведен клик
      cy.get(cyDelete).should("be.disabled"); //на первой лоадер, эти заблокированы
      cy.get(cyClear).should("be.disabled");
    });

    cy.get(cyCircle)
      .contains(value) //в кружке есть данное значение
      .parent() //получить интерфейс родительского элемента DOM
      .invoke("attr", "class") //получить список классов элемента
      .then((classes) => expect(classes).contains(cyChanging)); //кружок должен быть розовый

    cy.tick(DELAY_IN_MS);
    cy.wait(DELAY_IN_MS);
  };

  const addNext = (value) => {
    cy.clock();

    //при наборе нового значения все кнопки доступны
    cy.get(cyForm).within(() => {
      cy.get(cyInput).type(value);
      cy.get(cyAdd).should("be.not.disabled");
      cy.get(cyDelete).should("be.not.disabled");
      cy.get(cyClear).should("be.not.disabled");
    });

    cy.tick(DELAY_IN_MS);

    //после клика cyDelete и cyClear заблокировались
    cy.get(cyForm).within(() => {
      cy.get(cyAdd).click();
      cy.get(cyDelete).should("be.disabled");
      cy.get(cyClear).should("be.disabled");
    });

    //кружок появился розовым
    cy.get(cyCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyChanging));

    cy.tick(DELAY_IN_MS);
    cy.wait(DELAY_IN_MS);
  };

  beforeEach(() => {
    cy.visit(`http://localhost:3000/stack`);
  });

  it("При пустом инпуте, кнопка добавления недоступна", function () {
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", ""); //пустой инпут
      cy.get(cyAdd).should("be.disabled");      //все кнопки заблокированы
      cy.get(cyDelete).should("be.disabled");
      cy.get(cyClear).should("be.disabled");
    });
  });

  it("Корректное добавление в стек", function () {
    cy.clock();

    addFirst("1"); //добавили первый 

    cy.get(cyCircle)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault)); //кружок покрасился в синий

    addNext("2"); //добавили следующий 

    //первый становится синим с текстом 1, второй становится синим с текстом 2
    cy.get(cyCircle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
      cy.get(item[0]).children().should("have.text", "1");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
      cy.get(item[1]).children().should("have.text", "2");
    });

    addNext("3"); //добавили следующий

    //все стали синими с корректным текстом
    cy.get(cyCircle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
      cy.get(item[0]).children().should("have.text", "1");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
      cy.get(item[1]).children().should("have.text", "2");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
      cy.get(item[2]).children().should("have.text", "3");
    });
  });

  it("Корректное удаление из стека", function () {
    cy.clock();

    addFirst("1");
    addNext("2");

    //проверили что инпут пустой кнопка добавления заблокирована, нажали удалить
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", "");
      cy.get(cyAdd).should("be.disabled");
      cy.get(cyDelete).click();
    });

    //первый должен быть синим, второй розовым
    cy.get(cyCircle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classes) => expect(classes).contains(cyDefault));
        cy.get(item[0]).children().should("have.text", "1");
  
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classes) => expect(classes).contains(cyChanging));
        cy.get(item[1]).children().should("have.text", "2");
      });

    cy.tick(DELAY_IN_MS);

    //оставшийся должен быть синим
    cy.get(cyCircle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
      cy.get(item[0]).children().should("have.text", "1");
    });

    //поле пустое, кнопка добавить заблокирована, остальные доступны
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", "");
      cy.get(cyAdd).should("be.disabled");
      cy.get(cyDelete).should("be.not.disabled");
      cy.get(cyClear).should("be.not.disabled");
    });
  });

  it("Корректное поведение кнопки «Очистить»", function () {
    cy.clock();
    
    addFirst("1");
    addNext("2");
    addNext("3");

    cy.get(cyForm).within(() => {
      cy.get(cyClear).click();
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).should("not.exist");  
  });
});