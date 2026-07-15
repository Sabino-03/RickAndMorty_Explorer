import { NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ButtonComponent } from "../button-component/button.component";
import { CharacterService } from "../../services/character.service";
import { CharacterInfo } from "../../models/character";

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    styles: [],
    imports: [
        NgIf,
        NgFor,
        ButtonComponent
    ]
})

export class TableComponent {

    private characterService = inject(CharacterService);
    public characterList : CharacterInfo[] = [];

    onClickPrev() : void {
        this.characterList = [];
        this.characterList = this.characterService.getInfoPrevApi();
    }

    onClickNext() : void {
        this.characterList = [];
        this.characterList = this.characterService.getInfoNextApi();
    }

}
