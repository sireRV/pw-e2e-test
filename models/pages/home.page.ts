import { expect, Locator, Page } from "@playwright/test";
import FooterSection from "../sections/footer.section";
import TodoListSection from "../sections/todolist.section";

export default class HomePage {
  page: Page;
  footerSection: FooterSection;
  todoListSection: TodoListSection;

  element: {
    heading: Locator;
    newTodoField: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.footerSection = new FooterSection(this.page);
    this.todoListSection = new TodoListSection(this.page);
    this.element = {
      heading: this.page.locator("h1"),
      newTodoField: this.page.getByPlaceholder("What needs to be done?"),
    };
  }

  public async goto() {
    await this.page.goto("/todomvc");
  }

  public getUrl(): string {
    return this.page.url();
  }

  public async addTodoItem(input: string) {
    await this.element.newTodoField.fill(input);
    await this.element.newTodoField.press("Enter");
  }

  private async inputTodo(input: string) {
    await this.element.newTodoField.fill(input);
  }

  private async registerTodo() {
    await this.element.newTodoField.press("Enter");
  }

  public async verifyText(element: Locator, text: string) {
    await expect(element).toHaveText(text);
  }

  public async checkVisibility(element: Locator, flag: boolean) {
    if (flag) {
      await expect(element).toBeVisible();
    } else {
      await expect(element).not.toBeVisible();
    }
  }
}
