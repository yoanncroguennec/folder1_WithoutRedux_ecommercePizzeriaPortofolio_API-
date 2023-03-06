const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Entrez le nom du produit'],
        trim: true,
        maxLength: [100, 'Le nom du produit ne peut pas dépasser 100 caractères']
    },
    price: {
        type: Number,
        required: [true, 'Entrez le prix du produit'],
        maxLength: [5, 'Le prix du produit ne peut pas dépasser 5 caractères".'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Entrez la description du nom du produit'],
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
    category: {
        type: String,
        required: [true, 'Veuillez sélectionner la catégorie pour ce produit'],
        enum: {
            values: [
                'Entrées',
                'Pizzas',
                'Pâtes',
                'Desserts',
                'Boissons',
            ],
            message: 'Veuillez sélectionner la bonne catégorie pour le produit'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Veuillez entrer le stock du produit'],
        maxLength: [5, 'La quantité de stock du produit ne peut pas dépasser 5 caractères'],
        default: 0
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);