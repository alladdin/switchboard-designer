import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { SwitchBoard } from '../structures/all';

@Component({
    selector: 'SwitchBoard',
    styles: [`
    `],
    template: `
        <div class="row full"><FieldDeviceTypeInfo
            [name]="'type'"
            [value]="[translation.translate('OBJECT.'+item.constructor.name.toUpperCase())]"
        ></FieldDeviceTypeInfo></div>
        <div class="row full"><FieldText [name]="'name'" [(model)]="item.name"></FieldText></div>
        <div class="row full"><FieldTextArea [name]="'description'" [(model)]="item.description"></FieldTextArea></div>
        <div class="row"><div class="half"><FieldNumber
            [name]="'dimension_width'"
            [(model)]="item.width"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
        <div class="half"><FieldNumber
            [name]="'dimension_height'"
            [(model)]="item.height"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div></div>
    `
})

export class SwitchBoardComponent extends Translation {
    @Input() item: SwitchBoard;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}
