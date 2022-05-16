import { Express, Router } from "express";
import { appendFile } from "fs";
const express = require('express');
const router = express.Router();
const Pracownik =require('../Models/PracownikModel');


router.get('/', (req:any, res:any) =>{
res.send('hello word');
});

//POST zapis pracownika
router.post('/', async (req:any,res:any)=>{
 const pracownik = new Pracownik({
     imie:req.body.imie,
     nazwisko:req.body.nazwisko,
     description:req.body.description
 })
 //zapis
 try{
 const savedPracownik = await pracownik.save();
 res.json(savedPracownik);
 }catch(err:any){
    console.log(err);
 }
});

module.exports=router;