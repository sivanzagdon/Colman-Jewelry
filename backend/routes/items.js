const router = require('express').Router()
const itemsController = require('../controllers/itemsControllers')

router.post('/createItems', itemsController.createItems)
router.post('/updateItems', itemsController.updateItem)
router.get('/getItemsByName', itemsController.getItemByName)
router.get('/getItems', itemsController.getItems)
router.get('/getItemsByType', itemsController.getItemsByType)

module.exports = router
