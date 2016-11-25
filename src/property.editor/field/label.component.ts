import { Component, Input } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'FieldLabel',
    styles: [`
    `],
    template: `
        <label>{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:<ng-content></ng-content></label>
    `
})

export class FieldLabelComponent extends Locale {
    @Input() name: string;

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }
}

