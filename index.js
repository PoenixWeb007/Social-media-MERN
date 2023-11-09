import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import router from "./routers/index.js";
config();

const PORT = process.env.PORT || 3001;
const app = express();

/* PARSE REQUEST BODY & URL */
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/* ROUTES */
app.use("/", router);

/* MONGOOSE SETUP */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("cannot be connected to the database" + error));

//User.insertMany(users);
//Post.insertMany(posts);
app.listen(PORT, () => console.log(`server listening in port : ${PORT}`));
