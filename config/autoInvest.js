const { remote } = require("webdriverio");
const { Eyes, Target } = require("@applitools/eyes-webdriverio");
const dotenv = require("dotenv");
dotenv.config();

let driver;
// let eyes;

async function main() {
    // eyes = new Eyes();

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

    // eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    // await eyes.open(driver, "Telegram", "Check Home Page");

    const currentActivity = await driver.getCurrentActivity();
    if (currentActivity !== "org.telegram.messenger.DefaultIcon") {
        await driver.startActivity(
            "org.telegram.messenger.web",
            "org.telegram.messenger.DefaultIcon"
        );
        
        
        const isTelegramOpened = await driver.isAppInstalled("org.telegram.messenger.web");
        console.log("Telegram app installed: ", isTelegramOpened);
        await driver.pause(4000)
        
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
        
        await driver.pause(12000)
        
        
        //button Login Vercel [745,2134][832,2221]
        const loginVercelButton = await driver.$('//*[@bounds="[745,2134][832,2221]"]');
        await loginVercelButton.waitForExist({ timeout: 25000 });
        await loginVercelButton.click();
        
        //button disable [259,1764][952,1861]
        const disableButton = await driver.$('//*[@bounds="[259,1764][952,1861]"]');
        await disableButton.waitForExist({ timeout: 10000 });
        await disableButton.click();
        await driver.pause(2000)
    }
    // await eyes.check(Target.window().fully());
    
    // const investButton = await driver.$('//*[@bounds="[42,1598][1042,1730]"]');
    // const investButton = await driver.$('//android.widget.TextView[@text="Invest To Maximize Your Earnings"]');
    // await investButton.waitForExist({ timeout: 15000 });
    // await investButton.click();
    await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },   
        actions: [
            { type: 'pointerMove', duration: 0, x: 500, y: 1800 },
            { type: 'pointerDown' },
            { type: 'pointerMove', duration: 1000, x: 500, y: 600 },
            { type: 'pointerUp' }
        ]
    }]);
    await driver.pause(2000);

    const investButton = await driver.$('//android.view.View[@bounds="[42,1843][1042,1974]"]');
    await investButton.waitForExist({ timeout: 15000 });
    await investButton.click();
    
    // await eyes.close();

    await driver.pause(5000)

    const inputBounds = [42, 1617, 1042, 1735];
    const tapX = (inputBounds[2] + inputBounds[0]) / 2;
    const tapY = (inputBounds[3] + inputBounds[1]) / 2;

    await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: tapX, y: tapY },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 100 },
            { type: 'pointerUp', button: 0 }
        ]
    }]);

    await driver.pause(1000);

    await driver.executeScript('mobile: shell', [{
        command: 'input text "0.01"'
    }]);

    await driver.pause(2000);


    async function performTapAction(xOffset, yOffset, fingerId, customBounds = [42, 2094, 1042, 2215]) {
        const x = (customBounds[2] + customBounds[0]) / 2 + xOffset;
        const y = (customBounds[3] + customBounds[1]) / 2 + yOffset;

        try {
            await driver.performActions([{
                type: 'pointer',
                id: fingerId,
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
        } catch (error) {
            console.error('Tap is failed:', error.message);
        }
    }

    await performTapAction(400, 0, 'finger1');
    await driver.pause(2000)

    await performTapAction(400, 50, 'finger2');

    await driver.pause(15000)


    // Confirm Transaction
    // await driver.action('pointer')
    //     .move({ duration: 0, x: 142, y: 2146 })
    //     .down({ button: 0 })
    //     .move({ duration: 1000, x: 985, y: 2149 })
    //     .up({ button: 0 })
    //     .perform();

    // await driver.pause(3000)

    // for (let i = 0; i < 4; i++) {
    //     await driver.action('pointer')
    //         .move({ duration: 0, x: 534, y: 2168 })
    //         .down({ button: 0 })
    //         .pause(50)
    //         .up({ button: 0 })
    //         .perform();
    // }
    // await driver.pause(15000)


    await driver.action('pointer')
        .move({ duration: 0, x: 820, y: 1161 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();


    await driver.pause(6000)


    await driver.performActions([{
        type: 'pointer',
        id: 'finger2',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: 500, y: 600 },
            { type: 'pointerDown' },
            { type: 'pointerMove', duration: 1000, x: 500, y: 1800 },
            { type: 'pointerUp' }
        ]
    }]);
    await driver.pause(2000);


    const activityPage = await driver.$('//android.view.View[@content-desc="Activity"]')
    await activityPage.waitForExist({ timeout: 10000 });
    await activityPage.click();

}

main().catch(console.error);
