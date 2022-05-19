import { Express, Router } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Restaurant =require('../Models/RestaurantModel');
const verify = require('../routes/users/authToken');

//GET wyświetla restauracje
router.get('/',async (req:any, res:any) =>{
try{
    const restaurant = await Restaurant.find();
    res.json(restaurant);
}
catch(err:any){
    const result = (err as Error).message;
        res.json({result});
}
});

//POST dodanie restauracji
router.post('/add', async (req:any,res:any)=>{
 const restaurant = new Restaurant({
     name:req.body.name,
     adres:req.body.adres,
     www:req.body.www,
     phone:req.body.phone,
     nip:req.body.nip,
     email:req.body.email,
 })
 //zapis
 try{
 const savedRestaurant = await restaurant.save();
 res.json(savedRestaurant);
 }catch(err){
    const result = (err as Error).message;
        res.json({result});
 }
});


    //PATCH modyfikacja danych restauracji
router.patch('/:id',verify,async (req:any, res:any) =>{
    try{
        const updatedRestaurant = await Restaurant.updateOne({_id: req.params.id},{Set:{name:req.body.name}},{Set:{adres:req.body.adres}},{Set:{phone:req.body.phone}},{Set:{www:req.body.www}},{Set:{nip:req.body.nip}});
        res.json(updatedRestaurant);
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });
module.exports=router;