import { Page } from '@playwright/test';

export class TwoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMenuAndSelectPriority() {
    // Wait for the page to load fully
    await this.page.waitForLoadState('domcontentloaded');

    // Ensure the main item list is visible
    const itemList = this.page.locator('ul#mainItemList');
    await itemList.waitFor({ state: 'visible' });

    // Locate all list items
    const items = itemList.locator('li.BaseItemLi');

    // Count the number of items in the list
    const itemCount = await items.count();
    console.log(`Number of items in the list: ${itemCount}`);

    // Ensure there are enough items to select the penultimate one
    if (itemCount < 2) {
      throw new Error('Not enough items to select the penultimate item.');
    }

    // Calculate the penultimate item's index
    const penultimateIndex = itemCount - 2;

    // Locate the penultimate item
    const penultimateItem = items.nth(penultimateIndex);

    // Scroll the penultimate item into view
    await penultimateItem.scrollIntoViewIfNeeded();

    // Locate the "Options" button within the penultimate item
    const optionsButton = penultimateItem.locator('img.ItemMenu[title="Options"]');

    // Use JavaScript to ensure visibility for interaction
    await this.page.evaluate((el) => {
      el.style.display = 'block'; // Temporarily force visibility
    }, await optionsButton.elementHandle());

    // Wait for the element to be interactable
    await optionsButton.waitFor({ state: 'visible' });

    // Click the "Options" button
    await optionsButton.click();

    // Wait for the context menu to appear
    const contextMenu = this.page.locator('ul#itemContextMenu');
    await contextMenu.waitFor({ state: 'visible' });

    // Locate the priority section
    const prioritySection = contextMenu.locator('div.PrioFrameOuter');

    // Locate the priority with iconid="3"
    const priorityThree = prioritySection.locator('span.PrioFrame[iconid="3"]');

    // Scroll the priority into view and click it
    await priorityThree.scrollIntoViewIfNeeded();
    await priorityThree.click();

    // Log action for debugging
    console.log('Selected priority 3 from the menu.');
  }
}
