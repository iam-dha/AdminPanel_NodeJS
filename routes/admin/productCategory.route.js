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
    productCategoryController.createPost);

module.exports = router;

