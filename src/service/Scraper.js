
import puppeteer from 'puppeteer';

export const scrapeSales = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForFunction(() => document.querySelectorAll('tr').length > 1);
    await page.waitForTimeout(1000);

    const scrapedData = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr'));
        return rows.map(row => {
            const imgElement = row.querySelector('td:first-child img');
            const imgUrl = imgElement ? imgElement.src : '';
            const otherData = Array.from(row.querySelectorAll('td')).slice(1).map(td => td.innerText.trim().replace('\nTake Ask', ''));
            return [imgUrl, ...otherData];
        });
    });

    await browser.close();

    return scrapedData;
}