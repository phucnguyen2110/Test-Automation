import { expect, type Locator, type Page } from '@playwright/test';
import { PlaceholderText } from '../../Helpers/Constants/placeholders-texts';
import { DATA_TEST_IDS } from '../../Helpers/Constants/ids';
import { ScreenshotHelper } from '../../Helpers/Screenshot/screenshot-helper';

export class CheckoutStep1Page {
    readonly page: Page;
    readonly screenshotHelper: ScreenshotHelper;
    readonly continueBtn: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zipCodeField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.screenshotHelper = new ScreenshotHelper(page);
        this.firstNameField = page.getByPlaceholder(`${PlaceholderText.First_name}`);
        this.lastNameField = page.getByPlaceholder(`${PlaceholderText.Last_name}`);
        this.zipCodeField = page.getByPlaceholder(`${PlaceholderText.Zip_code}`);
        this.continueBtn = page.locator(`data-test=${DATA_TEST_IDS.ContinueBtn}`);
    }

    async verifyMatchScreenshot(src: string[], element: Locator) {
        await this.screenshotHelper.elementComparison(element, src);
    }

    async inputToFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
        await expect.soft(this.firstNameField).toHaveValue(firstName);
    }

    async inputToLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
        await expect.soft(this.lastNameField).toHaveValue(lastName);
    }

    async inputToZipCode(zipCode: string) {
        await this.zipCodeField.fill(zipCode);
        await expect.soft(this.zipCodeField).toHaveValue(zipCode);
    }

    async clickContinueBtn() {
        await this.continueBtn.click()
    }
}

