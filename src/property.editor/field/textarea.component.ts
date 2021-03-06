import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

@Component({
    selector: 'FieldTextArea',
    styles: [`
    `],
    template: `
        <md-input-container [style.width]="'100%'">
            <textarea mdInput
                placeholder="{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:"
                name="{{name}}"
                [(ngModel)]="model"
            ></textarea>
        </md-input-container>
    `
})

export class FieldTextAreaComponent extends Translation {
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
        public translation: TranslationService
    ) {
        super(translation);
    }
}
