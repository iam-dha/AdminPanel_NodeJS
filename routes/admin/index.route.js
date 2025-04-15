const dashboardRoutes = require("./dashboard.route.js");
const productRoutes = require("./product.route.js");

module.exports = (app) => {
    const PATH_ADMIN = app.locals.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN + '/products', productRoutes)
}