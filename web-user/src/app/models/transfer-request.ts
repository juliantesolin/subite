export class TransferRequest {
    mail: string;
    iduser: number;
    monto: number;

    constructor(
      mail : string,
      iduser : number,
      monto: number
        ) {
        this.mail = mail;
        this.iduser = iduser;
        this.monto = monto;
    }
}
