import {Request,Response} from "express";
import { Any, getRepository } from "typeorm";
import {Issues} from "../entity/Issues"
import {Counter} from "../entity/Counter"
import { AppDataSource } from "../db";
import {PostDto} from '../dto/getAllIssuesDto'

class issuesController{
    static addIssue= async(req:Request,res:Response)=>{
        
        const issue = await AppDataSource.getRepository(Issues)
        .createQueryBuilder('issue')
        .select('issue.counter_no')
        .addSelect('COUNT(issue.issue_id)', 'issues')
        .groupBy('issue.counter_no')
        .execute();
        //console.log(issue)

        const count = await AppDataSource.getRepository(Counter)
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

             
                let actCount : Counter|any;
                actCount = await AppDataSource
                    .createQueryBuilder()
                    .select('actCount.id')
                    .from(Counter, 'actCount')
                    .where({ status: ['active']})
                    .orderBy('updateAt', "DESC")
                    .getOne()
                    console.log(actCount)

                
                    await AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Issues)
                    .values([
                        {
                            issue_id: 1,
                            name: res.locals.jwt.name, 
                            email: res.locals.jwt.u_email, 
                            issue: req.body.issue,
                            counter_no: actCount.id,
                        },
                    ])
                    .execute();
                  
                return res.json(
                    'Your Issue added , Issue No : '+1+' in Counter no: '+actCount.id);
            } 
            else{
                let array:number[] = [];

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
        

        const newPost ={
            
            issue_id: Number(res.locals.minValue)+1 ,
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
        const post = AppDataSource.getRepository(Issues).create(newPost);
        //const a = getRepository(Counter).create({issue_id: req.body.issue_id});
        //const v = await getRepository(Counter).save(a);
        const result = await AppDataSource.getRepository(Issues).save(post);
        return res.json('Your Issue added , Issue No : '+(Number(res.locals.minValue)+1)+' in Counter no: '+ res.locals.minCount);
            }

    }
    }

    static getAllIssues = async (req:Request,res:Response) => {

        const result = await AppDataSource.getRepository(Issues).find();
        let responseData : Array<PostDto> = new Array();

       for (const x of result) {
        responseData.push(new PostDto(x));
       }

       return res.send(responseData);
      //return res.json(result);
    
    }

    static deleteIssues = async (req:Request,res:Response) => {
        const {u_email} = req.params;
       await Issues.delete(u_email);

        console.log(req.params)
        res.send('del')
    
    }

    static getOneIssue = async(req:Request,res:Response)=>{

     const update =   await AppDataSource.getRepository(Issues)
    .createQueryBuilder('update')
    .update(Issues)
    .set({ status : ["inprogress"]})
    .where("issue_id = :issue_id", { issue_id: 1 })
    .execute();
        // const issue_id = req.params.issue_id;
        // const user = await AppDataSource.getRepository(Issues).findOne({where:{id: parseInt(req.params.id, 10)}});
         return res.json(update);
    }

    // static updateIssues = async (req:Request,res:Response) => {
    //     //const {id:any} = req.params;
    // //   const user = await AppDataSource.getRepository(Issues).findOne({where:{id: parseInt(req.params.id, 10)}});
    // //   if(user){
    // //     AppDataSource.getRepository(Issues).merge(user,req.body);
    // //       const result = await AppDataSource.getRepository(Issues).save(user);
    // // let issue : Issues|any;
    // // issue =
    // await AppDataSource
    // .createQueryBuilder()
    //  .update(Issues)
    // .set({ issue: req.body.issue })
    // .where("issue_id = :issue_id", { issue_id: 1 })
    // .execute();     
    // //return res.json(result);
    //   }
      //return res.json({msg: "Post Not Found"})
    
    };

export default issuesController;


