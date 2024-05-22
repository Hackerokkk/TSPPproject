const {validationResult} = require('express-validator');

const User = require('../User/userModel');
const Cars = require('../Сars/carsModel');
const Reminder = require('../reminder/reminderModel');


class userController {
    async updateUserCars (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                const errorMsgs = errors.array().map(error => error.msg);
                return res.status(400).json({ message: `Помилка при додаванні автомобіля: ${errorMsgs}`});
            }

            const { userId, carId } = req.body;

            await User.findOneAndUpdate(
                { _id: userId }, 
                { $addToSet: { cars: carId } },
                { new: true } 
            );

            res.status(201).json({ message: 'Автомобіль успішно додано'});
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Error updating user cars' });
        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find()
            res.json(users)
        }
        catch(e) {
            console.log(e)
            res.status(400).json({message: 'Get users error'})
        }
    }

    async getUserIdCars (req, res) {
        try {
            const userId = req.query.userId;
    
            if (!userId) {
                return res.status(400).json({ message: 'Не вказано userId' });
            }
    
            const user = await User.findById(userId).populate('cars'); 
    
            if (!user) {
                return res.status(404).json({ message: 'Користувач не знайдений' });
            }
    
            res.json(user.cars); 
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Помилка при отриманні автомобілів користувача'});
        }
    }

    async delUserIdCars (req, res) {
        
            try {
                const { userId, carId } = req.body;
        
                if (!userId || !carId) {
                    return res.status(400).json({ message: 'Не вказано userId або carId' });
                }
        
                const user = await User.findById(userId);
        
                if (!user) {
                    return res.status(404).json({ message: 'Користувач не знайдений' });
                }
        
                const carIndex = user.cars.indexOf(carId);
                if (carIndex === -1) {
                    return res.status(404).json({ message: 'Автомобіль не знайдений у користувача' });
                }
        
                user.cars.splice(carIndex, 1);
                await user.save();
        
                res.json({ message: 'Автомобіль успішно видалено зі списку користувача' });
            } catch (e) {
                console.error(e);
                res.status(500).json({ message: 'Помилка при видаленні автомобіля зі списку користувача' });
            }
    }

}

module.exports = new userController()