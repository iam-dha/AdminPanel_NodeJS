const express = require("express");
const multer = require('multer');
const router = express.Router();
const productCategoryController = require("../../controllers/admin/productCategory.controller");
const productValidate = require("../../validates/admin/product-category.validate");
const fileUpload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", productCategoryController.index)

router.get("/create", productCategoryController.create);

router.post(
    "/create", 
    fileUpload.single("thumbnail"),
    uploadCloud.upload,
    // productValidate.createPost,
    productCategoryController.createPost
);

router.get(
    "/edit/:id",
    productCategoryController.edit
)

router.patch(
    "/edit/:id",
    fileUpload.single("thumbnail"),
    uploadCloud.upload,
    productCategoryController.editPatch
)


module.exports = router;

