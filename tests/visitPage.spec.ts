import { test, expect } from "../fixtures/my-fixture";
import HomePage from "../models/pages/home.page";

test("Visit todo home page", async ({ homePage }) => {
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

test("User inputs todo item", async ({ homePage }) => {
  await homePage.addTodoItem("Buy Groceries");

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

test("Toggle All marks all items complete", async ({ homePage }) => {
  await homePage.addTodoItem("Buy Groceries");

  await homePage.addTodoItem("Buy Tea");

  await homePage.addTodoItem("Meet a friend");

  await expect(homePage.footerSection.getItemCount()).toHaveText("3");

  await homePage.todoListSection.toggleAllItems();

  await expect(homePage.footerSection.getItemCount()).toHaveText("0");

  await expect(homePage.todoListSection.getCompletedItemsList()).toHaveCount(3);
  await expect(homePage.todoListSection.getAllItemsList()).toHaveCount(3);
  await expect(homePage.todoListSection.getActiveItemsList()).toHaveCount(0);

  await homePage.todoListSection.toggleAllItems();

  await expect(homePage.footerSection.getItemCount()).toHaveText("3");

  await expect(homePage.todoListSection.getCompletedItemsList()).toHaveCount(0);
  await expect(homePage.todoListSection.getAllItemsList()).toHaveCount(3);
  await expect(homePage.todoListSection.getActiveItemsList()).toHaveCount(3);
});
