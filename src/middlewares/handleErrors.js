const createError = require('http-errors');

const notFound = (req, res) => {
    const error  = createError.NotFound();
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

const badRequest = (err, res) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    });
};

const internalServer = (res) => {
    const error = createError.InternalServerError();
    return res.status(error.status).json({
        err: -1,
        mes: error.message
    });
};

const unauthorized = (err, res, isExpired) => {
    const error = createError.Unauthorized(err);
    return res.status(error.status).json({
        err: isExpired ? 2 : 1,
        mes: error.message
    });
};

const unavailable = (err, res) => {
    const error = createError.ServiceUnavailable(err);
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

module.exports = {notFound, badRequest, internalServer, unauthorized, unavailable};