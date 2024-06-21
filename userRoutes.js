const express = require('express')
const { getAllUsers, registerController, loginController } = require('../controllers/userController')

//Router object

const router = express.Router()

// GET ALL USERS  || GET (method)
router.get('/all-users', getAllUsers);

// CREATE USER || POST
router.post('/register',registerController);

// LOGIN || POST
router.post('/login',loginController);

module.exports = router;