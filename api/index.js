import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";


const app= express()
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDb")
  }catch(error){
    throw error;
  }  
};

mongoose.connection.on("connected", ()=>{
    console.log("mongoDb connected")
})

app.get("/users",(req,res)=>{
  res.send("hello firs request!")
})
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
  const errorStatus = err.statuts || 500;
  const errorMessage = err.message || "Something wrong";
  return res.statuts(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(8800, ()=> {
    connect()
    console.log("connected to backend")
})