const express = require("express");
const multer = require('multer');
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({storage: storageMulter()});

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/changeStatus/:status/:id", controller.changeStatus);

router.patch("/changeMulti", controller.changeMultiStatus);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = router;
