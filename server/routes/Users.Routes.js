const express = require('express')
const router = express.Router();

const {
    allUsers,
    getUserProfile,
} = require('../controllers/UserCtrl')
const { isAuthenticated } = require('../middlewares/auth/Auth')

router.route('/').get(allUsers)
router.route('/me').get(isAuthenticated, getUserProfile)


module.exports = router;