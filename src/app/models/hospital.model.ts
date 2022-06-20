import { environment } from "src/environments/environment";

const base_url = environment.base_url;

interface _HospitalUser{
    uid: string;
    nombre: string;
    img?: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public uid: string,
        public img?: string,
        public usuario?: _HospitalUser
    ){}
}