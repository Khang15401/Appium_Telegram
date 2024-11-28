const { remote } = require("webdriverio");

let driver;

async function main() {
    driver = await remote({
        logLevel: "debug",
        hostname: "127.0.0.1",
        port: 4723,
        path: "/",
        capabilities: {
            platformName: "Android",
            "appium:platformVersion": "15",
            "appium:deviceName": "emulator-5554",
            "appium:app": "C:\\Users\\akhan\\Downloads\\Telegram.apk",
            "appium:appPackage": "org.telegram.messenger.web",
            "appium:appActivity": "org.telegram.ui.LaunchActivity",
            "appium:automationName": "UiAutomator2",
            "appium:noReset": true,
            "appium:fullContextList": true,
            "appium:allowInsecure": ["adb_shell", "shell"]
        }

    });

    await driver.startActivity(
        "org.telegram.messenger.web",
        "org.telegram.ui.LaunchActivity",
        "org.telegram.messenger.web",
        "org.telegram.ui.LaunchActivity"
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

    // const investPopup = await driver.$('android.widget.TextView[text="Let\'s get more package"]');
    // await investPopup.waitForExist({ timeout: 10000 });
    // await investPopup.click();

    const investButton = await driver.$('//*[@bounds="[126,1693][685,1743]"]');
    await investButton.waitForExist({ timeout: 10000 });
    await investButton.click();

    await driver.pause(5000);
    // const threeMonthOption = await driver.$('//android.view.View[@text="3M" and @clickable="true"]');
    // await threeMonthOption.waitForExist({ timeout: 6000 });
    // await threeMonthOption.click();

    // const inputAmount = await driver.$('//android.widget.EditText[@bounds="[42,1617][1042,1735]"]');
    // await inputAmount.waitForExist({ timeout: 10000 });
    // await inputAmount.tap();
    // await inputAmount.sendKeys("0.01");

    const inputBounds = [42, 1617, 1042, 1735];
    const tapX = (inputBounds[2] + inputBounds[0]) / 2;
    const tapY = (inputBounds[3] + inputBounds[1]) / 2;

    await driver.executeScript('mobile: shell', [{
        command: `input tap ${tapX} ${tapY}`
    }]);

    await driver.executeScript('mobile: shell', [{
        command: 'input text "0.01"'
    }]);


    const bounds = [42, 2094, 1042,2215];
    const x = (bounds[2] + bounds[0]) / 2 + 400; 
    const y = (bounds[3] + bounds[1]) / 2;

    try {
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1', 
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: x, y: y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

    } catch (error) {
        console.error('Tap is failed:', error.message);
    }

    const x1 = (bounds[2] + bounds[0]) / 2 + 400; 
    const y1 = (bounds[3] + bounds[1]) / 2 + 50;
    try {
        await driver.performActions([{
            type: 'pointer',
            id: 'finger2', 
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: x1, y: y1 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

    } catch (error) {
        console.error('Tap is failed:', error.message);
    }

}

main().catch(console.error);
//adb -s emulator-5554 install C:/Users/akhan/Downloads/Telegram.apk 