import  express from "express";
import { getUsers,updateUser,deleteUser,getUser} from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("hello user, yoo are logged in")
})
router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("hello user, yoo are logged in")
})  
router.get("/checkAdmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("hello admin, yoo are logged in")
}) 

//update
router.put("/:id",verifyUser,updateUser());

//delete
router.delete("/:id",verifyUser,deleteUser());

//GET
router.get("/:id",verifyUser,getUser());

//GETALL
router.get("/",verifyUser,getUsers());

export default router 