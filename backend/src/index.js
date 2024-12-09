import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json()) //middleware to extract json data out of body of the submitted form
app.use(cookieParser()) // parsing the cookie

app.use("/api/auth", authRoutes) //route for authentication
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()
})