const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Courses = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
    level: { type: String }
}, {
    _id: false,
    timestamps: true
});

mongoose.plugin(slug);
Courses.plugin(AutoIncrement);
Courses.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Course', Courses)