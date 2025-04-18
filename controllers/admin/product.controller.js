const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    let filterStatus = filterStatusHelper(req.query);
    let objectSearch = searchHelper(req.query);
    let keyword = objectSearch.keyword;
    //Add key to find Object
    if (req.query.availabilityStatus) {
        find.availabilityStatus = req.query.availabilityStatus;
    }
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //Pagination
    const countProducts = await Product.countDocuments(find);
    let objPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4,
        },
        req.query,
        countProducts
    );
    //End Pagination

    const productList = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objPagination.limitItems)
        .skip(objPagination.skip);

    res.render("./admin/pages/products/index.pug", {
        titlePage: "Trang san pham",
        products: productList,
        filterStatus: filterStatus,
        keyword: keyword,
        pagination: objPagination,
    });
};

// [PATCH] admin/products/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) => {
    const referer = req.get("referer");
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { availabilityStatus: status });

    req.flash("success", "Change Status Successfully!");

    res.redirect(referer);
};

// [PATCH] admin/products/changeMulti/:status/:id
module.exports.changeMultiStatus = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "In Stock":
            await Product.updateMany(
                { _id: { $in: ids } },
                { availabilityStatus: "In Stock" }
            );
            req.flash(
                "success",
                `Change ${ids.length} products status Successfully!`
            );
            break;
        case "Out Stock":
            await Product.updateMany(
                { _id: { $in: ids } },
                { availabilityStatus: "Out Stock" }
            );
            req.flash(
                "success",
                `Change ${ids.length} products status Successfully!`
            );
            break;
        case "Delete":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    deleted: true,
                    deletedAt: new Date(),
                }
            );
            req.flash("success", `Delete ${ids.length} products Successfully!`);
        case "Change-Position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne(
                    {
                        _id: id,
                    },
                    {
                        position: position,
                    }
                );
            }
            req.flash(
                "success",
                `Change ${ids.length} products position Successfully!`
            );
        default:
            break;
    }
    const referer = req.get("referer");
    res.redirect(referer);
};

// [DELETE] admin/products/delete/:id

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
        { _id: id },
        {
            deleted: true,
            deletedAt: new Date(),
        }
    );
    const referer = req.get("referer");
    res.redirect(referer);
};

// [GET] admin/products/create

module.exports.create = (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Add new product"
    });
}

// [POST] admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == ""){
        const countProducts = await Product.countDocuments({deleted: false});
        req.body.position = countProducts + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}


