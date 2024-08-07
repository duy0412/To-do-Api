const db = require('../models/index.js');

const currentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now .getMinutes();
    const second = now.getSeconds();
    return new Date(Date.UTC(year, month, date, hour, minute, second));
}
const updateStatus = (task) => new Promise( async (resolve, reject) => {
    try{
        const current = currentTime();
        if(new Date(task.startAt).getTime() > current ) task.statusId = 2;
        else if (new Date(task.deadline).getTime() < current)   task.statusId = 0;
        else task.statusId = 1;
        const response = await db.Task.update({
            statusId: task.statusId
        }, {where: {taskId: task.taskId}}); 
        resolve(response);
    }
    catch(err){
        reject(err);
    }
});

module.exports = updateStatus;