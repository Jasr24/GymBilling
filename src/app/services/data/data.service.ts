import { Injectable } from "@angular/core";
import { Constants } from "src/app/utils/utils.constants";
import { RequestService } from "../service.request";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        private _r: RequestService
    ) { }

    //Servicio de login
    login(json: any) {
        return this._r.login(json, Constants.URL_LOGIN)
    }

    //Servicio enviar codigo de recuperacion
    codigoRecuperarContraseña(json: any) {
        return this._r.codigoRecuperarContraseña(json, Constants.URL_CODE_PASSWORD)
    }

    //Servicio restablecer contraseña con codigo
    cambiarContraseñacodigo(json: any) {
        return this._r.cambiarContraseñacodigo(json, Constants.URL_CHANGE_PASSWORD_CODE)
    }
}