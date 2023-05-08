const response = (statusCode, status, message, payLoad, res) => {
    res.json(statusCode, [
        {
            status,
            message,
            payLoad,
            metadata: {
                prev: "",
                next: "",
                curr: ""
            }
        }
    ]);
};

module.exports = response;