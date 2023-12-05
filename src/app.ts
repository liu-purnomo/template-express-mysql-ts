require("dotenv").config();
import express from "express";
import { errorHandler } from "./middlewares";
import router from "./routes/router";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});