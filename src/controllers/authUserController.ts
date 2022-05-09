import {Request,Response} from 'express';
import { BaseEntity ,getRepository} from 'typeorm';
import {validate} from "class-validator";
import * as bcrypt from "bcryptjs";
import {User} from "../entity/User"
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

class authUserController extends BaseEntity {
    static register = async(req:Request,res:Response)=>{
        const {u_email,password} = req.body;
        let user = new User();
    
        user.u_email = u_email;
        user.password = user.setPassword(password);
    
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }
        const userRepository = getRepository(User);
        try{ 
            await userRepository.save(user);
        }catch(e){
            res.status(409).send("User Already exists");
            return;
        }
        res.status(201).send("User Created");
    
    
    };

    

    static login= async(req: Request, res: Response)=> {
        const repository = getRepository(User);
        const { u_email, password } = req.body;

        const user = await repository.findOne({ where: {u_email:u_email }});

        if(!user) {
            return res.status(401).json({ message: "Unable to login"});
        }

        const validPassword = await bcrypt.compare(password,user.password);


    //   const validPassword =await repository.findOne({ where: {upassword:upassword }});

        if(!u_email || !password) {
            return res.status(400).json({ message: "Unable to create user" });
        }
        

        // if(user.upassword !== (upassword))
        // {

        if(!validPassword) {
            return res.status(401).json({ message: "Unable to login"});
        }

        const token = jwt.sign({ 
                id: user.id, 
                u_email: user.u_email, 
                password: user.password, 
               // type: user.type
            }, 
                process.env.JWT_SECRET as string,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN as string
                }
            );
                
        return res.json({user:user.id,u_email:user.u_email,token});
    }

}




export default authUserController;