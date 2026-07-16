import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class NumberOfPageService {

    private numberPage : number = 1;

    add() : number { return ++this.numberPage }

    sub() : number { return --this.numberPage }

    getValue() : number { return this.numberPage }

}
