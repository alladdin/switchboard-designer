import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'FieldText',
    styles: [`
    `],
    template: `
        <FieldRow>
            <label for="{{name}}"><ng-content></ng-content><input type="text" name="{{name}}" [(ngModel)]="model" /></label>
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
