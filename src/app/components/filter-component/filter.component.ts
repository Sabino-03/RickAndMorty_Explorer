import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ButtonComponent } from "../button-component/button.component";
import { FilterService } from "../../services/filter.service";

@Component({
    selector: 'app-filter',
    template :
    `
    <div class="relative flex flex-col items-center justify-center" >
            <app-button [label]="'Status Filters'"
                        [size]="'medium'"
                        [type]="'button'"
                        [variant]="'operations'"
                        [router]="'/explore'"
                        (clicked)="this.filterService.showFilters()" ></app-button>

            <div *ngIf="this.filterService.isActivated" class="absolute top-full mt-1 z-50 flex flex-col items-center gap-1" >
                <app-button [label]="'Alive'"
                            [size]="'medium'"
                            [type]="'button'"
                            [variant]="'dropDown'"
                            [router]="'/explore'"
                            (clicked)="this.filterService.onClickSetAlive()" ></app-button>

                <app-button [label]="'Dead'"
                            [size]="'medium'"
                            [type]="'button'"
                            [variant]="'dropDown'"
                            [router]="'/explore'"
                            (clicked)="this.filterService.onClickSetDead()" ></app-button>

                <app-button [label]="'unknown'"
                            [size]="'medium'"
                            [type]="'button'"
                            [variant]="'dropDown'"
                            [router]="'/explore'"
                            (clicked)="this.filterService.onClickSetunknown()" ></app-button>
            </div>
    </div>
    `,
    styles: [],
    imports: [
        NgIf,
        ButtonComponent
    ]
})

export class FilterComponent {

    public filterService = inject(FilterService);

}
