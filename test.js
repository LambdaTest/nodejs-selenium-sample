const webdriver = require('selenium-webdriver');
const By = webdriver.By;

// Setup LambdaTest authentication and grid URL
const USERNAME = process.env.LT_USERNAME;
const KEY = process.env.LT_ACCESS_KEY;
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

async function pdfWebTest() {
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
      "customData": 
        {
          _id: "5f46aaa69adf77cfe2bb4fd6",
          index: "0",
          guid: "9451b204-12f0-4177-8fe9-fb019b3e4bf3",
          isActive: "False",
          picture: "http://placehold.it/32x32",
        },
      
    }
  };

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
    driver.executeScript('lambda-status=passed');

    // Close the browser
    await driver.quit();
  } catch (err) {
    console.log("test failed with reason " + err);
    driver.executeScript('lambda-status=failed');
    driver.quit();
  }
}

pdfWebTest();
