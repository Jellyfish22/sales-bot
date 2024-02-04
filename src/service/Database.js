import Sale from "../models/Sale.js"
import Job from "../models/Job.js"
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

export const getJob = async (name) => {
    try {
        return await Job.findOne({
            name: name,
        });
    } catch (err) {
        console.error('Error getting job:', err);

    }
}

export const getAllJobs = async () => {
    try {
      const job = await Job.find({});
      return job
    } catch (err) {
      console.error(err);
    }
}

export const saveJob = async (job) => {
    try {
        console.log("Attempt to update Job if it exists " + job);

        const filter = { name: job.name };
        const update = {
            name: job.name,
            active: job.active
        };

        // Set `upsert` to false to avoid creating a new document if it doesn't exist
        const options = { new: true, upsert: false };

        const updatedJob = await Job.findOneAndUpdate(filter, update, options);

        if (updatedJob) {
            console.log('Job updated successfully:', updatedJob);
        } else {
            console.log('Job does not exist and was not updated.');
        }
    } catch (err) {
        console.error('Error updating job:', err);
    }
};

export const createJob = async (job) => {
    try {
        console.log("Attempt to create Job " + job);

        const newJob = new Job({ 
            name: job.name,
            projectUrl: job.projectUrl, 
            active: job.active,
            channel: job.channel,
            interval: job.interval
        });
         
        await newJob.save();
    } catch (err) {
        console.error('Error creating job:', err);
    }
};