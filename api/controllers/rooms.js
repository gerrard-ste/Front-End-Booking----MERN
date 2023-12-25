import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js"

export const createRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const saveRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms: saveRoom._id}});
        }catch(err){
            next(err);
        }
        res.status(200).json(saveRoom);
    }catch(err){
        next(err);
    }
}

export const updateRoom = async (req,res,next)=>{
    try{
        const updateRoom = await Room.findByIdAndUpdate(req.param.id, { $set: req.body},{new:true});
        res.status(200).json(updateRoom);
    }catch(err){
        next(err);
    }
}

export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.param.id );
        res.status(200).json("Room has been deleted");
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull: {rooms: req.param.id}});
        }catch(err){
            next(err);
        }
    }catch(err){
        next(err);
    }
}

export const getRoom = async (req,res,next)=>{
    try{
        const rooms = await Room.findById(req.param.id);
        res.status(200).json(rooms);
    }catch(err){
        next(err);
    }
}

export const getRooms = async (req,res,next)=>{
    const failed = true;
    if (failed) return next(createError(401,"you are not authenticated!!"));
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(err){
        next(err);
    }
}