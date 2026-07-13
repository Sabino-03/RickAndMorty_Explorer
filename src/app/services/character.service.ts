import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, switchMap, tap, toArray } from "rxjs";
import { Character, CharacterInfo, CharacterResults } from "../models/character";

@Injectable({providedIn: 'root'})
export class CharacterService {

    private http = inject(HttpClient);
    private api : string = `https://rickandmortyapi.com/api/character`;
    private character$ : BehaviorSubject<CharacterInfo[]> = new BehaviorSubject([{ Nome : "", ImmagineURL : "", Stato : "", Specie : "" }]);
    private infoApi$ : BehaviorSubject<string> = new BehaviorSubject(this.api);

    constructor() {
        this.http.get<Character>(this.infoApi$.getValue())
        .pipe(
            map((character : Character) => character.results),
            switchMap((results : CharacterResults[]) => results),
            map((results : CharacterResults) => {
                return {
                    Nome : results.name,
                    ImmagineURL : results.image,
                    Stato : results.status,
                    Specie : results.species
                }
            }),
            toArray()
        )
        .subscribe({
            next : ((results : CharacterInfo[]) => {
                this.character$.next(results);
                this.infoApi$.next(this.api);
            }),
            error : ((err) => { console.log('Error Notified for First http.get(this.api)'); }),
            complete : (() => {})
        })
    }

    getCharacterList() : CharacterInfo[] { return this.character$.getValue(); }

    getInfoApiValue() : string { return this.infoApi$.getValue(); }

    getInfoNextApi() : CharacterInfo[] {
        this.http.get<Character>(this.infoApi$.getValue())
        .pipe(
            map((character : Character) => character.info.next),
            tap((InfoNextApi : string) => this.infoApi$.next(InfoNextApi)),
            switchMap((InfoNextApi : string) => {
                return this.http.get<Character>(InfoNextApi)
                .pipe(
                    map((character : Character) => character.results),
                    switchMap((results : CharacterResults[]) => results),
                    map((results : CharacterResults) => {
                        return {
                            Nome : results.name,
                            ImmagineURL : results.image,
                            Stato : results.status,
                            Specie : results.species
                        }
                    }),
                    toArray()
                )
            })
        )
        .subscribe({
            next : ((results : CharacterInfo[]) => {
                this.character$.next(results);
            }),
            error : ((err) => { console.log('Error Notified for http.get() Next'); }),
            complete : (() => {})
        })
        return this.character$.getValue()
    }

    getInfoPrevApi() : CharacterInfo[] {
        this.http.get<Character>(this.infoApi$.getValue())
        .pipe(
            map((character : Character) => character.info.prev),
            tap((InfoPrevApi : string) => this.infoApi$.next(InfoPrevApi)),
            switchMap((InfoPrevApi : string) => {
                return this.http.get<Character>(InfoPrevApi)
                .pipe(
                    map((character : Character) => character.results),
                    switchMap((results : CharacterResults[]) => results),
                    map((results : CharacterResults) => {
                        return {
                            Nome : results.name,
                            ImmagineURL : results.image,
                            Stato : results.status,
                            Specie : results.species
                        }
                    }),
                    toArray()
                )
            })
        )
        .subscribe({
            next : ((results : CharacterInfo[]) => {
                this.character$.next(results);
            }),
            error : ((err) => { console.log('Error Notified for http.get() Prev'); }),
            complete : (() => {})
        })
        return this.character$.getValue()
    }

}
