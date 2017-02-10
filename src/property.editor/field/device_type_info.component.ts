import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

@Component({
    selector: 'FieldDeviceTypeInfo',
    styles: [`
        .dev-type .no-wrap {
            white-space: nowrap;
        }
    `],
    template: `
        <div class="field-wrapper" [style.width]="'100%'">
            <div class="md-input-wrapper">
                <label class="md-input-placeholder md-float">{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:</label>
                <span class="dev-type" *ngFor="let dev_type of value"><span class="no-wrap">{{dev_type}}</span> </span>
            </div>
        </div>
    `
})

export class FieldDeviceTypeInfoComponent extends Translation {
    @Input() value: string[];
    @Input() name: string;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}

