import { type Locator, type Page } from '@playwright/test';
import { DATA_TEST_IDS } from '../../Helpers/Constants/ids';
import { ScreenshotHelper } from '../../Helpers/Screenshot/screenshot-helper';

export class CheckoutStep2Page {
    readonly page: Page;
    readonly screenshotHelper: ScreenshotHelper;
    readonly cancelBtn: Locator;
    readonly finishBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.screenshotHelper = new ScreenshotHelper(page);
        this.cancelBtn = page.locator(`data-test=${DATA_TEST_IDS.CancelBtn}`);
        this.finishBtn = page.locator(`data-test=${DATA_TEST_IDS.FinishBtn}`);
    }

    async verifyMatchScreenshot(src: string[], element: Locator) {
        await this.screenshotHelper.elementComparison(element, src);
    }

    async clickCancelBtn() {
        await this.cancelBtn.click()
    }

    async clickFinishBtn() {
        await this.finishBtn.click()
    }
}

