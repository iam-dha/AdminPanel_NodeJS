const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    let filterStatus = filterStatusHelper(req.query);
    let objectSearch = searchHelper(req.query);
    let keyword = objectSearch.keyword;
    //Add key to find Object
    if(req.query.availabilityStatus){
        find.availabilityStatus = req.query.availabilityStatus;
    }
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    console.log(objectSearch);
    const productList = await Product.find(find);
    res.render("./admin/pages/products/index.pug", {
        titlePage: "Trang san pham",
        products: productList,
        filterStatus: filterStatus,
        keyword: keyword
    });
}