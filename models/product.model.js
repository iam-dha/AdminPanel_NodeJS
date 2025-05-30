const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const product_schema = new mongoose.Schema(
    {
        title: String,
        product_category_id: {
            type: String,
            default: "",
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        availabilityStatus: String,
        thumbnail: String,
        deleted: {
            type: Boolean,
            default: false,
        },
        position: Number,
        slug: {
            type: String,
            slug: "title",
            unique: true
        }
    },
    { 
        strict: false,
        timestamps: true
     }
);

const Product = mongoose.model("Product", product_schema, "products");

module.exports = Product;
