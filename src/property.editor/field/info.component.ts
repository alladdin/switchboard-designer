import { Component, Input } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'FieldInfo',
    styles: [`
    `],
    template: `
        <div class="field-wrapper" [style.width]="'100%'">
            <div class="md-input-wrapper">
                <label class="md-input-placeholder md-float">{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:</label>
                {{value}}
            </div>
        </div>
    `
})

export class FieldInfoComponent extends Locale {
    @Input() value: string;
    @Input() name: string;

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }
}
