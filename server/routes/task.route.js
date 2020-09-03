const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const auth = require('../middleware/auth.middleware')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


const task_controller = require('../controllers/task.controller');


router.get("/api/posts/", auth, task_controller.tasks_get);

router.post("/api/posts/updated", auth, task_controller.create_update);

router.post("/api/posts/:id/deleted", auth, task_controller.delete_one);

router.put("/api/posts/all/checked", auth, task_controller.check_all);//checkall

router.put("/api/posts/all/deleted", auth, task_controller.delete_all);//deleteall  

module.exports = router;