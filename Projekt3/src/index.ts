import express, { response } from 'express'
import {Request, Response} from 'express'
import { request } from 'http'
import mongoose from 'mongoose'
require("dotenv").config();

const bodyParser = require('body-parser');
const app = express();
app.use(express.json());

//Routes
  //Restauracja
  const routerRestaurant = require('../routes/restaurant')
  app.use('/Restauracja',routerRestaurant);

  //Pracownicy
  const routerEmployees = require('../routes/employees')
  app.use('/Pracownicy',routerEmployees);

  //Users
  const routerUsers = require('../routes/users/auth')
  app.use('/',routerUsers);

  //Dania
  const routerDishes = require('../routes/dishes')
  app.use('/Menu',routerDishes);

  //Stolik
  const routerTables = require('../routes/tables')
  app.use('/Stoliki',routerTables);

  //Produkty
  const routerProducts = require('../routes/products')
  app.use('/Magazyn',routerProducts);

  //Rezerwacje
  const routerBookings = require('../routes/bookings')
  app.use('/Rezerwacje',routerBookings);

  //Zamówienia
  const routerOrders = require('../routes/orders')
  app.use('/Zamowienia',routerOrders);

app.get('/',(req,res)=>{
  res.send('Restauracja World');
  });

//Database
mongoose.connect('mongodb+srv://dawid:cichy@rest.xarzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>console.log('Connected to Database'));
app.listen(3000,()=>console.log('Server Running'));