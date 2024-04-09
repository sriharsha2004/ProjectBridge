const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signUpSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true });

const SignUpSchema = mongoose.model("user", signUpSchema);

module.exports = SignUpSchema;
