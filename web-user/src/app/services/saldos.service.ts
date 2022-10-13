import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BaseService } from "./base.service";
import { TransferRequest } from "../models/transfer-request";
import { TransferResponse } from "../models/transfer-response";
import { TopUpequest } from "../models/topup-request";

let baseUrl = 'https://trapelsic.azurewebsites.net'

@Injectable()
export class SaldosService extends BaseService{


    constructor(private httpClient: HttpClient){
        super()
    }

    postCargarSaldo(token : string, saldo : number): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('X-Auth-Token', token);

        return this.httpClient.post<any>(baseUrl + '/wbs/api/trans/topup', new TopUpequest(saldo), { headers: headers } ).pipe(
            map(data =>{
            console.log('Carga Ok')
            return data;
            }));

    }

    getReference(token : string, saldo : number): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('X-Auth-Token', token);

        return this.httpClient.post<any>(baseUrl + '/wbs/api/trans/reference', new TopUpequest(saldo), { headers: headers } ).pipe(
            map(data =>{
            return data;
            }));

    }

    asociarTarjeta(token : string, numeroTarjeta : string): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('X-Auth-Token', token);

        var newCardRequest = {
            tarjeta: numeroTarjeta
          }

        return this.httpClient.post<any>(baseUrl + '/wbs/api/trans/newCard', newCardRequest, { headers: headers } ).pipe(
            map(data =>{
            return data;
            }));

    }

    transferUser(token : string, transferRequest: TransferRequest): Observable<any> {

      let headers = new HttpHeaders();
      headers = headers.set('X-Auth-Token', token);

      return this.httpClient.post<any>(baseUrl + '/wbs/api/trans/transfer', transferRequest , { headers: headers }).pipe(
          map(data =>{
          return data;
          }));

  }


}
