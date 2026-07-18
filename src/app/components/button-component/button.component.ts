import { Component, computed, input, InputSignal, output, OutputEmitterRef } from "@angular/core";
import { cva } from "class-variance-authority";

@Component({
    selector: 'app-button',
    template:
    `
    <div>
        <button [class]="buttonClasses()"
                [type]="type()"
                (click)="onClick()" > {{ label() }} </button>
    </div>
    `,
    styles: []
})

export class ButtonComponent {

    label : InputSignal<string> = input.required();
    size : InputSignal<'small' | 'medium' | 'large'> = input<'small' | 'medium' | 'large'>('medium');
    type : InputSignal<'button' | 'reset' | 'submit'> = input<'button' | 'reset' | 'submit'>('button');
    variant : InputSignal<'delete' | 'dropDown' | 'operations' | 'setItem' | 'search'> = input<'delete' | 'dropDown' | 'operations' | 'setItem' | 'search'>('operations');
    clicked : OutputEmitterRef<void> = output<void>();

    buttonClasses = computed<string>(() => buttonStyles({
        size : this.size(),
        type : this.type(),
        variant : this.variant()
    }))

    onClick() : void {
        this.clicked.emit();
    }

}



export const buttonStyles = cva (
    'flex items-center justify-center border-solid cursor-pointer border-2',
    {
        variants : {
            size : {
                small : 'text-[12.5px] w-18.75',
                medium : 'text-[15px] h-12.5 w-25',
                large : 'text-[17.5px] w-31.25'
            },
            type : {
                button : '',
                reset : '',
                submit : ''
            },
            variant : {
                delete : 'm-6.25 p-2.75 rounded-2xl bg-neutral-100 text-red-500 hover:bg-red-500 hover:text-neutral-50 hover:shadow-[0_0_3px_rgba(239,68,68,0.95),0_6px_16px_rgba(0,0,0,0.7)]',
                dropDown : 'm-0 p-0 bg-neutral-50 text-slate-950 hover:bg-slate-500 hover:text-neutral-50',
                operations : 'm-6.25 p-2.75 rounded-2xl bg-neutral-100 text-blue-500 hover:bg-blue-500 hover:text-neutral-50 hover:shadow-[0_0_3px_rgba(59,130,246,0.95),0_6px_16px_rgba(0,0,0,0.7)]',
                setItem : 'm-0 p-0 bg-neutral-50 text-yellow-500 hover:bg-yellow-500 hover:text-neutral-50',
                search : 'm-6.25 p-2.75 rounded-2xl bg-neutral-100 text-green-500 hover:bg-green-500 hover:text-neutral-50 hover:shadow-[0_0_3px_rgba(34,197,94,0.95),0_6px_16px_rgba(0,0,0,0.7)]'
            }
        }
    }
)
