import { test, expect } from "@playwright/test";
import HomePage from "../models/pages/home.page";

test("Visit todo home page", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  expect(homePage.getUrl()).toEqual("https://demo.playwright.dev/todomvc/#/");

  await homePage.verifyText(homePage.element.heading, "todos");
  await homePage.verifyText(homePage.element.newTodoField, "");
  await homePage.checkVisibility(
    homePage.footerSection.element.itemCountElement,
    false,
  );
  await homePage.checkVisibility(homePage.footerSection.element.filters, false);
  await homePage.checkVisibility(
    homePage.todoListSection.element.toggleAll,
    false,
  );
});

test("User inputs todo item", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await homePage.inputTodo("Buy Groceries");
  console.log;
  await expect(await homePage.element.newTodoField.inputValue()).toBe(
    "Buy Groceries",
  );
  await homePage.registerTodo();
  await expect(homePage.element.newTodoField).toHaveText("");
  await homePage.checkVisibility(
    homePage.footerSection.element.itemCountElement,
    true,
  );
  await homePage.checkVisibility(homePage.footerSection.element.filters, true);
  await homePage.checkVisibility(homePage.footerSection.element.filters, true);

  await homePage.checkVisibility(
    homePage.todoListSection.element.toggleAll,
    true,
  );

  await expect(homePage.footerSection.getItemCount()).toHaveText("1");
  await homePage.footerSection.confirmFilterSelected("All");
});
