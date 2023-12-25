import User from "../models/User.js";
import {createError} from "../utils/error.js"

export const cretaeUser= async (req,res,next)=>{
    const newUser = new User(req.body);
    try{
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    }catch(err){
        next(err);
    }
}

export const updateUser = async (req,res,next)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.param.id, { $set: req.body},{new:true});
        res.status(200).json(updateUser);
    }catch(err){
        next(err);
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.param.id );
        res.status(200).json("User has been deleted");
    }catch(err){
        next(err);
    }
}

export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.param.id);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

export const getUsers = async (req,res,next)=>{
    const failed = true;
    if (failed) return next(createError(401,"you are not authenticated!!"));
    try{
        const users = await Users.find();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}