const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
    vocabWord: String,
    vocabDescription: String,
    vocabImg: String,
    cate_id: [{type: mongoose.Types.ObjectId}]
});
module.exports = mongoose.model("Vocabulary", vocabularySchema);