import { test as baseTest } from '@playwright/test';
import { SignInPage } from '../../PageObjects/Pages/sign-in.page';
import { InventoryPage } from '../../PageObjects/Pages/inventory.page';
import { CheckoutStep1Page } from '../../PageObjects/Pages/checkout-step-one.page';
import { CheckoutStep2Page } from '../../PageObjects/Pages/checkout-step-two.page';
import { CheckoutCompletePage } from '../../PageObjects/Pages/checkout-complete.page';
import { CartPage } from '../../PageObjects/Pages/cart.page';

type pages = {
    //Pages
    signInPage: SignInPage,
    inventoryPage: InventoryPage,
    cartPage: CartPage,
    checkoutStep1Page: CheckoutStep1Page,
    checkoutStep2Page: CheckoutStep2Page,
    checkoutCompletePage: CheckoutCompletePage,
}

const testPages = baseTest.extend<pages>({
    //Pages
    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutStep1Page: async ({ page }, use) => {
        await use(new CheckoutStep1Page(page));
    },
    checkoutStep2Page: async ({ page }, use) => {
        await use(new CheckoutStep2Page(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },
});

export const test = testPages;
export const expect = testPages.expect;
