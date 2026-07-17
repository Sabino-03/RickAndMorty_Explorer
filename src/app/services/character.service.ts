import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, switchMap, toArray } from "rxjs";
import { NumberOfPageService } from "./page.service";
import { Character, CharacterInfo, CharacterResults } from "../models/character";

@Injectable({providedIn: 'root'})
export class CharacterService {

    private http = inject(HttpClient);
    private numberOfPageService = inject(NumberOfPageService);
    private api : string = `https://rickandmortyapi.com/api/character`;

    private getInfo$(page : number) : Observable<CharacterInfo[]> {
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

    getInitInfo$() : Observable<CharacterInfo[]> {
        let page = this.numberOfPageService.getValue();
        return this.getInfo$(page);
    }

    getNextInfo$() : Observable<CharacterInfo[]> {
        let page = this.numberOfPageService.add();
        return this.getInfo$(page);
    }

    getPrevInfo$() : Observable<CharacterInfo[]> {
        let page = this.numberOfPageService.sub();
        return this.getInfo$(page);
    }

}
