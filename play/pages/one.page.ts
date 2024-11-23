import { Page } from '@playwright/test';

export class OnePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async deleteSecondItem() {
    // Locate the list items
    const listItems = this.page.locator('li.BaseItemLi');

    // Ensure there are at least two items
    const itemCount = await listItems.count();
    if (itemCount < 2) {
      throw new Error('There are not enough items to delete the second item.');
    }

    // Target the second item
    const secondItem = listItems.nth(1); // nth(1) targets the second element (index starts at 0)

    // Ensure the second item is scrolled into view
    await secondItem.scrollIntoViewIfNeeded();

    // Locate the <img> tag within the second item
    const optionsButton = secondItem.locator('img.ItemMenu[title="Options"]');

    // Use JavaScript to make the element visible if needed
    await this.page.evaluate((el) => {
      el.style.display = 'block'; // Temporarily force visibility for interaction
    }, await optionsButton.elementHandle());

    // Wait for the element to be interactable
    await optionsButton.waitFor({ state: 'visible' });

    // Click the <img> tag
    await optionsButton.click();

     // Wait for the context menu to appear
  const contextMenu = this.page.locator('ul#itemContextMenu');
  await contextMenu.waitFor({ state: 'visible' });

  // Click the "Delete" option
  const deleteOption = contextMenu.locator('li.delete a[href="#delete"]');
  await deleteOption.click();

  // Handle confirmation if needed
  const confirmButton = this.page.locator('button:has-text("Confirm")'); // Adjust selector if necessary
  if (await confirmButton.isVisible()) {
    await confirmButton.click();
  }


    
  }
}
