"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomApiError = void 0;
class CustomApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, CustomApiError.prototype);
    }
}
exports.CustomApiError = CustomApiError;
