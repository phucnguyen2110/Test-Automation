import { defineConfig, devices } from '@playwright/test';
import { BASEURL } from './Sources/Helpers/Constants/urls';

export default defineConfig({
    snapshotPathTemplate: `Sources/DataFiles/ExpectedScreenshots/{arg}.png`,
    testDir: `./Tests`,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 3, // Set retries to run test cases again after running failed due to network connection
    workers: 6,
    reporter: [[`html`, { open: `never` }], [`list`], [`allure-playwright`]],
    timeout: 60 * 1000,
    expect: {
        timeout: 10000
    },
    use: {
        ignoreHTTPSErrors: true,
        permissions: [`geolocation`],
        trace: `on`,
        screenshot: `on`,
        video: `on`,
        launchOptions: {
            slowMo: 500,
            headless: false,
        },
        baseURL: BASEURL
    },
    projects: [
        {
            name: `Test Automation - ATG`,
            use: { ...devices[`Desktop Chrome`] },
        },
    ],
});
