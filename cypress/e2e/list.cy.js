import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  cyAddByIndex,
  cyAddInHead,
  cyAddInTail,
  cyChanging,
  cyCircle,
  cyDefault,
  cyDeleteByIndex,
  cyDeleteInHead,
  cyDeleteInTail,
  cyForm,
  cyFormByIndex,
  cyInput,
  cyInputIndex,
  cyModified,
} from "../constants";

describe("Корректная работа связного списка", () => {
  //добавить элемент в голову
  const addHeadElem = (value) => {
    cy.clock();

    //корректная отрисовка кнопок в основной форме
    cy.get(cyForm).within(() => {
      cy.get(cyInput).type(value);

      cy.get(cyAddInHead).should("be.not.disabled");
      cy.get(cyAddInTail).should("be.not.disabled");

      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    //корректная отрисовка кнопок в форме с индексом
    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.not.disabled");
      cy.get(cyAddByIndex).should("be.not.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });

    //корректная отрисовка кнопок в формах после клика
    cy.get(cyForm).within(() => {
      cy.get(cyAddInHead).click();

      cy.get(cyInput).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.disabled");
      cy.get(cyDeleteInTail).should("be.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.disabled");
    });

    //проверка корректных стилей кружков
    cy.get(cyCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains("circle_small"));

    cy.get(cyCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyChanging));

    cy.tick(DELAY_IN_MS);
  };

  //добавить элемент в хвост
  const addTailElem = (value) => {
    cy.clock();

    //корректная отрисовка кнопок в основной форме
    cy.get(cyForm).within(() => {
      cy.get(cyInput).type(value);

      cy.get(cyAddInHead).should("be.not.disabled");
      cy.get(cyAddInTail).should("be.not.disabled");

      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    //корректная отрисовка кнопок в форме с индексом
    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.not.disabled");
      cy.get(cyAddByIndex).should("be.not.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });

    //корректная отрисовка кнопок в формах после клика
    cy.get(cyForm).within(() => {
      cy.get(cyAddInTail).click();

      cy.get(cyInput).should("be.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.disabled");
      cy.get(cyDeleteInTail).should("be.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.disabled");
    });

    //проверка корректных стилей кружков
    cy.get(cyCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains("circle_small"));

    cy.get(cyCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyChanging));

    cy.tick(DELAY_IN_MS);
  };

  //добавить элемент по индексу
  const addIndexElem = (value, index) => {
    cy.clock();

    cy.get(cyForm).within(() => {
      cy.get(cyInput).type(value);

      //корректная отрисовка кнопок
      cy.get(cyAddInHead).should("be.not.disabled");
      cy.get(cyAddInTail).should("be.not.disabled");
      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).type(index);
      cy.get(cyAddByIndex).should("be.not.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });

    //корректная отрисовка кнопок после клика
    cy.get(cyFormByIndex).within(() => {
      cy.get(cyAddByIndex).click();
      cy.get(cyInputIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.disabled");
    });

    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("be.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.disabled");
      cy.get(cyDeleteInTail).should("be.disabled");
    });

    cy.get(cyCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains("circle_small"));

    cy.get(cyCircle)
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyChanging));

    cy.tick(DELAY_IN_MS);
  };
  
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("При пустом инпуте, кнопка добавления недоступна", function () {
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("have.value", "");

      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");

      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("have.value", "1");

      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });
  });

  it("Корректная отрисовка дефолтного списка", function () {
    //проверить количество и стиль кружков
    cy.get(cyCircle)
      .should("have.length", 4)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));

    //проверить корректный текст
    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[2]).children().should("have.text", "8");
      cy.get(item[3]).children().should("have.text", "1");
    });
  });

  it("Корректное добавление элемента в head", function () {
    cy.clock();

    addHeadElem("6");

    //добавленный элемент стал cyModified(зеленым), остальные синие
    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "6");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified));

      cy.get(item[1]).children().should("have.text", "0");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[2]).children().should("have.text", "34");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[3]).children().should("have.text", "8");
      cy.get(item[3])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[4]).children().should("have.text", "1");
      cy.get(item[4])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
    });

    cy.tick(DELAY_IN_MS);

    //после задержки все стали cyDefault(синие)
    cy.get(cyCircle)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));
  });

  it("Корректное добавление элемента в tail", function () {
    cy.clock();

    addTailElem("6");
    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[2]).children().should("have.text", "8");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[3]).children().should("have.text", "1");
      cy.get(item[3])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[4]).children().should("have.text", "6");
      cy.get(item[4])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified));
    });

    cy.tick(DELAY_IN_MS);

    //после задержки все стали cyDefault(синие)
    cy.get(cyCircle)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));
  });

  it("Корректное добавление элемента по индексу", function () {

    addIndexElem("6", 2);

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging));

      cy.get(item[1]).children().should("have.text", "6");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging));

      cy.get(item[2]).children().should("have.text", "34");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging));

      cy.get(item[3]).children().should("have.text", "8");
      cy.get(item[3])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[4]).children().should("have.text", "1");
      cy.get(item[4])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyChanging));

      cy.get(item[1]).children().should("have.text", "6");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyModified));

      cy.get(item[2]).children().should("have.text", "34");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[3]).children().should("have.text", "8");
      cy.get(item[3])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));

      cy.get(item[4]).children().should("have.text", "1");
      cy.get(item[4])
        .invoke("attr", "class")
        .then((classes) => expect(classes).contains(cyDefault));
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle)
      .should("have.length", 5)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));
  });
  
  it("Корректное удаление элемента из head", function () {
    cy.clock();

    //проверка корректной отрисовки кнопок
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("be.not.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
      cy.get(cyDeleteInHead).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.not.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });

    //проверка корректной отрисовки кнопок после клика
    cy.get(cyForm).within(() => {
      cy.get(cyDeleteInHead).click();

      cy.get(cyInput).should("be.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInTail).should("be.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.disabled");
    });

    cy.tick(DELAY_IN_MS);

    //проверка текста в оставшихся кнопках
    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "34");
      cy.get(item[1]).children().should("have.text", "8");
      cy.get(item[2]).children().should("have.text", "1");
    });

    //проверка корректной отрисовки после удаления
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("be.not.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.not.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });
  });

  it("Корректное удаление элемента из tail", function () {
    cy.clock();

    //проверка корректной отрисовки кнопок
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("be.not.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
      cy.get(cyDeleteInHead).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.not.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });

    //проверка корректной отрисовки кнопок после клика
    cy.get(cyForm).within(() => {
      cy.get(cyDeleteInTail).click();

      cy.get(cyInput).should("be.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.disabled");
    });

    cy.tick(DELAY_IN_MS);

    //проверка текста в оставшихся кнопках
    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[2]).children().should("have.text", "8");
    });

    //проверка корректной отрисовки после удаления
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("be.not.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.not.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });
  });

  it("Корректное удаление элемента по индексу", function () {
    cy.clock();

    //проверка корректной дефолтной отрисовки кнопок 
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("be.not.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });

    //проверка корректной отрисовки кнопок после клика "Удалить по индексу"
    cy.get(cyFormByIndex).within(() => {
      cy.get(cyDeleteByIndex).click();
      cy.get(cyInputIndex).should("be.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
    });

    cy.get(cyForm).within(() => {
      cy.get(cyDeleteInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyInput).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[2]).children().should("have.text", "8");
      cy.get(item[3]).children().should("have.text", "1");
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[2]).children().should("have.text", "8");
      cy.get(item[3]).children().should("have.text", "1");
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[2]).children().should("have.text", "");
      cy.get(item[3]).children().should("have.text", "8");
      cy.get(item[4]).children().should("have.text", "1");
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "8");
      cy.get(item[2]).children().should("have.text", "1");
    });

    cy.tick(DELAY_IN_MS);

    cy.get(cyCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "8");
      cy.get(item[2]).children().should("have.text", "1");
    });

    //проверка корректной отрисовки кнопок после удаления
    cy.get(cyForm).within(() => {
      cy.get(cyInput).should("be.not.disabled");
      cy.get(cyAddInHead).should("be.disabled");
      cy.get(cyAddInTail).should("be.disabled");
      cy.get(cyDeleteInHead).should("be.not.disabled");
      cy.get(cyDeleteInTail).should("be.not.disabled");
    });

    cy.get(cyFormByIndex).within(() => {
      cy.get(cyInputIndex).should("be.not.disabled");
      cy.get(cyAddByIndex).should("be.disabled");
      cy.get(cyDeleteByIndex).should("be.not.disabled");
    });

    cy.get(cyCircle)
      .should("have.length", 3)
      .invoke("attr", "class")
      .then((classes) => expect(classes).contains(cyDefault));
  });
});