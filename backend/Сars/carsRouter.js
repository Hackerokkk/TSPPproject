const Router = require('express')
const router = new Router()
const {check} = require("express-validator")

const controller = require('./carsController')
const roleMiddlewaree = require('../middlewaree/roleMiddlewaree')

router.post('/cars',[
    check('brand', " Поле 'Марка' неможе бути пустим").notEmpty(),
    check('brand', " Поле 'Марка' має містити принаймні 3 символи").isLength({ min: 3 }),
    check('model', " Поле 'Модель' неможе бути пустим").notEmpty(),
    check('mileage', " Поле 'Пробіг' неможе бути пустим").notEmpty(),
    check('mileage', " Поле 'Пробіг' має бути числовим значенням").isNumeric(),
    check('year', " Поле 'Рік випуску' неможе бути пустим").notEmpty(),
    check('year', " Поле 'Рік випуску' має бути числом").isNumeric(),
    check('year', " Поле 'Рік випуску' має бути більше 1990 і менше поточного року").custom(value => {
        const currentYear = new Date().getFullYear();
        return value > 1990 && value <= currentYear;
    })
], controller.insertCars)
router.get('/cars', roleMiddlewaree(['ADMIN']), controller.getCars)
router.delete('/cars', controller.deleteCarById)
router.put('/cars', controller.updateMilageCarById)

module.exports = router
