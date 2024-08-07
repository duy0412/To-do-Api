const errors = require('../middlewares/handleErrors.js');
const user = require('./user.js');
const auth = require('./auth.js');
const task = require('./task.js');
const initRoutes = (app) => {
    
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/task', task)
    app.use(errors.notFound);
}

module.exports = initRoutes;