const Product = require("../../models/product.model");


// [GET] /admin/products
module.exports.index = async (req, res) => {
    let filterStatus= [
        {
            name: "All",
            status: "", 
            class: ""
        },
        {
            name: "In Stock",
            status: "In Stock", 
            class: ""
        },
        {
            name: "Low Stock",
            status: "Low Stock", 
            class: ""
        }
    ]
    let keyword = "";

    let find = {
        deleted: false
    }
    if(req.query.availabilityStatus){
        const availabilityStatus = req.query.availabilityStatus;
        const index = filterStatus.findIndex(item => item.status == req.query.availabilityStatus);
        filterStatus[index].class = "active";
        find.availabilityStatus = availabilityStatus;
    }
    else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    if(req.query.keyword){
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }


    const productList = await Product.find(find);
    res.render("./admin/pages/products/index.pug", {
        titlePage: "Trang san pham",
        products: productList,
        filterStatus: filterStatus,
        keyword: keyword
    });
}