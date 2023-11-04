import { environment } from "src/environments/environment";


export class Usuario{

    base_url = environment.base_url;

    constructor( public nombre : string,
        public email : string,
        public password? : string,
        public google? : boolean,
        public img? : string,
        public role? : string,
        public uid? : string){

    }

    get urlImg(){

        if (!this.img) {
            return `${this.base_url}/upload/Usuarios/no-image`; 
        }else if(this.img.includes('https')){
            return this.img;
        }else if(this.img){
            return `${this.base_url}/upload/Usuarios/${this.img}`;
        }else{
            return `${this.base_url}/upload/Usuarios/no-image`;
        }
    }

}