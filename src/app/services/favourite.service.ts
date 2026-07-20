import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchService } from "./search.service";
import { CharacterInfo, CharacterResults } from "../models/character";

@Injectable({providedIn: 'root'})
export class FavouriteService {

    private searchService = inject(SearchService);
    private counter : number = Number(localStorage.getItem("Number Of Favourites"));
    private favouriteLocalId : number = 0;
    private name : string = "";
    private status : string = "";

    getNumberOfFavourites() : number { return this.counter; }

    getFavouriteCharacter() : Observable<CharacterResults> { return this.searchService.toSearchNameStatus(this.name, this.status); }

    setFavouriteCharacter(character : CharacterInfo) : void {
        this.favouriteLocalId = ++this.counter;
        localStorage.setItem("Number Of Favourites", `${this.counter}`);
        localStorage.setItem(`Favourite Character Name : ${this.favouriteLocalId}`, `${character.Nome}`);
        localStorage.setItem(`Favourite Character Status : ${this.favouriteLocalId}`, `${character.Stato}`);

        this.name = character.Nome ? character.Nome : "" ;
        this.status = character.Stato ? character.Stato : "" ;
    }

}
