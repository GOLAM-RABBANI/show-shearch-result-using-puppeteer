import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless:false,
    slowMo:250
    
});
const page = await browser.newPage();
await page.goto('https://duckduckgo.com',{
    waitUntil:"networkidle2",
    timeout:60000
});
  // Type into search box
  await page.type('#searchbox_input', 'bangladesh');
  const searchResultSelector = '[aria-label="Search"]';
  await page.click(searchResultSelector);

  await page.waitForSelector('[data-result="snippet"]');
  const articles = await page.evaluate(() => {
    return [...document.querySelectorAll('[data-result="snippet"]')].map((e) => e.textContent);
});
console.log({articles})
  await browser.close();
