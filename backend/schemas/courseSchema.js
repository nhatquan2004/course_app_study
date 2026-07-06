const mongoose = require('mongoose')
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    coverImage: String,
    categoryId: Number,
});

const Course = mongoose.model('Course', courseSchema)

module.exports = Course;