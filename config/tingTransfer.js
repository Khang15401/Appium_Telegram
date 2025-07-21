const { remote } = require("webdriverio");
const { Eyes, Target } = require("@applitools/eyes-webdriverio");
const dotenv = require("dotenv");
dotenv.config();

let driver;
let eyes;

async function main() {
  eyes = new Eyes();

  console.log("Connecting to Appium server...");

  driver = await remote({
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    capabilities: {
      // Standard W3C capabilities (không cần prefix)
      platformName: "Android",

      // Appium-specific capabilities (cần prefix appium:)
      "appium:deviceName": "emulator-5554",
      "appium:appPackage": "com.android.chrome",
      "appium:appActivity": "com.google.android.apps.chrome.Main",
      "appium:automationName": "UiAutomator2",
      "appium:noReset": true,
      "appium:autoGrantPermissions": true,
      "appium:allowInsecure": ["adb_shell", "shell"],
    },
  });

  console.log("Chrome has opened!");

  await driver.pause(7000);

  //   eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
  //   await eyes.open(driver, "Ting-Web", "Check Page Transfer");

  const currentActivity = await driver.getCurrentActivity();
  if (currentActivity !== "com.google.android.apps.chrome.Main") {
    await driver.startActivity(
      "com.android.chrome",
      "com.google.android.apps.chrome.Main"
    );
    console.log("Chrome was not open, started activity.");
    await driver.pause(10000);
  } else {
    console.log("Chrome is already open, continuing...");

    //Click session transfer
    await driver
      .action("pointer")
      .move({ duration: 0, x: 399, y: 590 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(7000);
    //Click input search friend
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 384, y: 832 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();

    //Click user has transfers
    await driver
      .action("pointer")
      .move({ duration: 0, x: 489, y: 1537 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(6000);

    await driver.executeScript("mobile: shell", [
      {
        command: "input tap 205 623",
      },
    ]);
    await driver.pause(2000);

    await driver.executeScript("mobile: shell", [
      {
        command: 'input text "2"',
      },
    ]);
    await driver.pause(2000);

    // await driver.executeScript("mobile: shell", [
    //   {
    //     command: "input tap 388 925",
    //   },
    // ]);
    // await driver.pause(2000);

    // await driver.executeScript("mobile: shell", [
    //   {
    //     command: 'input text "text transfer"',
    //   },
    // ]);
    // await driver.pause(2000);

    // Click transfer button
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 515, y: 2224 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();

    //If not send message
    await driver
      .action("pointer")
      .move({ duration: 0, x: 532, y: 1431 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(1000);

    //Click confirm button
    await driver
      .action("pointer")
      .move({ duration: 0, x: 545, y: 2216 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(4000);

    for (let i = 0; i < 6; i++) {
      await driver
        .action("pointer")
        .move({ duration: 0, x: 545, y: 2194 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
    }
    await driver.pause(500);
  }
}

main().catch(console.error);
