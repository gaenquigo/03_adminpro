import { environment } from "src/environments/environment";
import { Hospital } from "./hospital.model";


interface Usuario{
    nombre : string,
    id : string,
    img? : string
} 

export class Medico{

    base_url = environment.base_url;

    constructor( 
        public nombre : string,
        public _id : string,
        public img? : string,
        public usuario? : Usuario,
        public hospital? : Hospital ){}
    

   

}