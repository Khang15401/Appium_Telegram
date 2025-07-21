const { remote } = require("webdriverio");
const { Eyes, Target } = require("@applitools/eyes-webdriverio");
const dotenv = require("dotenv");
dotenv.config();
const getOtpFromDatabase = require('./getOTPEmail');  // Import directly

let driver;
let eyes;

async function main() {
    eyes = new Eyes();

    driver = await remote({
        logLevel: "debug",
        hostname: "127.0.0.1",
        port: 4723,
        path: "/",
        capabilities: {
            "appium:platformName": "Android",
            "appium:platformVersion": "15",
            "appium:deviceName": "emulator-5554",
            "appium:app": "C:\\Users\\akhan\\Downloads\\Telegram.apk",
            "appium:appPackage": "org.telegram.messenger.web",
            "appium:appActivity": "org.telegram.messenger.DefaultIcon",
            "appium:automationName": "UiAutomator2",
            "appium:noReset": true,
            "appium:fullContextList": true,
            "appium:allowInsecure": ["adb_shell", "shell"]
        }

    });

    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    await eyes.open(driver, "Telegram", "Check Page Withdraw");

    const currentActivity = await driver.getCurrentActivity();
    if (currentActivity !== "org.telegram.messenger.DefaultIcon") {
        await driver.startActivity(
            "org.telegram.messenger.web",
            "org.telegram.messenger.DefaultIcon"
        );


        const isTelegramOpened = await driver.isAppInstalled("org.telegram.messenger.web");
        console.log("Telegram app installed: ", isTelegramOpened);
        await driver.pause(4000);

        const searchButton = await driver.$('~Search');
        await searchButton.click();

        const searchInput = await driver.$('//android.widget.EditText[@text="Search"]');
        await searchInput.waitForExist({ timeout: 5000 });
        await searchInput.setValue("tbk_stg_bot");

        const botElement = await driver.$('//android.view.ViewGroup[@text="tbk_stg_bot, bot"]');
        await botElement.waitForExist({ timeout: 5000 });
        await botElement.click();

        const moreOptionsButton = await driver.$('//android.view.View[@content-desc="Bot menu"]');
        await moreOptionsButton.waitForExist({ timeout: 5000 });
        await moreOptionsButton.click();

        await driver.pause(12000);

        await eyes.check(Target.window().fully());

            await driver.pause(3000);

            await eyes.close();


        //button Login Vercel [745,2134][832,2221]
        // const loginVercelButton = await driver.$('//*[@bounds="[745,2134][832,2221]"]');
        // await loginVercelButton.waitForExist({ timeout: 25000 });
        // await loginVercelButton.click();

        // //button disable [259,1764][952,1861]
        // const disableButton = await driver.$('//*[@bounds="[259,1764][952,1861]"]');
        // await disableButton.waitForExist({ timeout: 10000 });
        // await disableButton.click();
        // await driver.pause(2000);
    }

    // const assetButton = await driver.$('//android.view.View[@bounds="[42,2118][244,2289]"]')
    // await assetButton.waitForExist({ timeout: 5000 });
    // await assetButton.click();
    // await driver.pause(3000);

    const withdrawnButton = await driver.$('//android.widget.Button[@text="Withdraw" and @bounds="[378,1370][703,1491]"]');
    await withdrawnButton.waitForExist({ timeout: 5000 });
    await withdrawnButton.click();
    await driver.pause(5000);


    //Chose the token to withdraw
    // await driver.action('pointer')
    //     .move({ duration: 0, x: 495, y: 1800 })
    //     .down({ button: 0 })
    //     .pause(50)
    //     .up({ button: 0 })
    //     .perform();
    // await driver.pause(2000);

    //Token TON
    await driver.action('pointer')
        .move({ duration: 0, x: 466, y: 1970 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(5000);

    try {
        await driver.action('pointer')
            .move({ duration: 0, x: 709, y: 2164 })
            .down({ button: 0 })
            .pause(50)
            .up({ button: 0 })
            .perform();
        await driver.pause(2000);
    } catch (error) {
        console.error('Failed to click continue button:', error.message);
        throw error;
    }

    // Click form input wallet address
    await driver.action('pointer')
        .move({ duration: 0, x: 366, y: 996 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();

    await driver.pause(4000);

    await driver.executeScript('mobile: shell', [{
        command: 'input text "UQAOTN6K6uXoz3OW3w2ramezDuIDnGX7YNDuVKIqmfgj3QDJ"'
    }]);

    await driver.pause(2000);


    // // Enter the number you want to withdraw
    await driver.action('pointer')
        .move({ duration: 0, x: 112, y: 1552 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(4000);

    await driver.executeScript('mobile: shell', [{
        command: 'input text "0.05"'
    }]);

    await driver.pause(10000);

    // // Enter the number memo
    // await driver.action('pointer')
    //     .move({ duration: 0, x: 321, y: 1560 })
    //     .down({ button: 0 })
    //     .pause(50)
    //     .up({ button: 0 })
    //     .perform();
    // await driver.pause(4000);

    // await driver.executeScript('mobile: shell', [{
    //     command: 'input text "786979"'
    // }]);
    // await driver.pause(2000);

    // Confirm Transaction
    await driver.action('pointer')
        .move({ duration: 0, x: 362, y: 2157 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();

    await driver.pause(2000)

    // Press SEND OTP
    await driver.action('pointer')
        .move({ duration: 0, x: 940, y: 1974 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000)

    // Get OTP from database
    try {
        const otp = await getOtpFromDatabase();  // Call directly
        if (otp) {
            console.log('Retrieved OTP:', otp);
            // Use the OTP value for next steps
            await driver.action('pointer')
                .move({ duration: 0, x: 108, y: 1810 })
                .down({ button: 0 })
                .pause(50)
                .up({ button: 0 })
                .perform();
            await driver.pause(3000);

            await driver.executeScript('mobile: shell', [{
                command: `input text "${otp}"`
            }]);
            await driver.pause(3000);

            await driver.action('pointer')
                .move({ duration: 0, x: 690, y: 2160 })
                .down({ button: 0 })
                .pause(50)
                .up({ button: 0 })
                .perform();
            await driver.pause(3000);

            // await eyes.check(Target.window().fully());

            // await driver.pause(3000);

            // await eyes.close();

        } else {
            throw new Error('Failed to retrieve OTP');
        }
    } catch (error) {
        console.error('Error getting OTP:', error);
        throw error;
    }
}

main().catch(console.error);
