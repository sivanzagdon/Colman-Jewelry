const router = require('express').Router()
const ordersControllers = require('../controllers/ordersControllers')

router.post('/addToOrder', ordersControllers.addToOrder)
router.post('/submitOrder', ordersControllers.submitOrder)
router.post('/deleteItem', ordersControllers.deleteItem)

module.exports = router
