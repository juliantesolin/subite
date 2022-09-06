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

let baseUrl = 'https://trapelsic.azurewebsites.net'

@Injectable()
export class AccountService extends BaseService{

  accountInfoResponse: AccountInfoResponse;
  tokenFromUI: string = 'trapelsic1234567';

    constructor(private httpClient: HttpClient){
        super()
        this.accountInfoResponse = new AccountInfoResponse()
    }

    getAccountInfo(token : string): Observable<AccountInfoResponse> {

        let headers = new HttpHeaders();
        headers = headers.set('X-Auth-Token', token);

        return this.httpClient.get<AccountInfoResponse>(baseUrl + '/wbs/api/trans/account', { headers: headers }).pipe(
            map(data =>{
            return data;
            }));

    }

    registerUser(registerRequest : RegisterRequest): Observable<RegisterResponse> {

        return this.httpClient.post<RegisterResponse>(baseUrl + '/wbs/api/signup', registerRequest).pipe(
            map(data =>{
            return data;
            }));

    }

    verifyEmail(){
  }


}
