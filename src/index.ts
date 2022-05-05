import "reflect-metadata";
import express,{Request, Response} from 'express';
import { createConnection } from 'typeorm';
import * as BodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import issuesRoutes from './routes/issuesRoutes';
import counterPRoutes from './routes/counterPRoutes';
const app = express();

app.use(express.json());
//const port:number = 3000;

createConnection().then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(BodyParser.json());

    app.use('/api/user',userRoutes);
    app.use('/api/auth',authRoutes);
    app.use('/api/issue',issuesRoutes);
    app.use('/api/cp',counterPRoutes);
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
