// Base error type for errors that should be returned by the API.
class ApiError extends Error {
    constructor(message) {
        super(message);
    }
}

// Represents validation or malformed-request failures.
class BadRequestError extends ApiError {
    constructor(message = "Bad Request") {
        super(message);
        this.status = 400;
    }
}

// Represents requests for resources that do not exist.
class NotFoundError extends ApiError {
    constructor(message = "Not found") {
        super(message);
        this.status = 404;
    }
}

module.exports = {
    // Export error classes so route handlers can throw consistent API errors.
    ApiError,
    BadRequestError,
    NotFoundError
}
