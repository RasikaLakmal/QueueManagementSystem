export class counterNumDto {
    counter_id: number;
    name: string;

    constructor(obj : any){
        if(obj){
            this.counter_id = obj.counter_id;
            this.name = obj.name;
            
        }
    }
}