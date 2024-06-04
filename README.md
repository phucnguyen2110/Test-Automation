# Test-Automation

# Test Automation: Project structure
├───Sources
│   ├───DataFiles
│   │   └───ExpectedScreenshots
│   ├───Helpers
│   │   ├───Accounts
│   │   ├───Base
│   │   ├───Constant
│   │   ├───Methods
│   │   ├───Screenshot
│   ├───PageObjects
│   │   ├───Pages
└───Tests
│   ├───UI
│   ├───MainFlow

## Clone the repo
- git clone https://github.com/phucnguyen2110/Test-Automation.git

## BEFORE STARTING
- Install on terminal: npm i

## RUN SCRIPTS
1. Run all test cases in Tests folder: npm run test
2. Run all E2E test cases: npm run all:ui
3. Run tests by @tags (specific test cases): npx playwright test --grep '@tags'
4. Report of playwright - Indicate a pass or fail status in the test results output, and/or an automated test results report against specific tests: npm run report
5. Run specific test file: npm run test <path file want to run> - Ex: npm run test Tests/UI/sign-in.spec.ts

## Allure
- Here's another type of report you can use provided by Allure
- Install: https://www.npmjs.com/package/allure-playwright
- Run below commands after running test cases successfully:
    1. allure generate allure-results -o allure-report --clean
    2. allure open allure-report