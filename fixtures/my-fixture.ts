import { test as base } from "@playwright/test";
import HomePage from "../models/pages/home.page";

type MyFixtures = {
  homePage: HomePage;
  addOneToDo: HomePage;
};
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },

  addOneToDo: async ({ homePage }, use) => {
    homePage.addTodoItem("Buy Groceries");
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
