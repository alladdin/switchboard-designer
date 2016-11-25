import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'FieldText',
    styles: [`
    `],
    template: `
        <FieldRow>
            <FieldLabel [name]="name"><input type="text" name="{{name}}" [(ngModel)]="model" /></FieldLabel>
        </FieldRow>
    `
})

export class FieldTextComponent {
    private model_value: string;

    @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() set model(value: string) {
        this.model_value = value;
        this.modelChange.emit(value); 
    }

    get model(): string {
        return this.model_value;
    }

    @Input() name: string;
}
