const Router = require('express')
const router = new Router()

const controller = require('./intervalController')

router.get('/inteval', controller.getInterval)
router.put('/inteval', controller.updateInterval)

module.exports = router