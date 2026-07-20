import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { of, switchMap, tap } from "rxjs";
import { ButtonComponent } from "../button-component/button.component";
import { FilterComponent } from "../filter-component/filter.component";
import { NavbarComponent } from "../navbar-component/navbar.component";
import { AuthService } from "../../services/auth.service";
import { FilterService } from "../../services/filter.service";
import { SearchService } from "../../services/search.service";
import { CharacterResults } from "../../models/character";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styles: [],
    imports: [
        ButtonComponent,
        FilterComponent,
        NavbarComponent,
        RouterModule
    ]
})

export class DashBoardComponent {

    private router = inject(Router);
    private authService = inject(AuthService);
    private filterService = inject(FilterService);
    private searchService = inject(SearchService);
    private characterExists : boolean = false;
    private characterSearched : string = "";

    getSearchTerm($event : string) : string { return this.characterSearched = $event; }

    onClickLogOut() : void {
        this.authService.logOut();
        this.router.navigate(['']);
    }

    onClickSearch() : void {
        let selectedFilter = this.filterService.getFilter();
        if(selectedFilter === "")
            this.filterService.requestFilter();

        of(this.characterSearched)
        .pipe(
            tap((characterSearched : string) => characterSearched),
            switchMap((characterSearched : string) => {
                return this.searchService.toSearchNameStatus(characterSearched, selectedFilter)
            })
        )
        .subscribe({
            next : ((results : CharacterResults) => {
                this.characterExists = true;
                this.characterExists ? this.router.navigate(['explore/:id']) : false

                this.searchService.setCharacterId(results.id);
                localStorage.setItem(`Character Searched`, `${results.id}`);
                this.searchService.setCharacterSearched(results);
            }),
            error : ((err) => { this.characterExists = false; }),
            complete : (() => { console.log(`Character Found`); })
        })
    }

    onClickShowFavourites() : void {
        this.router.navigate(['favourite']);
    }

}
