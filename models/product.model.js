const mongoose= require("mongoose");


const product_schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        availabilityStatus: String,
        thumbnail: String,
        deleted: Boolean,
        position: Number
    }, {strict: false}
)

const Product = mongoose.model('Product', product_schema, "products");

module.exports = Product;