const express = require('express');
const router = express.Router();


const product_controller = require('../controllers/product.controller'); 
const user_controller = require('../controllers/user.controller');

router.get("/api/posts/", product_controller.product_get);
 

router.post("/api/posts/updated", product_controller.create_update); 


router.post("/api/posts/:id/deleted", product_controller.delete_one); 

router.put("/api/posts/all/checked", product_controller.check_all);//checkall
 
router.put("/api/posts/all/deleted", product_controller.delete_all);//deleteall  


/////////USERS///////////


router.post("/api/users/auth/signUp", user_controller.create_user);
 

module.exports = router;