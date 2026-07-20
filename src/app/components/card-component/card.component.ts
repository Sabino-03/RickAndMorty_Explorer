import { NgFor } from "@angular/common";
import { Component, computed, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Observable, of, Subject, switchMap, takeUntil, tap } from "rxjs";
import { SearchService } from "../../services/search.service";
import { CharacterResults } from "../../models/character";

@Component({
    selector: 'app-card',
    templateUrl: './card.html',
    styles: [],
    imports: [ NgFor ]
})

export class CardComponent implements OnInit, OnDestroy {

    private searchService = inject(SearchService);
    private destroy$ : Subject<void> = new Subject();
    private onRefresh$ : Subject<void> = new Subject();
    public characterCard : CharacterResults = {
        id:0, name:"", status:"", species:"", type:"", gender:"", origin:{name:"", url:""}, location:{name:"", url:""}, image:"", episode:[""], url:"", created:""
    };
    private characterId : number = Number(localStorage.getItem("Character Searched"));
    public name = signal<string>("Not Found");
    public status = signal<string>("unknown");
    public species = signal<string>("unknown");
    public origin = signal<string>("unknown");
    public location = signal<string>("unknown");
    public image = signal<string>("https://rickandmortyapi.com/api/character/avatar/19.jpeg");
    public episodes = signal<(string | null)[]>([]);

    characterStatus = computed(() => {
        return this.status() === "Alive" ? 'bg-green-500' : this.status() === "Dead" ? 'bg-red-500' : 'bg-gray-500'
    })

    ngOnInit() : void {
        this.onRefresh$
        .pipe(
            switchMap(() => {
                return this.loadCharacter()
            }),
            takeUntil(this.destroy$)
        )
        .subscribe({
            next : ((results : CharacterResults) => {
                this.name.set(results.name ? results.name : "Not Found");
                this.status.set(results.status ? results.status : "unknown");
                this.species.set(results.species ? results.species : "unknown");
                this.origin.set(results.origin.name ? results.origin.name : "unknown");
                this.location.set(results.location.name ? results.location.name : "unknown");
                this.image.set(results.image ? results.image : "https://rickandmortyapi.com/api/character/avatar/19.jpeg");
                this.episodes.set(results.episode ? results.episode : [""]);
            }),
            error : ((err) => {}),
            complete : (() => {})
        })

        this.onRefresh$.next();
    }

    ngOnDestroy() : void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadCharacter() : Observable<CharacterResults> {
        return of(this.characterId)
        .pipe(
            tap((characterId : number) => characterId),
            switchMap((characterId : number) => {
                return this.searchService.toSearchId(characterId)
            }),
            takeUntil(this.destroy$)
        )
    }

}
