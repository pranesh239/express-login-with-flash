const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User',userSchema);

function joiValidation(data){
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    };

    return Joi.validate(data, schema);
}


exports.userSchema = userSchema;
exports.User = User;
exports.validation = joiValidation;