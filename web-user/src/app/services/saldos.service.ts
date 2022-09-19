import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { LoginResponse } from "../models/login-response";
import { LoginRequest } from "../models/login-request";
import { BaseService } from "./base.service";
import { RegisterRequest } from "../models/register-request";
import { RegisterResponse } from "../models/register-response";
import { VerifyEmailResponse } from "../models/verify-email-response";
import { VerifyEmailRequest } from "../models/verify-email-request";
import * as CryptoJS from 'crypto-js';
import { AccountInfoResponse } from "../models/accountinfo-response";
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

}
