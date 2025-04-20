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

// [GET] /products
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            availabilityStatus: "In Stock"
        }
        const product = await Product.findOne(find);
        res.render("./client/pages/products/detail.pug", {
            titlePage: "Product Detail",
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
    
}