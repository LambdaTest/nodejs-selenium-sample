const webdriver = require('selenium-webdriver');
const By = webdriver.By;

// Setup LambdaTest authentication and grid URL
const USERNAME = process.env.LT_USERNAME;
const KEY = process.env.LT_ACCESS_KEY;
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

async function searchTextOnGoogle() {
  // Setup Input capabilities
  const capabilities = {
    "browserName": "Safari",
    // "browserVersion": "latest",
    "LT:Options": {
        // "platformName": "Windows 10",
        name: 'Test 1', // name of the test
        build: 'NodeJS build', // name of the build
        "project": "Untitled",
        "w3c": true,
        "plugin": "node_js-node_js"
    }
};


  // URL: https://{username}:{accessToken}@beta-hub.lambdatest.com/wd/hub
  const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

  // Setup and build selenium driver object
  const driver = new webdriver.Builder()
    .usingServer(gridUrl)
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get('https://pdfstandalone.com/#/');

    // Get the elements with the specified XPath
    const elements = await driver.findElements(By.xpath('//span[@title="Language"]'));

    // Click on the first element (index 0)
    if (elements.length > 0) {
      await elements[0].click();
      console.log("Successfully clicked first list item.");
    }


    // Close the browser
    await driver.quit();
  } catch (err) {
    console.log("test failed with reason " + err);
    driver.executeScript('lambda-status=failed');
    driver.quit();
  }
}

searchTextOnGoogle();
