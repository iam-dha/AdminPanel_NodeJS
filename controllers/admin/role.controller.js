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

// [POST] /admin/roles/create
module.exports.createPost =  async (req, res) => {
    console.log(req.body);
    
    const newRole = new Role(req.body);
    await newRole.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    let find = {
        _id: id,
        deleted: false
    };
    try {
        const role = await Role.findOne(find);
        res.render("./admin/pages/roles/edit.pug",{
            role: role
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    try {
        await Role.updateOne({_id: id}, req.body);
        req.flash("success", "Update Successfully");
    } catch (error) {
        req.flash("error", "Update Fail");
    }
    
    redirectBack(req, res);
}

// [GET] /admin/roles/create
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }

    const roles = await Role.find(find);
    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: "Access Control",
        roles: roles
    });
}

// [PATCH] /admin/roles/create
module.exports.permissionsPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions);

    for (const record of permissions) {
        const id = record.id;

        await Role.updateOne({_id: id}, {permissions: record.permissions});
    }
    req.flash("success", "Update Successfully")
    redirectBack(req, res);
}
