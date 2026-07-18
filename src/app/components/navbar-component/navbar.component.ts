import { Component, OnDestroy, OnInit, output, OutputEmitterRef } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, Subject, takeUntil } from "rxjs";

@Component({
    selector: 'app-navbar',
    template:
    `
    <form>
        <input class="flex items-center justify-center
                      h-12.5 w-187.5 m-6.25 p-2.5
                      border-solid border-[0.15rem] border-slate-950 rounded-3xl
                      bg-neutral-100
                      font-sans text-[15px] text-slate-950"
               placeholder=" Cerca ... "
               type="text"
               [formControl]="search" >
    </form>
    `,
    styles: [],
    imports: [ ReactiveFormsModule ]
})

export class NavbarComponent implements OnInit, OnDestroy {

    search : FormControl<string> = new FormControl();
    searched : OutputEmitterRef<string> = output<string>();
    private destroy$ : Subject<void> = new Subject<void>();

    ngOnInit() : void {
        this.search.valueChanges
        .pipe(
            debounceTime(500),
            takeUntil(this.destroy$) //ATTIVAZIONE : EMISSIONE DI VALORE DA PARTE DI destroy$, takeUntil EFFETTUA unsubscribe SILENZIOSA
        )
        .subscribe({
            next : ((value : string) => { this.searched.emit(value); }),
            error : ((err) => {}),
            complete : (() => {})
        })
    }

    ngOnDestroy() : void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
