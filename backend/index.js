import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDBOnline } from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();
import userRouters from "./routes/users.js";
// import docRouters from "./routes/documents.js";

const PORT = process.env.PORT || 3000;

const app = express();

//Middlewares
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

//db
connectDBOnline();

//routes
app.use("/api/users", userRouters);
// app.use("/api/documents", docRouters);

//server listen
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost/${PORT}`);
});
