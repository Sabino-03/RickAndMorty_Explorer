import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, of, Subject, takeUntil } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    destroy$ : Subject<void> = new Subject();
    isLoggedIn$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    isAuthenticated(userName : string, passWord : string) : boolean {
        of({userName, passWord})
        .pipe(
            filter((user : {userName : string, passWord : string}) => user.userName.length>0 && user.passWord.length>0),
            map((user : {userName : string, passWord : string}) => true),
            takeUntil(this.destroy$)
        )
        .subscribe({
            next : ((auth : boolean) => {
                this.isLoggedIn$.next(auth);
                this.destroy$.next();
            }),
            error : ((err) => {}),
            complete : (() => { this.destroy$.complete(); })
        })
        return this.isLoggedIn$.getValue()
    }

}
