import { Express, Router } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Pracownik =require('../Models/PracownikModel');
const verify = require('../routes/users/authToken');

//GET wyświetla wszystkich pracowników
router.get('/',verify,async (req:any, res:any) =>{
try{
    const pracownicy = await Pracownik.find();
    res.json(pracownicy);
}
catch(err:any){
    const result = (err as Error).message;
        res.json({result});
}
});

//POST dodanie pracownika
router.post('/', async (req:any,res:any)=>{
 const pracownik = new Pracownik({
     imie:req.body.imie,
     nazwisko:req.body.nazwisko,
     stanowisko:req.body.stanowisko
 })
 //zapis
 try{
 const savedPracownik = await pracownik.save();
 res.json(savedPracownik);
 }catch(err){
    const result = (err as Error).message;
        res.json({result});
 }
});

//GET wybrany pracownik
router.get('/add',async (req:any, res:any) =>{
    try{
        const pracownik = await Pracownik.findById(req.params.id);
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
        const removedPracownik = await Pracownik.deleteOne({_id: req.params.id});
        res.json('Usunieto');
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });

    //PATCH usuwanie pracownika
router.patch('/:id',async (req:any, res:any) =>{
    try{
        const updatedPracownik = await Pracownik.updateOne({_id: req.params.id},{Set:{imie:req.body.imie}},{Set:{nazwisko:req.body.nazwisko}},{Set:{stanowisko:req.body.stanowisko}});
        res.json(updatedPracownik);
    }
    catch(err){
        const result = (err as Error).message;
        res.json({result});
    }
    });
module.exports=router;