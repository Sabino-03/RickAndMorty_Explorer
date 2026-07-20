import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { filter, map, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);
    private tokenLocalStorage : string | null = this.isBrowser ? localStorage.getItem('token') : null ;
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

        if(this.isBrowser)
            localStorage.setItem("token", `${this.token}`);
    }

    logOut() : void {
        this.token = false;
        localStorage.removeItem("token");
    }

}
