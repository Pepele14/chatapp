import express from "express";

const app = express();

app.use("/api/auth", authRoutes) //route for authentication

app.listen(5001, () => {
    console.log("Server is running on port 5001")
})