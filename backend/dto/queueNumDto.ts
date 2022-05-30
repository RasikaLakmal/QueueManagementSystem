export class queueNumDto {
    counterNoId: number;
    issue_id: number;
    ongoing: number;

    constructor(obj : any){
        if(obj){
            this.counterNoId = obj.counterNoId;
            this.issue_id = obj.issue_id;
            this.ongoing = obj.ongoing;
        }
    }
}