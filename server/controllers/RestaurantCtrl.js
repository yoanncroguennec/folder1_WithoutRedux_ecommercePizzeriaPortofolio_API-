// MODEL
const Restaurant = require('../models/Restaurant')

exports.getAllRestaurants = async (req, res, next) => {
    const restaurantsCount = await Restaurant.countDocuments();
    const restaurants = await Restaurant.find();

    res.status(201).json({
        success: true,
        restaurantsCount,
        restaurants
    })
}
