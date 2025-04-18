module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Fill the item's title.");
        redirectBack(req, res);
        return;
    }
    next();
};
