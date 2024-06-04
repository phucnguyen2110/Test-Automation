import { test } from '../../Sources/Helpers/Base/page-objects.fixture';
import { BASEURL } from '../../Sources/Helpers/Constants/urls';
import { PURCHASE } from '../../Sources/Helpers/Constants/describes';
import { MethodsConfig } from '../../Sources/Helpers/Methods/config';
import { AccountInterface } from '../../Sources/Helpers/Accounts/account.interface';
import { ACCOUNT1 } from '../../Sources/Helpers/Accounts/account';
import { DATA_TEST_IDS } from '../../Sources/Helpers/Constants/ids';

const account: AccountInterface = ACCOUNT1;
let screenshotPath: string[];

test.describe(`${PURCHASE.Cart} @ui`, () => {
    test.beforeEach(`General steps before testing`, async ({ page, signInPage, inventoryPage }) => {
        // Login successfully
        // Add to cart all items and navigate to Cart page
        await MethodsConfig.goTo(page, BASEURL);
        await signInPage.inputToUsername(account.username);
        await signInPage.inputToPwd(account.pwd);
        await signInPage.clickLoginBtn();
        await MethodsConfig.navigateToAndContain(page, `${BASEURL}/inventory.html`);
        await inventoryPage.clickAddToCartBackpackBtn();
        await inventoryPage.clickAddToCartBikeLightBtn();
        await inventoryPage.clickAddToCartJacketBtn();
        await inventoryPage.clickAddToCartOnesieBtn();
        await inventoryPage.clickAddToCartRedBtn();
        await inventoryPage.clickAddToCartTShirtBtn();
        await inventoryPage.verifyShoppingCartLink(6);
        await inventoryPage.clickShoppingCartLink();
        await MethodsConfig.navigateToAndContain(page, `${BASEURL}/cart.html`);
    });

    test(`CA001 - Verify the number of Added items in Cart page`, async ({ page, cartPage }) => {
        await test.step(`Verify the content`, async () => {
            screenshotPath = [`cartList.png`];
            const cartList = page.locator(`data-test=${DATA_TEST_IDS.CartList}`);
            await cartPage.verifyMatchScreenshot(screenshotPath, cartList);
        });
    });

    test(`CA002 - Verify that when clicking Continue Shopping button, will navigate to Inventory page`, async ({ page, cartPage }) => {
        await test.step(`Click Continue Shopping button and Navigate to Inventory page`, async () => {
            await cartPage.clickContinueShoppingBtn();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/inventory.html`);
        });
    });

    test(`CA003 - Verify that when clicking Checkout button, will navigate to Checkout step one page`, async ({ page, cartPage }) => {
        await test.step(`Click Checkout button`, async () => {
            await cartPage.clickCheckoutBtn();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/checkout-step-one.html`);
        });
    });

    test(`CA004 - Verify that Remove button of all items can be clickable`, async ({ page, cartPage, inventoryPage }) => {
        await test.step(`Click Remove button of all items`, async () => {
            await cartPage.clickRemoveBackpackBtn();
            await inventoryPage.verifyShoppingCartLink(5);
            await cartPage.clickRemoveJacketBtn();
            await inventoryPage.verifyShoppingCartLink(4);
            await cartPage.clickRemoveLightBtn();
            await inventoryPage.verifyShoppingCartLink(3);
            await cartPage.clickRemoveOnesieBtn();
            await inventoryPage.verifyShoppingCartLink(2);
            await cartPage.clickRemoveRedBtn();
            await inventoryPage.verifyShoppingCartLink(1);
            await cartPage.clickRemoveShirtBtn();
            await inventoryPage.verifyShoppingCartLink(0);
        });

        await test.step(`Verify the content`, async () => {
            screenshotPath = [`cartListNoItem.png`];
            const cartList = page.locator(`data-test=${DATA_TEST_IDS.CartList}`);
            await cartPage.verifyMatchScreenshot(screenshotPath, cartList);
        });
    });
});
