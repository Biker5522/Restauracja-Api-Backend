import { Express, Router,Response,Request } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Order =require('../Models/OrderModel');
const Table =require('../Models/TableModel');
const Employee =require('../Models/EmployeeModel');
const Dish =require('../Models/DishModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie dania
router.get('/',async (req:Request, res:Response) =>{
try{
    const orders = await Order.find();
    return res.status(200).json(orders);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(200).json({result});
}
});

//POST dodanie dania
router.post('/', async (req:Request,res:Response)=>{
 const order = new Order({
     table:req.body.table,
     employee:req.body.employee,
     status:req.body.status,
     price:req.body.price,
     positions:req.body.positions
 })
 //zapis
 const tableExist = await Table.findById(req.body.table);
 if(!tableExist)return res.status(400).json('No such table');

 const employeeExist = await Employee.findById(req.body.employee);
 if(!employeeExist)return res.status(400).json('No such employee');

 for (const element of order.positions) {
    const DishExist = await Dish.findById(element);
 if(!DishExist)return res.status(400).json('No such Dish');
  }

 if(order.price==0){
    for (const element of order.positions) {
        const DishExisting = await Dish.findById(element);
        
       order.price=order.price+DishExisting.price;
       console.log(1);
      }
 }

 try{
 const savedOrder = await order.save();
 return res.status(200).json(savedOrder);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrane danie
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

//Delete usuwanie dania
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

    //PATCH modyfikacja dania
router.patch('/:id',async (req:Request, res:Response) =>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate({_id: req.params.id},{Set:{name:req.body.name}},{Set:{category:req.body.category}},{Set:{price:req.body.price}});
        return res.status(200).json('Updated');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
module.exports=router;