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
      "appium:appPackage": "com.brave.browser",
      // "appium:appPackage": "com.android.chrome",
      // "appium:appActivity": "com.google.android.apps.chrome.Main",
      "appium:automationName": "UiAutomator2",
      "appium:noReset": true,
      "appium:autoGrantPermissions": true,
      "appium:allowInsecure": ["adb_shell", "shell"],
    },
  });

  console.log("Brave has opened!");

  await driver.pause(7000);

  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
  await eyes.open(driver, "Ting-Web", "Check Swap Functional");

  const currentPackage = await driver.getCurrentPackage();
  console.log(currentPackage);
  if (currentPackage !== "com.brave.browser") {
    await driver.startActivity("com.brave.browser");
    console.log("Brave was not open, started activity.");

    await driver
      .action("pointer")
      .move({ duration: 0, x: 832, y: 612 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(3000);

    //Enter amount to swap
    await driver
      .action("pointer")
      .move({ duration: 0, x: 832, y: 612 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(3000);

    await driver.executeScript("mobile: shell", [
      {
        command: 'input text "10"',
      },
    ]);
    await driver.pause(3000);

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 552, y: 1328 },
          { type: "pointerDown" },
          { type: "pause", duration: 100 },
          { type: "pointerUp" },
        ],
      },
    ]);
    await driver.pause(2000);

    //Click select token swap to
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 215, y: 1150 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();
    // await driver.pause(1000);

    // //Click token TON
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 485, y: 1058 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();
    // await driver.pause(3000);

    //Click swap button

    //Click confirm button
    await driver
      .action("pointer")
      .move({ duration: 0, x: 530, y: 2086 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(3000);

    for (let i = 0; i < 6; i++) {
      await driver
        .action("pointer")
        .move({ duration: 0, x: 537, y: 2052 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();

      await driver.pause(500);
    }

    //Click token USDT
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 472, y: 1784 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();
    // await driver.pause(8000);

    // await eyes.check(Target.window().fully());

    // await driver.pause(3000);

    // await eyes.close();

    await driver.pause(7000);
  } else {
    console.log("Chrome is already open...");

    //Click session transfer
    //Click input search friend
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 384, y: 832 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();

    // Select token swap
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 202, y: 606 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();

    // await driver.pause(6000);

    //Token TON
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 523, y: 1055 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();

    // //Token USD
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 532, y: 858 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();

    // await driver.pause(2000);

    await driver
      .action("pointer")
      .move({ duration: 0, x: 832, y: 612 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(3000);

    //Enter amount to swap
    await driver
      .action("pointer")
      .move({ duration: 0, x: 810, y: 608 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();

    await driver.pause(3000);

    await driver.executeScript("mobile: shell", [
      {
        command: 'input text "20"',
      },
    ]);
    await driver.pause(3000);

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 552, y: 1328 },
          { type: "pointerDown" },
          { type: "pause", duration: 100 },
          { type: "pointerUp" },
        ],
      },
    ]);
    await driver.pause(2000);

    //Click select token swap to
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 215, y: 1150 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();
    // await driver.pause(1000);

    // //Click token TON
    // await driver
    //   .action("pointer")
    //   .move({ duration: 0, x: 485, y: 1058 })
    //   .down({ button: 0 })
    //   .pause(50)
    //   .up({ button: 0 })
    //   .perform();
    // await driver.pause(3000);

    //Click swap button

    //Click confirm button
    await driver
      .action("pointer")
      .move({ duration: 0, x: 530, y: 2086 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(3000);

    for (let i = 0; i < 6; i++) {
      await driver
        .action("pointer")
        .move({ duration: 0, x: 537, y: 2052 })
        .down({ button: 0 })
        .pause(50)
        .up({ button: 0 })
        .perform();

      await driver.pause(300);
    }

    await driver.pause(6000);

    await eyes.check(Target.window().fully());

    await driver.pause(3000);

    await eyes.close();

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
