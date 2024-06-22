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
}