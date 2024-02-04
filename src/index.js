import { getClient, sendMessage } from './service/Discord.js';
import mongoose from 'mongoose';

import { registerCommands } from './service/Commands.js';
import { scrapeSales } from './service/Scraper.js'
import { dropCollection, getSale, saveSale, saveJob } from './service/Database.js';
import Sale from "./models/Sale.js"
import Job from "./models/Job.js"

const url = "https://www.avalytics.xyz/collection/0x54c800d2331e10467143911aabca092d68bf4166/trades/"
 // Main entry point
const client = await getClient();    
registerCommands()

const beginRun = async () => {
    const scrapedSales = await scrapeSales(url)

    for (const scrapedSale of scrapedSales) {
        const [imgUrl, name, price, marketplace, from, to, timestamp] = scrapedSale;

        const sale = await getSale(name, from, to);
    
        if(!sale) {
            const newSale = new Sale({ 
                imgUrl: imgUrl,
                name: name,
                price: price, 
                marketplace: marketplace, 
                from:from, 
                to: to, 
                timestamp: new Date().toISOString()
            });
    
            saveSale(newSale)
            
            sendMessage(client, "1201992904814366730", newSale)
        }
    }
    
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");

    const job = {projectUrl : "someUrl", enabled: true}
    // saveJob(job);
    // beginRun();

    // setInterval(beginRun, 20000); 
});