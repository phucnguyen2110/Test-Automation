import { expect, type Locator, type Page } from '@playwright/test';
import { PlaceholderText } from '../../Helpers/Constants/placeholders-texts';
import { DATA_TEST_IDS } from '../../Helpers/Constants/ids';
import { ScreenshotHelper } from '../../Helpers/Screenshot/screenshot-helper';

export class SignInPage {
    readonly page: Page;
    readonly screenshotHelper: ScreenshotHelper;
    readonly usernameField: Locator;
    readonly pwdField: Locator;
    readonly loginBtn: Locator;
    readonly errorBtn: Locator;
    readonly timeCircleBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.screenshotHelper = new ScreenshotHelper(page);
        this.usernameField = page.getByPlaceholder(`${PlaceholderText.Username}`);
        this.pwdField = page.getByPlaceholder(`${PlaceholderText.Pwd}`);
        this.loginBtn = page.locator(`id=${DATA_TEST_IDS.LoginBtn}`);
        this.errorBtn = page.locator(`data-test=${DATA_TEST_IDS.ErrorBtn}`);
        this.timeCircleBtn = page.locator(`svg`);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async inputToUsername(username: string) {
        await this.usernameField.fill(username);
        await expect.soft(this.usernameField).toHaveValue(username);
    }

    async inputToPwd(pwd: string) {
        await this.pwdField.fill(pwd);
    }

    async verifyComponents() {
        await expect.soft(this.page.getByText(`Swag Labs`, { exact: true })).toBeVisible();
        await expect.soft(this.usernameField).toBeVisible();
        await expect.soft(this.pwdField).toBeVisible();
        await expect.soft(this.loginBtn).toBeVisible();
    }

    // Display Error Message based on the option
    async displayErrorMessage(option: string) {
        if (option === "Username") {
            await expect.soft(this.page.getByText(`Epic sadface: Username is required`, { exact: true })).toBeVisible();
        } else if (option === "Password") {
            await expect.soft(this.page.getByText(`Epic sadface: Password is required`, { exact: true })).toBeVisible();
        } else {
            await expect.soft(this.page.getByText(`Epic sadface: Username and password do not match any user in this service`, { exact: true })).toBeVisible();
        }
        await expect.soft(this.errorBtn).toBeVisible();
        await expect.soft(await this.timeCircleBtn.count()).toEqual(3);
    }

    async verifyMatchScreenshot(src: string[], element: Locator) {
        await this.screenshotHelper.elementComparison(element, src);
    }
}
