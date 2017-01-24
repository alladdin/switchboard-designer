import { Component, Input } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { Control } from '../structures/all';

@Component({
    selector: 'PropertyEditor',
    styles: [`
    `],
    template: `
        <div *ngIf="item" ngClass="property-editor">
            <div class="row full"><h4>{{'PROPERTY-EDITOR.TITLE' | translate:lang }}</h4></div>
            <form>
                <Control [item]="item"></Control>
            </form>
        </div>
    `
})

export class PropertyEditorComponent extends Locale {
    @Input() item: Control;
    @Input() ui: any;

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }
}
