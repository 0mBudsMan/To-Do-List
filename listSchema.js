const mongoose = require('mongoose');
const user = require("./User");

const listSchema = new mongoose.Schema({
    name: String,
    items: [new mongoose.Schema({
        name: String
    })]
});

module.exports = mongoose.model("listSchema", listSchema);