const express = require('express');
const route = express.Router();

route.get("/", async (req, res) => {
    res.render("./client/pages/home/index.pug");
})

module.exports = route;

