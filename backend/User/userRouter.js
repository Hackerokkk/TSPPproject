const Router = require('express')
const router = new Router()
const {check} = require("express-validator")

const controller = require('./userController')
const roleMiddlewaree = require('../middlewaree/roleMiddlewaree')

router.put('/user', [
    check('userId', " Поле userId неможе бути пустим").notEmpty(),
    check('carId', " Поле carId неможе бути пустим").notEmpty(),
], controller.updateUserCars)
router.get('/user', roleMiddlewaree(['ADMIN']), controller.getUsers)
router.get('/userCars', controller.getUserIdCars)
router.delete('/userCars', controller.delUserIdCars)

module.exports = router