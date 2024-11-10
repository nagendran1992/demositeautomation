const { remote } = require('webdriverio');
const { exec } = require('child_process');

const capabilities = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:platformVersion": "15", // Change as per your Android version
    "appium:deviceName": "Android Emulator",  // Change to your connected device or emulator name
    //"appium:deviceName": "RZCR90C50CH", 
    "appium:appPackage": "io.ezto.verify.dev",
    "appium:appActivity": "io.ezto.verify.demo.MainActivity",
    "appium:appWaitPackage": "io.ezto.verify.dev",  // Wait for this package to load
    "appium:appWaitActivity": "io.ezto.verify.demo.MainActivity", // Wait for this activity to load
    "appium:noReset": true, // Don't reset app state between sessions
    "appium:newCommandTimeout": 600 // Set timeout for inactivity (default is 60 seconds)
};

const wdOpts = {
    hostname: 'localhost',
    port: 4723,
    logLevel: 'info',
    capabilities,
};

// Function to start the Appium server
async function startAppiumServer() {
    return new Promise((resolve, reject) => {
        const appiumServer = exec('appium', (error) => {
            if (error) {
                reject(`Appium server failed to start: ${error.message}`);
            }
        });

        // Wait for a few seconds to ensure the server starts
        setTimeout(() => {
            resolve(appiumServer);
        }, 5000); // Adjust the timeout as necessary
    });
}

// Main test function
async function runTest(inputText) {
    let driver;  // Declare driver in outer scope
    const appiumServer = await startAppiumServer();

    try {
        // Start a session with WebDriverIO
        driver = await remote(wdOpts);// Initialize driver
        
        console.log('Driver initialized.');
        await driver.pause(4000)
        //const editTextElement = await driver.$('android.widget.EditText');
        const editTextElement = await driver.$('//android.widget.EditText');
        await editTextElement.click();
        await editTextElement.setValue(inputText);
        const clickbutton = await driver.$("//android.widget.Button[@content-desc='SUBMIT']")
        await clickbutton.isEnabled()
        await clickbutton.click()
        await driver.pause(10000)
                console.log("Closing the app...");
        exec('adb shell am force-stop io.ezto.verify.dev', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            
        });
        console.log("App closed.");
        //return toastText

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (driver) {
            await driver.deleteSession();  // Ensure session is closed if driver exists
            console.log("WebDriver session ended.");
        }

        // Stop the Appium server
        await driver.pause(10000)
        appiumServer.kill();
        console.log("Appium server stopped.");
        
    }
}


module.exports = {
    runTest
};
