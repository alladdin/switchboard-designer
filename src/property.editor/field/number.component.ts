import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

@Component({
    selector: 'FieldNumber',
    styles: [`
    `],
    template: `
        <md-input-container align="end" [style.width]="width">
            <input mdInput
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

export class FieldNumberComponent extends Translation {
    private model_value: string;

    @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() set model(value: string) {
        this.model_value = value;
        this.modelChange.emit(value);
    }

    get model(): string {
        let n:number = Number(this.model_value);
        let step_split:any = this.step.toString().split('.', 2);
        let decimal = 0;
        if (step_split.length > 1){
            decimal = step_split[1].length;
        }
        return n.toFixed(decimal);
    }

    @Input() name: string;
    @Input() step: number;
    @Input() units: string;
    @Input() width: string;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}

