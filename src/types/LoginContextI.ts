import type { ErrorI } from "./ErrorI";
import type { UserCredI } from "./UserCredI";
import type { UserI } from "./UserI";

export interface LoginContextI{
    loginStatus : boolean,
    currentUser: UserI | null,
    loginError: ErrorI | null,
    userLogin:(x:UserCredI)=>Promise<void>,
    userLogout:()=>void
}
