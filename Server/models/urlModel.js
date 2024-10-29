const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortenUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now }
});
const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
