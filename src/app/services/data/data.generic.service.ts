import { Injectable } from "@angular/core";
import { RequestService } from "../service.request";
import { Constants } from "src/app/utils/utils.constants";

@Injectable({
    providedIn: 'root'
})
export class DataGenericService{

    constructor(
        private _r: RequestService
    ){
        
    }

    //Obtener todos datos de la tabla
    obtenerTodosDatosTable(tabla: string){
        return this._r.getInfoTable(tabla, Constants.URL_GENERIC_GET_TABLE)
    }

    obtenerElementoTable(tabla: string, id: number){
        return this._r.getInfoTable(tabla, `${Constants.URL_GENERIC_GET_TABLE}/${id}`)
    }
}