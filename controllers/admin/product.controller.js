const Product = require("../../models/product.model");


// [GET] /admin/products
module.exports.index = async (req, res) => {

    const productList = await Product.find({
        deleted: false
    });
    
    console.log(productList)

    res.render("./admin/pages/products/index.pug", {
        titlePage: "Trang san pham",
        products: productList
    });
}