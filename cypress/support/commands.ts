/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Команда для входа с токенами
       * @example cy.login()
       */
      login(): Chainable<Element>;

      /**
       * Команда для настройки моков ингредиентов
       * @example cy.mockIngredients()
       */
      mockIngredients(): Chainable<Element>;

      /**
       * Команда для настройки моков пользователя и заказов
       * @example cy.mockUserAndOrder()
       */
      mockUserAndOrder(): Chainable<Element>;

      /**
       * Команда для очистки токенов авторизации
       * @example cy.clearAuth()
       */
      clearAuth(): Chainable<Element>;
    }
  }
}

export {};

Cypress.Commands.add('login', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'mock-refresh-token');

    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // Срок действия 1 день

    const cookieValue = 'mock-access-token';
    const cookieString = `accessToken=${encodeURIComponent(cookieValue)}; path=/; expires=${expires.toUTCString()}`;

    win.document.cookie = cookieString;

    console.log('Cookie set:', win.document.cookie);
  });
});

Cypress.Commands.add('clearAuth', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('refreshToken');
    win.document.cookie =
      'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });
});

Cypress.Commands.add('mockIngredients', () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
});

Cypress.Commands.add('mockUserAndOrder', () => {
  cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
  cy.intercept('POST', '**/auth/login', { fixture: 'user.json' }).as(
    'loginRequest'
  );
  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as(
    'getUserRequest'
  );
});
