import { Component, Input } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { Control } from '../structures/all';

@Component({
    selector: 'Control',
    styles: [`
    `],
    template: `
        <div [ngSwitch]="item.constructor.name">
            <DINDevice *ngSwitchCase="'DINDevice'" [item]="item"></DINDevice>
            <DINTerminal *ngSwitchCase="'DINTerminal'" [item]="item"></DINTerminal>
            <div *ngSwitchDefault>
                <FieldDeviceTypeInfo [name]="'type'" [value]="[localization.translate('OBJECT.'+item.constructor.name.toUpperCase())]"></FieldDeviceTypeInfo>
                <FieldText [name]="'name'" [(model)]="item.name"></FieldText>
                <FieldTextArea [name]="'description'" [(model)]="item.description"></FieldTextArea>
            </div>
        </div>
    `
})

export class ControlComponent extends Locale {
    @Input() item: Control;

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }
}
