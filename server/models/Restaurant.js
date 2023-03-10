const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Entrez le nom du restaurant'],
        trim: true,
        maxLength: [100, 'Le nom du restaurant ne peut pas dépasser 100 caractères']
    },
    description: {
        type: String,
    },
    photos: [
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true
            },
        }
    ],
    address: {
        type: String,
        required: [true, 'Entrez la description du nom du restaurant'],
    },
    phoneNumberRestaurant: {
        type: String,
        required: [true, 'Entrez la description du nom du restaurant'],
    },
    emailRestaurant: {
        type: String,
        required: [true, 'Entrez la description du nom du restaurant'],
    },
    location: {
        type: [Number],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Restaurant', restaurantSchema);