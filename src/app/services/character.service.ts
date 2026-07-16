import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, toArray } from "rxjs";
import { NumberOfPageService } from "./page.service";
import { Character, CharacterInfo, CharacterResults } from "../models/character";

@Injectable({providedIn: 'root'})
export class CharacterService {

    private http = inject(HttpClient);
    private numberOfPageService = inject(NumberOfPageService);
    private api : string = `https://rickandmortyapi.com/api/character`;
    private character$ : BehaviorSubject<CharacterInfo[]> = new BehaviorSubject([{ Nome : "", ImmagineURL : "", Stato : "", Specie : "" }]);
    private infoApi$ : BehaviorSubject<string> = new BehaviorSubject(this.api);

    getCharacterList() : CharacterInfo[] { return this.character$.getValue(); }

    getInfoApiValue() : string { return this.infoApi$.getValue(); }

    getInitInfo$() : Observable<CharacterInfo[]> {
        let page = this.numberOfPageService.getValue();
        console.log(`[CharacterService] : Page ${page}`);
        return this.http.get<Character>(this.api)
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
    }

    getNextInfo$() : Observable<CharacterInfo[]> {
        let page = this.numberOfPageService.add();
        console.log(`[CharacterService] : Page ${page}`);
        return this.http.get<Character>(`${this.api}?page=${page}`)
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
    }

    getPrevInfo$() : Observable<CharacterInfo[]> {
        let page = this.numberOfPageService.sub();
        console.log(`[CharacterService] : Page ${page}`);
        return this.http.get<Character>(`${this.api}?page=${page}`)
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
    }

}
