const router = require('express').Router()
const mapController = require('../controllers/mapController')

router.get('/markers', mapController.getMarkers)
router.post('/route_weather_test', mapController.route_weather_test) // for testing only!!!!

module.exports = router
