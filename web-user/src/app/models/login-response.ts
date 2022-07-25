import { UserData } from "./user-data";

export class LoginResponse {

    usr_id!: string;
    token!: string;
    logged!: boolean;
    usr_data!: UserData

    constructor(
        ) {

    }
}