import mongoose from "mongoose";

const { Schema, model } = mongoose;

const jobSchema = new Schema({
    name: { 
        type: String,
        require: true
    },
    projectUrl: {
        type: String,
        require: true
    },
    active: {
        type: Boolean, 
        require: true
    },
    channel: {
        type: String,
        require: true 
    },
    interval: {
        type: Number,
        require: true 
    }
});

export default model('Job', jobSchema);
