module.exports = (req, res) => {
    const referer = req.get("referer");
    res.redirect(referer);
}