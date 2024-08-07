const db = require('../models/index.js');
const bcrypt = require('bcryptjs');
const generateId = require('uuid').v4;
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {return bcrypt.hashSync(password, bcrypt.genSaltSync(8))};

const register = ({email, password, ...body}) => new Promise( async (resolve, reject) => {
    try{
        const response = await db.User.findOrCreate({
            where: {email},
            defaults: {
                email,
                password: hashPassword(password),
                userId: generateId(),
                ...body
            }
        });
        
        const access_token = response[1] ? jwt.sign({
            email: response[0].email,
            userId: response[0].userId
        }, process.env.JWT_SECRET, { expiresIn: '20s'}) : null;

        const refresh_token = response[1] ? jwt.sign({
            userId: response[0].userId
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d'}) : null;

        if(refresh_token){
            await db.User.update({
                refreshToken: refresh_token
            }, { where: { userId: response[0].userId } });
        }

        resolve({
            err: response[1] ? 0 : 1,
            message: response[1] ? "Register successfully" : "Email is used",
            access_token: access_token ? `Bearer ${access_token}` : null,
            refreshToekn: refresh_token
        });
    }
    catch(err){
        reject(err);
    }
});

const login = ({email, password}) => new Promise( async (resolve, reject) => {
    try{
        const response = await db.User.findOne({
            where: {email},
            raw: true
        });

        const isChecked = response && bcrypt.compareSync(password, response.password);

        const access_token = isChecked ? jwt.sign({
            email: response.email,
            userId: response.userId
        }, process.env.JWT_SECRET, { expiresIn: '20s'}) : null;

        const refresh_token = isChecked ? jwt.sign({
            userId: response.userId
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d'}) : null;

        if(refresh_token){
            await db.User.update({
                refreshToken: refresh_token
            }, { where: { userId: response.userId } });
        }

        resolve({
            err: access_token ? 0 : 1,
            message: access_token ? "Login successfully" : response ?  "Password is wrong" : "Email has not been registered",
            access_token: access_token ? `Bearer ${access_token}` : null,
            refreshToken: refresh_token
        });
    }
    catch(err){
        reject(err);
    }
});

const refreshToken = (refresh_token) => new Promise( async (resolve, reject) => {
    try{
        const response = await db.User.findOne({
            where: {refreshToken: refresh_token},
        });

        if(response){
            jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err) => {
                console.log(err)
                if(err) {
                    resolve({
                        err: 1,
                        message: "Refresh token expired. Require login"
                    })
                }
                else{
                    const access_token = jwt.sign({
                        email: response.email,
                        userId: response.userId,
                    }, process.env.JWT_SECRET, {expiresIn: '20s'});

                    resolve({
                        err: access_token ? 0 : 1,
                        mes: access_token ? 'OK' : 'Fail to generate new access token',
                        access_token: access_token
                    });
                }
            })
        }
    }
    catch(err){
        reject(err);
    }
});

module.exports = {register, login, refreshToken}