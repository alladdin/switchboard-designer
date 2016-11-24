import { Component, Input } from '@angular/core';

import { Control } from '../structures/all';

@Component({
    selector: 'Control',
    styles: [`
    `],
    template: `
        <div [ngSwitch]="item.constructor.name">
            <div *ngSwitchDefault>
                <FieldRow><label>Type:</label>{{item.constructor.name}}</FieldRow>
                <FieldText [name]="name" [(model)]="item.name">name:</FieldText>
                <FieldTextArea [name]="description" [(model)]="item.description">description:</FieldTextArea>
            </div>
        </div>
    `
})

export class ControlComponent {
    @Input() item: Control;
}

