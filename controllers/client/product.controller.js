const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const productList = await Product.find({
        availabilityStatus: "In Stock",
        deleted: false
    });

    const newProductList = productList.map((item) => {
        item['newPrice'] = (item.price * (1 - item.discountPercentage)).toFixed(2);
        return 
    })

    console.log(productList)
    res.render("./client/pages/products/index.pug", {
        titlePage: "Trang danh sach san pham",
        products: productList
    });
}