export class RegisterRequest {
    usr_email: string;
    usr_pwd: string;
    usr_name: string;
    usr_lname: string;
    usr_document: string;

    constructor(
        usr_email : string,
        usr_pwd : string,
        usr_name : string,
        usr_lname : string,
        usr_document : string
        ) {
        this.usr_email = usr_email;
        this.usr_pwd = usr_pwd;
        this.usr_name = usr_name;
        this.usr_lname = usr_lname;
        this.usr_document = usr_document
    }
}