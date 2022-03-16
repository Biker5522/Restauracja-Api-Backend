var express = require('express');
var app = express();
var c = 0;
app.get('/', function (req, res) {
    var num1 = req.query.num1;
    var num2 = req.query.num2;
    var operation = req.query.operation;
    switch (operation) {
        case 'dodaj':
            c = +num1 + +num2;
            res.send(c.toString());
            break;
        case 'odejmij':
            c = +num1 - +num2;
            res.send(c.toString());
            break;
        case 'pomnoz':
            c = +num1 * +num2;
            res.send(c.toString());
            break;
        case 'podziel;':
            c = +num1 / +num2;
            res.send(c.toString());
            break;
        default:
            res.send('Kalkulator');
    }
});
app.get('/:operacja/:n1/:n2', function (req, res) {
    var a = req.params.n1;
    var b = req.params.n2;
    var operation = req.query.operation;
    switch (req.params.operacja) {
        case 'add':
            c = +a + +b;
            res.send(c.toString());
            break;
        case 'substrack':
            c = +a - +b;
            res.send(c.toString());
            break;
        case 'multiply':
            c = +a * +b;
            res.send(c.toString());
            break;
        case 'divide':
            c = +a / +b;
            res.send(c.toString());
            break;
    }
});
app.listen(3000);
