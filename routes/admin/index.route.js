const dashboardRoutes = require("./dashboard.route.js");
const productRoutes = require("./product.route.js");
const productCategoryRoutes = require("./productCategory.route.js");
module.exports = (app) => {
    const PATH_ADMIN = app.locals.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);

    app.use(PATH_ADMIN + '/products', productRoutes);
    
    app.use(PATH_ADMIN + '/product-category', productCategoryRoutes);
}