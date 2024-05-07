import { Roles } from "./roles";

export interface LoginResponse {
    username: string;
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: Roles[]

}