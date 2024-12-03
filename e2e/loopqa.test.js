import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
const testData = require('../loopqa-testdata.json');

test.beforeEach(async ({ page }) => {

    const validCredentials = ["admin", "password123"];
    const loginPage = new LoginPage(page);

    // Open Login page and login
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    await loginPage.enterUser(validCredentials[0]);
    await loginPage.enterPassword(validCredentials[1]);
    await loginPage.clickSignInButton();

    // Page should have Logout after logging in
    await loginPage.logOutButton.waitFor();

})

test.describe('Data Driven Tests', () => {

    for (const data of testData)
    {
        test.describe(`Run ${data.name}`, function () {

            test(`Verify  TASK: ${data.task}`, async ({ page }) => {

                const loginPage = new LoginPage(page);
                const taskLocator = page.getByText(data.task, { exact: true });
                const columnNameLocator = page.getByRole('heading', { level: 2 }).filter({ hasText: data.column });
                const columnsLocator = page.locator('.flex-1.flex.flex-col.flex-1.flex.flex-col');
                const sidebarProjects = page.getByRole('button', {name: data.app });
                const currentColumnLocator = columnsLocator.filter({ has: columnNameLocator });
                const columnWithTaskLocator = currentColumnLocator.filter({ has: taskLocator });

                // Open the project for this element
                await sidebarProjects.click();
                await taskLocator.waitFor();

                // Verify the expected column is found
                await expect(currentColumnLocator).toBeVisible();

                // Verify the expected column contains the correct task
                await expect(columnWithTaskLocator).toBeVisible();

                // Verify the expected column contains the correct task with its associated tags
                for (const tag of data.tags)
                {
                    await expect(columnWithTaskLocator.filter({ hasText: tag })).toBeVisible();
                }

                // Log Out
                await loginPage.logOutButton.click();

            });

        })

    }

})