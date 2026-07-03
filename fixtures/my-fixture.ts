import { test as base } from "@playwright/test";
import HomePage from "../models/pages/home.page";
import todos from "../test-data/data1.json";

type Todo = {
  id: string;
  todoName: string;
};

type TodoData = {
  items: Todo[];
};

type MyFixtures = {
  homePage: HomePage;
  addOneToDo: HomePage;
  todoData: TodoData;
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

  todoData: async ({ homePage }, use) => {
    for (const item of todos.items) {
      await homePage.addTodoItem(item.todoName);
    }

    await use(todos);

    await homePage.todoListSection.removeAllItems();
  },
});

export { expect } from "@playwright/test";
