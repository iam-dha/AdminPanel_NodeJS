const express = require("express");
const multer = require('multer');
const productValidate = require("../../validates/admin/product.validate");
// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({storage: storageMulter()});
const fileUpload = multer();
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/changeStatus/:status/:id", controller.changeStatus);

router.patch("/changeMulti", controller.changeMultiStatus);

router.delete("/delete/:id", controller.deleteItem);

router.get("/edit/:id", controller.edit)

router.patch(
    "/edit/:id", 
    fileUpload.single("thumbnail"),
    uploadCloud.upload,
    productValidate.createPost,
    controller.editPatch);

router.get("/create", controller.create);

router.post(
    "/create", 
    fileUpload.single("thumbnail"), 
    uploadCloud.upload,
    productValidate.createPost,
    controller.createPost
);

router.get("/detail/:id", controller.detail)


module.exports = router;
