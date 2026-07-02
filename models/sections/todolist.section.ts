import { Locator, Page } from "@playwright/test";

export default class TodoListSection {
  page: Page;
  private readonly todoItemSelector: string;

  element: {
    todoList: Locator;
    toggleAll: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.todoItemSelector = "li[data-testid='todo-item']";
    this.element = {
      todoList: this.page.locator(this.todoItemSelector),
      toggleAll: this.page.locator("#toggle-all"),
    };
  }

  public getAllItemsList(): Locator {
    return this.element.todoList;
  }

  public getActiveItemsList(): Locator {
    const activeItemsList = this.page.locator(
      `${this.todoItemSelector}:not(.completed)`,
    );
    return activeItemsList;
  }

  public getCompletedItemsList(): Locator {
    const completedItemsList = this.page.locator(
      `${this.todoItemSelector}.completed`,
    );
    return completedItemsList;
  }

  public async toggleAllItems() {
    await this.element.toggleAll.click();
  }

  private getTodoItem(text: string): Locator {
    const todoItem = this.element.todoList.filter({ hasText: text });
    return todoItem;
  }

  public async removeTodoItem(text: string) {
    const todoItem = this.getTodoItem(text);
    await todoItem.hover();
    await todoItem.locator(".destroy").click();
  }

  public async removeAllItems() {
    while ((await this.element.todoList.count()) > 0) {
      const topItem = await this.element.todoList.first();
      await topItem.hover();
      await topItem.locator(".destroy").click();
    }
  }
}
