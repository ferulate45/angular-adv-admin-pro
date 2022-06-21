import { Hospital } from "../models/hospital.model";

export interface CargarHospitales{
    ok:boolean;
    hospitales:Hospital[];
}