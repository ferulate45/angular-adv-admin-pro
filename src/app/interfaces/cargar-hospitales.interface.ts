import { Hospital } from "../models/hospital.model";

export interface CargarHospital{
    ok:boolean;
    hospitales:Hospital[];
}