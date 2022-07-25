export class LoginRequest {
    usr_email: string;
    usr_pwd: string;

    constructor(
        usr_email : string,
        usr_pwd : string,
        ) {
        this.usr_email = usr_email;
        this.usr_pwd = usr_pwd;
    }
}