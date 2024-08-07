const db = require('../models/index');

const getCurrent = (userId) => new Promise(async(resolve, reject) => {
    try{
        const response = await db.User.findOne({
            where: {userId},
            attributes: {
                exclude: ['password', 'refreshToken']
            }
        });
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "User not found",
            userData: response
        })
    }
    catch(err){
        reject(err);
    }
});

module.exports = {getCurrent};
