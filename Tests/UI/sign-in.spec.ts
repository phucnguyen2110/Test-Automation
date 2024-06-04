import { test } from '../../Sources/Helpers/Base/page-objects.fixture';
import { BASEURL } from '../../Sources/Helpers/Constants/urls';
import { AUTHENTICATE } from '../../Sources/Helpers/Constants/describes';
import { MethodsConfig } from '../../Sources/Helpers/Methods/config';
import { AccountInterface } from '../../Sources/Helpers/Accounts/account.interface';
import { ACCOUNT1 } from '../../Sources/Helpers/Accounts/account';
import { DATA_TEST_IDS } from '../../Sources/Helpers/Constants/ids';

const account: AccountInterface = ACCOUNT1;
let screenshotPath: string[];

test.describe(`${AUTHENTICATE.Sign_in} @ui`, () => {
    test.beforeEach(`General steps before testing`, async ({ page, signInPage }) => {
        // Verify the components of Login page
        await MethodsConfig.goTo(page, BASEURL);
        await signInPage.verifyComponents();

        // Verify login credentials container by matching the loginCredentials screenshot
        screenshotPath = [`loginCredentials.png`];
        const loginCredentials = page.locator(`data-test=${DATA_TEST_IDS.LoginCredentials}`);
        await signInPage.verifyMatchScreenshot(screenshotPath, loginCredentials);
    });

    test(`SI001 - Verify user can log in successfully`, async ({ page, signInPage }) => {
        await test.step(`Input data`, async () => {
            await signInPage.inputToUsername(account.username);
            await signInPage.inputToPwd(account.pwd);
        });

        await test.step(`Click Login button and Verify the navigation to Inventory page`, async () => {
            await signInPage.clickLoginBtn();
            await MethodsConfig.navigateToAndContain(page, `${BASEURL}/inventory.html`);
        });
    });

    test(`SI002 - Verify user cannot log in with all empty fields`, async ({ signInPage }) => {
        await test.step(`Click Login button`, async () => {
            await signInPage.clickLoginBtn();
            await MethodsConfig.delay(2000);
        });

        await test.step(`The system displays error message`, async () => {
            await signInPage.displayErrorMessage(`Username`);
        });
    });

    test(`SI003 - Verify the system shows error message with empty password`, async ({ signInPage }) => {
        await test.step(`Input username`, async () => {
            await signInPage.inputToUsername(account.username);
        });

        await test.step(`Click Login button`, async () => {
            await signInPage.clickLoginBtn();
        });

        await test.step(`The system shows error message`, async () => {
            await signInPage.displayErrorMessage(`Password`);
        });
    });

    test(`SI004 - Verify the system shows error message with empty username`, async ({ signInPage }) => {
        await test.step(`Input password`, async () => {
            await signInPage.inputToPwd(account.pwd);
        });

        await test.step(`Click Login button`, async () => {
            await signInPage.clickLoginBtn();
        });

        await test.step(`The system shows error message`, async () => {
            await signInPage.displayErrorMessage(`Username`);
        });
    });

    test(`SI005 - Verify the system shows error message with incorrect password`, async ({ signInPage }) => {
        await test.step(`Input username`, async () => {
            await signInPage.inputToUsername(account.username);
        });
        
        await test.step(`Input incorrect password`, async () => {
            await signInPage.inputToPwd(`12345`);
        });

        await test.step(`Click Login button`, async () => {
            await signInPage.clickLoginBtn();
        });

        await test.step(`The system shows error message`, async () => {
            await signInPage.displayErrorMessage(`Combine`);
        });
    });
});
