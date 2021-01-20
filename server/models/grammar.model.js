const mongoose = require("mongoose");

const grammarSchema = new mongoose.Schema({
    cate_id: [{type: mongoose.Types.ObjectId}],
    name: String,
    content: String,
    example: String,
    
});
module.exports = mongoose.model("Grammar", grammarSchema);