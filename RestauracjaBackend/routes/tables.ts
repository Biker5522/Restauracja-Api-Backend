import { json } from "body-parser";
import { Express, Router,Response,Request } from "express";
const express = require('express');
const router = express.Router();
const Table =require('../Models/TableModel');
const Order =require('../Models/OrderModel');
const Booking =require('../Models/BookingModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie Stoliki
router.get('/',async (req:Request, res:Response) =>{
try{
    const tables = await Table.find(); 
    const date = Date.now();
    //Sprawdza czy stolik jest w użyciu
    for await(const tableItem of tables){
        var checkTable:JSON[]= await Booking.find({table:tableItem._id})
        .where('start').lt(date)
        .where('end').gt(date)
        if(tableItem.status=="unavailable"){}
        else if (checkTable.length==0) {tableItem.status='free'}
        else{tableItem.status='occupied'}   
    }
    return res.status(200).json({tables});
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(400).json({result});
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
    //GET wybrany stolik w danym dniu
router.get('/wybierz/:day/:numberOfPeople',async (req:Request, res:Response) =>{
    try{
        const date = req.params.day;
        const people:Number = +req.params.numberOfPeople-1;
        const tables = await Table.find().where('numberOfPeople').gt(people); 
        let result:JSON[]=[];
        //Check if Table is in use now
        for await(const tableItem of tables){
            var checkTable:JSON[]= await Booking.find({table:tableItem._id})
            .where('start').lt(date)
            .where('end').gt(date)
            if(tableItem.status=="unavailable"){}
            else if (checkTable.length==0) {result+=tableItem}
            
    }
    return res.status(200).json({result});
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    

//Delete usuwanie stolika
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

    //PATCH modyfikacja stolika
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