import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { DINTerminalGroup } from '../structures/all';

@Component({
    selector: 'DINTerminalGroup',
    styles: [`
    `],
    template: `
        <div class="row full"><FieldDeviceTypeInfo
            [name]="'type'"
            [value]="[translation.translate('OBJECT.'+item.constructor.name.toUpperCase())]"
        ></FieldDeviceTypeInfo></div>
        <div class="row full"><FieldText [name]="'name'" [(model)]="item.name"></FieldText></div>
        <div class="row full"><FieldTextArea [name]="'description'" [(model)]="item.description"></FieldTextArea></div>
        <div class="row full"><FieldNumber
            [name]="'dimension_x'"
            [(model)]="item.x"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
    `
})

export class DINTerminalGroupComponent extends Translation {
    @Input() item: DINTerminalGroup;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}

