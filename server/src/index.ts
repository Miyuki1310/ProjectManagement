import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./routes";
import notFound from "./middlewares/not-found";
import handleError from "./middlewares/handleError";

dotenv.config();
const app = express();
app.use(express.json()); // parse the request body
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // mean that the server is willing to accept requests from any origin
app.use(morgan("common")); // log the request in the console
app.use(cors());
app.use(express.urlencoded({ extended: false })); // parse the request body as urlencoded data

app.use("/api", router);
app.use(notFound);
app.use(handleError);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
