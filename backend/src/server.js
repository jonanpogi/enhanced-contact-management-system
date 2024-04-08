import express from "express";
import cors from "cors";
import { Contacts } from "./routes/Contacts.js";
import fileUpload from "express-fileupload";
import "./configs/sqlite3.js";

// define port
const PORT = 8000;
// define cors options
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// initialize express app
const app = express();

// apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

// apply routes
app.use("/api", Contacts);

// start server with callback function
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
