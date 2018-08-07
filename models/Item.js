const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

mongoose.model('clothes', itemSchema);
