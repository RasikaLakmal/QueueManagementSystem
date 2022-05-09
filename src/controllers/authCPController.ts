import {Request,Response} from 'express';
import { BaseEntity ,getRepository} from 'typeorm';
import {validate} from "class-validator";
import {Counter_person} from "../entity/Counter_person"
import * as bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

class authUserController extends BaseEntity {
    static register = async(req:Request,res:Response)=>{
        const {cp_email,password} = req.body;
        let user = new Counter_person();
    
        user.cp_email = cp_email;
        user.password = user.setPassword(password);
    
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }
        const userRepository = getRepository(Counter_person);
        try{ 
            await userRepository.save(user);
        }catch(e){
            res.status(409).send("CPUser Already exists");
            return;
        }
        res.status(201).send("CounterPerson Created");
    
    
    };

    static login= async(req: Request, res: Response)=> {
        const repository = getRepository(Counter_person);
        const { cp_email, password } = req.body;

        const user = await repository.findOne({ where: {cp_email:cp_email }});

        if(!user) {
            return res.status(401).json({ message: "Unable to login"});
        }

        const validPassword = await bcrypt.compare(password,user.password);


    //   const validPassword =await repository.findOne({ where: {upassword:upassword }});

        if(!cp_email || !password) {
            return res.status(400).json({ message: "Unable to create user" });
        }
        

        // if(user.upassword !== (upassword))
        // {

        if(!validPassword) {
            return res.status(401).json({ message: "Unable to login"});
        }

        const token = jwt.sign({ 
                id: user.id, 
                cp_email: user.cp_email, 
                password: user.password, 
               // type: user.type
            }, 
                process.env.JWT_SECRET as string,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN as string
                }
            );
                
        return res.json({user:user.id,cp_email:user.cp_email,token});
    }

}



export default authUserController;