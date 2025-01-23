"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = exports.CustomApiError = void 0;
class CustomApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.CustomApiError = CustomApiError;
const createCustomError = (message, status) => {
    return new CustomApiError(message, status);
};
exports.createCustomError = createCustomError;
