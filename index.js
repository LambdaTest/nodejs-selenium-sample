/*
    LambdaTest selenium automation sample example
    Configuration
    ----------
    username: Username can be found at automation dashboard
    accessToken:  AccessToken can be generated from automation dashboard or profile section

    Result
    -------
    Execute NodeJS Automation Tests on LambdaTest Distributed Selenium Grid 
*/

const webdriver = require('selenium-webdriver');

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME;

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY;

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

async function searchTextOnGoogle() {
    // Setup Input capabilities

    const capabilities = {
        "browserName": "Chrome",
        "browserVersion": "latest",
        "LT:Options": {
            // "platformName": "Windows 10",
            name: 'Test 1', // name of the test
            build: 'NodeJS build', // name of the build
            "project": "Untitled",
            "w3c": true,
            "plugin": "node_js-node_js"
        }
    }

    // URL: https://{username}:{accessToken}@beta-hub.lambdatest.com/wd/hub
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

    // Setup and build selenium driver object
    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();

    try {
        // Navigate to a URL, click on the first and second list items and add a new one in the list.
        await driver.get('https://lambdatest.github.io/sample-todo-app/');
        await driver.findElement(webdriver.By.name('li1')).click();
        console.log("Successfully clicked first list item.");
        await driver.findElement(webdriver.By.name('li2')).click();
        console.log("Successfully clicked second list item.");

        await driver.findElement(webdriver.By.id('sampletodotext')).sendKeys('Complete Lambdatest Tutorial\n');
        await driver.findElement(webdriver.By.id('addbutton')).click();
        console.log("Successfully added a new task.");
    } catch (err) {
        console.log("test failed with reason " + err);
        await driver.executeScript('lambda-status=failed');
    } finally {
        await driver.quit();
    }
}

searchTextOnGoogle();
