import {Request,Response} from 'express';
import { BaseEntity ,getRepository} from 'typeorm';
import {validate} from "class-validator";
import * as bcrypt from "bcryptjs";
import {User} from "../entity/User"
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db";



class authUserController extends BaseEntity {
    static register = async(req:Request,res:Response)=>{
        const {u_email,name,phone_no,password} = req.body;
        let user = new User();
    
        user.u_email = u_email;
        user.name = name;
        user.phone_no = phone_no;
        user.password = user.setPassword(password);
    
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }
        //const userRepository = AppDataSource.getRepository(User);
        try{ 
            //await userRepository.save(user);
            await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([user])
            .execute()
        }catch(e){
            res.status(409).send("User Already exists");
            return;
        }
        res.status(201).send("User Created");
    
    
    };

    

    static login= async(req: Request, res: Response)=> {
        const {u_email, password} = req.body;

        if (!(u_email && password)) {
            res.status(400).send();
        }

        
        
        try {
            let userl: User|any;
             userl = await AppDataSource
             .getRepository( User)
             .createQueryBuilder("userl")
             .where("userl.u_email = :u_email",{u_email:u_email})
             .getOne()
           
            
            if (userl && ! bcrypt.compareSync(password,userl.password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }
            const generatevJWT = () => {
                return jwt.sign(
                    {
                        u_email: userl.u_email,
                        name: userl.name,
                        phone_no: userl.phone_no,
                    },
                    "SECRET",
                    {expiresIn: "1h"}
                );
            };
           
            res.status(200).json({ access_token: generatevJWT()});
        } catch (error) {
            res.status(401).send(error);
        }


    };

} 




export default authUserController;