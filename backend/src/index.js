import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json()) //middleware to extract json data out of body of the submitted form

app.use("/api/auth", authRoutes) //route for authentication

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()
})