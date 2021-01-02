const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
    vocabWord: String,
    vocabDescription: String,
    vocabImg: String
});
module.exports = mongoose.model("Vocabulary", vocabularySchema);