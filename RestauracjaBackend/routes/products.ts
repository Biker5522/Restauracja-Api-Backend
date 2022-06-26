import { Express, Router,Response,Request } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Product =require('../Models/ProductModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkie produkty
router.get('/',async (req:Request, res:Response) =>{
try{
    const products = await Product.find();
    return res.status(200).json(products);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(200).json({result});
}
});
//GET wyświetla wszystkie produkty posortowane
router.get('/Sort',async (req:Request, res:Response) =>{
    try{
        const products = await Product.find().sort({name:"asc"});
        return res.status(200).json(products);
    }
    catch(err:any){
        const result = (err as Error).message;
        return res.status(200).json({result});
    }
    });

    //GET wyświetla wszystkie produkty posortowane
router.get('/Brak',async (req:Request, res:Response) =>{
    try{
        const products = await Product.find().where('necessity').equals("yes");
        return res.status(200).json(products);
    }
    catch(err:any){
        const result = (err as Error).message;
        return res.status(200).json({result});
    }
    });

//POST dodanie produktu
router.post('/', async (req:Request,res:Response)=>{
 const product = new Product({
     name:req.body.name,
     quantity:req.body.quantity,
     price:req.body.price,
     unitOfMeasure:req.body.unitOfMeasure,
     necessity:req.body.necessity,

 })
 //zapis
 try{
 const savedDish = await product.save();
 return res.status(200).json(savedDish);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrany produkt
router.get('/:id',async (req:Request, res:Response) =>{
    try{
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

//Delete usuwanie produktu
router.delete('/:id',async (req:Request, res:Response) =>{
    try{
        const removedProduct = await Product.deleteOne({_id: req.params.id});
        return res.status(200).json('Deleted');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

    //PUT modyfikacja produktu
    router.patch('/:id',async (req:Request, res:Response) =>{
    try{   
        const updatedProduct = await Product.findByIdAndUpdate({_id: req.params.id},{ 
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity,
            unitOfMeasure:req.body.unitOfMeasure,
            necessity:req.body.necessity,
}
);
        return res.status(200).json('Updated');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
    
module.exports=router;