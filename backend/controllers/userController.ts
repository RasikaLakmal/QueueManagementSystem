import {Request,Response} from "express";
import {User} from "../entity/User"
import {Issues} from "../entity/Issues"
import { AppDataSource } from "../db";
import {Brackets } from "typeorm";

class userController{
    /*static addUser= async(req:Request,res:Response)=>{
        const newPost ={
            u_email: req.body.u_email,
            password: req.body.password,
            name: req.body.name,
            phone_no: req.body.phone_no,

        };
        const post = getRepository(User).create(newPost);
        const result = await getRepository(User).save(post);
        return res.json(result);


    }*/

    static getAllUsers = async (req:Request,res:Response) => {

        const result = await AppDataSource.getRepository(User).find();
      return res.json(result);
    
    }

    static deleteUsers = async (req:Request,res:Response) => {
        const {u_email} = req.params;
       await User.delete(u_email);

        console.log(req.params)
        res.send('del')
    
    }

    static userCheck  = async (req:Request,res:Response) => {

        const {email} = req.params;
        let issueE : Issues|any;
        issueE = await AppDataSource
            .createQueryBuilder()
            .select('issueE')
            .from(Issues,'issueE')
            .where('issueE.email = :email', {email: email })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("issueE.status = :status", { status: "inprogress",})
                    qb.orWhere("issueE.status = :status1", { status1: "waiting"  })
                }),)
            .execute()

            var lenIssueEX = Object.keys(issueE).length;
            if (lenIssueEX != 0) {
                console.log("true")
                return res.send('true')
            } else {
                console.log("false")
                return res.send('false')
            }
    };

    static getOneUser = async(req:Request,res:Response)=>{
        //const id = req.params.id;
        const user = await AppDataSource.getRepository(User).findOne({where:{id: parseInt(req.params.id, 10)}});
        return res.json(user);
    }

    static updateUsers = async (req:Request,res:Response) => {
        //const {id:any} = req.params;
      const user = await AppDataSource.getRepository(User).findOne({where:{id: parseInt(req.params.id, 10)}});
      if(user){
        AppDataSource.getRepository(User).merge(user,req.body);
          const result = await AppDataSource.getRepository(User).save(user);
          return res.json(result);
      }
      return res.json({msg: "Post Not Found"})
    
    };
}
export default userController;