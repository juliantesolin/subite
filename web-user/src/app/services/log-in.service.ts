import { HttpClient, HttpParams } from "@angular/common/http";
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

let baseUrl = 'https://trapelsic.azurewebsites.net'

@Injectable()
export class LoginService extends BaseService{

  loginResponse: LoginResponse;
  tokenFromUI: string = 'trapelsic1234567';

    constructor(private httpClient: HttpClient){
        super()
        this.loginResponse = new LoginResponse()
    }

    loginUser(loginRequest : LoginRequest): Observable<LoginResponse> {

        return this.httpClient.post<LoginResponse>(baseUrl + '/wbs/api/login', loginRequest).pipe(
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
    decrypted: string | undefined;
    verifyEmail(token : string){

      let queryParams = new HttpParams();

      let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
      let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

      queryParams = queryParams.append(
        "token",
          CryptoJS.AES.decrypt(
            token.replace(/\s/g, '+'), _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }).toString(CryptoJS.enc.Utf8)
      );

      return this.httpClient.get<VerifyEmailResponse>(baseUrl + '/wbs/api/verifyemail',{params:queryParams}).pipe(
          map(data =>{
          return data;
          }));

  }


}
