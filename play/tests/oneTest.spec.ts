import { test } from '@playwright/test';
import { OnePage } from '../pages/one.page';
import { ToDoLogin } from '../pages/todoLogin.page'

const emailUser = 'jpv.9pm@gmail.com';
const passwordUser = '123456789';


test.beforeEach(async ({ page }) => {
    await page.goto("https://todo.ly/");
    const toDoLogin = new ToDoLogin(page);
    await toDoLogin.clickOnLoginOptionButton();
    await toDoLogin.fillLoginForm(emailUser, passwordUser);
    await toDoLogin.checkLoginUser();
});


test('Borrar segundo item', async ({ page }) => {
    const onePage = new OnePage(page);
  
    // Delete the second item
    await onePage.deleteSecondItem();
  });
