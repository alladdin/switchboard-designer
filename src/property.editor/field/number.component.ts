import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'FieldNumber',
    styles: [`
    `],
    template: `
        <md-input-container align="end" [style.width]="width">
            <input md-input
                placeholder="{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:"
                type="number"
                name="{{name}}"
                [(ngModel)]="model"
                [step]="step"
            />
            <span md-suffix>{{units}}</span>
        </md-input-container>
    `
})

export class FieldNumberComponent extends Locale {
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
    @Input() step: number;
    @Input() units: string;
    @Input() width: string;

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }
}

