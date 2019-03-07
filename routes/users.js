const express = require('express');
const router = express.Router();
const {User, validation} = require('../models/User');

router.get('/', async (req, res) => {

    let users = await User.find();

    res.render('index',{
        title: 'Users',
        users
    });
});

module.exports = router;