import { test } from '../../Sources/Helpers/Base/page-objects.fixture';
import { BASEURL } from '../../Sources/Helpers/Constants/urls';
import { PURCHASE } from '../../Sources/Helpers/Constants/describes';
import { MethodsConfig } from '../../Sources/Helpers/Methods/config';
import { AccountInterface } from '../../Sources/Helpers/Accounts/account.interface';
import { ACCOUNT1 } from '../../Sources/Helpers/Accounts/account';
import { DATA_TEST_IDS } from '../../Sources/Helpers/Constants/ids';

const account: AccountInterface = ACCOUNT1;
let screenshotPath: string[];

test.describe(`${PURCHASE.Inventory} @ui`, () => {
    test.beforeEach(`General steps before testing`, async ({ page, signInPage }) => {
        // Login successfully for each test cases below
        await MethodsConfig.goTo(page, BASEURL);
        await signInPage.inputToUsername(account.username);
        await signInPage.inputToPwd(account.pwd);
        await signInPage.clickLoginBtn();
        await MethodsConfig.navigateToAndContain(page, `${BASEURL}/inventory.html`);
    });

    test(`IV001 - Verify the components of Inventory page after signing successfully`, async ({ page, inventoryPage }) => {
        screenshotPath = [`inventoryContainer.png`];
        const inventoryContainer = page.locator(`data-test=${DATA_TEST_IDS.InventoryContainer}`);
        await inventoryPage.verifyMatchScreenshot(screenshotPath, inventoryContainer);
    });

    test(`IV002 - Verify that the Add to cart button of all items can be clickable and update correct number in shopping cart link icon`, async ({ inventoryPage }) => {
        await test.step(`Click Add to cart button for each item`, async () => {
            await inventoryPage.clickAddToCartBackpackBtn();
            await inventoryPage.clickAddToCartBikeLightBtn();
            await inventoryPage.clickAddToCartJacketBtn();
            await inventoryPage.clickAddToCartOnesieBtn();
            await inventoryPage.clickAddToCartRedBtn();
            await inventoryPage.clickAddToCartTShirtBtn();
        });

        await test.step(`Verify the number of item in Shopping cart link`, async () => {
            await inventoryPage.verifyShoppingCartLink(6);
        });
    });

    test(`IV003 - Verify that the Remove button of all items can be clickable and update correct number in shopping cart link icon`, async ({ inventoryPage }) => {
        await test.step(`Click Add to cart button for each item`, async () => {
            await inventoryPage.clickAddToCartBackpackBtn();
            await inventoryPage.clickAddToCartBikeLightBtn();
            await inventoryPage.clickAddToCartJacketBtn();
            await inventoryPage.clickAddToCartOnesieBtn();
            await inventoryPage.clickAddToCartRedBtn();
            await inventoryPage.clickAddToCartTShirtBtn();
        });

        await test.step(`Click Remove button for each item and verify the number of item in shopping cart link icon`, async () => {
            await inventoryPage.clickRemoveBackpackBtn();
            await inventoryPage.verifyShoppingCartLink(5);
            await inventoryPage.clickRemoveJacketBtn();
            await inventoryPage.verifyShoppingCartLink(4);
            await inventoryPage.clickRemoveLightBtn();
            await inventoryPage.verifyShoppingCartLink(3);
            await inventoryPage.clickRemoveOnesieBtn();
            await inventoryPage.verifyShoppingCartLink(2);
            await inventoryPage.clickRemoveRedBtn();
            await inventoryPage.verifyShoppingCartLink(1);
            await inventoryPage.clickRemoveShirtBtn();
            await inventoryPage.verifyShoppingCartLink(0);
        });
    });

    test(`IV004 - Verify that the filter Name (A to Z) works properly`, async ({ page, inventoryPage }) => {
        await test.step(`Open the dropdown filter`, async () => {
            await inventoryPage.openFilterDropdown();
        });

        await test.step(`Select option Name (A to Z)`, async () => {
            await inventoryPage.selectOptionAZ(page);
        });

        await test.step(`Verify the results of filter Name (A to Z)`, async () => {
            await MethodsConfig.delay(2000);
            screenshotPath = [`inventoryContainer.png`];
            const inventoryContainer = page.locator(`data-test=${DATA_TEST_IDS.InventoryContainer}`);
            await inventoryPage.verifyMatchScreenshot(screenshotPath, inventoryContainer);
        });
    });

    test(`IV005 - Verify that the filter Name (Z to A) works properly`, async ({ page, inventoryPage }) => {
        await test.step(`Open the dropdown filter`, async () => {
            await inventoryPage.openFilterDropdown();
        });

        await test.step(`Select option Name (Z to A)`, async () => {
            await inventoryPage.selectOptionZA(page);
        });

        await test.step(`Verify the results of filter Name (Z to A)`, async () => {
            await MethodsConfig.delay(3000);
            screenshotPath = [`sortZA.png`];
            const inventoryContainer = page.locator(`data-test=${DATA_TEST_IDS.InventoryContainer}`);
            await inventoryPage.verifyMatchScreenshot(screenshotPath, inventoryContainer);
        });
    });

    test(`IV006 - Verify that the filter Price (low to high) works properly`, async ({ page, inventoryPage }) => {
        await test.step(`Open the dropdown filter`, async () => {
            await inventoryPage.openFilterDropdown();
        });

        await test.step(`Select option Price (low to high)`, async () => {
            await inventoryPage.selectOptionLowHigh(page);
        });

        await test.step(`Verify the results of filter Price (low to high)`, async () => {
            await MethodsConfig.delay(2000);
            screenshotPath = [`sortLowHigh.png`];
            const inventoryContainer = page.locator(`data-test=${DATA_TEST_IDS.InventoryContainer}`);
            await inventoryPage.verifyMatchScreenshot(screenshotPath, inventoryContainer);
        });
    });

    test(`IV007 - Verify that the filter Price (high to low) works properly`, async ({ page, inventoryPage }) => {
        await test.step(`Open the dropdown filter`, async () => {
            await inventoryPage.openFilterDropdown();
        });

        await test.step(`Select option Price (high to low)`, async () => {
            await inventoryPage.selectOptionHighLow(page);
        });

        await test.step(`Verify the results of filter Price (high to low)`, async () => {
            await MethodsConfig.delay(2000);
            screenshotPath = [`sortHighLow.png`];
            const inventoryContainer = page.locator(`data-test=${DATA_TEST_IDS.InventoryContainer}`);
            await inventoryPage.verifyMatchScreenshot(screenshotPath, inventoryContainer);
        });
    });
});
