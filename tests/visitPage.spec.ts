import { test, expect } from "../fixtures/my-fixture";
import HomePage from "../models/pages/home.page";

test("Visit todo home page", async ({ homePage }) => {
  await test.step("validate url is correct", async () => {
    expect(homePage.getUrl()).toEqual("https://demo.playwright.dev/todomvc/#/");
  });

  await test.step("validate heading and todo text field is empty", async () => {
    await homePage.verifyText(homePage.element.heading, "todos");
    await homePage.verifyText(homePage.element.newTodoField, "");
  });

  await test.step("validate contents of footer section", async () => {
    await homePage.checkVisibility(
      homePage.footerSection.element.itemCountElement,
      false,
    );
    await homePage.checkVisibility(
      homePage.footerSection.element.filters,
      false,
    );
  });

  await test.step("validate contents of footer section", async () => {
    await homePage.checkVisibility(
      homePage.todoListSection.element.toggleAll,
      false,
    );
  });
});

test("User inputs todo item", async ({ addOneToDo }) => {
  await expect(addOneToDo.element.newTodoField).toHaveText("");
  await addOneToDo.checkVisibility(
    addOneToDo.footerSection.element.itemCountElement,
    true,
  );
  await addOneToDo.checkVisibility(
    addOneToDo.footerSection.element.filters,
    true,
  );
  await addOneToDo.checkVisibility(
    addOneToDo.footerSection.element.filters,
    true,
  );

  await addOneToDo.checkVisibility(
    addOneToDo.todoListSection.element.toggleAll,
    true,
  );

  await expect(addOneToDo.footerSection.getItemCount()).toHaveText("1");
  await addOneToDo.footerSection.confirmFilterSelected("All");
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

  await homePage.todoListSection.removeTodoItem("Groceries");

  await expect(
    homePage.todoListSection.getAllItemsList().filter({ hasText: "Groceries" }),
  ).toHaveCount(0);

  await homePage.todoListSection.removeAllItems();
  await expect(homePage.todoListSection.getAllItemsList()).toHaveCount(0);
});
