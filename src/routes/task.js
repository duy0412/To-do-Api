const task = require('../controllers/task.js');
const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken.js');


//private routes
router.use(verifyToken);
router.post('/add', task.addTask);
router.get('/get', task.getTasks);
router.put('/edit', task.editTask);
router.delete('/delete', task.deleteTask);


module.exports = router;
