export class PostDto {
  id:number| undefined;
    issue_id: number | undefined;
    phone_no: number | undefined;
    name: string | undefined;
    counter_no!: number;

  constructor(obj : any){
    if(obj){
      this.id = obj.id;
      this.issue_id = obj.issue_id;
      this.phone_no = obj.phone_no;
      this.name = obj.name;
      this.counter_no = obj.counterNoId;
    }
  }
  }