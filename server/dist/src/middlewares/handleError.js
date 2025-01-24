"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const handleError = (err, req, res) => {
    if (err instanceof errors_1.CustomApiError) {
        res.status(err.status).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.default = handleError;
