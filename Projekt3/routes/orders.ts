import { Express, Router,Response,Request } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Order =require('../Models/OrderModel');
const Table =require('../Models/TableModel');
const Employee =require('../Models/EmployeeModel');
const Dish =require('../Models/DishModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie zamówienia
router.get('/',async (req:Request, res:Response) =>{
try{
    const orders = await Order.find().populate('employee').populate('table');
    return res.status(200).json(orders);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(200).json({result});
}
});

//POST dodanie zamówienia
router.post('/', async (req:Request,res:Response)=>{
 const order = new Order({
     table:req.body.table,
     employee:req.body.employee,
     status:req.body.status,
     price:req.body.price,
     positions:req.body.positions,
     date:req.body.date
 })

    //walidacja stolika pracownika i dań
 const tableExist = await Table.findById(req.body.table);
 if(!tableExist)return res.status(400).json('No such table');

 const employeeExist = await Employee.findById(req.body.employee);
 if(!employeeExist)return res.status(400).json('No such employee');
 
 for (const element of order.positions) {
 const DishExist = await Dish.findById(element);
 if(!DishExist)return res.status(400).json('No such Dish');
  }

    //wyliczenie ceny
 if(order.price==0){
    for (const element of order.positions) {
        const DishExisting = await Dish.findById(element);
        
       order.price=order.price+DishExisting.price;
       console.log(1);
      }
 }
    //zapis zamówienia
 try{
 const savedOrder = await order.save();
 return res.status(200).json(savedOrder);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrane Zamówienie
router.get('/:id',async (req:Request, res:Response) =>{
    try{
        const order = await Order.findById(req.params.id);
        return res.status(200).json(order);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

//Delete usuwanie zamówienia
router.delete('/:id',async (req:Request, res:Response) =>{
    try{
        const removedBooking = await Order.deleteOne({_id: req.params.id});
        return res.status(200).json('Deleted');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

    //PUT modyfikacja zamówienia
router.patch('/:id',async (req:Request, res:Response) =>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate({_id: req.params.id},{ 
            table:req.body.table,
            employee:req.body.employee,
            price:req.body.price,
            positions:req.body.positions,
            date:req.body.date,
            status:req.body.status});
        return res.status(200).json('Updated');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
module.exports=router;