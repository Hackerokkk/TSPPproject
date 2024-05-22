const User = require('../User/userModel');
const Interval = require('./intervalModel');

class intervalController {
    async getInterval (req, res) {
        try {
            const userId = req.query.userId; 

            const user = await User.findById(userId).populate('interval');

            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }

            const intervalData = user.interval;

            return res.status(200).json(intervalData);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Помилка при отриманні інтервалів обслуговування'});
        }
    }

    async updateInterval(req, res) {
        try {
            const intervalId = req.body.intervalId;
            const intervalsToUpdate = req.body.intervals;

            const interval = await Interval.findById(intervalId);

            if (!interval) {
                return res.status(404).json({ message: 'Інтервал не знайдено' });
            }

            interval.oil = intervalsToUpdate.oil || interval.oil;
            interval.coolant = intervalsToUpdate.coolant || interval.coolant;
            interval.brakePads = intervalsToUpdate.brakePads || interval.brakePads;
            interval.brakeFluid = intervalsToUpdate.brakeFluid || interval.brakeFluid;
            interval.fuelFilter = intervalsToUpdate.fuelFilter || interval.fuelFilter;
            interval.airFilter = intervalsToUpdate.airFilter || interval.airFilter;
            interval.sparkPlugs = intervalsToUpdate.sparkPlugs || interval.sparkPlugs;
            interval.timingChain = intervalsToUpdate.timingChain || interval.timingChain;

            await interval.save();

            return res.status(200).json({ message: 'Інтервали успішно оновлені' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Помилка при оновленні інтервалів обслуговування' });
        }
    }    
}

module.exports = new intervalController()