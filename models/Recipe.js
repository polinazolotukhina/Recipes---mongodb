const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: String,
    ingredients: [String],
    prepTime: String,
    body: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _userName: { type: Schema.Types.ObjectId, ref: 'User' },
    dateAdded: Date,
    method: String,
    author: String,
    difficulty: String,
    img: String
});

mongoose.model('recipes', recipeSchema);
