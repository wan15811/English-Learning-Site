const mongoose = require('mongoose');

var Lesson = mongoose.model('Lesson', {
    lessonName: { type: String },
    title: { type: String },
    imgURL: { type: String },
    description: { type: String }
});

module.exports = { Lesson };