import { Express, Router } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Dish =require('../Models/DishModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie dania
router.get('/',async (req:any, res:any) =>{
try{
    const dishes = await Dish.find();
    res.json(dishes);
}
catch(err:any){
    const result = (err as Error).message;
        res.json({result});
}
});

//POST dodanie dania
router.post('/', async (req:any,res:any)=>{
 const dish = new Dish({
     name:req.body.name,
     category:req.body.category,
     price:req.body.price
 })
 //zapis
 try{
 const savedDish = await dish.save();
 res.json(savedDish);
 }catch(err){
    const result = (err as Error).message;
        res.json({result});
 }
});

//GET wybrane danie
router.get('/:id',async (req:any, res:any) =>{
    try{
        const dish = await Dish.findById(req.params.id);
        res.json(dish);
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });

//Delete usuwanie dania
router.delete('/:id',async (req:any, res:any) =>{
    try{
        const removedDish = await Dish.deleteOne({_id: req.params.id});
        res.json('Deleted');
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });

    //PATCH modyfikacja dania
router.patch('/:id',async (req:any, res:any) =>{
    try{
        const updatedDish = await Dish.updateOne({_id: req.params.id},{Set:{name:req.body.name}},{Set:{category:req.body.category}},{Set:{price:req.body.price}});
        res.json(updatedDish);
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });
module.exports=router;