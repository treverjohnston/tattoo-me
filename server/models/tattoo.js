var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
    // name: { type: String, required: true },
    // description: { type: String },
    created: { type: Number, default: Date.now() },
    artistName: { type: String, required: true },
    url: { type: String, required: true },
    hdUrl: { type: String, required: true, select: false },
    tags: [{ type: ObjectId, ref: models.tag }],
    price: { type: Number, required: true },
    likes: { type: [ObjectId], ref: models.user.name, default: [] },// select: false },
    numLikes: { type: Number, default: 0 },
    // Relations
    creatorId: { type: ObjectId, ref: models.user.name, required: true, select: false },
});

module.exports = mongoose.model(models.tattoo.name, schema);