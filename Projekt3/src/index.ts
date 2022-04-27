import express from 'express'
import {Request, Response} from 'express'

const app = express()

app.use(express.json())

//Model
class Notatka{
    title:string
    content:string
    createDate?:string
    tags?:string[]
    id?:number
    constructor(title: string,content:string) {
        this.title = title;
        this.content = title;
      }
 
}
let Notatki:Notatka[]=[]

app.get('/', function (req: Request, res: Response) {
  res.send('GET Hello World')
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.status(200).send('POST Hello World')
})

app.post('/note', function (req: Request, res: Response) {
    console.log(req.body)
    Notatki.push(req.body)
    console.log(Notatki)
    res.send(Notatki)
    

  })
  

app.listen(3000)