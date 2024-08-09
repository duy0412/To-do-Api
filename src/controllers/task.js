const task = require('../services/task.js');
const errors = require('../middlewares/handleErrors.js');
const joi = require('joi');
const {taskName, description, startDate, startTime, endDate, endTime} = require('../helpers/schema.js');
const updateStatus = require('../middlewares/updateStatus.js');

const addTask = async (req, res) => {
    try{
        const {error} = joi.object({taskName,  startDate, endDate, startTime, endTime, description,}).validate(req.body)
        if(error) return errors.badRequest(error.details[0].message, res)
        const response = await task.addTask(req.user.userId, req.body);
        await updateStatus(response.task);
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
};

const getTasks = async (req, res) => {
    try{
        const response = await task.getTasks(req.user.userId);
        for (let task of response.taskData){
            const res = await updateStatus(task);
            if(!res) return errors.unavailable("Error occured when update status");
        };
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
};

const editTask = async (req, res) => {
    try{
        const {taskId, ...body} = req.body
        const {error} = joi.object({taskName,  startDate, endDate, startTime, endTime, description}).validate(body)
        if(error) return errors.badRequest(error.details[0].message, res)
        const response = await task.editTask(taskId, body);
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
};

const deleteTask = async (req, res) => {
    try{
        const {taskId} = req.body
        const response = await task.deleteTask(taskId);
        return res.status(200).json(response);
    }
    catch(err){
        return errors.internalServer(res);
    }
};

module.exports = {addTask, getTasks, editTask, deleteTask};