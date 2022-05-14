import express from 'express'
import {Request, Response} from 'express'
import * as notkiControl from './controllers/notkiController'
const app = express()

app.use(express.json())
app.get('/',)
app.get('/notki',notkiControl.allNotki)
app.get('/notka/:id',notkiControl.getNotka)
app.put('/notka',notkiControl.addNotka)
app.delete('/notka/:id',notkiControl.deleteNotka)
app.post('/notka/:id',notkiControl.updateNotka)

app.listen(3000)