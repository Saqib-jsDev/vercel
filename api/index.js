import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import notesRouter from "./routes/notesRoutes.js";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./Middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
config();
connectDB();
app.use(json());
app.use(cors());


///// Deployment code 31.05.2025


// const __dirname = path.resolve();//
//if (process.env.NODE_ENV === "production"){
//  app.use(express.static(path.join(__dirname,"frontend/build")));
//app.get("*",(req,res)=>{
//    res.sendFile(path.resolve(__dirname,"frontend","build","index.hmtl"));
//})
/


const port = process.env.PORT || 4045
////// deployment code 

app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);
app.use('/uploads', express.static('uploads'));
app.use(errorHandler);
// app.listen(port, () => console.log("server is running at 3035 and watching"));



