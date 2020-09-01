const express = require('express');
const router = express.Router(); 



const user_controller = require('../controllers/user.controller');


/////////USERS///////////

router.post("/api/register", user_controller.user_register);

router.post("/api/login", user_controller.user_login); 



module.exports = router;