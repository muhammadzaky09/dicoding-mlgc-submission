class ClientError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = 'fail';
    }
}

export default ClientError;