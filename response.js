const response = (statusCode, stat, message, payLoad, res) => {
    res.status(statusCode).json([
        {
            status: stat,
            message,
            payLoad
        }
    ]);
};

module.exports = response;