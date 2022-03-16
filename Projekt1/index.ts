const express = require('express')  
const app = express() 
var c = 0;
app.get('/', function (req, res) { 
    let num1=req.query.num1;
    let num2=req.query.num2;
    let operation=req.query.operation;
    switch (operation){
        case 'dodaj':
            c= +num1+ +num2;
            res.send(c.toString());
            break;
        case 'odejmij':
            c= +num1 - +num2;
            res.send(c.toString());
            break;
        case 'pomnoz':
            c=+num1*+num2;
            res.send(c.toString());
            break;
        case 'podziel;':
            c=+num1/+num2;
            res.send(c.toString());
            break;
        default:
            res.send('Kalkulator');
            
    }
    
})   

app.get('/:operacja/:n1/:n2', function (req, res) {  
    let a:number = req.params.n1;
    let b:number = req.params.n2;
    let operation:string=req.query.operation;
switch (req.params.operacja){
    case 'add':
        c= +a+ +b;
        res.send(c.toString());
        break;
    case 'substrack':
        c= +a - +b;
        res.send(c.toString());
        break;
    case 'multiply':
        c=+a*+b;
        res.send(c.toString());
        break;
    case 'divide':
        c=+a/+b;
        res.send(c.toString());
        break;
} 
})  
app.listen(3000)