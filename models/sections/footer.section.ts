import { expect, Locator, Page } from "@playwright/test";

export default class FooterSection {
  page: Page;

  element: {
    itemCountElement: Locator;
    filters: Locator;
    clearCompletedButton: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.element = {
      itemCountElement: this.page.locator(".todo-count"),
      filters: this.page.locator(".filters"),
      clearCompletedButton: this.page.locator(".clear-completed"),
    };
  }

  public getItemCount(): Locator {
    const itemCount = this.element.itemCountElement.locator("strong");

    return itemCount;
  }

  public async confirmFilterSelected(text: string) {
    const filter = this.element.filters.locator(".selected");
    expect(filter).toHaveText(text);
  }

  public async clearCompletedItems() {
    await this.element.clearCompletedButton.click();
  }
}
