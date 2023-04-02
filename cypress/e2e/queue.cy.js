import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  cyAdd,
  cyChanging,
  cyCircle,
  cyClear,
  cyDefault,
  cyDelete,
  cyForm,
  cyInput,
} from "../constants";

describe("Корректная работа очереди", () => {
  const addFirst = (value) => {
    cy.clock();

    //кнопка добавить не заблокирована, остальные заблокированы
    cy.get(cyForm).within(() => {
      cy.get(cyInput).type(value);
      cy.get(cyAdd).should("be.not.disabled");
      cy.get(cyDelete).should("be.disabled");
      cy.get(cyClear).should("be.disabled");
    });

    //произведен клик, cyDelete и cyClear эти заблокированы
    cy.get(cyForm).within(() => {
      cy.get(cyAdd).click();
      cy.get(cyDelete).should("be.disabled");
      cy.get(cyClear).should("be.disabled");
    });

    cy.get(cyCircle)
      .contains(value) //в кружке есть данное значение
      .parent() //получить интерфейс родительского элемента DOM
      .invoke("attr", "class") //получить список классов элемента
      .then((classes) => expect(classes).contains(cyChanging)); //кружок должен быть розовый

    cy.tick(DELAY_IN_MS);
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
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it("При пустом инпуте, кнопка добавления недоступна", function () {
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", "");
      cy.get(cyAdd).should("be.disabled");
      cy.get(cyDelete).should("be.disabled");
      cy.get(cyClear).should("be.disabled");
    });
  });

  it("Корректное добавление элемента в очередь", function () {
    cy.clock();

    //проверить что кружков 7 и все cyDefault
    cy.get(cyCircle)
      .should("have.length", 7)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(cyDefault));

    addFirst("1");

    cy.get(cyCircle).siblings("div").contains("head");
    cy.get(cyCircle).siblings("div").contains("tail");
    cy.get(cyCircle).siblings("p").contains("0");

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));

    cy.tick(DELAY_IN_MS);

    addNext("2");

    cy.get(cyCircle).contains("2").parent("div").nextAll().contains("tail");
    cy.get(cyCircle).siblings("p").contains("1");
    cy.get(cyCircle)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));

    cy.tick(DELAY_IN_MS);

    addNext("3");

    cy.get(cyCircle).contains("3").parent("div").nextAll().contains("tail");
    cy.get(cyCircle).siblings("p").contains("2");
    cy.get(cyCircle)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));
  });
  
  it("Корректное удаление элемента из очереди", function () {
    cy.clock();
    
    addFirst("1");

    cy.tick(DELAY_IN_MS);

    addNext("2");

    cy.tick(DELAY_IN_MS);

    addNext("3");

    cy.tick(DELAY_IN_MS);

    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", "");
      cy.get(cyAdd).should("be.disabled");
      cy.get(cyDelete).click();
    });

    cy.get(cyCircle)
      .first()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(cyChanging));

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("be.empty");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(cyDefault));

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(cyDefault));
      cy.get(item[1]).children().should("have.text", "2");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(cyDefault));
      cy.get(item[2]).children().should("have.text", "3");
    });

    cy.tick(DELAY_IN_MS);

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

    cy.tick(DELAY_IN_MS);

    addNext("2");

    cy.tick(DELAY_IN_MS);

    addNext("3");

    cy.tick(DELAY_IN_MS);

    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", "");
      cy.get(cyAdd).should("be.disabled");
      cy.get(cyClear).click();
    });

    cy.get(cyCircle).children().next().should("not.exist");

    cy.get(cyForm).within(() => {
      cy.get(cyClear).should("be.disabled");
    });
  }); 
});