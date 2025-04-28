const redirectBack = require("../../helpers/redirectBack");
const systemConfig = require("../../config/system")
const Role = require("../../models/role.model")

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const roles = await Role.find(find);

    res.render("./admin/pages/roles/index.pug", {
        titlePage: "Decentralization",
        roles: roles
    });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("./admin/pages/roles/create.pug", {
        titlePage: "Add Role",
    });
}
module.exports.createPost =  async (req, res) => {
    console.log(req.body);
    
    const newRole = new Role(req.body);
    await newRole.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}
