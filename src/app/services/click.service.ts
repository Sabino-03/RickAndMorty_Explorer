import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharacterService } from "./character.service";
import { CharacterInfo } from "../models/character";

@Injectable({providedIn: 'root'})
export class HandleClickService {

    private characterService = inject(CharacterService);

    getInfo$(handleClick : 'prev' | 'init' | 'next') : Observable<CharacterInfo[]> {
        switch (handleClick) {
            case 'prev' : 
                return this.characterService.getPrevInfo$();
            case 'init' : 
                return this.characterService.getInitInfo$();
            case 'next' : 
                return this.characterService.getNextInfo$();
        }
    }

}
