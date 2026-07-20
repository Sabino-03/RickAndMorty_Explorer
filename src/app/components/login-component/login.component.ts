import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, debounceTime, Subject, takeUntil } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styles: [],
    imports: [ ReactiveFormsModule ]
})

export class LoginComponent implements OnInit, OnDestroy {

    private router = inject(Router);
    private authService = inject(AuthService);

    public loginForm = new FormGroup<any>({
        userName : new FormControl(),
        passWord : new FormControl()
    })

    private destroy$ : Subject<void> = new Subject<void>();
    private username$ : BehaviorSubject<string> = new BehaviorSubject<string>('');
    private password$ : BehaviorSubject<string> = new BehaviorSubject<string>('');

    ngOnInit() : void {
        this.loginForm.get('userName')?.valueChanges
        .pipe(
            debounceTime(300),
            takeUntil(this.destroy$)
        )
        .subscribe({
            next : ((value : string) => { this.username$.next(value) }),
            error : ((err) => {}),
            complete : (() => {})
        })

        this.loginForm.get('passWord')?.valueChanges
        .pipe(
            debounceTime(300),
            takeUntil(this.destroy$)
        )
        .subscribe({
            next : ((value : string) => { this.password$.next(value) }),
            error : ((err) => {}),
            complete : (() => {})
        })
    }

    ngOnDestroy() : void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit() : void {
        this.authService.isAuthenticated(this.username$.getValue(), this.password$.getValue());
        const authentication = this.authService.getToken();
        authentication ? this.router.navigate(['explore']) : false
    }

}
