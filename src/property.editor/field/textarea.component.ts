import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'FieldTextArea',
    styles: [`
    `],
    template: `
        <FieldRow>
            <FieldLabel [name]="name"><textarea name="{{name}}" [(ngModel)]="model"></textarea></FieldLabel>
        </FieldRow>
    `
})

export class FieldTextAreaComponent {
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
