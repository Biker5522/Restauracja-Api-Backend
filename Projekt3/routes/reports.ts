import { Express, Router,Response,Request } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Product =require('../Models/ProductModel');
const Employee =require('../Models/EmployeeModel');
const Order =require('../Models/OrderModel');
const verify = require('../routes/users/authToken');

//GET Wyświetla wszystkie zamówienia dla danego kelnera
router.get('/Kelnerzy',async (req:Request, res:Response) =>{
try{
    const employees = await Employee.find();
    var returnList:any[]=[];
    for(const element of employees ){
        var idEmployee =element._id
        returnList.push(element);
        //wyszukanie zamówień z id pracownika
        const orders = await Order.find({}).where({employee:idEmployee})
        returnList.push(orders);
    }
    return res.status(200).json(returnList);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(400).json({result});
}
});
//Zwraca zamówienia w danym przedziale
router.get('/Zamowienia/:start/:end',async (req:Request, res:Response) =>{
    try{
        var returnList:any[]=[];
        const orders = await Order.find().populate('table').populate('employee');   
        for(const element of orders ){
        if((Date.parse(element.date)>=Date.parse(req.params.start))&&(Date.parse(element.date)<=Date.parse(req.params.end))){
            returnList.push(element);
        }
        }
        return res.status(200).json(returnList);
    }
    catch(err:any){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    //Zlicza Przychody z danego przedziału
    router.get('/Przychody/:start/:end',async (req:Request, res:Response) =>{
        try{
            var income:Number = 0;
            const orders = await Order.find();   
            for(const element of orders ){
            if((Date.parse(element.date)>=Date.parse(req.params.start))&&(Date.parse(element.date)<=Date.parse(req.params.end))        
            ){
               income+= element.price;
            }
            }
            return res.status(200).json(income);
        }
        catch(err:any){
            const result = (err as Error).message;
            return res.status(400).json({result});
        }
        });
module.exports=router;