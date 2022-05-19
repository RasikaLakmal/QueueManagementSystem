import "reflect-metadata";
import express,{Request, Response} from 'express';
import * as BodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import issuesRoutes from './routes/issuesRoutes';
import counterPRoutes from './routes/counterPRoutes';
import {AppDataSource} from './db'
//import app from './app';


const app = express();
app.use(express.json());
app.use(cors());
app.use(BodyParser.json());

//const port:number = 3000;
async function main(){
   try{ 
      await AppDataSource.initialize();
   
      app.use('/api/user',userRoutes);
      app.use('/api/auth',authRoutes);
      app.use('/api/issue',issuesRoutes);
      app.use('/api/cp',counterPRoutes);
     
      app.listen(3001, () => {
          console.log("started")
          })}catch(error){
             console.error(error)
          }
  
}
app.route("/")
.get((req:Request,res:Response)=>{
   return res.send('hello');
})
.post((req:Request,res:Response)=>{
   return res.send('post req');
});

main();


