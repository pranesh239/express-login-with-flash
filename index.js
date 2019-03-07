const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');

// CONNECTING MONGODB
// REPLACE YOUR DB WITH process.env.DB
mongoose.connect(process.env.DB,{ useNewUrlParser:true })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

// SETS VIEW ENGINE
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// TO READ FORM DATA IN req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// NECESSARY FOR FLASH MESSAGES
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));
app.use(flash());


// SENDING FLASH MESSAGES TO VIEW
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// ROUTES
app.use('/', require('./routes/auth'));
app.use('/users', require('./routes/users'));

// PORT ADDRESS AND CONNECTION
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));

