import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

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

export class FieldInfoComponent extends Translation {
    @Input() value: string;
    @Input() name: string;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}
