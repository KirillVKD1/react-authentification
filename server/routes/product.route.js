const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const auth = require('../middleware/auth.middleware')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


const product_controller = require('../controllers/product.controller');



router.get("/api/posts/", auth, product_controller.product_get);


router.post("/api/posts/updated", auth, product_controller.create_update);


router.post("/api/posts/:id/deleted", auth, product_controller.delete_one);

router.put("/api/posts/all/checked", auth, product_controller.check_all);//checkall

router.put("/api/posts/all/deleted", auth, product_controller.delete_all);//deleteall  


/////////USERS///////////

router.post(
    "/api/register",
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'min password length 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "incorrect registration data"
                });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'This user already exist' });

            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: 'User created!!!' });

        } catch (e) {
            res.status(500).json({ message: 'something goes wrong' });
        }
    });

router.post("/api/login",
    [
        check('email', 'enter correct email').isEmail(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "incorrect login data"
                });
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email, });

            if (!user) {
                return res.status(400).json({ message: 'User not found!!!' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'incorrect email' });
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );
            res.json({ token, userId: user.id });


        } catch (e) {
            res.status(500).json({ message: 'something goes wrong' });
        }
    });





module.exports = router;