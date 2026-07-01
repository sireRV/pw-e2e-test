import { Locator, Page } from "@playwright/test";

export default class TodoListSection {
  page: Page;

  element: {
    todoList: Locator;
    toggleAll: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.element = {
      todoList: this.page.locator(".todo-list"),
      toggleAll: this.page.locator("#toggle-all"),
    };
  }

  public getAllItemsList(): Locator {
    const allItemsList = this.element.todoList.locator("li");
    return allItemsList;
  }

  public getActiveItemsList(): Locator {
    const activeItemsList = this.element.todoList.locator("li:not(.completed)");
    return activeItemsList;
  }

  public getCompletedItemsList(): Locator {
    const completedItemsList = this.element.todoList.locator("li.completed");
    return completedItemsList;
  }
}
