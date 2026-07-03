import { test, expect } from "../fixtures/my-fixture";
import HomePage from "../models/pages/home.page";

test("Complete a todoItem from List", async ({ homePage, todoData }) => {
  await homePage.todoListSection.completeToDoItem(todoData.items[0].todoName);

  const totalItems = todoData.items.length;
  const expectedCompletedItems = 1;
  const expectedActiveItems = totalItems - expectedCompletedItems;

  await test.step(`Verify number of completed items is ${expectedCompletedItems}}`, async () => {
    await expect(homePage.todoListSection.getCompletedItemsList()).toHaveCount(
      expectedCompletedItems,
    );
  });

  await test.step(`Verify number of active items is ${expectedActiveItems}`, async () => {
    await expect(homePage.todoListSection.getActiveItemsList()).toHaveCount(
      expectedActiveItems,
    );
  });

  await test.step(`Verify number of all items is ${totalItems}`, async () => {
    await expect(homePage.todoListSection.getAllItemsList()).toHaveCount(
      totalItems,
    );
  });
});
