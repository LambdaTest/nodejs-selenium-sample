# NodeJS Test Tutorial

![LambdaTest Logo](https://www.lambdatest.com/images/logo.svg)

![NodeJS Framework](https://cdn.lambdatest.com/support/docs/wp-content/uploads/2019/03/run-nodejs-tests-on-selenium-grid-cloud.jpg)

Node.js is an efficient, light weight  and cross platform  runtime environment for executing JavaScript code. npm(node package manager) is the largest ecosystem of open source libraries.  LambdaTest enables node.js scripts to run on the Selenium automation grid.

This tutorial will help you run Nodejs automation scripts over LambdaTest Selenium Grid.

## Prerequisites for  Node.js Tutorial

1. [Download Visual Studio](https://visualstudio.microsoft.com/downloads/) (IDE) for your operating system.
2. **Node.js and Package Manager (npm)** : Install Node.js from their [official website](https://nodejs.org/en/download/) Or Install Node.js using command line. Go to the terminal or command prompt & run the below command.

```
$   install node
```

To verify the node version 

```
$  node -v 
```

If node isn’t of the latest version then you can update it using the below command.

```
$ npm install npm@latest -g
```

3. Install **Selenium Dependencies**

```
npm install selenium-webdriver
```

4. **LambdaTest Authentication Credentials**: Make sure you have your LambdaTest credentials with you to run test automation scripts with Jest on LambdaTest Selenium Grid. You can obtain these credentials from the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/) or through [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile).

Set LambdaTest Username and Access Key in environment variables.

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

## Setting Up The Project In Visual Studio IDE

* **Step 1** : After installation of the Visual Studio IDE, create a folder in your local system to save all the projects.

* **Step 2** : Install the below extensions for JavaScript from ‘Extensions’ in VScode Editor.
      
      * Code Runner
      * JavaScript( ES6) code snippet
      * ES Lint

* **Step 3** : Press ‘Ctrl+Shift+P’ and search for git:clone. Paste the URL of this repository([https://github.com/LambdaTest/nodejs-selenium-sample](https://github.com/LambdaTest/nodejs-selenium-sample)) to clone.

* **Step 4** : Press ENTER and save the TestCafe project in the above created folder.

* **Step 5**: Create a project directory named *nodejs-selenium-sample*.

**Step 6**: Create a file named **index.js** inside the project **nodejs-selenium-sample**. This index.js will be used to specify the nodejs test script that will be executed over the LambdTest Selenium Grid on cloud.

## Executing First node.js Testing Script

### Test Scenario

The test script will do the following actions:

1. Invoke the browser launch.
2. Go to [www.google.com](http://www.google.com).
3. Type LambdaTest in the search box.
4. Fetch the title of the web page.
5. Close the browser and display the fetched title in the console.

That’s it. Before we deep dive into the test script, we need to declare our desired capabilities. These desired capabilities will help us define the testing environment such as browser version, operating system, and more. You can leverage [LambdaTest Desired Capabilities Generator](https://www.lambdatest.com/capabilities-generator/) to specify the desired capabilities class.

### [LambdaTest Desired Capabilities Generator](https://www.lambdatest.com/capabilities-generator/)

Let us fetch the desired capabilities class from the LambdaTest Desired Capabilities Generator to run the script on LambdaTest cloud-based Selenium Grid.

![LambdaTest Desired Capabilities](https://github.com/LambdaTest/nodejs-selenium-sample/blob/master/tutorial-images/lambdaTest%20desired%20capabilities%20generator.png)

With the capability generator, you can specify a variety of configurations in multiple programming languages.

With that said, let us look into the test script **index.js**.

```
const webdriver = require('selenium-webdriver');
 
// USERNAME & KEY can be found at automation dashboard
const USERNAME = 'shwetas';
const KEY = 'xhfQswR5454';
 
// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';
 
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
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;
 
    // setup and build selenium driver object 
    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();
 
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
}
searchTextOnGoogle()
```

## Running The Test

Open the command line in the same directory where the GitHub repository for nodejs tutorial is cloned & run the below command.

```
node index.js
```

Once the test case is executed, you can assess its status over the LambdaTest Automation Dashboard. You can figure out whether the test has passed or failed. You can also review various kinds of test logs such as network logs, command logs, raw Selenium logs, and even video recording of the entire test execution.

![Automation Testing Logs](https://github.com/LambdaTest/nodejs-selenium-sample/blob/master/tutorial-images/automation%20testing%20logs.PNG)

If you notice your console output in the command prompt or terminal. You will find the below output.

![Command Prompt](https://github.com/LambdaTest/nodejs-selenium-sample/blob/master/tutorial-images/cmd.PNG)

### Test Your Locally Hosted Web Applications

You can also perform cross browser testing of your web application which is locally hosted using Lambda Tunnel. Lambda Tunnel establishes a secure shell connection between your localhost and our cloud servers to help you execute Selenium test automation for privately hosted projects. All you need to do is set the tunnel variable as true in your desired capabilities for running your Selenium script with Lambda Tunnel.

* Set **tunnel = true**
* Set **truetunnelName = 'Identifier name'**  (recommended in case of more than 1 tunnels are connected)

For example, to run the above test script through your localhost, your desired capabilities will be:

```
const capabilities = {
        platform: 'windows 10',
        browserName: 'firefox',
        version: 'latest',
        resolution: '1280x800',
        network: false,
        visual: false,
        console: false,
        video: true,
        tunnel: true, // flag to run Selenium script on Lambda Tunnel
        name: 'Test 1',
        build: 'NodeJS build'
```

It is important to note that you would need to download the Lambda Tunnel binary file for your operating system. Refer to our support documentation for more information on [Lambda Tunnel](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

### Want To Run Lambda Tunnel Without Using Command Line?

Download the Underpass app for your operating system. Refer to our support documentation for more information on [Lambda Underpass-tunnel-app](https://www.lambdatest.com/support/docs/underpass-tunnel-application/).

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based Selenium Grid Infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [Selenium test automation](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.
