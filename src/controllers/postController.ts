import {Request,Response} from "express";
import { getRepository } from "typeorm";
import {User} from "../entity/User"

class postController{
    static postPost= async(req:Request,res:Response)=>{
        const newPost ={
            u_email: req.body.u_email,
            password: req.body.password,
            name: req.body.name,
            phone_no: req.body.phone_no,

        };
        const post = getRepository(User).create(newPost);
        const result = await getRepository(User).save(post);
        return res.json(result);


    }
}
export default postController;