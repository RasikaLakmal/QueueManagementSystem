import {Request,Response} from 'express';
import { BaseEntity} from 'typeorm';
import {validate} from "class-validator";
import {Counter_person} from "../entity/Counter_person"
import {Counter} from "../entity/Counter"
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db";

class authCPController extends BaseEntity {

    //Counter person register
    static register = async(req:Request,res:Response)=>{
        const {cp_email,name,phone_no,password} = req.body;
        let user = new Counter_person();
    
        user.cp_email = cp_email;
        user.name = name;
        user.phone_no = phone_no;
        user.password = user.setPassword(password);
    
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }
        //const userRepository = AppDataSource.getRepository(Counter_person);
        try{ 
           // await userRepository.save(user);
           await AppDataSource
           .createQueryBuilder()
           .insert()
           .into(Counter_person)
           .values([user])
           .execute()

        }catch(e){
            res.status(409).send("CPUser Already exists");
            return;
        }
        res.status(201).send("CounterPerson Created");
    
    
    };

    //counter person login

    static login= async(req: Request, res: Response)=> {
        const {cp_email, password} = req.body;

        if (!(cp_email && password)) {
            res.status(400).send();
        }
        
        try {
            let cuser: Counter_person|any;
            let count: Counter|any;
            cuser = await AppDataSource
            .getRepository(Counter_person)
            .createQueryBuilder("cuser")
            .where("cuser.cp_email=:cp_email",{cp_email:cp_email})
            .getOne()

            count = await AppDataSource
                .createQueryBuilder()
                .select('count')
                .from(Counter,'count')
                .where('count.counter_person = :counter_person', {counter_person: Number(cuser.id)})
                .update(Counter)
                .set({ counter_person: cuser.id })
                .where({ status: ['close']})
                .orderBy('updateAt', "DESC")
                .execute()
                
                count = await AppDataSource
                .createQueryBuilder()
                .select('count')
                .from(Counter,'count')
                .where('count.counter_person = :counter_person', {counter_person: Number(cuser.id)})
                .getOne()

                await AppDataSource
                .createQueryBuilder()
                .update(Counter)
                .set({ status: ['active'] })
                .where("id = :id", { id:count.id })
                .execute()

            
            if (cuser && ! bcrypt.compareSync(password,cuser.password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }
            const generateJWT = () => {
                return jwt.sign(
                    {
                        cp_email: cuser.cp_email,
                        name: cuser.name,
                        phone_no: cuser.phone_no,
                        counter_number: count.counter_number,
                        counter_id: count.id
                    },
                    "SECRET",
                    {expiresIn: "1h"}
                );
            };
           
            res.status(200).json({ token: generateJWT()});
        } catch (error) {
            res.status(401).send(error);
        }

       

    };

}
export default authCPController;