import { Express, Router } from "express";
import { appendFile } from "fs";
import { isBuffer } from "util";
const express = require('express');
const router = require('express').Router();
const User =require('../../Models/UserModel');
const jwt = require('jsonwebtoken');

    
//POST dodanie użytkownika
router.post('/register', async (req:any,res:any)=>{
   //Dodanie
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
//Walidacja
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email exist');
        //zapis
 try{
    const savedUser = await user.save();
    res.send(savedUser);
    }catch(err){
      res.status(400).send(err);
    }
 
    });

    //POST LOGIN
    router.post('/login',async (req:any,res:any)=>{
        //email validation
        const user =  await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('Invalid email');
        //password validation
        const passVal =await (user.password == req.body.password);
    if(!passVal) return res.status(400).send('Invalid password');
            //Token ustawienie i dodanie
     const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
     res.header('auth-token',token).send(token);
    });

    module.exports=router;