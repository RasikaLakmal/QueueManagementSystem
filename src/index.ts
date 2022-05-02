import "reflect-metadata";
import express,{Request, Response} from 'express';
import { createConnection } from 'typeorm';
import * as BodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/postRoutes';
import {User } from '../src/entity/User'
import {Issues } from '../src/entity/Issues'
import {Counter } from '../src/entity/Counter'
import {Counter_person } from '../src/entity/Counter_person'
import {Notifications } from '../src/entity/Notifications'
const app = express();

app.use(express.json());
//const port:number = 3000;
createConnection({
    type: 'mysql',
    database: "queue",
    username: "root",
    password: "",
    logging: true,
    synchronize: true,
    entities: [User,Issues,Counter,Counter_person,Notifications]

})

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
app.post('/api/user',(req:Request,res:Response)=>{
    User.insert({
        u_email : "5",
        password : "abc",
        name : "lakmal",
        phone_no : 234566,
        
        
        
    });

    res.end();
})
