
import mongoose, { Query } from 'mongoose';
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import Sale from "../src/models/Sale.js";
import puppeteer from 'puppeteer';
import { registerCommands } from './service/Commands.js';


const channelId = "1201992904814366730";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

// async function scrapeAndNotify() {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto('https://www.avalytics.xyz/collection/0x54c800d2331e10467143911aabca092d68bf4166/trades/');
//     await page.waitForFunction(() => document.querySelectorAll('tr').length > 1);
//     await page.waitForTimeout(1000); // Adjust based on the dynamics of the page

//     const currentData = await page.evaluate(() => {
//         const rows = Array.from(document.querySelectorAll('tr'));
//         return rows.map(row => {
//             const imgElement = row.querySelector('td:first-child img');
//             const imgUrl = imgElement ? imgElement.src : '';
//             const otherData = Array.from(row.querySelectorAll('td')).slice(1).map(td => td.innerText.trim().replace('\nTake Ask', ''));
//             return [imgUrl, ...otherData];
//         });
//     });


//     for (const [imgUrl, name, price, marketplace, from, to, timestamp] of currentData) {

//         try{

// // when i sale one the to will become the from. 

//     console.log("Searching db for " + name);
//         const exists = await Sale.findOne({ name: name });
//         console.log(exists)
//         if (!exists) {
//             console.log(`New sale detected: ${name} for ${price}`);
//             const newSale = new Sale({ 
//                 imgUrl: imgUrl,
//                 name: name,
//                 price: price, 
//                 marketplace: marketplace, 
//                 from:from, 
//                 to: to, 
//                 timestamp: new Date().toISOString()
//             });
       
//             const savedSale = await newSale.save();
//             sendSaleEmbed(client, channelId, savedSale); // Adjust this to match your actual function
//         }
//     } catch (err) {
//         console.error('Error processing item:', err);
//     }
      
//     }

//     await browser.close();
// }

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // Connect to MongoDB
    // mongoose.connect(process.env.MONGODB_URI).then(() => {
    //     console.log("Connected to MongoDB");
    //    // dropCollection()
    //     setInterval(scrapeAndNotify, 10000); 
    // });
});

// async function sendSaleEmbed(client, channelId, sale) {
//     try {
//         const timestampInSeconds = Math.floor(new Date(sale.timestamp).getTime() / 1000);
//         const formattedTimestamp = `<t:${timestampInSeconds}:F>`;

//         const embed = new EmbedBuilder()
//             .setTitle(sale.name)
//             .setDescription(`Congrats ${sale.to} on the purchase`)
//             .setColor("#B14141")
//             .addFields(
//                 { name: "Timestamp", value: `${formattedTimestamp}` },
//                 { name: "Price", value: `${sale.price}`, inline: true },
//                 { name: "Seller", value: `${sale.from}`, inline: true },
//                 { name: "Marketplace", value: "Hyperspace", inline: true }
//             )
//             .setImage(`${sale.imgUrl}`);

//         const targetChannel = await client.channels.fetch(channelId);
//         if (targetChannel) {
//             await targetChannel.send({ embeds: [embed] });
//             console.log("Message sent successfully to the channel.");
//         } else {
//             console.error("Channel not found.");
//         }
//     } catch (error) {
//         console.error("Error sending message:", error);
//     }
// }

client.login(process.env.TOKEN);


async function dropCollection() {
    try {
      await mongoose.connection.dropCollection("sales");
    
    } catch (error) {
      console.error(`Error dropping collection:`, error.message);
    }
  };