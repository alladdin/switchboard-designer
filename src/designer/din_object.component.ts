import { Component, Input } from '@angular/core';

import { Control } from '../structures/all';

@Component({
    selector: '[DINObject]',
    template: `
        <svg:g *ngIf="item" [ngSwitch]="item.constructor.name">
            <svg:g DINDevice *ngSwitchCase="'DINDevice'"
                [item]="item"
                [ui]="ui"
            ></svg:g>
            <svg:g DINTerminalGroup *ngSwitchCase="'DINTerminalGroup'"
                [item]="item"
                [ui]="ui"
            ></svg:g>
            <svg:g DINTerminal *ngSwitchCase="'DINTerminal'"
                [item]="item"
                [ui]="ui"
            ></svg:g>
            <svg:text *ngSwitchDefault>Unknown: {{item.constructor.name}}</svg:text>
        </svg:g>
    `
})

export class DINObjectComponent {
    @Input() ui: any;
    @Input() item: Control;
}
