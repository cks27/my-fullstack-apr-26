class ApiResponse{
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static build(status, message, data) {
        return new ApiResponse(status, message, data);
    }
}

module.exports = ApiResponse;