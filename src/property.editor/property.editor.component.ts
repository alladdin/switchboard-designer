import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

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

export class PropertyEditorComponent extends Translation {
    @Input() item: Control;
    @Input() ui: any;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}
