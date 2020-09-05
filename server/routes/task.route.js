const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const auth = require('../middleware/auth.middleware')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


const task_controller = require('../controllers/task.controller');

 
router.get("/api/tasks/", auth, task_controller.get_all_tasks);

router.post("/api/tasks/", auth, task_controller.create_task);

router.put("/api/tasks/", auth, task_controller.update_task);

router.put("/api/tasks/check-all/", auth, task_controller.check_all_tasks); // check all tasks  

router.delete("/api/tasks/:id", auth, task_controller.delete_task);

router.delete("/api/tasks", auth, task_controller.delete_all_tasks); // delete all checked tasks

module.exports = router;