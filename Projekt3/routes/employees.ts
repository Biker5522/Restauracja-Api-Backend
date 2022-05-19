import { Express, Router } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Employee =require('../Models/EmployeeModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkich pracowników
router.get('/',verify,async (req:any, res:any) =>{
try{
    const pracownicy = await Employee.find();
    res.json(pracownicy);
}
catch(err:any){
    const result = (err as Error).message;
        res.json({result});
}
});

//POST dodanie pracownika
router.post('/', async (req:any,res:any)=>{
 const employee = new Employee({
     name:req.body.name,
     surname:req.body.surname,
     position:req.body.position
 })
 //zapis
 try{
 const savedEmployee = await employee.save();
 res.json(savedEmployee);
 }catch(err){
    const result = (err as Error).message;
        res.json({result});
 }
});

//GET wybrany pracownik
router.get('/:id',async (req:any, res:any) =>{
    try{
        const pracownik = await Employee.findById(req.params.id);
        res.json(pracownik);
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });

//Delete usuwanie pracownika
router.delete('/:id',async (req:any, res:any) =>{
    try{
        const removedEmployee = await Employee.deleteOne({_id: req.params.id});
        res.json('Deleted');
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });

    //PATCH usuwanie pracownika
router.patch('/:id',async (req:any, res:any) =>{
    try{
        const updatedEmployee = await Employee.updateOne({_id: req.params.id},{Set:{name:req.body.name}},{Set:{surname:req.body.surname}},{Set:{position:req.body.position}});
        res.json(updatedEmployee);
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });
module.exports=router;