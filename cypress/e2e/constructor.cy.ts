/// <reference types="cypress" />

describe('конструктор бургера', () => {
  describe('добавление ингредиентов', () => {
    beforeEach(() => {
      cy.mockIngredients();
      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('сборка бургера', () => {
      cy.get('li')
        .contains('Краторная булка N-200i')
        .parents('li')
        .find('button')
        .click();

      cy.get('li')
        .contains('Говяжий метеорит')
        .parents('li')
        .find('button')
        .click();

      cy.get('li')
        .contains('Соус традиционный галактический')
        .parents('li')
        .find('button')
        .click();

      cy.get('[data-testid="burger-constructor"]').should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get('[data-testid="burger-constructor"]').should(
        'contain',
        'Говяжий метеорит'
      );
      cy.get('[data-testid="burger-constructor"]').should(
        'contain',
        'Соус традиционный галактический'
      );

      cy.get('[data-testid="burger-constructor"] p.text').should(
        'contain',
        '3412'
      );
    });
  });

  describe('модальное окно', () => {
    beforeEach(() => {
      cy.mockIngredients();
      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('открытие окна', () => {
      cy.get('a').contains('Краторная булка N-200i').click();

      cy.get('[role="dialog"]').should('be.visible');
      cy.get('[role="dialog"]').should('contain', 'Краторная булка N-200i');

      cy.get('[role="dialog"]').should('contain', 'Калории, ккал');
      cy.get('[role="dialog"]').should('contain', '420');
      cy.get('[role="dialog"]').should('contain', 'Белки, г');
      cy.get('[role="dialog"]').should('contain', '80');
      cy.get('[role="dialog"]').should('contain', 'Жиры, г');
      cy.get('[role="dialog"]').should('contain', '24');
      cy.get('[role="dialog"]').should('contain', 'Углеводы, г');
      cy.get('[role="dialog"]').should('contain', '53');
    });

    it('закрытие окна по кнопке', () => {
      cy.get('a').contains('Говяжий метеорит').click();

      cy.get('[role="dialog"] button').click();

      cy.get('[role="dialog"]').should('not.exist');
    });

    it('закрытие окна по клику на оверлей', () => {
      cy.get('a').contains('Биокотлета из марсианской Магнолии').click();

      cy.get('[role="dialog"]').should('be.visible');

      cy.get('body').click(0, 0);

      cy.get('[role="dialog"]').should('not.exist');
    });
  });

  describe('создание заказа', () => {
    beforeEach(() => {
      cy.mockIngredients();
      cy.mockUserAndOrder();
      cy.login();
      cy.visit('/');
      cy.wait('@getIngredients');
      cy.wait('@getUserRequest');
    });

    after(() => {
      cy.clearAuth();
    });

    it('добавление ингредиентов и оформление заказа', () => {
      cy.get('li')
        .contains('Краторная булка N-200i')
        .parents('li')
        .find('button')
        .click();
      cy.get('li')
        .contains('Говяжий метеорит')
        .parents('li')
        .find('button')
        .click();
      cy.get('li')
        .contains('Соус традиционный галактический')
        .parents('li')
        .find('button')
        .click();

      cy.get('button').contains('Оформить заказ').click();

      cy.wait('@createOrder');

      cy.get('[role="dialog"]').should('be.visible');
      cy.get('[role="dialog"]').should('contain', '99999');
      cy.get('[role="dialog"]').should('contain', 'Ваш заказ начали готовить');

      cy.get('[role="dialog"] button').click();

      cy.get('[data-testid="burger-constructor"]').should(
        'not.contain',
        'Краторная булка N-200i'
      );
      cy.get('[data-testid="burger-constructor"]').should(
        'not.contain',
        'Говяжий метеорит'
      );
      cy.get('[data-testid="burger-constructor"]').should(
        'not.contain',
        'Соус традиционный галактический'
      );
      cy.get('[data-testid="burger-constructor"] p.text').should(
        'contain',
        '0'
      );
    });
  });
});
