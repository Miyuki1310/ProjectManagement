"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const notFound = (req, res, next) => {
    const error = (0, errors_1.createCustomError)(`Not found - ${req.originalUrl}`, 404);
    next(error);
};
exports.default = notFound;
