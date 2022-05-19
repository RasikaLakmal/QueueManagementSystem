import {Request,Response} from 'express';
import { BaseEntity ,getRepository} from 'typeorm';
import {validate} from "class-validator";
import {Counter_person} from "../entity/Counter_person"
import * as bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db";

class authCPController extends BaseEntity {
    static register = async(req:Request,res:Response)=>{
        const {cp_email,name,password} = req.body;
        let user = new Counter_person();
    
        user.cp_email = cp_email;
        user.name = name;
        user.password = user.setPassword(password);
    
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }
        const userRepository = AppDataSource.getRepository(Counter_person);
        try{ 
            await userRepository.save(user);
        }catch(e){
            res.status(409).send("CPUser Already exists");
            return;
        }
        res.status(201).send("CounterPerson Created");
    
    
    };

    static login= async(req: Request, res: Response)=> {
        const {cp_email, password} = req.body;

        if (!(cp_email && password)) {
            res.status(400).send();
        }

        const userRepository = AppDataSource.getRepository( Counter_person);
        let cuser: Counter_person|any;
        try {
            cuser = await userRepository.findOne({ where: {
                cp_email: cp_email
            } });
            if (cuser && ! bcrypt.compareSync(password,cuser.password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }
            const generateJWT = () => {
                return jwt.sign(
                    {
                        cp_email: cuser.cp_email,
                        name: cuser.name,
                    },
                    "SECRET",
                    {expiresIn: "1h"}
                );
            };
           
            res.status(200).json({ access_token: generateJWT()});
        } catch (error) {
            res.status(401).send(error);
        }

       

    };

}



export default authCPController;