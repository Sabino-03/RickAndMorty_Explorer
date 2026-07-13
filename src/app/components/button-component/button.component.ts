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
    variant : InputSignal<'delete' | 'operations' | 'search'> = input<'delete' | 'operations' | 'search'>('operations');
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
    'flex items-center justify-center m-6.25 p-2.75 border-solid rounded-2xl cursor-pointer text-white font-normal',
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
                delete : 'bg-red-700 hover:bg-red-800',
                operations : 'bg-blue-700 hover:bg-blue-800',
                search : 'bg-green-700 hover:bg-green-800'
            }
        }
    }
)
