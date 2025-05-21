const router = require('express').Router();
const usersController = require('../controllers/usersControllers');


router.post('/signIn', usersController.signIn);
router.post('/signUp', usersController.signUp);
router.get('/logout', usersController.logout);


module.exports = router;