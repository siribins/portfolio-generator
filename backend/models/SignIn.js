const mongoose = require("mongoose");

     const SignInSchema = new mongoose.Schema({
        Email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
        Password: { type: String, required: true, minlength: 6 },
    });

module.exports = mongoose.model("SignIn", SignInSchema);