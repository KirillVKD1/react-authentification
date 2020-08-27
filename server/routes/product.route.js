const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');
// Get all of our posts 
router.get("/api/posts/", product_controller.product_get);
 
// Create and Update post
router.post("/api/posts/updated", product_controller.create_update); 

// Delete selected post
router.post("/api/posts/:id/deleted", product_controller.delete_one); 

router.put("/api/posts/all/checked", product_controller.check_all);//checkall
 
router.put("/api/posts/all/deleted", product_controller.delete_all);//deleteall 

module.exports = router;