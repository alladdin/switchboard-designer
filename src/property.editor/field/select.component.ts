import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'FieldSelect',
    styles: [`
    `],
    template: `
        <div class="field-wrapper" [style.width]="'100%'">
            <div class="md-input-wrapper">
                <md-select
                    placeholder="{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:"
                    name="{{name}}"
                    [(ngModel)]="model"
                    [style.width]="'100%'"
                >
                    <md-option *ngFor="let val of options" [value]="val">{{val}}</md-option>
                </md-select>
            </div>
        </div>
    `
})

export class FieldSelectComponent extends Locale {
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

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }
}

