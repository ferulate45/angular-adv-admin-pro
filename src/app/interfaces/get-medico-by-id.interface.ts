import { Medico } from "../models/medico.model";

export interface GetMedicoById{
    ok:boolean;
    medico:Medico;
}