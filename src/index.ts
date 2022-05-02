import "reflect-metadata";
import express,{Request, Response} from 'express';
import { createConnection } from 'typeorm';
import * as BodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/postRoutes';
const app = express();

app.use(express.json());
//const port:number = 3000;

createConnection().then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(BodyParser.json());

    app.use('/',postRoutes);

    app.listen(3001, () => {
        console.log("started")
        })

 
})

app.route("/")
.get((req:Request,res:Response)=>{
   return res.send('hello');
})
.post((req:Request,res:Response)=>{
   return res.send('post req');
});
