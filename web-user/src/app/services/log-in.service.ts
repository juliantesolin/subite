import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { LoginResponse } from "../models/login-response";
import { LoginRequest } from "../models/login-request";
import { BaseService } from "./base.service";

let baseUrl = 'https://trapelsic.azurewebsites.net'

@Injectable()
export class LoginService extends BaseService{
    loginResponse: LoginResponse;
    
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

}