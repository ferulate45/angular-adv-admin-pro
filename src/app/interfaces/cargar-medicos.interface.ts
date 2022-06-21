import { Medico } from "../models/medico.model";

export interface CargarMedicos{
    ok:boolean;
    medicos:Medico[];
}