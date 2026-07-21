import { Injectable } from "@angular/core";
import { filter, map, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    private tokenLocalStorage : string | null = localStorage.getItem('token');
    private token : boolean = false;

    constructor() {
        switch (this.tokenLocalStorage) {
            case 'true' : this.token = true;
                break;
            case 'false' : this.token = false;
                break;
            default : this.token = false;
        }
    }

    getToken() : boolean { return this.token; }

    isAuthenticated(userName : string, passWord : string) : void {
        of({userName, passWord})
        .pipe(
            filter((user : {userName : string, passWord : string}) => user.userName.length>0 && user.passWord.length>0),
            map((user : {userName : string, passWord : string}) => true),
        )
        .subscribe({
            next : ((auth : boolean) => { this.token = auth; }),
            error : ((err) => {}),
            complete : (() => {})
        })

        localStorage.setItem("token", `${this.token}`);
    }

    logOut() : void {
        this.token = false;
        localStorage.removeItem("token");
    }

}
