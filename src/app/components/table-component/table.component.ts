import { NgFor, NgIf } from "@angular/common";
import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Subject, switchMap, takeUntil } from "rxjs";
import { ButtonComponent } from "../button-component/button.component";
import { HandleClickService } from "../../services/click.service";
import { FavouriteService } from "../../services/favourite.service";
import { CharacterInfo } from "../../models/character";

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    styles: [],
    imports: [
        NgIf,
        NgFor,
        ButtonComponent
    ]
})

export class TableComponent implements OnInit, OnDestroy {

    private favouriteService = inject(FavouriteService);
    private handleClickService = inject(HandleClickService);
    private destroy$ : Subject<void> = new Subject();
    private onClick$ : Subject<'prev' | 'init' | 'next'> = new Subject<'prev' | 'init' | 'next'>();
    public characterList = signal<CharacterInfo[]>([]);

    ngOnInit() : void {
        this.onClick$
        .pipe(
            switchMap((action : 'prev' | 'init' | 'next') => {
                return this.handleClickService.getInfo$(action)
            }),
            takeUntil(this.destroy$)
        )
        .subscribe({
            next : ((info : CharacterInfo[]) => { this.characterList.set(info); })
        })

        this.onClick$.next('init');
    }

    ngOnDestroy() : void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onClickSetFavourite(character : CharacterInfo) : void { this.favouriteService.setFavouriteCharacter(character); }

    onClickPrev() : void { this.onClick$.next('prev'); }

    onClickNext() : void { this.onClick$.next('next'); }

}
