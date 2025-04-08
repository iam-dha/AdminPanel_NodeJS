module.exports.dashboard = (req, res) => {
    res.render("./admin/pages/dashboard/index.pug", {
        titlePage: "Trang Chu"
    });
}