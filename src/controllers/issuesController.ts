import {Request,Response} from "express";
import { getRepository } from "typeorm";
import {Issues} from "../entity/Issues"
import {Counter} from "../entity/Counter"
import { AppDataSource } from "../db";

class issuesController{
    static addIssue= async(req:Request,res:Response)=>{
        
        const issue = await getRepository( Issues)
        .createQueryBuilder('issue')
        .select('issue.counter_no')
        .addSelect('COUNT(issue.issue_id)', 'issues')
        .groupBy('issue.counter_no')
        .execute();
        //console.log(issue)

        const count = await getRepository( Counter)
        .createQueryBuilder('count')
        .select('counter_id')
        .where({ status: ['active']})
        .execute();
        //console.log(count)
 
        var lenCount = Object.keys(count).length;
        var lenIssue = Object.keys(issue).length;

        if (lenCount == 0 ) {
            res.status(401).send('all counters are close');
        } 
        else {

            let array:number[] = [];

            for (let index = 0; index < lenCount; index++) {
                array.push(Number(Object.values(count[index])))
            }

             let minValue: Number = 999999;
            let minCount: Number = 999999;

            for (let index = 0; index< lenIssue; index++) {
                if (array.includes(issue[index].counterNoCounterId)) {
                    if (minValue > issue[index].issues ) {
                        minValue = issue[index].issues ;
                        minCount = issue[index].counterNoCounterId ;
                    }
                }
            }
            res.locals.minValue = minValue;
            res.locals.minCount = minCount;
        

        const newPost ={
            
            issue_id: res.locals.minValue ,
            issue: req.body.issue,
            email:res.locals.jwt.u_email,
            name: req.body.name,
            counter_no: res.locals.minCount
            //phone_no: res.locals.jwt.phone_no

        };

        const xy={
            counter_no: req.body.counter_no,
            calling_id: req.body.calling_id,

        };
        const post = getRepository(Issues).create(newPost);
        //const a = getRepository(Counter).create({issue_id: req.body.issue_id});
        //const v = await getRepository(Counter).save(a);
        const result = await getRepository(Issues).save(post);
        return res.json(result);

    }
    }

    static getAllIssues = async (req:Request,res:Response) => {

        const result = await AppDataSource.getRepository(Issues).find();
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
        const user = await AppDataSource.getRepository(Issues).findOne({where:{id: parseInt(req.params.id, 10)}});
        return res.json(user);
    }

    static updateIssues = async (req:Request,res:Response) => {
        //const {id:any} = req.params;
      const user = await AppDataSource.getRepository(Issues).findOne({where:{id: parseInt(req.params.id, 10)}});
      if(user){
        AppDataSource.getRepository(Issues).merge(user,req.body);
          const result = await AppDataSource.getRepository(Issues).save(user);
          return res.json(result);
      }
      return res.json({msg: "Post Not Found"})
    
    };
}
export default issuesController;


