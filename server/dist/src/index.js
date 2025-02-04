"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const handleError_1 = __importDefault(require("./middlewares/handleError"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // parse the request body
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" })); // mean that the server is willing to accept requests from any origin
app.use((0, morgan_1.default)("common")); // log the request in the console
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false })); // parse the request body as urlencoded data
app.use("/api", routes_1.default);
app.use(not_found_1.default);
app.use(handleError_1.default);
const port = Number(process.env.PORT) || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
