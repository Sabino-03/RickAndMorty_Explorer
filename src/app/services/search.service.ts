import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, concatMap, filter, interval, map, Subject, switchMap, takeUntil, tap } from "rxjs";
import { Character, CharacterResults } from "../models/character";

@Injectable({providedIn: 'root'})
export class SearchService {

    private http = inject(HttpClient);
    private api : string = `https://rickandmortyapi.com/api/character`;
    private destroy$ : Subject<void> = new Subject();
    private characterExists$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private characterSearched$ : BehaviorSubject<CharacterResults> = new BehaviorSubject({
        id:-1, name:"", status:"", species:"", type:"", gender:"", origin:{name:"", url:""}, location:{name:"", url:""}, image:"", episode:[""], url:"", created:""
    });

    getCharacterSearched() : CharacterResults { return this.characterSearched$.getValue(); }

    toSearch(characterSearched : string) : BehaviorSubject<boolean> {
        interval(10)
        .pipe(
            tap((page : number) => page),
            concatMap((page : number) => {
                return this.http.get<Character>(`${this.api}?page=${page}`)
                .pipe(
                    map((character : Character) => character.results),
                    switchMap((results : CharacterResults[]) => results)
                )
            }),
            filter((results : CharacterResults) => results.name === characterSearched),
            takeUntil(this.destroy$)
        )
        .subscribe({
            next : ((results : CharacterResults) => {
                this.characterExists$.next(true);
                this.characterSearched$.next(results);
                this.destroy$.next();
            }),
            error : ((err) => { console.log('No-Character Found'); this.characterExists$.next(false); }),
            complete : (() => {})
        })
        return this.characterExists$
    }

}
