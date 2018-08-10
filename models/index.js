const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1/warbler", {
    keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");