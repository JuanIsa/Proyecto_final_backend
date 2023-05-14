import mongoose from "mongoose";

const collection = 'Products';

const schema = new mongoose.Schema({
    product: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: false
    },
    category: {
        type: String,
        require: false
    },
    code: {
        type: Number,
        require: true,
        unique: true,
    },
    urlImgProduct: {
        type: String,
        require: false
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    }
}, { versionKey: false });

const productsModel = mongoose.model(collection, schema);

export default productsModel;