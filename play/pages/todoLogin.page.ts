import { expect, Locator, Page } from '@playwright/test';

export class ToDoLogin {
    
    // Variables
    readonly url = "https://todo.ly/";
    readonly page: Page;

    readonly logo: Locator;
    readonly loginOptionButton: Locator;
    readonly loginDialog: Locator;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo');
        // Identificador para buscar en la página basado en clase
        this.loginOptionButton = page.locator('.HPHeaderLogin > a:nth-child(1)');
        this.loginDialog = page.locator('.HPloginDiv');
        // Identificador para buscar en la página basado en id
        this.emailInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail');
        this.passwordInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword');
        this.loginButton = page.locator('#ctl00_MainContent_LoginControl1_ButtonLogin');
    }

    // SI O SI DEBE ESTAR PARA QUE CARGUE
    async goto() {
        await this.page.goto(this.url);
    }

    async clickOnLoginOptionButton() {
        await this.loginOptionButton.waitFor({ state: 'visible' });
        await this.loginOptionButton.click();
        await expect(this.loginDialog).toBeVisible();
    }

    async fillLoginForm(email: string, password: string) : Promise<void> {
        await this.emailInput.waitFor({ state: 'visible' });
        // LLenar con .fill
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async checkLoginUser(){
        await this.loginButton.click(); // onclick should have redirected to projects page
        await expect(this.page.getByText('Logout')).toBeVisible();
    }

}