const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")

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

    //Pagination
    const countProducts = await Product.countDocuments(find);
    let objPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4
    }, req.query, countProducts);
    //End Pagination

    const productList = await Product.find(find).limit(objPagination.limitItems).skip(objPagination.skip);

    res.render("./admin/pages/products/index.pug", {
        titlePage: "Trang san pham",
        products: productList,
        filterStatus: filterStatus,
        keyword: keyword,
        pagination: objPagination
    });
}

// [GET] admin/products/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) => {
    const referer = req.get("referer");
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne(
        {_id: id},
        {availabilityStatus: status}
    );
    res.redirect(referer)
}
