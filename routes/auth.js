const express = require('express');
const router = express.Router();
const { User, validation } = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {

    res.render('register');
})

router.post('/login', async (req, res) => {

    // TODO: USE bcrypt TO HASH THE PASSWORD
    let user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (!user) {
        req.flash('error_msg', 'Wrong Email or Password');
        res.redirect('/login');
    }

    req.flash('success_msg', `Welcome ${user.name}`);
    res.redirect('/users');
})

router.post('/register', async (req, res) => {
    const { error } = validation(req.body);
    if (error) {
        req.flash('error_msg',error.details[0].message);
        res.redirect('/register');
    }

    let user = await User.findOne({
        email: req.body.email
    });
    if(user){
        req.flash('error_msg', 'User already exists');
        res.redirect('/register');
        return;
    }
// TODO: USE bcrypt TO HASH THE PASSWORD
    user = new User(req.body);

    await user.save();
    req.flash('success_msg',`Congrats ${user.name}! your account has been created`);
    res.redirect('/users');
})

module.exports = router;
