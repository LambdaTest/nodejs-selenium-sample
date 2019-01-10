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

// gridUrl: gridUrl can be found at automation dashboard
const GRID_URL = process.env.GRID_URL;

function searchTextOnGoogle() {

    // Setup Input capabilities
    const capabilities = {
        platform: process.env.PLATFORM || 'windows 10',
        browserName: process.env.BROWSER || 'chrome',
        version: process.env.VERSION || '67.0',
        resolution: process.env.RESOLUTION || '1280x800',
        network: true,
        visual: true,
        console: true,
        video: true,
        name: process.env.NAME || '', // name of the test
        build: process.env.BUILD || 'Untitled', // name of the build
        plugin: process.env.PLUGIN || 'N/A'
    }

    // setup and build selenium driver object 
    const driver = new webdriver.Builder()
        .usingServer(GRID_URL)
        .withCapabilities(capabilities)
        .build();

    // navigate to a url, search for a text and get title of page
    driver.get('https://www.google.com/ncr').then(function() {
        driver.findElement(webdriver.By.name('q')).sendKeys('LambdaTest\n').then(function() {
            driver.getTitle().then(function(title) {
                setTimeout(function() {
                    console.log(title);
                    driver.quit();
                }, 5000);
            });
        });
    });
}

searchTextOnGoogle();