import { test, expect } from '@playwright/test';
import { ToDoLogin } from '../pages/todoLogin.page'

test.beforeEach(async ({ page }) => {
    await page.goto("https://todo.ly/");
});

// NOmbre del test
test('Login User', async ({ page }) => {
    const emailUser = 'miguel.barrionuevo.t@gmail.com';
    const passwordUser = '12345678Mbt';
    const toDoLogin = new ToDoLogin(page);
    await toDoLogin.clickOnLoginOptionButton();
    await toDoLogin.fillLoginForm(emailUser, passwordUser);
    await toDoLogin.checkLoginUser();
});