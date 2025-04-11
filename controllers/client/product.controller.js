const Product = require("../../models/product.model");
// [GET] /products
module.exports.index = async (req, res) => {
    const productList = await Product.find({
        availabilityStatus: "In Stock",
        deleted: false
    });

    const newProductList = productList.map((item) => {
        item['newPrice'] = (item.price * (1 - item.discountPercentage)).toFixed(2);
        item['discountPercentage'] *= 100; 
        return item;
    })

    console.log(productList)
    res.render("./client/pages/products/index.pug", {
        titlePage: "Trang danh sach san pham",
        products: productList
    });
}