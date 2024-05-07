import { Roles } from "./roles";


export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Roles[]
}
