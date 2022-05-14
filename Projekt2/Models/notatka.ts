import mongoose from "mongoose";
const uri : string = 'mongodb://127.0.0.1:27017/local';

mongoose.connect(uri,(err:any)=>{
  if(err){
    console.log(err.message);
  }{
    console.log('Connecting succeded');
  }
});

export const NotkaSchema = new mongoose.Schema({
  title:{type:String,required:true},
  body:{type:String},
  createDate:{type:String},
  id:{type:Number}
 
});


const Notka = mongoose.model('Notka',NotkaSchema)
export default Notka;
