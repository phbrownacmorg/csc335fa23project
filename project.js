//https://www.freecodecamp.org/news/web-scraping-in-javascript-with-puppeteer/
const path = require('path')
const puppeteer = require('puppeteer');
const creds = require(path.resolve(process.env.HOME + '/.ssh/canvas_creds'));

const getWebpage = async () => {
// Start a Puppeteer session with:
// - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
// - no default viewport (`defaultViewport: null` - website page will in full width and height)
const browser = await puppeteer.launch({
headless: false,
defaultViewport: null,
});

// Open a new page
const page = await browser.newPage();

//await console.log("creds: "+JSON.stringify(creds, null, 4));
// On this new page:
// - open the "https://converse.instructure.com" website
// - wait until the dom content is loaded (HTML is ready)
await page.goto("https://converse.test.instructure.com/login/canvas", {
waitUntil: "domcontentloaded",
});
await page.waitForSelector('input[type=text]')
await page.type('input[type=text]', creds.username);
// await page.click('#idSIButton9');
// await page.waitForNavigation();
// await page.waitForSelector('input[type=password]');
// console.log('Found password' ); //+ creds.password)
await page.type('input[type=password]', creds.password, {delay:10});
//await page.waitForNavigation();
//await page.waitForSelector('#idSIButton9');
await page.click('input[type=submit]');
};

// Start the scraping
getWebpage();