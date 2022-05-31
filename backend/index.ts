import "reflect-metadata";
import express,{Request, Response} from 'express';
import * as BodyParser from 'body-parser';
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import issuesRoutes from './routes/issuesRoutes';
import counterPRoutes from './routes/counterPRoutes';
import {AppDataSource} from './db'
//import app from './app';
import http from 'http';
import {Server} from 'socket.io';

const app = express();

app.use(cors());

const server = http.createServer(app)

const io= new Server(server,{
   cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT"],
   },
});



app.use(express.json());

app.use(BodyParser.json());

//const port:number = 3000;
async function main(){
   try{ 
      await AppDataSource.initialize();
   
      app.use('/api/user',userRoutes);
      app.use('/api/auth',authRoutes);
      app.use('/api/issue',issuesRoutes);
      app.use('/api/cp',counterPRoutes);
     
      server.listen(3001, () => {
          console.log("started")
          })}catch(error){
             console.error(error)
          }

          io.on("connection",(socket)=> {
             console.log('user connected:' +socket.id);
         
             socket.on('add issue',(response)=>{
                socket.to(response).emit('added',response)

            })

            socket.on('add issue',(data)=>{
               socket.to(data).emit('added',data)

           })

           socket.on('refreshData', function(x) {
            // Your refresh data logic here (from second controller)
          // emit the data then 
          socket.emit('messages', x)      
          });
         
            })

         
  
}
app.route("/")
.get((req:Request,res:Response)=>{
   return res.send('hello');
})
.post((req:Request,res:Response)=>{
   return res.send('post req');
});

main();
