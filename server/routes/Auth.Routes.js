const express = require('express')
const router = express.Router();

const {
    login,
    register,
} = require('../controllers/AuthCtrl')

router.route('/login').post(login)
router.route('/register').post(register)
router.delete("/fkjezejf", () => {});

module.exports = router;