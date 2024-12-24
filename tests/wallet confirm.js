const { remote } = require("webdriverio");

let driver;

async function main() {
    driver = await remote({
        logLevel: "debug",
        hostname: "127.0.0.1",
        port: 4723,
        path: "/",
        capabilities: {
            "appium:platformName": "Android",
            "appium:platformVersion": "15",
            "appium:deviceName": "emulator-5554",
            "appium:app": "C:\\Users\\akhan\\Downloads\\Tonkeeper_903.apk",
            // "appium:appPackage": "org.telegram.messenger.web",
            // "appium:appActivity": "org.telegram.messenger.DefaultIcon",
            "appium:automationName": "UiAutomator2",
            "appium:noReset": true,
            "appium:fullContextList": true,
            "appium:allowInsecure": ["adb_shell", "shell"]
        }

    });
}

main().catch(console.error);