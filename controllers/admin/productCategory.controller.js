const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");
const redirectBack = require("../../helpers/redirectBack");

// [GET] admin/product-category/
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };  

    const categories = await ProductCategory.find(find);
    res.render("./admin/pages/product-category/index.pug", {
        titlePage: "Product Categories",
        categories: categories
    });
}

// [GET] admin/product-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    function createTree(arr, parentId = ""){
        let tree = [];

        arr.forEach(item => {
            if(item.parent_id === parentId){
                const newItem = item;
                const children = createTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });

        return tree;
    }

    let categories = await ProductCategory.find(find);
    console.log(categories);
    // let temp = createTree(categories);
    // console.log(temp);

    res.render("./admin/pages/product-category/create.pug", {
        titlePage: "Product Categories",
        categories: categories
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