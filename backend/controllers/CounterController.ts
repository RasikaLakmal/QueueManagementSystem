import {Request,Response} from "express";
import {Issues} from "../entity/Issues"
import {Counter} from "../entity/Counter"
import { AppDataSource } from "../db";
import {queueNumDto} from "../dto/queueNumDto"
import {getOneIssuesDto} from "../dto/getOneIssueDto"
import {Brackets } from "typeorm";

class counterController{

    //get next available issue no and suitable counter
    static getCounter= async(req:Request,res:Response)=>{
        
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

        //get all counter details

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

    //close counter function

    static closeCounter = async (req:Request,res:Response) => {

        await AppDataSource
                .createQueryBuilder()
                .update(Counter)
                .set({ status: ['close'] })
                .where("id = :id", { id:res.locals.jwt.counter_id })
                .execute()
        
        res.json({
            message: 'done'
        })

    };
//done and next 
static doneNNext = async (req:Request,res:Response) => {

    const {id} = req.params;
    await AppDataSource
        .createQueryBuilder()
        .update(Issues)
        .set({ status:  ["close"]})
        .where("id = :id", { id: id })
        .execute()
    
    const oneUser = await AppDataSource
        .createQueryBuilder()
        .select("oneUser")
        .from(Issues, "oneUser")
        .where('oneUser.counter_no = :counter_no', {counter_no:res.locals.jwt.counter_id })
        .andWhere(
            new Brackets((qb) => {
                qb.where("oneUser.status = :status", { status: "inprogress",})
                qb.orWhere("oneUser.status = :status1", { status1: "waiting"  })
            }),)
        .orderBy({ "status": 'DESC'})
        .getOne(); 
    console.log(oneUser)

    await AppDataSource
        .createQueryBuilder()
        .update(Issues)
        .set({ status:  ["inprogress"]})
        .where("id = :id", { id: oneUser?.id })
        .execute()

    const oneUserInp = await AppDataSource
        .createQueryBuilder()
        .select("oneUserInp.counterNoId")
        .from(Issues, "oneUserInp")
        .where("id = :id", { id :oneUser?.id})
        .execute();

    const oneUserInp2 = await AppDataSource
        .createQueryBuilder()
        .select("oneUserInp2.issue_id")
        .from(Issues, "oneUserInp2")
        .where("id = :id", { id :oneUser?.id})
        .execute();

    let valCid = Number(Object.values(oneUserInp[0])) 
    let valIno = Number(Object.values(oneUserInp2[0]))    
    
    await AppDataSource
        .createQueryBuilder()
        .update(Counter)
        .set({ ongoing:valIno})
        .where("counter_no = :counter_no", { counter_no:valCid })
        .execute()

        let responseData : Array<getOneIssuesDto> = new Array();

        responseData.push(new getOneIssuesDto({
            oneUser_id:oneUser?.id,
            oneUser_name:oneUser?.name,
            oneUser_issue_id:oneUser?.issue_id,
            oneUser_phone_no:oneUser?.phone_no,
            oneUser_issue:oneUser?.issue
            
        }))
        
        console.log(responseData)
        return res.send(responseData);
    
    
};


//doneissue

static doneIssue = async (req:Request,res:Response) => {

   await AppDataSource
                .createQueryBuilder()
                
                
                .update(Issues)
                .set({ status: ['close']})
                .where({ status: ['inprogress']})
                .andWhere("counter_no = :counter_no", { counter_no:res.locals.jwt.counter_id })
                .execute()

               
}

    //get queue no of user

    static queueNum = async (req:Request,res:Response) => {

    //     let inprog: Issues|any;

    //    inprog= await AppDataSource
    // .createQueryBuilder()
    // .update(Issues)
    // .set({ status: ['inprogress'] })
    // .where("id = :id", { id: 1 })
    // .execute();







        let issuCid : Issues|any;
        issuCid = await AppDataSource
            .createQueryBuilder()
            .select('issuCid.counterNoId')
            .from(Issues,'issuCid')
            .where('issuCid.email = :email', {email: res.locals.jwt.u_email })
            .andWhere("issuCid.status = :status OR issuCid.status = :status1",{ status: "inprogress", status1: "waiting" })
            .execute()

        let issueIno : Issues|any;
        issueIno = await AppDataSource
            .createQueryBuilder()
            .select('issueIno.issue_id')
            .from(Issues,'issueIno')
            .where('issueIno.email = :email', {email: res.locals.jwt.u_email })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("issueIno.status = :status", { status: "inprogress",})
                    qb.orWhere("issueIno.status = :status1", { status1: "waiting"  })
                }),)
            .execute()
        console.log(issueIno)
        let valIssuCid = Number(Object.values(issuCid[0]))
        let valIssueIno = Number(Object.values(issueIno[0]))


        let counter : Counter|any;
        counter = await AppDataSource
            .createQueryBuilder()
            .select('counter.ongoing')
            .from(Counter,'counter')
            .where('counter.id = :id', {id:valIssuCid})
            .execute()

        let valCounter = Number(Object.values(counter[0]))

        let responseData : Array<queueNumDto> = new Array();

        responseData.push(new queueNumDto({
            counterNoId:valIssuCid,
                issue_id: valIssueIno,
                ongoing: valCounter
            }));
    
        
        return res.send(responseData);
    };

}
export default counterController;


