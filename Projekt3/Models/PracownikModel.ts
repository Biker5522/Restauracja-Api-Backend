import mongoose from 'mongoose'

const PracownikSchema = new mongoose.Schema({
  imie:{
    type:String,
    required:true
  },
  nazwisko:{
    type:String,
    required:true
  },
  stanowisko:{
    type:String,
    required:false
  },
});

module.exports = mongoose.model('Pracownik',PracownikSchema);


