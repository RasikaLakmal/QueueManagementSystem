import {Request,Response} from 'express';
import { BaseEntity ,getRepository} from 'typeorm';
import {validate} from "class-validator";
import {User} from "../entity/User"

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

    static login= async (req:Request,res:Response) =>{
        const {u_email,password} = req.body;
    
        if (!(u_email && password)) {
            res.status(400).send();
        }
    
        const userRepository = getRepository(User);
        let user: User|any;
        try{
            user = await userRepository.findOne({where: { 
                u_email: u_email 
              } });
            if(user && !user.isValidPassword(password)){
                res.status(401).send("Incorrect Password");
                return;
            }
            res.status(200).json({ access_token: user.generateJWT()});
        }catch(error){
            res.status(401).send(error);
        }
        };

}




export default authUserController;