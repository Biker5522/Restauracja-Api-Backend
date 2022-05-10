const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/notes',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const Notka = mongoose.model('Notka',{
title:String,
body:String

});
const newNotka = new Notka({title:'notka1',body:'zdania'});
newNotka.save().then(()=>{
    console.log('zapisano notke..')
});