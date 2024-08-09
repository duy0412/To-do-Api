const db = require('../models/index.js');
const generateId = require('uuid').v4;

const makeDate = require('../helpers/makeDate.js');

const addTask = (userId, body) => new Promise( async (resolve, reject) => {
    try{
        const isUser = await db.User.findOne({
            where: {userId}
        });
        if(isUser){
            const response = await db.Task.create({
                taskId: generateId(),
                userId: userId,
                taskName: body.taskName,
                startAt: makeDate(body.startDate, body.startTime),
                deadline: makeDate(body.endDate, body.endTime),
                description: body?.description
            });
            resolve({
                err: response ? 0 : isUser ? 1 : -1,
                mes: response ? "Create successfully" : isUser ? "Cannot create new task" : "Require registered",
                task: response
            });
            
        } 

    }
    catch(err){
        reject(err);
    }
});

const getTasks = (userId) => new Promise( async (resolve, reject) => {
    try{
        const response = await db.Task.findAll({
            where: {userId},
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        });

        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got tasks" : "You have not made any task",
            taskData: response
        })
    }
    catch(err){
        reject(err);
    }
});


const editTask = (taskId, body) => new Promise( async (resolve, reject) => {
    try{
        const response = await db.Task.update({
            taskName: body?.taskName,
            description: body?.description,
            startAt: makeDate(body?.startDate, body?.startTime),
            deadline: makeDate(body?.endDate, body?.endTime)
        }, {where: {taskId}});
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Edited" : "No such that task"
        })
    }
    catch(err){
        reject(err);
    }
});

const deleteTask = (taskId) => new Promise( async (resolve, reject) => {
    try{
        const response = await db.Task.destroy({
            where: {taskId}
        });
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Deleted successfully" : "No such that task"
        })
    }
    catch(err){
        reject(err);
    }
});

module.exports = {addTask, getTasks, editTask, deleteTask}