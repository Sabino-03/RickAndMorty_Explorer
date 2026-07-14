import { Component, inject, OnInit, output, OutputEmitterRef } from "@angular/core";
import { ButtonComponent } from "../button-component/button.component";
import { NavbarComponent } from "../navbar-component/navbar.component";
import { CharacterService } from "../../services/character.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styles: [],
    imports: [
        ButtonComponent,
        NavbarComponent
    ]
})

export class DashBoardComponent implements OnInit {

    private characterService = inject(CharacterService);
    private searched : string = "";

    Name : OutputEmitterRef<string> = output<string>();
    ImageURL : OutputEmitterRef<string> = output<string>();
    Status : OutputEmitterRef<string> = output<string>();
    Species : OutputEmitterRef<string> = output<string>();

    ngOnInit() : void { this.characterService.getCharacterList(); }

    getSearchTerm($event : string) : string { return this.searched = $event }

}
