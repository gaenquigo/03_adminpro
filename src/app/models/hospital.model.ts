import { environment } from "src/environments/environment";


interface Usuario{
    nombre : string,
    id : string,
    img? : string
} 

export class Hospital{

    base_url = environment.base_url;

    constructor( 
        public nombre : string,
        public _id : string,
        public img? : string,
        public usuario? : Usuario){}
    

   

}