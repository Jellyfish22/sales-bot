import mongoose from "mongoose";

const { Schema, model } = mongoose;

const saleSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    price: {
        type: String, 
        required: true
    },
    marketplace: {
        type: String, 
        required: true
    },
    from: {
        type: String, 
        required: true
    },
    to: {
        type: String, 
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

export default model('Sale', saleSchema);
