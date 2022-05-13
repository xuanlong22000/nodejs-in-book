const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    zipCode: { type: Number, min: [10000, "Zip code too short"], max: 99999 },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
})

module.exports = mongoose.model("Subscriber", subscriberSchema);