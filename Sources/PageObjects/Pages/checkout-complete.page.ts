import { type Locator, type Page } from '@playwright/test';
import { DATA_TEST_IDS } from '../../Helpers/Constants/ids';
import { ScreenshotHelper } from '../../Helpers/Screenshot/screenshot-helper';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly screenshotHelper: ScreenshotHelper;
    readonly backHomeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.screenshotHelper = new ScreenshotHelper(page);
        this.backHomeBtn = page.locator(`data-test=${DATA_TEST_IDS.BackHomeBtn}`);
    }

    async verifyMatchScreenshot(src: string[], element: Locator) {
        await this.screenshotHelper.elementComparison(element, src);
    }

    async clickBackHomeBtn() {
        await this.backHomeBtn.click()
    }
}

