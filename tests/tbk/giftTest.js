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

    const assetButton = await driver.$('//android.view.View[@bounds="[42,2118][244,2289]"]')
    await assetButton.waitForExist({ timeout: 5000 });
    await assetButton.click();
    await driver.pause(3000);

    const giftButton = await driver.$('//android.view.View[@text="Gift"]');
    await giftButton.waitForExist({ timeout: 5000 });
    await giftButton.click();

    //Enter username receiver
    await driver.action('pointer')
        .move({ duration: 0, x: 321, y: 1202 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();

    await driver.pause(2000);

    await driver.executeScript('mobile: shell', [{
        command: 'input text "King Game"'
    }]);

    await driver.pause(3000);

    await driver.action('pointer')
        .move({ duration: 0, x: 530, y: 1750 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();


    // Chose locktime package
    const locktimePackage = await driver.$('//android.view.View[@text="6M"]');
    await locktimePackage.waitForExist({ timeout: 5000 });
    await locktimePackage.click();
    // const locktimePackage = await driver.$('//android.view.View[@text="12M"]');
    // const locktimePackage = await driver.$('//android.view.View[@text="24M"]');
    // const locktimePackage = await driver.$('//android.view.View[@text="Flexible"]');


    await driver.action('pointer')
        .move({ duration: 0, x: 231, y: 1444 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    await driver.executeScript('mobile: shell', [{
        command: 'input text "0.01"'
    }]);
    await driver.pause(4000);

    // Enter messsage and chose gift
    await driver.action('pointer')
        .move({ duration: 0, x: 336, y: 2231 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    const randomContent = ["Happy Birthday", "Happy New Year", "Merry Christmas", "Have a nice day",
        "Good luck", "Good job", "Good morning", "Good night", "Good evening", "Good afternoon", "Good day",
    ];
    const randomIndex = Math.floor(Math.random() * randomContent.length);
    const randomMessage = randomContent[randomIndex];

    await driver.executeScript('mobile: shell', [{
        command: `input text "${randomMessage}"`
    }]);
    await driver.pause(2000);


    // Chose gift
    await driver.action('pointer')
        .move({ duration: 0, x: 925, y: 2209 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    await driver.action('pointer')
        .move({ duration: 0, x: 119, y: 1257 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    await driver.action('pointer')
        .move({ duration: 0, x: 937, y: 1687 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 534, y: 1687 })
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    //apply gift
    await driver.action('pointer')
        .move({ duration: 0, x: 478, y: 2153 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    //scroll down 
    await driver.action('pointer')
        .move({ duration: 0, x: 978, y: 1914 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 978, y: 784 })
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    await driver.action('pointer')
        .move({ duration: 0, x: 134, y: 1948 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    await driver.action('pointer')
        .move({ duration: 0, x: 131, y: 1526 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(2000);

    const giveButton = await driver.$('//android.widget.Button[@text="Give A Gift"]');
    await giveButton.waitForExist({ timeout: 5000 });
    await giveButton.click();
    await driver.pause(3000);

    await driver.action('pointer')
        .move({ duration: 0, x: 698, y: 2164 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(5000);

    await driver.action('pointer')
        .move({ duration: 0, x: 537, y: 2164 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    await driver.pause(5000);

    await client.deleteSession();
}

main().catch(console.error);