import { Express, Router,Response,Request } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Table =require('../Models/TableModel');
const Order =require('../Models/OrderModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie Stoliki
router.get('/',async (req:Request, res:Response) =>{
try{
    const tables = await Table.find();
    return res.status(200).json(tables);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(200).json({result});
}
});

//POST dodanie Stolika
router.post('/', async (req:Request,res:Response)=>{
 const table = new Table({
     name:req.body.name,
     numberOfPeople:req.body.numberOfPeople,
     status:req.body.status
 })
 //zapis
 try{
 const savedTable = await table.save();
 return res.status(200).json(savedTable);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrany stolik
router.get('/:id',async (req:Request, res:Response) =>{
    try{
        const table = await Table.findById(req.params.id);
        const orders = await Order.find({table:req.params.id})
        return res.status(200).json(table+orders);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

//Delete usuwanie dania
router.delete('/:id',async (req:Request, res:Response) =>{
    try{
        const removedTable = await Table.deleteOne({_id: req.params.id});
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
        const updatedTable = await Table.findByIdAndUpdate({_id: req.params.id},{Set:{name:req.body.name}},{Set:{category:req.body.category}},{Set:{price:req.body.price}});
        return res.status(200).json('Updated');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

    
module.exports=router;