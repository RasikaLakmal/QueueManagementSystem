export class PostDto {
  id:number| undefined;
    issue_id: number | undefined;
    phone_no: number | undefined;
    name: string | undefined;
    counter_no!: number;

  constructor(obj : any){
    if(obj){
      this.id = obj.user_id;
      this.issue_id = obj.user_issue_id;
      this.phone_no = obj.user_phone_no;
      this.name = obj.user_name;
      this.counter_no = obj.user_counterNoId;
    }
  }
  }