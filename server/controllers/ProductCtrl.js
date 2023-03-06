// MODELS
const Product = require('../models/Product')

exports.getAllProducts = async (req, res, next) => {
    try {
        // const productsCount = await Product.countDocuments();
        // const products = await Product.find();

        // Pour récupérez tout les valeurs des Paramètres "Query"
        const { title, priceMin, priceMax, sort, page } = req.query;

        // Va contenir un objet vide
        const filters = {};

        // Params Query "title"
        if (title) {
            // ".name" key Model Product
            // "i", indique de ne pas être sensible à la Case Maj/minuscule
            // je rajoute une clé "name" à filter qui contiendra une regex basé 
            filters.name = new RegExp(title, "i");
        }

        // Params Query "priceMin"
        if (priceMin) {
        filters.price = { $gte: Number(priceMin) };
        }

        // Params Query "priceMax"
        if (priceMax) {
            if (filters.price) {
                filters.price.$lte = Number(priceMax);
            } else {
                filters.price = { $lte: Number(priceMax) };
            }
        }

        // Params Query "price-desc" & "price-asc"
        const sortFilter = {};

        if (sort === "price-asc") {
            sortFilter.price = "asc"; // ou 1 ou "ascending"
        } else if (sort === "price-desc") {
            sortFilter.price = "desc"; // ou -1 ou "descending"
        }

        // Params Query "limit" résultats
        const limit = 5;

        let pageRequired = 1;
        if (page) pageRequired = Number(page);
        const skip = (pageRequired - 1) * limit;


        const products = await Product.find(filters)
            .sort(sortFilter)
            .skip(skip)
            .limit(limit)
            // .select("name price _id")


        res.status(201).json({
            products
        }) 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



// NOTES !!!!
// FILTERS (Paramètres "Query" = Sections Params in Postman) :
// - title (String)
// - priceMin (Number)
// - priceMax (Number)
// - sort (Valeur possible "price-desc" & "price-asc")
// - page (Number) / Si ce paramètre n'est pas transmis, il faudra forcer l'affichage de la première page


// Exemples
// Pour afficher la première page de résultats : http://localhost:3000/offers?page=1
// Pour afficher la deuxième page de résultats : http://localhost:3000/offers?page=2
// Pour chercher le titre pantalon : http://localhost:3000/offers?title=pantalon
// Pour chercher le titre pantalon et un prix max de 200 : http://localhost:3000/offers?title=pantalon&priceMax=200
// Pour chercher un prix compris entre 40 et 200 : http://localhost:3000/offers?priceMin=40&priceMax=200
// Pour trier par prix décroissant : http://localhost:3000/offers?sort=price-desc
// Pour trier par prix croissant : http://localhost:3000/offers?sort=price-asc
// Pour chercher jupe et trier par prix croissant en même temps : http://localhost:3000/offers?sort=price-asc&title=jupe


