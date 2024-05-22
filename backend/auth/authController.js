require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {jwtDecode} = require('jwt-decode');

const User = require('../User/userModel');
const Role = require('../Role/roleModel');
const Interval = require('../Interval/intervalModel');

const generateAccessToken = (id, email, username, roles) => {
    const secret = process.env.JWT_ACCESS_SECRET
    const payload = {
        id,
        email,
        username,
        roles,       
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                const errorMsgs = errors.array().map(error => error.msg);
                return res.status(400).json({ message: `Помилка при реєстрації: ${errorMsgs}`});
            }

            const {username, email, password} = req.body

            const candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({message:"Користувач з такою поштою уже існує"})
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const interval = new Interval();
            await interval.save();
            const user = new User({username, email, password: hashPassword, roles:[userRole.value], interval: interval._id })
            await user.save();
            return res.json({message: "Користувач успішно зареєстрований"})
        }
        catch(e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: `Пошта ${email} не знайдена`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: `Введений неправильний пароль`})
            }
            const token = generateAccessToken(user._id, user.email, user.username, user.roles);
            const decodeToken = jwtDecode(token) 
            return res.json({ id: decodeToken.id, email: decodeToken.email, username: decodeToken.username, roles: decodeToken.roles })
        }
        catch(e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}


module.exports = new authController()