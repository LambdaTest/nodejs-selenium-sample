
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

/*
    Setup remote driver
    Params
    ----------
    platform : Supported platform - (Windows 10, Windows 8.1, Windows 8, Windows 7,  macOS High Sierra, macOS Sierra, OS X El Capitan, OS X Yosemite, OS X Mavericks)
    browserName : Supported platform - (chrome, firefox, Internet Explorer, MicrosoftEdge, Safari)
    version :  Supported list of version can be found at https://www.lambdatest.com/capabilities-generator/
*/

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME;

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY;

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'https://hub.lambdatest.com/wd/hub';

// Setup Input capabilities
var capabilities = {
    'LT:Options': {
        "user": USERNAME,
        "accessKey": KEY,
        "build": "your build name",
        "name": "your test name",
        "platformName": "Windows 10",
        "selenium_version": "4.1.2",
        "seCdp": "true"
    },
    "browserName": "Chrome",
    "browserVersion": "latest",
};

(async () => {
    try {
        // setup and build selenium driver object 
        let driver = new webdriver.Builder()
            .forBrowser("chrome")
            .usingServer(GRID_HOST)
            .withCapabilities(capabilities)
            .build();

        // navigate to a url, click on the first and second list items and add a new one in the list.
        await driver.get('https://lambdatest.github.io/sample-todo-app/');
        driver.findElement(webdriver.By.name('li1')).click()
        console.log("Successfully clicked first list item.");

        const cdpConnection = await driver.createCDPConnection('page');
        await driver.onLogEvent(cdpConnection, function (event) {
            console.log(event['args'][0]['value']);
        });
        await driver.executeScript('console.log("here")');

        await driver.findElement(webdriver.By.name('li2')).click();
        console.log("Successfully clicked second list item.");

        await driver.findElement(webdriver.By.id('sampletodotext')).sendKeys('Complete Lambdatest Tutorial\n');
        await driver.findElement(webdriver.By.id('addbutton')).click();

        console.log("Successfully added a new task.");

        await driver.executeScript('lambda-status=passed');
        await driver.quit();
    } catch (e) {
        console.log("test failed with reason " + e)
        await driver.executeScript('lambda-status=failed');
        await driver.quit();
    }
})()

