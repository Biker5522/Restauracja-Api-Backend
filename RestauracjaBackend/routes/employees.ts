import { Express, Router, Response, Request } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Employee =require('../Models/EmployeeModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkich pracowników
router.get('/',verify,async (req:Request, res:Response) =>{
try{
    const pracownicy = await Employee.find();
    
    return res.status(200).json(pracownicy);
}
catch(err:any){
    const result = (err as Error).message;
    return res.status(400).json({result});
}
});

//POST dodanie pracownika
router.post('/', async (req:Request,res:Response)=>{
 const employee = new Employee({
     name:req.body.name,
     surname:req.body.surname,
     position:req.body.position
 })
 //zapis
 try{
 const savedEmployee = await employee.save();
 return res.status(200).json(savedEmployee);
 }catch(err){
    const result = (err as Error).message;
    return res.status(400).json({result});
 }
});

//GET wybrany pracownik
router.get('/:id',async (req:Request, res:Response) =>{
    try{
        const pracownik = await Employee.findById(req.params.id);
        return res.status(200).json(pracownik);
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

//Delete usuwanie pracownika
router.delete('/:id',async (req:Request, res:Response) =>{
    try{
        const removedEmployee = await Employee.deleteOne({_id: req.params.id});
        return res.status(200).json('Deleted');
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });

    //PUT modyfikacja pracownika
router.put('/:id',async (req:Request, res:Response) =>{
    try{
        const updatedEmployee = await Employee.findByIdAndUpdate({_id: req.params.id},{ 
            name:req.body.name,
            surname:req.body.surname,
            position:req.body.position});
        return res.status(200).json("Updated");
    }
    catch(err){
        const result = (err as Error).message;
        return res.status(400).json({result});
    }
    });
    
module.exports=router;