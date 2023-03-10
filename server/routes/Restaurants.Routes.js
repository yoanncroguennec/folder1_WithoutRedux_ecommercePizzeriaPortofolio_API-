const express = require('express')
const router = express.Router();

const {
    getAllRestaurants,
} = require('../controllers/RestaurantCtrl')

router.route('/')
    // .post(isAuthenticatedUser, newProduct)
    .get(getAllRestaurants);


module.exports = router;