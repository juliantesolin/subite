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
import { MercadoPagoRequest } from "../models/mercadopago-request";
import { MercadoPagoResponse } from "../models/mercadopago-response";

let baseUrl = 'https://api.mercadopago.com/'
let mercadoPagoToken = 'TEST-14091157075652-060117-54ce46542705b0405da3160272f37e53-627431'

@Injectable()
export class MercadoPagoService extends BaseService{

  mercadoPagoResponse: MercadoPagoResponse;

    constructor(private httpClient: HttpClient){
        super()
        this.mercadoPagoResponse = new MercadoPagoResponse()
    }

    pedirLinkMP(mercadoPagoRequest : MercadoPagoRequest): Observable<any> {

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + mercadoPagoToken);
      headers = headers.set('Content-Type', 'application/json');

        return this.httpClient.post<any>(baseUrl + 'checkout/preferences' , mercadoPagoRequest, { headers: headers }).pipe(
            map(data =>{
            return data;
            }));

    }


}
