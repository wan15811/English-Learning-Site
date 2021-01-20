const mongoose = require("mongoose");

const grammarCateSchema = new mongoose.Schema({
    title: String
});
module.exports = mongoose.model("GrammarCate", grammarCateSchema);