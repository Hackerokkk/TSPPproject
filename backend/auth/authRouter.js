const Router = require('express')
const router = new Router()
const {check} = require("express-validator")

const controller = require('./authController')

router.post('/registration', [
    check('username', "Імя користувача неможе бути пустим").notEmpty(),
    check('username', "Ім'я користувача має містити принаймні 3 символи").isLength({min:3, max:15}),
    check('password', "Пароль повинен бути більше 5 и меньше 15 символів").isLength({min:5, max:15}),
    check('email', "Введіть коректну адресу електронної пошти").isEmail()
], controller.registration)
router.post('/login', controller.login)

module.exports = router