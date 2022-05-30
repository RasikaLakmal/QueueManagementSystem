import {Request,Response} from "express";
import {Issues} from "../entity/Issues"
import {Counter} from "../entity/Counter"
import { AppDataSource } from "../db";
import {PostDto} from '../dto/getAllIssuesDto'
import {getOneIssuesDto} from '../dto/getOneIssueDto'

class issuesController{

    //add issue by user
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
                            phone_no: res.locals.jwt.phone_no,
                            issue: req.body.issue,
                            counter_no: actCount.id,
                        },
                    ])
                    .execute();

                    let is: Counter|any;
                    is= await AppDataSource

                    await AppDataSource
                    .createQueryBuilder()
                    .update(Issues,is)
                    .set({ status: ['inprogress'] })
                    .where("issue_id = :issue_id", { issue_id:1 })
                    .andWhere("is.status = :status OR is.status = :status1",{ status: "", status1: "waiting" })
                    .execute()

                    let coun: Counter|any;
                   coun= await AppDataSource
                    .createQueryBuilder()
                    .update(Counter)
                    .set({ ongoing: 1 })
                    .where("counter_no = :counter_no", { counter_no:actCount.id })
                    .execute()
                
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
            phone_no:res.locals.jwt.phone_no,
            name: res.locals.jwt.name,
            counter_no: res.locals.minCount
            //phone_no: res.locals.jwt.phone_no

        };
        const post = AppDataSource.getRepository(Issues).create(newPost);
        //const a = getRepository(Counter).create({issue_id: req.body.issue_id});
        //const v = await getRepository(Counter).save(a);
        const result = await AppDataSource.getRepository(Issues).save(post);
        return res.json('Your Issue added , Issue No : '+(Number(res.locals.minValue)+1)+' in Counter no: '+ res.locals.minCount);
            }

    }
    }

    //get all issues for counter queue
    static getAllIssues = async (req:Request,res:Response) => {

        const user = await AppDataSource
            .createQueryBuilder()
            .select("user")
            .from(Issues, "user")
            .where("user.status = :status OR user.status = :status1",{ status: "inprogress", status1: "waiting" })
            .andWhere("user.counter_no = :counter_no", { counter_no:res.locals.jwt.counter_id })
            .orderBy({ "status": 'DESC'})
            .getMany()
        console.log(user)
        let responseData : Array<PostDto> = new Array();

        for (const  use of user) {
            responseData.push(new PostDto(use));
        }
        
        return res.send(responseData);
    
    };

    //get one issue for issue caal view in counter

    static getOneIssues = async (req:Request,res:Response) => {

        const {id} = req.params;

        const oneUser = await AppDataSource
            .createQueryBuilder()
            .select("oneUser")
            .from(Issues, "oneUser")
            .where("id = :id", { id :id})
            .execute();

        await AppDataSource
            .createQueryBuilder()
            .update(Issues)
            .set({ status:  ["inprogress"]})
            .where("id = :id", { id: id })
            .execute()

        const oneUserInp = await AppDataSource
            .createQueryBuilder()
            .select("oneUserInp.counterNoId")
            .from(Issues, "oneUserInp")
            .where("id = :id", { id :id})
            .execute();

        const oneUserInp2 = await AppDataSource
            .createQueryBuilder()
            .select("oneUserInp2.issue_id")
            .from(Issues, "oneUserInp2")
            .where("id = :id", { id :id})
            .execute();

        let valCid = Number(Object.values(oneUserInp[0])) 
        let valIno = Number(Object.values(oneUserInp2[0]))

        await AppDataSource
            .createQueryBuilder()
            .update(Counter)
            .set({ ongoing:valIno})
            .where("counter_no = :counter_no", { counter_no:valCid })
            .execute()

        let responseOneData : Array<getOneIssuesDto> = new Array();

        for (const  oneUse of oneUser) {
            responseOneData.push(new getOneIssuesDto(oneUse));
        }
        console.log(responseOneData)
        return res.send(responseOneData);

    };
};
export default issuesController;


