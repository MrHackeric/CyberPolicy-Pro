import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDBOnline, connectDBLocal } from "./config/database.js";
import dotenv from "dotenv";
import userRouters from "./routes/users.js";
import regulatoryAssistant from "./routes/regulatoryAssistant.js";
import documentDrafting from "./routes/documentDrafting.js";
import riskScoring from "./routes/riskScoring.js";
import complianceAlerts from "./routes/complianceAlerts.js";
//import { handleError1 } from "./utils/errorHandler.js";
const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

//Middlewares
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(handleError1());

//db
//connectDBOnline();
 connectDBLocal();

//routes
app.use("/api/users", userRouters);
app.use("/api/regulatory", regulatoryAssistant);
app.use("/api/documents", documentDrafting);
app.use("/api/risk-scoring", riskScoring);
app.use("/api/alerts", complianceAlerts);

//server listen
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost/${PORT}`);
});
