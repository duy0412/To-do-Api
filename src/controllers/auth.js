const auth = require('../services/auth.js');
const errors = require('../middlewares/handleErrors.js');
const {email, password, userName, refresh_token} = require('../helpers/schema.js');
const joi = require('joi');

const register = async (req, res) => {
    try{
        const {error} = joi.object({email, password, userName}).validate(req.body);
        if(error)   return errors.badRequest(error.details[0].message, res);
        const response = await auth.register(req.body);
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
};

const login = async (req, res) => {
    try{
        const {error} = joi.object({email, password}).validate(req.body);
        if(error)   return errors.badRequest(error.details[0].message, res);
        const response = await auth.login(req.body);
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
};

const refreshToken = async (req, res) => {
    try{
        const {error} = joi.object({refresh_token}).validate(req.body);
        if (error) return errors.badRequest(error.details[0]?.message, res)
        const response = await auth.refreshToken(req.body.refresh_token);
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
}

module.exports = {register, login, refreshToken};