import {IUser} from "../models/users";
import { Role } from "../common/enums/role";

export class User<T,U> implements IUser<T,U>
{
    id:T|U;
    first_name:T;
    middle_name:T;
    last_name:T;
    email:T;
    phone_no:U;
    role:Role;
    address:T;
    doj:Date;;

    constructor(id:T|U,first_name:T,middle_name:T,last_name:T,phone_no:U,email:T,
        role:Role,address:T,doj:Date)
    {
        this.id=id;
        this.first_name=first_name;
        this.middle_name=middle_name;
        this.last_name=last_name;
        this.phone_no=phone_no;
        this.email=email;
        this.role=role;
        this.address=address;
        this.doj=doj;
    }
}


