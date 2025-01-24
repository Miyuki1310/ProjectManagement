"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const notFound = (req, res, next) => {
    next(new errors_1.CustomApiError("Can not found this route", 400));
};
exports.default = notFound;
