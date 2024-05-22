const {validationResult} = require('express-validator');

const User = require('../User/userModel');
const Cars = require('../Сars/carsModel');


class carsController {
    async insertCars (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                const errorMsgs = errors.array().map(error => error.msg);
                return res.status(400).json({ message: `Помилка при додаванні автомобіля: ${errorMsgs}`});
            }

            const {userId, brand, model, mileage, year} = req.body;
            const cars = new Cars({ userId, brand, model, mileage, year }); 
            await cars.save()

            res.status(201).json({ message: 'Автомобіль успішно додано', cars });
        }
        catch(e) {
            console.log(e)
            res.status(400).json({message: 'Insert cars error'})
        }
    }
    async getCars (req, res) {
        try {
            const cars = await Cars.find()
            res.json(cars)
        }
        catch(e) {
            console.log(e)
            res.status(400).json({message: 'Get cars error'})
        }
    }

    async deleteCarById(req, res) {
        try {
            const carId = req.body.carId;
            
            if (!carId) {
                return res.status(400).json({ message: 'Не надано ідентифікатор автомобіля' });
            }

            const deletedCar = await Cars.findByIdAndDelete(carId);
            
            if (!deletedCar) {
                return res.status(404).json({ message: 'Автомобіль з вказаним ідентифікатором не знайдено' });
            }

            res.json({ message: 'Автомобіль успішно видалено', deletedCar });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Помилка під час видалення автомобіля' });
        }
    }

    async updateMilageCarById(req, res) {
        try {
            const { carId, mileage } = req.body;
    
            if (!carId || !mileage) {
                return res.status(400).json({ message: 'Не надано ідентифікатор автомобіля або пробігу' });
            }
    
            const updatedCar = await Cars.findByIdAndUpdate(carId, { mileage: mileage, date_mileage: Date.now() }, { new: true });
    
            if (!updatedCar) {
                return res.status(404).json({ message: 'Автомобіль з вказаним ідентифікатором не знайдено' });
            }
    
            res.json({ message: 'Пробіг автомобіля успішно оновлено', updatedCar });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Помилка під час оновлення пробігу автомобіля' });
        }
    }    

}

module.exports = new carsController()