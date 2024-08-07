const user = require('../controllers/user.js');
const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken.js');


//private routes
router.use(verifyToken);
router.get('/',user.getCurrent);


module.exports = router;
