import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../utils/utils.constants";
import { AnswerRequestI } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  public URL = new Constants();

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * @param data Información a enviar
   * @param url Url A enviar
   */
  getInfoTable(data: any, url: string): Observable<AnswerRequestI> {
    const params = new HttpParams()
    .set('table', data)

    return <Observable<AnswerRequestI>>(
      this.httpClient.get(url, { ...this.httpOptions, params })
    );
  }

  postTable(data: any, url: string): Observable<AnswerRequestI> {
    const params = new HttpParams()
    .set('table', data.table)

    return <Observable<AnswerRequestI>>(
      this.httpClient.post(url, data.data, { ...this.httpOptions, params })
    );
  }

  putTable(data: any, url: string): Observable<AnswerRequestI> {
    const params = new HttpParams()
    .set('table', data.table)

    return <Observable<AnswerRequestI>>(
      this.httpClient.put(url, data.data, { ...this.httpOptions, params })
    );
  }

  deleteTable(data: any, url: string): Observable<AnswerRequestI> {
    const params = new HttpParams()
    .set('table', data.table)

    return <Observable<AnswerRequestI>>(
      this.httpClient.delete(url, { ...this.httpOptions, params })
    );
  }

  // sendRequest(data: any, url: string): Observable<AnswerRequestI> {
  //   return <Observable<AnswerRequestI>>(
  //     this.httpClient.post(url, data, this.httpOptions)
  //   );
  // }

  login(json: JSON, url: string): Observable<AnswerRequestI> {

    return <Observable<AnswerRequestI>>(
      this.httpClient.post(url, json, this.httpOptions)
    );
  }

  codigoRecuperarContraseña(json: JSON, url: string): Observable<AnswerRequestI> {

    return <Observable<AnswerRequestI>>(
      this.httpClient.post(url, json, this.httpOptions)
    )
  }

  cambiarContraseñacodigo(json: JSON, url: string): Observable<AnswerRequestI> {

    return <Observable<AnswerRequestI>>(
      this.httpClient.post(url, json, this.httpOptions)
    )
  }

}