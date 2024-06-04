import { expect, type Locator, type Page } from '@playwright/test';
import { DATA_TEST_IDS } from '../../Helpers/Constants/ids';
import { ScreenshotHelper } from '../../Helpers/Screenshot/screenshot-helper';

export class InventoryPage {
    readonly page: Page;
    readonly screenshotHelper: ScreenshotHelper;
    readonly addToCartBackpackBtn: Locator;
    readonly addToCartBikeLightBtn: Locator;
    readonly addToCartTShirtBtn: Locator;
    readonly addToCartJacketBtn: Locator;
    readonly addToCartOnesieBtn: Locator;
    readonly addToCartRedBtn: Locator;
    readonly shoppingCartLink: Locator;
    readonly removeBackpackBtn: Locator;
    readonly removeLightBtn: Locator;
    readonly removeShirtBtn: Locator;
    readonly removeJacketBtn: Locator;
    readonly removeOnesieBtn: Locator;
    readonly removeRedBtn: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.screenshotHelper = new ScreenshotHelper(page);
        this.addToCartBackpackBtn = page.locator(`data-test=${DATA_TEST_IDS.AddToCartBackpackBtn}`);
        this.addToCartBikeLightBtn = page.locator(`data-test=${DATA_TEST_IDS.AddToCartLightBtn}`);
        this.addToCartTShirtBtn = page.locator(`data-test=${DATA_TEST_IDS.AddToCartShirtBtn}`);
        this.addToCartJacketBtn = page.locator(`data-test=${DATA_TEST_IDS.AddToCartJacketBtn}`);
        this.addToCartOnesieBtn = page.locator(`data-test=${DATA_TEST_IDS.AddToCartOnesieBtn}`);
        this.addToCartRedBtn = page.locator(`data-test=${DATA_TEST_IDS.AddToCartRedBtn}`);
        this.shoppingCartLink = page.locator(`data-test=${DATA_TEST_IDS.ShoppingCartLink}`);
        this.removeBackpackBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveBackpackBtn}`);
        this.removeJacketBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveJacketBtn}`);
        this.removeLightBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveLightBtn}`);
        this.removeOnesieBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveOnesieBtn}`);
        this.removeRedBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveRedBtn}`);
        this.removeShirtBtn = page.locator(`data-test=${DATA_TEST_IDS.RemoveShirtBtn}`);
        this.sortDropdown = page.locator(`data-test=${DATA_TEST_IDS.ShortDropdown}`);
    }

    async verifyMatchScreenshot(src: string[], element: Locator) {
        await this.screenshotHelper.elementComparison(element, src);
    }

    async clickAddToCartBackpackBtn() {
        await this.addToCartBackpackBtn.click();
    }

    async clickAddToCartBikeLightBtn() {
        await this.addToCartBikeLightBtn.click();
    }

    async clickAddToCartTShirtBtn() {
        await this.addToCartTShirtBtn.click();
    }

    async clickAddToCartJacketBtn() {
        await this.addToCartJacketBtn.click();
    }

    async clickAddToCartOnesieBtn() {
        await this.addToCartOnesieBtn.click();
    }

    async clickAddToCartRedBtn() {
        await this.addToCartRedBtn.click();
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

    async openFilterDropdown() {
        await this.sortDropdown.click();
    }

    async selectOptionAZ(page: Page) {
        await page.selectOption('.product_sort_container', 'az');
    }

    async selectOptionZA(page: Page) {
        await page.selectOption('.product_sort_container', 'za');
    }

    async selectOptionLowHigh(page: Page) {
        await page.selectOption('.product_sort_container', 'lohi');
    }

    async selectOptionHighLow(page: Page) {
        await page.selectOption('.product_sort_container', 'hilo');
    }

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }

    async verifyShoppingCartLink(expectedNumber: number) {
        expect(Number(await this.shoppingCartLink.textContent())).toEqual(expectedNumber);
    }
}
