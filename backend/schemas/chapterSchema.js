const mongoose = require('mongoose');
const { Schema } = mongoose;

const chapterSchema = new Schema({
	name: String,
	totalDuration: Number,
	totalLessons: Number,
	courseId: String,
});

const chapter = mongoose.model('Chapter', chapterSchema);

module.exports = chapter;
