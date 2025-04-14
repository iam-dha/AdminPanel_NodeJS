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

    //Pagination
        let objPagination = {
            currentPage: 1,
            limitItems: 4
        }

        if(req.query.page){
            let page = parseInt(req.query.page);
            if(!isNaN(page) && page >= 1 ){
                objPagination.currentPage = page;
            }
        }

        objPagination.skip = 4 * (objPagination.currentPage - 1);
        const countProducts = await Product.countDocuments(find);
        objPagination.totalPage = Math.ceil(countProducts/objPagination.limitItems);
        // console.log(objPagination.skip)
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