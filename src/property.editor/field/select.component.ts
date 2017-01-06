import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'FieldSelect',
    styles: [`
    `],
    template: `
        <FieldRow>
            <FieldLabel [name]="name">
                <select name="{{name}}" [(ngModel)]="model">
                    <option *ngFor="let val of options" [value]="val">{{val}}</option>
                </select>
            </FieldLabel>
        </FieldRow>
    `
})

export class FieldSelectComponent {
    private model_value: string;

    @Input() options: any[];

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

