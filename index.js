/*
    LambdaTest selenium automation sample example
    Configuration
    ----------
    username: Username can be found at automation dashboard
    accessKey:  AccessKey can be generated from automation dashboard or profile section

    Result
    -------
    Execute NodeJS Automation Tests on LambdaTest Cloud Grid 
*/

const webdriver = require('selenium-webdriver');

// username: Username can be found at automation dashboard
const username = process.env.LT_USERNAME;

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const accessKey = process.env.LT_ACCESS_KEY;

async function todoTest() {
    // Setup Input capabilities, Know more about LamdbdaTest Capabilities: https://www.lambdatest.com/capabilities-generator/
    const capabilities = {
        "browserName": "Chrome",
        // "browserVersion": "latest", #Uncomment to Specify Browser Version 
        "LT:Options": {
            name: 'NodeJS Get Set Go', // name of the test
            build: 'NodeJS Loves LambdaTest', // name of the build
            "project": "Build-With-LambdaTtest",
            "w3c": true,
            "plugin": "NodeJS",
            "customData": {
                "buildNumber": "1234",
                "environment": "Staging",
                "apiVersion": "v1.2.3",
                "releaseTag": "v1.2.3-rc1"
            },

        }
    }

    const gridUrl = 'https://' + username + ':' + accessKey + '@hub.lambdatest.com/wd/hub';

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
        await driver.executeScript('lambda-status=passed');
    } catch (err) {
        console.log("test failed with reason " + err);
        await driver.executeScript('lambda-status=failed');
    } finally {
        await driver.quit();
    }
}

todoTest();
