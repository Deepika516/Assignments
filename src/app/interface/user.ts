import {Role} from "../common/enums/role"

export interface IUser<T,U>
 {
  id:T|U;
  address:T;
  email:T;
  first_name: T;
  last_name: T;
  middle_name: T
  phone_no: T;
  role: Role;
  doj: Date;
  isEdit:Boolean;
}

let T: IUser<string,number>


