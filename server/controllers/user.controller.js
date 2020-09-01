const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.user_register = async (req, res) => {

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
        res.status(400).json({ message: 'такой пользователь существует' });
    }
    
    const user = new User({ email, password: password });

    User.create(req.body);
    await user.save();
    res.status(201).json({ message: "пользователь создан" });

};


exports.user_login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return (res.status(400).json({ message: "polzovatel ne naiden" }));

    }
    if (password !== user.password) {
        return res.status(400).json({ message: "chto0to pshlo ne tak, poprobyi esho" });
    } 

    res.json({ auth:true }); 
    const token = jwt.sign(
        { userId: user.id },
        { expiresIn: '1h' }

    );
    res.json({ token, userId: user.id }); 
    

};

