import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { Rail } from '../structures/all';

@Component({
    selector: 'Rail',
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
            [name]="'dimension_x'"
            [(model)]="item.x"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
        <div class="half"><FieldNumber
            [name]="'dimension_y'"
            [(model)]="item.y"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div></div>
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

export class RailComponent extends Translation {
    @Input() item: Rail;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}

