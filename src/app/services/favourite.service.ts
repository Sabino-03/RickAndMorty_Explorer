import { Injectable } from "@angular/core";
import { CharacterInfo } from "../models/character";

@Injectable({providedIn: 'root'})
export class FavouriteService {

    setFavouriteCharacter(character : CharacterInfo) : void {
        localStorage.setItem(`Favourite: ${character.Nome.toString()}`, `Specie: ${character.Specie.toString()}, Stato: ${character.Stato.toString()}`);
    }

}
