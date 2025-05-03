const mongoose = require("mongoose");
const generateBot = require("../helpers/generate");

const account_schema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generateBot.generateRandomString(20),
        },
        phone: String,
        avatar: String,
        role: String,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    {
        strict: false,
        timestamps: true
    }
);

const Account = mongoose.model("Account", account_schema, "accounts");

module.exports = Account;


