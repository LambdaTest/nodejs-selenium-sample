# Run Selenium Tests With Node.js On LambdaTest 

<p align="center">
<img height="500" src="https://user-images.githubusercontent.com/95698164/172000250-2a4e49e5-ec0b-452a-b1bc-3674e75ecd76.png">
</p>

<p align="center">
  <a href="https://www.lambdatest.com/blog/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample" target="_bank">Blog</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/support/docs/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample" target="_bank">Docs</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/learning-hub/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample" target="_bank">Learning Hub</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/newsletter/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample" target="_bank">Newsletter</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/certifications/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample" target="_bank">Certifications</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.youtube.com/c/LambdaTest" target="_bank">YouTube</a>
</p>
&emsp;
&emsp;
&emsp;

*Learn how to use Node.js environment to configure and run your JavaScript automation testing scripts on the [LambdaTest Selenium cloud platform](https://www.lambdatest.com/selenium-automation/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample).*

[<img height="58" width="200" src="https://user-images.githubusercontent.com/70570645/171866795-52c11b49-0728-4229-b073-4b704209ddde.png">](https://accounts.lambdatest.com/register)

## Table of Contents

* [Pre-requisites](#pre-requisites)
* [Run Your First Test](#run-your-first-test)
* [Executing The Test](#executing-the-test)
* [Testing Locally Hosted or Privately Hosted Projects](#testing-locally-hosted-or-privately-hosted-projects)

## Pre-requisites

Before getting started with Selenium automation testing on LambdaTest, you need to:

* Download and install **NodeJS**. You should be having **NodeJS v6 to NodeJS v16**. Click [here](https://nodejs.org/en/) to download.
* Make sure you are using the latest version of **JavaScript**.
* Install **npm** from the official website by clicking [here](https://www.npmjs.com/).
* Download [Selenium JavaScript bindings](https://www.selenium.dev/downloads/) from the official website. Latest versions of **Selenium Client** and **WebDriver** are ideal for running your JavaScript automation testing script on LambdaTest’s Selenium Grid.

### Installing Selenium Dependencies and tutorial repo

Clone the LambdaTest’s [nodejs-selenium-sample](https://github.com/LambdaTest/nodejs-selenium-sample) repository and navigate to the code directory as shown below:

```bash
git clone https://github.com/LambdaTest/nodejs-selenium-sample
cd nodejs-selenium-sample
```
You need to install the following dependencies to your `package.json` file: 

You will need to install the `selenium webdriver` to make the connection to the `GRID`: 

```bash
npm install selenium-webdriver
```

Create a new file as `index.js` in your current project or the sample folder and add the below code snippet which will call the installed driver. 

```js
// index.js
const webdriver = require('selenium-webdriver');
```

### Setting up Your Authentication

Make sure you have your LambdaTest credentials with you to run test automation scripts on LambdaTest Selenium Grid. You can obtain these credentials from the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/build/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample) or through [LambdaTest Profile](https://accounts.lambdatest.com/login/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample).

Set LambdaTest `Username` and `Access Key` in environment variables.

  * For **Linux/macOS**:
  ```bash
  export LT_USERNAME="YOUR_USERNAME" export LT_ACCESS_KEY="YOUR ACCESS KEY"
  ```
  * For **Windows**:
  ```bash
  set LT_USERNAME="YOUR_USERNAME" set LT_ACCESS_KEY="YOUR ACCESS KEY"
  ```

### Connecting to The Cloud Grid

Now you can add the `GRID HOST` which is used to connect your current test suites to be executed on the cloud grid. 

```js
// index.js
const GRID_HOST = 'hub.lambdatest.com/wd/hub';
const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;
const driver = new webdriver.Builder().usingServer(gridUrl).withCapabilities(capabilities).build();
```
The above grid connect will create the `Webdriver` for the test suite to execute the `Selenium` commands for your test. 

## Run Your First Test

### Configuration of Your Test Capabilities

In the test script, you need to update your test capabilities. In this code, we are passing browser, browser version, and operating system information, along with LambdaTest Selenium grid capabilities via capabilities object. The capabilities object in the above code are defined as:

```js
// index.js
const capabilities = {
        build: 'NodeJS build',  // Name of the build
        name: 'Test 1',         // Name of the test
        platform: 'windows 10', // Name of Operating System
        browserName: 'chrome',  // Name of the browser
        version: '67.0',        // Version of the browser
        resolution: '1280x800', // Resolution of the screen 
        network: true,          // Enable to capture browser network logs
        visual: true,           // Enable to capture screenshot on every command
        console: true,          // Enable to capture the console log
        video: true             // Enable to capture the video recording of the test
}
```
> **Note:** You can generate capabilities for your test requirements with the help of our inbuilt **[Capabilities Generator tool](https://www.lambdatest.com/capabilities-generator/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)**.

### Writing your Test Cases

Now you write your selenium test cases in your `index.js` file:

```js
function searchTextOnGoogle() {
    // navigate to a url, search for a text and get title of page
    driver.get('https://www.google.com/ncr').then(function () {
        driver.findElement(webdriver.By.name('q')).sendKeys('LambdaTest\n').then(function () {
            driver.getTitle().then(function (title) {
                setTimeout(function () {
                    console.log(title);
                    driver.executeScript('lambda-status=passed');
                    driver.quit();
                }, 5000);
            });
        });
    }).catch(function (err) {
        console.log("test failed with reason " + err)
        driver.executeScript('lambda-status=failed');
        driver.quit();
    });
}
searchTextOnGoogle();
```

## Executing the Test

Please execute the following command below to run your tests: 

```bash
npm test OR node index.js
```
Your test results would be displayed on the test console (or command-line interface if you are using terminal/cmd) and on [LambdaTest automation dashboard](https://automation.lambdatest.com/build/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample). LambdaTest Automation Dashboard will help you view all your text logs, screenshots and video recording for your entire automation tests.

## Testing Locally Hosted or Privately Hosted Projects

You can test your locally hosted or privately hosted projects with [LambdaTest Selenium grid cloud](https://www.lambdatest.com/selenium-automation/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample) using LambdaTest Tunnel app. All you would have to do is set up an SSH tunnel using LambdaTest Tunnel app and pass toggle `tunnel = True` via desired capabilities. LambdaTest Tunnel establishes a secure SSH protocol based tunnel that allows you in testing your locally hosted or privately hosted pages, even before they are made live.

>Refer our [LambdaTest Tunnel documentation](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/) for more information.

Here’s how you can establish LambdaTest Tunnel.

>Download the binary file of:
* [LambdaTest Tunnel for Windows](https://downloads.lambdatest.com/tunnel/v3/windows/64bit/LT_Windows.zip)
* [LambdaTest Tunnel for Mac](https://downloads.lambdatest.com/tunnel/v3/mac/64bit/LT_Mac.zip)
* [LambdaTest Tunnel for Linux](https://downloads.lambdatest.com/tunnel/v3/linux/64bit/LT_Linux.zip)

Open command prompt and navigate to the binary folder.

Run the following command:
```bash
LT -user {user’s login email} -key {user’s access key}
```
So if your user name is lambdatest@example.com and key is 123456, the command would be:
```bash
LT -user lambdatest@example.com -key 123456
```
Once you are able to connect **LambdaTest Tunnel** successfully, you would just have to pass on tunnel capabilities in the code shown below :

**Tunnel Capability**
```js
const capabilities = {
        tunnel: true,
}
```

## Additional Links

* [Advanced Configuration for Capabilities](https://www.lambdatest.com/support/docs/selenium-automation-capabilities/)
* [How to test locally hosted apps](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/)
* [How to integrate LambdaTest with CI/CD](https://www.lambdatest.com/support/docs/integrations-with-ci-cd-tools/)

## Tutorials 📙

Check out our latest tutorials on JavaScript automation testing 👇

* [How To Perform Modern Web Testing With TestCafe Using JavaScript And Selenium](https://www.lambdatest.com/blog/modern-web-testing-with-testcafe/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [How To Implement Drag And Drop In JavaScript Using Selenium?](https://www.lambdatest.com/blog/how-to-implement-drag-and-drop-in-javascript/#:~:text=Launch%20the%20browser.,Close%20the%20browser./?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [Automation Testing with Selenium JavaScript [Tutorial]](https://www.lambdatest.com/blog/automation-testing-with-selenium-javascript/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [Best 9 JavaScript Testing Frameworks](https://www.lambdatest.com/blog/top-javascript-automation-testing-framework/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [Jest vs Mocha vs Jasmine: Comparing The Top 3 JavaScript Testing Frameworks](https://www.lambdatest.com/blog/jest-vs-mocha-vs-jasmine/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [How To Use JavaScript Wait Function In Selenium WebDriver](https://www.lambdatest.com/blog/javascript-wait-in-selenium-webdriver/#SeleniumWebDriver/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [Jest Tutorial For Selenium JavaScript Testing With Examples](https://www.lambdatest.com/blog/jest-tutorial-for-selenium-javascript-testing-with-examples/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [Cucumber.js Tutorial with Examples For Selenium JavaScript](https://www.lambdatest.com/blog/cucumberjs-tutorial-selenium/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [Mocha JavaScript Tutorial With Examples For Selenium Testing](https://www.lambdatest.com/blog/mocha-javascript-tutorial-with-examples-for-selenium-testing/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [How To Get Data Of Attributes In JavaScript With Selenium](https://www.lambdatest.com/blog/how-to-get-data-of-attributes-in-javascript-with-selenium/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [How To Take Screenshots In Selenium WebDriver Using JavaScript](https://www.lambdatest.com/blog/taking-screenshots-in-selenium-webdriver-using-javascript/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [How To Use Strings In JavaScript With Selenium WebDriver](https://www.lambdatest.com/blog/using-strings-in-javascript-using-selenium-webdriver/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [How To Use JavaScript Wait Function In Selenium WebDriver](https://www.lambdatest.com/blog/javascript-wait-in-selenium-webdriver/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)

## Documentation & Resources :books:
      
Visit the following links to learn more about LambdaTest's features, setup and tutorials around test automation, mobile app testing, responsive testing, and manual testing.

* [LambdaTest Documentation](https://www.lambdatest.com/support/docs/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [LambdaTest Blog](https://www.lambdatest.com/blog/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* [LambdaTest Learning Hub](https://www.lambdatest.com/learning-hub/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)    

## LambdaTest Community :busts_in_silhouette:

The [LambdaTest Community](https://community.lambdatest.com/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample) allows people to interact with tech enthusiasts. Connect, ask questions, and learn from tech-savvy people. Discuss best practises in web development, testing, and DevOps with professionals from across the globe 🌎

## What's New At LambdaTest ❓

To stay updated with the latest features and product add-ons, visit [Changelog](https://changelog.lambdatest.com/) 
      
## About LambdaTest

[LambdaTest](https://www.lambdatest.com/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample) is a leading test execution and orchestration platform that is fast, reliable, scalable, and secure. It allows users to run both manual and automated testing of web and mobile apps across 3000+ different browsers, operating systems, and real device combinations. Using LambdaTest, businesses can ensure quicker developer feedback and hence achieve faster go to market. Over 500 enterprises and 1 Million + users across 130+ countries rely on LambdaTest for their testing needs.    

### Features

* Run Selenium, Cypress, Puppeteer, Playwright, and Appium automation tests across 3000+ real desktop and mobile environments.
* Real-time cross browser testing on 3000+ environments.
* Test on Real device cloud
* Blazing fast test automation with HyperExecute
* Accelerate testing, shorten job times and get faster feedback on code changes with Test At Scale.
* Smart Visual Regression Testing on cloud
* 120+ third-party integrations with your favorite tool for CI/CD, Project Management, Codeless Automation, and more.
* Automated Screenshot testing across multiple browsers in a single click.
* Local testing of web and mobile apps.
* Online Accessibility Testing across 3000+ desktop and mobile browsers, browser versions, and operating systems.
* Geolocation testing of web and mobile apps across 53+ countries.
* LT Browser - for responsive testing across 50+ pre-installed mobile, tablets, desktop, and laptop viewports
    
[<img height="58" width="200" src="https://user-images.githubusercontent.com/70570645/171866795-52c11b49-0728-4229-b073-4b704209ddde.png">](https://accounts.lambdatest.com/register)
      
## We are here to help you :headphones:

* Got a query? we are available 24x7 to help. [Contact Us](support@lambdatest.com/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
* For more info, visit - [LambdaTest](https://www.lambdatest.com/?utm_source=github&utm_medium=repo&utm_campaign=nodejs-selenium-sample)
