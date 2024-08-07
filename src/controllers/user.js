const user = require('../services/user.js');
const errors = require('../middlewares/handleErrors.js');


const getCurrent = async (req, res) => {
    try{
        const { userId } = req.user;
        const response = await user.getCurrent(userId);
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
};

module.exports = {getCurrent};