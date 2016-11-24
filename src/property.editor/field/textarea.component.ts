import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'FieldTextArea',
    styles: [`
    `],
    template: `
        <FieldRow>
            <label for="{{name}}"><ng-content></ng-content><textarea name="{{name}}" [(ngModel)]="model"></textarea></label>
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
