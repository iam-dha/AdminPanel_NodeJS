module.exports.index = async (req, res) => {
    res.render("./client/pages/products/index.pug", {
        titlePage: "Trang danh sach san pham"
    });
}