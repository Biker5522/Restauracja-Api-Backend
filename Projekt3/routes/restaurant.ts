import { Express, Router ,Response, Request} from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Restaurant =require('../Models/RestaurantModel');
const verify = require('../routes/users/authToken');

//GET wyświetla restauracje
router.get('/',async (req:Request, res:Response) =>{
try{
    const restaurant = await Restaurant.find();
    return res.status(200).json(restaurant);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(400).json({result});
}
});

//POST dodanie restauracji
router.post('/add', async (req:Request,res:Response)=>{
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
 return res.status(200).json(savedRestaurant);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});


    //PATCH modyfikacja danych restauracji
router.patch('/:id',verify,async (req:Request, res:Response) =>{
    try{
        
        const updatedRestaurant = await Restaurant.findByIdAndUpdate({_id: req.params.id},{ 
            name:req.body.name,
            www:req.body.www,
            phone:req.body.phone,
            nip:req.body.nip,
            email:req.body.email,
            adres:req.body.adres,
        }
);
        return res.status(200).json(updatedRestaurant);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
module.exports=router;