const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    coverImage: String,
    categoryIds: [String],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;