const express = require("express");
const multer = require('multer');
const storageMulter = require("../../helpers/storageMulter");
const productValidate = require("../../validates/admin/product.validate");
const upload = multer({storage: storageMulter()});

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/changeStatus/:status/:id", controller.changeStatus);

router.patch("/changeMulti", controller.changeMultiStatus);

router.delete("/delete/:id", controller.deleteItem);

router.get("/edit/:id", controller.edit)

router.patch(
    "/edit/:id", 
    upload.single("thumbnail"), 
    productValidate.createPost,
    controller.editPatch);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single("thumbnail"), 
    productValidate.createPost,
    controller.createPost
);

router.get("/detail/:id", controller.detail)


module.exports = router;
