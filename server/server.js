
require("dotenv").config();
const express= require("express");
const cors = require("cors");
const connectDB=require("./config/db");
const app= express();

connectDB();
const userRoutes=require("./routes/userRoutes");
const aiRoutes=require("./routes/aiRoutes");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use(userRoutes);
app.use(aiRoutes);

app.get("/", (req,res) => {
    res.send("Hello world")
});
app.listen(3000, () => {console.log("Server is running...")});
