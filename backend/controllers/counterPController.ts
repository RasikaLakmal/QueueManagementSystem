import {Request,Response} from "express";
import { getRepository } from "typeorm";
import {Counter_person} from "../entity/Counter_person"
import {Counter} from "../entity/Counter"
import {Issues} from "../entity/Issues"
import {AppDataSource} from "../db";

class counterPController{
    // static addCP= async(req:Request,res:Response)=>{
    //     const newPost ={
    //         cp_email: req.body.cp_email,
    //         password: req.body.password,
    //         name: req.body.name,
    //         counter_no: req.body.counter_no,

    //     };
    //     const post = AppDataSource.getRepository(Counter_person).create(newPost);
    //     const result = await AppDataSource.getRepository(Counter_person).save(post);
    //     return res.json(result);


    // }

    static getAllCPs = async (req:Request,res:Response) => {

        const result = await AppDataSource.getRepository(Counter_person).find();
      return res.json(result);
    
    }

    // static deleteCPs = async (req:Request,res:Response) => {
    //     const {cp_email} = req.params;
    //    await Counter_person.delete(cp_email);

    //     console.log(req.params)
    //     res.send('del')
    
    // }

    static getOneCP = async(req:Request,res:Response)=>{
        //const id = req.params.id;
        const user = await AppDataSource.getRepository(Counter_person).findOne({where:{id: parseInt(req.params.id, 10)}});
        return res.json(user);
    }

    static call = async(req:Request,res:Response)=>{
      let cuser: Counter_person|any;
      let issue: Issues|any;
      let count: Counter|any;
      // count = await AppDataSource
      //           .createQueryBuilder()
      //           .select('count')
      //           .from(Counter,'count')
      //           .where('count.counter_person = :counter_person', {counter_person: Number(cuser.id)})
      //           .getOne()

                // issue = await AppDataSource
                // .createQueryBuilder()
                // .select('issue')
                // .from(Issues,'issue')
                // .where('issue.counter_no = :counter_no', {counter_no: Number(count.id)})
                // .getOne()
                

                issue =  await AppDataSource
                .createQueryBuilder()
                .update(Issues)
                .set({ status: ['inprogress']})
                .where({ status: ['waiting']})
                .orderBy('createdAt', "ASC")
                .execute()

                console.log(issue)

               
                await AppDataSource
                .createQueryBuilder()
                .select('issue')
                .from(Issues,'issue')
                .where('issue.counter_no = :counter_no', {counter_no:issue.id})
                .getOne()
               // console.log(issue)


  }

    static updateCPs = async (req:Request,res:Response) => {
        //const {id:any} = req.params;
      const user = await AppDataSource.getRepository(Counter_person).findOne({where:{id: parseInt(req.params.id, 10)}});
      if(user){
        AppDataSource.getRepository(Counter_person).merge(user,req.body);
          const result = await AppDataSource.getRepository(Counter_person).save(user);
          return res.json(result);
      }
      return res.json({msg: "Post Not Found"})
    
    };
}
export default counterPController;


