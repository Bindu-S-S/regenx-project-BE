class ErrorHandling extends Error {
    constructor(message, name="ServerError", status = 500) {
        super(message);
        this.name = name;
        this.statusCode = status;
    }
}


module.exports = ErrorHandling;