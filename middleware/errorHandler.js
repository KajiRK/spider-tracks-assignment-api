const {errorConstants} = require("../constants/errorConstants")

const errorHandler = (err, res) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case errorConstants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case errorConstants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case errorConstants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            break;
    }
};

module.exports = errorHandler;