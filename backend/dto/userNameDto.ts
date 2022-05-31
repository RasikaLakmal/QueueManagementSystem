export class userNameDto {
    name: string;

    constructor(obj : any){
        if(obj){
            this.name = obj.name;
            
        }
    }
}