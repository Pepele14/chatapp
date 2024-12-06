import express from "express";

import authRoutes from "./routes/auth.route.js";

const app = express();

app.use("/api/auth", authRoutes) //route for authentication

app.listen(5001, () => {
    console.log("Server is running on port 5001")
})