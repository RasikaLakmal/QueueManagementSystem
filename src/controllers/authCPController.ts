import {Request,Response} from 'express';
import { BaseEntity ,getRepository} from 'typeorm';
import {validate} from "class-validator";
import {Counter_person} from "../entity/Counter_person"

class authUserController extends BaseEntity {
    static register = async(req:Request,res:Response)=>{
        const {u_email,password} = req.body;
        let user = new Counter_person();
    
        user.cp_email = u_email;
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

    static login= async (req:Request,res:Response) =>{
        const {cp_email,password} = req.body;
    
        if (!(cp_email && password)) {
            res.status(400).send();
        }
    
        const userRepository = getRepository(Counter_person);
        let user: Counter_person|any;
        try{
            user = await userRepository.findOne({where: { 
                cp_email: cp_email 
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