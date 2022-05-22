const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    user: {type: Schema.Types.ObjectId, ref: "user"}, //user is an id + refer to user model
    createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model("post", PostSchema);