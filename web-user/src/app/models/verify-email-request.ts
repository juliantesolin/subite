export class VerifyEmailRequest {
    token: string;

    constructor(
      token : string,
        ) {
        this.token = token;
    }
}
