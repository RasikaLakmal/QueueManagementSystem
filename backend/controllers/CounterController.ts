import {Request,Response} from "express";
import {Issues} from "../entity/Issues"
import {Counter} from "../entity/Counter"
import { AppDataSource } from "../db";

class counterController{
    static getCounter= async(req:Request,res:Response)=>{
        //const {counter_no} = req.body;
        //const queue = []
        
        const issue = await AppDataSource
        .getRepository(Issues)
        .createQueryBuilder('issue')
        .select('issue.counter_no')
        .addSelect('COUNT(issue.issue_id)', 'issues')
        .groupBy('issue.counter_no')
        .execute();
        //console.log(issue)

        const count = await AppDataSource
        .getRepository( Counter)
        .createQueryBuilder('count')
        .select('id')
        .where({ status: ['active']})
        .execute();
        //console.log(count)

        var lenCount = Object.keys(count).length;
        var lenIssue = Object.keys(issue).length;

        if (lenCount == 0 ) {
            res.status(401).send('all counters are close');
        } 
        else {
            if(lenIssue == 0 || lenCount > lenIssue){

                let activeCount : Counter|any;
                activeCount = await AppDataSource
                    .createQueryBuilder()
                    .select('activeCount.id')
                    .from(Counter, 'activeCount')
                    .where({ status: ['active']})
                    .orderBy('updateAt', "DESC")
                    .getOne()

                    return res.send('Available Suitable counter no : '+activeCount.id +','+' No issues added yet');
            } 
            else{let array:number[] = [];

            for (let index = 0; index < lenCount; index++) {
                array.push(Number(Object.values(count[index])))
            }

            let minValue: Number = 999999;
            let minCount: Number = 999999;

            for (let index = 0; index< lenIssue; index++) {
                if (array.includes(issue[index].counterNoId)) {
                    if (minValue > issue[index].issues ) {
                        minValue = issue[index].issues ;
                        minCount = issue[index].counterNoId ;
                    }
                }
            }
            res.locals.minValue = minValue;
            res.locals.minCount = minCount;
        

            return res.send('Available Suitable counter no:'+minCount +', previous issue id:'+ minValue );
        }

        }
        }

    static getAllCounterData = async (req:Request,res:Response) => {

        const result = await AppDataSource.getRepository(Issues).find();
      return res.json(result);
    
    }

    static deleteIssues = async (req:Request,res:Response) => {
        const {u_email} = req.params;
       await Issues.delete(u_email);

        console.log(req.params)
        res.send('del')
    
    }

    /*static getOneIssue = async(req:Request,res:Response)=>{
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
    
    };*/
}
export default counterController;


