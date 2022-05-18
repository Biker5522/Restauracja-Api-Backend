import express, { response } from 'express'
import {Request, Response} from 'express'
import { request } from 'http'
import mongoose from 'mongoose'
require("dotenv").config();

const bodyParser = require('body-parser');
const app = express();
app.use(express.json());

//Routes
  //Pracownicy
const routerPracownicy = require('../routes/pracownicy')
app.use('/pracownicy',routerPracownicy);


app.get('/',(req,res)=>{
  res.send('hello');
  });

  //Users
const routerUsers = require('../routes/users/auth')
app.use('/users',routerUsers);


mongoose.connect('mongodb+srv://dawid:cichy@rest.xarzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>console.log('Connected to Database'));
app.listen(3000,()=>console.log('Server Running'));