import { Locator, Page, expect } from "@playwright/test";
import { MethodsConfig } from "../Methods/config";

export class ScreenshotHelper {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async pageComparison(src: string[]) {
        await MethodsConfig.delay(2000);
        await expect(this.page).toHaveScreenshot(src); // Example src: ['Login', 'starter.png']
    }

    async elementComparison(locator: Locator, src: string[]) {
        await MethodsConfig.delay(2000);
        expect(await locator.screenshot()).toMatchSnapshot(src); // Example src: ['Login', 'logo.png']
    }
}
