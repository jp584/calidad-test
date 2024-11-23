import { test } from '@playwright/test';
import { TwoPage } from '../pages/two.page';
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


test('Asignar prioridad', async ({ page }) => {
    const twoPage = new TwoPage(page);
  
    // Delete the second item
    await twoPage.openMenuAndSelectPriority()
  });


