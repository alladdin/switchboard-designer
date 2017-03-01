import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

@Component({
    selector: 'FieldSelect',
    styles: [`
    `],
    template: `
        <div class="field-wrapper" [style.width]="'100%'">
            <div class="mat-input-wrapper">
                <md-select
                    placeholder="{{'PROPERTY-EDITOR.FIELD.'+name | uppercase | translate:lang}}:"
                    name="{{name}}"
                    [(ngModel)]="model"
                    [style.width]="'100%'"
                >
                    <md-option *ngFor="let val of options" [value]="getOptionID(val)">{{getOptionName(val)}}</md-option>
                </md-select>
            </div>
        </div>
    `
})

export class FieldSelectComponent extends Translation {
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

    getOptionID(item: any){
        if (typeof(item) === 'object'){
            return item.id;
        }
        return item;
    }

    getOptionName(item: any){
        if (typeof(item) === 'object'){
            return item.name;
        }
        return item;
    }

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}

