import { getClient, sendMessage } from './service/Discord.js';
import mongoose from 'mongoose';

import { registerCommands } from './service/Commands.js';
import { scrapeSales } from './service/Scraper.js'
import { dropCollection, getSale, saveSale, saveJob, getJob, getAllJobs } from './service/Database.js';
import Sale from "./models/Sale.js"
import Job from "./models/Job.js"
import { PROPERTIES } from './Config.js';

const url = "https://www.avalytics.xyz/collection/0x54c800d2331e10467143911aabca092d68bf4166/trades/"

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

    runIntervalJob()
});

const runIntervalJob = async () => {
    let i = 0
    const run = async () => {
      const job = await getJob(PROPERTIES.NAME)

      if(job.active) {
        beginRun()
      }
      i++
    }
    run()
    const intervalId = setInterval(run, 10000)
    return intervalId
}