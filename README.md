# NodeJS Test Tutorial

![NodeJS Framework](https://cdn.lambdatest.com/support/docs/wp-content/uploads/2019/03/run-nodejs-tests-on-selenium-grid-cloud.jpg)
Node.js is an efficient, light weight and cross platform runtime environment for executing JavaScript code. npm(node package manager) is the largest ecosystem of open source libraries. LambdaTest enables node.js scripts to run on the Selenium automation grid. This tutorial will help you run Nodejs automation scripts over LambdaTest Selenium Grid.

## Prerequisites for Node.js Tutorial

1. Install npm.

```
sudo apt install npm
```

2. Install NodeJS.

```
sudo apt install nodejs.
```

## Steps to Run your First Test

Step 1. Clone the NodeJs Selenium Repository.

```
git clone https://github.com/4msha/nodejs-selenium-sample.git
```

Step 2. Export the Lambda-test Credentials. You can get these from your automation dashboard. T

<p align="center">
   <b>For Linux/macOS:</b>:
 
```
export LT_USERNAME="YOUR_USERNAME"
export LT_ACCESS_KEY="YOUR ACCESS KEY"
```
<p align="center">
   <b>For Windows:</b>

```
set LT_USERNAME="YOUR_USERNAME"
set LT_ACCESS_KEY="YOUR ACCESS KEY"
```

Step 3. Inside nodejs.selenium repository install necessary packages.

```
cd nodejs-selenium-sample
npm i
```

Step 4. To run your First Test.

```
npm test
or node index.js
```

## See the Results

You can check your test results on the [Automation Dashboard](https://automation.lambdatest.com/build).
![Automation Testing Logs](https://github.com/LambdaTest/nodejs-selenium-sample/blob/master/tutorial-images/automation%20testing%20logs.PNG)

## Understanding the Test.

1. Importing Selenium Wedriver,setting up username, ccess-key, and grid-host.

```
const webdriver = require('selenium-webdriver');

// USERNAME & KEY can be found at automation dashboard
const USERNAME = 'shwetas';
const KEY = 'xhfQswR5454';

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

```

2. Define the Test function and capabilities.

```
function searchTextOnGoogle() {

    // Setup Input capabilities
    const capabilities = {
        platform: 'windows 10',
        browserName: 'firefox',
        version: 'latest',
        resolution: '1280x800',
        geoLocation :'IT',
        network: false,
        visual: false,
        console: false,
        video: true,
        name: 'Test 1', // name of the test
        build: 'NodeJS build' // name of the build
    }

    // URL: https://{username}:{accessToken}@beta-hub.lambdatest.com/wd/hub
}
searchTextOnGoogle()
```

3. Next, we create the grid url and create the selenium driver object.

```
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

    // setup and build selenium driver object
    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();
```

4. At last, we try to search LambdaTest on google.

```
 // navigate to a url, search for a text and get title of page
    driver.get('https://www.google.com/ncr').then(function() {
        driver.findElement(webdriver.By.name('q')).sendKeys('LambdaTest\n').then(function() {
            driver.getTitle().then(function(title) {
                setTimeout(function() {
                    console.log(title);
                    driver.executeScript('lambda-status=passed');
                    driver.quit();
                }, 5000);
            });
        });
    }).catch(function(err){
        console.log("test failed with reason "+err)
        driver.executeScript('lambda-status=failed');
        driver.quit();
    });
```

### Want To Run Lambda Tunnel Without Using Command Line?

Download the Underpass app for your operating system. Refer to our support documentation for more information on [Lambda Underpass-tunnel-app](https://www.lambdatest.com/support/docs/underpass-tunnel-application/).

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based Selenium Grid Infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [Selenium test automation](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.
