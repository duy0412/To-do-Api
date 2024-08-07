
const makeDate = (inputDate, inputTime) => {
    const [year, month, date ]= inputDate.split('-');
    const [hour, minute] = inputTime.split(':');
    return new Date(Date.UTC(year, month-1, date, hour, minute));
};

module.exports = makeDate;