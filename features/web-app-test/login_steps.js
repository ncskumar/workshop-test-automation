// import { Given, When, Then } from '@cucumber/cucumber';
// import { Builder, By, until } from 'selenium-webdriver';
// import assert from 'assert';

// let driver;

// Given('I am on the login page', async function () {
//     driver = new Builder().forBrowser('chrome').build();
//     await driver.get('http://localhost:8085/login.php'); // Replace with your login URL
// });

// When('I enter {string} and {string} as credentials', async function (email, password) {
//     const emailField = await driver.findElement(By.name('username')); // Replace with actual ID
//     const passwordField = await driver.findElement(By.name('password')); // Replace with actual ID

//     await emailField.sendKeys(email);
//     await passwordField.sendKeys(password);
// });

// When('I click the login button', async function () {
//     const loginButton = await driver.findElement(By.name('Login')); // Replace with actual ID
//     await loginButton.click();
// });

// Then('I should see the homepage', async function () {
//     //const title = await driver.getTitle();
//    const header =  await driver.wait(async () => {
//         const title = await driver.getTitle();
//         return title; // Replace with your condition
//     }, 5000);

//     if (header === 'Welcome :: Damn Vulnerable Web Application (DVWA) v1.10 *Development*') { // Replace 'Dashboard' with the expected title
//         console.log('Dashboard is loaded');
//     } else {
//         console.log('Dashboard title not found');
//     }
//     await driver.quit();
// });