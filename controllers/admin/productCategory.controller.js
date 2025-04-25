const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");
const redirectBack = require("../../helpers/redirectBack");
const createTreeHelper = require("../../helpers/createTree");

// [GET] admin/product-category/
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };  
    const categories = await ProductCategory.find(find);
    let newCategories = createTreeHelper.create(categories);
    
    res.render("./admin/pages/product-category/index.pug", {
        titlePage: "Product Categories",
        categories: newCategories
    });
}


// [GET] admin/product-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }
    const categories = await ProductCategory.find(find);
    let newCategories = createTreeHelper.create(categories);

    res.render("./admin/pages/product-category/create.pug", {
        titlePage: "Product Categories",
        categories: newCategories
    });
}

// [POST] admin/product-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position == ""){
        const countCategory = await ProductCategory.countDocuments({deleted: false});
        req.body.position = countCategory + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category`)
    
}
// [GET] admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await ProductCategory.findOne(
            {
                _id: id,
                deleted: false
            }
        );
        let find = {
            deleted: false,
        }
        const categories = await ProductCategory.find(find);
        let newCategories = createTreeHelper.create(categories);
        console.log(record);
        res.render("admin/pages/product-category/edit.pug",
            {
                pageTitle: "Edit product category",
                record: record,
                categories: newCategories
            }
        )
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category/`)
    }
    
}

// [PATCH] admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    req.body.position = parseInt(req.body.position);
    const record = await ProductCategory.updateOne(
        {_id: id},
        req.body
    );
    redirectBack(req, res);
}





