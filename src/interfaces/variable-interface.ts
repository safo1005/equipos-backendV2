import { IEquipo } from './equipos';
import { IPaginationOptions } from './pagination-options.interface';

export interface IVariables {
    id?: string | number;
    equipo?: IEquipo;
    pagination?: IPaginationOptions;
}