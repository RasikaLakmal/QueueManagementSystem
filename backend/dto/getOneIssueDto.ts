export class getOneIssuesDto {
    id: number|any;
    name: string|any;
    issue_id: number|any;
    phone_no: string|any;
    issue: string|any;

    constructor(obj : any){
        if(obj){
        this.id = obj.oneUser_id;
        this.name = obj.oneUser_name;
        this.issue_id = obj.oneUser_issue_id;
        this.phone_no = obj.oneUser_phone_no;
        this.issue = obj.oneUser_issue;
        }
    }
  }