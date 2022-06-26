import { Express, Router,Response,Request } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Dish =require('../Models/DishModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie dania
router.get('/',async (req:Request, res:Response) =>{
try{
    const dishes = await Dish.find();
    return res.status(200).json(dishes);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(200).json({result});
}
});

//POST dodanie dania
router.post('/', async (req:Request,res:Response)=>{
 const dish = new Dish({
     name:req.body.name,
     category:req.body.category,
     price:req.body.price
 })
 //zapis
 try{
 const savedDish = await dish.save();
 return res.status(200).json(savedDish);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrane danie
router.get('/:id',async (req:Request, res:Response) =>{
    try{
        const dish = await Dish.findById(req.params.id);
        return res.status(200).json(dish);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

//Delete usuwanie dania
router.delete('/:id',async (req:Request, res:Response) =>{
    try{
        const removedDish = await Dish.deleteOne({_id: req.params.id});
        return res.status(200).json('Deleted');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

    //PATCH modyfikacja dania
router.put('/:id',async (req:Request, res:Response) =>{
    try{
        const updatedDish = await Dish.findByIdAndUpdate({_id: req.params.id},{name:req.body.name,category:req.body.category,price:req.body.price});
        return res.status(200).json('Updated');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
module.exports=router;