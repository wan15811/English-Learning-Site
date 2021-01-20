const mongoose = require("mongoose");

const vocabcateSchema = new mongoose.Schema({
    vocabCate: String
});
module.exports = mongoose.model("VocabCate", vocabcateSchema);
