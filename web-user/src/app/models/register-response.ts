import { UserData } from "./user-data";

export class RegisterResponse {

    usr_id!: string;
    token!: string;
    logged!: boolean;
    usr_data!: UserData

    constructor(
        ) {

    }
}