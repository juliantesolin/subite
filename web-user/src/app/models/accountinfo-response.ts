import { AccountResponse } from "./account-response";

export class AccountInfoResponse {

    account!: AccountResponse;
    logged!: number;
    url_map!: string;
    url_recharge!: string;
    url_transfer!: string;
    url_help!: string;

    constructor(
        ) {

    }
}