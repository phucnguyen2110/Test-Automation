import { test } from '../../Sources/Helpers/Base/page-objects.fixture';
import { BASEURL } from '../../Sources/Helpers/Constants/urls';
import { FLOW } from '../../Sources/Helpers/Constants/describes';
import { MethodsConfig } from '../../Sources/Helpers/Methods/config';
import { AccountInterface } from '../../Sources/Helpers/Accounts/account.interface';
import { ACCOUNT1 } from '../../Sources/Helpers/Accounts/account';
import { fakerDE as faker } from '@faker-js/faker';
import { DATA_TEST_IDS } from '../../Sources/Helpers/Constants/ids';

const account: AccountInterface = ACCOUNT1;
let screenshotPath: string[];

test.describe(`${FLOW.Main_flow} @ui`, () => {

    test(`@FP001 - Verify that the user can make a full purchase for all items`, async ({ page, signInPage, inventoryPage, cartPage, checkoutStep1Page, checkoutStep2Page, checkoutCompletePage }) => {
        await test.step(`Login successfully`, async () => {
            await MethodsConfig.goTo(page, BASEURL);
            await signInPage.inputToUsername(account.username);
            await signInPage.inputToPwd(account.pwd);
            await signInPage.clickLoginBtn();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/inventory.html`);
        });

        await test.step(`Add all items in Shopping Cart`, async () => {
            await inventoryPage.clickAddToCartBackpackBtn();
            await inventoryPage.clickAddToCartBikeLightBtn();
            await inventoryPage.clickAddToCartJacketBtn();
            await inventoryPage.clickAddToCartOnesieBtn();
            await inventoryPage.clickAddToCartRedBtn();
            await inventoryPage.clickAddToCartTShirtBtn();
            await inventoryPage.verifyShoppingCartLink(6);
        });

        await test.step(`Navigate to Cart page to check the data`, async () => {
            await inventoryPage.clickShoppingCartLink();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/cart.html`);
            screenshotPath = [`cartList.png`];
            const cartList = page.locator(`data-test=${DATA_TEST_IDS.CartList}`);
            await cartPage.verifyMatchScreenshot(screenshotPath, cartList);
        });

        await test.step(`Navigate to Checkout step one page`, async () => {
            await cartPage.clickCheckoutBtn();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/checkout-step-one.html`);
            screenshotPath = [`checkoutInfoContainer.png`];
            const checkoutInfoContainer = page.locator(`data-test=${DATA_TEST_IDS.CheckoutInfoContainer}`);
            await checkoutStep1Page.verifyMatchScreenshot(screenshotPath, checkoutInfoContainer);
        });

        await test.step(`Input all required fields in Checkout step one page`, async () => {
            await checkoutStep1Page.inputToFirstName(faker.person.firstName());
            await checkoutStep1Page.inputToLastName(faker.person.lastName());
            await checkoutStep1Page.inputToZipCode(faker.location.zipCode());
        });

        await test.step(`Click Continue button and Navigate to Checkout step two page`, async () => {
            await checkoutStep1Page.clickContinueBtn();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/checkout-step-two.html`);
        });

        await test.step(`Verify the information on Checkout step two page`, async () => {
            screenshotPath = [`checkoutSummaryContainer.png`];
            const checkoutSummaryContainer = page.locator(`data-test=${DATA_TEST_IDS.CheckoutSummaryContainer}`);
            await checkoutStep2Page.verifyMatchScreenshot(screenshotPath, checkoutSummaryContainer);
        });

        await test.step(`Click Finish button and Navigate to Checkout complete page`, async () => {
            await checkoutStep2Page.clickFinishBtn();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/checkout-complete.html`);
        });

        await test.step(`Verify the information on Checkout complete page`, async () => {
            screenshotPath = [`checkoutCompleteContainer.png`];
            const checkoutCompleteContainer = page.locator(`data-test=${DATA_TEST_IDS.CheckoutCompleteContainer}`);
            await checkoutCompletePage.verifyMatchScreenshot(screenshotPath, checkoutCompleteContainer);
        });
    });
});
