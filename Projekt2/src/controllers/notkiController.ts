import { Request, Response } from "express";
import Notka from '../../Models/notatka';

//GET all notki
export let allNotki = (req:Request,res: Response)=>{
    let notki = Notka.find((err:any,notki:any)=>{
        if(err){res.send(err)}
        else{
            res.send(notki)
        }
    })
}

//GET id notka 
export let getNotka = (res:Response,req:Request)=>{
    Notka.findById(req.params.id,(err:any,notka:any)=>{
        if(err){
            res.send(err);
        }else{
            res.send(notka)
        }
    })
}
//PUT add notka 
export let addNotka = (res:Response,req:Request)=>{
    let notka = new Notka(req.body);
    notka.save((err:any)=>{if(err){
        res.send(err);
    }
    else{
        res.send(notka)
    }
})    
}
//DELETE delete notka 
export let deleteNotka = (res:Response,req:Request)=>{
    Notka.deleteOne({_id:req.params.id},(err:any)=>{if(err){
        res.send(err);
    }
    else{
        res.send('Deleted')
    }
})    
}

//POST update notka
export let updateNotka = (res:Response,req:Request)=>{
    Notka.findByIdAndUpdate(req.params.id,req.body,(err:any,notka:any)=>{if(err){
        res.send(err);
    }
    else{
        res.send('Deleted')
    }
})    
}