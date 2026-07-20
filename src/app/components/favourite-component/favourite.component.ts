import { NgFor, NgIf } from "@angular/common";
import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { concatMap, interval, map, Observable, Subject, take, takeUntil, tap, toArray } from "rxjs";
import { SingleCardComponent } from "../single-card-component/single.card.component";
import { FavouriteService } from "../../services/favourite.service";
import { SearchService } from "../../services/search.service";
import { CharacterResults } from "../../models/character";

@Component({
    selector: 'app-favourite',
    templateUrl: './favourite.html',
    styles: [],
    imports: [
        NgIf,
        NgFor,
        SingleCardComponent
    ]
})

export class FavouriteComponent implements OnInit, OnDestroy {

    private favouriteService = inject(FavouriteService);
    private searchService = inject(SearchService);
    private destroy$ : Subject<void> = new Subject();
    private onRefresh$ : Subject<void> = new Subject();
    public favouriteList = signal<CharacterResults[]>([]);

    ngOnInit() : void {
        this.onRefresh$
        .pipe(
            concatMap(() => {
                return this.getFromLocalStorage()
            }),
            takeUntil(this.destroy$)
        )
        .subscribe({
            next : ((results : CharacterResults[]) => { this.favouriteList.set(results); }),
            error : ((err) => {}),
            complete : (() => {})
        })

        this.onRefresh$.next();
    }

    ngOnDestroy() : void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getFromLocalStorage() : Observable<CharacterResults[]> {
        return interval(250)
        .pipe(
            tap((favouriteNum : number) => favouriteNum),
            map((favouriteNum : number) => {
                return {
                    name : localStorage.getItem(`Favourite Character Name : ${favouriteNum + 1}`),
                    status : localStorage.getItem(`Favourite Character Status : ${favouriteNum + 1}`)
                }
            }),
            concatMap(({ name, status }) => {
                let Nome = name ? name : "" ;
                let Stato = status ? status : "" ;
                return this.searchService.toSearchNameStatus(Nome, Stato);
            }),
            take(this.favouriteService.getNumberOfFavourites()),
            toArray()
        )
    }

}
