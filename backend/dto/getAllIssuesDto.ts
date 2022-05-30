export class PostDto {
    issue_id: number | undefined;
    phone_no: number | undefined;
    name: string | undefined;

  constructor(obj : any){
    if(obj){
      this.issue_id = obj.issue_id;
      this.phone_no = obj.phone_no;
      this.name = obj.name;
    }
  }
  }