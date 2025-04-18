const Product = require("../../models/product.model");
// [GET] /products
module.exports.index = async (req, res) => {
    const productList = await Product.find({
        availabilityStatus: "In Stock",
        deleted: false
    }).sort({position: "desc"});

    const newProductList = productList.map((item) => {
        item['newPrice'] = (item.price * (100 - item.discountPercentage)/100).toFixed(2);
        item['discountPercentage'] = item['discountPercentage']; 
        return item;
    })
    
    res.render("./client/pages/products/index.pug", {
        titlePage: "Trang danh sach san pham",
        products: productList
    });
}