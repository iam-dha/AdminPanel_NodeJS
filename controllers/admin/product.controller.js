const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const redirectBack = require("../../helpers/redirectBack");
const createTreeHelper = require("../../helpers/createTree");

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

    //Sort
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else {
        sort.position = "desc";
    }
    //End Sort

    const productList = await Product.find(find)
        .sort(sort)
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
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { availabilityStatus: status });

    req.flash("success", "Change Status Successfully!");

    redirectBack(req, res);
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
    redirectBack(req, res);
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
    redirectBack(req, res);
};

// [GET] admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const categories = await ProductCategory.find(find);
    const newCategories = createTreeHelper.create(categories);
    res.render("admin/pages/products/create", {
        pageTitle: "Add new product",
        categories: newCategories
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

// [GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    }

    const product = await Product.findOne(find);
    const categories = await ProductCategory.find({
        deleted: false
    });
    const newCategories = createTreeHelper.create(categories);
    res.render("admin/pages/products/edit", {
        pageTitle: "Edit product",
        product: product, 
        categories: newCategories
    });
}

// [PATCH] admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({ _id: id }, req.body);
        req.flash("success", "Updated Successfully");
    } catch (error) {
        req.flash("error", "Something went wrong!");
    }
    redirectBack(req, res);
}

// [GET] admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
    
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

