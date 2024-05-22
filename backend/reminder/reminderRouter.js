const Router = require('express')
const router = new Router()

const controller = require('./reminderController')

router.post('/reminder', controller.createReminder)

module.exports = router