import {Request,Response} from "express";
import { getRepository } from "typeorm";
import {Issues} from "../entity/Issues"

class issuesController{
    static addIssue= async(req:Request,res:Response)=>{
        const newPost ={
            issue_id: req.body.issue_id,
            issue: req.body.issue,
            email: req.body.email,
            name: req.body.name,
            phone_no: req.body.phone_no,

        };
        const post = getRepository(Issues).create(newPost);
        const result = await getRepository(Issues).save(post);
        return res.json(result);


    }

    static getAllIssues = async (req:Request,res:Response) => {

        const result = await getRepository(Issues).find();
      return res.json(result);
    
    }

    static deleteIssues = async (req:Request,res:Response) => {
        const {u_email} = req.params;
       await Issues.delete(u_email);

        console.log(req.params)
        res.send('del')
    
    }

    static getOneIssue = async(req:Request,res:Response)=>{
        const issue_id = req.params.issue_id;
        const user = await getRepository(Issues).findOne({where:{id: parseInt(req.params.id, 10)}});
        return res.json(user);
    }

    static updateIssues = async (req:Request,res:Response) => {
        //const {id:any} = req.params;
      const user = await getRepository(Issues).findOne({where:{id: parseInt(req.params.id, 10)}});
      if(user){
          getRepository(Issues).merge(user,req.body);
          const result = await getRepository(Issues).save(user);
          return res.json(result);
      }
      return res.json({msg: "Post Not Found"})
    
    };
}
export default issuesController;


