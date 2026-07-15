import { NgFor } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { SearchService } from "../../services/search.service";
import { CharacterResults } from "../../models/character";

@Component({
    selector: 'app-card',
    templateUrl: './card.html',
    styles: [],
    imports: [ NgFor ]
})

export class CardComponent implements OnInit {

    private searchService = inject(SearchService);
    public characterCard : CharacterResults = {id:-1, name:"", status:"", species:"", type:"", gender:"", origin:{name:"", url:""}, location:{name:"", url:""}, image:"", episode:[""], url:"", created:""};
    public statusCard : string = "";
    private statusColor : string = "";

    ngOnInit() : string {
        this.characterCard = this.searchService.getCharacterSearched();

        if(this.characterCard.status === 'Alive')
            this.statusColor = 'bg-green-900';
        else
            if(this.characterCard.status === 'Dead')
                this.statusColor = 'bg-red-900';
            else
                this.statusColor = 'bg-gray-900';

        return this.statusCard = `inline-block w-2 h-2 rounded-full ${this.statusColor}`;
    }

}
