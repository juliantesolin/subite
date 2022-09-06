import { TransactionResponse } from "./transactions-response";

export class AccountResponse {

    transactions!: TransactionResponse[];
    usr_id!: string;
    currency!: string;
    amount!: number;

    constructor(
        ) {

    }
}