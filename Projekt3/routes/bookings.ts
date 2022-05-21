import { Express, Router,Response,Request } from "express";
import { appendFile } from "fs";
import mongoose from "mongoose";
const express = require('express');
const router = express.Router();
const Booking =require('../Models/BookingModel');
const Table =require('../Models/TableModel');
const Employee =require('../Models/EmployeeModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie dania
router.get('/',async (req:Request, res:Response) =>{
try{
    const bookings = await Booking.find();
    return res.status(200).json(bookings);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(200).json({result});
}
});

//POST dodanie rezerwacji
router.post('/', async (req:Request,res:Response)=>{
    
 const booking = new Booking({
     table:req.body.table,
     start:req.body.start,
     end:req.body.end,
     client:{
         name:req.body.client.name,
         surname:req.body.client.surname,
     },
     employee:req.body.employee    
 })
 const tableExist = await Table.findById(req.body.table);
 if(!tableExist)return res.status(400).json('No such table');
 //zapis
 try{
    
 const savedBooking = await booking.save();
 console.log(savedBooking);
 return res.status(200).json(savedBooking);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrane danie
router.get('/:id',async (req:Request, res:Response) =>{
    try{
        const booking = await Booking.findById(+req.params.id);
        return res.status(200).json(booking);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

//Delete usuwanie dania
router.delete('/:id',async (req:Request, res:Response) =>{
    try{
        const removedBooking = await Booking.deleteOne({_id: req.params.id});
        return res.status(200).json('Deleted');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

    //PATCH modyfikacja dania
router.patch('/:id',async (req:Request, res:Response) =>{
    try{
        const updatedBooking = await Booking.findByIdAndUpdate({_id: req.params.id},{Set:{name:req.body.name}},{Set:{category:req.body.category}},{Set:{price:req.body.price}});
        return res.status(200).json('Updated');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
module.exports=router;