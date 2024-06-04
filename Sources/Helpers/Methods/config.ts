import { Page, expect } from "@playwright/test";

export class MethodsConfig {
    static async navigateTo(page: Page, expectedURL: string) {
        await page.waitForURL(expectedURL);
        await expect.soft(page).toHaveURL(expectedURL);
    }
    
    static async goTo(page: Page, baseURL: string, expectedURL?: string) {
        await page.goto(baseURL);

        if (expectedURL == null) {
            await MethodsConfig.navigateTo(page, baseURL);
        } else if (expectedURL != null) {
            await MethodsConfig.navigateTo(page, expectedURL);
        }
    }

    static async navigateToAndContain(page: Page, expectedURL: string) {
        await page.waitForLoadState(`load`);
        expect.soft(page.url()).toContain(expectedURL);
    }

    static delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static async reload(page: Page) {
        await page.reload();
        await page.waitForLoadState(`load`);
        await this.delay(500);
    }
}
