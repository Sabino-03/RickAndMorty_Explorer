import { Component, computed, input, InputSignal } from "@angular/core";

@Component({
    selector: 'app-single-card',
    templateUrl: './single.card.html',
    styles: []
})

export class SingleCardComponent {

    public name : InputSignal<string | null | undefined> = input<string | null | undefined | null | undefined>();
    public status : InputSignal<string | null | undefined> = input<string | null | undefined>();
    public species : InputSignal<string | null | undefined> = input<string | null | undefined>();
    public origin : InputSignal<string | null | undefined> = input<string | null | undefined>();
    public location : InputSignal<string | null | undefined> = input<string | null | undefined>();
    public image : InputSignal<string | null | undefined> = input<string | null | undefined>();

    characterStatus = computed(() => {
        return this.status() === "Alive" ? 'bg-green-500' : this.status() === "Dead" ? 'bg-red-500' : 'bg-gray-500'
    })

}
