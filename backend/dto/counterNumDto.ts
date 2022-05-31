export class counterNumDto {
    counter_no: number;

    constructor(obj : any){
        if(obj){
            this.counter_no = obj.counter_no;
            
        }
    }
}