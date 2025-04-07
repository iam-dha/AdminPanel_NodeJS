const mongoose= require("mongoose");


const product_schema = new mongoose.Schema(
    {
        "title": String,
        "description": String,
        "category": String,
        "price": Number,
        "thumbnail": String,
        "discountPercentage": Number,
        "stock": Number,
        "availabilityStatus": String,
        "thumbnail": String,
        "deleted": Boolean
    }
)

const Product = mongoose.model('products', product_schema, "products");

module.exports = Product;