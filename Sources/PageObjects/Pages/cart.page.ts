import { type Locator, type Page } from '@playwright/test';
import { DATA_TEST_IDS } from '../../Helpers/Constants/ids';
import { ScreenshotHelper } from '../../Helpers/Screenshot/screenshot-helper';

export class CartPage {
    readonly page: Page;
    readonly screenshotHelper: ScreenshotHelper;
    readonly checkoutBtn: Locator;
    readonly continueShoppingBtn: Locator;
    readonly removeBackpackBtn: Locator;
    readonly removeLightBtn: Locator;
    readonly removeShirtBtn: Locator;
    readonly removeJacketBtn: Locator;
    readonly removeOnesieBtn: Locator;
    readonly removeRedBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.screenshotHelper = new ScreenshotHelper(page);
        this.checkoutBtn = page.locator(`data-test=${DATA_TEST_IDS.CheckoutBtn}`);
        this.continueShoppingBtn = page.locator(`data-test=${DATA_TEST_IDS.ContinueShoppingBtn}`);
        this.removeBackpackBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveBackpackBtn}`);
        this.removeJacketBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveJacketBtn}`);
        this.removeLightBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveLightBtn}`);
        this.removeOnesieBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveOnesieBtn}`);
        this.removeRedBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveRedBtn}`);
        this.removeShirtBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveShirtBtn}`);
    }

    async clickRemoveBackpackBtn() {
        await this.removeBackpackBtn.click();
    }

    async clickRemoveLightBtn() {
        await this.removeLightBtn.click();
    }

    async clickRemoveJacketBtn() {
        await this.removeJacketBtn.click();
    }

    async clickRemoveOnesieBtn() {
        await this.removeOnesieBtn.click();
    }

    async clickRemoveRedBtn() {
        await this.removeRedBtn.click();
    }

    async clickRemoveShirtBtn() {
        await this.removeShirtBtn.click();
    }

    async clickContinueShoppingBtn() {
        await this.continueShoppingBtn.click();
    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    async verifyMatchScreenshot(src: string[], element: Locator) {
        await this.screenshotHelper.elementComparison(element, src);
    }
}
