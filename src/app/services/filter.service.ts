import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class FilterService {

    private activated$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
    public isActivated : boolean = false;

    onClickSetAlive() : void { this.activated$.next("Alive"); }

    onClickSetDead() : void { this.activated$.next("Dead"); }

    onClickSetunknown() : void { this.activated$.next("unknown"); }

    getFilter() : string { return this.activated$.getValue(); }

    requestFilter() : void { this.isActivated = true; }

    showFilters() : void { this.isActivated = !this.isActivated; }

}
