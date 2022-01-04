const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const DonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    pledge: {
        type: Number,
        required: false,
        default: 0
    },
    phone: {
        type: String,
        required: false,
        default: ''
    }
});
DonorSchema.plugin(timestamp)

const Donor = mongoose.model('Donor', DonorSchema);
module.exports = Donor;