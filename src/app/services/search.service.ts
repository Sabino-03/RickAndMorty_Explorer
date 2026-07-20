import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, concatMap, filter, first, interval, map, Observable, switchMap, tap } from "rxjs";
import { Character, CharacterResults } from "../models/character";

@Injectable({providedIn: 'root'})
export class SearchService {

    private http = inject(HttpClient);
    private api : string = `https://rickandmortyapi.com/api/character`;
    private characterId$ : BehaviorSubject<number | null> = new BehaviorSubject<number | null>(0);
    private characterSearched$ : BehaviorSubject<CharacterResults> = new BehaviorSubject<CharacterResults>({
        id:-1, name:"", status:"", species:"", type:"", gender:"", origin:{name:"", url:""}, location:{name:"", url:""}, image:"", episode:[""], url:"", created:""
    });

    getCharacterId() : BehaviorSubject<number | null> { return this.characterId$; }

    getCharacterSearched() : BehaviorSubject<CharacterResults> { return this.characterSearched$; }

    setCharacterId(characterId : number | null) : void { this.characterId$.next(characterId); }

    setCharacterSearched(characterResults : CharacterResults) : void { this.characterSearched$.next(characterResults); }

    toSearchId(characterId : number) : Observable<CharacterResults> {
        return interval(50)
        .pipe(
            tap((page : number) => page),
            concatMap((page : number) => {
                return this.http.get<Character>(`${this.api}?page=${page}`)
                .pipe(
                    map((character : Character) => character.results),
                    switchMap((results : CharacterResults[]) => results)
                )
            }),
            filter((results : CharacterResults) => results.id === characterId),
            first()
        )
    }

    toSearchNameStatus(characterName : string, characterStatus : string) : Observable<CharacterResults> {
        return interval(50)
        .pipe(
            tap((page : number) => page),
            concatMap((page : number) => {
                return this.http.get<Character>(`${this.api}?page=${page}`)
                .pipe(
                    map((character : Character) => character.results),
                    switchMap((results : CharacterResults[]) => results)
                )
            }),
            filter((results : CharacterResults) => results.name === characterName),
            filter((results : CharacterResults) => results.status === characterStatus),
            first()
        )
    }

}
