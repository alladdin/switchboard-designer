import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'FieldTextArea',
    styles: [`
    `],
    template: `
        <md-input-container [style.width]="'100%'">
            <textarea md-input
                placeholder="{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:"
                name="{{name}}"
                [(ngModel)]="model"
            ></textarea>
        </md-input-container>
    `
})

export class FieldTextAreaComponent extends Locale {
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

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }
}
