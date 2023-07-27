import express from "express";
import cookieParser from "cookie-parser";
import { _dbConnect } from "./server.js";
import { config } from "dotenv";
import UserRoute from "./routes/users.js";
import PropertiesRoute from "./routes/amenities.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";
const app = express();

//.env File configuration....
config({
  path: "./config/key.env",
});

//Middleware.....
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);
app.use(
  cors({
    origin: process.env.FrontEnd_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Middleware of Routes...
app.use("/api/v1/user/", UserRoute);
app.use("/api/v1/amenities/", PropertiesRoute);


//Routes....
app.get("/", (req, res) => {
  res.send("Working!");
});

//Port Number....
const port = process.env.PORT || 4000;

//Server Connection......
_dbConnect();

app.listen(port, (err) => {
  if (err) {
    console.warn(err);
  } else {
    console.log(`Connected to port : ${port}`);
  }
});
