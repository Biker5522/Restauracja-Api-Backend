import express, { response } from 'express'
import {Request, Response} from 'express'
import { request } from 'http'
import mongoose from 'mongoose'
const routerPracownicy = require('../routes/pracownicy')
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json());
app.use('/pracownicy',routerPracownicy);

//Routes
app.get('/',(req,res)=>{
  res.send('hello');
  });



mongoose.connect('mongodb+srv://dawid:cichy@rest.xarzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>console.log('Connected to Database'));
app.listen(3000);