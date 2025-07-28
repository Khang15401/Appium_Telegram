require("dotenv").config({ path: "../../config/.env" });
const { remote } = require("webdriverio");
const { Eyes, Target } = require("@applitools/eyes-webdriverio");

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
      platformName: "Android",

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

  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
  await eyes.open(driver, "Ting-Web", "Check Page Withdraw");

  const currentActivity = await driver.getCurrentActivity();
  if (currentActivity !== "com.google.android.apps.chrome.Main") {
    await driver.startActivity(
      "com.android.chrome",
      "com.google.android.apps.chrome.Main"
    );
    console.log("Chrome was not open, started activity.");
    await driver.pause(10000);

    await driver
      .action("pointer")
      .move({ duration: 0, x: 651, y: 587 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(4000);
  } else {
    console.log("Chrome is already open, continuing...");

    //Click session transfer
    //Click input search friend
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 384, y: 832 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();

    await driver
      .action("pointer")
      .move({ duration: 0, x: 651, y: 587 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(6000);

    //Select token withdraw
    await driver
      .action("pointer")
      .move({ duration: 0, x: 486, y: 839 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(5000);

    //Click token USDT network TON
    await driver
      .action("pointer")
      .move({ duration: 0, x: 472, y: 555 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(4000);

    //Click input address
    await driver
      .action("pointer")
      .move({ duration: 0, x: 482, y: 606 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(5000);

    await driver.executeScript("mobile: shell", [
      {
        command:
          'input text "UQCss7brRDCMHXVJn3iaQV9ChTIHKhyb9enqAydfAf-mSIMw"',
      },
    ]);
    await driver.pause(5000);

    //Click input amount
    await driver
      .action("pointer")
      .move({ duration: 0, x: 211, y: 936 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(1000);

    await driver.executeScript("mobile: shell", [
      {
        command: 'input text "5"',
      },
    ]);
    await driver.pause(4000);

    //Click withdraw button
    await driver
      .action("pointer")
      .move({ duration: 0, x: 546, y: 1450 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(4000);

    //Click confirm button
    await driver
      .action("pointer")
      .move({ duration: 0, x: 546, y: 2202 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(6000);

    //Click out focus
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 601, y: 1156 })
    //   .down({ button: 0 })
    //   .move({ duration: 1000, x: 587, y: 326 })
    //   .up({ button: 0 })
    //   .perform();
    // await driver.pause(3000);

    for (let i = 0; i < 6; i++) {
      await driver
        .action("pointer")
        .move({ duration: 0, x: 545, y: 2194 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();
      await driver.pause(300);
    }
    await driver.pause(5000);

    // await eyes.check(Target.window().fully());

    // await driver.pause(3000);

    // await eyes.close();

    //Close session detail transfer
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 294, y: 2184 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();
  }
}

main().catch(console.error);
