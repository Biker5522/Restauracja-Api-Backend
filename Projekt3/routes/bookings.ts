import { Express, Router,Response,Request } from "express";
import mongoose from "mongoose";
const express = require('express');
const router = express.Router();
const Booking =require('../Models/BookingModel');
const Table =require('../Models/TableModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie rezerwacje
router.get('/',async (req:Request, res:Response) =>{
try{
    //Powiazanie stolików 
   const bookings = await Booking.find().populate('table');
   return res.status(200).json(bookings);
   //})
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(400).json({result});
}
});

//POST dodanie rezerwacji
router.post('/', async (req:Request,res:Response)=>{
    const table = Table.find();
    const bookings = Booking.find();
 const booking = new Booking({
     table:req.body.table,
     start:new Date(req.body.start),
     end:new Date(req.body.end),
     client:{
         name:req.body.client.name,
         surname:req.body.client.surname,
     }, 
 })
 //sprawdza czy istnieje dany stolik
 const tableExist = await Table.findById(req.body.table);
 if(!tableExist)return res.status(404).json('No such table');

 const start1 = new Date(req.body.start).getTime();
 const end1 = new Date(req.body.end).getTime();

//sprawdza czy można w tym czasie zarezerwować stolik
for await(const booking of bookings ){
    let checkBooking:JSON[]= await Booking.find( { $or: [
        {$and:[{ start1: { $gt: booking.start.getTime() } }, {end1: { $ls: booking.end.getTime() } }] },
        {$and:[{ start1: { $gt: booking.start.getTime() } }, {end1: { $lt: booking.end.getTime() } }] },
        {$and:[{ start1: { $lt: booking.start.getTime() } }, {end1: { $lt: booking.end.getTime() } },{end1: { $gt: booking.start.getTime() } }] },
        {$and:[{ start1: { $gt: booking.start.getTime() } }, {end1: { $lt: booking.end.getTime() } },{start1: { $lt: booking.end.getTime() } }] }
         ] }) 
    if (checkBooking.length!=0) {return res.status(400).json('Stolik jest zajęty');} 
}
 //zapis
 try{  
 const savedBooking = await booking.save();
 console.log(savedBooking);
 return res.status(201).json(savedBooking);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrana rezerwacja
router.get('/:id',async (req:Request, res:Response) =>{
    try{
        const booking = await Booking.findById(+req.params.id).populate('table');
        return res.status(200).json(booking);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

//Delete usuwanie rezerwacji
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

    //PUT modyfikacja rezerwacji
router.put('/:id',async (req:Request, res:Response) =>{
    try{
        const updatedBooking = await Booking.findByIdAndUpdate({_id: req.params.id},
            {table:req.body.table,
            start:req.body.start,
            end:req.body.end,
            client:{
                name:req.body.name,
                surname:req.body.surname
                    }
        });
        return res.status(200).json('Updated');
    }
    catch(err:any){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
module.exports=router;