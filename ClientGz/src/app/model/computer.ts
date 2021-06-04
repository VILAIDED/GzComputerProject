import {Compon} from './compon'

export interface Computer
{
    id:number;
    name:string;
    price :number;
    info :string;
    amount :number;
    
    compon: Compon;
}