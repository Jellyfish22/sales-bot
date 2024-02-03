import Sale from "../models/Sale.js"
import mongoose from 'mongoose';

// export const connectToDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Successfully connected to MongoDB.");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error.message);
//     }
// };

export const saveSale = async (sale) => {
    try {
        console.log("Attempt to save sale " + sale)
        const newSale = new Sale({ 
            imgUrl: sale.imgUrl,
            name: sale.name,
            price: sale.price, 
            marketplace: "Hyperspace", 
            from: sale.from, 
            to: sale.to, 
            timestamp: new Date().toISOString()
        });
         
        await newSale.save();
    } catch (err) {
        console.error('Error saving sale:', err);
    }
}

// Get's a sale that matches name, from, to. It appears people trade back an fourth and without 
// having a unique Id, and the time stamps not being a data rather than x"amoutn of minutes ago" 
// this is a mediocre way of getting a sale.
export const getSale = async (name, from, to) => {
    try {
        return await Sale.findOne({
            name: name,
            from: from,
            to: to
          });
    } catch (err) {
        console.error('Error getting sale:', err);
    }
}

export const dropCollection = async () => {
    try {
        await mongoose.connection.dropCollection("sales");
    } catch (error) {
      console.error(`Error dropping collection:`, error.message);
    }
};