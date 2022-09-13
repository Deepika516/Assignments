import { Role } from "../cmn/enums/role";

export interface IUser<T,U>
 {
  id:T|U;
  address:T;
  email:T;
  first_name: T;
  last_name: T;
  middle_name: T
  phone_no: U;
  role: Role;
  doj:Date;
}

let T: IUser<string,number>
