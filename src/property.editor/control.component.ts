import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { Control } from '../structures/all';

@Component({
    selector: 'Control',
    styles: [`
    `],
    template: `
        <div [ngSwitch]="item.constructor.name">
            <DINDevice *ngSwitchCase="'DINDevice'" [item]="item"></DINDevice>
            <DINTerminal *ngSwitchCase="'DINTerminal'" [item]="item"></DINTerminal>
            <DINTerminalGroup *ngSwitchCase="'DINTerminalGroup'" [item]="item"></DINTerminalGroup>
            <Rail *ngSwitchCase="'Rail'" [item]="item"></Rail>
            <SwitchBoard *ngSwitchCase="'SwitchBoard'" [item]="item"></SwitchBoard>
            <div *ngSwitchDefault>
                <div class="row full"><FieldDeviceTypeInfo [name]="'type'" [value]="[translation.translate('OBJECT.'+item.constructor.name.toUpperCase())]"></FieldDeviceTypeInfo></div>
                <div class="row full"><FieldText [name]="'name'" [(model)]="item.name"></FieldText></div>
                <div class="row full"><FieldTextArea [name]="'description'" [(model)]="item.description"></FieldTextArea></div>
            </div>
        </div>
    `
})

export class ControlComponent extends Translation {
    @Input() item: Control;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }
}
