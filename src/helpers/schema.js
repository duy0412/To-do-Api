const joi = require('joi');

const userName = joi.string().max(30);
const email = joi.string().pattern(new RegExp('gmail.com$')).required();
const password = joi.string().alphanum().min(6).required();
const refresh_token = joi.string().required();
const taskName = joi.string();
const description = joi.string();
//date format dd-mm-yyyy
const startDate = joi.date();
const endDate = joi.date();
const startTime = joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, 'time format HH:MM').messages({
    'string.pattern.base': 'Invalid time format. Expected HH:MM'
});
const endTime = joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, 'time format HH:MM').messages({
    'string.pattern.base': 'Invalid time format. Expected HH:MM'
});

module.exports = {
    userName, email, password, refresh_token, taskName, description, startDate, endDate,  startTime, endTime
}