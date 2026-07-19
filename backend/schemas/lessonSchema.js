const mongoose = require('mongoose');
const { Schema } = mongoose;

const lessonSchema = new Schema({
	lessonName: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		default: 0,
	},
	isPreviewable: {
		type: Boolean,
		default: false,
	},
	chapterId: {
		type: String,
		required: true,
	},
	courseId: {
		type: String,
		required: true,
	},
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
