const express = require('express')
const router = express.Router();

const {
    getAllProducts,
} = require('../controllers/ProductCtrl')

router.route('/')
    // .post(isAuthenticatedUser, newProduct)
    .get(getAllProducts);


module.exports = router;